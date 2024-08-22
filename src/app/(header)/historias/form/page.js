'use client'

import { useState } from "react";
import {  useCallback } from 'react';

import { StoryValidator } from "@/utils/forms";
import { useRouter } from "next/navigation";
import { postStory } from "@/services/interactions";

import SuccessNotification from "@/components/SuccessNotification";

export default function Page() {
    const router = useRouter(); 

    const [images, setImages] = useState([])
    const [descripcion, setDescripcion] = useState('');

    const [warningMessage, setWarningMessage] = useState([]);
    const [sending, setSending] = useState(false);
    const [ succesMessage, setSuccesMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        const wa = StoryValidator(descripcion);
        setWarningMessage(wa);

        if (wa.length === 0) {
            setSending(true);
            postStory({descripcion})
                .then((response) => {
                    if (response.error) {
                        setWarningMessage([response.error]);
                        setSending(false);
                    } else {
                        setSuccesMessage("Historia publicada");
                    }
                }).catch((error) => {
                    setWarningMessage(["Reintentar"]);
                    setSending(false);
                });
        }
    }

    return (
        <>
            {succesMessage.length > 0 && <SuccessNotification message={succesMessage} buttonAction={"/inicio"} buttonText={"Ir a inicio"} />}
            <section className="w-2/5 my-5 p-6 mx-auto mt-20 rounded-md shadow-md bg-gray-700">
            <h2 className="text-lg font-semibold text-gray-700 capitalize dark:text-white">Publica tu historia</h2>

            <form>
                <div className="flex flex-col gap-6 mt-4 sm:grid-cols-2">
                    <div>
                        <label className="text-gray-700 dark:text-gray-200" htmlFor="detalles">Escribe tu experiencia</label>
                        <textarea
                            id="detalles"
                            type="text"
                            className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                            disabled={sending} value={descripcion} onChange={(e) => setDescripcion(e.target.value)}
                        />


                    </div>
                </div>

                {warningMessage.length > 0 &&
                    <div className="text-red-500">
                        {warningMessage.map((message, index) => (
                            <div key={index}>{message}</div>
                        ))}
                    </div>
                }

                <div className="flex justify-end mt-6">
                    <button className="px-8 py-2.5 leading-5 text-black transition-colors duration-300 transform bg-secondary rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600" onClick={handleSubmit}>Publicar</button>
                </div>
            </form>
        </section>
        </>
    );

}
