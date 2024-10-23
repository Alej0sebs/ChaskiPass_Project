import { Request, Response } from "express";
import { generateToken } from "../services/paypal.services";
import { useInflection } from "sequelize";


interface Link {
    href: string;
    rel: string;
    method: string;
}

export const createPayment = async (req: Request, res: Response) => {
    try {
        const accessToken = await generateToken();

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
                landing_page: 'NO_PREFERENCE', // Default, para mas informacion https://developer.paypal.com/docs/api/orders/v2/#definition-order_application_context
                user_action: 'PAY_NOW', // Accion para que en paypal muestre el monto del pago
                return_url: `${process.env.BASE_URL}paypal/execute-payment`, // Pago exitoso
                cancel_url: `${process.env.BASE_URL}paypal/cancel-payment`, // Pago cancelado o fallido
                shipping_preference: 'NO_SHIPPING', // No se requiere dirección de envío (parte visual)
            }
        };

        // Crear la orden en PayPal
        const response = await fetch(`${process.env.PAYPAL_BASE_URL}/v2/checkout/orders`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`  
            },
            body: JSON.stringify(productSelling)
        });

        if (!response.ok) {
            // Si la respuesta no es exitosa, lanzamos un error
            const errorData = await response.json();
            console.error('Error creating payment:', errorData);
            return res.status(response.status).json({ error: errorData });
        }

        // Convertimos el cuerpo de la respuesta a JSON
        const data = await response.json();
        console.log('Payment created:', data);

        // Enviamos la respuesta JSON con los datos de la orden
        res.status(201).json((data.links as Link[]).find(link => link.rel === 'approve'));
        return;
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Error processing the payment request' });
    }
};



export const executePayment = (req: Request, res: Response) => {
}