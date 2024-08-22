'use client';

import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import ErrorListNotification from '@/components/ErrorListNotification';

import { LoginUser } from  '@/services/users';
import { LoginFormValidator } from '@/utils/forms';
import { LoginGoogle } from '@/services/users';


export default function Login () {

    const router = useRouter();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [warningMessage, setWarningMessage] = useState([]);
    const [sending, setSending] = useState(false);

    //Limpiamos localStorage
    useEffect(() => {
        console.log('Cleaning localStorage');
        localStorage.removeItem('token');
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Login form submitted', warningMessage);

        const warnings = LoginFormValidator(
            email,
            password
        );

        if (warnings.length === 0) {
            setSending(true);
            LoginUser({
                email: email,
                password: password
            }).then( (response) => {
                console.log('Login response', response);
                if (response.error) {
                    setWarningMessage([response.error]);
                } else {
                    localStorage.setItem('token', response.idToken);
                    router.push('/inicio');
                }
            }).catch( (error) => {
                setSending(false);
                console.log('Login error', error);
                setWarningMessage(['Network response was not ok','User or password incorrect']);
            }).finally( () => {
                setSending(false);
            });
        } else {
            setWarningMessage(warnings);
        }
    }

    const handleGoogleClick = (e) => {
        e.preventDefault();
        console.log('Google login clicked');
        setSending(true);
    
        // Abrir una ventana emergente para la autenticación de Google
        const googleLoginUrl = `http://localhost:8000/login/google`;
        const width = 500;
        const height = 600;
        const left = window.screen.width / 2 - width / 2;
        const top = window.screen.height / 2 - height / 2;
    
        const loginWindow = window.open(
            googleLoginUrl,
            'GoogleLogin',
            `width=${width},height=${height},top=${top},left=${left}`
        );
    
        // Escuchar el mensaje de la ventana emergente
        window.addEventListener('message', (event) => {
            if (event.origin !== 'http://localhost:8000') return;
    
            const { token, userInfo } = event.data;
    
            if (token) {
                localStorage.setItem('token', token);
                console.log('Token stored:', token);
                loginWindow.close();
                router.push('/inicio');
            } else if (event.data.error) {
                setWarningMessage([event.data.error]);
                setSending(false);
            }
        }, { once: true });
    }
    
     
    return (
        <div class="flex bg-cover h-auto flex-col items-center justify-center py-5">
            <div class="flex bg-cover flex-col items-center justify-center py-5 gap-5">
            {warningMessage.length > 0 && <ErrorListNotification errors={warningMessage} />}


                <form class="flex flex-col w-full p-6 m-auto mx-auto bg-white rounded-lg shadow-md dark:bg-gray-800 gap-2">
                    <div class="flex justify-center mx-auto">
                        <img class="w-auto h-15 sm:h-14" src="/logo.webp" alt="" />
                    </div>
                    <div>
                        <label
                            for="email"
                            class="block text-sm text-gray-800 dark:text-gray-200"
                        >
                            Correo
                        </label>
                        <input
                            disabled={sending}
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            name="email"
                            autoComplete="email"
                            required
                            class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                        />
                    </div>

                    <div class="mt-4">
                        <div class="flex items-center justify-between">
                            <label
                                for="password"
                                class="block text-sm text-gray-800 dark:text-gray-200"
                            >
                                Contraseña
                            </label>
                            <a
                                href="#"
                                class="text-xs text-gray-600 dark:text-gray-400 hover:underline"
                            >
                                ¿Olvidaste tu contraseña?
                            </a>
                        </div>

                        <input
                            disabled={sending}
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            name="password"
                            autoComplete="current-password"
                            required
                            class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                        />
                    </div>

                    <div class="mt-6">
                        <button disabled={sending} onClick={handleSubmit} type="submit" class="bg-secondary w-full px-6 py-2.5 text-sm font-medium tracking-wide text-black capitalize transition-colors duration-300 transform bg-gray-800 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50">
                            {sending ? 'Enviando...' : 'Iniciar sesión'}
                        </button>
                    </div>
                    <div class="flex items-center justify-between mt-4">
                        <span class="w-1/5 border-b dark:border-gray-600 lg:w-1/5"></span>

                        <a
                            href="#"
                            class="text-xs text-center text-gray-500 uppercase dark:text-gray-400 hover:underline"
                        >
                            o entrar con redes sociales
                        </a>

                        <span class="w-1/5 border-b dark:border-gray-400 lg:w-1/5"></span>
                    </div>

                    <div class="flex flex-col mt-6 -mx-2 gap-2">
                        <button onClick={handleGoogleClick} class="bg-white flex items-center text-gray-700 dark:text-gray-300 justify-center gap-x-3 text-sm sm:text-base  dark:bg-gray-900 dark:border-gray-700 dark:hover:bg-gray-800 rounded-lg hover:bg-gray-100 duration-300 transition-colors border px-8 py-2.5">
                            <svg
                                class="w-5 h-5 sm:h-6 sm:w-6"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <g clip-path="url(#clip0_3033_94454)">
                                    <path
                                        d="M23.766 12.2764C23.766 11.4607 23.6999 10.6406 23.5588 9.83807H12.24V14.4591H18.7217C18.4528 15.9494 17.5885 17.2678 16.323 18.1056V21.1039H20.19C22.4608 19.0139 23.766 15.9274 23.766 12.2764Z"
                                        fill="#4285F4"
                                    />
                                    <path
                                        d="M12.2401 24.0008C15.4766 24.0008 18.2059 22.9382 20.1945 21.1039L16.3276 18.1055C15.2517 18.8375 13.8627 19.252 12.2445 19.252C9.11388 19.252 6.45946 17.1399 5.50705 14.3003H1.5166V17.3912C3.55371 21.4434 7.7029 24.0008 12.2401 24.0008Z"
                                        fill="#34A853"
                                    />
                                    <path
                                        d="M5.50253 14.3003C4.99987 12.8099 4.99987 11.1961 5.50253 9.70575V6.61481H1.51649C-0.18551 10.0056 -0.18551 14.0004 1.51649 17.3912L5.50253 14.3003Z"
                                        fill="#FBBC04"
                                    />
                                    <path
                                        d="M12.2401 4.74966C13.9509 4.7232 15.6044 5.36697 16.8434 6.54867L20.2695 3.12262C18.1001 1.0855 15.2208 -0.034466 12.2401 0.000808666C7.7029 0.000808666 3.55371 2.55822 1.5166 6.61481L5.50264 9.70575C6.45064 6.86173 9.10947 4.74966 12.2401 4.74966Z"
                                        fill="#EA4335"
                                    />
                                </g>
                                <defs>
                                    <clipPath id="clip0_3033_94454">
                                        <rect width="24" height="24" fill="white" />
                                    </clipPath>
                                </defs>
                            </svg>

                            <span>Sign in with Google</span>
                        </button>

                        <button class="bg-[#1877F2] flex gap-x-3 text-sm sm:text-base items-center justify-center text-white rounded-lg hover:bg-[#1877F2]/80 duration-300 transition-colors border border-transparent px-8 py-2.5">
                            <svg
                                class="w-5 h-5 sm:h-6 sm:w-6"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <g clip-path="url(#clip0_3033_94669)">
                                    <path
                                        d="M24 12C24 5.37258 18.6274 0 12 0C5.37258 0 0 5.37258 0 12C0 17.9895 4.3882 22.954 10.125 23.8542V15.4688H7.07812V12H10.125V9.35625C10.125 6.34875 11.9166 4.6875 14.6576 4.6875C15.9701 4.6875 17.3438 4.92188 17.3438 4.92188V7.875H15.8306C14.34 7.875 13.875 8.80008 13.875 9.75V12H17.2031L16.6711 15.4688H13.875V23.8542C19.6118 22.954 24 17.9895 24 12Z"
                                        fill="white"
                                    />
                                </g>
                                <defs>
                                    <clipPath id="clip0_3033_94669">
                                        <rect width="24" height="24" fill="white" />
                                    </clipPath>
                                </defs>
                            </svg>

                            <span>Sign in with Facebook</span>
                        </button>
                    </div>

                    <p class="mt-8 text-xs font-light text-center text-gray-400">
                        {" "}
                        No tengo una cuenta{" "}
                        <Link
                            href="/signup"
                            class="font-medium text-gray-700 dark:text-gray-200 hover:underline"
                        >
                            Crear una
                        </Link>
                    </p>
                </form>



            </div>
        </div>
    );
}
