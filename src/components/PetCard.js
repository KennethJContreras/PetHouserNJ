'use client'

import Link from "next/link";

export default function PetCard({ IdMascota, Nombre, Detalles, Edad, Municipio, Raza, imagen, updating = false, esMiMascota = false }) {
    const maximoCaracteres = 100;
    const updatingHref = updating ? `/mis-mascotas/${IdMascota}` : `/mascotas/${IdMascota}`;

    const detallesCortados = Detalles.length > maximoCaracteres
        ? Detalles.substring(0, maximoCaracteres) + '...'
        : Detalles;

    return (
        <Link
            href={updatingHref}
            className="w-full mx-auto max-w-sm overflow-hidden shadow-[4.0px_8.0px_8.0px_rgba(0,0,0,0.38)] bg-white rounded-lg shadow-lg dark:bg-gray-700 transform transition-transform hover:scale-105 cursor-pointer"
        >
            <img
                className="object-cover object-center w-full h-56"
                src= {imagen ? imagen : '/bg-collage-pets.jfif' } 
                alt="Pet"
            />

            <div className="px-6 py-4">
                <h1 className="text-xl font-semibold text-gray-800 dark:text-white">{Nombre}</h1>

                <p className="py-2 text-gray-700 dark:text-gray-400">{detallesCortados}</p>

                <div className="flex items-center mt-4 text-gray-700 dark:text-gray-200">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
                    </svg>

                    <h1 className="px-2 text-sm">{Edad} años</h1>
                </div>

                {!esMiMascota && (
                                    <div className="flex items-center mt-4 text-gray-700 dark:text-gray-200">
                                    <svg aria-label="location pin icon" className="w-6 h-6 fill-current" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path fillRule="evenodd" clipRule="evenodd" d="M16.2721 10.2721C16.2721 12.4813 14.4813 14.2721 12.2721 14.2721C10.063 14.2721 8.27214 12.4813 8.27214 10.2721C8.27214 8.063 10.063 6.27214 12.2721 6.27214C14.4813 6.27214 16.2721 8.063 16.2721 10.2721ZM14.2721 10.2721C14.2721 11.3767 13.3767 12.2721 12.2721 12.2721C11.1676 12.2721 10.2721 11.3767 10.2721 10.2721C10.2721 9.16757 11.1676 8.27214 12.2721 8.27214C13.3767 8.27214 14.2721 9.16757 14.2721 10.2721Z" />
                                        <path fillRule="evenodd" clipRule="evenodd" d="M5.79417 16.5183C2.19424 13.0909 2.05438 7.3941 5.48178 3.79418C8.90918 0.194258 14.6059 0.0543983 18.2059 3.48179C21.8058 6.90919 21.9457 12.606 18.5183 16.2059L12.3124 22.7241L5.79417 16.5183ZM17.0698 14.8268L12.243 19.8965L7.17324 15.0698C4.3733 12.404 4.26452 7.9732 6.93028 5.17326C9.59603 2.37332 14.0268 2.26454 16.8268 4.93029C19.6267 7.59604 19.7355 12.0269 17.0698 14.8268Z" />
                                    </svg>
                
                                    
                                    <h1 className="px-2 text-sm">{Municipio}</h1>
                                </div>
                )}


                <div className="flex items-center mt-4 text-gray-700 dark:text-gray-200">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
                    </svg>

                    <h1 className="px-2 text-sm">{Raza}</h1>
                </div>
            </div>
        </Link>
    );
}
