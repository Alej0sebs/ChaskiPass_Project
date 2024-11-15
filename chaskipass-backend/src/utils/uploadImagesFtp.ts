import { Client } from 'basic-ftp';

async function uploadToHostinger(buffer: Buffer, remoteFileName: string) {
    const client = new Client();
    client.ftp.verbose = false; //true para ver logs

    try {
        await client.access({
            host: process.env.FTP_IP,      // Cambia con tu host FTP
            user: process.env.FTP_USERNAME,              // Usuario FTP
            password: process.env.FTP_PASSWORD,          // Contraseña FTP
            secure: false
        });
        
        // Sube el contenido del buffer directamente al FTP
        const { Readable } = require('stream');
        const readableStream = new Readable();
        readableStream.push(buffer);
        readableStream.push(null);
        await client.uploadFrom(readableStream, remoteFileName);
    } catch (error) {
        console.error("Error al subir al FTP:", error);
    } finally {
        client.close();
    }
}

export default uploadToHostinger;
