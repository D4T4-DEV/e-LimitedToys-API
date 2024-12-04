const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

// Ruta de la carpeta donde se guardarán las claves
const keysDir = path.join(__dirname, 'KEYS');

// Crear la carpeta KEYS si no existe
if (!fs.existsSync(keysDir)) {
  fs.mkdirSync(keysDir, { recursive: true });
}

const tamanioClave_en_bits = 9216;

// Generar las claves y guardarlas en la carpeta KEYS
crypto.generateKeyPair('rsa', {
  modulusLength: tamanioClave_en_bits,
  publicKeyEncoding: {
    type: 'spki',
    format: 'pem',
  },
  privateKeyEncoding: {
    type: 'pkcs8',
    format: 'pem',
  },
}, (err, publicKey, privateKey) => {
  if (err) {
    console.error('Error al generar las claves:', err);
    return;
  }

  // Rutas para guardar las claves
  const publicKeyPath = path.join(keysDir, 'public_key.pem');
  const privateKeyPath = path.join(keysDir, 'private_key.pem');

  // Guardar la clave pública
  fs.writeFileSync(publicKeyPath, publicKey);
  console.log(`Clave pública guardada en ${publicKeyPath}`);

  // Guardar la clave privada
  fs.writeFileSync(privateKeyPath, privateKey);
  console.log(`Clave privada guardada en ${privateKeyPath}`);
});
