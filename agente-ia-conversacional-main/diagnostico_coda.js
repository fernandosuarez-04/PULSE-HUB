// Script de diagnóstico para problemas con Coda
import 'dotenv/config';
import { saveWeatherToCoda } from './server/tools/coda.js';

console.log('🔍 DIAGNÓSTICO DE INTEGRACIÓN CON CODA');
console.log('=====================================\n');

// 1. Verificar variables de entorno
console.log('1️⃣ VERIFICACIÓN DE VARIABLES DE ENTORNO:');
console.log('----------------------------------------');
const envVars = {
  'OPENWEATHER_API_KEY': process.env.OPENWEATHER_API_KEY,
  'CODA_API_KEY': process.env.CODA_API_KEY,
  'CODA_DOC_ID': process.env.CODA_DOC_ID,
  'CODA_TABLE_ID': process.env.CODA_TABLE_ID
};

let allConfigured = true;
for (const [key, value] of Object.entries(envVars)) {
  if (value) {
    console.log(`✅ ${key}: Configurada (${value.substring(0, 10)}...)`);
  } else {
    console.log(`❌ ${key}: NO CONFIGURADA`);
    allConfigured = false;
  }
}

if (!allConfigured) {
  console.log('\n⚠️  ALGUNAS VARIABLES NO ESTÁN CONFIGURADAS');
  console.log('💡 Crea un archivo .env con las siguientes variables:');
  console.log('   OPENWEATHER_API_KEY=tu_api_key_de_openweathermap');
  console.log('   CODA_API_KEY=tu_api_key_de_coda');
  console.log('   CODA_DOC_ID=el_id_de_tu_documento_coda');
  console.log('   CODA_TABLE_ID=grid-U-9NXo6GH5');
  console.log('\n📖 Para obtener las credenciales de Coda:');
  console.log('   1. Ve a https://coda.io/developers');
  console.log('   2. Crea un token de API');
  console.log('   3. Obtén el ID del documento desde la URL');
  console.log('   4. Obtén el ID de la tabla desde la URL o API');
  process.exit(1);
}

console.log('\n2️⃣ PRUEBA DE GUARDADO EN CODA:');
console.log('------------------------------');

// Datos de prueba
const testData = {
  city: 'Madrid (Prueba)',
  temperature: 25.5,
  notes: 'Prueba de diagnóstico - ' + new Date().toLocaleString(),
  tableId: process.env.CODA_TABLE_ID || 'grid-U-9NXo6GH5'
};

console.log('📊 Datos de prueba:', testData);

try {
  console.log('\n🔄 Enviando datos a Coda...');
  const result = await saveWeatherToCoda(testData);
  
  if (result) {
    console.log('✅ ¡ÉXITO! Datos guardados correctamente en Coda');
    console.log('📋 Resultado:', JSON.stringify(result, null, 2));
  } else {
    console.log('❌ FALLO: No se pudieron guardar los datos en Coda');
    console.log('🔍 Revisa los logs anteriores para más detalles');
  }
} catch (error) {
  console.log('❌ ERROR: Ocurrió un error durante la prueba');
  console.error('🔍 Detalles del error:', error);
}

console.log('\n3️⃣ INSTRUCCIONES PARA SOLUCIONAR PROBLEMAS:');
console.log('---------------------------------------------');
console.log('Si la prueba falló, verifica:');
console.log('• Las variables de entorno están correctamente configuradas');
console.log('• El token de API de Coda es válido y tiene permisos');
console.log('• El ID del documento existe y es accesible');
console.log('• El ID de la tabla existe en el documento');
console.log('• La tabla tiene las columnas correctas (ciudad, temperatura, hora_consulta, notes)');
