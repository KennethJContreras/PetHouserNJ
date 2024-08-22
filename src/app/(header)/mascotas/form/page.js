"use client";

import { useEffect, useState } from "react";
import { getBreedsByAnimal, getAnimals, postPet } from "@/services/pets";
import { PetFormValidator } from "@/utils/forms";
import { useRouter } from "next/navigation";
import SuccessNotification from "@/components/SuccessNotification";
import ErrorListNotification from "@/components/ErrorListNotification";

export default function Page() {
    const router = useRouter();

    const [idAnimal, setIdAnimal] = useState("");
    const [animales, setAnimales] = useState([]);
    const [razas, setRazas] = useState([]);
    const [nombre, setNombre] = useState("");
    const [edad, setEdad] = useState();
    const [raza, setRaza] = useState();
    const [detalles, setDetalles] = useState("");

    const [loadingAnimales, setLoadingAnimales] = useState(true);
    const [loadingRazas, setLoadingRazas] = useState(true);
    const [sending, setSending] = useState(false);
    const [warningMessage, setWarningMessage] = useState([]);
    const [succesMessage, setSuccesMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        const wa = PetFormValidator(nombre, Number(edad), raza, detalles);
        setWarningMessage(wa);

        if (wa.length === 0) {
            setSending(true);

            postPet({ nombre, edad: Number(edad), raza: Number(raza), detalles, })
                .then((response) => {
                    if (response.error) {
                        setWarningMessage([response.error]);
                        setSending(false);
                    } else {
                        setSuccesMessage("Mascota publicada");
                    }
                })
                .catch((error) => {
                    setWarningMessage(["User already exists"]);
                    setSending(false);
                });
        }
    };

    useEffect(() => {
        const fetchAnimals = async () => {
            try {
                const data = await getAnimals();
                setAnimales(data);
                setLoadingAnimales(false);
            } catch (error) {
                console.error("Error fetching animals:", error);
            } finally {
                setLoadingAnimales(false);
            }
        };

        fetchAnimals();
    }, []);

    useEffect(() => {
        if (idAnimal) {
            const fetchBreeds = async () => {
                try {
                    const data = await getBreedsByAnimal(idAnimal);
                    setRazas(data);
                    setLoadingRazas(false);
                } catch (error) {
                    console.error("Error fetching breeds:", error);
                }
            };
            fetchBreeds();
        }
    }, [idAnimal]);

    return (
        <>
            {succesMessage && (<SuccessNotification message={succesMessage} buttonAction={"/inicio"} buttonText={"Ir a inicio"} />)}
            {warningMessage.length > 0 && (<ErrorListNotification errors={warningMessage} />)}
            <section className="w-2/5 my-5 p-6 mx-auto rounded-md shadow-md bg-gray-700">
                <h2 className="text-lg font-semibold text-gray-700 capitalize dark:text-white">
                    Publica tu mascota
                </h2>

                <form>
                    <div className="flex flex-col gap-6 mt-4 sm:grid-cols-2">
                        <div>
                            <label
                                className="text-gray-700 dark:text-gray-200"
                                htmlFor="username">
                                Nombre de la mascota
                            </label>
                            <input
                                id="nombre"
                                type="text"
                                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                                disabled={sending}
                                value={nombre}
                                onChange={(e) => setNombre(e.target.value)}
                            />
                        </div>

                        <div>
                            <label className="text-gray-700 dark:text-gray-200" htmlFor="edad">
                                Edad en años
                            </label>
                            <input
                                id="edad"
                                type="number"
                                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                                disabled={sending}
                                value={edad}
                                onChange={(e) => setEdad(e.target.value)}
                            />
                        </div>

                        <div>
                            <label className="text-gray-700 dark:text-gray-200" htmlFor="tipo">
                                Tipo
                            </label>
                            <select
                                id="tipo"
                                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                                onChange={(e) => setIdAnimal(e.target.value)}
                                disabled={loadingAnimales}
                            >
                                {!loadingAnimales && (
                                    <>
                                        <option className="text-white" value="" hidden>
                                            ---------------
                                        </option>
                                        {animales.map((animal) => (
                                            <option key={animal.id} value={animal.Id}>
                                                {animal.Descripcion}
                                            </option>
                                        ))}
                                    </>
                                )}


                            </select>
                        </div>

                        <div>
                            <label className="text-gray-700 dark:text-gray-200" htmlFor="raza">
                                Raza
                            </label>
                            <select
                                id="raza"
                                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                                disabled={loadingRazas}
                                onChange={(e) => setRaza(e.target.value)}
                            >
                                {!loadingRazas && (
                                    <>
                                        <option className="text-white" value="" hidden>
                                            ---------------
                                        </option>
                                        {razas.map((raza) => (
                                            <option key={raza.id} value={raza.Id}>
                                                {raza.Descripcion}
                                            </option>
                                        ))}
                                    </>
                                )}
                            </select>
                        </div>

                        <div>
                            <label
                                className="text-gray-700 dark:text-gray-200"
                                htmlFor="detalles"
                            >
                                Describe a la mascota
                            </label>
                            <textarea
                                id="detalles"
                                type="text"
                                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                                disabled={sending}
                                value={detalles}
                                onChange={(e) => setDetalles(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="flex justify-end mt-6">
                        <button
                            className="px-8 py-2.5 leading-5 text-black transition-colors duration-300 transform bg-secondary rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600"
                            onClick={handleSubmit}
                        >
                            Publicar
                        </button>
                    </div>
                </form>
            </section>
        </>

    );
}
