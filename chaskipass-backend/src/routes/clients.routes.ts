import { deleteClient, getClients, createClient, updateClient, getClientByDNI,  } from './../controllers/clients.controllers';
import { Router } from 'express';
import protectRoute from '../middleware/protectRoute.middleware'; // Middleware de protección (opcional, si se requiere protección)

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Clients
 *   description: Gestión de clientes
 */

/**
 * @swagger
 * /chaski/api/clients/:
 *   get:
 *     summary: Obtener lista de clientes
 *     description: Retorna una lista de clientes asociados a la cooperativa. Admite paginación.
 *     tags: [Clients]
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
 *         description: Lista de clientes obtenida con éxito.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   dni:
 *                     type: string
 *                     description: DNI del cliente.
 *                   name:
 *                     type: string
 *                     description: Nombre del cliente.
 *                   last_name:
 *                     type: string
 *                     description: Apellido del cliente.
 *                   email:
 *                     type: string
 *                     description: Correo electrónico del cliente.
 *                   phone:
 *                     type: string
 *                     description: Teléfono del cliente.
 *       401:
 *         description: Usuario no autenticado.
 *       500:
 *         description: Error interno del servidor.
 */
router.get('/', protectRoute, getClients);
/**
 * @swagger
 * /chaski/api/clients/dni/{dni}:
 *   get:
 *     summary: Obtener cliente por DNI
 *     description: Retorna la información de un cliente específico utilizando su DNI.
 *     tags: [Clients]
 *     security:
 *       - bearerAuth: [] # Token JWT necesario
 *     parameters:
 *       - in: path
 *         name: dni
 *         required: true
 *         schema:
 *           type: string
 *         description: DNI del cliente.
 *     responses:
 *       200:
 *         description: Información del cliente obtenida con éxito.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 dni:
 *                   type: string
 *                 name:
 *                   type: string
 *                 last_name:
 *                   type: string
 *                 email:
 *                   type: string
 *                 phone:
 *                   type: string
 *       404:
 *         description: Cliente no encontrado.
 *       500:
 *         description: Error interno del servidor.
 */
router.get('/dni/:dni', protectRoute, getClientByDNI);
/**
 * @swagger
 * /chaski/api/clients/newclients:
 *   post:
 *     summary: Crear un nuevo cliente
 *     description: Registra un nuevo cliente en el sistema.
 *     tags: [Clients]
 *     security:
 *       - bearerAuth: [] # Token JWT necesario
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               dni:
 *                 type: string
 *                 description: DNI del cliente.
 *               name:
 *                 type: string
 *                 description: Nombre del cliente.
 *               last_name:
 *                 type: string
 *                 description: Apellido del cliente.
 *               email:
 *                 type: string
 *                 description: Correo electrónico del cliente.
 *               phone:
 *                 type: string
 *                 description: Teléfono del cliente.
 *               address:
 *                 type: string
 *                 description: Dirección del cliente.
 *     responses:
 *       201:
 *         description: Cliente creado con éxito.
 *       400:
 *         description: Datos inválidos o incompletos.
 *       500:
 *         description: Error interno del servidor.
 */  
router.post('/newclients', protectRoute, createClient);  
/**
 * @swagger
 * /chaski/api/clients/updateclients/{dni}:
 *   put:
 *     summary: Actualizar cliente
 *     description: Permite modificar los datos de un cliente existente.
 *     tags: [Clients]
 *     security:
 *       - bearerAuth: [] # Token JWT necesario
 *     parameters:
 *       - in: path
 *         name: dni
 *         required: true
 *         schema:
 *           type: string
 *         description: DNI del cliente.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               last_name:
 *                 type: string
 *               email:
 *                 type: string
 *               phone:
 *                 type: string
 *               address:
 *                 type: string
 *     responses:
 *       200:
 *         description: Cliente actualizado con éxito.
 *       404:
 *         description: Cliente no encontrado.
 *       500:
 *         description: Error interno del servidor.
 */
router.put('/updateclients/:dni', protectRoute, updateClient);  
/**
 * @swagger
 * /chaski/api/clients/deleteclients/{dni}:
 *   delete:
 *     summary: Eliminar cliente
 *     description: Elimina un cliente del sistema utilizando su DNI.
 *     tags: [Clients]
 *     security:
 *       - bearerAuth: [] # Token JWT necesario
 *     parameters:
 *       - in: path
 *         name: dni
 *         required: true
 *         schema:
 *           type: string
 *         description: DNI del cliente.
 *     responses:
 *       200:
 *         description: Cliente eliminado con éxito.
 *       404:
 *         description: Cliente no encontrado.
 *       500:
 *         description: Error interno del servidor.
 */
router.delete('/deleteclients/:dni', protectRoute, deleteClient);  

export default router;
