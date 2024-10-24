import { Request, Response } from "express";
import { generateToken } from "../services/paypal.services";
import { useInflection } from "sequelize";


interface Link {
    href: string;
    rel: string;
    method: string;
}

/*Aqui tengo la autorizacion para tomar el dinero de la cuenta*/
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
            res.status(response.status).json({ error: errorData });
            return;
        }

        // Convertimos el cuerpo de la respuesta a JSON
        const data = await response.json();

        // Enviamos la respuesta JSON con los datos de la orden
        res.status(201).json((data.links as Link[]).find(link => link.rel === 'approve'));
        return;
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Error processing the payment request' });
        return;
    }
};


/*Aqui capturo el dinero real, es decir, el dinero que se va a transferir de la cuenta del cliente a la cuenta del vendedor.
https://developer.paypal.com/docs/api/orders/v2/#orders_capture
*/
export const executePayment = async (req: Request, res: Response) => {
    try {
        const orderID = req.query.token as string;
        console.log(orderID);
        // Validar si el orderID está presente
        if (!orderID) {
            res.status(400).json({ error: 'Order ID is required.' });
            return;
        }

        const accessToken = await generateToken();
        
        const response = await fetch(`${process.env.PAYPAL_BASE_URL}/v2/checkout/orders/${orderID}/capture`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            }
        });

        // Verificar si la respuesta es exitosa
        if (!response.ok) {
            const errorData = await response.json();
            console.error('Error capturing payment:', errorData);
            res.status(response.status).json({ error: errorData });
            return;
        }

        // Extraer y devolver la respuesta JSON
        const data = await response.json();
        res.status(201).json(data);
        return;

    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Error processing the payment.' });
        return;
    }
};
