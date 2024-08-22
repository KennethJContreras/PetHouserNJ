"use client";

import PetCard from "@/components/PetCard";
import { getPetsByUser } from "@/services/pets";
import { useEffect, useState } from "react";

export default function Page() {
    const [pets, setPets] = useState([]);

    useEffect(() => {
        const fetchPets = async () => {
            try {
                const data = await getPetsByUser();
                setPets(data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchPets();
    }, []);

    return (
        <div>
            <h1 className="text-4xl flex justify-center pt-5 font-bold text-gray-800">Tus Mascotas Publicadas</h1>
            <ul className="my-10 w-3/4 m-auto grid auto-rows-min lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 col-span-3 gap-5">
                {pets.map((mascota) => (
                    <PetCard
                        key={mascota.IdMascota}
                        IdMascota={mascota.IdMascota}
                        Nombre={mascota.Nombre}
                        Detalles={mascota.Detalles}
                        Edad={mascota.Edad}
                        Municipio={mascota.MunicipioDescripcion}
                        Raza={mascota.Raza}
                        imagen={mascota.url}
                        updating={true}
                        esMiMascota={true}
                    />
                ))}
            </ul>
        </div>
    );


}
