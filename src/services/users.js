import { HTTPError } from "@/utils/HTTPError";
import settings from "./settings";

export async function GetUserInfo() {

    const response = await fetch(`${settings.domain}/user`,{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
            , 'Cache-Control': 'no-cache'
            , 'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    });

    if (!response.ok) {
        throw new HTTPError(response);
    }

    const data = await response.json();
    return data;

}

export async function Register(userRegistration) {

    const response = await fetch(`${settings.domain}/register`,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
            , 'Cache-Control': 'no-cache'
        },
        body: JSON.stringify(userRegistration)
    });

    if (!response.ok) {
        throw new HTTPError(response);
    }

    const data = await response.json();
    return data;

}

export async function LoginUser(userLogin) {

    const response = await fetch(`${settings.domain}/login/custom`,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
            , 'Cache-Control': 'no-cache'
        },
        body: JSON.stringify(userLogin)
    });

    if (!response.ok) {
        throw new HTTPError(response);
    }

    const data = await response.json();
    console.log(data);

    return data;

} 

export async function LoginGoogle() {
    const response = await fetch(`${settings.domain}/login/google`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Cache-Control': 'no-cache'
        },
        redirect: 'manual' // Importante para que fetch no siga la redirección automáticamente
    });

    if (response.status === 307) {
        const redirectUrl = response.headers.get('Location');
        window.location.href = redirectUrl; // Redirige el navegador a la URL de autenticación de Google
    } else if (!response.ok) {
        throw new Error('Failed to start Google login');
    }

    return null; // No es necesario retornar datos aquí porque el navegador será redirigido
}