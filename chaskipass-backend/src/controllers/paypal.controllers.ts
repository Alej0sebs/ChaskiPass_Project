import { Request, Response } from "express";

export const createPayment= (req:Request, res:Response) => {
    const body = {
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
    const auth={user:process.env.PAYPAL_CLIENT_ID, password:process.env.PAYPAL_SECRET}
    const base64Auth = Buffer.from(`${auth.user}:${auth.password}`).toString('base64');
    fetch(`${process.env.PAYPAL_API}/v2/checkout/orders`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Basic ${base64Auth}`
        },
        body: JSON.stringify(body)
    })

}

export const executePayment= (req:Request, res:Response) => {

}