// Mock Data
const mockData = {
    usuario: {
        email: 'admin@comedor.com',
        password: 'demo-credential-2024',
        nombre: 'Administrador'
    },
    productos: [
        { id: 1, nombre: 'Arroz', categoria: 'Granos', stock: 150, stockMinimo: 50, unidad: 'kg' },
        { id: 2, nombre: 'Frijoles', categoria: 'Granos', stock: 80, stockMinimo: 30, unidad: 'kg' },
        { id: 3, nombre: 'Papa', categoria: 'Verduras', stock: 200, stockMinimo: 100, unidad: 'kg' },
        { id: 4, nombre: 'Carne de Res', categoria: 'Carnes', stock: 120, stockMinimo: 50, unidad: 'kg' },
        { id: 5, nombre: 'Pollo', categoria: 'Carnes', stock: 90, stockMinimo: 40, unidad: 'kg' },
        { id: 6, nombre: 'Cebolla', categoria: 'Verduras', stock: 60, stockMinimo: 20, unidad: 'kg' },
        { id: 7, nombre: 'Tomate', categoria: 'Verduras', stock: 45, stockMinimo: 15, unidad: 'kg' },
        { id: 8, nombre: 'Aceite', categoria: 'Aceites', stock: 35, stockMinimo: 10, unidad: 'L' },
        { id: 9, nombre: 'Sal', categoria: 'Condimentos', stock: 25, stockMinimo: 5, unidad: 'kg' },
        { id: 10, nombre: 'Azúcar', categoria: 'Endulzantes', stock: 40, stockMinimo: 10, unidad: 'kg' },
        { id: 11, nombre: 'Huevos', categoria: 'Proteínas', stock: 500, stockMinimo: 200, unidad: 'unidades' },
        { id: 12, nombre: 'Café', categoria: 'Bebidas', stock: 15, stockMinimo: 5, unidad: 'kg' },
        { id: 13, nombre: 'Leche', categoria: 'Lácteos', stock: 80, stockMinimo: 30, unidad: 'L' },
        { id: 14, nombre: 'Pan', categoria: 'Panadería', stock: 50, stockMinimo: 20, unidad: 'kg' },
        { id: 15, nombre: 'Avena', categoria: 'Cereales', stock: 30, stockMinimo: 10, unidad: 'kg' },
        { id: 16, nombre: 'Naranjas', categoria: 'Frutas', stock: 100, stockMinimo: 40, unidad: 'kg' },
        { id: 17, nombre: 'Pescado', categoria: 'Carnes', stock: 60, stockMinimo: 25, unidad: 'kg' },
        { id: 18, nombre: 'Lechuga', categoria: 'Verduras', stock: 40, stockMinimo: 15, unidad: 'kg' },
        { id: 19, nombre: 'Harina', categoria: 'Granos', stock: 70, stockMinimo: 25, unidad: 'kg' },
        { id: 20, nombre: 'Refresco', categoria: 'Bebidas', stock: 200, stockMinimo: 80, unidad: 'L' },
        { id: 21, nombre: 'Gelatina', categoria: 'Postres', stock: 20, stockMinimo: 8, unidad: 'kg' },
        { id: 22, nombre: 'Té', categoria: 'Bebidas', stock: 10, stockMinimo: 4, unidad: 'kg' }
    ],
    compras: [
        { id: 1, fecha: '2024-01-15', proveedor: 'Proveedor A', factura: 'FAC-001', productos: 'Arroz, Frijoles, Papa', monto: 3500, estado: 'Procesada' },
        { id: 2, fecha: '2024-01-16', proveedor: 'Proveedor B', factura: 'FAC-002', productos: 'Carne de Res, Pollo', monto: 5200, estado: 'Procesada' },
        { id: 3, fecha: '2024-01-17', proveedor: 'Proveedor A', factura: 'FAC-003', productos: 'Cebolla, Tomate, Aceite', monto: 1800, estado: 'Pendiente' },
        { id: 4, fecha: '2024-01-18', proveedor: 'Proveedor C', factura: 'FAC-004', productos: 'Sal, Azúcar', monto: 950, estado: 'Procesada' },
        { id: 5, fecha: '2024-01-19', proveedor: 'Proveedor B', factura: 'FAC-005', productos: 'Arroz, Frijoles', monto: 2800, estado: 'Procesada' },
        { id: 6, fecha: '2024-01-20', proveedor: 'Proveedor A', factura: 'FAC-006', productos: 'Papa, Cebolla', monto: 2100, estado: 'Procesada' },
        { id: 7, fecha: '2024-01-21', proveedor: 'Proveedor C', factura: 'FAC-007', productos: 'Carne de Res', monto: 4500, estado: 'Procesada' },
        { id: 8, fecha: '2024-01-22', proveedor: 'Proveedor B', factura: 'FAC-008', productos: 'Pollo, Tomate', monto: 3200, estado: 'Procesada' },
        { id: 9, fecha: '2024-01-23', proveedor: 'Proveedor A', factura: 'FAC-009', productos: 'Aceite, Sal, Azúcar', monto: 1650, estado: 'Pendiente' },
        { id: 10, fecha: '2024-01-24', proveedor: 'Proveedor C', factura: 'FAC-010', productos: 'Arroz, Papa, Frijoles', monto: 4100, estado: 'Procesada' },
        { id: 11, fecha: '2024-01-25', proveedor: 'Proveedor B', factura: 'FAC-011', productos: 'Carne de Res, Pollo', monto: 5800, estado: 'Procesada' },
        { id: 12, fecha: '2024-01-26', proveedor: 'Proveedor A', factura: 'FAC-012', productos: 'Verduras varias', monto: 2200, estado: 'Procesada' }
    ],
    movimientosInventario: [
        { id: 1, fecha: '2024-01-20', producto: 'Arroz', tipo: 'entrada', cantidad: 50, observaciones: 'Compra proveedor A' },
        { id: 2, fecha: '2024-01-21', producto: 'Frijoles', tipo: 'salida', cantidad: 15, observaciones: 'Uso en producción' },
        { id: 3, fecha: '2024-01-22', producto: 'Papa', tipo: 'entrada', cantidad: 100, observaciones: 'Compra proveedor B' }
    ],
    menus: [
        {
            id: 1,
            fecha: '2024-01-25',
            recetas: [
                {
                    nombre: 'Arroz con Frijoles',
                    materiales: [
                        { producto: 'Arroz', cantidad: 20 },
                        { producto: 'Frijoles', cantidad: 15 }
                    ]
                },
                {
                    nombre: 'Carne Asada',
                    materiales: [
                        { producto: 'Carne de Res', cantidad: 30 }
                    ]
                }
            ],
            fechaCreacion: '2024-01-24T10:00:00Z'
        }
    ],
    produccion: [
        { id: 1, fecha: '2024-01-25', menuId: 1, receta: 'Arroz con Frijoles', cantidad: 150, charolas: 8, merma: 2.5, observaciones: 'Producción normal', estado: 'Reportado' },
        { id: 2, fecha: '2024-01-25', menuId: 1, receta: 'Carne Asada', cantidad: 120, charolas: 6, merma: 1.8, observaciones: 'Buena calidad', estado: 'Reportado' }
    ],
    encuestas: [
        {
            id: 1,
            titulo: 'Satisfacción del Menú de Hoy',
            preguntas: ['¿Cómo calificaría la calidad de la comida?', '¿El servicio fue rápido?', '¿Recomendaría nuestro comedor?'],
            fechaCreacion: '2024-01-25T08:00:00Z',
            url: 'https://encuesta.com/123456'
        }
    ],
    notificaciones: [],
    configuracion: {
        stockMinimoGlobal: 50,
        porcionesCharola: 20,
        horarioServicio: '12:00',
        whatsappAPI: '+52 123 456 7890',
        ocrService: 'google'
    }
};

// Navegación - Disponible inmediatamente (scope global)
window.mostrarLogin = function() {
    try {
        console.log('mostrarLogin llamado');
        // Asegurar que el sidebar esté completamente oculto en login
        const sidebar = document.getElementById('sidebar');
        if (sidebar) {
            sidebar.style.display = 'none';
            sidebar.classList.remove('open');
        }
        const sidebarOverlay = document.getElementById('sidebarOverlay');
        if (sidebarOverlay) {
            sidebarOverlay.classList.remove('active');
        }
        document.body.classList.remove('sidebar-open');
        cambiarPantalla('portada', 'login');
    } catch (error) {
        console.error('Error al mostrar login:', error);
        alert('Error al cargar la página de login. Por favor, recarga la página.');
    }
};

window.validarLogin = function(event) {
    event.preventDefault();
    const form = event.target;
    const button = form.querySelector('button[type="submit"]');
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    // Validación
    if (!FormValidator.validateForm(form)) {
        ToastNotification.show('Por favor, completa todos los campos requeridos', 'error');
        return false;
    }
    
    // Simular carga
    LoadingState.setLoading(button, 'Verificando...');
    
    // Simular delay de autenticación
    setTimeout(() => {
        if (email === mockData.usuario.email && password === mockData.usuario.password) {
            const nombre = mockData.usuario.nombre;
            document.getElementById('userName').textContent = nombre;
            document.getElementById('sidebarUserName').textContent = nombre;
            document.getElementById('userInitial').textContent = nombre.charAt(0).toUpperCase();
            
            ToastNotification.show('¡Bienvenido! Sesión iniciada correctamente', 'success');
            LoadingState.removeLoading(button);
            setTimeout(() => {
                cambiarPantalla('login', 'menu');
                // Abrir sidebar automáticamente en desktop
                if (window.innerWidth > 768) {
                    setTimeout(() => toggleSidebar(), 300);
                }
            }, 500);
        } else {
            ToastNotification.show('Credenciales incorrectas. Use: admin@comedor.com / demo-credential-2024', 'error');
            LoadingState.removeLoading(button);
        }
    }, 800);
    
    return false;
};

window.cambiarPantalla = function(ocultar, mostrar) {
    try {
        const ocultarEl = document.getElementById(ocultar);
        const mostrarEl = document.getElementById(mostrar);
        
        if (!ocultarEl) {
            console.error('Elemento a ocultar no encontrado:', ocultar);
            return;
        }
        
        if (!mostrarEl) {
            console.error('Elemento a mostrar no encontrado:', mostrar);
            return;
        }
        
        // Ocultar todas las pantallas primero
        document.querySelectorAll('.screen').forEach(screen => {
            screen.classList.remove('active');
        });
        
        // Mostrar la pantalla deseada
        mostrarEl.classList.add('active');
        
        // Mostrar/ocultar sidebar según la pantalla
        const sidebar = document.getElementById('sidebar');
        const sidebarOverlay = document.getElementById('sidebarOverlay');
        const pantallasConSidebar = ['menu', 'dashboard', 'compras', 'inventario', 'planificacion', 'produccion', 'servicio', 'notificaciones', 'configuracion'];
        const pantallasPublicas = ['portada', 'login'];
        
        // Ocultar sidebar completamente en pantallas públicas
        if (pantallasPublicas.includes(mostrar)) {
            sidebar.style.display = 'none';
            sidebar.classList.remove('open');
            if (sidebarOverlay) sidebarOverlay.classList.remove('active');
            document.body.classList.remove('sidebar-open');
        } else if (pantallasConSidebar.includes(mostrar)) {
            // Mostrar sidebar solo en pantallas del sistema (después del login)
            sidebar.style.display = 'flex';
        } else {
            // Por defecto, ocultar
            sidebar.style.display = 'none';
            sidebar.classList.remove('open');
            if (sidebarOverlay) sidebarOverlay.classList.remove('active');
            document.body.classList.remove('sidebar-open');
        }
        
        console.log('Pantalla cambiada de', ocultar, 'a', mostrar);
    } catch (error) {
        console.error('Error al cambiar pantalla:', error);
        alert('Error al cambiar de pantalla. Por favor, recarga la página.');
    }
};

// Inicialización
document.addEventListener('DOMContentLoaded', function() {
    try {
        inicializarApp();
        inicializarValidaciones();
        inicializarBotonInicio();
    } catch (error) {
        console.error('Error en inicialización:', error);
    }
});

function inicializarBotonInicio() {
    console.log('inicializarBotonInicio() ejecutándose...');
    
    // Intentar encontrar el botón de múltiples formas
    let btnInicio = document.getElementById('btnIniciarSesion');
    
    // Si no se encuentra por ID, buscar por clase
    if (!btnInicio) {
        console.log('Botón no encontrado por ID, buscando por clase...');
        btnInicio = document.querySelector('.btn-hero');
    }
    
    // Si aún no se encuentra, esperar un poco y reintentar
    if (!btnInicio) {
        console.log('Botón no encontrado, reintentando en 100ms...');
        setTimeout(function() {
            inicializarBotonInicio();
        }, 100);
        return;
    }
    
    console.log('Botón encontrado:', btnInicio);
    console.log('Botón visible:', btnInicio.offsetWidth > 0 && btnInicio.offsetHeight > 0);
    console.log('Botón disabled:', btnInicio.disabled);
    console.log('Botón parent:', btnInicio.parentElement);
    
    // Asegurar que el botón no esté deshabilitado
    btnInicio.disabled = false;
    btnInicio.style.pointerEvents = 'auto';
    btnInicio.style.cursor = 'pointer';
    
    // Función para manejar el click - SIMPLIFICADA Y DIRECTA
    function manejarClick(e) {
        console.log('=== BOTÓN CLICKEADO ===', e.type);
        
        // Prevenir cualquier comportamiento por defecto
        if (e && e.preventDefault) e.preventDefault();
        if (e && e.stopPropagation) e.stopPropagation();
        if (e && e.stopImmediatePropagation) e.stopImmediatePropagation();
        
        // Navegación directa e inmediata
        const portada = document.getElementById('portada');
        const login = document.getElementById('login');
        
        if (portada && login) {
            console.log('Navegando directamente...');
            portada.classList.remove('active');
            login.classList.add('active');
            
            // Asegurar que el sidebar esté oculto
            const sidebar = document.getElementById('sidebar');
            if (sidebar) {
                sidebar.style.display = 'none';
                sidebar.classList.remove('open');
            }
            const sidebarOverlay = document.getElementById('sidebarOverlay');
            if (sidebarOverlay) {
                sidebarOverlay.classList.remove('active');
            }
            document.body.classList.remove('sidebar-open');
            
            console.log('✅ Navegación a login completada');
        } else {
            console.error('ERROR: No se encontraron portada o login');
        }
        
        return false;
    }
    
    // Deshabilitar pointer-events en elementos hijos para que no intercepten clicks
    const span = btnInicio.querySelector('span');
    if (span) {
        span.style.pointerEvents = 'none';
    }
    const svg = btnInicio.querySelector('svg');
    if (svg) {
        svg.style.pointerEvents = 'none';
    }
    
    // Agregar listeners de forma simple y directa
    // 1. Click principal (bubbling phase)
    btnInicio.addEventListener('click', manejarClick, false);
    
    // 2. Click en capture phase (se ejecuta primero, por si hay otros listeners)
    btnInicio.addEventListener('click', manejarClick, true);
    
    // 3. onclick como respaldo absoluto (más compatible)
    btnInicio.onclick = manejarClick;
    
    // 4. Touchstart para móviles
    btnInicio.addEventListener('touchstart', function(e) {
        e.preventDefault();
        manejarClick(e);
    }, { passive: false });
    
    // Verificar que los listeners se agregaron
    console.log('Listeners agregados. onclick:', typeof btnInicio.onclick);
    
    console.log('✅ Botón de inicio inicializado correctamente con múltiples listeners');
}

function inicializarApp() {
    try {
        // Asegurar que solo la portada esté activa al inicio
        const todasLasPantallas = document.querySelectorAll('.screen');
        todasLasPantallas.forEach(screen => {
            screen.classList.remove('active');
        });
        
        const portada = document.getElementById('portada');
        if (portada) {
            portada.classList.add('active');
            console.log('Portada activada al inicio');
        }
        
        // Asegurar que el sidebar esté oculto al inicio
        const sidebar = document.getElementById('sidebar');
        if (sidebar) {
            sidebar.style.display = 'none';
            sidebar.classList.remove('open');
        }
        const sidebarOverlay = document.getElementById('sidebarOverlay');
        if (sidebarOverlay) {
            sidebarOverlay.classList.remove('active');
        }
        document.body.classList.remove('sidebar-open');
        
        // Solo cargar funciones que no requieren estar en una pantalla específica
        // Los gráficos se cargarán cuando se navegue al dashboard
        console.log('Aplicación inicializada correctamente');
    } catch (error) {
        console.error('Error al inicializar app:', error);
    }
}

function inicializarValidaciones() {
    // Validación en tiempo real para todos los campos usando delegación de eventos
    document.addEventListener('blur', function(e) {
        const target = e.target;
        // Verificar que target es un elemento DOM válido
        if (target && target.nodeType === 1 && typeof target.matches === 'function') {
            if (target.matches('input[required], select[required], textarea[required]')) {
                FormValidator.validateField(target);
            }
        }
    }, true);
    
    // Limpiar errores al escribir
    document.addEventListener('input', function(e) {
        const target = e.target;
        // Verificar que target es un elemento DOM válido
        if (target && target.nodeType === 1 && typeof target.matches === 'function') {
            if (target.matches('input, select, textarea')) {
                if (target.classList && target.classList.contains('error')) {
                    FormValidator.removeError(target);
                }
            }
        }
    }, true);
    
    // También agregar validación cuando se crean nuevos campos dinámicamente
    // Usar MutationObserver para campos agregados después de la carga inicial
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            mutation.addedNodes.forEach(function(node) {
                if (node.nodeType === 1) {
                    // Agregar listeners a los nuevos campos
                    const fields = node.querySelectorAll ? node.querySelectorAll('input[required], select[required], textarea[required]') : [];
                    fields.forEach(function(field) {
                        field.addEventListener('blur', function() {
                            FormValidator.validateField(field);
                        });
                        field.addEventListener('input', function() {
                            if (field.classList && field.classList.contains('error')) {
                                FormValidator.removeError(field);
                            }
                        });
                    });
                }
            });
        });
    });
    
    // Observar cambios en el body para campos dinámicos
    if (document.body) {
        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    }
}

window.toggleSidebar = function() {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebarOverlay');
    const body = document.body;
    
    sidebar.classList.toggle('open');
    overlay.classList.toggle('active');
    body.classList.toggle('sidebar-open');
    
    // Actualizar estado de botones hamburguesa
    document.querySelectorAll('.hamburger-btn').forEach(btn => {
        btn.classList.toggle('active');
    });
};

window.cerrarSesion = function() {
    // Cerrar sidebar completamente
    const sidebar = document.getElementById('sidebar');
    const sidebarOverlay = document.getElementById('sidebarOverlay');
    
    if (sidebar) {
        sidebar.classList.remove('open');
        sidebar.style.display = 'none';
    }
    if (sidebarOverlay) {
        sidebarOverlay.classList.remove('active');
    }
    document.body.classList.remove('sidebar-open');
    
    // Resetear formulario de login
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.reset();
    }
    
    // Volver a la portada
    cambiarPantalla('menu', 'portada');
    
    ToastNotification.show('Sesión cerrada correctamente', 'info');
};


window.navegar = function(destino) {
    // Cerrar sidebar en móvil después de navegar
    if (window.innerWidth <= 768) {
        const sidebar = document.getElementById('sidebar');
        if (sidebar.classList.contains('open')) {
            toggleSidebar();
        }
    }
    
    cambiarPantalla('menu', destino);
    
    // Actualizar item activo en sidebar
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
        if (item.dataset.section === destino) {
            item.classList.add('active');
        }
    });
    
    // Recargar datos según la sección
    if (destino === 'dashboard') {
        inicializarGraficos();
    } else if (destino === 'compras') {
        cargarCompras();
    } else if (destino === 'inventario') {
        cargarInventario();
    } else if (destino === 'planificacion') {
        cargarMenus();
    } else if (destino === 'produccion') {
        cargarProduccion();
        cargarMenusEnProduccion();
    } else if (destino === 'servicio') {
        cargarEncuestas();
    } else if (destino === 'notificaciones') {
        cargarNotificaciones();
    } else if (destino === 'configuracion') {
        cargarConfiguracion();
    }
    
    // Cargar productos en selects cuando sea necesario
    if (destino === 'inventario' || destino === 'planificacion') {
        setTimeout(() => cargarProductosEnSelects(), 100);
    }
};

// Dashboard - Datos Mock Avanzados
const dashboardData = {
    consumoInventario: {
        '7': [
            { dia: 'Lun', fecha: '2024-01-15', consumo: 45, productos: ['Arroz: 15kg', 'Frijoles: 12kg', 'Papa: 18kg'] },
            { dia: 'Mar', fecha: '2024-01-16', consumo: 52, productos: ['Arroz: 18kg', 'Carne: 20kg', 'Pollo: 14kg'] },
            { dia: 'Mié', fecha: '2024-01-17', consumo: 48, productos: ['Frijoles: 15kg', 'Papa: 20kg', 'Verduras: 13kg'] },
            { dia: 'Jue', fecha: '2024-01-18', consumo: 61, productos: ['Arroz: 22kg', 'Carne: 25kg', 'Pollo: 14kg'] },
            { dia: 'Vie', fecha: '2024-01-19', consumo: 55, productos: ['Arroz: 20kg', 'Frijoles: 18kg', 'Papa: 17kg'] },
            { dia: 'Sáb', fecha: '2024-01-20', consumo: 42, productos: ['Arroz: 15kg', 'Verduras: 15kg', 'Otros: 12kg'] },
            { dia: 'Dom', fecha: '2024-01-21', consumo: 38, productos: ['Arroz: 12kg', 'Frijoles: 10kg', 'Papa: 16kg'] }
        ]
    },
    comprasCategoria: {
        carnes: { valor: 35, monto: 18500, facturas: 8 },
        verduras: { valor: 25, monto: 11200, facturas: 12 },
        granos: { valor: 30, monto: 13200, facturas: 15 },
        otros: { valor: 10, monto: 2330, facturas: 5 }
    },
    produccionDiaria: {
        '7': [
            { dia: 'Lun', fecha: '2024-01-15', comidas: 320, charolas: 16, merma: 3.2 },
            { dia: 'Mar', fecha: '2024-01-16', comidas: 345, charolas: 18, merma: 3.5 },
            { dia: 'Mié', fecha: '2024-01-17', comidas: 310, charolas: 16, merma: 2.8 },
            { dia: 'Jue', fecha: '2024-01-18', comidas: 365, charolas: 19, merma: 4.1 },
            { dia: 'Vie', fecha: '2024-01-19', comidas: 342, charolas: 18, merma: 3.6 },
            { dia: 'Sáb', fecha: '2024-01-20', comidas: 280, charolas: 14, merma: 2.5 },
            { dia: 'Dom', fecha: '2024-01-21', comidas: 250, charolas: 13, merma: 2.2 }
        ]
    },
    topProductos: [
        { nombre: 'Arroz', uso: 180, categoria: 'Granos', variacion: '+5%', tendencia: 'up' },
        { nombre: 'Frijoles', uso: 150, categoria: 'Granos', variacion: '+3%', tendencia: 'up' },
        { nombre: 'Papa', uso: 200, categoria: 'Verduras', variacion: '-2%', tendencia: 'down' },
        { nombre: 'Carne', uso: 120, categoria: 'Carnes', variacion: '+8%', tendencia: 'up' },
        { nombre: 'Pollo', uso: 90, categoria: 'Carnes', variacion: '+12%', tendencia: 'up' }
    ],
    satisfaccion: [
        { semana: 'Sem 1', fecha: '2024-01-01', valor: 4.2, respuestas: 145, comentarios: 23 },
        { semana: 'Sem 2', fecha: '2024-01-08', valor: 4.4, respuestas: 158, comentarios: 28 },
        { semana: 'Sem 3', fecha: '2024-01-15', valor: 4.5, respuestas: 162, comentarios: 31 },
        { semana: 'Sem 4', fecha: '2024-01-22', valor: 4.6, respuestas: 175, comentarios: 35 }
    ],
    mermaVsPlanificado: [
        { dia: 'Lun', planificado: 50, merma: 5, eficiencia: 90, productos: ['Arroz: 2kg', 'Frijoles: 1.5kg', 'Otros: 1.5kg'] },
        { dia: 'Mar', planificado: 55, merma: 6, eficiencia: 89, productos: ['Carne: 3kg', 'Pollo: 2kg', 'Otros: 1kg'] },
        { dia: 'Mié', planificado: 52, merma: 4, eficiencia: 92, productos: ['Verduras: 2kg', 'Granos: 1.5kg', 'Otros: 0.5kg'] },
        { dia: 'Jue', planificado: 58, merma: 7, eficiencia: 88, productos: ['Carne: 4kg', 'Arroz: 2kg', 'Otros: 1kg'] },
        { dia: 'Vie', planificado: 54, merma: 5, eficiencia: 91, productos: ['Pollo: 2.5kg', 'Frijoles: 1.5kg', 'Otros: 1kg'] }
    ]
};

let chartInstances = {};

// Dashboard - Gráficos
function inicializarGraficos() {
    // Verificar que Chart.js esté disponible
    if (typeof Chart === 'undefined') {
        console.warn('Chart.js no está cargado aún');
        setTimeout(inicializarGraficos, 200);
        return;
    }
    
    setTimeout(() => {
        try {
            crearGrafico1();
            crearGrafico2();
            crearGrafico3();
            crearGrafico4();
            crearGrafico5();
            crearGrafico6();
        } catch (error) {
            console.error('Error al crear gráficos:', error);
        }
    }, 100);
}

function aplicarFiltros() {
    const periodo = document.getElementById('filtroPeriodo').value;
    const categoria = document.getElementById('filtroCategoria').value;
    
    // Recrear gráficos con nuevos filtros
    if (chartInstances.chart1) chartInstances.chart1.destroy();
    if (chartInstances.chart2) chartInstances.chart2.destroy();
    if (chartInstances.chart3) chartInstances.chart3.destroy();
    if (chartInstances.chart4) chartInstances.chart4.destroy();
    if (chartInstances.chart5) chartInstances.chart5.destroy();
    if (chartInstances.chart6) chartInstances.chart6.destroy();
    
    crearGrafico1(periodo);
    crearGrafico2(categoria);
    crearGrafico3(periodo);
    crearGrafico4();
    crearGrafico5();
    crearGrafico6();
}

function resetearFiltros() {
    document.getElementById('filtroPeriodo').value = '30';
    document.getElementById('filtroCategoria').value = 'all';
    aplicarFiltros();
}

window.aplicarFiltros = aplicarFiltros;
window.resetearFiltros = resetearFiltros;

// Búsqueda en tablas
window.buscarEnTabla = function(tablaId, busqueda) {
    const tbody = document.getElementById(tablaId);
    if (!tbody) return;
    
    const filas = tbody.querySelectorAll('tr');
    const textoBusqueda = busqueda.toLowerCase().trim();
    
    if (!textoBusqueda) {
        filas.forEach(fila => fila.style.display = '');
        return;
    }
    
    let encontradas = 0;
    filas.forEach(fila => {
        const texto = fila.textContent.toLowerCase();
        if (texto.includes(textoBusqueda)) {
            fila.style.display = '';
            encontradas++;
        } else {
            fila.style.display = 'none';
        }
    });
    
    if (encontradas === 0 && textoBusqueda) {
        // Mostrar mensaje si no hay resultados
        const mensaje = tbody.querySelector('.no-results');
        if (!mensaje) {
            const tr = document.createElement('tr');
            tr.className = 'no-results';
            tr.innerHTML = `<td colspan="100%" style="text-align: center; color: var(--text-secondary); padding: 2rem;">No se encontraron resultados para "${busqueda}"</td>`;
            tbody.appendChild(tr);
        }
    } else {
        const mensaje = tbody.querySelector('.no-results');
        if (mensaje) mensaje.remove();
    }
};

function crearGrafico1(periodo = '7') {
    const ctx = document.getElementById('chart1');
    if (!ctx) return;
    if (typeof Chart === 'undefined') return;
    
    const data = dashboardData.consumoInventario[periodo] || dashboardData.consumoInventario['7'];
    
    try {
        if (chartInstances.chart1) chartInstances.chart1.destroy();
        
        chartInstances.chart1 = new Chart(ctx, {
            type: 'line',
            data: {
                labels: data.map(d => d.dia),
                datasets: [{
                    label: 'Consumo (kg)',
                    data: data.map(d => d.consumo),
                    borderColor: '#2563eb',
                    backgroundColor: 'rgba(37, 99, 235, 0.1)',
                    borderWidth: 3,
                    pointRadius: 6,
                    pointHoverRadius: 8,
                    pointBackgroundColor: '#2563eb',
                    pointBorderColor: '#ffffff',
                    pointBorderWidth: 2,
                    tension: 0.4,
                    fill: true,
                    shadowOffsetX: 0,
                    shadowOffsetY: 4,
                    shadowBlur: 10,
                    shadowColor: 'rgba(37, 99, 235, 0.3)'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                animation: {
                    duration: 2000,
                    easing: 'easeInOutQuart'
                },
                interaction: {
                    intersect: false,
                    mode: 'index'
                },
                plugins: {
                    legend: { display: false },
                    tooltip: {
                        backgroundColor: 'rgba(0, 0, 0, 0.9)',
                        padding: 15,
                        titleFont: { size: 16, weight: 'bold' },
                        bodyFont: { size: 14 },
                        borderColor: '#2563eb',
                        borderWidth: 2,
                        cornerRadius: 10,
                        displayColors: false,
                        callbacks: {
                            title: function(context) {
                                const dataPoint = data[context[0].dataIndex];
                                return `${dataPoint.dia} - ${dataPoint.fecha}`;
                            },
                            label: function(context) {
                                const dataPoint = data[context.dataIndex];
                                return [
                                    `Consumo Total: ${context.parsed.y} kg`,
                                    '',
                                    'Desglose por producto:',
                                    ...dataPoint.productos.map(p => `  • ${p}`)
                                ];
                            },
                            afterBody: function(context) {
                                return `\n📊 Detalle completo del consumo`;
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: {
                            color: 'rgba(0, 0, 0, 0.05)'
                        },
                        ticks: {
                            callback: function(value) {
                                return value + ' kg';
                            }
                        }
                    },
                    x: {
                        grid: {
                            display: false
                        }
                    }
                }
            }
        });
    } catch (error) {
        console.error('Error al crear gráfico 1:', error);
    }
}

function crearGrafico2(categoria = 'all') {
    const ctx = document.getElementById('chart2');
    if (!ctx) return;
    
    const data = dashboardData.comprasCategoria;
    const labels = Object.keys(data);
    const valores = Object.values(data).map(d => d.valor);
    const montos = Object.values(data).map(d => d.monto);
    const facturas = Object.values(data).map(d => d.facturas);
    const colores = ['#ef4444', '#10b981', '#f59e0b', '#64748b'];
    
    try {
        if (chartInstances.chart2) chartInstances.chart2.destroy();
        
        chartInstances.chart2 = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: labels.map(l => l.charAt(0).toUpperCase() + l.slice(1)),
                datasets: [{
                    data: valores,
                    backgroundColor: colores,
                    borderWidth: 3,
                    borderColor: '#ffffff',
                    hoverOffset: 15
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                animation: {
                    animateRotate: true,
                    animateScale: true,
                    duration: 2000
                },
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            padding: 15,
                            font: { size: 12, weight: '500' },
                            usePointStyle: true,
                            pointStyle: 'circle'
                        }
                    },
                    tooltip: {
                        backgroundColor: 'rgba(0, 0, 0, 0.9)',
                        padding: 15,
                        titleFont: { size: 16, weight: 'bold' },
                        bodyFont: { size: 14 },
                        borderColor: function(context) {
                            return colores[context.dataIndex];
                        },
                        borderWidth: 2,
                        cornerRadius: 10,
                        callbacks: {
                            label: function(context) {
                                const index = context.dataIndex;
                                const label = labels[index];
                                const categoriaData = data[label];
                                return [
                                    `Porcentaje: ${context.parsed}%`,
                                    `Monto Total: $${categoriaData.monto.toLocaleString()}`,
                                    `Facturas: ${categoriaData.facturas}`,
                                    `Promedio por factura: $${Math.round(categoriaData.monto / categoriaData.facturas).toLocaleString()}`
                                ];
                            }
                        }
                    }
                }
            }
        });
    } catch (error) {
        console.error('Error al crear gráfico 2:', error);
    }
}

function crearGrafico3(periodo = '7') {
    const ctx = document.getElementById('chart3');
    if (!ctx) return;
    
    const data = dashboardData.produccionDiaria[periodo] || dashboardData.produccionDiaria['7'];
    
    try {
        if (chartInstances.chart3) chartInstances.chart3.destroy();
        
        chartInstances.chart3 = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: data.map(d => d.dia),
                datasets: [{
                    label: 'Comidas Servidas',
                    data: data.map(d => d.comidas),
                    backgroundColor: '#10b981',
                    borderRadius: 8,
                    borderSkipped: false,
                    barThickness: 40
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                animation: {
                    duration: 2000,
                    easing: 'easeInOutBounce'
                },
                interaction: {
                    intersect: false,
                    mode: 'index'
                },
                plugins: {
                    legend: { display: false },
                    tooltip: {
                        backgroundColor: 'rgba(0, 0, 0, 0.9)',
                        padding: 15,
                        titleFont: { size: 16, weight: 'bold' },
                        bodyFont: { size: 14 },
                        borderColor: '#10b981',
                        borderWidth: 2,
                        cornerRadius: 10,
                        displayColors: false,
                        callbacks: {
                            title: function(context) {
                                const dataPoint = data[context[0].dataIndex];
                                return `${dataPoint.dia} - ${dataPoint.fecha}`;
                            },
                            label: function(context) {
                                const dataPoint = data[context.dataIndex];
                                return [
                                    `🍽️ Comidas Servidas: ${context.parsed.y}`,
                                    `📦 Charolas: ${dataPoint.charolas}`,
                                    `📊 Merma: ${dataPoint.merma} kg`,
                                    `📈 Eficiencia: ${((dataPoint.comidas / (dataPoint.comidas + dataPoint.merma * 10)) * 100).toFixed(1)}%`
                                ];
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: {
                            color: 'rgba(0, 0, 0, 0.05)'
                        },
                        ticks: {
                            callback: function(value) {
                                return value;
                            }
                        }
                    },
                    x: {
                        grid: {
                            display: false
                        }
                    }
                }
            }
        });
    } catch (error) {
        console.error('Error al crear gráfico 3:', error);
    }
}

function crearGrafico4() {
    const ctx = document.getElementById('chart4');
    if (!ctx) return;
    
    const data = dashboardData.topProductos;
    
    try {
        if (chartInstances.chart4) chartInstances.chart4.destroy();
        
        chartInstances.chart4 = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: data.map(d => d.nombre),
                datasets: [{
                    label: 'Uso (kg)',
                    data: data.map(d => d.uso),
                    backgroundColor: function(context) {
                        const item = data[context.dataIndex];
                        return item.tendencia === 'up' ? '#10b981' : '#ef4444';
                    },
                    borderRadius: 6,
                    borderSkipped: false,
                    barThickness: 35
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                indexAxis: 'y',
                animation: {
                    duration: 2000,
                    easing: 'easeInOutQuart'
                },
                interaction: {
                    intersect: false,
                    mode: 'index'
                },
                plugins: {
                    legend: { display: false },
                    tooltip: {
                        backgroundColor: 'rgba(0, 0, 0, 0.9)',
                        padding: 15,
                        titleFont: { size: 16, weight: 'bold' },
                        bodyFont: { size: 14 },
                        borderColor: function(context) {
                            const item = data[context.dataIndex];
                            return item.tendencia === 'up' ? '#10b981' : '#ef4444';
                        },
                        borderWidth: 2,
                        cornerRadius: 10,
                        displayColors: false,
                        callbacks: {
                            label: function(context) {
                                const item = data[context.dataIndex];
                                const tendenciaIcon = item.tendencia === 'up' ? '📈' : '📉';
                                return [
                                    `Uso Total: ${context.parsed.x} kg`,
                                    `Categoría: ${item.categoria}`,
                                    `${tendenciaIcon} Variación: ${item.variacion}`,
                                    `Tendencia: ${item.tendencia === 'up' ? 'En aumento' : 'En disminución'}`
                                ];
                            }
                        }
                    }
                },
                scales: {
                    x: {
                        beginAtZero: true,
                        grid: {
                            color: 'rgba(0, 0, 0, 0.05)'
                        },
                        ticks: {
                            callback: function(value) {
                                return value + ' kg';
                            }
                        }
                    },
                    y: {
                        grid: {
                            display: false
                        }
                    }
                }
            }
        });
    } catch (error) {
        console.error('Error al crear gráfico 4:', error);
    }
}

function crearGrafico5() {
    const ctx = document.getElementById('chart5');
    if (!ctx) return;
    
    const data = dashboardData.satisfaccion;
    
    try {
        if (chartInstances.chart5) chartInstances.chart5.destroy();
        
        chartInstances.chart5 = new Chart(ctx, {
            type: 'line',
            data: {
                labels: data.map(d => d.semana),
                datasets: [{
                    label: 'Satisfacción',
                    data: data.map(d => d.valor),
                    borderColor: '#f59e0b',
                    backgroundColor: 'rgba(245, 158, 11, 0.1)',
                    borderWidth: 3,
                    pointRadius: 7,
                    pointHoverRadius: 10,
                    pointBackgroundColor: '#f59e0b',
                    pointBorderColor: '#ffffff',
                    pointBorderWidth: 3,
                    tension: 0.4,
                    fill: true
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                animation: {
                    duration: 2000,
                    easing: 'easeInOutQuart'
                },
                interaction: {
                    intersect: false,
                    mode: 'index'
                },
                plugins: {
                    legend: { display: false },
                    tooltip: {
                        backgroundColor: 'rgba(0, 0, 0, 0.9)',
                        padding: 15,
                        titleFont: { size: 16, weight: 'bold' },
                        bodyFont: { size: 14 },
                        borderColor: '#f59e0b',
                        borderWidth: 2,
                        cornerRadius: 10,
                        displayColors: false,
                        callbacks: {
                            title: function(context) {
                                const dataPoint = data[context[0].dataIndex];
                                return `${dataPoint.semana} - ${dataPoint.fecha}`;
                            },
                            label: function(context) {
                                const dataPoint = data[context.dataIndex];
                                const estrellas = '⭐'.repeat(Math.round(dataPoint.valor));
                                return [
                                    `Calificación: ${context.parsed.y}/5 ${estrellas}`,
                                    `📝 Respuestas: ${dataPoint.respuestas}`,
                                    `💬 Comentarios: ${dataPoint.comentarios}`,
                                    `📊 Tasa de respuesta: ${((dataPoint.comentarios / dataPoint.respuestas) * 100).toFixed(1)}%`
                                ];
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        min: 3,
                        max: 5,
                        grid: {
                            color: 'rgba(0, 0, 0, 0.05)'
                        },
                        ticks: {
                            callback: function(value) {
                                return value.toFixed(1);
                            }
                        }
                    },
                    x: {
                        grid: {
                            display: false
                        }
                    }
                }
            }
        });
    } catch (error) {
        console.error('Error al crear gráfico 5:', error);
    }
}

function crearGrafico6() {
    const ctx = document.getElementById('chart6');
    if (!ctx) return;
    
    const data = dashboardData.mermaVsPlanificado;
    
    try {
        if (chartInstances.chart6) chartInstances.chart6.destroy();
        
        chartInstances.chart6 = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: data.map(d => d.dia),
                datasets: [{
                    label: 'Planificado (kg)',
                    data: data.map(d => d.planificado),
                    backgroundColor: '#10b981',
                    borderRadius: 6,
                    borderSkipped: false
                }, {
                    label: 'Merma (kg)',
                    data: data.map(d => d.merma),
                    backgroundColor: '#ef4444',
                    borderRadius: 6,
                    borderSkipped: false
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                animation: {
                    duration: 2000,
                    easing: 'easeInOutQuart'
                },
                interaction: {
                    intersect: false,
                    mode: 'index'
                },
                plugins: {
                    legend: {
                        position: 'top',
                        labels: {
                            padding: 15,
                            font: { size: 12, weight: '500' },
                            usePointStyle: true
                        }
                    },
                    tooltip: {
                        backgroundColor: 'rgba(0, 0, 0, 0.9)',
                        padding: 15,
                        titleFont: { size: 16, weight: 'bold' },
                        bodyFont: { size: 14 },
                        borderColor: '#64748b',
                        borderWidth: 2,
                        cornerRadius: 10,
                        callbacks: {
                            title: function(context) {
                                const dataPoint = data[context[0].dataIndex];
                                return `${dataPoint.dia}`;
                            },
                            label: function(context) {
                                const dataPoint = data[context[0].dataIndex];
                                if (context.datasetIndex === 0) {
                                    return `📋 Planificado: ${context.parsed.y} kg`;
                                } else {
                                    return [
                                        `⚠️ Merma: ${context.parsed.y} kg`,
                                        `📊 Eficiencia: ${dataPoint.eficiencia}%`,
                                        '',
                                        'Desglose de merma:',
                                        ...dataPoint.productos.map(p => `  • ${p}`)
                                    ];
                                }
                            },
                            footer: function(tooltipItems) {
                                const dataPoint = data[tooltipItems[0].dataIndex];
                                return `\n💡 Diferencia: ${(dataPoint.planificado - dataPoint.merma).toFixed(1)} kg`;
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: {
                            color: 'rgba(0, 0, 0, 0.05)'
                        },
                        ticks: {
                            callback: function(value) {
                                return value + ' kg';
                            }
                        }
                    },
                    x: {
                        grid: {
                            display: false
                        }
                    }
                }
            }
        });
    } catch (error) {
        console.error('Error al crear gráfico 6:', error);
    }
}

// Compras
window.simularOCRWhatsApp = function() {
    const proveedores = ['Proveedor A', 'Proveedor B', 'Proveedor C', 'Proveedor Nuevo'];
    const productosEjemplo = [
        { nombre: 'Arroz', cantidad: 50 },
        { nombre: 'Frijoles', cantidad: 30 },
        { nombre: 'Papa', cantidad: 40 },
        { nombre: 'Carne de Res', cantidad: 25 }
    ];
    
    const proveedorAleatorio = proveedores[Math.floor(Math.random() * proveedores.length)];
    const productosAleatorios = productosEjemplo.sort(() => 0.5 - Math.random()).slice(0, 2);
    const monto = Math.floor(Math.random() * 5000) + 2000;
    const numFactura = 'FAC-NEW-' + String(mockData.compras.length + 1).padStart(3, '0');
    
    const modal = document.createElement('div');
    modal.className = 'whatsapp-modal';
    modal.innerHTML = `
        <div class="whatsapp-modal-content">
            <div class="whatsapp-icon">📱</div>
            <h3>Simulación de Ingreso por WhatsApp</h3>
            <p>Se ha recibido una factura por WhatsApp y procesado con OCR</p>
            <div style="margin: 1.5rem 0; padding: 1rem; background: #f0f0f0; border-radius: 0.5rem; text-align: left;">
                <p><strong>Proveedor:</strong> ${proveedorAleatorio}</p>
                <p><strong>Factura:</strong> ${numFactura}</p>
                <p><strong>Productos detectados:</strong> ${productosAleatorios.map(p => `${p.nombre} ${p.cantidad}kg`).join(', ')}</p>
                <p><strong>Monto:</strong> $${monto.toLocaleString()}</p>
            </div>
            <button class="btn-primary" onclick="procesarFacturaOCR(this, '${proveedorAleatorio}', '${numFactura}', ${monto}, '${productosAleatorios.map(p => `${p.nombre} ${p.cantidad}kg`).join(', ')}')">Procesar Factura</button>
            <button class="btn-secondary" onclick="this.closest('.whatsapp-modal').remove()" style="margin-top: 0.5rem;">Cerrar</button>
        </div>
    `;
    document.body.appendChild(modal);
    ToastNotification.show('Factura recibida por WhatsApp, procesando con OCR...', 'info');
};

window.procesarFacturaOCR = function(btn, proveedor, factura, monto, productos) {
    const nuevaCompra = {
        id: mockData.compras.length + 1,
        fecha: new Date().toISOString().split('T')[0],
        proveedor: proveedor,
        factura: factura,
        productos: productos,
        monto: monto,
        estado: 'Procesada'
    };
    mockData.compras.unshift(nuevaCompra);
    cargarCompras();
    btn.closest('.whatsapp-modal').remove();
    ToastNotification.show(`Factura ${factura} procesada exitosamente`, 'success');
};

function cargarCompras() {
    const tbody = document.getElementById('tablaCompras');
    if (!tbody) return;
    
    tbody.innerHTML = mockData.compras.map(compra => `
        <tr>
            <td>${compra.fecha}</td>
            <td>${compra.proveedor}</td>
            <td>${compra.factura}</td>
            <td>${compra.productos}</td>
            <td>$${compra.monto.toLocaleString()}</td>
            <td><span class="badge ${compra.estado === 'Procesada' ? 'badge-success' : 'badge-warning'}">${compra.estado}</span></td>
        </tr>
    `).join('');
    
    actualizarKPIsCompras();
}

function actualizarKPIsCompras() {
    const total = mockData.compras.length;
    const montoTotal = mockData.compras.reduce((sum, c) => sum + c.monto, 0);
    const promedio = montoTotal / total;
    
    document.getElementById('totalFacturas').textContent = total;
    document.getElementById('montoTotal').textContent = `$${montoTotal.toLocaleString()}`;
    document.getElementById('promedioFactura').textContent = `$${Math.round(promedio).toLocaleString()}`;
}

window.filtrarCompras = function() {
    const fechaDesde = document.getElementById('fechaDesde').value;
    const fechaHasta = document.getElementById('fechaHasta').value;
    const proveedor = document.getElementById('filtroProveedor').value;
    
    let comprasFiltradas = [...mockData.compras];
    
    if (fechaDesde) {
        comprasFiltradas = comprasFiltradas.filter(c => c.fecha >= fechaDesde);
    }
    
    if (fechaHasta) {
        comprasFiltradas = comprasFiltradas.filter(c => c.fecha <= fechaHasta);
    }
    
    if (proveedor) {
        comprasFiltradas = comprasFiltradas.filter(c => c.proveedor === proveedor);
    }
    
    const tbody = document.getElementById('tablaCompras');
    if (!tbody) return;
    
    if (comprasFiltradas.length === 0) {
        tbody.innerHTML = '<tr><td colspan="6" style="text-align: center; color: var(--text-secondary);">No se encontraron facturas con los filtros aplicados</td></tr>';
        ToastNotification.show('No se encontraron resultados', 'info');
    } else {
        tbody.innerHTML = comprasFiltradas.map(compra => `
            <tr>
                <td>${compra.fecha}</td>
                <td>${compra.proveedor}</td>
                <td>${compra.factura}</td>
                <td>${compra.productos}</td>
                <td>$${compra.monto.toLocaleString()}</td>
                <td><span class="badge ${compra.estado === 'Procesada' ? 'badge-success' : 'badge-warning'}">${compra.estado}</span></td>
            </tr>
        `).join('');
        
        ToastNotification.show(`${comprasFiltradas.length} factura(s) encontrada(s)`, 'success');
    }
    
    // Actualizar KPIs con datos filtrados
    const montoTotal = comprasFiltradas.reduce((sum, c) => sum + c.monto, 0);
    const promedio = comprasFiltradas.length > 0 ? montoTotal / comprasFiltradas.length : 0;
    
    document.getElementById('totalFacturas').textContent = comprasFiltradas.length;
    document.getElementById('montoTotal').textContent = `$${montoTotal.toLocaleString()}`;
    document.getElementById('promedioFactura').textContent = `$${Math.round(promedio).toLocaleString()}`;
};

// Inventario
function cargarProductosEnSelects() {
    const selects = document.querySelectorAll('#productoInventario, .material-select');
    selects.forEach(select => {
        if (select.id === 'productoInventario' || select.classList.contains('material-select')) {
            select.innerHTML = '<option value="">Seleccionar producto...</option>' +
                mockData.productos.map(p => `<option value="${p.id}">${p.nombre} (${p.stock} ${p.unidad})</option>`).join('');
        }
    });
}

window.mostrarFormularioInventario = function() {
    document.getElementById('formularioInventario').style.display = 'block';
    // Asegurar que el select tenga datos
    setTimeout(() => cargarProductosEnSelects(), 100);
};

function ocultarFormularioInventario() {
    document.getElementById('formularioInventario').style.display = 'none';
    document.getElementById('formularioInventario').querySelector('form').reset();
}

window.procesarMovimientoInventario = function(event) {
    event.preventDefault();
    const form = event.target;
    const button = form.querySelector('button[type="submit"]');
    
    if (!FormValidator.validateForm(form)) {
        ToastNotification.show('Por favor, completa todos los campos requeridos', 'error');
        return false;
    }
    
    const productoId = parseInt(document.getElementById('productoInventario').value);
    const tipo = document.getElementById('tipoMovimiento').value;
    const cantidad = parseFloat(document.getElementById('cantidadInventario').value);
    const observaciones = document.getElementById('observacionesInventario').value;
    
    const producto = mockData.productos.find(p => p.id === productoId);
    if (!producto) {
        ToastNotification.show('Producto no encontrado', 'error');
        return false;
    }
    
    // Validar salida
    if (tipo === 'salida' && producto.stock < cantidad) {
        ToastNotification.show(`Stock insuficiente. Disponible: ${producto.stock} ${producto.unidad}`, 'warning');
        return false;
    }
    
    LoadingState.setLoading(button, 'Procesando...');
    
    // Simular delay de procesamiento
    setTimeout(() => {
        if (tipo === 'entrada') {
            producto.stock += cantidad;
        } else {
            producto.stock -= cantidad;
            if (producto.stock < 0) producto.stock = 0;
        }
        
        mockData.movimientosInventario.push({
            id: mockData.movimientosInventario.length + 1,
            fecha: new Date().toISOString(),
            producto: producto.nombre,
            tipo,
            cantidad,
            observaciones
        });
        
        ToastNotification.show(
            `${tipo === 'entrada' ? 'Entrada' : 'Salida'} registrada: ${cantidad} ${producto.unidad} de ${producto.nombre}. Stock actual: ${producto.stock} ${producto.unidad}`,
            'success'
        );
        
        mostrarModalWhatsApp('Movimiento de Inventario', `Se registró ${tipo === 'entrada' ? 'entrada' : 'salida'} de ${cantidad} ${producto.unidad} de ${producto.nombre}`);
        cargarInventario();
        ocultarFormularioInventario();
        LoadingState.removeLoading(button);
    }, 600);
    
    return false;
};

function cargarInventario() {
    const tbody = document.getElementById('tablaInventario');
    if (!tbody) return;
    
    tbody.innerHTML = mockData.productos.map(producto => {
        const estado = producto.stock <= producto.stockMinimo ? 'danger' : 
                      producto.stock <= producto.stockMinimo * 1.5 ? 'warning' : 'success';
        const estadoTexto = producto.stock <= producto.stockMinimo ? 'Crítico' : 
                           producto.stock <= producto.stockMinimo * 1.5 ? 'Bajo' : 'Normal';
        
        return `
            <tr>
                <td>${producto.nombre}</td>
                <td>${producto.categoria}</td>
                <td>${producto.stock} ${producto.unidad}</td>
                <td>${producto.stockMinimo} ${producto.unidad}</td>
                <td>${new Date().toLocaleDateString()}</td>
                <td><span class="badge badge-${estado}">${estadoTexto}</span></td>
            </tr>
        `;
    }).join('');
}

// Planificación de Menús - Estructura de Árbol Buffet
window.nuevoMenu = function() {
    const fecha = document.getElementById('fechaMenu').value;
    if (!fecha) {
        ToastNotification.show('Seleccione una fecha para el menú', 'warning');
        return;
    }
    document.getElementById('fechaMenuForm').value = fecha;
    document.getElementById('formularioMenu').style.display = 'block';
    // Expandir todas las categorías por defecto
    document.querySelectorAll('.categoria-content').forEach(content => {
        content.classList.add('active');
        content.closest('.menu-categoria').querySelector('.categoria-header').classList.add('active');
    });
    document.querySelectorAll('.subcategoria-content').forEach(content => {
        content.classList.add('active');
        content.closest('.subcategoria').querySelector('.subcategoria-header').classList.add('active');
    });
    // Asegurar que los selects tengan datos
    setTimeout(() => cargarProductosEnSelects(), 100);
};

window.toggleCategoria = function(header) {
    const content = header.nextElementSibling;
    header.classList.toggle('active');
    content.classList.toggle('active');
};

window.toggleSubcategoria = function(header) {
    const content = header.nextElementSibling;
    header.classList.toggle('active');
    content.classList.toggle('active');
};

window.agregarRecetaCategoria = function(categoria) {
    const categoriaEl = document.querySelector(`.menu-categoria[data-categoria="${categoria}"]`);
    const subcategorias = categoriaEl.querySelector('.subcategorias');
    const primeraSub = subcategorias.querySelector('.subcategoria');
    const content = primeraSub.querySelector('.subcategoria-content');
    agregarRecetaEnContenedor(content, categoria, 'general');
};

window.agregarRecetaSubcategoria = function(categoria, subcategoria) {
    const categoriaEl = document.querySelector(`.menu-categoria[data-categoria="${categoria}"]`);
    const subEl = categoriaEl.querySelector(`.subcategoria[data-sub="${subcategoria}"]`);
    const content = subEl.querySelector('.subcategoria-content');
    if (!content.classList.contains('active')) {
        content.classList.add('active');
        subEl.querySelector('.subcategoria-header').classList.add('active');
    }
    agregarRecetaEnContenedor(content, categoria, subcategoria);
};

function agregarRecetaEnContenedor(contenedor, categoria, subcategoria) {
    const recetaId = Date.now();
    const nuevaReceta = document.createElement('div');
    nuevaReceta.className = 'receta-item';
    nuevaReceta.dataset.recetaId = recetaId;
    nuevaReceta.dataset.categoria = categoria;
    nuevaReceta.dataset.subcategoria = subcategoria;
    nuevaReceta.innerHTML = `
        <h4>
            <input type="text" class="nombre-receta" placeholder="Nombre del plato..." required style="flex: 1; border: none; background: transparent; font-size: 1.1rem; color: var(--primary-color); font-weight: 600;">
            <button type="button" class="btn-small" onclick="this.closest('.receta-item').remove()">🗑️</button>
        </h4>
        <div class="materiales-receta">
            <h5>Materiales Estándar</h5>
            <div class="material-item">
                <select class="material-select">
                    <option value="">Seleccionar material...</option>
                </select>
                <input type="number" class="cantidad-material" step="0.01" placeholder="Cantidad (kg)" min="0.01">
                <button type="button" class="btn-small" onclick="agregarMaterial(this)">+</button>
            </div>
        </div>
    `;
    contenedor.appendChild(nuevaReceta);
    cargarProductosEnSelects();
    ToastNotification.show('Receta agregada', 'success');
}

window.sugerenciaIA = function() {
    const fecha = document.getElementById('fechaMenu').value;
    if (!fecha) {
        ToastNotification.show('Seleccione una fecha primero', 'warning');
        return;
    }
    
    // Simular análisis de IA
    ToastNotification.show('🤖 IA analizando tendencias y disponibilidad...', 'info');
    
    setTimeout(() => {
        document.getElementById('fechaMenuForm').value = fecha;
        document.getElementById('formularioMenu').style.display = 'block';
        
        // Expandir categorías
        document.querySelectorAll('.categoria-content').forEach(content => {
            content.classList.add('active');
            content.closest('.menu-categoria').querySelector('.categoria-header').classList.add('active');
        });
        document.querySelectorAll('.subcategoria-content').forEach(content => {
            content.classList.add('active');
            content.closest('.subcategoria').querySelector('.subcategoria-header').classList.add('active');
        });
        
        // Generar sugerencias inteligentes de IA
        setTimeout(() => {
            generarSugerenciasIA();
            cargarProductosEnSelects();
            ToastNotification.show('🤖 Sugerencias de IA generadas basadas en análisis de tendencias', 'success');
        }, 500);
    }, 1500);
};

function generarSugerenciasIA() {
    // Limpiar recetas existentes
    document.querySelectorAll('#menuTree .receta-item').forEach(item => item.remove());
    
    // Sugerencias inteligentes basadas en análisis
    const sugerenciasIA = {
        desayuno: {
            huevos: [
                { nombre: 'Huevos Rancheros (IA Recomendado)', materiales: [{ producto: 'Huevos', cantidad: 6 }, { producto: 'Tomate', cantidad: 0.5 }, { producto: 'Cebolla', cantidad: 0.2 }] }
            ],
            bebidas: [
                { nombre: 'Café Premium (IA: Alta demanda)', materiales: [{ producto: 'Café', cantidad: 0.4 }, { producto: 'Leche', cantidad: 0.3 }] }
            ]
        },
        almuerzo: {
            principales: [
                { nombre: 'Arroz con Pollo (IA: Óptimo costo-beneficio)', materiales: [{ producto: 'Arroz', cantidad: 2.5 }, { producto: 'Pollo', cantidad: 1.8 }] },
                { nombre: 'Pescado a la Plancha (IA: Bajo desperdicio)', materiales: [{ producto: 'Pescado', cantidad: 1.5 }, { producto: 'Aceite', cantidad: 0.15 }] }
            ],
            postres: [
                { nombre: 'Flan Casero (IA: Popularidad alta)', materiales: [{ producto: 'Huevos', cantidad: 8 }, { producto: 'Leche', cantidad: 1.2 }, { producto: 'Azúcar', cantidad: 0.4 }] }
            ],
            bebidas: [
                { nombre: 'Agua de Horchata (IA: Bajo costo)', materiales: [{ producto: 'Arroz', cantidad: 0.4 }, { producto: 'Azúcar', cantidad: 0.25 }] }
            ]
        },
        cena: {
            principales: [
                { nombre: 'Sopa de Verduras (IA: Nutritiva y económica)', materiales: [{ producto: 'Papa', cantidad: 1.2 }, { producto: 'Cebolla', cantidad: 0.4 }, { producto: 'Tomate', cantidad: 0.6 }] }
            ],
            bebidas: [
                { nombre: 'Té de Hierbas (IA: Bajo costo)', materiales: [{ producto: 'Té', cantidad: 0.15 }] }
            ]
        }
    };
    
    // Agregar sugerencias
    Object.keys(sugerenciasIA).forEach(categoria => {
        Object.keys(sugerenciasIA[categoria]).forEach(subcategoria => {
            const subEl = document.querySelector(`.menu-categoria[data-categoria="${categoria}"] .subcategoria[data-sub="${subcategoria}"]`);
            if (subEl) {
                const content = subEl.querySelector('.subcategoria-content');
                
                sugerenciasIA[categoria][subcategoria].forEach(ejemplo => {
                    const recetaId = Date.now() + Math.random();
                    const nuevaReceta = document.createElement('div');
                    nuevaReceta.className = 'receta-item';
                    nuevaReceta.dataset.recetaId = recetaId;
                    nuevaReceta.dataset.categoria = categoria;
                    nuevaReceta.dataset.subcategoria = subcategoria;
                    
                    const materialesHTML = ejemplo.materiales.map(m => {
                        const producto = mockData.productos.find(p => p.nombre.toLowerCase().includes(m.producto.toLowerCase().split(' ')[0]));
                        const productoId = producto ? producto.id : '';
                        return `
                            <div class="material-item">
                                <select class="material-select">
                                    <option value="">Seleccionar material...</option>
                                </select>
                                <input type="number" class="cantidad-material" step="0.01" value="${m.cantidad}" min="0.01">
                                <button type="button" class="btn-small" onclick="this.parentElement.remove()">-</button>
                            </div>
                        `;
                    }).join('');
                    
                    nuevaReceta.innerHTML = `
                        <h4>
                            <input type="text" class="nombre-receta" value="${ejemplo.nombre}" required style="flex: 1; border: none; background: transparent; font-size: 1.1rem; color: var(--primary-color); font-weight: 600;">
                            <button type="button" class="btn-small" onclick="this.closest('.receta-item').remove()">🗑️</button>
                        </h4>
                        <div class="materiales-receta">
                            <h5>Materiales Estándar</h5>
                            ${materialesHTML}
                            <div class="material-item">
                                <select class="material-select">
                                    <option value="">Seleccionar material...</option>
                                </select>
                                <input type="number" class="cantidad-material" step="0.01" placeholder="Cantidad (kg)" min="0.01">
                                <button type="button" class="btn-small" onclick="agregarMaterial(this)">+</button>
                            </div>
                        </div>
                    `;
                    content.appendChild(nuevaReceta);
                });
            }
        });
    });
}

window.generarEjemplosRecetas = function() {
    const ejemplos = {
        desayuno: {
            huevos: [
                { nombre: 'Huevos Revueltos', materiales: [{ producto: 'Huevos', cantidad: 5 }, { producto: 'Aceite', cantidad: 0.1 }] },
                { nombre: 'Huevos Fritos', materiales: [{ producto: 'Huevos', cantidad: 4 }, { producto: 'Aceite', cantidad: 0.08 }] }
            ],
            bebidas: [
                { nombre: 'Café', materiales: [{ producto: 'Café', cantidad: 0.5 }] },
                { nombre: 'Jugo de Naranja', materiales: [{ producto: 'Naranjas', cantidad: 2 }] }
            ],
            otros: [
                { nombre: 'Pan Tostado', materiales: [{ producto: 'Pan', cantidad: 0.3 }] },
                { nombre: 'Avena', materiales: [{ producto: 'Avena', cantidad: 0.5 }, { producto: 'Leche', cantidad: 0.5 }] }
            ]
        },
        almuerzo: {
            principales: [
                { nombre: 'Arroz con Pollo', materiales: [{ producto: 'Arroz', cantidad: 2 }, { producto: 'Pollo', cantidad: 1.5 }] },
                { nombre: 'Carne Asada', materiales: [{ producto: 'Carne de Res', cantidad: 2 }] },
                { nombre: 'Pescado Frito', materiales: [{ producto: 'Pescado', cantidad: 1.5 }, { producto: 'Aceite', cantidad: 0.2 }] }
            ],
            postres: [
                { nombre: 'Flan', materiales: [{ producto: 'Huevos', cantidad: 6 }, { producto: 'Leche', cantidad: 1 }, { producto: 'Azúcar', cantidad: 0.3 }] },
                { nombre: 'Arroz con Leche', materiales: [{ producto: 'Arroz', cantidad: 0.5 }, { producto: 'Leche', cantidad: 1 }, { producto: 'Azúcar', cantidad: 0.2 }] }
            ],
            bebidas: [
                { nombre: 'Refresco', materiales: [{ producto: 'Refresco', cantidad: 1 }] },
                { nombre: 'Agua de Horchata', materiales: [{ producto: 'Arroz', cantidad: 0.3 }, { producto: 'Azúcar', cantidad: 0.2 }] }
            ]
        },
        cena: {
            principales: [
                { nombre: 'Sopa de Verduras', materiales: [{ producto: 'Papa', cantidad: 1 }, { producto: 'Cebolla', cantidad: 0.3 }, { producto: 'Tomate', cantidad: 0.5 }] },
                { nombre: 'Ensalada César', materiales: [{ producto: 'Lechuga', cantidad: 0.5 }, { producto: 'Pollo', cantidad: 0.8 }] }
            ],
            postres: [
                { nombre: 'Gelatina', materiales: [{ producto: 'Gelatina', cantidad: 0.2 }] }
            ],
            bebidas: [
                { nombre: 'Té', materiales: [{ producto: 'Té', cantidad: 0.1 }] }
            ]
        }
    };
    
    // Agregar ejemplos a cada subcategoría
    Object.keys(ejemplos).forEach(categoria => {
        Object.keys(ejemplos[categoria]).forEach(subcategoria => {
            const subEl = document.querySelector(`.menu-categoria[data-categoria="${categoria}"] .subcategoria[data-sub="${subcategoria}"]`);
            if (subEl) {
                const content = subEl.querySelector('.subcategoria-content');
                content.classList.add('active');
                subEl.querySelector('.subcategoria-header').classList.add('active');
                
                ejemplos[categoria][subcategoria].forEach(ejemplo => {
                    const recetaId = Date.now() + Math.random();
                    const nuevaReceta = document.createElement('div');
                    nuevaReceta.className = 'receta-item';
                    nuevaReceta.dataset.recetaId = recetaId;
                    nuevaReceta.dataset.categoria = categoria;
                    nuevaReceta.dataset.subcategoria = subcategoria;
                    
                    const materialesHTML = ejemplo.materiales.map(m => {
                        const producto = mockData.productos.find(p => p.nombre.toLowerCase().includes(m.producto.toLowerCase().split(' ')[0]));
                        const productoId = producto ? producto.id : '';
                        return `
                            <div class="material-item">
                                <select class="material-select">
                                    <option value="">Seleccionar material...</option>
                                </select>
                                <input type="number" class="cantidad-material" step="0.01" value="${m.cantidad}" min="0.01">
                                <button type="button" class="btn-small" onclick="this.parentElement.remove()">-</button>
                            </div>
                        `;
                    }).join('');
                    
                    nuevaReceta.innerHTML = `
                        <h4>
                            <input type="text" class="nombre-receta" value="${ejemplo.nombre}" required style="flex: 1; border: none; background: transparent; font-size: 1.1rem; color: var(--primary-color); font-weight: 600;">
                            <button type="button" class="btn-small" onclick="this.closest('.receta-item').remove()">🗑️</button>
                        </h4>
                        <div class="materiales-receta">
                            <h5>Materiales Estándar</h5>
                            ${materialesHTML}
                            <div class="material-item">
                                <select class="material-select">
                                    <option value="">Seleccionar material...</option>
                                </select>
                                <input type="number" class="cantidad-material" step="0.01" placeholder="Cantidad (kg)" min="0.01">
                                <button type="button" class="btn-small" onclick="agregarMaterial(this)">+</button>
                            </div>
                        </div>
                    `;
                    content.appendChild(nuevaReceta);
                });
            }
        });
    });
    
    setTimeout(() => cargarProductosEnSelects(), 100);
    ToastNotification.show('Ejemplos de recetas generados', 'success');
};

window.subirExcel = function(event) {
    const file = event.target.files[0];
    if (!file) return;
    
    if (!file.name.match(/\.(xlsx|xls)$/)) {
        ToastNotification.show('Por favor, seleccione un archivo Excel válido', 'error');
        return;
    }
    
    LoadingState.setLoading(event.target, 'Procesando...');
    
    // Simular procesamiento de Excel
    setTimeout(() => {
        // Simular datos del Excel
        const datosExcel = {
            desayuno: {
                huevos: [{ nombre: 'Huevos Rancheros', materiales: [{ producto: 'Huevos', cantidad: 6 }, { producto: 'Tomate', cantidad: 0.5 }] }],
                bebidas: [{ nombre: 'Café con Leche', materiales: [{ producto: 'Café', cantidad: 0.3 }, { producto: 'Leche', cantidad: 0.2 }] }]
            },
            almuerzo: {
                principales: [{ nombre: 'Pollo al Curry', materiales: [{ producto: 'Pollo', cantidad: 2 }, { producto: 'Arroz', cantidad: 1.5 }] }],
                postres: [{ nombre: 'Pastel de Chocolate', materiales: [{ producto: 'Harina', cantidad: 0.5 }, { producto: 'Azúcar', cantidad: 0.3 }] }]
            }
        };
        
        // Cargar datos del Excel
        Object.keys(datosExcel).forEach(categoria => {
            Object.keys(datosExcel[categoria]).forEach(subcategoria => {
                const subEl = document.querySelector(`.menu-categoria[data-categoria="${categoria}"] .subcategoria[data-sub="${subcategoria}"]`);
                if (subEl) {
                    const content = subEl.querySelector('.subcategoria-content');
                    content.classList.add('active');
                    subEl.querySelector('.subcategoria-header').classList.add('active');
                    
                    datosExcel[categoria][subcategoria].forEach(receta => {
                        agregarRecetaEnContenedor(content, categoria, subcategoria);
                        const ultimaReceta = content.querySelector('.receta-item:last-child');
                        if (ultimaReceta) {
                            ultimaReceta.querySelector('.nombre-receta').value = receta.nombre;
                            // Agregar materiales
                            receta.materiales.forEach((mat, idx) => {
                                if (idx > 0) {
                                    agregarMaterial(ultimaReceta.querySelector('.material-item:last-child .btn-small'));
                                }
                                const materialItem = ultimaReceta.querySelectorAll('.material-item')[idx];
                                if (materialItem) {
                                    setTimeout(() => {
                                        const producto = mockData.productos.find(p => p.nombre.toLowerCase().includes(mat.producto.toLowerCase().split(' ')[0]));
                                        if (producto) {
                                            materialItem.querySelector('.material-select').value = producto.id;
                                        }
                                        materialItem.querySelector('.cantidad-material').value = mat.cantidad;
                                    }, 100);
                                }
                            });
                        }
                    });
                }
            });
        });
        
        LoadingState.removeLoading(event.target);
        ToastNotification.show(`Template Excel "${file.name}" procesado exitosamente`, 'success');
        event.target.value = ''; // Reset input
    }, 1500);
};

window.agregarReceta = function() {
    const container = document.getElementById('recetasContainer');
    const numRecetas = container.children.length + 1;
    const nuevaReceta = document.createElement('div');
    nuevaReceta.className = 'receta-item';
    nuevaReceta.innerHTML = `
        <h4>Receta ${numRecetas}</h4>
        <div class="form-group">
            <label>Nombre del Plato</label>
            <input type="text" class="nombre-receta" placeholder="Ej: Carne Asada" required>
        </div>
        <div class="materiales-receta">
            <h5>Materiales Estándar</h5>
            <div class="material-item">
                <select class="material-select">
                    <option value="">Seleccionar material...</option>
                </select>
                <input type="number" class="cantidad-material" step="0.01" placeholder="Cantidad (kg)" min="0.01">
                <button type="button" class="btn-small" onclick="agregarMaterial(this)">+</button>
            </div>
        </div>
    `;
    container.appendChild(nuevaReceta);
    cargarProductosEnSelects();
    ToastNotification.show(`Receta ${numRecetas} agregada`, 'info');
};

window.agregarMaterial = function(btn) {
    const materialesReceta = btn.closest('.materiales-receta');
    const nuevoMaterial = document.createElement('div');
    nuevoMaterial.className = 'material-item';
    nuevoMaterial.innerHTML = `
        <select class="material-select">
            <option value="">Seleccionar material...</option>
        </select>
        <input type="number" class="cantidad-material" step="0.01" placeholder="Cantidad (kg)" min="0.01">
        <button type="button" class="btn-small" onclick="this.parentElement.remove()">-</button>
    `;
    materialesReceta.appendChild(nuevoMaterial);
    cargarProductosEnSelects();
};

window.guardarMenu = function(event) {
    event.preventDefault();
    const form = event.target.closest('form');
    const button = form.querySelector('button[type="submit"]');
    const fecha = document.getElementById('fechaMenuForm').value;
    const recetasItems = document.querySelectorAll('#menuTree .receta-item');
    const recetas = [];
    
    if (!fecha) {
        ToastNotification.show('Selecciona una fecha para el menú', 'error');
        return false;
    }
    
    recetasItems.forEach((item) => {
        const nombre = item.querySelector('.nombre-receta').value;
        if (!nombre) return;
        
        const categoria = item.dataset.categoria;
        const subcategoria = item.dataset.subcategoria;
        
        const materiales = [];
        item.querySelectorAll('.material-item').forEach(matItem => {
            const productoId = matItem.querySelector('.material-select').value;
            const cantidad = parseFloat(matItem.querySelector('.cantidad-material').value);
            if (productoId && cantidad) {
                const producto = mockData.productos.find(p => p.id === parseInt(productoId));
                if (producto) {
                    materiales.push({ producto: producto.nombre, cantidad });
                }
            }
        });
        
        if (materiales.length > 0) {
            recetas.push({ 
                nombre, 
                materiales,
                categoria,
                subcategoria
            });
        }
    });
    
    if (recetas.length === 0) {
        ToastNotification.show('Agrega al menos una receta con materiales', 'error');
        return false;
    }
    
    LoadingState.setLoading(button, 'Guardando...');
    
    setTimeout(() => {
        const menu = {
            id: mockData.menus.length + 1,
            fecha,
            recetas,
            fechaCreacion: new Date().toISOString(),
            tipo: 'buffet'
        };
        
        mockData.menus.push(menu);
        cargarMenus();
        cancelarMenu();
        LoadingState.removeLoading(button);
        ToastNotification.show(`Menú Buffet del ${new Date(fecha).toLocaleDateString()} guardado exitosamente con ${recetas.length} receta(s)`, 'success');
    }, 600);
    
    return false;
};

window.cancelarMenu = function() {
    document.getElementById('formularioMenu').style.display = 'none';
    const form = document.getElementById('formularioMenu').querySelector('form');
    if (form) form.reset();
    // Limpiar todas las recetas del árbol
    document.querySelectorAll('#menuTree .receta-item').forEach(item => item.remove());
    // Colapsar todas las categorías
    document.querySelectorAll('.categoria-content').forEach(content => {
        content.classList.remove('active');
        content.closest('.menu-categoria').querySelector('.categoria-header').classList.remove('active');
    });
    document.querySelectorAll('.subcategoria-content').forEach(content => {
        content.classList.remove('active');
        content.closest('.subcategoria').querySelector('.subcategoria-header').classList.remove('active');
    });
};

function cargarMenus() {
    const container = document.getElementById('menusList');
    if (!container) return;
    
    if (mockData.menus.length === 0) {
        container.innerHTML = '<p style="text-align: center; color: var(--text-secondary);">No hay menús planificados</p>';
        return;
    }
    
    container.innerHTML = mockData.menus.map(menu => {
        const categorias = {};
        menu.recetas.forEach(receta => {
            const cat = receta.categoria || 'general';
            const sub = receta.subcategoria || 'general';
            if (!categorias[cat]) categorias[cat] = {};
            if (!categorias[cat][sub]) categorias[cat][sub] = [];
            categorias[cat][sub].push(receta);
        });
        
        const categoriasHTML = Object.keys(categorias).map(cat => {
            const nombreCat = cat === 'desayuno' ? '🌅 Desayuno' : cat === 'almuerzo' ? '🍽️ Almuerzo' : cat === 'cena' ? '🌙 Cena' : cat;
            const subcategoriasHTML = Object.keys(categorias[cat]).map(sub => {
                const nombreSub = sub === 'huevos' ? '🥚 Huevos' : 
                                 sub === 'bebidas' ? '🥤 Bebidas' :
                                 sub === 'postres' ? '🍰 Postres' :
                                 sub === 'principales' ? '🍛 Principales' :
                                 sub === 'otros' ? '🍞 Otros' : sub;
                const recetasHTML = categorias[cat][sub].map(receta => `
                    <div class="receta-list-item">
                        <strong>${receta.nombre}</strong>
                        <ul style="margin-top: 0.5rem; margin-left: 1.5rem;">
                            ${receta.materiales.map(m => `<li>${m.producto}: ${m.cantidad} kg</li>`).join('')}
                        </ul>
                    </div>
                `).join('');
                return `
                    <div style="margin-left: 1rem; margin-top: 0.5rem;">
                        <strong style="color: var(--primary-color);">${nombreSub}</strong>
                        ${recetasHTML}
                    </div>
                `;
            }).join('');
            return `
                <div style="margin-bottom: 1rem;">
                    <h5 style="color: var(--primary-color); font-size: 1.1rem; margin-bottom: 0.5rem;">${nombreCat}</h5>
                    ${subcategoriasHTML}
                </div>
            `;
        }).join('');
        
        return `
            <div class="menu-item">
                <h4>Menú Buffet del ${new Date(menu.fecha).toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</h4>
                <div class="receta-list">
                    ${categoriasHTML}
                </div>
            </div>
        `;
    }).join('');
}

window.guardarConfiguracion = function(event) {
    event.preventDefault();
    const form = event.target;
    const button = form.querySelector('button[type="submit"]');
    
    const config = {
        stockMinimoGlobal: parseInt(document.getElementById('stockMinimoGlobal').value),
        porcionesCharola: parseInt(document.getElementById('porcionesCharola').value),
        horarioServicio: document.getElementById('horarioServicio').value,
        whatsappAPI: document.getElementById('whatsappAPI').value,
        ocrService: document.getElementById('ocrService').value
    };
    
    LoadingState.setLoading(button, 'Guardando...');
    
    setTimeout(() => {
        mockData.configuracion = config;
        LoadingState.removeLoading(button);
        ToastNotification.show('Configuración guardada exitosamente', 'success');
    }, 600);
    
    return false;
};

window.resetearConfiguracion = function() {
    if (confirm('¿Desea restaurar los valores por defecto?')) {
        document.getElementById('stockMinimoGlobal').value = 50;
        document.getElementById('porcionesCharola').value = 20;
        document.getElementById('horarioServicio').value = '12:00';
        document.getElementById('whatsappAPI').value = '+52 123 456 7890';
        document.getElementById('ocrService').value = 'google';
        ToastNotification.show('Valores restaurados', 'info');
    }
};

function cargarConfiguracion() {
    const config = mockData.configuracion;
    if (!config) return;
    
    const stockMinimo = document.getElementById('stockMinimoGlobal');
    const porciones = document.getElementById('porcionesCharola');
    const horario = document.getElementById('horarioServicio');
    const whatsapp = document.getElementById('whatsappAPI');
    const ocr = document.getElementById('ocrService');
    
    if (stockMinimo) stockMinimo.value = config.stockMinimoGlobal || 50;
    if (porciones) porciones.value = config.porcionesCharola || 20;
    if (horario) horario.value = config.horarioServicio || '12:00';
    if (whatsapp) whatsapp.value = config.whatsappAPI || '+52 123 456 7890';
    if (ocr) ocr.value = config.ocrService || 'google';
}

window.generarCompras = function() {
    if (mockData.menus.length === 0) {
        ToastNotification.show('No hay menús planificados para generar compras', 'warning');
        return;
    }
    
    // Calcular necesidades totales
    const necesidades = {};
    mockData.menus.forEach(menu => {
        menu.recetas.forEach(receta => {
            receta.materiales.forEach(mat => {
                if (!necesidades[mat.producto]) {
                    necesidades[mat.producto] = 0;
                }
                necesidades[mat.producto] += mat.cantidad;
            });
        });
    });
    
    // Comparar con inventario
    const pedidos = [];
    Object.keys(necesidades).forEach(producto => {
        const productoData = mockData.productos.find(p => p.nombre === producto);
        if (productoData) {
            const diferencia = necesidades[producto] - productoData.stock;
            if (diferencia > 0) {
                pedidos.push({ producto, cantidad: diferencia, unidad: productoData.unidad });
            }
        }
    });
    
    if (pedidos.length === 0) {
        ToastNotification.show('✅ El inventario actual es suficiente para los menús planificados', 'success');
        return;
    }
    
    const pedidoTexto = pedidos.map(p => `• ${p.producto}: ${p.cantidad.toFixed(2)} ${p.unidad}`).join('\n');
    
    // Mostrar modal con detalles
    const modal = document.createElement('div');
    modal.className = 'whatsapp-modal';
    modal.innerHTML = `
        <div class="whatsapp-modal-content">
            <div class="whatsapp-icon">📋</div>
            <h3>Pedido de Compra Generado</h3>
            <div style="margin: 1.5rem 0; padding: 1rem; background: #f0f0f0; border-radius: 0.5rem; text-align: left; max-height: 300px; overflow-y: auto;">
                <p><strong>Productos a comprar:</strong></p>
                <pre style="white-space: pre-wrap; font-family: inherit; margin-top: 0.5rem;">${pedidoTexto}</pre>
            </div>
            <p style="color: var(--text-secondary); font-size: 0.9rem;">Se ha enviado al departamento de compras</p>
            <button class="btn-primary" onclick="this.closest('.whatsapp-modal').remove(); ToastNotification.show('Pedido enviado correctamente', 'success');">Aceptar</button>
        </div>
    `;
    document.body.appendChild(modal);
    
    ToastNotification.show(`Pedido generado con ${pedidos.length} producto(s)`, 'success');
};

function cargarMenusEnProduccion() {
    const select = document.getElementById('menuProduccion');
    if (!select) return;
    
    select.innerHTML = '<option value="">Seleccionar menú del día...</option>' +
        mockData.menus.map(menu => 
            `<option value="${menu.id}">${new Date(menu.fecha).toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</option>`
        ).join('');
    
    // Si hay menús, seleccionar el primero por defecto
    if (mockData.menus.length > 0 && !select.value) {
        select.value = mockData.menus[0].id;
    }
}

// Producción
window.mostrarFormularioProduccion = function() {
    const menuId = document.getElementById('menuProduccion').value;
    if (!menuId) {
        ToastNotification.show('Seleccione un menú primero', 'warning');
        return;
    }
    
    const menu = mockData.menus.find(m => m.id === parseInt(menuId));
    if (!menu) {
        ToastNotification.show('Menú no encontrado', 'error');
        return;
    }
    
    const selectReceta = document.getElementById('recetaProduccion');
    selectReceta.innerHTML = '<option value="">Seleccionar receta...</option>' +
        menu.recetas.map((r, i) => `<option value="${i}">${r.nombre}</option>`).join('');
    
    document.getElementById('formularioProduccion').style.display = 'block';
};

function ocultarFormularioProduccion() {
    document.getElementById('formularioProduccion').style.display = 'none';
    document.getElementById('formularioProduccion').querySelector('form').reset();
}

window.reportarProduccion = function(event) {
    event.preventDefault();
    const form = event.target;
    const button = form.querySelector('button[type="submit"]');
    
    if (!FormValidator.validateForm(form)) {
        ToastNotification.show('Por favor, completa todos los campos requeridos', 'error');
        return false;
    }
    
    const menuId = parseInt(document.getElementById('menuProduccion').value);
    const recetaIndex = parseInt(document.getElementById('recetaProduccion').value);
    const cantidad = parseInt(document.getElementById('cantidadReceta').value);
    const charolas = parseInt(document.getElementById('charolas').value);
    const merma = parseFloat(document.getElementById('merma').value);
    const observaciones = document.getElementById('observacionesProduccion').value;
    
    const menu = mockData.menus.find(m => m.id === menuId);
    if (!menu) {
        ToastNotification.show('Menú no encontrado', 'error');
        return false;
    }
    
    const receta = menu.recetas[recetaIndex];
    if (!receta) {
        ToastNotification.show('Receta no encontrada', 'error');
        return false;
    }
    
    LoadingState.setLoading(button, 'Enviando...');
    
    setTimeout(() => {
        const reporte = {
            id: mockData.produccion.length + 1,
            fecha: new Date().toISOString(),
            menuId,
            receta: receta.nombre,
            cantidad,
            charolas,
            merma,
            observaciones,
            estado: 'Reportado'
        };
        
        mockData.produccion.push(reporte);
        
        const mensaje = `📊 Reporte de Producción\n\n` +
            `Receta: ${receta.nombre}\n` +
            `Cantidad: ${cantidad} porciones\n` +
            `Charolas: ${charolas}\n` +
            `Merma: ${merma} kg\n` +
            `Observaciones: ${observaciones || 'Ninguna'}`;
        
        mostrarModalWhatsApp('Reporte Enviado', mensaje);
        cargarProduccion();
        ocultarFormularioProduccion();
        LoadingState.removeLoading(button);
        ToastNotification.show(`Reporte de producción registrado: ${receta.nombre}`, 'success');
    }, 800);
    
    return false;
};

function cargarProduccion() {
    const tbody = document.getElementById('tablaProduccion');
    if (!tbody) return;
    
    if (mockData.produccion.length === 0) {
        tbody.innerHTML = '<tr><td colspan="6" style="text-align: center; color: var(--text-secondary);">No hay reportes de producción</td></tr>';
        return;
    }
    
    tbody.innerHTML = mockData.produccion.map(prod => `
        <tr>
            <td>${new Date(prod.fecha).toLocaleDateString()}</td>
            <td>${prod.receta}</td>
            <td>${prod.cantidad}</td>
            <td>${prod.charolas}</td>
            <td>${prod.merma}</td>
            <td><span class="badge badge-success">${prod.estado}</span></td>
        </tr>
    `).join('');
}

// Servicio al Cliente
window.crearEncuesta = function() {
    document.getElementById('formularioEncuesta').style.display = 'block';
};

window.cancelarEncuesta = function() {
    document.getElementById('formularioEncuesta').style.display = 'none';
    const form = document.getElementById('formularioEncuesta').querySelector('form');
    if (form) form.reset();
};

window.guardarEncuesta = function(event) {
    event.preventDefault();
    const form = event.target;
    const button = form.querySelector('button[type="submit"]');
    
    if (!FormValidator.validateForm(form)) {
        ToastNotification.show('Por favor, completa todos los campos requeridos', 'error');
        return false;
    }
    
    const titulo = document.getElementById('tituloEncuesta').value;
    const preguntasTexto = document.getElementById('preguntasEncuesta').value;
    const preguntas = preguntasTexto.split('\n').filter(p => p.trim());
    
    if (preguntas.length === 0) {
        ToastNotification.show('Agrega al menos una pregunta', 'error');
        return false;
    }
    
    LoadingState.setLoading(button, 'Generando...');
    
    setTimeout(() => {
        const encuesta = {
            id: mockData.encuestas.length + 1,
            titulo,
            preguntas,
            fechaCreacion: new Date().toISOString(),
            url: `https://encuesta.com/${Date.now()}`
        };
        
        mockData.encuestas.push(encuesta);
        cargarEncuestas();
        cancelarEncuesta();
        LoadingState.removeLoading(button);
        ToastNotification.show(`Encuesta "${titulo}" creada exitosamente`, 'success');
        
        // Generar QR
        setTimeout(() => generarQR(encuesta), 200);
    }, 600);
    
    return false;
};

function generarQR(encuesta) {
    const qrContainer = document.createElement('div');
    qrContainer.className = 'qr-container';
    qrContainer.id = `qr-${encuesta.id}`;
    
    const qrCodeDiv = document.createElement('div');
    qrCodeDiv.className = 'qr-code';
    
    // Usar servicio online de QR directamente (más confiable)
    const qrImage = document.createElement('img');
    qrImage.src = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(encuesta.url)}`;
    qrImage.alt = 'Código QR de la encuesta';
    qrImage.style.width = '200px';
    qrImage.style.height = '200px';
    qrImage.style.border = '1px solid #e2e8f0';
    qrImage.style.borderRadius = '0.5rem';
    qrCodeDiv.appendChild(qrImage);
    
    const infoDiv = document.createElement('div');
    infoDiv.innerHTML = `
        <h4>${encuesta.titulo}</h4>
        <p>Escanea el código QR para acceder a la encuesta</p>
        <p><strong>URL:</strong> ${encuesta.url}</p>
        <button class="btn-primary" onclick="copiarURL('${encuesta.url}')">Copiar URL</button>
    `;
    
    qrContainer.appendChild(qrCodeDiv);
    qrContainer.appendChild(infoDiv);
    
    // Agregar al contenedor de encuestas
    setTimeout(() => {
        const encuestaItem = document.querySelector(`[data-encuesta-id="${encuesta.id}"]`);
        if (encuestaItem) {
            const contentDiv = encuestaItem.querySelector('.encuesta-content');
            if (contentDiv && !contentDiv.querySelector(`#qr-${encuesta.id}`)) {
                contentDiv.appendChild(qrContainer);
            }
        }
    }, 100);
}

function copiarURL(url) {
    navigator.clipboard.writeText(url).then(() => {
        alert('URL copiada al portapapeles');
    });
}

function cargarEncuestas() {
    const container = document.getElementById('encuestasList');
    if (!container) return;
    
    if (mockData.encuestas.length === 0) {
        container.innerHTML = '<p style="text-align: center; color: var(--text-secondary);">No hay encuestas creadas</p>';
        return;
    }
    
    container.innerHTML = mockData.encuestas.map(encuesta => `
        <div class="encuesta-item" data-encuesta-id="${encuesta.id}">
            <h4>${encuesta.titulo}</h4>
            <p><strong>Fecha:</strong> ${new Date(encuesta.fechaCreacion).toLocaleDateString()}</p>
            <div class="encuesta-content">
                <h5>Preguntas:</h5>
                <ul style="margin-left: 1.5rem; margin-top: 0.5rem;">
                    ${encuesta.preguntas.map(p => `<li>${p}</li>`).join('')}
                </ul>
            </div>
        </div>
    `).join('');
    
    // Generar QRs después de que el DOM se actualice
    setTimeout(() => {
        mockData.encuestas.forEach(encuesta => {
            generarQR(encuesta);
        });
    }, 100);
}

// Notificaciones Inteligentes con IA
function cargarNotificaciones() {
    generarNotificacionesIA();
    const container = document.getElementById('notificacionesContainer');
    if (!container) return;
    
    if (mockData.notificaciones.length === 0) {
        container.innerHTML = '<p style="text-align: center; color: var(--text-secondary);">No hay notificaciones</p>';
        return;
    }
    
    container.innerHTML = mockData.notificaciones.map(notif => `
        <div class="notification-card notification-${notif.tipo}">
            <div class="notification-icon">${notif.icono}</div>
            <div class="notification-content">
                <div class="notification-header">
                    <h4>${notif.titulo}</h4>
                    ${notif.aiPowered ? '<span class="ai-badge">🤖 IA</span>' : ''}
                </div>
                <p>${notif.mensaje}</p>
                ${notif.accion ? `<button class="btn-small" onclick="${notif.accion}">${notif.accionTexto || 'Ver más'}</button>` : ''}
                <small>${new Date(notif.fecha).toLocaleString()}</small>
            </div>
        </div>
    `).join('');
}

function generarNotificacionesIA() {
    mockData.notificaciones = [];
    
    // Análisis IA de consumo vs planificado
    if (mockData.menus.length > 0 && mockData.produccion.length > 0) {
        mockData.notificaciones.push({
            id: 1,
            titulo: '🤖 IA: Análisis de Consumo Detectado',
            mensaje: 'Nuestro sistema de IA ha analizado los patrones de consumo y detectó que has consumido 10% (3kg) más de arroz de lo planificado. Sugerencia: Ajustar planificación futura o revisar porciones.',
            icono: '📊',
            fecha: new Date().toISOString(),
            tipo: 'warning',
            aiPowered: true,
            accion: 'navegar("dashboard")',
            accionTexto: 'Ver Dashboard'
        });
        
        // IA predice inventario
        const productoBajo = mockData.productos.find(p => p.stock <= p.stockMinimo * 1.2);
        if (productoBajo) {
            mockData.notificaciones.push({
                id: 2,
                titulo: '🤖 IA: Predicción de Inventario',
                mensaje: `Basado en el análisis de tendencias, IA predice que ${productoBajo.nombre} alcanzará el stock mínimo en 2-3 días. Stock actual: ${productoBajo.stock} ${productoBajo.unidad}. Recomendación: Generar orden de compra.`,
                icono: '🔮',
                fecha: new Date().toISOString(),
                tipo: 'warning',
                aiPowered: true,
                accion: 'navegar("compras")',
                accionTexto: 'Ver Compras'
            });
        }
        
        // IA sugiere optimización
        mockData.notificaciones.push({
            id: 3,
            titulo: '🤖 IA: Sugerencia de Optimización',
            mensaje: 'IA ha analizado los últimos 7 días y sugiere reducir la merma en un 15% mediante mejor control de porciones. Ahorro estimado: $2,500 semanales.',
            icono: '💡',
            fecha: new Date().toISOString(),
            tipo: 'info',
            aiPowered: true,
            accion: 'navegar("produccion")',
            accionTexto: 'Ver Producción'
        });
    }
    
    // IA analiza inventario
    const productosCriticos = mockData.productos.filter(p => p.stock <= p.stockMinimo);
    if (productosCriticos.length > 0) {
        mockData.notificaciones.push({
            id: 4,
            titulo: '🤖 IA: Alerta de Inventario Crítico',
            mensaje: `IA detectó ${productosCriticos.length} producto(s) en nivel crítico: ${productosCriticos.map(p => p.nombre).join(', ')}. Acción recomendada: Comprar urgentemente.`,
            icono: '⚠️',
            fecha: new Date().toISOString(),
            tipo: 'danger',
            aiPowered: true,
            accion: 'navegar("inventario")',
            accionTexto: 'Ver Inventario'
        });
    }
    
    // IA sugiere menú basado en tendencias
    mockData.notificaciones.push({
        id: 5,
        titulo: '🤖 IA: Sugerencia de Menú Inteligente',
        mensaje: 'Basado en análisis de preferencias y disponibilidad, IA sugiere para mañana: Arroz con Pollo (alta demanda), Ensalada César (bajo costo), Flan (popular). Click para aplicar sugerencia.',
        icono: '🍽️',
        fecha: new Date().toISOString(),
        tipo: 'info',
        aiPowered: true,
        accion: 'aplicarSugerenciaIA()',
        accionTexto: 'Aplicar Sugerencia'
    });
    
    // IA detecta patrones de compra
    if (mockData.compras.length > 5) {
        mockData.notificaciones.push({
            id: 6,
            titulo: '🤖 IA: Análisis de Patrones de Compra',
            mensaje: 'IA ha identificado que compras más frecuentemente a "Proveedor A" los lunes. Sugerencia: Negociar descuento por volumen o automatizar pedidos recurrentes.',
            icono: '📈',
            fecha: new Date().toISOString(),
            tipo: 'info',
            aiPowered: true,
            accion: 'navegar("compras")',
            accionTexto: 'Ver Análisis'
        });
    }
    
    // IA predice demanda
    mockData.notificaciones.push({
        id: 7,
        titulo: '🤖 IA: Predicción de Demanda',
        mensaje: 'Basado en datos históricos y factores estacionales, IA predice un aumento del 12% en demanda para el próximo viernes. Recomendación: Aumentar producción en un 15% para evitar desabastecimiento.',
        icono: '🔮',
        fecha: new Date().toISOString(),
        tipo: 'info',
        aiPowered: true,
        accion: 'navegar("planificacion")',
        accionTexto: 'Planificar'
    });
    
    // Ordenar por fecha (más recientes primero)
    mockData.notificaciones.sort((a, b) => new Date(b.fecha) - new Date(a.fecha));
}

window.aplicarSugerenciaIA = function() {
    const fecha = new Date();
    fecha.setDate(fecha.getDate() + 1);
    const fechaStr = fecha.toISOString().split('T')[0];
    
    document.getElementById('fechaMenu').value = fechaStr;
    sugerenciaIA();
    ToastNotification.show('🤖 Sugerencia de IA aplicada. Revisa y ajusta según necesites.', 'success');
};

// Utilidades
function mostrarModalWhatsApp(titulo, mensaje) {
    const modal = document.createElement('div');
    modal.className = 'whatsapp-modal';
    modal.innerHTML = `
        <div class="whatsapp-modal-content">
            <div class="whatsapp-icon">📱</div>
            <h3>${titulo}</h3>
            <p style="white-space: pre-line; text-align: left; background: #f0f0f0; padding: 1rem; border-radius: 0.5rem; margin: 1rem 0;">${mensaje}</p>
            <button class="btn-primary" onclick="this.closest('.whatsapp-modal').remove()">Aceptar</button>
        </div>
    `;
    document.body.appendChild(modal);
}

