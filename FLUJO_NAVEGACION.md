# Flujo de Navegación - Sistema de Gestión Comedores Industriales

## Orden de Pantallas

### 1. **PORTADA** (Pantalla Inicial)
- **ID**: `portada`
- **Estado inicial**: `class="screen active"`
- **Descripción**: Pantalla de bienvenida con logo, características y botón "Iniciar Sesión"
- **Sin sidebar**: Pantalla pública
- **Navegación**: Click en "Iniciar Sesión" → va a **LOGIN**

### 2. **LOGIN** (Autenticación)
- **ID**: `login`
- **Estado inicial**: `class="screen"` (oculta)
- **Descripción**: Formulario de inicio de sesión
- **Credenciales demo**: 
  - Email: `admin@comedor.com`
  - Password: `demo-credential-2024`
- **Sin sidebar**: Pantalla pública
- **Navegación**: 
  - Login exitoso → va a **MENU** (sistema)
  - Login fallido → permanece en **LOGIN**

### 3. **SISTEMA** (Pantallas con Sidebar)
- **Pantallas del sistema**:
  - `menu` - Menú principal (primera pantalla después del login)
  - `dashboard` - Dashboard con gráficos
  - `compras` - Ingreso de compras
  - `inventario` - Gestión de inventario
  - `planificacion` - Planificación de menús
  - `produccion` - Reporte de producción
  - `servicio` - Servicio al cliente
  - `notificaciones` - Notificaciones inteligentes
  - `configuracion` - Configuración del sistema

- **Con sidebar**: Todas las pantallas del sistema tienen sidebar retráctil
- **Navegación**: Se navega entre pantallas usando el sidebar o botones del menú

## Flujo Completo

```
PORTADA (activa al inicio)
    ↓ [Click "Iniciar Sesión"]
LOGIN
    ↓ [Login exitoso]
MENU (sistema con sidebar)
    ↓ [Navegación por sidebar]
DASHBOARD / COMPRAS / INVENTARIO / etc.
```

## Funciones Clave

- `mostrarLogin()`: Navega de PORTADA → LOGIN
- `validarLogin()`: Valida credenciales y navega de LOGIN → MENU
- `cambiarPantalla(ocultar, mostrar)`: Función genérica para cambiar pantallas
- `navegar(destino)`: Navega entre pantallas del sistema (con sidebar)

## Diferenciación de Pantallas

- **Pantallas públicas** (sin sidebar): `portada`, `login`
- **Pantallas del sistema** (con sidebar): `menu`, `dashboard`, `compras`, `inventario`, `planificacion`, `produccion`, `servicio`, `notificaciones`, `configuracion`

