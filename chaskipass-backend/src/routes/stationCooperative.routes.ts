import { Router } from "express";
import { getAllStationCooperative, getStationCooperative, linkCooperativeStation } from "../controllers/stationCooperative.controllers";
import protectRoute from "../middleware/protectRoute.middleware";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: StationCooperative
 *   description: Gestión de estaciones y cooperativas
 */

/**
 * @swagger
 * /chaski/api/linkedStations/allLinkedCooperatives:
 *   get:
 *     summary: Obtener todas las cooperativas vinculadas
 *     description: Retorna una lista de todas las estaciones vinculadas a la cooperativa del usuario autenticado.
 *     tags: [StationCooperative]
 *     security:
 *       - bearerAuth: [] # Token JWT necesario
 *     responses:
 *       200:
 *         description: Lista de estaciones vinculadas obtenida con éxito.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: ID de la vinculación.
 *                   cooperative_id:
 *                     type: string
 *                     description: ID de la cooperativa.
 *                   station_id:
 *                     type: integer
 *                     description: ID de la estación vinculada.
 *       500:
 *         description: Error interno del servidor.
 */
router.get('/allLinkedCooperatives', protectRoute, getAllStationCooperative);
/**
 * @swagger
 * /chaski/api/linkedStations/linkCooperative/{id}:
 *   get:
 *     summary: Vincular una cooperativa a una estación
 *     description: Permite vincular una cooperativa a una estación específica mediante su ID.
 *     tags: [StationCooperative]
 *     security:
 *       - bearerAuth: [] # Token JWT necesario
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la estación a vincular.
 *     responses:
 *       201:
 *         description: Estación vinculada con éxito.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: ID de la vinculación creada.
 *                 cooperative_id:
 *                   type: string
 *                   description: ID de la cooperativa.
 *                 station_id:
 *                   type: integer
 *                   description: ID de la estación vinculada.
 *       400:
 *         description: Datos inválidos.
 *       500:
 *         description: Error interno del servidor.
 */
router.get('/linkCooperative/:id', protectRoute, linkCooperativeStation);
/**
 * @swagger
 * /chaski/api/linkedStations/:
 *   get:
 *     summary: Obtener estaciones vinculadas a una cooperativa
 *     description: Retorna una lista paginada de las estaciones vinculadas a la cooperativa del usuario autenticado.
 *     tags: [StationCooperative]
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
 *         description: Lista de estaciones vinculadas obtenida con éxito.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: ID de la vinculación.
 *                   cooperative_id:
 *                     type: string
 *                     description: ID de la cooperativa.
 *                   station_id:
 *                     type: integer
 *                     description: ID de la estación vinculada.
 *       500:
 *         description: Error interno del servidor.
 */
router.get('/', protectRoute, getStationCooperative);

export default router;