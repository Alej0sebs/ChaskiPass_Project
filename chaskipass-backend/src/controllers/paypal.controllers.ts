import { Request, Response } from "express";

export const createPayment= async (req:Request, res:Response) => {
    const productSelling = {
        intent: 'CAPTURE',
        purchase_units: [{
            amount: {
                currency_code: 'USD', //https://developer.paypal.com/docs/api/reference/currency-codes/
                value: '100.00'
            }
        }],

        application_context: {
            brand_name: 'ChaskiPass',
            landing_page: 'NO_PREFERENCE',// Default, para mas informacion https://developer.paypal.com/docs/api/orders/v2/#definition-order_application_context
            user_action: 'PAY_NOW',// Accion para que en paypal muestre el monto del pago
            return_url: 'http://localhost:3001/chaski/api/paypal/execute-payment', //Pago exitoso
            cancel_url: 'http://localhost:3001/chaski/api/paypal/cancel-payment' //Pago cancelado o fallido
        }
    };

    //https://developer.paypal.com/docs/api/orders/v2/#orders_create
    // const response =await fetch(`${process.env.PAYPAL_BASE_URL}/v2/checkout/orders`, {
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/json',
    //         'Paypal-Request-Id': '7b92603e-77ed-4896-8e78-5dea2050476a',
    //         'Authorization': `Bearer ${auth}`  
    //     },
    //     body: JSON.stringify(productSelling)
    // });
    
    // return response.json();
}

export const generateToken= async()=>{
    const auth = `${process.env.PAYPAL_CLIENT_ID}:${process.env.PAYPAL_SECRET}`;
    const base64Auth = Buffer.from(auth).toString('base64');
    const response =await fetch(`${process.env.PAYPAL_BASE_URL}/v1/oauth2/token`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': `Basic ${base64Auth}`  
        },
        body: 'grant_type=client_credentials' //Cuerpo de la solicitud
    });
    console.log(response);
    return response.json();
};

export const executePayment= (req:Request, res:Response) => {

}