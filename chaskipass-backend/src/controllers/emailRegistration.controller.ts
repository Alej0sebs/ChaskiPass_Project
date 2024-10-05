import { Request, Response } from 'express';
import nodemailer from 'nodemailer';
import { createUserCooperative } from './users.controllers';

export class EmailRegistrationController {

    public registerAndSendEmail = async (req: Request, res: Response) => {
        try {
            const { dni, name, last_name, user_name, email, phone, address, role_id, cooperative_id } = req.body;

            // Generar contraseña aleatoria
            const password = this.generateRandomPassword();

            // Preparar los datos para createUserCooperative
            const createUserReq = {
                body: {
                    dni,
                    name,
                    last_name,
                    user_name,
                    email,
                    phone,
                    password,
                    confirmPassword: password,
                    address,
                    role_id,
                    cooperative_id
                }
            } as Request;

            // Crear una respuesta simulada para capturar el resultado de createUserCooperative
            let createUserRes: { status: number; json: any } = { status: 0, json: {} };
            const mockRes = {
                status: (statusCode: number) => {
                    createUserRes.status = statusCode;
                    return {
                        json: (data: any) => {
                            createUserRes.json = data;
                        }
                    };
                }
            } as Response;

            // Llamar a createUserCooperative --controlar el flujo para que no cree el usuario si no se envia el mail
            await createUserCooperative(createUserReq, mockRes);

            // Verificar el resultado de createUserCooperative
            if (createUserRes.status !== 201) {
                // Si no se creó el usuario, devolver la respuesta de error
                res.status(createUserRes.status).json(createUserRes.json);
                return;
            }

            // Si el usuario se creó exitosamente, enviar el correo
            await this.sendEmail(email, password,user_name);

            // Devolver la respuesta de éxito
            res.status(201).json({
                msg: "Usuario registrado y correo enviado con éxito"
            });
            return

        } catch (error) {
            console.error('Error en el registro y envío de correo:', error);
            res.status(500).json({ msg: 'Error interno del servidor en el proceso de registro y envío de correo' });
        }
    };
    
    private generateRandomPassword(): string {
        return Math.random().toString(36).slice(-8);
    }

    private async sendEmail(to: string, password: string, name: string) {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        await transporter.sendMail({
            from: {
                name: 'ChaskiPass',
                address: process.env.EMAIL_USER || 'default@example.com'
            },
            to: to,
            subject: `Bienvenido a ChaskiPass -  ${name}`,
            text: `Bienvenido a nuestra plataforma. Tu contraseña temporal es: ${password}. Por favor, cámbiala después de iniciar sesión.`
        });
    }
}