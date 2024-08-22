'use client';

import { useRouter } from 'next/navigation';

export default function SuccessNotification({ message, buttonAction, buttonText }) {
    const router = useRouter();
    
    return (
        <div className="fixed bottom-4 right-4 flex w-full max-w-sm overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-800">
            <div className="flex items-center justify-center w-12 bg-emerald-500">
                <svg className="w-6 h-6 text-white fill-current" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20 3.33331C10.8 3.33331 3.33337 10.8 3.33337 20C3.33337 29.2 10.8 36.6666 20 36.6666C29.2 36.6666 36.6667 29.2 36.6667 20C36.6667 10.8 29.2 3.33331 20 3.33331ZM16.6667 28.3333L8.33337 20L10.6834 17.65L16.6667 23.6166L29.3167 10.9666L31.6667 13.3333L16.6667 28.3333Z" />
                </svg>
            </div>
        
            <div className="px-4 py-2 -mx-3">
                <div className="mx-3">
                    <span className="font-semibold text-emerald-500 dark:text-emerald-400">Exito</span>
                    <p className="text-sm text-gray-600 dark:text-gray-200">{message}</p>
                </div>
            </div>

            <div className="mt-5 sm:mt-6">
                <button
                    type="button"
                    onClick={ () => router.push(buttonAction) }
                    className="px-6 py-2 font-medium tracking-wide text-black capitalize transition-colors duration-300 transform bg-secondary rounded-lg hover:bg-secondary-light hover:animate-shake focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80"
                >
                    { buttonText }
                </button>
                </div>
        </div>
    );
}
