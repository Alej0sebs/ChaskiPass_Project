import { Router } from "express";
import protectRoute from "../middleware/protectRoute.middleware";
import { creatSellerSerialNumber, getSerialNumberByStationAndDNI, getSerialNumbers } from "../controllers/serialStation.controllers";

const router= Router();

/**
 * @swagger
 * tags:
 *   name: SerialNumbers
 *   description: Gestión de números de serie de vendedores
 */

/**
 * @swagger
 * /ruta593/api/serialNumbers/:
 *   get:
 *     summary: Obtener todos los números de serie
 *     description: Retorna una lista paginada de los números de serie registrados en el sistema.
 *     tags: [SerialNumbers]
 *     security:
 *       - bearerAuth: [] # Token JWT necesario
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Número de página para la paginación.
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Cantidad de resultados por página.
 *     responses:
 *       200:
 *         description: Lista de números de serie obtenida con éxito.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: ID del número de serie.
 *                   cooperative_id:
 *                     type: string
 *                     description: ID de la cooperativa asociada.
 *                   station_id:
 *                     type: string
 *                     description: ID de la estación asociada.
 *                   serial_number:
 *                     type: string
 *                     description: Número de serie asignado.
 *                   user_id:
 *                     type: string
 *                     description: ID del usuario asociado.
 *                   status:
 *                     type: boolean
 *                     description: Estado del número de serie (activo/inactivo).
 *       500:
 *         description: Error interno del servidor.
 */
router.get('/', protectRoute, getSerialNumbers);
/**
 * @swagger
 * /ruta593/api/serialNumbers/serial:
 *   post:
 *     summary: Crear un número de serie para un vendedor
 *     description: Asigna un número de serie a un vendedor asociado a una estación.
 *     tags: [SerialNumbers]
 *     security:
 *       - bearerAuth: [] # Token JWT necesario
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               station_id:
 *                 type: string
 *                 description: ID de la estación asociada.
 *               serial_number:
 *                 type: string
 *                 description: Número de serie a asignar.
 *               user_id:
 *                 type: string
 *                 description: ID del usuario asociado.
 *               status:
 *                 type: boolean
 *                 description: Estado del número de serie (activo/inactivo).
 *     responses:
 *       201:
 *         description: Número de serie creado con éxito.
 *       400:
 *         description: Datos inválidos o faltantes.
 *       500:
 *         description: Error interno del servidor.
 */
router.post('/serial', protectRoute, creatSellerSerialNumber);

/**
 * @swagger
 * /ruta593/api/serialNumbers/serialSeller:
 *   get:
 *     summary: Obtener número de serie por estación y DNI
 *     description: Retorna el número de serie asignado a un vendedor en una estación específica.
 *     tags: [SerialNumbers]
 *     security:
 *       - bearerAuth: [] # Token JWT necesario
 *     responses:
 *       200:
 *         description: Número de serie obtenido con éxito.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: ID del número de serie.
 *                 cooperative_id:
 *                   type: string
 *                   description: ID de la cooperativa asociada.
 *                 station_id:
 *                   type: string
 *                   description: ID de la estación asociada.
 *                 serial_number:
 *                   type: string
 *                   description: Número de serie asignado.
 *                 user_id:
 *                   type: string
 *                   description: ID del usuario asociado.
 *                 status:
 *                   type: boolean
 *                   description: Estado del número de serie (activo/inactivo).
 *       404:
 *         description: No se encontró ningún número de serie para la combinación proporcionada.
 *       500:
 *         description: Error interno del servidor.
 */
router.get('/serialSeller', protectRoute, getSerialNumberByStationAndDNI);

export default router;