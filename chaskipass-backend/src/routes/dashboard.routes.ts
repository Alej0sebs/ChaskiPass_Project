import { Router } from "express";
import protectRoute from "../middleware/protectRoute.middleware";
import { getActiveFrequenciesAmount, getClientsAmount, getSoldTicketsAmount, getTotalSales } from "../controllers/dashboard.controllers";

const router = Router();

/**
 * @swagger
 * /chaski/api/activeFreq:
 *   get:
 *     summary: Obtener la cantidad de frecuencias activas
 *     description: Retorna la cantidad de frecuencias activas asociadas a una cooperativa.
 *     tags: [Dashboard]
 *     security:
 *       - bearerAuth: [] # Token JWT necesario
 *     responses:
 *       200:
 *         description: Cantidad de frecuencias activas obtenida con éxito.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 200
 *                 data:
 *                   type: integer
 *                   example: 10
 *       500:
 *         description: Error interno del servidor.
 */
router.get('/activeFreq', protectRoute, getActiveFrequenciesAmount);
/**
 * @swagger
 * /chaski/api/soldTickets:
 *   get:
 *     summary: Obtener la cantidad de boletos vendidos
 *     description: Retorna la cantidad de boletos vendidos asociados a una cooperativa.
 *     tags: [Dashboard]
 *     security:
 *       - bearerAuth: [] # Token JWT necesario
 *     responses:
 *       200:
 *         description: Cantidad de boletos vendidos obtenida con éxito.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 200
 *                 data:
 *                   type: integer
 *                   example: 350
 *       500:
 *         description: Error interno del servidor.
 */
router.get('/soldTickets', protectRoute, getSoldTicketsAmount);
/**
 * @swagger
 * /chaski/api/numberClients:
 *   get:
 *     summary: Obtener el número de clientes
 *     description: Retorna el número total de clientes asociados a una cooperativa.
 *     tags: [Dashboard]
 *     security:
 *       - bearerAuth: [] # Token JWT necesario
 *     responses:
 *       200:
 *         description: Número de clientes obtenido con éxito.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 200
 *                 data:
 *                   type: integer
 *                   example: 120
 *       500:
 *         description: Error interno del servidor.
 */
router.get('/numberClients', protectRoute, getClientsAmount);
/**
 * @swagger
 * /chaski/api/totalSales:
 *   get:
 *     summary: Obtener el monto total de ventas
 *     description: Retorna el monto total de las ventas realizadas por una cooperativa.
 *     tags: [Dashboard]
 *     security:
 *       - bearerAuth: [] # Token JWT necesario
 *     responses:
 *       200:
 *         description: Monto total de ventas obtenido con éxito.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 200
 *                 data:
 *                   type: number
 *                   example: 15400.75
 *       500:
 *         description: Error interno del servidor.
 */
router.get('/totalSales', protectRoute, getTotalSales);

export default router;