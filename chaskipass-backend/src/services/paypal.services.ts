/*1. Creo el token para acceder a la API de paypal, me permite ingresar a las 
funcionalidades de la API de paypal, como crear pagos, obtener pagos, entre otros.
https://developer.paypal.com/api/rest/authentication/ */

export const generateToken = async () => {
    try {
        const auth = `${process.env.PAYPAL_CLIENT_ID}:${process.env.PAYPAL_SECRET_KEY}`;
        const base64Auth = Buffer.from(auth).toString('base64');

        const response = await fetch(`${process.env.PAYPAL_BASE_URL}/v1/oauth2/token`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': `Basic ${base64Auth}`  
            },
            body: 'grant_type=client_credentials' // Cuerpo de la solicitud
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`Error fetching token: ${errorData.error_description || 'Unknown error'}`);
        }

        const data = await response.json();
        return data.access_token;
    } catch (error) {
        throw new Error(`Error generating PayPal token: ${error}`);
    }
};








