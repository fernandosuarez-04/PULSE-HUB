# 🧪 Guía de Evaluaciones Automáticas (Evals)

## 📋 Tabla de Contenidos
- [Comandos Disponibles](#comandos-disponibles)
- [Flujo en GitHub Actions](#flujo-en-github-actions)
- [Configuración de Secrets](#configuración-de-secrets)
- [Resultados y Reportes](#resultados-y-reportes)

## 🚀 Comandos Disponibles

### Ejecutar Todas las Evaluaciones
```bash
npm run evals
# Requiere: OPENWEATHER_API_KEY configurada
# Ejecuta: Exactitud + Tono + Latencia
# Resultado: Puntuación general + reporte completo
```

### Evaluaciones Individuales

#### 🎯 Exactitud (Accuracy)
```bash
npm run evals:accuracy
# Requiere: OPENWEATHER_API_KEY
# Evalúa: Precisión en respuestas de clima
# Tiempo: ~30 segundos
```

#### 🎭 Tono (Tone)
```bash
npm run evals:tone
# Requiere: Nada (funciona siempre)
# Evalúa: Amabilidad, coherencia, estilo
# Tiempo: ~20 segundos
```

#### ⚡ Latencia (Latency)
```bash
npm run evals:latency
# Requiere: Nada (funciona siempre)
# Evalúa: Tiempos de respuesta, consistencia
# Tiempo: ~40 segundos
```

## 🔄 Flujo en GitHub Actions

### ¿Cuándo se ejecuta automáticamente?

#### 1️⃣ Al hacer PUSH a main o develop
```bash
git add .
git commit -m "feat: nueva funcionalidad"
git push origin main
# ← Aquí se disparan las evaluaciones automáticamente
```

#### 2️⃣ Al crear o actualizar un Pull Request
```bash
git checkout -b feature/mi-feature
git add .
git commit -m "feat: implementar X"
git push origin feature/mi-feature
# Al crear el PR en GitHub:
# - ✅ Se ejecutan las evaluaciones
# - 💬 Se comenta en el PR con resultados
# - ⚠️ Si puntuación < 75%, se marca como warning
```

### 🎯 ¿Qué archivos disparan las evaluaciones?

**SÍ ejecuta evaluaciones:**
- Cambios en `server/**` (código del agente)
- Cambios en `evals/**` (código de evaluaciones)
- Cambios en `package.json`
- Cambios en `tsconfig.json`

**NO ejecuta evaluaciones:**
- Cambios en `README.md`
- Cambios en `docs/`
- Cambios en `client/`

### 📊 Flujo del Workflow

```
1. 📥 Checkout código
2. 📦 Instalar Node.js 20
3. 📦 Instalar dependencias (npm ci)
4. 🔧 Compilar TypeScript
5. 🎭 Ejecutar evaluaciones de tono ✅ (siempre)
6. ⚡ Ejecutar evaluaciones de latencia ✅ (siempre)
7. 🧪 Ejecutar evaluaciones de exactitud ⚠️ (solo si hay API key)
8. 📊 Generar reporte completo ⚠️ (solo si hay API key)
9. 📋 Subir reporte como artifact
10. 💬 Comentar en PR (si es PR)
```

## 🔐 Configuración de Secrets

### ¿Por qué necesito configurar un Secret?

Las evaluaciones de **exactitud** necesitan conectarse a la API de OpenWeather para obtener datos reales de clima. Sin este secret:
- ✅ Evaluaciones de **tono** funcionan
- ✅ Evaluaciones de **latencia** funcionan
- ❌ Evaluaciones de **exactitud** se omiten
- ⚠️ Reporte completo se omite

### Cómo configurar el Secret en GitHub

**Opción 1: Enlace directo**
```
https://github.com/nocode-ecosdeliderazgo/agente-ia-conversacional/settings/secrets/actions
```

**Opción 2: Paso a paso**
1. Ve a tu repositorio en GitHub
2. Click en **Settings** (⚙️)
3. En el menú izquierdo: **Secrets and variables** → **Actions**
4. Click **New repository secret**
5. Nombre: `OPENWEATHER_API_KEY`
6. Valor: `76804eeaba5d02d088c60b73c847e528`
7. Click **Add secret**

### Verificar que funciona

Después de configurar el secret:
1. Haz un commit pequeño: `git commit --allow-empty -m "test: verificar evals"`
2. Push: `git push origin main`
3. Ve a la pestaña **Actions** en GitHub
4. Verás el workflow ejecutándose
5. Debe mostrar **todas las evaluaciones** (incluida exactitud)

## 📊 Resultados y Reportes

### Dónde ver los resultados

#### En Local
```bash
npm run evals
# Resultados en consola + archivo guardado en:
# evals/reports/latest-report.json
# evals/reports/report-2025-10-08.json
```

#### En GitHub Actions
1. Ve a tu repositorio en GitHub
2. Click en **Actions** (pestaña superior)
3. Click en la ejecución del workflow
4. Expande los pasos para ver logs detallados
5. Descarga el artifact `evals-report` para ver el JSON completo

#### En Pull Requests
El bot comenta automáticamente con un resumen:
```markdown
## 🧪 Resultados de Evaluaciones Automáticas

### 📊 Puntuación General: **88.1%** (282/320)

### 📈 Métricas Detalladas:
- 🟢 **accuracy**: 86.0%
- 🟢 **tone**: 80.0%
- 🟢 **latency**: 100.0%

### 📝 Resumen:
Buen rendimiento. 3/3 métricas superaron el 80%.
Se recomiendan mejoras menores.

✅ **Excelente**: La puntuación general es satisfactoria.
```

### Interpretación de Resultados

#### Puntuación General
- **90-100%** 🟢 Excelente - Listo para producción
- **75-89%** 🟡 Bueno - Mejoras menores recomendadas
- **60-74%** 🟠 Aceptable - Mejoras importantes requeridas
- **0-59%** 🔴 Insuficiente - Requiere revisión completa

#### Por Métrica
- **Exactitud** (Accuracy): ¿Responde correctamente?
- **Tono** (Tone): ¿Es amigable y coherente?
- **Latencia** (Latency): ¿Responde rápidamente?

## 🛠️ Troubleshooting

### Error: "OPENWEATHER_API_KEY no está configurada"

**En Local:**
```bash
# Verifica que existe el archivo .env
cat .env
# Debe contener:

```

**En GitHub:**
- Verifica que configuraste el secret correctamente
- El nombre debe ser exactamente: `OPENWEATHER_API_KEY`
- Revisa en Settings → Secrets and variables → Actions

### El workflow no se ejecuta

**Posibles causas:**
1. Los archivos modificados no están en la lista de paths (ej: solo modificaste README.md)
2. El workflow está deshabilitado en Settings → Actions
3. El branch no es `main` ni `develop`

**Solución:**
```bash
# Forzar ejecución con commit vacío
git commit --allow-empty -m "test: trigger evals"
git push origin main
```

### Evaluaciones pasan en local pero fallan en GitHub

**Posibles causas:**
1. API key no configurada en GitHub
2. Diferencias de entorno (Node.js version, dependencias)
3. Tests no determinísticos

**Solución:**
```bash
# Ejecutar build local para simular CI
npm ci  # Instala dependencias limpias
npm run build
npm run evals
```

## 📈 Mejores Prácticas

### Antes de hacer commit
```bash
# Ejecuta las evaluaciones localmente
npm run evals

# Si todo pasa, haz commit
git add .
git commit -m "feat: tu mensaje"
git push
```

### En Pull Requests
1. Espera a que pasen las evaluaciones antes de pedir review
2. Si falla alguna métrica < 80%, investiga por qué
3. Usa los reportes para identificar qué mejorar

### Monitoreo continuo
- Revisa los trends de puntuación en cada PR
- Si la puntuación baja consistentemente, es señal de regresión
- Mantén la puntuación general > 85%

## 🎯 Próximos Pasos

1. ✅ Configurar `OPENWEATHER_API_KEY` en GitHub Secrets
2. ✅ Hacer un commit de prueba para verificar el workflow
3. ✅ Revisar el comentario automático en PRs
4. 🔄 Iterar mejorando las métricas que estén < 90%
5. 📊 Monitorear trends de calidad en cada release
