import { HTTPError } from "@/utils/HTTPError";
import settings from "./settings";

export async function getStories() {
    const response = await fetch(`${settings.domain}/historias`,{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
            , 'Cache-Control': 'no-cache'
            , 'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    });
    console.log(response)
    if (!response.ok) {
        throw new HTTPError(response);
    }

    const data = await response.json();
    return data;
}

export async function postStory({ descripcion }) {
    const response = await fetch(`${settings.domain}/historias`,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
            , 'Cache-Control': 'no-cache'
            , 'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ descripcion })
    });

    console.log(response)
    if (!response.ok) {
        throw new HTTPError(response);
    }

    const data = await response.json();
    return data;
}

export async function giveLike(id) {
    const response = await fetch(`${settings.domain}/historias/${id}/likes`,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
            , 'Cache-Control': 'no-cache'
            , 'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
    });
    
    console.log(response)
    if (!response.ok) {
        throw new HTTPError(response);
    }

    const data = await response.json();
    return data;
}