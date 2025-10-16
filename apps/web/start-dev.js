/**
 * Script de inicio personalizado para Next.js
 * Copia el archivo .env desde la raíz del proyecto a apps/web
 * para que Next.js pueda acceder a las variables de entorno
 */

const { copyFileSync, existsSync } = require('fs');
const { resolve } = require('path');
const { spawn } = require('child_process');

// Rutas de los archivos .env
const sourceEnvPath = resolve(__dirname, '../../.env');
const targetEnvPath = resolve(__dirname, '.env.local');

console.log('📋 Sincronizando variables de entorno...\n');

// Verificar que el archivo .env de la raíz existe
if (!existsSync(sourceEnvPath)) {
  console.error('❌ Error: No se encontró el archivo .env en la raíz del proyecto');
  console.error('   Ubicación esperada:', sourceEnvPath);
  console.error('\n   Por favor, crea el archivo .env en la raíz del proyecto.');
  process.exit(1);
}

try {
  // Copiar el archivo .env de la raíz a apps/web/.env.local
  copyFileSync(sourceEnvPath, targetEnvPath);
  console.log('✅ Variables de entorno sincronizadas correctamente');
  console.log('   Origen:', sourceEnvPath);
  console.log('   Destino:', targetEnvPath);
  
  // Cargar y verificar las variables
  const { config } = require('dotenv');
  const result = config({ path: targetEnvPath });
  
  if (result.parsed) {
    console.log('\n📦 Variables cargadas:');
    console.log('   OPENAI_API_KEY:', process.env.OPENAI_API_KEY ? '✓ Configurada' : '✗ No configurada');
    console.log('   OPENAI_MODEL:', process.env.OPENAI_MODEL || 'No configurado');
    console.log('   OPENAI_MAX_TOKENS:', process.env.OPENAI_MAX_TOKENS || 'No configurado');
  }
  
} catch (error) {
  console.error('❌ Error al copiar el archivo .env:', error.message);
  process.exit(1);
}

// Ejecutar Next.js dev server
console.log('\n🚀 Iniciando Next.js en modo desarrollo...\n');

const child = spawn('npx', ['next', 'dev', '-p', '3000'], {
  stdio: 'inherit',
  shell: true,
  env: { ...process.env }
});

child.on('exit', (code) => {
  process.exit(code);
});

