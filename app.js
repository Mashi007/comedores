// Navegación
function navegar(destino) {
    cambiarPantalla(getPantallaActual(), destino);
}

function getPantallaActual() {
    const activa = document.querySelector('.screen.active');
    return activa ? activa.id : 'portada';
}

function cambiarPantalla(ocultar, mostrar) {
    console.log('🔄 Cambiando pantalla de', ocultar, 'a', mostrar);
    
    // Ocultar todas las pantallas primero
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });
    
    // Mostrar la pantalla deseada
    const mostrarEl = document.getElementById(mostrar);
    if (!mostrarEl) {
        console.error('❌ Pantalla no encontrada:', mostrar);
        return;
    }
    
    console.log('✅ Pantalla encontrada:', mostrar);
    mostrarEl.classList.add('active');
    console.log('✅ Clase active agregada');
    
    // Mostrar sidebar en pantallas del sistema
    const pantallasSistema = ['menu', 'dashboard', 'compras', 'inventario', 'planificacion', 'produccion', 'servicio', 'notificaciones', 'configuracion'];
    const sidebar = document.getElementById('sidebar');
    
    if (pantallasSistema.includes(mostrar)) {
        console.log('📋 Mostrando sidebar para:', mostrar);
        if (sidebar) {
            sidebar.style.display = 'flex';
            // En desktop, abrir sidebar automáticamente
            if (window.innerWidth > 768) {
                sidebar.classList.add('open');
                console.log('📋 Sidebar abierto en desktop');
            }
        }
    } else {
        if (sidebar) {
            sidebar.style.display = 'none';
            sidebar.classList.remove('open');
        }
        const overlay = document.getElementById('sidebarOverlay');
        if (overlay) overlay.classList.remove('active');
    }
    
    // Actualizar item activo en sidebar
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
        if (item.dataset.section === mostrar) {
            item.classList.add('active');
        }
    });
    
    // Verificar que la pantalla se muestre
    setTimeout(() => {
        const pantallaActiva = document.querySelector('.screen.active');
        console.log('🔍 Pantalla activa después del cambio:', pantallaActiva?.id);
        if (pantallaActiva) {
            const display = window.getComputedStyle(pantallaActiva).display;
            console.log('🔍 Display de pantalla activa:', display);
            if (display === 'none') {
                console.error('❌ La pantalla activa tiene display: none, forzando display: block');
                pantallaActiva.style.display = 'block';
            }
        }
    }, 100);
    
    // Inicializar gráficos si es dashboard
    if (mostrar === 'dashboard') {
        setTimeout(inicializarGraficos, 300);
    }
    
    console.log('✅ Cambio de pantalla completado');
}

// Hacer función global
window.cambiarPantalla = cambiarPantalla;

// Sidebar
function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebarOverlay');
    
    sidebar.classList.toggle('open');
    overlay.classList.toggle('active');
}

// Cerrar sesión
function cerrarSesion() {
    cambiarPantalla(getPantallaActual(), 'portada');
    toggleSidebar();
}

// Gráficos
let chartInstances = {};

function inicializarGraficos() {
    if (typeof Chart === 'undefined') {
        setTimeout(inicializarGraficos, 100);
        return;
    }
    
    const dashboard = document.getElementById('dashboard');
    if (!dashboard || !dashboard.classList.contains('active')) {
        setTimeout(inicializarGraficos, 100);
        return;
    }
    
    // Destruir gráficos existentes
    Object.keys(chartInstances).forEach(key => {
        if (chartInstances[key]) {
            try {
                chartInstances[key].destroy();
            } catch (e) {}
        }
    });
    chartInstances = {};
    
    // Crear gráficos
    crearGrafico1();
    crearGrafico2();
    crearGrafico3();
    crearGrafico4();
    crearGrafico5();
    crearGrafico6();
}

function crearGrafico1() {
    const ctx = document.getElementById('chart1');
    if (!ctx || typeof Chart === 'undefined') return;
    
    chartInstances.chart1 = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'],
            datasets: [{
                label: 'Consumo (kg)',
                data: [120, 135, 128, 142, 130, 125, 118],
                borderColor: '#2563eb',
                backgroundColor: 'rgba(37, 99, 235, 0.1)',
                tension: 0.4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false
        }
    });
}

function crearGrafico2() {
    const ctx = document.getElementById('chart2');
    if (!ctx || typeof Chart === 'undefined') return;
    
    chartInstances.chart2 = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Carnes', 'Verduras', 'Granos', 'Otros'],
            datasets: [{
                data: [35, 25, 20, 20],
                backgroundColor: ['#ef4444', '#10b981', '#f59e0b', '#6366f1']
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false
        }
    });
}

function crearGrafico3() {
    const ctx = document.getElementById('chart3');
    if (!ctx || typeof Chart === 'undefined') return;
    
    chartInstances.chart3 = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Lun', 'Mar', 'Mié', 'Jue', 'Vie'],
            datasets: [{
                label: 'Comidas',
                data: [320, 345, 330, 360, 340],
                backgroundColor: '#10b981'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false
        }
    });
}

function crearGrafico4() {
    const ctx = document.getElementById('chart4');
    if (!ctx || typeof Chart === 'undefined') return;
    
    chartInstances.chart4 = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Arroz', 'Frijoles', 'Pollo', 'Carne', 'Verduras'],
            datasets: [{
                label: 'Uso (kg)',
                data: [450, 320, 280, 250, 200],
                backgroundColor: '#f59e0b'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            indexAxis: 'y'
        }
    });
}

function crearGrafico5() {
    const ctx = document.getElementById('chart5');
    if (!ctx || typeof Chart === 'undefined') return;
    
    chartInstances.chart5 = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Sem 1', 'Sem 2', 'Sem 3', 'Sem 4'],
            datasets: [{
                label: 'Satisfacción',
                data: [4.2, 4.4, 4.5, 4.6],
                borderColor: '#8b5cf6',
                backgroundColor: 'rgba(139, 92, 246, 0.1)',
                tension: 0.4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: false,
                    min: 3,
                    max: 5
                }
            }
        }
    });
}

function crearGrafico6() {
    const ctx = document.getElementById('chart6');
    if (!ctx || typeof Chart === 'undefined') return;
    
    chartInstances.chart6 = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Lun', 'Mar', 'Mié', 'Jue', 'Vie'],
            datasets: [{
                label: 'Planificado',
                data: [50, 55, 52, 58, 54],
                backgroundColor: '#3b82f6'
            }, {
                label: 'Merma',
                data: [5, 6, 4, 7, 5],
                backgroundColor: '#ef4444'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false
        }
    });
}

// Inicialización
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 DOM cargado, inicializando...');
    
    const btnIniciar = document.getElementById('btnIniciar');
    console.log('🔘 Botón encontrado:', !!btnIniciar);
    
    if (btnIniciar) {
        // Remover cualquier listener anterior
        const nuevoBtn = btnIniciar.cloneNode(true);
        btnIniciar.parentNode.replaceChild(nuevoBtn, btnIniciar);
        
        nuevoBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            e.stopImmediatePropagation();
            console.log('🖱️ Botón iniciar clickeado (listener)');
            cambiarPantalla('portada', 'menu');
            return false;
        }, true);
        
        // También agregar onclick directo como respaldo
        nuevoBtn.onclick = function(e) {
            e.preventDefault();
            e.stopPropagation();
            e.stopImmediatePropagation();
            console.log('🖱️ Botón iniciar clickeado (onclick)');
            cambiarPantalla('portada', 'menu');
            return false;
        };
        
        console.log('✅ Listeners agregados al botón');
    } else {
        console.error('❌ Botón btnIniciar no encontrado');
    }
});
