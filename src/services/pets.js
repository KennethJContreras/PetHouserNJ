import { HTTPError } from "@/utils/HTTPError";
import settings from "./settings";

export async function getAnimals() {

    const response = await fetch(`${settings.domain}/animales`,{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
            , 'Cache-Control': 'no-cache'
            , 'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
    });

    if (!response.ok) {
        throw new HTTPError(response);
    }

    const data = await response.json();
    return data;
}

export async function getPets() {

    const response = await fetch(`${settings.domain}/mascotas`,{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
            , 'Cache-Control': 'no-cache'
            , 'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
    });

    if (!response.ok) {
        throw new HTTPError(response);
    }

    const data = await response.json();
    return data;
}
export async function GetPetsByBreed(idRaza) {

    const response = await fetch(`${settings.domain}/razas/${idRaza}/mascotas`,{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
            , 'Cache-Control': 'no-cache'
            , 'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
    });

    if (!response.ok) {
        throw new HTTPError(response);
    }

    const data = await response.json();
    return data;
}

export async function getBreedsByAnimal(idAnimal) {

    const response = await fetch(`${settings.domain}/animales/${idAnimal}/razas`,{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
            , 'Cache-Control': 'no-cache'
            , 'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
    });

    if (!response.ok) {
        throw new HTTPError(response);
    }

    const data = await response.json();
    return data;
}

export async function getPetColors() {

    const response = await fetch(`${settings.domain}/colores`,{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
            , 'Cache-Control': 'no-cache'
            , 'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
    });

    if (!response.ok) {
        throw new HTTPError(response);
    }

    const data = await response.json();
    return data;
}

export async function GetPetsByBreedAndColor(idRaza, idColor) {
    const url = new URL('${settings.domain}/pets');
    url.searchParams.append('idRaza', idRaza);
    url.searchParams.append('idColor', idColor);

    try {
        const response = await fetch(url.toString(), {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Cache-Control': 'no-cache',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
        });

        if (!response.ok) {
            // Maneja los errores HTTP específicos
            const errorData = await response.json();
            throw new Error(`HTTP Error: ${response.status} - ${errorData.message}`);
        }

        const data = await response.json();
        return data;

    } catch (error) {
        // Maneja errores de red o problemas con fetch
        console.error('Fetch error:', error);
        throw error; // Re-lanza el error para que pueda ser manejado por el llamador
    }
}

export async function getFilteredPets(idAnimal, idRaza, idColor) {
    const url = new URL('${settings.domain}/mascotas-filtradas');

    // Solo agrega parámetros si no son undefined
    if (idAnimal !== undefined) {
        url.searchParams.append('idAnimal', idAnimal);
    }
    if (idRaza !== undefined) {
        url.searchParams.append('idRaza', idRaza);
    }
    if (idColor !== undefined) {
        url.searchParams.append('idColor', idColor);
    }

    try {
        const response = await fetch(url.toString(), {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Cache-Control': 'no-cache',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
        });

        if (!response.ok) {
            // Maneja los errores HTTP específicos
            const errorData = await response.json();
            throw new Error(`HTTP Error: ${response.status} - ${errorData.message}`);
        }

        const data = await response.json();
        return data;

    } catch (error) {
        // Maneja errores de red o problemas con fetch
        console.error('Fetch error:', error);
        throw error; // Re-lanza el error para que pueda ser manejado por el llamador
    }
}


export async function getPet(idMascota) {
    const url = new URL(`${settings.domain}/mascotas/${idMascota}`);

    try {
        const response = await fetch(url.toString(), {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Cache-Control': 'no-cache',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
        });

        if (!response.ok) {
            // Maneja los errores HTTP específicos
            const errorData = await response.json();
            throw new Error(`HTTP Error: ${response.status} - ${errorData.message}`);
        }

        const data = await response.json();
        return data;

    } catch (error) {
        // Maneja errores de red o problemas con fetch
        console.error('Fetch error:', error);
        throw error; // Re-lanza el error para que pueda ser manejado por el llamador
    }
}

export async function postPet(mascota) {
    console.log(mascota);
    const url = new URL(`${settings.domain}/mascotas`);

    try {
        const response = await fetch(url.toString(), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Cache-Control': 'no-cache',
                'Authorization': `Bearer ${localStorage.getItem('token')}`

            },
            body: JSON.stringify(mascota)
        });

        if (!response.ok) {
            // Maneja los errores HTTP específicos
            const errorData = await response.json();
            throw new Error(`HTTP Error: ${response.status} - ${errorData.message}`);
        }

        const data = await response.json();
        return data;

    } catch (error) {
        // Maneja errores de red o problemas con fetch
        console.error('Fetch error:', error);
        throw error; // Re-lanza el error para que pueda ser manejado por el llamador
    }
}

export async function getPetsByUser() {
    const url = new URL(`${settings.domain}/usuarios/mascotas`);

    try {
        const response = await fetch(url.toString(), {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Cache-Control': 'no-cache',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
        });

        if (!response.ok) {
            // Maneja los errores HTTP específicos
            const errorData = await response.json();
            throw new Error(`HTTP Error: ${response.status} - ${errorData.message}`);
        }

        const data = await response.json();
        return data;

    } catch (error) {
        // Maneja errores de red o problemas con fetch
        console.error('Fetch error:', error);
        throw error; // Re-lanza el error para que pueda ser manejado por el llamador
    }
}

export async function updatePet(mascota) {
    const url = new URL(`${settings.domain}/mascotas/${mascota.id}`);
    console.log(mascota);
    try {
        const response = await fetch(url.toString(), {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Cache-Control': 'no-cache',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify(mascota)
        });

        if (!response.ok) {
            // Maneja los errores HTTP específicos
            const errorData = await response.json();
            throw new Error(`HTTP Error: ${response.status} - ${errorData.message}`);
        }

        const data = await response.json();
        return data;

    } catch (error) {
        // Maneja errores de red o problemas con fetch
        console.error('Fetch error:', error);
        throw error; // Re-lanza el error para que pueda ser manejado por el llamador
    }
}

export async function petUploadImages( id, images ){
    console.log("ejecutadnto images")

    const formData = new FormData();
    images.forEach((image) => {
      formData.append("images", image);
    });

    const response = await fetch(`${settings.domain}/mascotas/${id}/imagenes`,{
        method: 'POST',
        body: formData,
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
            , 'Cache-Control': 'no-cache'
        }
    });
    console.log(response);

    if (!response.ok)
        throw new HTTPError(response);
    else
        return response.json();

}