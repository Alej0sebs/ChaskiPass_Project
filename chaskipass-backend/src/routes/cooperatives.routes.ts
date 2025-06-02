import { Router } from "express";
import protectRoute from "../middleware/protectRoute.middleware";
import { getCooperativeByID, getCooperatives, updateCooperative } from "../controllers/cooperatives.controllers";
import upload from "../middleware/multer.middleware";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Cooperatives
 *   description: Gestión de cooperativas
 */

/**
 * @swagger
 * /ruta593/api/cooperatives/:
 *   get:
 *     summary: Obtener todas las cooperativas
 *     description: Retorna una lista de todas las cooperativas disponibles.
 *     tags: [Cooperatives]
 *     security:
 *       - bearerAuth: [] # Token JWT necesario
 *     responses:
 *       200:
 *         description: Lista de cooperativas obtenida con éxito.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     description: ID único de la cooperativa.
 *                   name:
 *                     type: string
 *                     description: Nombre de la cooperativa.
 *                   address:
 *                     type: string
 *                     description: Dirección de la cooperativa.
 *                   phone:
 *                     type: string
 *                     description: Teléfono de contacto.
 *                   email:
 *                     type: string
 *                     description: Correo electrónico.
 *                   logo:
 *                     type: string
 *                     description: URL del logo de la cooperativa.
 *                   ticket_counter:
 *                     type: integer
 *                     description: Contador de tickets de la cooperativa.
 *       500:
 *         description: Error interno del servidor.
 */
router.get('/', protectRoute, getCooperatives);
router.get('/admin', getCooperatives);
/**
 * @swagger
 * /ruta593/api/cooperatives/{id}:
 *   get:
 *     summary: Obtener información de una cooperativa por ID
 *     description: Retorna la información de una cooperativa específica usando su ID.
 *     tags: [Cooperatives]
 *     security:
 *       - bearerAuth: [] # Token JWT necesario
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la cooperativa.
 *     responses:
 *       200:
 *         description: Información de la cooperativa obtenida con éxito.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 name:
 *                   type: string
 *                 address:
 *                   type: string
 *                 phone:
 *                   type: string
 *                 email:
 *                   type: string
 *                 logo:
 *                   type: string
 *                 ticket_counter:
 *                   type: integer
 *       404:
 *         description: Cooperativa no encontrada.
 *       500:
 *         description: Error interno del servidor.
 */
router.get('/:id', protectRoute, getCooperativeByID);
/**
 * @swagger
 * /ruta593/api/cooperatives/updateCooperative:
 *   put:
 *     summary: Actualizar datos de una cooperativa
 *     description: Permite modificar los datos de una cooperativa específica, incluyendo su logo.
 *     tags: [Cooperatives]
 *     security:
 *       - bearerAuth: [] # Token JWT necesario
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nombre de la cooperativa.
 *               address:
 *                 type: string
 *                 description: Dirección de la cooperativa.
 *               phone:
 *                 type: string
 *                 description: Teléfono de la cooperativa.
 *               email:
 *                 type: string
 *                 description: Correo electrónico de la cooperativa.
 *               logo:
 *                 type: string
 *                 format: binary
 *                 description: Archivo del logo (opcional).
 *               ticket_counter:
 *                 type: integer
 *                 description: Contador de tickets de la cooperativa.
 *     responses:
 *       200:
 *         description: Cooperativa actualizada con éxito.
 *       400:
 *         description: Datos inválidos o faltantes.
 *       404:
 *         description: Cooperativa no encontrada.
 *       500:
 *         description: Error interno del servidor.
 */
router.put('/updateCooperative', protectRoute, upload.single('logo'), updateCooperative);

export default router;