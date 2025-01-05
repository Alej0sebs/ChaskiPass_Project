import { Router } from 'express';
import protectRoute from '../middleware/protectRoute.middleware'; 
import { getSeatsStructure } from '../controllers/seatStructure.controllers';
import { getAllFrecuencyClients, getFrecuencyClients, getTicketData, sellTicket, sellTicketData } from '../controllers/tickets.controllers';

const router = Router();
/**
 * @swagger
 * tags:
 *   name: TicketsAndSeats
 *   description: Gestión de boletos y asientos
 */

/**
 * @swagger
 * /chaski/api/tickets/seats:
 *   post:
 *     summary: Obtener estructura de asientos
 *     description: Retorna la estructura de asientos de un autobús para una frecuencia específica.
 *     tags: [TicketsAndSeats]
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
 *               frequency_id:
 *                 type: string
 *                 description: ID de la frecuencia.
 *               bus_structure_id:
 *                 type: string
 *                 description: ID de la estructura del autobús.
 *     responses:
 *       200:
 *         description: Estructura de asientos obtenida con éxito.
 *       500:
 *         description: Error al obtener los datos.
 */
router.post('/seats', protectRoute, getSeatsStructure);
/**
 * @swagger
 * /chaski/api/tickets/sell:
 *   post:
 *     summary: Vender un boleto
 *     description: Permite registrar la venta de un boleto para una frecuencia específica.
 *     tags: [TicketsAndSeats]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               serial_number:
 *                 type: string
 *                 description: Número de serie del vendedor.
 *               frequency_id:
 *                 type: string
 *                 description: ID de la frecuencia.
 *               price:
 *                 type: number
 *                 description: Precio del boleto.
 *               departure_station:
 *                 type: string
 *                 description: Estación de partida.
 *               arrival_station:
 *                 type: string
 *                 description: Estación de llegada.
 *               date:
 *                 type: string
 *                 format: date
 *                 description: Fecha de la venta.
 *               selectedSeats:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: Lista de asientos seleccionados.
 *               cooperative_id:
 *                 type: string
 *                 description: ID de la cooperativa.
 *               payment_method:
 *                 type: string
 *                 description: Método de pago utilizado.
 *               serial_id:
 *                 type: string
 *                 description: ID del número de serie asociado.
 *     responses:
 *       201:
 *         description: Boleto vendido con éxito.
 *       400:
 *         description: Datos inválidos.
 *       500:
 *         description: Error interno del servidor.
 */
router.post('/sell', sellTicket);
/**
 * @swagger
 * /chaski/api/tickets/sellData:
 *   post:
 *     summary: Registrar múltiples boletos
 *     description: Permite registrar información de múltiples boletos en una sola solicitud.
 *     tags: [TicketsAndSeats]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: array
 *             items:
 *               type: object
 *               properties:
 *                 dia:
 *                   type: string
 *                   description: Día del viaje.
 *                 horaSalida:
 *                   type: string
 *                   description: Hora de salida.
 *                 horaLlegada:
 *                   type: string
 *                   description: Hora de llegada.
 *                 placa:
 *                   type: string
 *                   description: Placa del autobús.
 *                 terminal:
 *                   type: string
 *                   description: Terminal de partida.
 *                 destino:
 *                   type: string
 *                   description: Destino del viaje.
 *                 nombres:
 *                   type: string
 *                   description: Nombres del cliente.
 *                 apellidos:
 *                   type: string
 *                   description: Apellidos del cliente.
 *                 tipoDocumento:
 *                   type: string
 *                   description: Tipo de documento del cliente.
 *                 numeroDocumento:
 *                   type: string
 *                   description: Número de documento del cliente.
 *                 price:
 *                   type: number
 *                   description: Precio del boleto.
 *                 seats:
 *                   type: string
 *                   description: Asientos seleccionados.
 *                 frecuencia:
 *                   type: string
 *                   description: ID de la frecuencia.
 *                 ticketCode:
 *                   type: string
 *                   description: Código del boleto.
 *     responses:
 *       201:
 *         description: Boletos registrados con éxito.
 *       500:
 *         description: Error interno del servidor.
 */
router.post('/sellData', sellTicketData);
/**
 * @swagger
 * /chaski/api/tickets/clients/{frequency_id}:
 *   get:
 *     summary: Obtener clientes por frecuencia
 *     description: Retorna la lista de clientes que han comprado boletos para una frecuencia específica.
 *     tags: [TicketsAndSeats]
 *     security:
 *       - bearerAuth: [] # Token JWT necesario
 *     parameters:
 *       - in: path
 *         name: frequency_id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la frecuencia.
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
 *         description: Lista de clientes obtenida con éxito.
 *       500:
 *         description: Error interno del servidor.
 */
router.get('/clients/:frequency_id', protectRoute, getFrecuencyClients);
router.get('/Allclients/:frequency_id', getAllFrecuencyClients);
/**
 * @swagger
 * /chaski/api/tickets/data:
 *   get:
 *     summary: Obtener datos de boletos
 *     description: Retorna los datos de un boleto basado en la frecuencia y el asiento seleccionados.
 *     tags: [TicketsAndSeats]
 *     security:
 *       - bearerAuth: [] # Token JWT necesario
 *     parameters:
 *       - in: query
 *         name: frequency
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la frecuencia.
 *       - in: query
 *         name: seat
 *         required: true
 *         schema:
 *           type: string
 *         description: Asiento específico.
 *     responses:
 *       200:
 *         description: Datos del boleto obtenidos con éxito.
 *       500:
 *         description: Error interno del servidor.
 */
router.get('/data', protectRoute, getTicketData);
export default router;
