import { Router } from "express";
import { getDrivers, getUserById, getUsers, registerAndSendEmail, updateUser} from "../controllers/users.controllers";
import protectRoute from "../middleware/protectRoute.middleware";
import { logoutUser } from "../controllers/auth.controllers";


const router = Router();
/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Gestión de usuarios
 */

/**
 * @swagger
 * /chaski/api/users/:
 *   get:
 *     summary: Obtener lista de usuarios
 *     description: Retorna una lista de usuarios asociados a la cooperativa del usuario autenticado.
 *     tags: [Users]
 *     security:
 *       - bearerAuth: [] # Token JWT necesario
 *     responses:
 *       201:
 *         description: Lista de usuarios obtenida con éxito.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   dni:
 *                     type: string
 *                     description: DNI del usuario.
 *                   name:
 *                     type: string
 *                     description: Nombre del usuario.
 *                   last_name:
 *                     type: string
 *                     description: Apellido del usuario.
 *                   email:
 *                     type: string
 *                     description: Correo electrónico.
 *                   phone:
 *                     type: string
 *                     description: Teléfono del usuario.
 *                   role_id:
 *                     type: string
 *                     description: Rol del usuario.
 *       500:
 *         description: Error interno del servidor.
 */
router.get('/', protectRoute ,getUsers);

/**
 * @swagger
 * /chaski/api/users/drivers:
 *   get:
 *     summary: Obtener lista de conductores
 *     description: Retorna una lista de conductores asociados a la cooperativa del usuario autenticado.
 *     tags: [Users]
 *     security:
 *       - bearerAuth: [] # Token JWT necesario
 *     responses:
 *       201:
 *         description: Lista de conductores obtenida con éxito.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   dni:
 *                     type: string
 *                     description: DNI del conductor.
 *                   name:
 *                     type: string
 *                     description: Nombre del conductor.
 *                   last_name:
 *                     type: string
 *                     description: Apellido del conductor.
 *                   email:
 *                     type: string
 *                     description: Correo electrónico.
 *                   phone:
 *                     type: string
 *                     description: Teléfono del conductor.
 *       500:
 *         description: Error interno del servidor.
 */
router.get('/drivers', protectRoute ,getDrivers);
/**
 * @swagger
 * /chaski/api/users/signUp:
 *   post:
 *     summary: Registrar un usuario y enviar correo
 *     description: Registra un nuevo usuario y envía un correo electrónico con la contraseña temporal.
 *     tags: [Users]
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
 *               name:
 *                 type: string
 *                 description: Nombre del usuario.
 *               last_name:
 *                 type: string
 *                 description: Apellido del usuario.
 *               user_name:
 *                 type: string
 *                 description: Nombre de usuario.
 *               email:
 *                 type: string
 *                 description: Correo electrónico.
 *               phone:
 *                 type: string
 *                 description: Teléfono del usuario.
 *               address:
 *                 type: string
 *                 description: Dirección del usuario.
 *               role_id:
 *                 type: string
 *                 description: Rol del usuario.
 *               cooperative_id:
 *                 type: string
 *                 description: ID de la cooperativa asociada.
 *     responses:
 *       201:
 *         description: Usuario registrado y correo enviado con éxito.
 *       500:
 *         description: Error interno del servidor.
 */
router.post('/signUp', protectRoute,registerAndSendEmail);
router.post('/signUp/admin' ,registerAndSendEmail);
/**
 * @swagger
 * /chaski/api/users/logout:
 *   get:
 *     summary: Cerrar sesión
 *     description: Cierra la sesión del usuario autenticado.
 *     tags: [Users]
 *     security:
 *       - bearerAuth: [] # Token JWT necesario
 *     responses:
 *       200:
 *         description: Sesión cerrada correctamente.
 *       500:
 *         description: Error interno del servidor.
 */
router.get('/logout', protectRoute,logoutUser);

/**
 * @swagger
 * /chaski/api/users/{dni}:
 *   get:
 *     summary: Obtener usuario por DNI
 *     description: Retorna la información de un usuario específico por su DNI.
 *     tags: [Users]
 *     security:
 *       - bearerAuth: [] # Token JWT necesario
 *     parameters:
 *       - in: path
 *         name: dni
 *         required: true
 *         schema:
 *           type: string
 *         description: DNI del usuario.
 *     responses:
 *       201:
 *         description: Información del usuario obtenida con éxito.
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
 *       500:
 *         description: Error interno del servidor.
 */

router.get('/:dni', protectRoute, getUserById);
/**
 * @swagger
 * /chaski/api/users/update:
 *   put:
 *     summary: Actualizar usuario
 *     description: Permite actualizar la información de un usuario existente.
 *     tags: [Users]
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
 *               name:
 *                 type: string
 *               last_name:
 *                 type: string
 *               user_name:
 *                 type: string
 *               phone:
 *                 type: string
 *               address:
 *                 type: string
 *               role_id:
 *                 type: string
 *               password:
 *                 type: string
 *                 description: Contraseña nueva.
 *     responses:
 *       201:
 *         description: Usuario actualizado con éxito.
 *       500:
 *         description: Error interno del servidor.
 */
router.put('/update', protectRoute, updateUser);

export default router;