import settings from './settings';


export async function getSubscriptions() {

    const response = await fetch(`${settings.domain}/suscripciones`,{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
            , 'Cache-Control': 'no-cache'
        },
    });

    if (!response.ok) {
        throw new HTTPError(response);
    }

    const data = await response.json();
    return data;

}