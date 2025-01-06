
# ChasskiPass

ChaskiPass es una aplicación desarrollada para la gestión y registro de usuarios en cooperativas de transporte, proporcionando una plataforma intuitiva y eficiente para manejar datos de identidad, cooperativas y roles de usuario.

## 🚀 Introducción

La aplicación resuelve problemas actuales asociados a la gestión manual de boletos y registros en el transporte interprovincial. Proporciona una solución centralizada y digital que permite:

- Facilitar la venta de boletos de buses.
- Gestionar cooperativas, rutas y frecuencias de forma eficiente.
- Implementar roles con permisos específicos.
- Proporcionar información detallada a usuarios finales.
- Asegurar transacciones mediante métodos de pago confiables.

---

## 🎯 Objetivos

- **Optimizar la venta de boletos** mediante una plataforma accesible y funcional.
- **Gestionar cooperativas y recursos** de manera eficiente.
- **Implementar roles de usuario** para mejorar la seguridad y asignar permisos adecuados.
- **Facilitar el acceso a información** detallada sobre rutas y servicios de buses.
- **Proveer métodos de pago seguros** e integraciones modernas.

---

## ⚙️ Tecnologías

| Componente        | Tecnología        |
|--------------------|-------------------|
| **Frontend Web**   | React (TypeScript)|
| **Backend**        | Node.js (TypeScript, Express) |
| **Base de Datos**  | MySQL             |
| **Servicios Externos** | Paypal (Pagos), Servicios de Correo |

---

## 🏗️ Arquitectura

### Arquitectura General
ChaskiPass sigue una **arquitectura monolítica** en el backend, pero separa los componentes del sistema en proyectos distintos:

1. **Frontend Web**: Plataforma de administración y venta.
2. **Aplicaciones Móviles**: Para usuarios finales y validación de pasajeros.
3. **Backend**: API RESTful que conecta los servicios.

---

## 📦 Componentes Principales

### Frontend Web
**Tecnologías:** React con TypeScript.

#### Funcionalidades:
- **Administración**:
  - Gestión de cooperativas, buses y usuarios.
  - Configuración de frecuencias y rutas.
- **Venta de Boletos**:
  - Interfaz para oficinistas con opciones de pago y generación de boletos.

---

### Aplicaciones Móviles
**Plataformas soportadas:** Android, iOS.

#### Funcionalidades:
1. **Aplicación para Usuarios Finales**:
   - Búsqueda de destinos y rutas.
   - Compra de boletos con filtros avanzados.
   - Generación de boletos electrónicos (QR/códigos de barras).

2. **Aplicación para Registro de Pasajeros**:
   - Escaneo de boletos electrónicos.
   - Verificación y registro de pasajeros al abordar.

---

### Backend
**Tecnologías:** Node.js, Express.js, TypeScript.

#### Funcionalidades:
- API RESTful para comunicación entre frontend y aplicaciones móviles.
- Autenticación y autorización con roles.
- Integración con servicios de pago (Paypal) y correo.
- Gestión de datos relacional en MySQL.

---

## 💻 Detalles de Implementación

### Roles de Usuario
- **Administradores**:
  - Gestión integral de cooperativas, rutas, buses y usuarios.
- **Oficinistas**:
  - Venta y validación de boletos.
- **Usuarios Finales**:
  - Búsqueda de rutas, compra de boletos y notificaciones.

### Flujo de Compra de Boletos
1. **Búsqueda de Rutas**:
   - Origen, destino y filtros avanzados.
2. **Selección de Ruta y Bus**:
   - Visualización de detalles.
3. **Proceso de Pago**:
   - Métodos: Paypal o efectivo.
4. **Generación de Boleto**:
   - Creación y envío por correo.
5. **Validación al Abordar**:
   - Escaneo del código en la aplicación móvil.

---

## 📜 Reglas de Negocio

1. **Gestión de Asientos**:
   - Disponibilidad por frecuencia y categorías.
2. **Precios de Boletos**:
   - Diferencias según tipo de asiento y ruta.
3. **Venta por Paradas**:
   - Permite tramos específicos de una ruta.

---

## 🛠 Requisitos No Funcionales

### Seguridad
- **Autenticación y Autorización**:
  - Roles y permisos mediante JWT.
- **Protección de Datos**:
  - Encriptación y cumplimiento normativo.

### Rendimiento
- **Optimización de Consultas**:
  - Índices en MySQL y API eficiente.
- **Escalabilidad**:
  - Preparación para despliegue en la nube.

### Disponibilidad
- **Resiliencia**:
  - Backups automáticos.
- **Accesibilidad**:
  - Interfaces amigables para múltiples dispositivos.

---

## 📈 Consideraciones de Escalabilidad

- **Preparación para Microservicios**:
  - Modularización para una transición futura.
- **Despliegue en la Nube**:
  - Plataformas como AWS, Azure o Google Cloud.

---

## 🔧 Desarrollo y DevOps

- **Control de Versiones**:
  - Uso de Git para mantener la integridad del código.
- **Entornos Separados**:
  - Desarrollo y producción con configuraciones específicas.
- **Automatización de Despliegues**:
  - Integración continua (CI/CD) para optimizar entregas.

---

## 📋 Instalación y Configuración

1. Clona el repositorio:
   ```bash
   git clone https://github.com/ANavas07/ChaskiPass_Project.git
Instala las dependencias:

bash
Copiar código
cd backend
npm install
cd ../frontend
npm install
Configura las variables de entorno:

.env para backend: credenciales de MySQL y servicios externos.
.env para frontend: URL de la API y configuración adicional.
Inicia los servicios:

bash
Copiar código
cd backend
npm run dev
cd ../frontend
npm run dev

Licencia

Este proyecto está licenciado bajo la licencia MIT. Consulta el archivo LICENSE para más información.

📬 Contacto

Si tienes preguntas o sugerencias, por favor contacta a nuestro equipo en chaskipass@gmail.com

© 2025 ChaskiPass. Todos los derechos reservados.


