"use client";

import { useEffect, useState, useCallback } from "react";
import { getBreedsByAnimal, getAnimals, postPet } from "@/services/pets";
import { PetFormValidator } from "@/utils/forms";
import { useRouter } from "next/navigation";
import { getPet, updatePet, petUploadImages } from "@/services/pets";
import { useDropzone } from 'react-dropzone';
import SuccessNotification from "@/components/SuccessNotification";
import ErrorListNotification from "@/components/ErrorListNotification";

export default function Page(props) {
    
    const { id } = props.params;
    const router = useRouter()

    const [images, setImages] = useState([]);
    const [nombre, setNombre] = useState("");
    const [edad, setEdad] = useState();
    const [raza, setRaza] = useState();
    const [detalles, setDetalles] = useState("");
    const [succesMessage, setSuccesMessage] = useState("");
    const [mascota, setMascota] = useState({});

    const [sending, setSending] = useState(false)
    const [warningMessage, setWarningMessage] = useState([]);
    
    const onDrop = useCallback((acceptedImages) => {
        setImages(acceptedImages);
    }, [setImages]);

    const { getRootProps, getInputProps } = useDropzone({ onDrop });

    useEffect(() => {
        const fetchPet = async () => {
            try {
                const data = await getPet(id);
                const pet = data[0];
                setMascota(pet);
                console.log(pet);
                console.log(data);
                setNombre(pet.Nombre);
                setEdad(pet.Edad);
                setRaza(pet.Raza);
                setDetalles(pet.Detalles);
            } catch (error) {
                console.error("Error fetching pet:", error);
            }
        };
    
        fetchPet();
    }, [id]);
    

    const handleSubmit = (e) => {
        e.preventDefault();
    
        const edadNumber = Number(edad);
        const wa = PetFormValidator(nombre, edadNumber, raza, detalles, true);
        console.log('Warnings after validation:', wa); 
    
        setWarningMessage(wa);
    
        if (wa.length <= 0) {
            setSending(true);
            updatePet({ id, nombre, edad: edadNumber, detalles })
                .then((response) => {
                    if (response.error) {
                        setSending(false);
                    } else {
                        if (images.length === 0) {
                            setSending(false);
                            setSuccesMessage("Mascota actualizada");
                        } else {
                            petUploadImages(id, images)
                                .then((response2) => {
                                    setSuccesMessage("Mascota actualizada");
                                    setImages([]);
                                })
                                .catch((error) => {
                                    setSending(false);
                                });
                        }
                    }
                })
                .catch((error) => {
                    setSending(false);
                });
        } else {
            // warningMessage ya está actualizado con los nuevos valores
            // Puedes hacer algo aquí si es necesario
        }
    };


    return (
        <section className="w-2/5 my-5 p-6 mx-auto rounded-md shadow-md bg-gray-700">
            {succesMessage && <SuccessNotification message={succesMessage} buttonAction={'/inicio'} buttonText={'Ir a inicio'}/>}
            {warningMessage.length > 0 && <ErrorListNotification errors={warningMessage} />}

            <h2 className="text-lg font-semibold text-gray-700 capitalize dark:text-white">
                Edita tu mascota
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
                            value={nombre}
                            id="nombre"
                            type="text"
                            className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                            disabled={sending}
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
                    <div {...getRootProps()} className="mt-4 flex justify-center rounded-md border-2 border-dashed border-gray-300 p-4 text-center">
                    <input {...getInputProps()} />
                    <p className="text-sm text-gray-600">Drag & drop some files here, or click to select files</p>
                </div>
                <div className="mt-2">
                    {images.map((image) => (
                        <p key={image.path} className="text-sm text-gray-600">
                        {image.path} - {image.size} bytes
                        </p>
                    ))}
                </div>
                </div>

                <div className="flex justify-end mt-6">
                    <button
                        className="px-8 py-2.5 leading-5 text-black transition-colors duration-300 transform bg-secondary rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600"
                        onClick={handleSubmit}
                    >
                        Actualizar
                    </button>
                </div>
            </form>
        </section>
    );
}
