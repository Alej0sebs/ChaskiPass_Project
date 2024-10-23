/*1. Creo el token para acceder a la API de paypal
*/
export const generateToken= async()=>{
    const auth={user:process.env.PAYPAL_CLIENT_ID, password:process.env.PAYPAL_SECRET}
    const response =await fetch(`${process.env.PAYPAL_BASE_URL}/v1/oauth2/token`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': `Basic ${auth}`  
        },
        body: 'grant_type=client_credentials' //Cuerpo de la solicitud
    });

    return response.json();
};