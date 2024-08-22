'use client'

import { useEffect, useState } from 'react'
import { FunnelIcon } from '@heroicons/react/20/solid'

import Filters from '@/components/Filters'
import DialogC from "@/components/Dialog";
import PetCard from "@/components/PetCard";
import PetCardSkeleton from '@/components/PetCardSkeleton';

import { getAnimals, getBreedsByAnimal, getFilteredPets, getPetColors, getPets } from '@/services/pets'
import { EvaluateResponse } from '@/services/requestEvaliuator';
import { useRouter } from "next/navigation";

export default function Example() {
    const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)
    const [animales, setAnimales] = useState([])
    const [razas, setRazas] = useState([])
    const [colores, setColores] = useState([])
    const [idAnimal, setIdAnimal] = useState()
    const [idRaza, setIdRaza] = useState()
    const [idColor, setIdColor] = useState()
    const [mascotas, setMascotas] = useState([])
    const [loading, setLoading] = useState(true)

    const router = useRouter();


    useEffect(() => {
        const fetchAnimals = async () => {
            try {
                const data = await getAnimals();
                setAnimales(data);
            } catch (error) {
                const respuestaEvaluada = EvaluateResponse(error);
                if(respuestaEvaluada){
                    router.push(respuestaEvaluada);
                }     
            }
        };

        const fetchPets = async () => {
            try {
                const data = await getPets();
                setMascotas(data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching pets:', error);
            } finally {
                setLoading(false);
            }    
        }

        const fetchPetColors = async () => {
            try {
                const data = await getPetColors();
                setColores(data);
            } catch (error) {
                console.error('Error fetching pet colors:', error);
            }
        }

        fetchAnimals();
        fetchPetColors();
        fetchPets();
    }, []);

    useEffect(() => {
        if (idAnimal || idRaza || idColor) {

            const params = new URLSearchParams();

            if (idAnimal) {
                params.set('idAnimal', idAnimal);
            } else {
                params.delete('idAnimal');
            }

            if (idRaza) {
                params.set('idRaza', idRaza);
            } else {
                params.delete('idRaza');
            }

            if (idColor) {
                params.set('idColor', idColor);
            } else {
                params.delete('idColor');
            }

            window.history.pushState({}, '', `?${params.toString()}`);

            const fetchFilteredPets = async () => {
                try {
                    setLoading(true);
                    const data = await getFilteredPets(idAnimal, idRaza, idColor);
                    setMascotas(data);
                } catch (error) {
                    console.error('Error fetching filtered pets:', error);
                } finally {
                    setLoading(false);
                }
            }

            fetchFilteredPets();
        }
    }, [idAnimal, idRaza, idColor]);

    useEffect(() => {
        if (idAnimal) {
            const fetchBreeds = async () => {
                try {
                    const data = await getBreedsByAnimal(idAnimal);
                    setRazas(data);
                } catch (error) {
                }
            }
            fetchBreeds();
        }
    }, [idAnimal]);

    return (
        <div>
            <h1 className="text-4xl flex justify-center pt-5 font-bold text-gray-800">¡Adopta a un compañero!</h1>
            {/* Dialogo para Mobile */}
            <DialogC mobileFiltersOpen={mobileFiltersOpen} setMobileFiltersOpen={setMobileFiltersOpen} animales={animales} colores={colores} razas={razas} />

            <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex items-baseline justify-between pb-6 ">

                    <div className="flex items-center">
                        <button
                            type="button"
                            onClick={() => setMobileFiltersOpen(true)}
                            className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
                        >
                            <span className="sr-only">Filters</span>
                            <FunnelIcon aria-hidden="true" className="h-5 w-5" />
                        </button>
                    </div>
                </div>

                <section aria-labelledby="products-heading" className="pb-24 pt-6">
                    <h2 id="products-heading" className="sr-only">
                        Products
                    </h2>

                    <div className="grid md:grid-cols-4 gap-x-8 gap-y-10">
                        <form className="hidden lg:block h-auto col-span-1">
                            <h3 className="sr-only">Categories</h3>

                            <Filters nombre="Animales" opciones={animales} funcionSet={setIdAnimal} />
                            <Filters nombre="Razas" opciones={razas} funcionSet={setIdRaza} />
                            <Filters nombre="Colores" opciones={colores} funcionSet={setIdColor} />
                        </form>
                        <div className="col-span-3">
                            {loading ? <PetCardSkeleton /> : (
                                <div className="grid auto-rows-min lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 col-span-3 gap-5">
                                    {mascotas.map((mascota) => (
                                        <PetCard
                                            key={mascota.IdMascota}
                                            IdMascota={mascota.IdMascota}
                                            Nombre={mascota.Nombre}
                                            Detalles={mascota.Detalles}
                                            Edad={mascota.Edad}
                                            Municipio={mascota.MunicipioDescripcion}
                                            Raza={mascota.Raza}
                                            imagen={mascota.url}

                                        />
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </section>
            </main>
        </div>
    )
}
