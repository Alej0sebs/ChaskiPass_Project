import { Router } from 'express';
import protectRoute from '../middleware/protectRoute.middleware'; 
import { createTypeSeat, getTypeSeats } from '../controllers/typeSeats.controllers';

const router = Router();
/**
 * @swagger
 * tags:
 *   name: TypeSeats
 *   description: Gestión de tipos de asientos
 */

/**
 * @swagger
 * /ruta593/api/typeSeats/:
 *   get:
 *     summary: Obtener tipos de asientos
 *     description: Retorna una lista de tipos de asientos asociados a la cooperativa del usuario autenticado.
 *     tags: [TypeSeats]
 *     security:
 *       - bearerAuth: [] # Token JWT necesario
 *     responses:
 *       201:
 *         description: Lista de tipos de asientos obtenida con éxito.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     description: ID único del tipo de asiento.
 *                   cooperative_id:
 *                     type: string
 *                     description: ID de la cooperativa asociada.
 *                   name:
 *                     type: string
 *                     description: Nombre del tipo de asiento.
 *                   description:
 *                     type: string
 *                     description: Descripción del tipo de asiento.
 *                   additional_cost:
 *                     type: number
 *                     description: Costo adicional asociado al tipo de asiento.
 *                   special_caracter:
 *                     type: string
 *                     description: Características especiales del asiento.
 *       500:
 *         description: Error interno del servidor.
 */
router.get('/', protectRoute, getTypeSeats);
/**
 * @swagger
 * /ruta593/api/typeSeats/createType:
 *   post:
 *     summary: Crear un tipo de asiento
 *     description: Permite crear un nuevo tipo de asiento para la cooperativa del usuario autenticado.
 *     tags: [TypeSeats]
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
 *                 description: Nombre del tipo de asiento.
 *                 example: Asiento VIP
 *               description:
 *                 type: string
 *                 description: Descripción del tipo de asiento.
 *                 example: Asiento con mayor comodidad y espacio.
 *               additional_cost:
 *                 type: number
 *                 description: Costo adicional por seleccionar este tipo de asiento.
 *                 example: 5.0
 *               special_caracter:
 *                 type: string
 *                 description: Características especiales del asiento.
 *                 example: Mayor inclinación, pantalla táctil.
 *     responses:
 *       201:
 *         description: Tipo de asiento creado con éxito.
 *       400:
 *         description: Datos inválidos o faltantes.
 *       500:
 *         description: Error interno del servidor.
 */
router.post('/createType', protectRoute, createTypeSeat);


export default router;
