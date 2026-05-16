const cloudinary = require('cloudinary').v2;
const fs = require('fs');
const path = require('path');
require('dotenv').config();

// Configuración
// Configuración corregida
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, // Quitamos el .local
  api_key: process.env.CLOUDINARY_API_KEY,      // Quitamos el .local
  api_secret: process.env.CLOUDINARY_API_SECRET, // Quitamos el .local
  secure: true
});

const PUBLIC_DIR = path.join(__dirname, 'public'); // Carpeta origen
const CLOUDINARY_FOLDER = 'iglesia-portal'; // Carpeta destino en la nube

// Función recursiva para leer archivos
async function uploadFiles(dirPath) {
  const files = fs.readdirSync(dirPath);

  for (const file of files) {
    const fullPath = path.join(dirPath, file);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      await uploadFiles(fullPath); // Si es carpeta, entrar en ella
    } else if (/\.(jpg|jpeg|png|gif|webp|svg)$/i.test(file)) {
      // Si es imagen, subirla
      try {
        const relativePath = path.relative(PUBLIC_DIR, dirPath);
        const folderName = path.join(CLOUDINARY_FOLDER, relativePath).replace(/\\/g, '/');

        const result = await cloudinary.uploader.upload(fullPath, {
          folder: folderName,
          use_filename: true,
          unique_filename: false,
          overwrite: true,
        });

        console.log(`✅ Subida: ${file} -> ${result.secure_url}`);
      } catch (error) {
        console.error(`❌ Error subiendo ${file}:`, error.message);
      }
    }
  }
}

console.log('🚀 Iniciando subida masiva a Cloudinary...');
uploadFiles(PUBLIC_DIR).then(() => {
  console.log('✨ Proceso finalizado.');
});