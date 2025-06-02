import { Router } from "express";
import { getBusStation, getCities } from "../controllers/ubications.controllers";
import protectRoute from "../middleware/protectRoute.middleware";

const router = Router();
/**
 * @swagger
 * tags:
 *   name: Locations
 *   description: Gestión de ciudades y estaciones de autobús
 */


/**
 * @swagger
 * /ruta593/api/ubi/:
 *   get:
 *     summary: Obtener lista de ciudades
 *     description: Retorna una lista paginada de las ciudades registradas en el sistema.
 *     tags: [Locations]
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
 *       201:
 *         description: Lista de ciudades obtenida con éxito.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     description: ID único de la ciudad.
 *                   name:
 *                     type: string
 *                     description: Nombre de la ciudad.
 *                   state:
 *                     type: string
 *                     description: Estado o provincia de la ciudad.
 *       500:
 *         description: Error interno del servidor.
 */
router.get('/', getCities);

/**
 * @swagger
 * /ruta593/api/ubi/busStations:
 *   get:
 *     summary: Obtener estaciones de autobús
 *     description: Retorna una lista de todas las estaciones de autobús registradas en el sistema.
 *     tags: [Locations]
 *     security:
 *       - bearerAuth: [] # Token JWT necesario
 *     responses:
 *       200:
 *         description: Lista de estaciones de autobús obtenida con éxito.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     description: ID único de la estación.
 *                   name:
 *                     type: string
 *                     description: Nombre de la estación.
 *                   city:
 *                     type: string
 *                     description: Ciudad donde se encuentra la estación.
 *                   address:
 *                     type: string
 *                     description: Dirección de la estación.
 *                   coordinates:
 *                     type: object
 *                     description: Coordenadas geográficas de la estación.
 *                     properties:
 *                       latitude:
 *                         type: number
 *                         description: Latitud de la estación.
 *                       longitude:
 *                         type: number
 *                         description: Longitud de la estación.
 *       404:
 *         description: No se encontraron estaciones de autobús.
 *       500:
 *         description: Error interno del servidor.
 */
router.get('/busStations', protectRoute, getBusStation);


export default router;