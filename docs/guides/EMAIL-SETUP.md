# Configuración del Sistema de Correo Electrónico

Esta guía te ayudará a configurar el sistema de envío de correos para el formulario de contacto de PULSE HUB.

## 📧 Opción 1: Gmail (Recomendado para desarrollo)

### Paso 1: Crear una contraseña de aplicación en Gmail

1. **Habilitar verificación en 2 pasos**:
   - Ve a https://myaccount.google.com/security
   - En "Acceso a Google", habilita la "Verificación en 2 pasos"
   - Sigue los pasos para configurarla

2. **Crear contraseña de aplicación**:
   - Ve a https://myaccount.google.com/apppasswords
   - En "Seleccionar app", elige "Correo"
   - En "Seleccionar dispositivo", elige "Otro (nombre personalizado)"
   - Escribe "PULSE HUB" y haz clic en "Generar"
   - **Copia la contraseña de 16 caracteres que aparece**

### Paso 2: Configurar variables de entorno

Edita el archivo `apps/api/.env` y actualiza estas variables:

```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=tu-email@gmail.com
SMTP_PASS=la-password-de-aplicacion-que-copiaste
CONTACT_EMAIL=tu-email@gmail.com
FRONTEND_URL=http://localhost:3000
```

**Ejemplo real**:
```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=fernando.suarez@ecosdeliderazgo.com
SMTP_PASS=abcd efgh ijkl mnop
CONTACT_EMAIL=fernando.suarez@ecosdeliderazgo.com
FRONTEND_URL=http://localhost:3000
```

### Paso 3: Reiniciar el servidor

```bash
# Detén el servidor (Ctrl+C en la terminal del backend)
# Vuelve a iniciar
npm run dev
```

## 📧 Opción 2: Otros proveedores SMTP

### Gmail con puerto 465 (SSL)
```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
SMTP_SECURE=true
SMTP_USER=tu-email@gmail.com
SMTP_PASS=tu-password-de-aplicacion
```

### Outlook/Hotmail
```env
SMTP_HOST=smtp-mail.outlook.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=tu-email@outlook.com
SMTP_PASS=tu-password
```

### SendGrid
```env
SMTP_HOST=smtp.sendgrid.net
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=apikey
SMTP_PASS=tu-sendgrid-api-key
```

### Amazon SES
```env
SMTP_HOST=email-smtp.us-east-1.amazonaws.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=tu-aws-smtp-username
SMTP_PASS=tu-aws-smtp-password
```

## 🧪 Probar el sistema

### 1. Verificar la conexión SMTP

Puedes verificar que la configuración es correcta usando el endpoint de health:

```bash
curl http://localhost:4000/api/v1/contact/health
```

Deberías recibir:
```json
{
  "success": true,
  "emailService": "connected",
  "message": "Servicio de correo funcionando correctamente"
}
```

### 2. Enviar un correo de prueba

1. Abre http://localhost:3000/contacto
2. Llena el formulario con datos de prueba:
   - **Nombre**: Juan Pérez
   - **Email**: tu-email@gmail.com (usa tu email real para recibir la confirmación)
   - **Empresa**: Empresa de Prueba
   - **Rol**: CEO/Dirección
   - **Mensaje**: Este es un mensaje de prueba

3. Haz clic en "Enviar Mensaje"

4. **Verifica**:
   - ✅ El frontend muestra "¡Gracias por tu mensaje!"
   - ✅ Recibes un correo de confirmación en tu bandeja de entrada
   - ✅ El correo de notificación llega a `CONTACT_EMAIL`

## 🐛 Solución de problemas

### Error: "Invalid login"
- Verifica que hayas creado una contraseña de aplicación (no uses tu contraseña normal de Gmail)
- Asegúrate de que la verificación en 2 pasos esté habilitada

### Error: "Connection timeout"
- Verifica que `SMTP_HOST` y `SMTP_PORT` sean correctos
- Intenta cambiar `SMTP_PORT` a 465 y `SMTP_SECURE` a true

### No llegan los correos
- Revisa la carpeta de Spam
- Verifica que `SMTP_USER` sea un email válido
- Confirma que `CONTACT_EMAIL` esté correctamente configurado

### Error: "self signed certificate"
Si usas un servidor SMTP con certificado autofirmado, agrega esto en `contact.service.ts`:

```typescript
this.transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
  tls: {
    rejectUnauthorized: false  // ⚠️ Solo para desarrollo
  }
});
```

## 📊 Logs y debugging

Para ver logs detallados de nodemailer, agrega esto en `contact.service.ts`:

```typescript
this.transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: process.env.SMTP_SECURE === 'true',
  debug: true,  // Activa logs detallados
  logger: true, // Muestra en consola
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});
```

## 🚀 Producción

Para producción, considera usar servicios dedicados:

- **SendGrid**: Hasta 100 correos/día gratis
- **Mailgun**: Hasta 1,000 correos/mes gratis
- **Amazon SES**: Muy económico, ~$0.10 por 1,000 correos
- **Resend**: Moderna API, 100 correos/día gratis

Estos servicios tienen mejor deliverability y estadísticas que Gmail.

## 🔐 Seguridad

**Importantes**:
- ✅ Nunca commits el archivo `.env` a Git
- ✅ Usa contraseñas de aplicación, no contraseñas reales
- ✅ En producción, usa variables de entorno del servidor (Vercel, Railway, etc.)
- ✅ Considera rate limiting para prevenir spam

## 📞 Soporte

Si tienes problemas, contacta a: fernando.suarez@ecosdeliderazgo.com
