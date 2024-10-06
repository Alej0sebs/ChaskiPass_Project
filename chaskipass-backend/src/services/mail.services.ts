import nodemailer from 'nodemailer';

// Servicio para enviar email
export const sendEmail = async (to: string, password: string, name: string) => {
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

    return transporter.sendMail({
        from: {
            name: 'ChaskiPass',
            address: process.env.EMAIL_USER || 'default@example.com'
        },
        to: to,
        subject: `Bienvenido a ChaskiPass - ${name}`,
        html: `
            <h1>Bienvenido a ChaskiPass</h1>
            <p>Hola <strong>${name}</strong>,</p>
            <p>Gracias por registrarte en nuestra plataforma. Aquí tienes tu contraseña temporal:</p>
            <p style="font-size: 18px; font-weight: bold;">${password}</p>
            <p>Por favor, cámbiala después de iniciar sesión.</p>
            <p>Saludos,<br/>El equipo de ChaskiPass</p>
        `
    });
};