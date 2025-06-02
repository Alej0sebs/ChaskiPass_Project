import { Router } from "express";
import protectRoute from "../middleware/protectRoute.middleware";
import { busRegister, editBusById, getBuses } from "../controllers/buses.controllers";
import upload from "../middleware/multer.middleware";


const router = Router();

/**
 * @swagger
 * tags:
 *   name: Buses
 *   description: Gestión de autobuses para cooperativas
 */

/**
 * @swagger
 * /ruta593/api/buses/:
 *   get:
 *     summary: Obtener lista de autobuses
 *     description: Retorna una lista de autobuses pertenecientes a la cooperativa del usuario autenticado.
 *     tags: [Buses]
 *     security:
 *       - bearerAuth: [] # Token JWT necesario
 *     responses:
 *       200:
 *         description: Lista de autobuses obtenida con éxito.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: ID único del autobús.
 *                   bus_number:
 *                     type: string
 *                     description: Número del autobús.
 *                   license_plate:
 *                     type: string
 *                     description: Placa del autobús.
 *                   model:
 *                     type: string
 *                     description: Modelo del autobús.
 *                   capacity:
 *                     type: integer
 *                     description: Capacidad del autobús.
 *       401:
 *         description: Usuario no autenticado.
 *       500:
 *         description: Error interno del servidor.
 */
router.get('/', protectRoute, getBuses);

/**
 * @swagger
 * /ruta593/api/buses/newBus:
 *   post:
 *     summary: Registrar un nuevo autobús
 *     description: Permite registrar un nuevo autobús en la cooperativa asociada al usuario autenticado.
 *     tags: [Buses]
 *     security:
 *       - bearerAuth: [] # Token JWT necesario
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               bus_number:
 *                 type: string
 *                 description: Número del autobús.
 *                 example: 123
 *               license_plate:
 *                 type: string
 *                 description: Placa del autobús.
 *                 example: ABC-1234
 *               chassis_vin:
 *                 type: string
 *                 description: Número de chasis del autobús.
 *               bus_manufacturer:
 *                 type: string
 *                 description: Fabricante del autobús.
 *                 example: Mercedes-Benz
 *               model:
 *                 type: string
 *                 description: Modelo del autobús.
 *                 example: Sprinter
 *               year:
 *                 type: integer
 *                 description: Año de fabricación.
 *                 example: 2020
 *               capacity:
 *                 type: integer
 *                 description: Capacidad de pasajeros.
 *                 example: 45
 *               bus_structure_id:
 *                 type: integer
 *                 description: ID de la estructura del autobús.
 *                 example: 1
 *               busImage:
 *                 type: string
 *                 format: binary
 *                 description: Imagen del autobús.
 *     responses:
 *       201:
 *         description: Autobús registrado con éxito.
 *       400:
 *         description: Faltan datos requeridos o error en la solicitud.
 *       500:
 *         description: Error interno del servidor.
 */
router.post('/newBus', protectRoute, upload.single('busImage') ,busRegister);

/**
 * @swagger
 * /ruta593/api/buses/updateBus{id}:
 *   put:
 *     summary: Actualizar un autobús
 *     description: Permite editar la información de un autobús existente.
 *     tags: [Buses]
 *     security:
 *       - bearerAuth: [] # Token JWT necesario
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del autobús a editar.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               bus_number:
 *                 type: string
 *                 description: Número del autobús.
 *                 example: 123
 *               license_plate:
 *                 type: string
 *                 description: Placa del autobús.
 *                 example: ABC-1234
 *               chassis_vin:
 *                 type: string
 *                 description: Número de chasis del autobús.
 *               bus_manufacturer:
 *                 type: string
 *                 description: Fabricante del autobús.
 *                 example: Mercedes-Benz
 *               model:
 *                 type: string
 *                 description: Modelo del autobús.
 *                 example: Sprinter
 *               year:
 *                 type: integer
 *                 description: Año de fabricación.
 *                 example: 2020
 *               capacity:
 *                 type: integer
 *                 description: Capacidad de pasajeros.
 *                 example: 45
 *               picture:
 *                 type: string
 *                 description: URL de la imagen del autobús.
 *     responses:
 *       200:
 *         description: Autobús actualizado con éxito.
 *       404:
 *         description: Autobús no encontrado.
 *       500:
 *         description: Error interno del servidor.
 */
router.put('/updateBus:id', protectRoute, editBusById);

// router.delete('/deleteBus:id', protectRoute, deleteBusById);

export default router;