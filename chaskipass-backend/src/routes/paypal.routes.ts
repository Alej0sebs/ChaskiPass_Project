import { Router } from "express";
import protectRoute from "../middleware/protectRoute.middleware";
import { createPayment, executePayment} from "../controllers/paypal.controllers";

const router = Router();
/**
 * @swagger
 * tags:
 *   name: Payments
 *   description: Gestión de pagos utilizando PayPal
 */


/**
 * @swagger
 * /chaski/api/paypal/create-payment:
 *   post:
 *     summary: Crear un pago en PayPal
 *     description: Crea una orden de pago en PayPal y devuelve el enlace de aprobación para redirigir al usuario.
 *     tags: [Payments]
 *     security:
 *       - bearerAuth: [] # Token JWT necesario
 *     responses:
 *       201:
 *         description: Enlace de aprobación generado con éxito.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 href:
 *                   type: string
 *                   description: URL para redirigir al usuario a PayPal.
 *                   example: https://www.paypal.com/checkoutnow?token=ORDER_ID
 *                 rel:
 *                   type: string
 *                   description: Relación con la operación, generalmente "approve".
 *                   example: approve
 *                 method:
 *                   type: string
 *                   description: Método HTTP a utilizar.
 *                   example: GET
 *       400:
 *         description: Error en los datos enviados.
 *       500:
 *         description: Error interno del servidor.
 */
router.post('/create-payment', protectRoute, createPayment);
/**
 * @swagger
 * /chaski/api/paypal/execute-payment:
 *   get:
 *     summary: Capturar un pago en PayPal
 *     description: Captura el dinero asociado a una orden de PayPal, completando la transacción.
 *     tags: [Payments]
 *     parameters:
 *       - in: query
 *         name: token
 *         required: true
 *         schema:
 *           type: string
 *         description: Token de la orden generado por PayPal.
 *     responses:
 *       201:
 *         description: Pago capturado con éxito.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: ID de la transacción capturada.
 *                   example: 5O190127TN364715T
 *                 status:
 *                   type: string
 *                   description: Estado de la captura del pago.
 *                   example: COMPLETED
 *                 purchase_units:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       reference_id:
 *                         type: string
 *                         description: ID de referencia de la compra.
 *                       payments:
 *                         type: object
 *                         description: Detalles del pago.
 *       400:
 *         description: Order ID faltante o inválido.
 *       500:
 *         description: Error interno del servidor.
 */
router.get('/execute-payment', executePayment);

export default router;