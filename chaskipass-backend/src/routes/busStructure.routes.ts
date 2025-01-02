import { Router } from "express";
import protectRoute from "../middleware/protectRoute.middleware";
import { createBusStructure, getBusStructure } from "../controllers/busStructure.controllers";

const router = Router();
/**
 * @swagger
 * tags:
 *   name: BusStructure
 *   description: Gestión de estructuras de autobuses
 */

/**
 * @swagger
 * /chaski/api/busStructure/:
 *   get:
 *     summary: Obtener estructuras de autobuses
 *     description: Retorna las estructuras de autobuses asociadas a una cooperativa específica.
 *     tags: [BusStructure]
 *     security:
 *       - bearerAuth: [] # Token JWT necesario
 *     parameters:
 *       - in: query
 *         name: cooperative_id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la cooperativa cuyas estructuras se desean consultar.
 *     responses:
 *       200:
 *         description: Lista de estructuras de autobuses obtenida con éxito.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: ID único de la estructura.
 *                   name:
 *                     type: string
 *                     description: Nombre de la estructura.
 *                   layout:
 *                     type: object
 *                     description: Diseño de la estructura en formato JSON.
 *       401:
 *         description: Usuario no autenticado.
 *       404:
 *         description: No se encontraron estructuras para la cooperativa.
 *       500:
 *         description: Error interno del servidor.
 */
router.get('/', protectRoute, getBusStructure);

/**
 * @swagger
 * /chaski/api/busStructure/layout:
 *   post:
 *     summary: Crear nueva estructura de autobús
 *     description: Permite registrar una nueva estructura de autobús asociada a una cooperativa.
 *     tags: [BusStructure]
 *     security:
 *       - bearerAuth: [] # Token JWT necesario
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nombre de la estructura.
 *                 example: Estructura de 40 asientos
 *               layout:
 *                 type: object
 *                 description: Diseño de la estructura en formato JSON.
 *                 example: { "rows": 10, "columns": 4, "special_seats": ["1A", "2B"] }
 *               cooperative_id:
 *                 type: string
 *                 description: ID de la cooperativa a la que pertenece la estructura.
 *                 example: "12345"
 *     responses:
 *       201:
 *         description: Estructura creada con éxito.
 *       400:
 *         description: Datos inválidos o incompletos.
 *       500:
 *         description: Error interno del servidor.
 */
router.post('/layout', protectRoute, createBusStructure );  

export default router;
