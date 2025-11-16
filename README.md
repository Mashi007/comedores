# Sistema de Gestión de Comedores Industriales

Demo HTML completo de un sistema integral para la gestión de comedores industriales, incluyendo inventarios, producción, compras y servicio al cliente.

## 🚀 Características

### Módulos Principales

1. **Dashboard**
   - 6 gráficos de alta calidad con métricas clave
   - KPIs en tiempo real
   - Visualización de tendencias

2. **Ingreso de Compras**
   - Simulación de OCR a través de WhatsApp
   - Dashboard con resumen de facturas
   - Filtros y KPIs de compras
   - Gestión de proveedores

3. **Inventario**
   - Registro de entradas y salidas
   - Formulario interactivo con listas desplegables
   - Simulación de registro por WhatsApp
   - Alertas de stock mínimo

4. **Planificación de Menús**
   - Creación de menús diarios
   - Gestión de recetas con materiales estándar
   - Generación automática de pedidos de compra
   - Cálculo de necesidades vs inventario

5. **Producción**
   - Reportes de producción por receta
   - Control de charolas servidas
   - Registro de merma/desperdicios
   - Envío de reportes por WhatsApp

6. **Servicio al Cliente**
   - Creación de encuestas personalizadas
   - Generación de códigos QR
   - Compartir encuestas fácilmente

7. **Notificaciones Inteligentes**
   - Alertas de consumo vs planificado
   - Notificaciones de inventario bajo
   - Recordatorios de gestión de compras
   - Alertas de menús planificados

8. **Configuración**
   - Parámetros del sistema
   - Configuración de integraciones
   - Ajustes generales

## 🔐 Credenciales de Acceso

**Email:** `admin@comedor.com`  
**Contraseña:** `demo123`

## 📋 Requisitos

- Navegador web moderno (Chrome, Firefox, Edge, Safari)
- Conexión a internet (para cargar librerías externas)

## 🛠️ Tecnologías Utilizadas

- **HTML5** - Estructura
- **CSS3** - Estilos modernos y responsive
- **JavaScript (Vanilla)** - Lógica de la aplicación
- **Chart.js** - Gráficos interactivos
- **QRCode.js** - Generación de códigos QR

## 📦 Estructura del Proyecto

```
comedores/
├── index.html      # Archivo principal HTML
├── styles.css      # Estilos CSS
├── app.js          # Lógica JavaScript y mock data
└── README.md       # Documentación
```

## 🎯 Uso

1. Abrir `index.html` en un navegador web
2. En la portada, hacer clic en "Iniciar Sesión"
3. Ingresar las credenciales: `admin@comedor.com` / `demo123`
4. Navegar por los diferentes módulos desde el menú principal

## 📱 Funcionalidades de WhatsApp (Simuladas)

El sistema incluye simulaciones de integración con WhatsApp para:
- Ingreso de facturas mediante OCR
- Registro de movimientos de inventario
- Reportes de producción

Estas funciones muestran modales que simulan el envío y recepción de mensajes por WhatsApp.

## 📊 Datos Mock

El sistema incluye datos de ejemplo pre-cargados:
- 10 productos en inventario
- 12 facturas de compra
- Movimientos de inventario
- Menús planificados
- Reportes de producción
- Encuestas generadas

## 🎨 Diseño

- Interfaz moderna y limpia
- Diseño responsive (adaptable a móviles y tablets)
- Colores y tipografía profesionales
- Animaciones y transiciones suaves
- Iconos emoji para mejor UX

## ⚠️ Nota

Este es un **demo funcional** sin conexión a base de datos real. Todos los datos se almacenan en memoria durante la sesión del navegador.

## 🔄 Próximos Pasos (Para Implementación Real)

- Conexión a base de datos
- Autenticación real
- Integración con WhatsApp Business API
- Integración con servicios OCR reales
- Sistema de usuarios y permisos
- Exportación de reportes
- Historial completo de transacciones

---

Desarrollado como demo para gestión de comedores industriales.
