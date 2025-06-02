import { Router } from "express";
import { filterFrequencies } from "../controllers/filterFrequencies.controllers";
import protectRoute from "../middleware/protectRoute.middleware";
import { createFrequency, createRoute, deleteFrequencyByID, editFrequency, getFrequencies, getFrequenciesPhone, getRoutes } from "../controllers/routes.controllers";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: RoutesAndFrequencies
 *   description: Gestión de rutas y frecuencias
 */

/**
 * @swagger
 * /ruta593/api/frequency/:
 *   post:
 *     summary: Filtrar frecuencias
 *     description: Filtra las frecuencias disponibles según los criterios proporcionados.
 *     tags: [RoutesAndFrequencies]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               date:
 *                 type: string
 *                 format: date
 *                 description: Fecha de las frecuencias.
 *               departure_station:
 *                 type: string
 *                 description: Estación de partida.
 *               arrival_station:
 *                 type: string
 *                 description: Estación de llegada.
 *     responses:
 *       200:
 *         description: Lista de frecuencias filtrada con éxito.
 *       400:
 *         description: Parámetros inválidos.
 *       500:
 *         description: Error interno del servidor.
 */
router.post('/', filterFrequencies);
/**
 * @swagger
 * /ruta593/api/frequency/route:
 *   post:
 *     summary: Crear una nueva ruta
 *     description: Permite registrar una nueva ruta asociada a una cooperativa.
 *     tags: [RoutesAndFrequencies]
 *     security:
 *       - bearerAuth: [] # Token JWT necesario
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               departure_station_id:
 *                 type: string
 *                 description: ID de la estación de partida.
 *               arrival_station_id:
 *                 type: string
 *                 description: ID de la estación de llegada.
 *               stopOverList:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: Lista de estaciones intermedias.
 *               departure_time:
 *                 type: string
 *                 description: Hora de salida.
 *               arrival_time:
 *                 type: string
 *                 description: Hora de llegada.
 *               default_price:
 *                 type: number
 *                 description: Precio base de la ruta.
 *     responses:
 *       201:
 *         description: Ruta creada con éxito.
 *       400:
 *         description: Datos inválidos o faltantes.
 *       500:
 *         description: Error interno del servidor.
 */
router.post('/route', protectRoute, createRoute);
/**
 * @swagger
 * /ruta593/api/frequency/frequency:
 *   post:
 *     summary: Crear una nueva frecuencia
 *     description: Permite registrar una frecuencia asociada a una ruta y un autobús.
 *     tags: [RoutesAndFrequencies]
 *     security:
 *       - bearerAuth: [] # Token JWT necesario
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               bus_id:
 *                 type: string
 *                 description: ID del autobús.
 *               route_id:
 *                 type: string
 *                 description: ID de la ruta.
 *               driver_id:
 *                 type: string
 *                 description: ID del conductor.
 *               date:
 *                 type: string
 *                 format: date
 *                 description: Fecha de la frecuencia.
 *               departure_time:
 *                 type: string
 *                 description: Hora de salida.
 *               arrival_time:
 *                 type: string
 *                 description: Hora de llegada.
 *               price:
 *                 type: number
 *                 description: Precio de la frecuencia.
 *               status:
 *                 type: boolean
 *                 description: Estado de la frecuencia.
 *     responses:
 *       201:
 *         description: Frecuencia creada con éxito.
 *       400:
 *         description: Datos inválidos o faltantes.
 *       500:
 *         description: Error interno del servidor.
 */
router.post('/frequency', protectRoute, createFrequency);
/**
 * @swagger
 * /ruta593/api/frequency/routes:
 *   get:
 *     summary: Obtener rutas
 *     description: Retorna todas las rutas asociadas a la cooperativa.
 *     tags: [RoutesAndFrequencies]
 *     security:
 *       - bearerAuth: [] # Token JWT necesario
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Número de página.
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Cantidad de resultados por página.
 *     responses:
 *       200:
 *         description: Lista de rutas obtenida con éxito.
 *       500:
 *         description: Error interno del servidor.
 */

router.get('/routes', protectRoute, getRoutes);
/**
 * @swagger
 * /ruta593/api/frequency/frequencies:
 *   get:
 *     summary: Obtener frecuencias
 *     description: Retorna todas las frecuencias asociadas a la cooperativa.
 *     tags: [RoutesAndFrequencies]
 *     security:
 *       - bearerAuth: [] # Token JWT necesario
 *     responses:
 *       200:
 *         description: Lista de frecuencias obtenida con éxito.
 *       500:
 *         description: Error interno del servidor.
 */
router.get('/frequencies', protectRoute, getFrequencies);
router.get('/frequenciesPhone/:cooperative_id', getFrequenciesPhone);
/**
 * @swagger
 * /ruta593/api/frequency/edit:
 *   put:
 *     summary: Editar frecuencia
 *     description: Permite editar los datos de una frecuencia existente.
 *     tags: [RoutesAndFrequencies]
 *     security:
 *       - bearerAuth: [] # Token JWT necesario
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *               bus_id:
 *                 type: string
 *               driver_id:
 *                 type: string
 *               date:
 *                 type: string
 *                 format: date
 *               departure_time:
 *                 type: string
 *               arrival_time:
 *                 type: string
 *               price:
 *                 type: number
 *               status:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Frecuencia editada con éxito.
 *       404:
 *         description: Frecuencia no encontrada.
 *       500:
 *         description: Error interno del servidor.
 */

router.put('/edit', protectRoute, editFrequency);
/**
 * @swagger
 * /ruta593/api/frequency/delete/{id}:
 *   delete:
 *     summary: Eliminar frecuencia
 *     description: Elimina una frecuencia por su ID.
 *     tags: [RoutesAndFrequencies]
 *     security:
 *       - bearerAuth: [] # Token JWT necesario
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la frecuencia a eliminar.
 *     responses:
 *       200:
 *         description: Frecuencia eliminada con éxito.
 *       404:
 *         description: Frecuencia no encontrada.
 *       500:
 *         description: Error interno del servidor.
 */
router.delete('/delete/:id', protectRoute, deleteFrequencyByID);

export default router;