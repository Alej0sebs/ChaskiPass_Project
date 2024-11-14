import multer from 'multer';
import path from 'path';

// Configuración de almacenamiento de multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../bus_images')); // Asegúrate de que esta ruta sea válida en tu servidor
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }
});

// Configura `multer` con el almacenamiento definido
const upload = multer({ storage });

// Este middleware se debe usar en las rutas donde se quiere su uso para uso en otras rutas
export const uploadSingleImage = upload.single('busImage'); // Para una sola imagen

export const uploadMultipleImages = upload.array('images', 5); // Ejemplo para múltiples imágenes, máximo 5
