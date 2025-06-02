import { Router } from "express";
import { createCooperative,  createNewStation,  createRoles, createSaasAdministrator } from "../controllers/administrators.controllers";
import {registerAndSendEmail } from "../controllers/users.controllers";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: SaaSAdministration
 *   description: Gestión de administradores SaaS, cooperativas, roles y estaciones
 */

/**
 * @swagger
 * /ruta593/api/admins/:
 *   post:
 *     summary: Crear administrador SaaS
 *     description: Permite crear un nuevo administrador SaaS.
 *     tags: [SaaSAdministration]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               dni:
 *                 type: string
 *                 description: DNI del administrador.
 *                 example: 1234567890
 *               user_name:
 *                 type: string
 *                 description: Nombre de usuario del administrador.
 *                 example: adminuser
 *               email:
 *                 type: string
 *                 description: Correo electrónico del administrador.
 *                 example: admin@example.com
 *               password:
 *                 type: string
 *                 description: Contraseña para el administrador.
 *                 example: securePassword123
 *     responses:
 *       201:
 *         description: Administrador SaaS creado con éxito.
 *       500:
 *         description: Error interno del servidor.
 */
router.post('/', createSaasAdministrator);
/**
 * @swagger
 * /ruta593/api/admins/coop:
 *   post:
 *     summary: Crear una cooperativa
 *     description: Permite registrar una nueva cooperativa en el sistema.
 *     tags: [SaaSAdministration]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *                 description: ID único de la cooperativa.
 *                 example: coop123
 *               name:
 *                 type: string
 *                 description: Nombre de la cooperativa.
 *                 example: Cooperativa XYZ
 *               address:
 *                 type: string
 *                 description: Dirección de la cooperativa.
 *                 example: Calle 123
 *               phone:
 *                 type: string
 *                 description: Teléfono de contacto.
 *                 example: +123456789
 *               email:
 *                 type: string
 *                 description: Correo electrónico de contacto.
 *                 example: info@cooperativa.com
 *               logo:
 *                 type: string
 *                 description: URL del logo de la cooperativa.
 *     responses:
 *       201:
 *         description: Cooperativa creada con éxito.
 *       500:
 *         description: Error interno del servidor.
 */
router.post('/coop', createCooperative);
/**
 * @swagger
 * /ruta593/api/admins/tenant:
 *   post:
 *     summary: Registrar un inquilino (tenant) y enviar correo
 *     description: Registra un nuevo usuario (inquilino) asociado a una cooperativa y envía un correo con su contraseña temporal.
 *     tags:
 *       - SaaSAdministration
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
 *                 description: DNI del usuario.
 *                 example: 1234567890
 *               name:
 *                 type: string
 *                 description: Nombre del usuario.
 *                 example: Juan
 *               last_name:
 *                 type: string
 *                 description: Apellido del usuario.
 *                 example: Pérez
 *               user_name:
 *                 type: string
 *                 description: Nombre de usuario.
 *                 example: juanperez
 *               email:
 *                 type: string
 *                 description: Correo electrónico del usuario.
 *                 example: juan.perez@example.com
 *               phone:
 *                 type: string
 *                 description: Teléfono del usuario.
 *                 example: +123456789
 *               address:
 *                 type: string
 *                 description: Dirección del usuario.
 *                 example: Calle Principal 123
 *               role_id:
 *                 type: string
 *                 description: ID del rol del usuario.
 *                 example: role123
 *               cooperative_id:
 *                 type: string
 *                 description: ID de la cooperativa asociada.
 *                 example: coop123
 *     responses:
 *       201:
 *         description: Usuario registrado y correo enviado con éxito.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   description: Mensaje de éxito.
 *                   example: Usuario creado exitosamente.
 *                 user:
 *                   type: object
 *                   description: Detalles del usuario registrado.
 *                   properties:
 *                     id:
 *                       type: string
 *                     name:
 *                       type: string
 *                     email:
 *                       type: string
 *       400:
 *         description: Datos inválidos o faltantes.
 *       500:
 *         description: Error interno del servidor.
 */

router.post('/tenant', registerAndSendEmail);
/**
 * @swagger
 * /ruta593/api/admins/role:
 *   post:
 *     summary: Crear un rol
 *     description: Permite crear un nuevo rol en el sistema.
 *     tags: [SaaSAdministration]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *                 description: ID único del rol.
 *                 example: role123
 *               name:
 *                 type: string
 *                 description: Nombre del rol.
 *                 example: Gerente
 *               description:
 *                 type: string
 *                 description: Descripción del rol.
 *                 example: Rol encargado de la gestión general.
 *     responses:
 *       201:
 *         description: Rol creado con éxito.
 *       500:
 *         description: Error interno del servidor.
 */
router.post('/role', createRoles);
/**
 * @swagger
 * /ruta593/api/admins/busStation:
 *   post:
 *     summary: Crear una nueva estación
 *     description: Permite registrar una nueva estación de autobús.
 *     tags: [SaaSAdministration]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               city_id:
 *                 type: string
 *                 description: ID de la ciudad donde se encuentra la estación.
 *                 example: city123
 *               name:
 *                 type: string
 *                 description: Nombre de la estación.
 *                 example: Terminal Central
 *               address:
 *                 type: string
 *                 description: Dirección de la estación.
 *                 example: Avenida Principal
 *               phone:
 *                 type: string
 *                 description: Teléfono de contacto de la estación.
 *                 example: +987654321
 *               open_time:
 *                 type: string
 *                 description: Hora de apertura de la estación.
 *                 example: 06:00
 *               close_time:
 *                 type: string
 *                 description: Hora de cierre de la estación.
 *                 example: 22:00
 *     responses:
 *       201:
 *         description: Estación creada con éxito.
 *       500:
 *         description: Error interno del servidor.
 */
router.post('/busStation', createNewStation);

export default router;