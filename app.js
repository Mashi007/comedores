// ============================================
// NAVEGACIÓN Y FUNCIONES GLOBALES
// ============================================

// Declarar funciones globales primero para que estén disponibles inmediatamente
function navegar(destino) {
    cambiarPantalla(getPantallaActual(), destino);
}

function getPantallaActual() {
    const activa = document.querySelector('.screen.active');
    return activa ? activa.id : 'portada';
}

function cambiarPantalla(ocultar, mostrar) {
    console.log('🔄 Cambiando pantalla de', ocultar, 'a', mostrar);
    
    try {
        // Ocultar todas las pantallas primero
        const todasPantallas = document.querySelectorAll('.screen');
        console.log('📋 Pantallas encontradas:', todasPantallas.length);
        todasPantallas.forEach(screen => {
            screen.classList.remove('active');
            screen.style.display = 'none';
        });
        
        // Mostrar la pantalla deseada
        const mostrarEl = document.getElementById(mostrar);
        if (!mostrarEl) {
            console.error('❌ Pantalla no encontrada:', mostrar);
            return;
        }
        
        console.log('✅ Pantalla encontrada:', mostrar);
        mostrarEl.classList.add('active');
        mostrarEl.style.display = 'block';
        console.log('✅ Clase active agregada y display: block forzado');
    
    // Mostrar sidebar en pantallas del sistema
    const pantallasSistema = ['menu', 'dashboard', 'compras', 'inventario', 'planificacion', 'produccion', 'servicio', 'notificaciones', 'chat-ai', 'costos', 'calidad', 'configuracion'];
    const sidebar = document.getElementById('sidebar');
    
    if (pantallasSistema.includes(mostrar)) {
        console.log('📋 Mostrando sidebar para:', mostrar);
        if (sidebar) {
            sidebar.style.display = 'flex';
            // En desktop, abrir sidebar automáticamente
            if (window.innerWidth > 768) {
                sidebar.classList.add('open');
                document.body.classList.add('sidebar-open');
                console.log('📋 Sidebar abierto en desktop');
            } else {
                document.body.classList.remove('sidebar-open');
            }
        }
    } else {
        if (sidebar) {
            sidebar.style.display = 'none';
            sidebar.classList.remove('open');
        }
        document.body.classList.remove('sidebar-open');
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
                    pantallaActiva.style.visibility = 'visible';
                }
            }
        }, 50);
        
        // Inicializar gráficos si es dashboard
        if (mostrar === 'dashboard') {
            setTimeout(inicializarGraficos, 300);
        }
        
        // Inicializar módulo de Compras si es compras
        if (mostrar === 'compras') {
            setTimeout(() => {
                if (typeof inicializarModuloCompras === 'function') {
                    inicializarModuloCompras();
                }
                if (typeof verificarListaComprasPendiente === 'function') {
                    verificarListaComprasPendiente();
                }
            }, 300);
        }
        
        // Inicializar módulo de Satisfacción si es servicio
        if (mostrar === 'servicio') {
            setTimeout(() => {
                inicializarModuloSatisfaccion();
            }, 300);
        }
        
        // Inicializar módulo de Inventario si es inventario
        if (mostrar === 'inventario') {
            setTimeout(() => {
                inicializarModuloInventario();
            }, 300);
        }
        
        // Inicializar módulo de Costos si es costos
        if (mostrar === 'costos') {
            setTimeout(() => {
                inicializarModuloCostos();
            }, 300);
        }
        
        // Inicializar módulo de Notificaciones si es notificaciones
        if (mostrar === 'notificaciones') {
            setTimeout(() => {
                inicializarModuloNotificaciones();
            }, 300);
        }
        
        // Inicializar módulo de Planificación si es planificacion
        if (mostrar === 'planificacion') {
            setTimeout(() => {
                inicializarModuloPlanificacion();
            }, 300);
        }
        
        // Inicializar módulo de Producción si es produccion
        if (mostrar === 'produccion') {
            setTimeout(() => {
                if (typeof inicializarModuloProduccion === 'function') {
                    inicializarModuloProduccion();
                }
            }, 300);
        }
        
        // Inicializar módulo de Calidad si es calidad
        if (mostrar === 'calidad') {
            setTimeout(() => {
                inicializarModuloCalidad();
            }, 300);
        }
        
        // Inicializar módulo de Configuración si es configuracion
        if (mostrar === 'configuracion') {
            setTimeout(() => {
                if (typeof inicializarModuloConfiguracion === 'function') {
                    inicializarModuloConfiguracion();
                }
            }, 300);
        }
        
        console.log('✅ Cambio de pantalla completado');
    } catch (error) {
        console.error('❌ Error al cambiar pantalla:', error);
    }
}

// Exponer funciones de navegación INMEDIATAMENTE (ya están declaradas arriba)
// Estas funciones deben estar disponibles para onclick inline en HTML
if (typeof window !== 'undefined') {
    window.cambiarPantalla = cambiarPantalla;
    window.navegar = navegar;
}

// Sidebar
function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebarOverlay');
    
    sidebar.classList.toggle('open');
    overlay.classList.toggle('active');
    
    // Agregar/quitar clase al body
    if (sidebar.classList.contains('open')) {
        document.body.classList.add('sidebar-open');
    } else {
        document.body.classList.remove('sidebar-open');
    }
}

// Menú de usuario
function toggleUserMenu() {
    const userMenu = document.getElementById('userMenu');
    const sidebarUser = document.querySelector('.sidebar-user');
    
    if (userMenu && sidebarUser) {
        userMenu.classList.toggle('open');
        sidebarUser.classList.toggle('active');
    }
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
        console.log('⏳ Esperando Chart.js...');
        setTimeout(inicializarGraficos, 100);
        return;
    }
    
    const dashboard = document.getElementById('dashboard');
    if (!dashboard) {
        console.log('⏳ Esperando elemento dashboard...');
        setTimeout(inicializarGraficos, 100);
        return;
    }
    
    if (!dashboard.classList.contains('active')) {
        console.log('⏳ Dashboard no está activo, esperando...');
        setTimeout(inicializarGraficos, 100);
        return;
    }
    
    console.log('📊 Inicializando gráficos del dashboard...');
    
    // Destruir gráficos existentes
    Object.keys(chartInstances).forEach(key => {
        if (chartInstances[key]) {
            try {
                chartInstances[key].destroy();
            } catch (e) {
                console.warn(`Error al destruir gráfico ${key}:`, e);
            }
        }
    });
    chartInstances = {};
    
    // Actualizar KPIs
    actualizarKPIsDashboard();
    
    // Crear gráficos principales con delay para asegurar que el DOM esté listo
    setTimeout(() => {
        try {
            crearGraficoTendenciaPrincipal();
            console.log('✅ Gráfico Tendencia Principal creado');
        } catch (e) {
            console.error('❌ Error creando gráfico Tendencia Principal:', e);
        }
    }, 100);
    
    setTimeout(() => {
        try {
            crearGraficoEficienciaModulos();
            console.log('✅ Gráfico Eficiencia Módulos creado');
        } catch (e) {
            console.error('❌ Error creando gráfico Eficiencia Módulos:', e);
        }
    }, 150);
    
    // Crear gráficos secundarios
    setTimeout(() => {
        try {
            crearGrafico1();
            crearGrafico2();
            crearGrafico3();
            crearGrafico4();
            crearGrafico5();
            crearGrafico6();
            crearGrafico7();
            crearGrafico8();
            crearGrafico9();
            console.log('✅ Gráficos secundarios creados');
        } catch (e) {
            console.error('❌ Error creando gráficos secundarios:', e);
        }
    }, 200);
    
    // Crear gráficos innovadores
    setTimeout(() => {
        try {
            crearGraficoHeatmap();
            crearGraficoDesviaciones();
            crearGraficoROI();
            console.log('✅ Gráficos innovadores creados');
        } catch (e) {
            console.error('❌ Error creando gráficos innovadores:', e);
        }
    }, 250);
    
    console.log('✅ Inicialización de gráficos completada');
}

// Actualizar KPIs del Dashboard
function actualizarKPIsDashboard() {
    // Calcular eficiencia general (promedio de eficiencias de módulos)
    let eficienciaGeneral = 87.5; // Valor por defecto
    if (typeof produccionData !== 'undefined' && produccionData.registros && produccionData.registros.length > 0) {
        const hoy = new Date().toISOString().split('T')[0];
        const registrosHoy = produccionData.registros.filter(r => r.fecha === hoy);
        if (registrosHoy.length > 0) {
            const mermaPromedio = registrosHoy.reduce((sum, r) => sum + r.merma, 0) / registrosHoy.length;
            eficienciaGeneral = Math.max(0, 100 - mermaPromedio);
        }
    }
    const kpiEficiencia = document.getElementById('kpiEficienciaGeneral');
    if (kpiEficiencia) {
        kpiEficiencia.textContent = eficienciaGeneral.toFixed(1) + '%';
    }
    
    // Calcular producción total (charolas del mes)
    let produccionTotal = 2450; // Valor por defecto
    if (typeof produccionData !== 'undefined' && produccionData.registros && produccionData.registros.length > 0) {
        const hoy = new Date();
        const inicioMes = new Date(hoy.getFullYear(), hoy.getMonth(), 1);
        produccionTotal = produccionData.registros
            .filter(r => new Date(r.fecha) >= inicioMes)
            .reduce((sum, r) => sum + r.charolas, 0);
    }
    const kpiProduccion = document.getElementById('kpiProduccionTotal');
    if (kpiProduccion) {
        kpiProduccion.textContent = produccionTotal.toLocaleString('es-ES');
    }
    
    // Calcular costo promedio por charola
    let costoPromedio = 12.50; // Valor por defecto
    if (typeof costosData !== 'undefined' && costosData.costosDiarios && costosData.costosDiarios.length > 0) {
        const costosRecientes = costosData.costosDiarios.slice(-7); // Últimos 7 días
        if (costosRecientes.length > 0) {
            const costoTotal = costosRecientes.reduce((sum, c) => sum + c.costoTotal, 0);
            const charolasTotal = produccionTotal > 0 ? produccionTotal : 2450;
            costoPromedio = charolasTotal > 0 ? costoTotal / charolasTotal : 12.50;
        }
    }
    const kpiCosto = document.getElementById('kpiCostoPromedio');
    if (kpiCosto) {
        kpiCosto.textContent = '$' + costoPromedio.toFixed(2);
    }
    
    // Calcular satisfacción promedio
    let satisfaccionPromedio = 4.3; // Valor por defecto
    if (typeof satisfaccionData !== 'undefined' && satisfaccionData.respuestas && satisfaccionData.respuestas.length > 0) {
        const promedio = satisfaccionData.respuestas.reduce((sum, r) => sum + r.calificacionGeneral, 0) / satisfaccionData.respuestas.length;
        satisfaccionPromedio = promedio;
    }
    const kpiSatisfaccion = document.getElementById('kpiSatisfaccionPromedio');
    if (kpiSatisfaccion) {
        kpiSatisfaccion.textContent = satisfaccionPromedio.toFixed(1);
    }
}

// Función para actualizar dashboard con filtros
function actualizarDashboard() {
    const periodo = document.getElementById('filtroPeriodoDashboard')?.value || 30;
    inicializarGraficos();
}

// Función para exportar dashboard
function exportarDashboard() {
    ToastNotification.show('Exportando dashboard...', 'info', 2000);
    // Implementar exportación a PDF/Excel
}

// Función para cambiar vista de gráfico
function toggleChartView(chartId) {
    ToastNotification.show('Cambiando vista del gráfico...', 'info', 1500);
    // Implementar cambio de tipo de gráfico
}

function crearGrafico1() {
    const ctx = document.getElementById('chart1');
    if (!ctx || typeof Chart === 'undefined') return;
    
    const data = [120, 135, 128, 142, 130, 125, 118];
    const labels = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
    
    chartInstances.chart1 = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Consumo (kg)',
                data: data,
                borderColor: '#2563eb',
                backgroundColor: 'rgba(37, 99, 235, 0.1)',
                borderWidth: 3,
                pointRadius: 0,
                pointHoverRadius: 8,
                pointBackgroundColor: '#2563eb',
                pointBorderColor: '#ffffff',
                pointBorderWidth: 3,
                pointHoverBackgroundColor: '#1d4ed8',
                pointHoverBorderColor: '#ffffff',
                pointHoverBorderWidth: 3,
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
            maintainAspectRatio: false,
            interaction: {
                intersect: false,
                mode: 'index'
            },
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    backgroundColor: 'rgba(0, 0, 0, 0.9)',
                    padding: 16,
                    titleFont: {
                        size: 16,
                        weight: 'bold'
                    },
                    bodyFont: {
                        size: 14
                    },
                    borderColor: '#2563eb',
                    borderWidth: 2,
                    cornerRadius: 12,
                    displayColors: false,
                    callbacks: {
                        title: function(context) {
                            return labels[context[0].dataIndex];
                        },
                        label: function(context) {
                            const value = context.parsed.y;
                            const promedio = (data.reduce((a, b) => a + b, 0) / data.length).toFixed(1);
                            const diferencia = (value - promedio).toFixed(1);
                            const porcentaje = ((value / promedio - 1) * 100).toFixed(1);
                            return [
                                `Consumo: ${value} kg`,
                                `Promedio semanal: ${promedio} kg`,
                                diferencia >= 0 ? `↑ +${diferencia} kg (+${porcentaje}%)` : `↓ ${diferencia} kg (${porcentaje}%)`
                            ];
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: false,
                    grid: {
                        color: 'rgba(0, 0, 0, 0.05)',
                        drawBorder: false
                    },
                    ticks: {
                        font: {
                            size: 12
                        },
                        callback: function(value) {
                            return value + ' kg';
                        }
                    }
                },
                x: {
                    grid: {
                        display: false
                    },
                    ticks: {
                        font: {
                            size: 12
                        }
                    }
                }
            },
            animation: {
                duration: 2000,
                easing: 'easeInOutQuart'
            }
        }
    });
}

function crearGrafico2() {
    const ctx = document.getElementById('chart2');
    if (!ctx || typeof Chart === 'undefined') return;
    
    const data = [35, 25, 20, 20];
    const labels = ['Carnes', 'Verduras', 'Granos', 'Otros'];
    const colors = ['#ef4444', '#10b981', '#f59e0b', '#6366f1'];
    const montos = [15230, 10850, 8650, 6920];
    const total = data.reduce((a, b) => a + b, 0);
    
    chartInstances.chart2 = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: labels,
            datasets: [{
                data: data,
                backgroundColor: colors,
                borderWidth: 4,
                borderColor: '#ffffff',
                hoverOffset: 20,
                hoverBorderWidth: 5
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            cutout: '60%',
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        padding: 20,
                        font: {
                            size: 13,
                            weight: '500'
                        },
                        usePointStyle: true,
                        pointStyle: 'circle'
                    }
                },
                tooltip: {
                    backgroundColor: 'rgba(0, 0, 0, 0.9)',
                    padding: 16,
                    titleFont: {
                        size: 16,
                        weight: 'bold'
                    },
                    bodyFont: {
                        size: 14
                    },
                    borderColor: function(context) {
                        return colors[context.dataIndex];
                    },
                    borderWidth: 2,
                    cornerRadius: 12,
                    callbacks: {
                        label: function(context) {
                            const index = context.dataIndex;
                            const porcentaje = ((data[index] / total) * 100).toFixed(1);
                            return [
                                `Porcentaje: ${porcentaje}%`,
                                `Monto: $${montos[index].toLocaleString()}`,
                                `Cantidad: ${data[index]} unidades`
                            ];
                        }
                    }
                }
            },
            animation: {
                animateRotate: true,
                animateScale: true,
                duration: 2000
            }
        }
    });
}

function crearGrafico3() {
    const ctx = document.getElementById('chart3');
    if (!ctx || typeof Chart === 'undefined') return;
    
    const charolas = [64, 69, 66, 72, 68];
    const labels = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie'];
    const merma = [12, 14, 13, 15, 14];
    
    chartInstances.chart3 = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Charolas',
                data: charolas,
                backgroundColor: '#10b981',
                borderRadius: 8,
                borderSkipped: false,
                barThickness: 45
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            interaction: {
                intersect: false,
                mode: 'index'
            },
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    backgroundColor: 'rgba(0, 0, 0, 0.9)',
                    padding: 16,
                    titleFont: {
                        size: 16,
                        weight: 'bold'
                    },
                    bodyFont: {
                        size: 14
                    },
                    borderColor: '#10b981',
                    borderWidth: 2,
                    cornerRadius: 12,
                    displayColors: false,
                    callbacks: {
                        title: function(context) {
                            return labels[context[0].dataIndex];
                        },
                        label: function(context) {
                            const index = context.dataIndex;
                            const promedio = (charolas.reduce((a, b) => a + b, 0) / charolas.length).toFixed(1);
                            const diferencia = (charolas[index] - promedio).toFixed(1);
                            return [
                                `📦 Producción: ${charolas[index]} charolas`,
                                `📊 Promedio semanal: ${promedio} charolas`,
                                diferencia >= 0 ? `↑ +${diferencia} charolas` : `↓ ${diferencia} charolas`,
                                `📉 Merma: ${merma[index]} kg`
                            ];
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        color: 'rgba(0, 0, 0, 0.05)',
                        drawBorder: false
                    },
                    ticks: {
                        font: {
                            size: 12
                        },
                        callback: function(value) {
                            return value + ' charolas';
                        }
                    }
                },
                x: {
                    grid: {
                        display: false
                    },
                    ticks: {
                        font: {
                            size: 12
                        }
                    }
                }
            },
            animation: {
                duration: 2000,
                easing: 'easeInOutBounce'
            }
        }
    });
}

function crearGrafico4() {
    const ctx = document.getElementById('chart4');
    if (!ctx || typeof Chart === 'undefined') return;
    
    const data = [450, 320, 280, 250, 200];
    const labels = ['Arroz', 'Frijoles', 'Pollo', 'Carne', 'Verduras'];
    const tendencias = ['↑', '↑', '→', '↓', '→'];
    
    chartInstances.chart4 = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Uso (kg)',
                data: data,
                backgroundColor: '#f59e0b',
                borderRadius: 6,
                borderSkipped: false,
                barThickness: 40
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            indexAxis: 'y',
            interaction: {
                intersect: false,
                mode: 'index'
            },
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    backgroundColor: 'rgba(0, 0, 0, 0.9)',
                    padding: 16,
                    titleFont: {
                        size: 16,
                        weight: 'bold'
                    },
                    bodyFont: {
                        size: 14
                    },
                    borderColor: '#f59e0b',
                    borderWidth: 2,
                    cornerRadius: 12,
                    displayColors: false,
                    callbacks: {
                        title: function(context) {
                            return labels[context[0].dataIndex];
                        },
                        label: function(context) {
                            const index = context.dataIndex;
                            return [
                                `📊 Uso total: ${data[index]} kg`,
                                `📈 Tendencia: ${tendencias[index]}`,
                                `💰 Valor estimado: $${(data[index] * 15).toLocaleString()}`
                            ];
                        }
                    }
                }
            },
            scales: {
                x: {
                    beginAtZero: true,
                    grid: {
                        color: 'rgba(0, 0, 0, 0.05)',
                        drawBorder: false
                    },
                    ticks: {
                        font: {
                            size: 12
                        },
                        callback: function(value) {
                            return value + ' kg';
                        }
                    }
                },
                y: {
                    grid: {
                        display: false
                    },
                    ticks: {
                        font: {
                            size: 12
                        }
                    }
                }
            },
            animation: {
                duration: 2000,
                easing: 'easeInOutQuart'
            }
        }
    });
}

function crearGrafico5() {
    const ctx = document.getElementById('chart5');
    if (!ctx || typeof Chart === 'undefined') return;
    
    const data = [4.2, 4.4, 4.5, 4.6];
    const labels = ['Semana 1', 'Semana 2', 'Semana 3', 'Semana 4'];
    const encuestas = [145, 152, 158, 165];
    
    chartInstances.chart5 = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Satisfacción',
                data: data,
                borderColor: '#8b5cf6',
                backgroundColor: 'rgba(139, 92, 246, 0.1)',
                borderWidth: 3,
                pointRadius: 0,
                pointHoverRadius: 8,
                pointBackgroundColor: '#8b5cf6',
                pointBorderColor: '#ffffff',
                pointBorderWidth: 3,
                pointHoverBackgroundColor: '#7c3aed',
                pointHoverBorderColor: '#ffffff',
                pointHoverBorderWidth: 3,
                tension: 0.4,
                fill: true
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            interaction: {
                intersect: false,
                mode: 'index'
            },
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    backgroundColor: 'rgba(0, 0, 0, 0.9)',
                    padding: 16,
                    titleFont: {
                        size: 16,
                        weight: 'bold'
                    },
                    bodyFont: {
                        size: 14
                    },
                    borderColor: '#8b5cf6',
                    borderWidth: 2,
                    cornerRadius: 12,
                    displayColors: false,
                    callbacks: {
                        title: function(context) {
                            return labels[context[0].dataIndex];
                        },
                        label: function(context) {
                            const index = context.dataIndex;
                            const cambio = index > 0 ? (data[index] - data[index - 1]).toFixed(1) : '0.0';
                            return [
                                `⭐ Calificación: ${data[index]}/5.0`,
                                `📝 Encuestas: ${encuestas[index]}`,
                                cambio >= 0 ? `↑ +${cambio} puntos` : `↓ ${cambio} puntos`
                            ];
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: false,
                    min: 3.5,
                    max: 5,
                    grid: {
                        color: 'rgba(0, 0, 0, 0.05)',
                        drawBorder: false
                    },
                    ticks: {
                        font: {
                            size: 12
                        },
                        stepSize: 0.2
                    }
                },
                x: {
                    grid: {
                        display: false
                    },
                    ticks: {
                        font: {
                            size: 12
                        }
                    }
                }
            },
            animation: {
                duration: 2000,
                easing: 'easeInOutQuart'
            }
        }
    });
}

function crearGrafico6() {
    const ctx = document.getElementById('chart6');
    if (!ctx || typeof Chart === 'undefined') return;
    
    const planificado = [50, 55, 52, 58, 54];
    const merma = [5, 6, 4, 7, 5];
    const labels = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'];
    
    chartInstances.chart6 = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Planificado',
                data: planificado,
                backgroundColor: '#3b82f6',
                borderRadius: 8,
                borderSkipped: false,
                barThickness: 35
            }, {
                label: 'Merma',
                data: merma,
                backgroundColor: '#ef4444',
                borderRadius: 8,
                borderSkipped: false,
                barThickness: 35
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            interaction: {
                intersect: false,
                mode: 'index'
            },
            plugins: {
                legend: {
                    display: true,
                    position: 'top',
                    labels: {
                        padding: 15,
                        font: {
                            size: 13,
                            weight: '500'
                        },
                        usePointStyle: true,
                        pointStyle: 'circle'
                    }
                },
                tooltip: {
                    backgroundColor: 'rgba(0, 0, 0, 0.9)',
                    padding: 16,
                    titleFont: {
                        size: 16,
                        weight: 'bold'
                    },
                    bodyFont: {
                        size: 14
                    },
                    borderWidth: 2,
                    cornerRadius: 12,
                    callbacks: {
                        title: function(context) {
                            return labels[context[0].dataIndex];
                        },
                        label: function(context) {
                            const index = context.dataIndex;
                            const datasetLabel = context.dataset.label;
                            const value = context.parsed.y;
                            
                            if (datasetLabel === 'Planificado') {
                                const eficiencia = ((1 - merma[index] / planificado[index]) * 100).toFixed(1);
                                return [
                                    `📋 ${datasetLabel}: ${value} kg`,
                                    `📊 Eficiencia: ${eficiencia}%`
                                ];
                            } else {
                                const porcentaje = ((merma[index] / planificado[index]) * 100).toFixed(1);
                                return [
                                    `⚠️ ${datasetLabel}: ${value} kg`,
                                    `📉 ${porcentaje}% del planificado`
                                ];
                            }
                        },
                        afterBody: function(context) {
                            const index = context[0].dataIndex;
                            const diferencia = planificado[index] - merma[index];
                            return [`✅ Neto: ${diferencia} kg`];
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        color: 'rgba(0, 0, 0, 0.05)',
                        drawBorder: false
                    },
                    ticks: {
                        font: {
                            size: 12
                        },
                        callback: function(value) {
                            return value + ' kg';
                        }
                    }
                },
                x: {
                    grid: {
                        display: false
                    },
                    ticks: {
                        font: {
                            size: 12
                        }
                    }
                }
            },
            animation: {
                duration: 2000,
                easing: 'easeInOutQuart'
            }
        }
    });
}

function crearGrafico7() {
    const ctx = document.getElementById('chart7');
    if (!ctx || typeof Chart === 'undefined') return;
    
    const recetas = ['Arroz con Frijoles', 'Pollo a la Plancha', 'Carne Asada', 'Ensalada Mixta', 'Sopa de Verduras', 'Pasta al Pesto'];
    const merma = [8.5, 12.3, 15.2, 5.8, 7.1, 9.4];
    const planificado = [120, 95, 80, 60, 45, 55];
    const porcentajes = merma.map((m, i) => ((m / planificado[i]) * 100).toFixed(1));
    const eficiencia = merma.map((m, i) => ((1 - m / planificado[i]) * 100).toFixed(1));
    
    chartInstances.chart7 = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: recetas,
            datasets: [{
                label: 'Merma (kg)',
                data: merma,
                backgroundColor: function(context) {
                    const index = context.dataIndex;
                    const porcentaje = parseFloat(porcentajes[index]);
                    if (porcentaje > 15) return '#ef4444';
                    if (porcentaje > 10) return '#f59e0b';
                    return '#10b981';
                },
                borderRadius: 8,
                borderSkipped: false,
                barThickness: 40
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            interaction: {
                intersect: false,
                mode: 'index'
            },
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    backgroundColor: 'rgba(0, 0, 0, 0.9)',
                    padding: 16,
                    titleFont: {
                        size: 16,
                        weight: 'bold'
                    },
                    bodyFont: {
                        size: 14
                    },
                    borderWidth: 2,
                    cornerRadius: 12,
                    displayColors: false,
                    callbacks: {
                        title: function(context) {
                            return recetas[context[0].dataIndex];
                        },
                        label: function(context) {
                            const index = context.dataIndex;
                            const porcentaje = porcentajes[index];
                            const efic = eficiencia[index];
                            const plan = planificado[index];
                            const mer = merma[index];
                            
                            let estado = '';
                            if (parseFloat(porcentaje) > 15) {
                                estado = '🔴 Crítico';
                            } else if (parseFloat(porcentaje) > 10) {
                                estado = '🟡 Atención';
                            } else {
                                estado = '🟢 Óptimo';
                            }
                            
                            return [
                                `📊 Merma: ${mer} kg`,
                                `📋 Planificado: ${plan} kg`,
                                `📉 Porcentaje: ${porcentaje}%`,
                                `✅ Eficiencia: ${efic}%`,
                                `🎯 Estado: ${estado}`
                            ];
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        color: 'rgba(0, 0, 0, 0.05)',
                        drawBorder: false
                    },
                    ticks: {
                        font: {
                            size: 12
                        },
                        callback: function(value) {
                            return value + ' kg';
                        }
                    }
                },
                x: {
                    grid: {
                        display: false
                    },
                    ticks: {
                        font: {
                            size: 11
                        },
                        maxRotation: 45,
                        minRotation: 45
                    }
                }
            },
            animation: {
                duration: 2000,
                easing: 'easeInOutQuart'
            }
        }
    });
}

function crearGrafico8() {
    const ctx = document.getElementById('chart8');
    if (!ctx || typeof Chart === 'undefined') return;
    
    // Datos de productos distribuidos en los 4 cuadrantes - MOCK DATA EXTENDIDO
    const productos = [
        // Cuadrante 1: Stock menor al inventario de seguridad (Stock < Reorden)
        { name: 'Frijoles', stock: 35, reorder: 50, usage: 45, category: 'Granos', cuadrante: 1 },
        { name: 'Lechuga', stock: 20, reorder: 30, usage: 25, category: 'Vegetales', cuadrante: 1 },
        { name: 'Cebolla', stock: 40, reorder: 50, usage: 55, category: 'Vegetales', cuadrante: 1 },
        { name: 'Zanahoria', stock: 25, reorder: 40, usage: 30, category: 'Vegetales', cuadrante: 1 },
        { name: 'Papa', stock: 45, reorder: 60, usage: 50, category: 'Vegetales', cuadrante: 1 },
        { name: 'Ajo', stock: 8, reorder: 15, usage: 5, category: 'Condimentos', cuadrante: 1 },
        
        // Cuadrante 2: Dentro de inventario de seguridad (Reorden <= Stock < Reorden*2)
        { name: 'Tomates', stock: 80, reorder: 60, usage: 35, category: 'Vegetales', cuadrante: 2 },
        { name: 'Aceite', stock: 120, reorder: 80, usage: 40, category: 'Condimentos', cuadrante: 2 },
        { name: 'Carne Res', stock: 140, reorder: 80, usage: 95, category: 'Carnes', cuadrante: 2 },
        { name: 'Pescado', stock: 90, reorder: 70, usage: 60, category: 'Carnes', cuadrante: 2 },
        { name: 'Queso', stock: 55, reorder: 40, usage: 25, category: 'Lácteos', cuadrante: 2 },
        { name: 'Leche', stock: 100, reorder: 80, usage: 45, category: 'Lácteos', cuadrante: 2 },
        { name: 'Huevos', stock: 180, reorder: 120, usage: 80, category: 'Proteínas', cuadrante: 2 },
        
        // Cuadrante 3: Inventario según menús planificados (Reorden*2 <= Stock < Reorden*3)
        { name: 'Pollo', stock: 250, reorder: 100, usage: 120, category: 'Carnes', cuadrante: 3 },
        { name: 'Pasta', stock: 220, reorder: 90, usage: 65, category: 'Granos', cuadrante: 3 },
        { name: 'Arroz', stock: 320, reorder: 150, usage: 85, category: 'Granos', cuadrante: 3 },
        { name: 'Lentejas', stock: 180, reorder: 80, usage: 55, category: 'Granos', cuadrante: 3 },
        { name: 'Harina', stock: 200, reorder: 100, usage: 50, category: 'Granos', cuadrante: 3 },
        { name: 'Azúcar', stock: 240, reorder: 120, usage: 20, category: 'Condimentos', cuadrante: 3 },
        
        // Cuadrante 4: Sobre stock (Stock >= Reorden*3)
        { name: 'Sal', stock: 380, reorder: 100, usage: 15, category: 'Condimentos', cuadrante: 4 },
        { name: 'Vinagre', stock: 200, reorder: 50, usage: 10, category: 'Condimentos', cuadrante: 4 },
        { name: 'Especias', stock: 150, reorder: 30, usage: 8, category: 'Condimentos', cuadrante: 4 },
        { name: 'Conservas', stock: 350, reorder: 80, usage: 25, category: 'Enlatados', cuadrante: 4 },
        { name: 'Aceite', stock: 280, reorder: 70, usage: 30, category: 'Condimentos', cuadrante: 4 },
        { name: 'Papas', stock: 420, reorder: 120, usage: 60, category: 'Vegetales', cuadrante: 4 },
        { name: 'Cebollas', stock: 250, reorder: 60, usage: 40, category: 'Vegetales', cuadrante: 4 }
    ];
    
    // Normalizar para mostrar todos los productos en una sola fila horizontal
    // Todos los productos tendrán el mismo valor de reorden en el eje Y para alinearlos
    const reordenNormalizado = 100; // Valor fijo para alinear todos en una fila
    productos.forEach(p => {
        p.reordenNormalizado = reordenNormalizado;
    });
    
    // Calcular valores máximos para los ejes
    const maxStock = Math.max(...productos.map(p => p.stock)) * 1.3;
    const maxReorder = reordenNormalizado * 1.5; // Rango fijo para mantener fila horizontal
    
    // Función para determinar el cuadrante
    function getCuadrante(stock, reorder) {
        // Validar que stock y reorder sean números válidos
        if (typeof stock !== 'number' || isNaN(stock) || typeof reorder !== 'number' || isNaN(reorder) || reorder <= 0) {
            return 3; // Valor por defecto (Óptimo)
        }
        if (stock < reorder) return 1; // Stock menor al inventario de seguridad
        if (stock < reorder * 2) return 2; // Dentro de inventario de seguridad
        if (stock < reorder * 3) return 3; // Inventario según menús planificados
        return 4; // Sobre stock
    }
    
    // Función para obtener color según cuadrante
    // Gama de colores: Rojo (crítico) -> Naranja -> Amarillo -> Verde -> Azul (sobre stock)
    function getColorByCuadrante(cuadrante, opacity = '80') {
        const colors = {
            1: '#ef4444', // Rojo - Stock menor al inventario de seguridad (CRÍTICO)
            2: '#f97316', // Naranja intenso - Dentro de inventario de seguridad (ATENCIÓN)
            3: '#22c55e', // Verde - Inventario según menús planificados (ÓPTIMO)
            4: '#3b82f6'  // Azul - Sobre stock (EXCELENTE)
        };
        // Validar que el cuadrante sea válido, si no, usar color por defecto (gris)
        const cuadranteValido = (cuadrante >= 1 && cuadrante <= 4) ? cuadrante : 3;
        const colorBase = colors[cuadranteValido] || '#22c55e';
        return colorBase + opacity;
    }
    
    chartInstances.chart8 = new Chart(ctx, {
        type: 'bubble',
        data: {
            datasets: productos.map((p) => {
                // Calcular cuadrante basado en relación stock/reorden original
                const cuadrante = getCuadrante(p.stock, p.reorder);
                // El tamaño de la burbuja representa el uso semanal (normalizado)
                const maxUsage = Math.max(...productos.map(pr => pr.usage));
                const radioBurbuja = Math.max((p.usage / maxUsage) * 35, 12); // Radio entre 12 y 35
                
                return {
                    label: p.name,
                    data: [{
                        x: p.stock,                    // Eje X: Stock Actual (distribuye horizontalmente)
                        y: p.reordenNormalizado,      // Eje Y: Reorden normalizado (todos en una fila)
                        r: radioBurbuja                // Radio: Uso semanal (proporcional)
                    }],
                    backgroundColor: getColorByCuadrante(cuadrante, '80'),
                    borderColor: getColorByCuadrante(cuadrante, 'FF'),
                    borderWidth: 2,
                    hoverBackgroundColor: getColorByCuadrante(cuadrante, 'CC'),
                    hoverBorderColor: getColorByCuadrante(cuadrante, 'FF'),
                    hoverBorderWidth: 3
                };
            })
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            layout: {
                padding: {
                    top: 30,
                    bottom: 30,
                    left: 30,
                    right: 30
                }
            },
            interaction: {
                intersect: false,
                mode: 'point'
            },
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    backgroundColor: 'rgba(0, 0, 0, 0.9)',
                    padding: 16,
                    titleFont: {
                        size: 16,
                        weight: 'bold'
                    },
                    bodyFont: {
                        size: 14
                    },
                    borderWidth: 2,
                    cornerRadius: 12,
                    displayColors: true,
                    callbacks: {
                        title: function(context) {
                            if (!context || context.length === 0 || !context[0]) return '';
                            const datasetIndex = context[0].datasetIndex;
                            if (datasetIndex === undefined || !productos[datasetIndex]) return '';
                            return productos[datasetIndex].name;
                        },
                        label: function(context) {
                            if (!context || context.length === 0 || !context[0]) return '';
                            const datasetIndex = context[0].datasetIndex;
                            if (datasetIndex === undefined || !productos[datasetIndex]) return '';
                            
                            const p = productos[datasetIndex];
                            const stock = p.stock;
                            const reorder = p.reorder;
                            const cuadrante = getCuadrante(stock, reorder);
                            const cuadranteNames = {
                                1: '🔴 Stock menor al inventario de seguridad',
                                2: '🟡 Dentro de inventario de seguridad',
                                3: '🟢 Inventario según menús planificados',
                                4: '🔵 Sobre stock'
                            };
                            
                            return [
                                `📦 Stock actual: ${stock.toFixed(1)} kg`,
                                `📋 Punto de reorden: ${reorder.toFixed(1)} kg`,
                                `📊 Ratio Stock/Reorden: ${((stock / reorder) * 100).toFixed(1)}%`,
                                `📈 Uso semanal: ${p.usage.toFixed(1)} kg`,
                                `⏱️ Días estimados: ${Math.floor(stock / (p.usage / 7))} días`,
                                `🏷️ Categoría: ${p.category}`,
                                `📍 Estado: ${cuadranteNames[cuadrante]}`,
                                cuadrante === 1 ? '⚠️ ⚠️ COMPRA URGENTE REQUERIDA ⚠️' : (cuadrante === 2 ? '🟡 Atención: Monitorear stock' : '')
                            ].filter(Boolean);
                        }
                    }
                }
            },
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Stock Actual (kg)',
                        font: {
                            size: 14,
                            weight: 'bold'
                        },
                        color: '#64748b'
                    },
                    min: 0,
                    max: maxStock,
                    grid: {
                        color: 'rgba(0, 0, 0, 0.05)',
                        drawBorder: true,
                        borderColor: '#e2e8f0',
                        lineWidth: 1
                    },
                    ticks: {
                        font: {
                            size: 12
                        },
                        callback: function(value) {
                            return value + ' kg';
                        }
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Punto de Reorden (kg)',
                        font: {
                            size: 14,
                            weight: 'bold'
                        },
                        color: '#64748b'
                    },
                    min: reordenNormalizado - 20,
                    max: reordenNormalizado + 20,
                    grid: {
                        color: 'rgba(0, 0, 0, 0.05)',
                        drawBorder: true,
                        borderColor: '#e2e8f0',
                        lineWidth: 1
                    },
                    ticks: {
                        font: {
                            size: 12
                        },
                        stepSize: 10,
                        callback: function(value) {
                            return value + ' kg';
                        }
                    }
                }
            },
            animation: {
                duration: 2000,
                easing: 'easeInOutQuart'
            },
            onResize: function(chart, size) {
                // Agregar etiquetas de cuadrantes después de que el gráfico se renderice
                setTimeout(() => {
                    agregarEtiquetasCuadrantes(chart, maxStock, maxReorder, reordenNormalizado);
                }, 100);
            }
        }
    });
    
    // Agregar etiquetas de cuadrantes después de la inicialización
    setTimeout(() => {
        agregarEtiquetasCuadrantes(chartInstances.chart8, maxStock, maxReorder, reordenNormalizado);
    }, 500);
}

function agregarEtiquetasCuadrantes(chart, maxStock, maxReorder, reordenNormalizado) {
    if (!chart || !chart.canvas) return;
    
    const canvas = chart.canvas;
    const ctx = canvas.getContext('2d');
    const chartArea = chart.chartArea;
    
    // Verificar que chartArea existe
    if (!chartArea) return;
    
    // Limpiar etiquetas anteriores
    const existingLabels = canvas.parentElement.querySelectorAll('.cuadrante-label');
    existingLabels.forEach(label => label.remove());
    
    // Crear contenedor para etiquetas si no existe
    let labelContainer = canvas.parentElement.querySelector('.cuadrante-labels-container');
    if (!labelContainer) {
        labelContainer = document.createElement('div');
        labelContainer.className = 'cuadrante-labels-container';
        labelContainer.style.position = 'absolute';
        labelContainer.style.top = '0';
        labelContainer.style.left = '0';
        labelContainer.style.width = '100%';
        labelContainer.style.height = '100%';
        labelContainer.style.pointerEvents = 'none';
        canvas.parentElement.style.position = 'relative';
        canvas.parentElement.appendChild(labelContainer);
    }
    
    // Calcular posiciones de cuadrantes para una sola fila horizontal
    // Las etiquetas se posicionan dentro del área del gráfico, en la parte superior
    
    // Calcular posiciones basadas en el área real del gráfico
    const chartWidth = chartArea.right - chartArea.left;
    const chartHeight = chartArea.top; // Altura disponible arriba del gráfico
    
    const labels = [
        {
            text: '1. Stock menor al inventario de seguridad',
            xPercent: 12.5, // 12.5% del ancho del gráfico
            color: '#ef4444',
            bg: 'rgba(239, 68, 68, 0.15)',
            border: 'rgba(239, 68, 68, 0.4)'
        },
        {
            text: '2. Dentro de inventario de seguridad',
            xPercent: 37.5, // 37.5% del ancho del gráfico
            color: '#f97316',
            bg: 'rgba(249, 115, 22, 0.15)',
            border: 'rgba(249, 115, 22, 0.4)'
        },
        {
            text: '3. Inventario según menús planificados',
            xPercent: 62.5, // 62.5% del ancho del gráfico
            color: '#22c55e',
            bg: 'rgba(34, 197, 94, 0.15)',
            border: 'rgba(34, 197, 94, 0.4)'
        },
        {
            text: '4. Sobre stock',
            xPercent: 87.5, // 87.5% del ancho del gráfico
            color: '#3b82f6',
            bg: 'rgba(59, 130, 246, 0.15)',
            border: 'rgba(59, 130, 246, 0.4)'
        }
    ];
    
    labels.forEach(label => {
        const labelEl = document.createElement('div');
        labelEl.className = 'cuadrante-label';
        labelEl.textContent = label.text;
        labelEl.style.position = 'absolute';
        labelEl.style.padding = '0.4rem 0.8rem';
        labelEl.style.borderRadius = '8px';
        labelEl.style.fontSize = '0.75rem';
        labelEl.style.fontWeight = '600';
        labelEl.style.color = label.color;
        labelEl.style.background = label.bg;
        labelEl.style.border = `2px solid ${label.border}`;
        labelEl.style.pointerEvents = 'none';
        labelEl.style.zIndex = '10';
        labelEl.style.whiteSpace = 'nowrap';
        labelEl.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
        
        // Posicionar dentro del área del gráfico, en la parte superior
        // Asegurar que las etiquetas estén dentro del contenedor
        const leftPosition = chartArea.left + (chartWidth * label.xPercent / 100);
        const topPosition = Math.max(10, chartArea.top - 30); // Asegurar mínimo 10px desde arriba
        
        // Verificar que no se salga del contenedor
        const containerRect = canvas.parentElement.getBoundingClientRect();
        const labelWidth = labelEl.offsetWidth || 200; // Ancho estimado
        const labelHeight = labelEl.offsetHeight || 30; // Alto estimado
        
        // Ajustar posición si se sale por la izquierda
        const adjustedLeft = Math.max(labelWidth / 2, Math.min(leftPosition, containerRect.width - labelWidth / 2));
        
        labelEl.style.left = adjustedLeft + 'px';
        labelEl.style.top = topPosition + 'px';
        labelEl.style.transform = 'translate(-50%, -100%)'; // Centrar horizontalmente, arriba del punto
        
        labelContainer.appendChild(labelEl);
    });
}

// Gráfico 9: Costos Variables por Tipo de Comida (Desayuno, Almuerzo, Cena)
function crearGrafico9() {
    const ctx = document.getElementById('chart9');
    if (!ctx || typeof Chart === 'undefined') return;
    
    if (chartInstances.chart9) {
        chartInstances.chart9.destroy();
    }
    
    // Datos mock de costos por tipo de comida
    const tiposComida = ['Desayuno', 'Almuerzo', 'Cena'];
    
    // Costos promedio por tipo de comida (últimos 7 días)
    const costosPromedio = [
        45.50,  // Desayuno: $45.50
        78.30,  // Almuerzo: $78.30
        65.20   // Cena: $65.20
    ];
    
    // Costos ideales por tipo de comida
    const costosIdeales = [
        42.00,  // Desayuno ideal
        75.00,  // Almuerzo ideal
        62.00   // Cena ideal
    ];
    
    // Calcular desviaciones porcentuales
    const desviaciones = costosPromedio.map((costo, index) => {
        const ideal = costosIdeales[index];
        return ((costo - ideal) / ideal) * 100;
    });
    
    chartInstances.chart9 = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: tiposComida,
            datasets: [
                {
                    label: 'Costo Promedio',
                    data: costosPromedio,
                    backgroundColor: ['#3b82f6', '#2563eb', '#1d4ed8'],
                    borderColor: ['#2563eb', '#1d4ed8', '#1e40af'],
                    borderWidth: 2,
                    borderRadius: 6,
                    barThickness: 40
                },
                {
                    label: 'Costo Ideal',
                    data: costosIdeales,
                    backgroundColor: ['#22c55e', '#16a34a', '#15803d'],
                    borderColor: ['#16a34a', '#15803d', '#166534'],
                    borderWidth: 2,
                    borderRadius: 6,
                    barThickness: 40
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'top',
                    labels: {
                        usePointStyle: true,
                        padding: 15,
                        font: {
                            size: 12,
                            weight: '500'
                        }
                    }
                },
                tooltip: {
                    backgroundColor: 'rgba(0, 0, 0, 0.9)',
                    padding: 12,
                    titleFont: {
                        size: 14,
                        weight: '600'
                    },
                    bodyFont: {
                        size: 13
                    },
                    callbacks: {
                        label: (context) => {
                            const datasetLabel = context.dataset.label;
                            const value = context.parsed.y;
                            const index = context.dataIndex;
                            
                            if (datasetLabel === 'Costo Promedio') {
                                const desviacion = desviaciones[index];
                                const desviacionColor = Math.abs(desviacion) > 10 ? '🔴' : Math.abs(desviacion) > 5 ? '🟠' : '🟢';
                                return `${datasetLabel}: $${value.toFixed(2)} | Desviación: ${desviacionColor} ${desviacion >= 0 ? '+' : ''}${desviacion.toFixed(1)}%`;
                            }
                            return `${datasetLabel}: $${value.toFixed(2)}`;
                        },
                        afterLabel: (context) => {
                            const index = context.dataIndex;
                            const desviacion = desviaciones[index];
                            const tipoComida = tiposComida[index];
                            
                            if (context.datasetIndex === 0) {
                                let mensaje = '';
                                if (Math.abs(desviacion) > 10) {
                                    mensaje = `⚠️ ${tipoComida} está ${desviacion > 0 ? 'por encima' : 'por debajo'} del ideal en más del 10%`;
                                } else if (Math.abs(desviacion) > 5) {
                                    mensaje = `⚡ ${tipoComida} tiene una desviación moderada del ${Math.abs(desviacion).toFixed(1)}%`;
                                } else {
                                    mensaje = `✅ ${tipoComida} está dentro del rango ideal`;
                                }
                                return mensaje;
                            }
                            return '';
                        }
                    },
                    displayColors: true,
                    boxPadding: 6
                }
            },
            scales: {
                y: {
                    beginAtZero: false,
                    ticks: {
                        callback: (value) => '$' + value.toFixed(0),
                        font: {
                            size: 11
                        },
                        padding: 8
                    },
                    grid: {
                        color: 'rgba(0, 0, 0, 0.05)',
                        drawBorder: false
                    },
                    title: {
                        display: true,
                        text: 'Costo ($)',
                        font: {
                            size: 12,
                            weight: '600'
                        },
                        padding: {
                            bottom: 10
                        }
                    }
                },
                x: {
                    ticks: {
                        font: {
                            size: 12,
                            weight: '500'
                        },
                        padding: 10
                    },
                    grid: {
                        display: false
                    }
                }
            },
            interaction: {
                intersect: false,
                mode: 'index'
            },
            animation: {
                duration: 1000,
                easing: 'easeInOutQuart'
            }
        }
    });
}

// Compras - OCR y KARDEX
const comprasData = {
    facturas: [],
    ordenesCompra: [], // Órdenes de compra con estado de verificación
    kardex: []
};

const consumosPromedio = {
    'Arroz Premium': 85,
    'Frijoles Negros': 45,
    'Pollo Entero': 120,
    'Carne Res': 95,
    'Tomates': 35,
    'Lechuga': 25,
    'Aceite': 40,
    'Sal': 15,
    'Pasta': 65,
    'Cebolla': 55
};

function mostrarSimuladorOCR() {
    document.getElementById('simuladorOCR').style.display = 'flex';
    // Generar fecha aleatoria reciente
    const fecha = new Date();
    fecha.setDate(fecha.getDate() - Math.floor(Math.random() * 7));
    document.getElementById('fechaFactura').textContent = fecha.toLocaleDateString('es-ES');
}

// Exponer funciones de OCR después de su declaración
if (typeof window !== 'undefined') {
    window.mostrarSimuladorOCR = mostrarSimuladorOCR;
}

function cerrarSimuladorOCR() {
    document.getElementById('simuladorOCR').style.display = 'none';
}

// Exponer cerrarSimuladorOCR después de su declaración
if (typeof window !== 'undefined') {
    window.cerrarSimuladorOCR = cerrarSimuladorOCR;
}

function procesarFacturaOCR() {
    ToastNotification.show('Procesando factura con OCR...', 'info', 2000);
    setTimeout(() => {
        cerrarSimuladorOCR();
        document.getElementById('formularioDigitalizacion').style.display = 'flex';
        // Pre-llenar formulario con datos de la factura mock
        const fecha = new Date();
        fecha.setDate(fecha.getDate() - Math.floor(Math.random() * 7));
        document.getElementById('fechaFacturaInput').value = fecha.toISOString().split('T')[0];
        ToastNotification.show('Factura procesada. Verifica y completa los datos.', 'success', 3000);
    }, 1500);
}

// Exponer procesarFacturaOCR después de su declaración
if (typeof window !== 'undefined') {
    window.procesarFacturaOCR = procesarFacturaOCR;
}

function cerrarFormularioDigitalizacion() {
    document.getElementById('formularioDigitalizacion').style.display = 'none';
}

// Exponer cerrarFormularioDigitalizacion después de su declaración
if (typeof window !== 'undefined') {
    window.cerrarFormularioDigitalizacion = cerrarFormularioDigitalizacion;
}

function agregarProducto() {
    const productosList = document.getElementById('productosList');
    const nuevoProducto = document.createElement('div');
    nuevoProducto.className = 'producto-item';
    nuevoProducto.innerHTML = `
        <input type="text" placeholder="Producto" required>
        <input type="number" placeholder="Cantidad" step="0.01" required>
        <select required>
            <option value="kg">kg</option>
            <option value="g">g</option>
            <option value="L">L</option>
            <option value="unidad">unidad</option>
        </select>
        <input type="number" placeholder="Precio Unit." step="0.01" required>
        <button type="button" class="btn-remove" onclick="this.parentElement.remove()">×</button>
    `;
    productosList.appendChild(nuevoProducto);
}

// Exponer agregarProducto después de su declaración
if (typeof window !== 'undefined') {
    window.agregarProducto = agregarProducto;
}

function guardarFactura(event) {
    event.preventDefault();
    
    const proveedor = document.getElementById('proveedor').value;
    const fechaFactura = document.getElementById('fechaFacturaInput').value;
    const numeroFactura = document.getElementById('numeroFactura').value;
    
    const productos = [];
    const productosItems = document.querySelectorAll('#productosList .producto-item');
    let total = 0;
    
    productosItems.forEach(item => {
        const inputs = item.querySelectorAll('input, select');
        const producto = inputs[0].value;
        const cantidad = parseFloat(inputs[1].value);
        const unidad = inputs[2].value;
        const precioUnit = parseFloat(inputs[3].value);
        const subtotal = cantidad * precioUnit;
        total += subtotal;
        
        productos.push({
            producto,
            cantidad,
            unidad,
            precioUnit,
            subtotal
        });
    });
    
    // Crear orden de compra
    const ordenCompra = {
        id: Date.now(),
        numeroOrden: 'OC-' + Date.now(),
        proveedor,
        fechaFactura,
        numeroFactura,
        productos,
        total,
        fechaRegistro: new Date().toISOString(),
        estado: 'pendiente_verificacion', // pendiente_verificacion, aprobada, rechazada
        verificacionCalidad: null
    };
    
    // Guardar factura (compatibilidad)
    const factura = {
        id: ordenCompra.id,
        proveedor,
        fechaFactura,
        numeroFactura,
        productos,
        total,
        fechaRegistro: new Date().toISOString(),
        ordenCompra: ordenCompra.numeroOrden
    };
    
    comprasData.facturas.push(factura);
    
    // Guardar orden de compra
    if (!comprasData.ordenesCompra) {
        comprasData.ordenesCompra = [];
    }
    comprasData.ordenesCompra.push(ordenCompra);
    
    // Actualizar KARDEX
    productos.forEach(prod => {
        actualizarKardex(prod.producto, prod.cantidad, fechaFactura);
    });
    
    // Guardar en memoria temporal
    guardarComprasEnMemoria();
    
    ToastNotification.show('Factura guardada correctamente', 'success', 2000);
    cerrarFormularioDigitalizacion();
    
    // Actualizar KARDEX inmediatamente (ya es permanente)
    mostrarDashboardKardex();
    cargarListaCompras();
}

// Exponer guardarFactura después de su declaración
if (typeof window !== 'undefined') {
    window.guardarFactura = guardarFactura;
}

function actualizarKardex(producto, cantidadIngreso, fecha) {
    // Buscar último saldo del producto
    const movimientosProducto = comprasData.kardex.filter(k => k.producto === producto);
    const ultimoMovimiento = movimientosProducto.length > 0 
        ? movimientosProducto[movimientosProducto.length - 1] 
        : null;
    
    const saldoInicial = ultimoMovimiento ? ultimoMovimiento.saldoFinal : 0;
    const saldoFinal = saldoInicial + cantidadIngreso;
    
    // Calcular consumo promedio diario
    const consumoPromedio = consumosPromedio[producto] || 50;
    
    // Calcular días estimados
    const diasEstimados = Math.floor(saldoFinal / consumoPromedio);
    
    const movimiento = {
        id: Date.now() + Math.random(),
        fecha,
        producto,
        saldoInicial,
        ingreso: cantidadIngreso,
        salida: 0,
        saldoFinal,
        consumoPromedio,
        diasEstimados,
        estado: diasEstimados > 30 ? '🟢 Óptimo' : (diasEstimados > 15 ? '🟡 Atención' : '🔴 Crítico')
    };
    
    comprasData.kardex.push(movimiento);
}

function mostrarDashboardKardex() {
    // El KARDEX ahora es permanente, solo recargar datos
    cargarKardex();
    cargarProductosEnFiltro();
}

// Exponer funciones de KARDEX después de su declaración
if (typeof window !== 'undefined') {
    window.mostrarDashboardKardex = mostrarDashboardKardex;
}

function cerrarDashboardKardex() {
    // Función mantenida por compatibilidad, pero ya no cierra el KARDEX
    // El KARDEX es permanente ahora
}

// Exponer cerrarDashboardKardex después de su declaración
if (typeof window !== 'undefined') {
    window.cerrarDashboardKardex = cerrarDashboardKardex;
}

function cargarKardex() {
    const tbody = document.getElementById('kardexBody');
    const filtro = document.getElementById('filtroProducto').value;
    
    let kardexFiltrado = comprasData.kardex;
    if (filtro) {
        kardexFiltrado = comprasData.kardex.filter(k => k.producto === filtro);
    }
    
    // Ordenar por fecha descendente
    kardexFiltrado.sort((a, b) => new Date(b.fecha) - new Date(a.fecha));
    
    if (kardexFiltrado.length === 0) {
        tbody.innerHTML = '<tr><td colspan="9" style="text-align: center; padding: 2rem;">No hay movimientos registrados</td></tr>';
        return;
    }
    
    tbody.innerHTML = kardexFiltrado.map(mov => {
        // Determinar clases CSS según estado
        const estadoClase = mov.diasEstimados > 30 ? 'estado-optimo' : (mov.diasEstimados > 15 ? 'estado-atencion' : 'estado-critico');
        const diasClase = mov.diasEstimados > 30 ? 'dias-optimo' : (mov.diasEstimados > 15 ? 'dias-atencion' : 'dias-critico');
        
        return `
        <tr>
            <td>${new Date(mov.fecha).toLocaleDateString('es-ES')}</td>
            <td><strong>${mov.producto}</strong></td>
            <td>${mov.saldoInicial.toFixed(2)} kg</td>
            <td class="ingreso">+${mov.ingreso.toFixed(2)} kg</td>
            <td class="salida">${mov.salida > 0 ? '-' + mov.salida.toFixed(2) : '0.00'} kg</td>
            <td class="saldo-final"><strong>${mov.saldoFinal.toFixed(2)} kg</strong></td>
            <td>${mov.consumoPromedio.toFixed(2)} kg/día</td>
            <td class="${diasClase}">
                <strong>${mov.diasEstimados} días</strong>
            </td>
            <td class="${estadoClase}">${mov.estado || (mov.diasEstimados > 30 ? '🟢 Óptimo' : (mov.diasEstimados > 15 ? '🟡 Atención' : '🔴 Crítico'))}</td>
        </tr>
        `;
    }).join('');
}

function cargarProductosEnFiltro() {
    const select = document.getElementById('filtroProducto');
    const productos = [...new Set(comprasData.kardex.map(k => k.producto))];
    
    select.innerHTML = '<option value="">Todos los productos</option>' +
        productos.map(p => `<option value="${p}">${p}</option>`).join('');
}

function filtrarKardex() {
    cargarKardex();
}

// Exponer filtrarKardex después de su declaración
if (typeof window !== 'undefined') {
    window.filtrarKardex = filtrarKardex;
}

// Generar datos mock iniciales del KARDEX con diferentes estados
function generarDatosMockKardex() {
    // Si ya hay datos en el KARDEX, no generar más
    if (comprasData.kardex.length > 0) {
        return;
    }
    
    const productos = ['Arroz Premium', 'Frijoles Negros', 'Pollo Entero', 'Carne Res', 'Tomates', 'Lechuga', 'Aceite', 'Sal', 'Pasta', 'Cebolla'];
    const hoy = new Date();
    
    // Generar movimientos para los últimos 10 días con diferentes estados
    productos.forEach((producto, index) => {
        const consumoPromedio = consumosPromedio[producto] || (50 + index * 10);
        
        // Generar 2-3 movimientos por producto con diferentes estados
        const numMovimientos = Math.floor(Math.random() * 2) + 2;
        
        let saldoInicial = 0;
        
        for (let i = 0; i < numMovimientos; i++) {
            const fecha = new Date(hoy);
            fecha.setDate(fecha.getDate() - (Math.floor(Math.random() * 10) + i * 2));
            
            // Variar las cantidades para generar diferentes estados
            let cantidadIngreso = 0;
            let cantidadSalida = 0;
            
            if (i === 0) {
                // Primer movimiento: ingreso grande para estado óptimo
                cantidadIngreso = consumoPromedio * (35 + Math.random() * 10); // 35-45 días
                cantidadSalida = 0;
            } else if (i === 1) {
                // Segundo movimiento: ingreso medio para estado atención
                cantidadIngreso = consumoPromedio * (20 + Math.random() * 5); // 20-25 días
                cantidadSalida = consumoPromedio * (5 + Math.random() * 3); // Consumo de 5-8 días
            } else {
                // Tercer movimiento: ingreso pequeño para estado crítico
                cantidadIngreso = consumoPromedio * (5 + Math.random() * 5); // 5-10 días
                cantidadSalida = consumoPromedio * (2 + Math.random() * 2); // Consumo de 2-4 días
            }
            
            const saldoFinal = saldoInicial + cantidadIngreso - cantidadSalida;
            const diasEstimados = Math.floor(saldoFinal / consumoPromedio);
            
            // Determinar estado basado en días estimados
            let estado;
            let estadoClase;
            if (diasEstimados > 30) {
                estado = '🟢 Óptimo';
                estadoClase = 'estado-optimo';
            } else if (diasEstimados > 15) {
                estado = '🟡 Atención';
                estadoClase = 'estado-atencion';
            } else {
                estado = '🔴 Crítico';
                estadoClase = 'estado-critico';
            }
            
            const movimiento = {
                id: Date.now() + Math.random() + index * 1000 + i,
                fecha: fecha.toISOString().split('T')[0],
                producto,
                saldoInicial: parseFloat(saldoInicial.toFixed(2)),
                ingreso: parseFloat(cantidadIngreso.toFixed(2)),
                salida: parseFloat(cantidadSalida.toFixed(2)),
                saldoFinal: parseFloat(saldoFinal.toFixed(2)),
                consumoPromedio: parseFloat(consumoPromedio.toFixed(2)),
                diasEstimados,
                estado,
                estadoClase
            };
            
            comprasData.kardex.push(movimiento);
            saldoInicial = saldoFinal;
        }
    });
    
    // Ordenar por fecha descendente
    comprasData.kardex.sort((a, b) => new Date(b.fecha) - new Date(a.fecha));
    
    // Guardar en memoria
    guardarComprasEnMemoria();
    
    console.log(`📊 Generados ${comprasData.kardex.length} movimientos mock del KARDEX con diferentes estados`);
}

// Inicializar módulo de compras
function inicializarModuloCompras() {
    console.log('🛒 Inicializando módulo de compras...');
    
    // Recuperar datos desde memoria
    recuperarComprasDeMemoria();
    
    // Generar datos mock del KARDEX si no hay datos
    generarDatosMockKardex();
    
    // Cargar lista de compras
    cargarListaCompras();
    
    // Mostrar KARDEX (permanente)
    mostrarDashboardKardex();
    
    // Verificar lista de compras pendiente desde planificación
    verificarListaComprasPendiente();
}

// Exponer inicializarModuloCompras
if (typeof window !== 'undefined') {
    window.inicializarModuloCompras = inicializarModuloCompras;
}

function cargarListaCompras() {
    const lista = document.getElementById('listaCompras');
    
    if (comprasData.facturas.length === 0) {
        lista.innerHTML = '<p style="text-align: center; padding: 2rem; color: var(--text-secondary);">No hay compras registradas. Usa el simulador OCR para agregar una factura.</p>';
        return;
    }
    
    lista.innerHTML = comprasData.facturas.map(factura => `
        <div class="compra-card">
            <div class="compra-header">
                <div>
                    <h3>${factura.proveedor}</h3>
                    <p>Factura: ${factura.numeroFactura} | ${new Date(factura.fechaFactura).toLocaleDateString('es-ES')}</p>
                </div>
                <div class="compra-total">
                    <strong>$${factura.total.toLocaleString('es-ES', {minimumFractionDigits: 2})}</strong>
                </div>
            </div>
            <div class="compra-productos">
                <strong>Productos:</strong>
                <ul>
                    ${factura.productos.map(p => `
                        <li>${p.producto}: ${p.cantidad} ${p.unidad} × $${p.precioUnit.toFixed(2)} = $${p.subtotal.toFixed(2)}</li>
                    `).join('')}
                </ul>
            </div>
        </div>
    `).join('');
}

// Inicializar lista de compras al cargar
window.addEventListener('DOMContentLoaded', function() {
    if (document.getElementById('compras')) {
        cargarListaCompras();
    }
});

// ============================================
// MÓDULO DE NOTIFICACIONES MEJORADO
// ============================================

// Estructura de datos de notificaciones
const notificacionesData = {
    notificaciones: []
};

// Generar datos mock de notificaciones
function generarDatosMockNotificaciones() {
    const hoy = new Date();
    
    notificacionesData.notificaciones = [
        {
            id: 'notif-1',
            categoria: 'urgente',
            tipo: 'inventario',
            titulo: 'Inventario Crítico - Frijoles',
            descripcion: 'El inventario de Frijoles ha alcanzado el nivel mínimo crítico.',
            detalle: {
                producto: 'Frijoles',
                stockActual: 8,
                stockMinimo: 10,
                unidad: 'kg',
                diferencia: -2
            },
            icono: 'inventario',
            tiempo: 'Hace 15 minutos',
            fecha: new Date(hoy.getTime() - 15 * 60000),
            leida: false,
            accion: { texto: 'Gestionar Compra', tipo: 'inventario-frijoles' }
        },
        {
            id: 'notif-2',
            categoria: 'urgente',
            tipo: 'inventario',
            titulo: 'Inventario Crítico - Lechuga',
            descripcion: 'El inventario de Lechuga está por debajo del nivel de seguridad.',
            detalle: {
                producto: 'Lechuga',
                stockActual: 12,
                stockMinimo: 15,
                unidad: 'kg',
                diferencia: -3
            },
            icono: 'inventario',
            tiempo: 'Hace 45 minutos',
            fecha: new Date(hoy.getTime() - 45 * 60000),
            leida: false,
            accion: { texto: 'Gestionar Compra', tipo: 'inventario-lechuga' }
        },
        {
            id: 'notif-3',
            categoria: 'desviacion',
            tipo: 'consumo',
            titulo: 'Desviación de Consumo - Arroz',
            descripcion: 'Consumo superior al planificado en más del 15%.',
            detalle: {
                producto: 'Arroz',
                consumoReal: 520,
                consumoPlanificado: 450,
                diferencia: 70,
                porcentaje: 15.6,
                unidad: 'kg'
            },
            icono: 'grafico',
            tiempo: 'Hace 2 horas',
            fecha: new Date(hoy.getTime() - 2 * 3600000),
            leida: false,
            accion: { texto: 'Ver Detalle', tipo: 'consumo-arroz' }
        },
        {
            id: 'notif-4',
            categoria: 'desviacion',
            tipo: 'costo',
            titulo: 'Desviación de Costos - Almuerzo',
            descripcion: 'Los costos del almuerzo están 8.3% por encima del ideal.',
            detalle: {
                tipoComida: 'Almuerzo',
                costoReal: 78.30,
                costoIdeal: 75.00,
                diferencia: 3.30,
                porcentaje: 8.3
            },
            icono: 'dinero',
            tiempo: 'Hace 3 horas',
            fecha: new Date(hoy.getTime() - 3 * 3600000),
            leida: false,
            accion: { texto: 'Revisar Costos', tipo: 'costos-almuerzo' }
        },
        {
            id: 'notif-5',
            categoria: 'desviacion',
            tipo: 'merma',
            titulo: 'Merma Elevada - Pollo Asado',
            descripcion: 'La merma del pollo asado está 12% por encima del objetivo.',
            detalle: {
                receta: 'Pollo Asado',
                mermaReal: 14.2,
                mermaObjetivo: 10.0,
                diferencia: 4.2,
                porcentaje: 12.0
            },
            icono: 'alerta',
            tiempo: 'Hace 4 horas',
            fecha: new Date(hoy.getTime() - 4 * 3600000),
            leida: false,
            accion: { texto: 'Ver Receta', tipo: 'merma-pollo' }
        },
        {
            id: 'notif-6',
            categoria: 'novedad',
            tipo: 'compra',
            titulo: 'Nuevo Pedido de Compra Generado',
            descripcion: 'Se ha generado automáticamente un pedido de compra basado en diferencias de inventario.',
            detalle: {
                cantidadProductos: 5,
                totalEstimado: 12450,
                prioridad: 'Alta'
            },
            icono: 'compra',
            tiempo: 'Hace 6 horas',
            fecha: new Date(hoy.getTime() - 6 * 3600000),
            leida: false,
            accion: { texto: 'Revisar Pedidos', tipo: 'pedidos-pendientes' }
        },
        {
            id: 'notif-7',
            categoria: 'novedad',
            tipo: 'satisfaccion',
            titulo: 'Nuevas Respuestas de Encuesta',
            descripcion: 'Se han recibido nuevas respuestas a la encuesta de satisfacción.',
            detalle: {
                nuevasRespuestas: 12,
                calificacionPromedio: 4.7,
                tendencia: 'positiva'
            },
            icono: 'estrella',
            tiempo: 'Hace 1 día',
            fecha: new Date(hoy.getTime() - 24 * 3600000),
            leida: false,
            accion: { texto: 'Ver Resultados', tipo: 'encuestas-nuevas' }
        },
        {
            id: 'notif-8',
            categoria: 'informativa',
            tipo: 'planificacion',
            titulo: 'Menú del Día Pendiente',
            descripcion: 'El menú para mañana aún no ha sido planificado.',
            detalle: {
                fecha: 'Mañana',
                horaRecomendada: '18:00'
            },
            icono: 'calendario',
            tiempo: 'Hace 4 horas',
            fecha: new Date(hoy.getTime() - 4 * 3600000),
            leida: false,
            accion: { texto: 'Planificar Menú', tipo: 'menu-pendiente' }
        },
        {
            id: 'notif-9',
            categoria: 'informativa',
            tipo: 'sistema',
            titulo: 'Actualización de Datos Completada',
            descripcion: 'Los costos variables han sido actualizados correctamente desde las facturas.',
            detalle: {
                facturasProcesadas: 8,
                recetasActualizadas: 12
            },
            icono: 'sistema',
            tiempo: 'Hace 8 horas',
            fecha: new Date(hoy.getTime() - 8 * 3600000),
            leida: false,
            accion: { texto: 'Ver Costos', tipo: 'costos-actualizados' }
        },
        {
            id: 'notif-10',
            categoria: 'desviacion',
            tipo: 'consumo',
            titulo: 'Desviación de Consumo - Pollo',
            descripcion: 'Consumo de pollo 22% por encima de lo planificado.',
            detalle: {
                producto: 'Pollo',
                consumoReal: 122,
                consumoPlanificado: 100,
                diferencia: 22,
                porcentaje: 22.0,
                unidad: 'kg'
            },
            icono: 'grafico',
            tiempo: 'Hace 1 día',
            fecha: new Date(hoy.getTime() - 24 * 3600000),
            leida: false,
            accion: { texto: 'Ver Detalle', tipo: 'consumo-pollo' }
        }
    ];
}

// Obtener icono SVG por tipo
function obtenerIconoNotificacion(tipo) {
    const iconos = {
        inventario: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" stroke-width="2"/>
            <path d="M9 9H15M9 12H15M9 15H12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
        </svg>`,
        grafico: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 3V21H21" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M7 16L12 11L16 15L21 10" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M21 10V3H14" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>`,
        dinero: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2V22M17 5H9.5C8.57174 5 7.6815 5.36875 7.02513 6.02513C6.36875 6.6815 6 7.57174 6 8.5C6 9.42826 6.36875 10.3185 7.02513 10.9749C7.6815 11.6313 8.57174 12 9.5 12H14.5C15.4283 12 16.3185 12.3687 16.9749 13.0251C17.6313 13.6815 18 14.5717 18 15.5C18 16.4283 17.6313 17.3185 16.9749 17.9749C16.3185 18.6313 15.4283 19 14.5 19H6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>`,
        alerta: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10.29 3.86L1.82 18C1.64534 18.3024 1.55299 18.6453 1.55201 18.9945C1.55103 19.3437 1.64151 19.6871 1.81445 19.9905C1.98738 20.2939 2.23675 20.5467 2.53773 20.7238C2.83871 20.9009 3.18082 20.9962 3.53 21H20.47C20.8192 20.9962 21.1613 20.9009 21.4623 20.7238C21.7633 20.5467 22.0126 20.2939 22.1856 19.9905C22.3585 19.6871 22.449 19.3437 22.448 18.9945C22.447 18.6453 22.3547 18.3024 22.18 18L13.71 3.86C13.5322 3.56611 13.2807 3.32312 12.9812 3.15447C12.6817 2.98581 12.3438 2.89725 12 2.89725C11.6562 2.89725 11.3183 2.98581 11.0188 3.15447C10.7193 3.32312 10.4678 3.56611 10.29 3.86Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M12 9V13M12 17H12.01" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>`,
        compra: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9 22C9.55228 22 10 21.5523 10 21C10 20.4477 9.55228 20 9 20C8.44772 20 8 20.4477 8 21C8 21.5523 8.44772 22 9 22Z" fill="currentColor"/>
            <path d="M20 22C20.5523 22 21 21.5523 21 21C21 20.4477 20.5523 20 20 20C19.4477 20 19 20.4477 19 21C19 21.5523 19.4477 22 20 22Z" fill="currentColor"/>
            <path d="M1 1H5L7.68 14.39C7.77144 14.8504 8.02191 15.264 8.38755 15.5583C8.75318 15.8526 9.2107 16.009 9.68 16H19.4C19.8693 16.009 20.3268 15.8526 20.6925 15.5583C21.0581 15.264 21.3086 14.8504 21.4 14.39L23 6H6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>`,
        estrella: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="#fbbf24" stroke="#f59e0b" stroke-width="1"/>
        </svg>`,
        calendario: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="3" y="4" width="18" height="18" rx="2" stroke="currentColor" stroke-width="2"/>
            <path d="M16 2V6M8 2V6M3 10H21" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
        </svg>`,
        sistema: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="3" stroke="currentColor" stroke-width="2"/>
            <path d="M12 1V3M12 21V23M23 12H21M3 12H1M19.07 4.93L17.66 6.34M6.34 17.66L4.93 19.07M19.07 19.07L17.66 17.66M6.34 6.34L4.93 4.93" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
        </svg>`
    };
    return iconos[tipo] || iconos.alerta;
}

// Renderizar notificación
function renderizarNotificacion(notif) {
    const categoriaClass = notif.categoria;
    const icono = obtenerIconoNotificacion(notif.icono);
    
    let detalleHTML = '';
    if (notif.tipo === 'inventario') {
        detalleHTML = `
            <div class="notificacion-metricas">
                <div class="metrica-item">
                    <span class="metrica-label">Stock Actual</span>
                    <span class="metrica-valor critico">${notif.detalle.stockActual} ${notif.detalle.unidad}</span>
                </div>
                <div class="metrica-item">
                    <span class="metrica-label">Mínimo Requerido</span>
                    <span class="metrica-valor">${notif.detalle.stockMinimo} ${notif.detalle.unidad}</span>
                </div>
                <div class="metrica-item diferencia">
                    <span class="metrica-label">Diferencia</span>
                    <span class="metrica-valor negativo">${notif.detalle.diferencia} ${notif.detalle.unidad}</span>
                </div>
            </div>
        `;
    } else if (notif.tipo === 'consumo') {
        detalleHTML = `
            <div class="notificacion-metricas">
                <div class="metrica-item">
                    <span class="metrica-label">Consumo Real</span>
                    <span class="metrica-valor critico">${notif.detalle.consumoReal} ${notif.detalle.unidad}</span>
                </div>
                <div class="metrica-item">
                    <span class="metrica-label">Planificado</span>
                    <span class="metrica-valor">${notif.detalle.consumoPlanificado} ${notif.detalle.unidad}</span>
                </div>
                <div class="metrica-item diferencia">
                    <span class="metrica-label">Desviación</span>
                    <span class="metrica-valor negativo">+${notif.detalle.porcentaje.toFixed(1)}%</span>
                </div>
            </div>
        `;
    } else if (notif.tipo === 'costo') {
        detalleHTML = `
            <div class="notificacion-metricas">
                <div class="metrica-item">
                    <span class="metrica-label">Costo Real</span>
                    <span class="metrica-valor critico">$${notif.detalle.costoReal.toFixed(2)}</span>
                </div>
                <div class="metrica-item">
                    <span class="metrica-label">Costo Ideal</span>
                    <span class="metrica-valor">$${notif.detalle.costoIdeal.toFixed(2)}</span>
                </div>
                <div class="metrica-item diferencia">
                    <span class="metrica-label">Desviación</span>
                    <span class="metrica-valor negativo">+${notif.detalle.porcentaje.toFixed(1)}%</span>
                </div>
            </div>
        `;
    } else if (notif.tipo === 'merma') {
        detalleHTML = `
            <div class="notificacion-metricas">
                <div class="metrica-item">
                    <span class="metrica-label">Merma Real</span>
                    <span class="metrica-valor critico">${notif.detalle.mermaReal.toFixed(1)}%</span>
                </div>
                <div class="metrica-item">
                    <span class="metrica-label">Objetivo</span>
                    <span class="metrica-valor">${notif.detalle.mermaObjetivo.toFixed(1)}%</span>
                </div>
                <div class="metrica-item diferencia">
                    <span class="metrica-label">Diferencia</span>
                    <span class="metrica-valor negativo">+${notif.detalle.porcentaje.toFixed(1)}%</span>
                </div>
            </div>
        `;
    } else if (notif.tipo === 'compra') {
        detalleHTML = `
            <div class="notificacion-metricas">
                <div class="metrica-item">
                    <span class="metrica-label">Productos</span>
                    <span class="metrica-valor">${notif.detalle.cantidadProductos}</span>
                </div>
                <div class="metrica-item">
                    <span class="metrica-label">Total Estimado</span>
                    <span class="metrica-valor">$${notif.detalle.totalEstimado.toLocaleString()}</span>
                </div>
                <div class="metrica-item diferencia">
                    <span class="metrica-label">Prioridad</span>
                    <span class="metrica-valor alta">${notif.detalle.prioridad}</span>
                </div>
            </div>
        `;
    } else if (notif.tipo === 'satisfaccion') {
        detalleHTML = `
            <div class="notificacion-metricas">
                <div class="metrica-item">
                    <span class="metrica-label">Nuevas Respuestas</span>
                    <span class="metrica-valor positivo">${notif.detalle.nuevasRespuestas}</span>
                </div>
                <div class="metrica-item">
                    <span class="metrica-label">Calificación Promedio</span>
                    <span class="metrica-valor positivo">${notif.detalle.calificacionPromedio}/5</span>
                </div>
            </div>
        `;
    }
    
    return `
        <div class="notificacion-card ${categoriaClass}" data-id="${notif.id}" data-categoria="${notif.categoria}">
            <div class="notificacion-gradiente"></div>
            <div class="notificacion-content">
                <div class="notificacion-header">
                    <div class="notificacion-icon-wrapper">
                        ${icono}
                    </div>
                    <div class="notificacion-titulo-wrapper">
                        <h3 class="notificacion-titulo">${notif.titulo}</h3>
                        <span class="notificacion-badge ${categoriaClass}">${notif.categoria === 'urgente' ? 'Urgente' : notif.categoria === 'desviacion' ? 'Desviación' : notif.categoria === 'novedad' ? 'Novedad' : 'Informativa'}</span>
                    </div>
                    <button class="notificacion-close" onclick="marcarLeida('${notif.id}')" title="Marcar como leída">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </button>
                </div>
                <div class="notificacion-body">
                    <p class="notificacion-descripcion">${notif.descripcion}</p>
                    ${detalleHTML}
                </div>
                <div class="notificacion-footer">
                    <div class="notificacion-acciones">
                        <button class="btn-notificacion" onclick="gestionarNotificacion('${notif.accion.tipo}')">
                            ${notif.accion.texto}
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                        </button>
                    </div>
                    <span class="notificacion-tiempo">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2"/>
                            <path d="M12 6V12L16 14" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                        </svg>
                        ${notif.tiempo}
                    </span>
                </div>
            </div>
        </div>
    `;
}

// Cargar notificaciones
function cargarNotificaciones() {
    if (notificacionesData.notificaciones.length === 0) {
        generarDatosMockNotificaciones();
    }
    
    // Ordenar por fecha (más recientes primero)
    notificacionesData.notificaciones.sort((a, b) => b.fecha - a.fecha);
    
    // Agrupar por categoría
    const porCategoria = {
        urgente: [],
        desviacion: [],
        novedad: [],
        informativa: []
    };
    
    notificacionesData.notificaciones.forEach(notif => {
        if (!notif.leida) {
            porCategoria[notif.categoria].push(notif);
        }
    });
    
    // Renderizar cada categoría
    Object.keys(porCategoria).forEach(categoria => {
        const grid = document.getElementById(`grid${categoria.charAt(0).toUpperCase() + categoria.slice(1)}`);
        const count = document.getElementById(`countSeccion${categoria.charAt(0).toUpperCase() + categoria.slice(1)}`);
        const seccion = document.getElementById(`seccion${categoria.charAt(0).toUpperCase() + categoria.slice(1)}`);
        
        if (grid && count && seccion) {
            if (porCategoria[categoria].length === 0) {
                seccion.style.display = 'none';
            } else {
                seccion.style.display = 'block';
                grid.innerHTML = porCategoria[categoria].map(notif => renderizarNotificacion(notif)).join('');
                count.textContent = porCategoria[categoria].length;
            }
        }
    });
    
    // Actualizar contadores de filtros
    actualizarContadoresFiltros();
    actualizarContadorNotificaciones();
}

// Actualizar contadores de filtros
function actualizarContadoresFiltros() {
    const categorias = ['todas', 'urgente', 'desviacion', 'novedad', 'informativa'];
    categorias.forEach(cat => {
        const countEl = document.getElementById(`count${cat.charAt(0).toUpperCase() + cat.slice(1)}`);
        if (countEl) {
            let count = 0;
            if (cat === 'todas') {
                count = notificacionesData.notificaciones.filter(n => !n.leida).length;
            } else {
                count = notificacionesData.notificaciones.filter(n => !n.leida && n.categoria === cat).length;
            }
            countEl.textContent = count;
            if (count === 0) {
                countEl.style.display = 'none';
            } else {
                countEl.style.display = 'inline-flex';
            }
        }
    });
}

// Filtrar notificaciones
function filtrarNotificaciones(categoria) {
    // Actualizar botones de filtro
    document.querySelectorAll('.filtro-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.categoria === categoria) {
            btn.classList.add('active');
        }
    });
    
    // Mostrar/ocultar secciones
    const secciones = ['urgente', 'desviacion', 'novedad', 'informativa'];
    secciones.forEach(sec => {
        const seccion = document.getElementById(`seccion${sec.charAt(0).toUpperCase() + sec.slice(1)}`);
        if (seccion) {
            if (categoria === 'todas' || categoria === sec) {
                seccion.style.display = 'block';
            } else {
                seccion.style.display = 'none';
            }
        }
    });
}

// Inicializar módulo de notificaciones
function inicializarModuloNotificaciones() {
    console.log('🔔 Inicializando módulo de notificaciones...');
    cargarNotificaciones();
}

// Notificaciones
function marcarLeida(id) {
    const notificacion = notificacionesData.notificaciones.find(n => n.id === id);
    if (notificacion) {
        notificacion.leida = true;
        const card = document.querySelector(`[data-id="${id}"]`);
        if (card) {
            card.style.opacity = '0.6';
            card.style.transform = 'scale(0.95)';
            setTimeout(() => {
                card.remove();
                cargarNotificaciones();
            }, 300);
        }
        ToastNotification.show('Notificación marcada como leída', 'success', 2000);
    }
}

function marcarTodasLeidas() {
    notificacionesData.notificaciones.forEach(notif => {
        notif.leida = true;
    });
    
    const cards = document.querySelectorAll('.notificacion-card');
    cards.forEach((card, index) => {
        setTimeout(() => {
            card.style.opacity = '0.6';
            card.style.transform = 'scale(0.95)';
            setTimeout(() => card.remove(), 300);
        }, index * 50);
    });
    
    setTimeout(() => {
        cargarNotificaciones();
        ToastNotification.show('Todas las notificaciones marcadas como leídas', 'success', 2000);
    }, cards.length * 50);
}

function gestionarNotificacion(tipo) {
    ToastNotification.show(`Gestionando: ${tipo}`, 'info', 2000);
    // Aquí se podría navegar a la sección correspondiente
    if (tipo.includes('inventario')) {
        navegar('inventario');
    } else if (tipo.includes('menu')) {
        navegar('planificacion');
    } else if (tipo.includes('pedidos') || tipo.includes('compra')) {
        navegar('compras');
    } else if (tipo.includes('encuestas')) {
        navegar('servicio');
    } else if (tipo.includes('costos')) {
        navegar('costos');
    }
}

function actualizarContadorNotificaciones() {
    const contador = document.querySelector('[data-section="notificaciones"] .nav-badge');
    const notificaciones = notificacionesData.notificaciones.filter(n => !n.leida).length;
    if (contador) {
        contador.textContent = notificaciones || '';
        if (notificaciones === 0) {
            contador.style.display = 'none';
        } else {
            contador.style.display = 'flex';
        }
    }
}

// Exponer funciones de notificaciones después de su declaración
if (typeof window !== 'undefined') {
    window.marcarLeida = marcarLeida;
    window.marcarTodasLeidas = marcarTodasLeidas;
    window.gestionarNotificacion = gestionarNotificacion;
    window.filtrarNotificaciones = filtrarNotificaciones;
    window.inicializarModuloNotificaciones = inicializarModuloNotificaciones;
}

// Chat AI - Base de datos de ejemplos precargados
const ejemplosAI = [
    {
        keywords: ['inventario', 'stock', 'nivel', 'cantidad'],
        mensaje: '📊 **Análisis de Inventario Actual:**\n\n✅ **Niveles Óptimos:**\n• Arroz: 450 kg (300% del mínimo)\n• Pollo: 280 kg (280% del mínimo)\n• Sal: 350 kg (350% del mínimo)\n\n⚠️ **Atención Requerida:**\n• Frijoles: 35 kg (70% del mínimo) - 🔴 CRÍTICO\n• Lechuga: 20 kg (67% del mínimo) - 🔴 CRÍTICO\n• Cebolla: 40 kg (80% del mínimo) - 🟡 ATENCIÓN\n\n📋 **Recomendación:** Generar orden de compra urgente para frijoles (50 kg) y lechuga (30 kg).',
        tiempo: 2000
    },
    {
        keywords: ['consumo', 'planificado', 'fuera', 'diferencia', 'variación'],
        mensaje: '📈 **Análisis de Consumos vs Planificado:**\n\n🔴 **Consumos por Encima del Planificado:**\n• Arroz: +15% (520 kg vs 450 kg planificado) - 15/01/2025\n• Pollo: +22% (122 kg vs 100 kg planificado) - 18/01/2025\n• Aceite: +18% (47 kg vs 40 kg planificado) - 20/01/2025\n\n🟢 **Consumos por Debajo del Planificado:**\n• Frijoles: -12% (40 kg vs 45 kg planificado) - 16/01/2025\n• Tomates: -8% (32 kg vs 35 kg planificado) - 19/01/2025\n\n💡 **Recomendación:** Ajustar planificación semanal considerando estas variaciones.',
        tiempo: 2200
    },
    {
        keywords: ['merma', 'desperdicio', 'sobrante', 'pérdida'],
        mensaje: '📉 **Análisis de Merma por Receta:**\n\n🔴 **Mayor Merma:**\n• **Carne Asada:** 15.2 kg (19% del planificado) - Fecha: 17/01/2025\n• **Pollo a la Plancha:** 12.3 kg (13% del planificado) - Fecha: 19/01/2025\n• **Pasta al Pesto:** 9.4 kg (17% del planificado) - Fecha: 21/01/2025\n\n🟢 **Menor Merma:**\n• **Ensalada Mixta:** 5.8 kg (9.7% del planificado) - Fecha: 18/01/2025\n• **Sopa de Verduras:** 7.1 kg (15.8% del planificado) - Fecha: 20/01/2025\n\n💡 **Recomendación:** Revisar porciones de Carne Asada y ajustar preparación para reducir merma.',
        tiempo: 2300
    },
    {
        keywords: ['receta', 'mayor', 'merma', 'fecha'],
        mensaje: '🎯 **Receta con Mayor Merma:**\n\n**Carne Asada**\n📅 Fecha: 17/01/2025\n📊 Merma: 15.2 kg\n📋 Planificado: 80 kg\n📉 Porcentaje: 19%\n💰 Valor estimado pérdida: $456\n\n**Análisis:**\n• La merma supera el promedio del 12%\n• Posible causa: sobrecocción o porciones mal calculadas\n• Impacto: 3 días de inventario adicional requerido\n\n💡 **Acción recomendada:**\n1. Revisar proceso de cocción\n2. Ajustar cálculo de porciones\n3. Capacitar personal en manejo de carne',
        tiempo: 2500
    },
    {
        keywords: ['optimizar', 'mejorar', 'eficiencia'],
        mensaje: '⚡ **Plan de Optimización:**\n\n📊 **Áreas de Mejora Identificadas:**\n\n1. **Reducción de Merma:**\n   • Carne Asada: Reducir 7% (de 19% a 12%)\n   • Ahorro estimado: $210/semana\n\n2. **Ajuste de Consumos:**\n   • Arroz: Reducir porciones en 8%\n   • Pollo: Optimizar preparación\n   • Ahorro estimado: $180/semana\n\n3. **Gestión de Inventario:**\n   • Implementar rotación FIFO\n   • Reducir stock excedente\n   • Ahorro estimado: $150/semana\n\n💰 **Ahorro Total Estimado: $540/semana**',
        tiempo: 2400
    },
    {
        keywords: ['menú', 'sugerir', 'mañana', 'día'],
        mensaje: '🍽️ **Menú Sugerido para Mañana:**\n\n**🌅 Desayuno:**\n• Huevos revueltos con frijoles\n• Arroz blanco\n• Fruta fresca (papaya)\n• Café\n\n**🌞 Almuerzo:**\n• Pollo a la plancha\n• Ensalada mixta\n• Arroz integral\n• Postre (flan)\n\n**🌙 Cena:**\n• Sopa de verduras\n• Pan integral\n• Agua de frutas\n\n📊 **Análisis:**\n• Usa productos con buen stock\n• Balance nutricional óptimo\n• Costo estimado: $2,450\n• Merma estimada: 8%',
        tiempo: 2000
    },
    {
        keywords: ['comprar', 'pedido', 'orden'],
        mensaje: '🛒 **Orden de Compra Recomendada:**\n\n🔴 **URGENTE (Comprar hoy):**\n• Frijoles: 50 kg × $25 = $1,250\n• Lechuga: 30 kg × $8 = $240\n• Cebolla: 25 kg × $6 = $150\n\n🟡 **PROGRAMADA (Esta semana):**\n• Arroz: 200 kg × $15 = $3,000\n• Pollo: 150 kg × $30 = $4,500\n• Carne: 100 kg × $50 = $5,000\n• Tomates: 80 kg × $12 = $960\n\n💰 **Total: $15,100**\n\n📅 **Entrega sugerida:** 2-3 días\n🏪 **Proveedor recomendado:** Distribuidora Alimentos S.A.',
        tiempo: 2200
    },
    {
        keywords: ['tendencia', 'semanal', 'análisis'],
        mensaje: '📊 **Análisis de Tendencias Semanales:**\n\n**📈 Tendencias Alcistas:**\n• Consumo de pollo: +12% vs semana anterior\n• Consumo de arroz: +8% vs semana anterior\n• Producción de charolas: +5% vs semana anterior\n\n**📉 Tendencias Bajistas:**\n• Merma de ensaladas: -3% (mejora)\n• Consumo de frijoles: -5% (ajuste necesario)\n\n**🎯 Proyección Próxima Semana:**\n• Necesidad de arroz: 520 kg\n• Necesidad de pollo: 150 kg\n• Stock actual suficiente para 4 días\n\n💡 **Recomendación:** Programar compra para el viernes.',
        tiempo: 2300
    },
    {
        keywords: ['costo', 'precio', 'presupuesto'],
        mensaje: '💰 **Análisis de Costos:**\n\n**📊 Costos Semanales:**\n• Materias primas: $18,500\n• Merma estimada: $1,200 (6.5%)\n• Costo por charola: $28.75\n• Costo por comida: $5.75\n\n**📈 Comparativa Mensual:**\n• Enero: $74,000 (promedio)\n• Diciembre: $71,500 (-3.4%)\n• Noviembre: $76,200 (+2.9%)\n\n**💡 Oportunidades de Ahorro:**\n• Reducir merma: -$480/mes\n• Optimizar compras: -$600/mes\n• Mejorar rotación: -$300/mes\n\n**🎯 Ahorro Potencial: $1,380/mes**',
        tiempo: 2400
    },
    {
        keywords: ['satisfacción', 'encuesta', 'cliente'],
        mensaje: '⭐ **Análisis de Satisfacción:**\n\n**📊 Resultados Recientes:**\n• Calificación promedio: 4.7/5.0\n• Total respuestas: 127\n• Tasa de respuesta: 68%\n\n**👍 Aspectos Mejor Valorados:**\n• Sabor de la comida: 4.8/5\n• Variedad de menú: 4.6/5\n• Temperatura: 4.5/5\n\n**👎 Áreas de Mejora:**\n• Tiempo de espera: 3.9/5\n• Presentación: 4.2/5\n\n**💡 Recomendaciones:**\n• Optimizar proceso de servicio\n• Mejorar presentación de platos\n• Mantener calidad actual',
        tiempo: 2000
    },
    {
        keywords: ['producto', 'crítico', 'urgente'],
        mensaje: '🚨 **Productos en Estado Crítico:**\n\n**🔴 CRÍTICO (Comprar hoy):**\n1. **Frijoles:** 35 kg (70% del mínimo)\n   • Días restantes: 0.8 días\n   • Compra necesaria: 50 kg\n   • Proveedor: Distribuidora Alimentos\n\n2. **Lechuga:** 20 kg (67% del mínimo)\n   • Días restantes: 0.8 días\n   • Compra necesaria: 30 kg\n   • Proveedor: Hortícolas del Valle\n\n**🟡 ATENCIÓN (Comprar esta semana):**\n• Cebolla: 40 kg (80% del mínimo)\n• Tomates: 80 kg (133% del mínimo)\n\n**💡 Acción Inmediata:** Generar orden de compra urgente.',
        tiempo: 2200
    },
    {
        keywords: ['eficiencia', 'rendimiento', 'productividad'],
        mensaje: '⚡ **Análisis de Eficiencia:**\n\n**📊 Métricas Actuales:**\n• Eficiencia de producción: 87%\n• Tiempo promedio de preparación: 2.5 horas\n• Charolas producidas/día: 68\n• Merma promedio: 11.2%\n\n**🎯 Objetivos vs Realidad:**\n• Producción: ✅ 100% (68/68 charolas)\n• Merma: ⚠️ 11.2% (objetivo: 10%)\n• Tiempo: ✅ 2.5h (objetivo: 2.5h)\n\n**💡 Mejoras Implementadas:**\n• Rotación de inventario: +15%\n• Reducción de merma: -2.3%\n• Optimización de procesos: +8%\n\n**📈 Proyección:** Eficiencia puede llegar a 92% con ajustes menores.',
        tiempo: 2300
    },
    {
        keywords: ['planificación', 'menú', 'semana'],
        mensaje: '📅 **Planificación Semanal Sugerida:**\n\n**Lunes:**\n• Desayuno: Huevos, frijoles, arroz\n• Almuerzo: Pollo, ensalada, arroz\n• Cena: Sopa de verduras\n\n**Martes:**\n• Desayuno: Avena, frutas\n• Almuerzo: Carne, pasta, vegetales\n• Cena: Sándwiches\n\n**Miércoles:**\n• Desayuno: Pancakes, huevos\n• Almuerzo: Pescado, arroz, ensalada\n• Cena: Pizza\n\n**📊 Análisis:**\n• Balance nutricional: ✅\n• Uso de inventario: ✅\n• Costo estimado: $18,200\n• Merma estimada: 9.5%',
        tiempo: 2500
    },
    {
        keywords: ['comparar', 'mes', 'anterior'],
        mensaje: '📊 **Comparativa Mes Actual vs Anterior:**\n\n**📈 Incrementos:**\n• Producción: +8% (2,720 vs 2,520 charolas)\n• Consumo de pollo: +12%\n• Consumo de arroz: +15%\n• Satisfacción: +0.3 puntos (4.7 vs 4.4)\n\n**📉 Reducciones:**\n• Merma: -2.1% (11.2% vs 13.3%)\n• Costo por charola: -3% ($28.75 vs $29.65)\n• Tiempo de preparación: -5%\n\n**💰 Impacto Financiero:**\n• Ahorro por merma: $420\n• Incremento por producción: +$1,200\n• **Balance positivo: +$1,620**\n\n✅ **Tendencia: Mejora continua**',
        tiempo: 2400
    },
    {
        keywords: ['proveedor', 'mejor', 'recomendación'],
        mensaje: '🏪 **Análisis de Proveedores:**\n\n**🥇 Mejor Proveedor (General):**\n• **Distribuidora Alimentos S.A.**\n• Calificación: 4.8/5\n• Entrega promedio: 1.8 días\n• Precio promedio: -5% vs mercado\n• Calidad: Excelente\n\n**📊 Ranking por Categoría:**\n\n**Carnes:**\n1. Carnes Premium (4.9/5)\n2. Distribuidora Alimentos (4.7/5)\n\n**Granos:**\n1. Distribuidora Alimentos (4.8/5)\n2. Granos del Norte (4.6/5)\n\n**Vegetales:**\n1. Hortícolas del Valle (4.7/5)\n2. Distribuidora Alimentos (4.5/5)\n\n💡 **Recomendación:** Consolidar compras con Distribuidora Alimentos para mejores precios.',
        tiempo: 2200
    },
    {
        keywords: ['alerta', 'notificación', 'aviso'],
        mensaje: '🔔 **Alertas Activas:**\n\n**🚨 URGENTES:**\n1. Frijoles: Stock crítico (35 kg)\n   • Acción: Comprar 50 kg hoy\n\n2. Lechuga: Stock crítico (20 kg)\n   • Acción: Comprar 30 kg hoy\n\n**⚠️ IMPORTANTES:**\n3. Consumo de arroz: +15% vs planificado\n   • Fecha: 15/01/2025\n   • Acción: Ajustar planificación\n\n4. Merma de Carne Asada: 19%\n   • Fecha: 17/01/2025\n   • Acción: Revisar proceso\n\n**📋 PENDIENTES:**\n5. Menú del día pendiente\n6. 3 pedidos de compra por aprobar\n\n💡 **Total alertas:** 6 (2 urgentes, 2 importantes, 2 pendientes)',
        tiempo: 2300
    },
    {
        keywords: ['nutricional', 'balance', 'salud'],
        mensaje: '🥗 **Análisis Nutricional del Menú:**\n\n**📊 Balance Actual:**\n• Proteínas: ✅ 25% (óptimo: 20-30%)\n• Carbohidratos: ✅ 50% (óptimo: 45-55%)\n• Grasas: ✅ 25% (óptimo: 20-30%)\n• Fibra: ⚠️ 18g (óptimo: 25g)\n• Calorías promedio: 650/charola\n\n**💡 Recomendaciones:**\n• Aumentar vegetales en 15%\n• Incluir más granos integrales\n• Reducir grasas saturadas en 5%\n• Agregar más frutas\n\n**✅ Fortalezas:**\n• Buen balance macro\n• Variedad adecuada\n• Calidad de ingredientes\n\n**📈 Objetivo:** Mejorar contenido de fibra y micronutrientes.',
        tiempo: 2400
    },
    {
        keywords: ['proyección', 'futuro', 'próximo'],
        mensaje: '🔮 **Proyecciones para Próximas 2 Semanas:**\n\n**📊 Consumo Estimado:**\n• Arroz: 1,040 kg (520 kg/semana)\n• Pollo: 300 kg (150 kg/semana)\n• Frijoles: 90 kg (45 kg/semana)\n• Verduras: 140 kg (70 kg/semana)\n\n**💰 Costo Estimado:**\n• Semana 1: $18,500\n• Semana 2: $19,200\n• **Total: $37,700**\n\n**📈 Tendencias:**\n• Producción: +5% (tendencia alcista)\n• Satisfacción: Mantener 4.7+\n• Merma: Reducir a 10%\n\n**⚠️ Consideraciones:**\n• Aumento estacional esperado\n• Ajustar inventario de seguridad\n• Programar compras anticipadas',
        tiempo: 2500
    },
    {
        keywords: ['reporte', 'resumen', 'estadísticas'],
        mensaje: '📋 **Reporte Ejecutivo Semanal:**\n\n**📊 Producción:**\n• Charolas servidas: 340\n• Promedio diario: 68\n• Variación: +5% vs semana anterior\n\n**💰 Financiero:**\n• Ingresos: $97,750\n• Costos: $18,500\n• Merma: $1,200\n• **Utilidad: $78,050**\n\n**⭐ Calidad:**\n• Satisfacción: 4.7/5\n• Quejas: 2 (0.6%)\n• Tiempo promedio servicio: 8 min\n\n**🎯 KPIs:**\n• Eficiencia: 87% ✅\n• Merma: 11.2% ⚠️\n• Rotación inventario: 4.2x ✅\n\n**💡 Resumen:** Semana positiva con oportunidades de mejora en merma.',
        tiempo: 2400
    },
    {
        keywords: ['recomendación', 'sugerencia', 'mejora'],
        mensaje: '💡 **Recomendaciones Prioritarias:**\n\n**🔴 ALTA PRIORIDAD:**\n1. **Comprar frijoles y lechuga urgentemente**\n   • Impacto: Evitar desabastecimiento\n   • Acción: Orden de compra hoy\n\n2. **Reducir merma de Carne Asada**\n   • Impacto: Ahorro $210/semana\n   • Acción: Revisar proceso de cocción\n\n**🟡 MEDIA PRIORIDAD:**\n3. Ajustar planificación de arroz (+15%)\n4. Optimizar rotación de inventario\n5. Mejorar contenido de fibra en menús\n\n**🟢 BAJA PRIORIDAD:**\n6. Consolidar proveedores\n7. Implementar sistema de feedback\n\n**📊 Impacto Estimado:**\n• Ahorro: $540/semana\n• Mejora satisfacción: +0.2 puntos\n• Reducción merma: -2%',
        tiempo: 2500
    },
    {
        keywords: ['histórico', 'pasado', 'registro'],
        mensaje: '📚 **Análisis Histórico (Últimos 3 Meses):**\n\n**📊 Tendencias:**\n• Producción: Crecimiento constante (+8%)\n• Merma: Reducción progresiva (-2.1%)\n• Satisfacción: Mejora continua (+0.3)\n• Costos: Estables con optimizaciones\n\n**📅 Eventos Destacados:**\n• **Enero:** Mayor merma en Carne Asada (17/01)\n• **Diciembre:** Mejor mes en satisfacción (4.7)\n• **Noviembre:** Pico de consumo de arroz\n\n**🎯 Lecciones Aprendidas:**\n• Rotación FIFO reduce merma\n• Planificación semanal mejora eficiencia\n• Feedback continuo mejora calidad\n\n**📈 Proyección:** Mantener tendencia positiva con ajustes menores.',
        tiempo: 2400
    }
];

// Chat AI - Respuestas inteligentes
const respuestasAI = {
    'optimizar': {
        mensaje: 'Basándome en el análisis de consumo, te recomiendo:\n\n• Reducir el consumo de arroz en 8% ajustando las porciones\n• Implementar rotación de menús para balancear ingredientes\n• Monitorear el consumo diario para ajustar compras\n\n¿Te gustaría que genere un plan detallado de optimización?',
        tiempo: 1500
    },
    'sugiere': {
        mensaje: 'Para mañana te sugiero este menú balanceado:\n\n🍽️ Desayuno:\n• Huevos revueltos con frijoles\n• Arroz\n• Fruta fresca\n\n🍽️ Almuerzo:\n• Pollo a la plancha\n• Ensalada mixta\n• Arroz integral\n• Postre\n\n🍽️ Cena:\n• Sopa de verduras\n• Pan integral\n\nEste menú optimiza el uso de inventario actual.',
        tiempo: 2000
    },
    'analiza': {
        mensaje: 'Análisis de inventario actual:\n\n✅ Niveles óptimos:\n• Arroz: 450 kg (120% del mínimo)\n• Pollo: 280 kg (115% del mínimo)\n\n⚠️ Atención requerida:\n• Frijoles: 8 kg (80% del mínimo) - COMPRA URGENTE\n• Verduras: 200 kg (95% del mínimo)\n\n📊 Recomendación: Generar orden de compra para frijoles y verduras.',
        tiempo: 1800
    },
    'comprar': {
        mensaje: 'Recomendaciones de compra basadas en consumo y planificación:\n\n🛒 Compra Urgente:\n• Frijoles: 50 kg ($1,250)\n• Verduras mixtas: 100 kg ($2,500)\n\n🛒 Compra Programada:\n• Arroz: 200 kg ($3,000)\n• Pollo: 150 kg ($4,500)\n• Carne: 100 kg ($5,000)\n\n💰 Total estimado: $16,250\n\n¿Deseas que genere la orden de compra?',
        tiempo: 2000
    },
    'default': {
        mensaje: 'Entiendo tu consulta. Basándome en los datos del sistema, puedo ayudarte con análisis, recomendaciones y optimizaciones. ¿Podrías ser más específico sobre qué área te gustaría mejorar?',
        tiempo: 1500
    }
};

function enviarMensajeAI(mensajeTexto) {
    const input = document.getElementById('chatInput');
    const mensaje = mensajeTexto || input.value.trim();
    
    if (!mensaje) return;
    
    // Limpiar input
    if (input) input.value = '';
    
    // Agregar mensaje del usuario
    const chatMessages = document.getElementById('chatMessages');
    const userMessage = document.createElement('div');
    userMessage.className = 'chat-message user-message';
    userMessage.innerHTML = `
        <div class="message-content">
            <div class="message-text">${mensaje}</div>
            <div class="message-time">Ahora</div>
        </div>
        <div class="message-avatar">👤</div>
    `;
    chatMessages.appendChild(userMessage);
    chatMessages.scrollTop = chatMessages.scrollHeight;
    
    // Guardar historial en memoria temporal
    const historialActual = Array.from(chatMessages.querySelectorAll('.chat-message')).map(msg => ({
        tipo: msg.classList.contains('user-message') ? 'user' : 'ai',
        texto: msg.querySelector('.message-text')?.textContent || msg.querySelector('.message-text')?.innerHTML || '',
        tiempo: msg.querySelector('.message-time')?.textContent || 'Ahora'
    }));
    guardarHistorialChat(historialActual);
    
    // Simular procesamiento
    setTimeout(() => {
        const typingIndicator = document.createElement('div');
        typingIndicator.className = 'chat-message ai-message typing';
        typingIndicator.innerHTML = `
            <div class="message-avatar">🤖</div>
            <div class="message-content">
                <div class="message-text typing-dots">
                    <span></span><span></span><span></span>
                </div>
            </div>
        `;
        chatMessages.appendChild(typingIndicator);
        chatMessages.scrollTop = chatMessages.scrollHeight;
        
        // Buscar el mejor ejemplo que coincida con el mensaje
        const mensajeLower = mensaje.toLowerCase();
        let mejorEjemplo = null;
        let mejorPuntuacion = 0;
        
        // Buscar en ejemplos precargados
        ejemplosAI.forEach(ejemplo => {
            let puntuacion = 0;
            ejemplo.keywords.forEach(keyword => {
                if (mensajeLower.includes(keyword)) {
                    puntuacion += 1;
                }
            });
            if (puntuacion > mejorPuntuacion) {
                mejorPuntuacion = puntuacion;
                mejorEjemplo = ejemplo;
            }
        });
        
        // Si no hay coincidencia, usar respuestas básicas
        let respuesta = mejorEjemplo || respuestasAI.default;
        
        if (!mejorEjemplo) {
            if (mensajeLower.includes('optimizar') || mensajeLower.includes('consumo')) {
                respuesta = respuestasAI.optimizar;
            } else if (mensajeLower.includes('sugiere') || mensajeLower.includes('menú') || mensajeLower.includes('menu')) {
                respuesta = respuestasAI.sugiere;
            } else if (mensajeLower.includes('analiza') || mensajeLower.includes('inventario')) {
                respuesta = respuestasAI.analiza;
            } else if (mensajeLower.includes('comprar') || mensajeLower.includes('compra') || mensajeLower.includes('productos')) {
                respuesta = respuestasAI.comprar;
            }
        }
        
        // Remover indicador de escritura y mostrar respuesta
        setTimeout(() => {
            typingIndicator.remove();
            const aiMessage = document.createElement('div');
            aiMessage.className = 'chat-message ai-message';
            const mensajeFormateado = typeof respuesta.mensaje === 'string' 
                ? respuesta.mensaje.replace(/\n/g, '<br>').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                : respuesta.mensaje;
            aiMessage.innerHTML = `
                <div class="message-avatar">🤖</div>
                <div class="message-content">
                    <div class="message-text">${mensajeFormateado}</div>
                    <div class="message-time">Ahora</div>
                </div>
            `;
            chatMessages.appendChild(aiMessage);
            chatMessages.scrollTop = chatMessages.scrollHeight;
            
            // Guardar historial actualizado en memoria temporal
            const historial = Array.from(chatMessages.querySelectorAll('.chat-message')).map(msg => ({
                tipo: msg.classList.contains('user-message') ? 'user' : 'ai',
                texto: msg.querySelector('.message-text')?.textContent || '',
                tiempo: msg.querySelector('.message-time')?.textContent || ''
            }));
            guardarHistorialChat(historial);
        }, respuesta.tiempo || 2000);
    }, 500);
}

// Exponer enviarMensajeAI después de su declaración
if (typeof window !== 'undefined') {
    window.enviarMensajeAI = enviarMensajeAI;
}

// ============================================
// SISTEMA DE MEMORIA TEMPORAL (15 DÍAS)
// ============================================
const MEMORIA_TEMPORAL = {
    PREFIX: 'comedores_demo_',
    DURACION_DIAS: 15,
    
    // Guardar dato con timestamp
    guardar: function(clave, dato) {
        try {
            const item = {
                dato: dato,
                timestamp: Date.now(),
                expira: Date.now() + (this.DURACION_DIAS * 24 * 60 * 60 * 1000)
            };
            localStorage.setItem(this.PREFIX + clave, JSON.stringify(item));
            console.log(`💾 Dato guardado: ${clave} (expira en ${this.DURACION_DIAS} días)`);
            return true;
        } catch (error) {
            console.error('❌ Error al guardar en memoria temporal:', error);
            return false;
        }
    },
    
    // Recuperar dato si no ha expirado
    recuperar: function(clave) {
        try {
            const itemStr = localStorage.getItem(this.PREFIX + clave);
            if (!itemStr) return null;
            
            const item = JSON.parse(itemStr);
            
            // Verificar si ha expirado
            if (Date.now() > item.expira) {
                console.log(`⏰ Dato expirado: ${clave}, eliminando...`);
                this.eliminar(clave);
                return null;
            }
            
            const diasRestantes = Math.ceil((item.expira - Date.now()) / (24 * 60 * 60 * 1000));
            console.log(`📦 Dato recuperado: ${clave} (${diasRestantes} días restantes)`);
            return item.dato;
        } catch (error) {
            console.error('❌ Error al recuperar de memoria temporal:', error);
            return null;
        }
    },
    
    // Eliminar dato específico
    eliminar: function(clave) {
        try {
            localStorage.removeItem(this.PREFIX + clave);
            console.log(`🗑️ Dato eliminado: ${clave}`);
            return true;
        } catch (error) {
            console.error('❌ Error al eliminar de memoria temporal:', error);
            return false;
        }
    },
    
    // Limpiar todos los datos expirados
    limpiarExpirados: function() {
        try {
            let eliminados = 0;
            const ahora = Date.now();
            
            for (let i = 0; i < localStorage.length; i++) {
                const clave = localStorage.key(i);
                if (clave && clave.startsWith(this.PREFIX)) {
                    try {
                        const item = JSON.parse(localStorage.getItem(clave));
                        if (ahora > item.expira) {
                            localStorage.removeItem(clave);
                            eliminados++;
                        }
                    } catch (e) {
                        // Si hay error al parsear, eliminar el item corrupto
                        localStorage.removeItem(clave);
                        eliminados++;
                    }
                }
            }
            
            if (eliminados > 0) {
                console.log(`🧹 Limpieza completada: ${eliminados} datos expirados eliminados`);
            }
            return eliminados;
        } catch (error) {
            console.error('❌ Error en limpieza de memoria temporal:', error);
            return 0;
        }
    },
    
    // Limpiar todos los datos (sin importar expiración)
    limpiarTodo: function() {
        try {
            let eliminados = 0;
            const claves = [];
            
            for (let i = 0; i < localStorage.length; i++) {
                const clave = localStorage.key(i);
                if (clave && clave.startsWith(this.PREFIX)) {
                    claves.push(clave);
                }
            }
            
            claves.forEach(clave => {
                localStorage.removeItem(clave);
                eliminados++;
            });
            
            console.log(`🗑️ Todos los datos temporales eliminados: ${eliminados} items`);
            return eliminados;
        } catch (error) {
            console.error('❌ Error al limpiar todo:', error);
            return 0;
        }
    },
    
    // Obtener información de todos los datos almacenados
    obtenerInfo: function() {
        try {
            const info = {
                total: 0,
                activos: 0,
                expirados: 0,
                items: []
            };
            
            const ahora = Date.now();
            
            for (let i = 0; i < localStorage.length; i++) {
                const clave = localStorage.key(i);
                if (clave && clave.startsWith(this.PREFIX)) {
                    info.total++;
                    try {
                        const item = JSON.parse(localStorage.getItem(clave));
                        const diasRestantes = Math.ceil((item.expira - ahora) / (24 * 60 * 60 * 1000));
                        
                        if (ahora > item.expira) {
                            info.expirados++;
                        } else {
                            info.activos++;
                        }
                        
                        info.items.push({
                            clave: clave.replace(this.PREFIX, ''),
                            diasRestantes: diasRestantes > 0 ? diasRestantes : 0,
                            expirado: ahora > item.expira,
                            fechaCreacion: new Date(item.timestamp).toLocaleString('es-ES'),
                            fechaExpiracion: new Date(item.expira).toLocaleString('es-ES')
                        });
                    } catch (e) {
                        info.expirados++;
                    }
                }
            }
            
            return info;
        } catch (error) {
            console.error('❌ Error al obtener info:', error);
            return null;
        }
    }
};

// Integración con módulos existentes
// Guardar datos de compras
function guardarComprasEnMemoria() {
    if (comprasData && comprasData.facturas) {
        MEMORIA_TEMPORAL.guardar('compras_facturas', comprasData.facturas);
    }
    if (comprasData && comprasData.kardex) {
        MEMORIA_TEMPORAL.guardar('compras_kardex', comprasData.kardex);
    }
}

// Recuperar datos de compras
function recuperarComprasDeMemoria() {
    const facturas = MEMORIA_TEMPORAL.recuperar('compras_facturas');
    const kardex = MEMORIA_TEMPORAL.recuperar('compras_kardex');
    
    if (facturas) {
        comprasData.facturas = facturas;
    }
    if (kardex) {
        comprasData.kardex = kardex;
    }
}

// Guardar preferencias del usuario
function guardarPreferencias(preferencias) {
    MEMORIA_TEMPORAL.guardar('preferencias_usuario', preferencias);
}

// Recuperar preferencias del usuario
function recuperarPreferencias() {
    return MEMORIA_TEMPORAL.recuperar('preferencias_usuario') || {};
}

// Guardar historial de chat AI
function guardarHistorialChat(mensajes) {
    MEMORIA_TEMPORAL.guardar('chat_historial', mensajes);
}

// Recuperar historial de chat AI
function recuperarHistorialChat() {
    return MEMORIA_TEMPORAL.recuperar('chat_historial') || [];
}

// Guardar notificaciones
function guardarNotificaciones(notificaciones) {
    MEMORIA_TEMPORAL.guardar('notificaciones', notificaciones);
}

// Recuperar notificaciones
function recuperarNotificaciones() {
    return MEMORIA_TEMPORAL.recuperar('notificaciones') || [];
}

// Exponer MEMORIA_TEMPORAL globalmente después de su declaración
window.MEMORIA_TEMPORAL = MEMORIA_TEMPORAL;

// Inicialización
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 DOM cargado, inicializando...');
    
    // Limpiar datos expirados al iniciar
    MEMORIA_TEMPORAL.limpiarExpirados();
    
    // Recuperar datos guardados
    recuperarComprasDeMemoria();
    
    // Mostrar info de memoria temporal en consola
    const infoMemoria = MEMORIA_TEMPORAL.obtenerInfo();
    if (infoMemoria && infoMemoria.total > 0) {
        console.log('📊 Memoria Temporal:', {
            total: infoMemoria.total,
            activos: infoMemoria.activos,
            expirados: infoMemoria.expirados
        });
    }
    
    // Programar limpieza automática cada hora
    setInterval(() => {
        MEMORIA_TEMPORAL.limpiarExpirados();
    }, 60 * 60 * 1000); // Cada hora
    
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

// ============================================
// MÓDULO DE SATISFACCIÓN AL CLIENTE
// ============================================

// Datos mock de satisfacción con múltiples variables
const satisfaccionData = {
    respuestas: [],
    variables: [
        { id: 'sabor', nombre: 'Sabor de la Comida', icon: '🍽️' },
        { id: 'calidad', nombre: 'Calidad de Ingredientes', icon: '🥗' },
        { id: 'presentacion', nombre: 'Presentación', icon: '🎨' },
        { id: 'temperatura', nombre: 'Temperatura', icon: '🌡️' },
        { id: 'variedad', nombre: 'Variedad de Menú', icon: '📋' },
        { id: 'servicio', nombre: 'Atención al Cliente', icon: '👥' },
        { id: 'limpieza', nombre: 'Limpieza del Área', icon: '🧹' },
        { id: 'tiempo', nombre: 'Tiempo de Espera', icon: '⏱️' },
        { id: 'precio', nombre: 'Relación Precio/Calidad', icon: '💰' }
    ]
};

// Generar datos mock históricos
function generarDatosMockSatisfaccion() {
    const semanas = 4;
    const respuestasPorSemana = [32, 35, 30, 30];
    const fechaBase = new Date();
    fechaBase.setDate(fechaBase.getDate() - (semanas * 7));
    
    satisfaccionData.respuestas = [];
    
    for (let semana = 0; semana < semanas; semana++) {
        const fechaSemana = new Date(fechaBase);
        fechaSemana.setDate(fechaSemana.getDate() + (semana * 7));
        
        for (let i = 0; i < respuestasPorSemana[semana]; i++) {
            const respuesta = {
                id: Date.now() + Math.random(),
                fecha: new Date(fechaSemana.getTime() + (i * 24 * 60 * 60 * 1000)),
                semana: semana + 1,
                variables: {},
                promedio: 0,
                regresaria: Math.random() > 0.15, // 85% regresaría
                nps: Math.floor(Math.random() * 11) // 0-10
            };
            
            // Generar calificaciones para cada variable (1-5)
            let suma = 0;
            satisfaccionData.variables.forEach(variable => {
                // Calificaciones con tendencia positiva
                const base = 4.0 + (semana * 0.1); // Mejora con el tiempo
                const variacion = (Math.random() - 0.5) * 0.8;
                const calificacion = Math.max(1, Math.min(5, base + variacion));
                respuesta.variables[variable.id] = parseFloat(calificacion.toFixed(1));
                suma += calificacion;
            });
            
            respuesta.promedio = parseFloat((suma / satisfaccionData.variables.length).toFixed(2));
            satisfaccionData.respuestas.push(respuesta);
        }
    }
}

// Calcular medidas de tendencia central
function calcularTendenciasCentrales() {
    const todasCalificaciones = satisfaccionData.respuestas.map(r => r.promedio);
    
    // Media aritmética
    const media = todasCalificaciones.reduce((a, b) => a + b, 0) / todasCalificaciones.length;
    
    // Mediana
    const sorted = [...todasCalificaciones].sort((a, b) => a - b);
    const mediana = sorted.length % 2 === 0
        ? (sorted[sorted.length / 2 - 1] + sorted[sorted.length / 2]) / 2
        : sorted[Math.floor(sorted.length / 2)];
    
    // Moda (calificación más frecuente)
    const frecuencia = {};
    todasCalificaciones.forEach(c => {
        const redondeada = Math.round(c * 10) / 10;
        frecuencia[redondeada] = (frecuencia[redondeada] || 0) + 1;
    });
    const moda = Object.keys(frecuencia).reduce((a, b) => frecuencia[a] > frecuencia[b] ? a : b);
    
    // Desviación estándar
    const varianza = todasCalificaciones.reduce((sum, c) => sum + Math.pow(c - media, 2), 0) / todasCalificaciones.length;
    const desviacion = Math.sqrt(varianza);
    
    return {
        media: parseFloat(media.toFixed(2)),
        mediana: parseFloat(mediana.toFixed(2)),
        moda: parseFloat(moda),
        desviacion: parseFloat(desviacion.toFixed(2))
    };
}

// Calcular NPS (Net Promoter Score)
function calcularNPS() {
    const promotores = satisfaccionData.respuestas.filter(r => r.nps >= 9).length;
    const detractores = satisfaccionData.respuestas.filter(r => r.nps <= 6).length;
    const total = satisfaccionData.respuestas.length;
    const nps = ((promotores - detractores) / total) * 100;
    return Math.round(nps);
}

// Inicializar módulo de satisfacción
function inicializarModuloSatisfaccion() {
    // Generar datos mock si no existen
    if (satisfaccionData.respuestas.length === 0) {
        generarDatosMockSatisfaccion();
    }
    
    // Actualizar KPIs
    const tendencias = calcularTendenciasCentrales();
    const nps = calcularNPS();
    const intencionRegreso = Math.round((satisfaccionData.respuestas.filter(r => r.regresaria).length / satisfaccionData.respuestas.length) * 100);
    
    document.getElementById('kpiPromedio').textContent = tendencias.media;
    document.getElementById('kpiRespuestas').textContent = satisfaccionData.respuestas.length;
    document.getElementById('kpiNPS').textContent = nps + '%';
    document.getElementById('kpiRegreso').textContent = intencionRegreso + '%';
    
    // Actualizar medidas de tendencia central
    document.getElementById('mediaAritmetica').textContent = tendencias.media;
    document.getElementById('mediana').textContent = tendencias.mediana;
    document.getElementById('moda').textContent = tendencias.moda;
    document.getElementById('desviacion').textContent = tendencias.desviacion;
    
    // Crear gráficos
    crearGraficosSatisfaccion();
    
    // Cargar análisis detallado
    cargarAnalisisDetallado();
}

// Crear todos los gráficos de satisfacción
function crearGraficosSatisfaccion() {
    crearGraficoSatisfaccionEvolucion();
    crearGraficoSatisfaccionCategorias();
    crearGraficoNPS();
    crearGraficoDistribucion();
    crearGraficoComparativa();
    crearGraficoDiaSemana();
}

// Gráfico 1: Evolución de Satisfacción
function crearGraficoSatisfaccionEvolucion() {
    const ctx = document.getElementById('chartSatisfaccionEvolucion');
    if (!ctx) return;
    
    // Destruir gráfico anterior si existe
    if (chartInstances.chartSatisfaccionEvolucion) {
        chartInstances.chartSatisfaccionEvolucion.destroy();
    }
    
    // Agrupar por semana
    const porSemana = {};
    satisfaccionData.respuestas.forEach(r => {
        if (!porSemana[r.semana]) {
            porSemana[r.semana] = [];
        }
        porSemana[r.semana].push(r.promedio);
    });
    
    const semanas = Object.keys(porSemana).sort((a, b) => a - b);
    const promedios = semanas.map(s => {
        const calificaciones = porSemana[s];
        return calificaciones.reduce((a, b) => a + b, 0) / calificaciones.length;
    });
    
    chartInstances.chartSatisfaccionEvolucion = new Chart(ctx, {
        type: 'line',
        data: {
            labels: semanas.map(s => `Semana ${s}`),
            datasets: [{
                label: 'Satisfacción Promedio',
                data: promedios,
                borderColor: '#8b5cf6',
                backgroundColor: 'rgba(139, 92, 246, 0.1)',
                borderWidth: 3,
                fill: true,
                tension: 0.4,
                pointRadius: 0,
                pointHoverRadius: 8,
                pointBackgroundColor: '#8b5cf6',
                pointBorderColor: '#fff',
                pointBorderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false },
                tooltip: {
                    callbacks: {
                        title: () => '',
                        label: (context) => {
                            const semana = context.label;
                            const valor = context.parsed.y;
                            const respuestas = porSemana[semana.replace('Semana ', '')].length;
                            return `Calificación: ${valor.toFixed(2)}/5.0\nEncuestas: ${respuestas}`;
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: false,
                    min: 3.5,
                    max: 5.0,
                    ticks: { stepSize: 0.1 }
                }
            }
        }
    });
}

// Gráfico 2: Satisfacción por Categoría
function crearGraficoSatisfaccionCategorias() {
    const ctx = document.getElementById('chartSatisfaccionCategorias');
    if (!ctx) return;
    
    if (chartInstances.chartSatisfaccionCategorias) {
        chartInstances.chartSatisfaccionCategorias.destroy();
    }
    
    const promedios = satisfaccionData.variables.map(v => {
        const calificaciones = satisfaccionData.respuestas.map(r => r.variables[v.id]);
        return calificaciones.reduce((a, b) => a + b, 0) / calificaciones.length;
    });
    
    chartInstances.chartSatisfaccionCategorias = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: satisfaccionData.variables.map(v => v.nombre),
            datasets: [{
                label: 'Calificación Promedio',
                data: promedios,
                backgroundColor: promedios.map(p => {
                    if (p >= 4.5) return '#22c55e';
                    if (p >= 4.0) return '#eab308';
                    if (p >= 3.5) return '#f97316';
                    return '#ef4444';
                }),
                borderColor: promedios.map(p => {
                    if (p >= 4.5) return '#16a34a';
                    if (p >= 4.0) return '#ca8a04';
                    if (p >= 3.5) return '#ea580c';
                    return '#dc2626';
                }),
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            indexAxis: 'y',
            plugins: {
                legend: { display: false },
                tooltip: {
                    callbacks: {
                        label: (context) => `Calificación: ${context.parsed.x.toFixed(2)}/5.0`
                    }
                }
            },
            scales: {
                x: {
                    beginAtZero: false,
                    min: 3.0,
                    max: 5.0,
                    ticks: { stepSize: 0.5 }
                }
            }
        }
    });
}

// Gráfico 3: NPS (Net Promoter Score)
function crearGraficoNPS() {
    const ctx = document.getElementById('chartNPS');
    if (!ctx) return;
    
    if (chartInstances.chartNPS) {
        chartInstances.chartNPS.destroy();
    }
    
    const promotores = satisfaccionData.respuestas.filter(r => r.nps >= 9).length;
    const pasivos = satisfaccionData.respuestas.filter(r => r.nps >= 7 && r.nps <= 8).length;
    const detractores = satisfaccionData.respuestas.filter(r => r.nps <= 6).length;
    const total = satisfaccionData.respuestas.length;
    
    chartInstances.chartNPS = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Promotores (9-10)', 'Pasivos (7-8)', 'Detractores (0-6)'],
            datasets: [{
                data: [promotores, pasivos, detractores],
                backgroundColor: ['#22c55e', '#eab308', '#ef4444'],
                borderWidth: 2,
                borderColor: '#fff'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { position: 'bottom' },
                tooltip: {
                    callbacks: {
                        label: (context) => {
                            const porcentaje = ((context.parsed / total) * 100).toFixed(1);
                            return `${context.label}: ${context.parsed} (${porcentaje}%)`;
                        }
                    }
                }
            }
        }
    });
}

// Gráfico 4: Distribución de Calificaciones
function crearGraficoDistribucion() {
    const ctx = document.getElementById('chartDistribucion');
    if (!ctx) return;
    
    if (chartInstances.chartDistribucion) {
        chartInstances.chartDistribucion.destroy();
    }
    
    const distribucion = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
    satisfaccionData.respuestas.forEach(r => {
        const redondeada = Math.round(r.promedio);
        distribucion[redondeada]++;
    });
    
    chartInstances.chartDistribucion = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['1', '2', '3', '4', '5'],
            datasets: [{
                label: 'Cantidad de Respuestas',
                data: [distribucion[1], distribucion[2], distribucion[3], distribucion[4], distribucion[5]],
                backgroundColor: ['#ef4444', '#f97316', '#eab308', '#22c55e', '#16a34a'],
                borderWidth: 2,
                borderColor: '#fff'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false },
                tooltip: {
                    callbacks: {
                        label: (context) => {
                            const porcentaje = ((context.parsed.y / satisfaccionData.respuestas.length) * 100).toFixed(1);
                            return `${context.parsed.y} respuestas (${porcentaje}%)`;
                        }
                    }
                }
            },
            scales: {
                y: { beginAtZero: true }
            }
        }
    });
}

// Gráfico 5: Comparativa de Variables
function crearGraficoComparativa() {
    const ctx = document.getElementById('chartComparativa');
    if (!ctx) return;
    
    if (chartInstances.chartComparativa) {
        chartInstances.chartComparativa.destroy();
    }
    
    const semanas = [1, 2, 3, 4];
    const datasets = satisfaccionData.variables.map((v, index) => {
        const colores = ['#8b5cf6', '#ec4899', '#f59e0b', '#10b981', '#3b82f6', '#ef4444', '#06b6d4', '#84cc16', '#f97316'];
        const data = semanas.map(semana => {
            const respuestasSemana = satisfaccionData.respuestas.filter(r => r.semana === semana);
            const calificaciones = respuestasSemana.map(r => r.variables[v.id]);
            return calificaciones.length > 0 
                ? calificaciones.reduce((a, b) => a + b, 0) / calificaciones.length 
                : 0;
        });
        
        return {
            label: v.nombre,
            data: data,
            borderColor: colores[index % colores.length],
            backgroundColor: colores[index % colores.length] + '40',
            borderWidth: 2,
            fill: false,
            tension: 0.4,
            pointRadius: 3,
            pointHoverRadius: 6
        };
    });
    
    chartInstances.chartComparativa = new Chart(ctx, {
        type: 'line',
        data: {
            labels: semanas.map(s => `Semana ${s}`),
            datasets: datasets
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { 
                    display: true,
                    position: 'right',
                    labels: { boxWidth: 12, font: { size: 10 } }
                }
            },
            scales: {
                y: {
                    beginAtZero: false,
                    min: 3.0,
                    max: 5.0,
                    ticks: { stepSize: 0.5 }
                }
            }
        }
    });
}

// Gráfico 6: Satisfacción por Día de la Semana
function crearGraficoDiaSemana() {
    const ctx = document.getElementById('chartDiaSemana');
    if (!ctx) return;
    
    if (chartInstances.chartDiaSemana) {
        chartInstances.chartDiaSemana.destroy();
    }
    
    const dias = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
    const promedios = dias.map((dia, index) => {
        const respuestasDia = satisfaccionData.respuestas.filter(r => {
            const diaRespuesta = r.fecha.getDay();
            return diaRespuesta === (index === 0 ? 1 : index); // Ajustar índice
        });
        if (respuestasDia.length === 0) return 0;
        return respuestasDia.reduce((sum, r) => sum + r.promedio, 0) / respuestasDia.length;
    });
    
    chartInstances.chartDiaSemana = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: dias,
            datasets: [{
                label: 'Satisfacción Promedio',
                data: promedios,
                backgroundColor: '#8b5cf6',
                borderColor: '#7c3aed',
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false },
                tooltip: {
                    callbacks: {
                        label: (context) => `Calificación: ${context.parsed.y.toFixed(2)}/5.0`
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: false,
                    min: 3.5,
                    max: 5.0,
                    ticks: { stepSize: 0.2 }
                }
            }
        }
    });
}

// Cargar análisis detallado por variable
function cargarAnalisisDetallado() {
    const grid = document.getElementById('variablesGrid');
    if (!grid) return;
    
    grid.innerHTML = satisfaccionData.variables.map(v => {
        const calificaciones = satisfaccionData.respuestas.map(r => r.variables[v.id]);
        const promedio = calificaciones.reduce((a, b) => a + b, 0) / calificaciones.length;
        const min = Math.min(...calificaciones);
        const max = Math.max(...calificaciones);
        const tendencia = promedio >= 4.5 ? 'positive' : promedio >= 4.0 ? 'neutral' : 'negative';
        
        return `
            <div class="variable-card">
                <div class="variable-header">
                    <span class="variable-icon">${v.icon}</span>
                    <h3>${v.nombre}</h3>
                </div>
                <div class="variable-stats">
                    <div class="stat-item">
                        <span class="stat-label">Promedio</span>
                        <span class="stat-value ${tendencia}">${promedio.toFixed(2)}</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-label">Mínimo</span>
                        <span class="stat-value">${min.toFixed(1)}</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-label">Máximo</span>
                        <span class="stat-value">${max.toFixed(1)}</span>
                    </div>
                </div>
                <div class="variable-bar">
                    <div class="bar-fill" style="width: ${(promedio / 5) * 100}%; background: ${promedio >= 4.5 ? '#22c55e' : promedio >= 4.0 ? '#eab308' : '#ef4444'}"></div>
                </div>
            </div>
        `;
    }).join('');
}

// Función para crear encuesta (placeholder)
function crearEncuesta() {
    ToastNotification.show('Funcionalidad de creación de encuestas próximamente', 'info', 3000);
}

// ============================================
// GENERACIÓN DE QR Y FORMULARIO DE ENCUESTA
// ============================================

// Generar QR para encuesta
function generarQREncuesta() {
    // Crear URL única para el formulario
    const baseUrl = window.location.origin + window.location.pathname;
    const encuestaUrl = baseUrl + '?encuesta=true';
    
    // Generar QR usando API de qrserver.com
    const qrSize = 300;
    const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=${qrSize}x${qrSize}&data=${encodeURIComponent(encuestaUrl)}`;
    
    // Mostrar QR
    const qrImage = document.getElementById('qrCodeImage');
    const qrPlaceholder = document.getElementById('qrPlaceholder');
    const btnDescargar = document.getElementById('btnDescargarQR');
    const qrLink = document.getElementById('qrLink');
    
    if (qrImage && qrPlaceholder) {
        qrImage.src = qrUrl;
        qrImage.style.display = 'block';
        qrPlaceholder.style.display = 'none';
        
        if (btnDescargar) {
            btnDescargar.style.display = 'inline-flex';
        }
        
        if (qrLink) {
            qrLink.value = encuestaUrl;
        }
        
        ToastNotification.show('Código QR generado correctamente', 'success', 2000);
    }
}

// Descargar QR
function descargarQR() {
    const qrImage = document.getElementById('qrCodeImage');
    if (qrImage && qrImage.src) {
        const link = document.createElement('a');
        link.href = qrImage.src;
        link.download = 'qr-encuesta-satisfaccion.png';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        ToastNotification.show('QR descargado correctamente', 'success', 2000);
    }
}

// Copiar enlace
function copiarEnlace() {
    const qrLink = document.getElementById('qrLink');
    if (qrLink && qrLink.value) {
        qrLink.select();
        qrLink.setSelectionRange(0, 99999); // Para móviles
        document.execCommand('copy');
        ToastNotification.show('Enlace copiado al portapapeles', 'success', 2000);
    }
}

// Verificar si se debe mostrar el formulario (desde QR)
function verificarParametroEncuesta() {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('encuesta') === 'true') {
        mostrarFormularioEncuesta();
    }
}

// Mostrar formulario de encuesta
function mostrarFormularioEncuesta() {
    const formulario = document.getElementById('formulario-encuesta');
    if (formulario) {
        // Ocultar todas las pantallas
        document.querySelectorAll('.screen').forEach(screen => {
            screen.classList.remove('active');
            screen.style.display = 'none';
        });
        
        // Mostrar formulario
        formulario.classList.add('active');
        formulario.style.display = 'flex';
        document.body.style.overflow = 'hidden';
        
        // Scroll al inicio
        window.scrollTo(0, 0);
    }
}

// Enviar encuesta del cliente
function enviarEncuestaCliente(event) {
    event.preventDefault();
    
    const form = event.target;
    const formData = new FormData(form);
    
    // Recopilar datos del formulario
    const datosEncuesta = {
        nombre: formData.get('nombre') || 'Anónimo',
        email: formData.get('email') || '',
        calificacionGeneral: parseInt(formData.get('calificacionGeneral')) || 0,
        sabor: parseInt(formData.get('sabor')) || 0,
        calidad: parseInt(formData.get('calidad')) || 0,
        presentacion: parseInt(formData.get('presentacion')) || 0,
        servicio: parseInt(formData.get('servicio')) || 0,
        regresaria: formData.get('regresaria'),
        recomendaria: formData.get('recomendaria'),
        comentarios: formData.get('comentarios') || '',
        fecha: new Date()
    };
    
    // Validar que se haya seleccionado calificación general
    if (datosEncuesta.calificacionGeneral === 0) {
        ToastNotification.show('Por favor, califica tu experiencia general', 'warning', 3000);
        return;
    }
    
    // Agregar a datos de satisfacción (simulación)
    if (typeof satisfaccionData !== 'undefined') {
        const nuevaRespuesta = {
            id: Date.now(),
            fecha: datosEncuesta.fecha,
            semana: Math.ceil((new Date().getDate()) / 7),
            calificacionGeneral: datosEncuesta.calificacionGeneral,
            variables: {
                sabor: datosEncuesta.sabor || datosEncuesta.calificacionGeneral,
                calidad: datosEncuesta.calidad || datosEncuesta.calificacionGeneral,
                presentacion: datosEncuesta.presentacion || datosEncuesta.calificacionGeneral,
                temperatura: datosEncuesta.calificacionGeneral,
                variedad: datosEncuesta.calificacionGeneral,
                servicio: datosEncuesta.servicio || datosEncuesta.calificacionGeneral,
                limpieza: datosEncuesta.calificacionGeneral,
                tiempo: datosEncuesta.calificacionGeneral,
                precio: datosEncuesta.calificacionGeneral
            },
            regresaria: datosEncuesta.regresaria === 'si',
            recomendaria: datosEncuesta.recomendaria === 'si',
            comentarios: datosEncuesta.comentarios,
            nombre: datosEncuesta.nombre,
            email: datosEncuesta.email
        };
        
        satisfaccionData.respuestas.push(nuevaRespuesta);
    }
    
    // Mostrar mensaje de éxito
    ToastNotification.show('¡Gracias por tu opinión! Tu encuesta ha sido enviada correctamente.', 'success', 4000);
    
    // Limpiar formulario
    form.reset();
    
    // Cerrar formulario después de 2 segundos
    setTimeout(() => {
        const formulario = document.getElementById('formulario-encuesta');
        if (formulario) {
            formulario.classList.remove('active');
            formulario.style.display = 'none';
            document.body.style.overflow = 'auto';
            
            // Limpiar parámetro de URL
            window.history.replaceState({}, document.title, window.location.pathname);
        }
    }, 2000);
}

// Exponer funciones globalmente
window.crearEncuesta = crearEncuesta;
window.inicializarModuloSatisfaccion = inicializarModuloSatisfaccion;
window.generarQREncuesta = generarQREncuesta;
window.descargarQR = descargarQR;
window.copiarEnlace = copiarEnlace;
window.enviarEncuestaCliente = enviarEncuestaCliente;

// Verificar parámetro al cargar la página
window.addEventListener('DOMContentLoaded', function() {
    verificarParametroEncuesta();
});

// ============================================
// MÓDULO DE INVENTARIO COMPLETO
// ============================================

// Estructura de datos de inventario
const inventarioData = {
    productos: [],
    movimientos: []
};

// Generar datos mock de inventario
function generarDatosMockInventario() {
    const productosBase = [
        { nombre: 'Arroz', unidad: 'kg', minimo: 50, seguridad: 100, adecuado: 200 },
        { nombre: 'Frijoles', unidad: 'kg', minimo: 30, seguridad: 60, adecuado: 120 },
        { nombre: 'Pollo', unidad: 'kg', minimo: 80, seguridad: 150, adecuado: 300 },
        { nombre: 'Carne Res', unidad: 'kg', minimo: 50, seguridad: 100, adecuado: 200 },
        { nombre: 'Pescado', unidad: 'kg', minimo: 40, seguridad: 80, adecuado: 160 },
        { nombre: 'Huevos', unidad: 'unidad', minimo: 200, seguridad: 400, adecuado: 800 },
        { nombre: 'Leche', unidad: 'L', minimo: 60, seguridad: 120, adecuado: 240 },
        { nombre: 'Queso', unidad: 'kg', minimo: 20, seguridad: 40, adecuado: 80 },
        { nombre: 'Tomates', unidad: 'kg', minimo: 30, seguridad: 60, adecuado: 120 },
        { nombre: 'Cebolla', unidad: 'kg', minimo: 25, seguridad: 50, adecuado: 100 },
        { nombre: 'Papa', unidad: 'kg', minimo: 40, seguridad: 80, adecuado: 160 },
        { nombre: 'Aceite', unidad: 'L', minimo: 40, seguridad: 80, adecuado: 160 },
        { nombre: 'Sal', unidad: 'kg', minimo: 20, seguridad: 40, adecuado: 80 },
        { nombre: 'Pasta', unidad: 'kg', minimo: 30, seguridad: 60, adecuado: 120 },
        { nombre: 'Lechuga', unidad: 'kg', minimo: 15, seguridad: 30, adecuado: 60 }
    ];

    inventarioData.productos = productosBase.map((p, index) => {
        // Generar saldo inicial aleatorio
        const saldoInicial = Math.random() * (p.adecuado * 1.5) + (p.minimo * 0.5);
        const ultimaCompra = new Date();
        ultimaCompra.setDate(ultimaCompra.getDate() - Math.floor(Math.random() * 30));
        
        // Calcular ingresos y salidas basados en movimientos mock
        const ingresos = Math.floor(saldoInicial * 0.8);
        const salidas = Math.floor(saldoInicial * 0.5);
        const stockActual = saldoInicial + ingresos - salidas;
        
        return {
            id: index + 1,
            nombre: p.nombre,
            unidad: p.unidad,
            saldoInicial: parseFloat(saldoInicial.toFixed(2)),
            ultimaCompra: ultimaCompra,
            ingresos: parseFloat(ingresos.toFixed(2)),
            salidas: parseFloat(salidas.toFixed(2)),
            stockActual: parseFloat(stockActual.toFixed(2)),
            minimo: p.minimo,
            seguridad: p.seguridad,
            adecuado: p.adecuado,
            estado: calcularEstadoInventario(stockActual, p.minimo, p.seguridad, p.adecuado),
            desempeno: calcularDesempeno(p.nombre, stockActual, p.adecuado)
        };
    });

    // Generar movimientos mock
    const tiposMovimiento = ['entrada', 'salida'];
    const solicitantes = ['Cocina', 'Producción', 'Almacén', 'Servicio'];
    
    for (let i = 0; i < 50; i++) {
        const producto = inventarioData.productos[Math.floor(Math.random() * inventarioData.productos.length)];
        const tipo = tiposMovimiento[Math.floor(Math.random() * tiposMovimiento.length)];
        const cantidad = Math.random() * 50 + 10;
        const fecha = new Date();
        fecha.setDate(fecha.getDate() - Math.floor(Math.random() * 60));
        
        inventarioData.movimientos.push({
            id: i + 1,
            fecha: fecha,
            producto: producto.nombre,
            tipo: tipo,
            cantidad: parseFloat(cantidad.toFixed(2)),
            unidad: producto.unidad,
            solicitante: tipo === 'salida' ? solicitantes[Math.floor(Math.random() * solicitantes.length)] : null,
            saldoAnterior: producto.stockActual - (tipo === 'entrada' ? cantidad : -cantidad),
            saldoFinal: producto.stockActual,
            observaciones: tipo === 'entrada' ? 'Compra' : `Consumo para ${tipo === 'salida' ? solicitantes[Math.floor(Math.random() * solicitantes.length)] : ''}`
        });
    }
    
    // Ordenar movimientos por fecha (más recientes primero)
    inventarioData.movimientos.sort((a, b) => b.fecha - a.fecha);
}

// Calcular estado del inventario
function calcularEstadoInventario(stock, minimo, seguridad, adecuado) {
    if (stock < minimo) {
        return 'minimo';
    } else if (stock < seguridad) {
        return 'seguridad';
    } else if (stock <= adecuado) {
        return 'adecuado';
    } else {
        return 'sobrestock';
    }
}

// Calcular desempeño basado en planificación
function calcularDesempeno(nombreProducto, stockActual, stockAdecuado) {
    // Simular análisis de consumo vs planificado
    const ratio = (stockActual / stockAdecuado) * 100;
    
    if (ratio < 50) {
        return { estado: 'crítico', porcentaje: ratio.toFixed(1), mensaje: 'Muy bajo vs planificado' };
    } else if (ratio < 80) {
        return { estado: 'bajo', porcentaje: ratio.toFixed(1), mensaje: 'Bajo vs planificado' };
    } else if (ratio <= 120) {
        return { estado: 'adecuado', porcentaje: ratio.toFixed(1), mensaje: 'Adecuado vs planificado' };
    } else if (ratio <= 150) {
        return { estado: 'alto', porcentaje: ratio.toFixed(1), mensaje: 'Alto vs planificado' };
    } else {
        return { estado: 'exceso', porcentaje: ratio.toFixed(1), mensaje: 'Exceso vs planificado' };
    }
}

// Inicializar módulo de inventario
function inicializarModuloInventario() {
    console.log('📦 Inicializando módulo de inventario...');
    
    // Generar datos mock si no existen
    if (inventarioData.productos.length === 0) {
        generarDatosMockInventario();
    }
    
    // Actualizar KPIs
    actualizarKPIsInventario();
    
    // Cargar tabla de inventario
    cargarTablaInventario();
    
    // Cargar historial de movimientos
    cargarHistorialMovimientos();
    
    // Cargar productos en formulario
    cargarProductosEnFormulario();
    
    // Crear gráficos
    crearGraficosInventario();
}

// Actualizar KPIs de inventario
function actualizarKPIsInventario() {
    const estados = {
        minimo: 0,
        seguridad: 0,
        adecuado: 0,
        sobrestock: 0
    };
    
    inventarioData.productos.forEach(p => {
        estados[p.estado]++;
    });
    
    document.getElementById('kpiMinimo').textContent = estados.minimo;
    document.getElementById('kpiSeguridad').textContent = estados.seguridad;
    document.getElementById('kpiAdecuado').textContent = estados.adecuado;
    document.getElementById('kpiSobreStock').textContent = estados.sobrestock;
}

// Cargar tabla de inventario
function cargarTablaInventario() {
    const tbody = document.getElementById('tablaInventarioBody');
    if (!tbody) return;
    
    const filtroEstado = document.getElementById('filtroEstadoInventario')?.value || '';
    const busqueda = document.getElementById('buscarProducto')?.value.toLowerCase() || '';
    
    let productosFiltrados = inventarioData.productos;
    
    if (filtroEstado) {
        productosFiltrados = productosFiltrados.filter(p => p.estado === filtroEstado);
    }
    
    if (busqueda) {
        productosFiltrados = productosFiltrados.filter(p => 
            p.nombre.toLowerCase().includes(busqueda)
        );
    }
    
    tbody.innerHTML = productosFiltrados.map(p => {
        const estadoClass = {
            'minimo': 'estado-minimo',
            'seguridad': 'estado-seguridad',
            'adecuado': 'estado-adecuado',
            'sobrestock': 'estado-sobrestock'
        }[p.estado] || '';
        
        const estadoLabel = {
            'minimo': '🔴 Bajo Mínimo',
            'seguridad': '🟠 En Seguridad',
            'adecuado': '🟢 Stock Adecuado',
            'sobrestock': '🔵 Sobre Stock'
        }[p.estado] || '';
        
        const desempenoClass = {
            'crítico': 'desempeno-critico',
            'bajo': 'desempeno-bajo',
            'adecuado': 'desempeno-adecuado',
            'alto': 'desempeno-alto',
            'exceso': 'desempeno-exceso'
        }[p.desempeno.estado] || '';
        
        return `
            <tr>
                <td><strong>${p.nombre}</strong></td>
                <td>${p.saldoInicial.toFixed(2)} ${p.unidad}</td>
                <td>${p.ultimaCompra.toLocaleDateString('es-ES')}</td>
                <td>${p.ingresos.toFixed(2)} ${p.unidad}</td>
                <td>${p.salidas.toFixed(2)} ${p.unidad}</td>
                <td><strong>${p.stockActual.toFixed(2)} ${p.unidad}</strong></td>
                <td>${p.minimo} ${p.unidad}</td>
                <td>${p.seguridad} ${p.unidad}</td>
                <td><span class="badge ${estadoClass}">${estadoLabel}</span></td>
                <td>
                    <span class="desempeno-badge ${desempenoClass}" title="${p.desempeno.mensaje}">
                        ${p.desempeno.porcentaje}%
                    </span>
                </td>
                <td>
                    <button class="btn-small" onclick="mostrarFormularioInventario('${p.nombre}')">Editar</button>
                </td>
            </tr>
        `;
    }).join('');
}

// Cargar historial de movimientos
function cargarHistorialMovimientos() {
    const tbody = document.getElementById('historialMovimientosBody');
    if (!tbody) return;
    
    tbody.innerHTML = inventarioData.movimientos.slice(0, 30).map(m => {
        const tipoIcon = m.tipo === 'entrada' ? '📥' : '📤';
        const tipoLabel = m.tipo === 'entrada' ? 'Entrada' : 'Salida';
        
        return `
            <tr>
                <td>${m.fecha.toLocaleDateString('es-ES')}</td>
                <td><strong>${m.producto}</strong></td>
                <td>${tipoIcon} ${tipoLabel}</td>
                <td>${m.cantidad.toFixed(2)} ${m.unidad}</td>
                <td>${m.solicitante || '-'}</td>
                <td>${m.saldoAnterior.toFixed(2)} ${m.unidad}</td>
                <td><strong>${m.saldoFinal.toFixed(2)} ${m.unidad}</strong></td>
            </tr>
        `;
    }).join('');
}

// Cargar productos en formulario
function cargarProductosEnFormulario() {
    const select = document.getElementById('productoMovimiento');
    if (!select) return;
    
    select.innerHTML = '<option value="">Seleccione un producto...</option>' +
        inventarioData.productos.map(p => 
            `<option value="${p.nombre}">${p.nombre} (${p.unidad})</option>`
        ).join('');
}

// Mostrar formulario de inventario
function mostrarFormularioInventario(productoNombre = '') {
    const modal = document.getElementById('formularioInventario');
    if (!modal) return;
    
    // Establecer fecha actual
    const fechaInput = document.getElementById('fechaMovimiento');
    if (fechaInput) {
        fechaInput.value = new Date().toISOString().split('T')[0];
    }
    
    // Si se pasa un producto, seleccionarlo
    if (productoNombre) {
        const selectProducto = document.getElementById('productoMovimiento');
        if (selectProducto) {
            selectProducto.value = productoNombre;
        }
    }
    
    modal.style.display = 'flex';
}

// Cerrar formulario de inventario
function cerrarFormularioInventario() {
    const modal = document.getElementById('formularioInventario');
    if (!modal) return;
    
    modal.style.display = 'none';
    document.getElementById('movimientoForm')?.reset();
    document.getElementById('grupoSolicitante').style.display = 'none';
}

// Toggle campo solicitante
function toggleSolicitante() {
    const tipo = document.getElementById('tipoMovimiento')?.value;
    const grupo = document.getElementById('grupoSolicitante');
    const input = document.getElementById('solicitanteMovimiento');
    
    if (tipo === 'salida') {
        grupo.style.display = 'block';
        if (input) input.required = true;
    } else {
        grupo.style.display = 'none';
        if (input) {
            input.required = false;
            input.value = '';
        }
    }
}

// Procesar movimiento de inventario
function procesarMovimientoInventario(event) {
    event.preventDefault();
    
    const tipo = document.getElementById('tipoMovimiento').value;
    const productoNombre = document.getElementById('productoMovimiento').value;
    const cantidad = parseFloat(document.getElementById('cantidadMovimiento').value);
    const unidad = document.getElementById('unidadMovimiento').value;
    const fecha = new Date(document.getElementById('fechaMovimiento').value);
    const solicitante = document.getElementById('solicitanteMovimiento').value;
    const observaciones = document.getElementById('observacionesMovimiento').value;
    
    // Buscar producto
    const producto = inventarioData.productos.find(p => p.nombre === productoNombre);
    if (!producto) {
        ToastNotification.show('Producto no encontrado', 'error', 2000);
        return;
    }
    
    // Validar unidad
    if (producto.unidad !== unidad) {
        ToastNotification.show(`La unidad debe ser ${producto.unidad}`, 'error', 2000);
        return;
    }
    
    // Validar solicitante para salidas
    if (tipo === 'salida' && !solicitante) {
        ToastNotification.show('Debe especificar quién solicita la salida', 'error', 2000);
        return;
    }
    
    // Calcular nuevos valores
    const saldoAnterior = producto.stockActual;
    let saldoFinal;
    
    if (tipo === 'entrada') {
        saldoFinal = saldoAnterior + cantidad;
        producto.ingresos += cantidad;
        producto.ultimaCompra = fecha;
    } else {
        saldoFinal = saldoAnterior - cantidad;
        if (saldoFinal < 0) {
            ToastNotification.show('No hay suficiente stock disponible', 'error', 2000);
            return;
        }
        producto.salidas += cantidad;
    }
    
    producto.stockActual = parseFloat(saldoFinal.toFixed(2));
    producto.estado = calcularEstadoInventario(
        producto.stockActual,
        producto.minimo,
        producto.seguridad,
        producto.adecuado
    );
    producto.desempeno = calcularDesempeno(
        producto.nombre,
        producto.stockActual,
        producto.adecuado
    );
    
    // Agregar movimiento
    const nuevoMovimiento = {
        id: inventarioData.movimientos.length + 1,
        fecha: fecha,
        producto: productoNombre,
        tipo: tipo,
        cantidad: cantidad,
        unidad: unidad,
        solicitante: tipo === 'salida' ? solicitante : null,
        saldoAnterior: saldoAnterior,
        saldoFinal: saldoFinal,
        observaciones: observaciones || ''
    };
    
    inventarioData.movimientos.unshift(nuevoMovimiento);
    
    // Ordenar movimientos por fecha
    inventarioData.movimientos.sort((a, b) => b.fecha - a.fecha);
    
    // Actualizar UI
    actualizarKPIsInventario();
    cargarTablaInventario();
    cargarHistorialMovimientos();
    
    // Cerrar formulario
    cerrarFormularioInventario();
    
    ToastNotification.show(
        `Movimiento registrado: ${tipo === 'entrada' ? 'Entrada' : 'Salida'} de ${cantidad} ${unidad} de ${productoNombre}`,
        'success',
        3000
    );
}

// Filtrar inventario
function filtrarInventario() {
    cargarTablaInventario();
}

// Crear gráficos de inventario
function crearGraficosInventario() {
    crearGraficoInventarioEstados();
    crearGraficoInventarioEvolucion();
    crearGraficoDesempenoPlanificacion();
}

// Gráfico 1: Distribución por Estado
function crearGraficoInventarioEstados() {
    const ctx = document.getElementById('chartInventarioEstados');
    if (!ctx || typeof Chart === 'undefined') return;
    
    if (chartInstances.chartInventarioEstados) {
        chartInstances.chartInventarioEstados.destroy();
    }
    
    const estados = {
        minimo: inventarioData.productos.filter(p => p.estado === 'minimo').length,
        seguridad: inventarioData.productos.filter(p => p.estado === 'seguridad').length,
        adecuado: inventarioData.productos.filter(p => p.estado === 'adecuado').length,
        sobrestock: inventarioData.productos.filter(p => p.estado === 'sobrestock').length
    };
    
    chartInstances.chartInventarioEstados = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Bajo Mínimo', 'En Seguridad', 'Stock Adecuado', 'Sobre Stock'],
            datasets: [{
                data: [estados.minimo, estados.seguridad, estados.adecuado, estados.sobrestock],
                backgroundColor: ['#ef4444', '#f97316', '#22c55e', '#3b82f6'],
                borderWidth: 2,
                borderColor: '#fff'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { position: 'bottom' },
                tooltip: {
                    callbacks: {
                        label: (context) => {
                            const total = inventarioData.productos.length;
                            const porcentaje = ((context.parsed / total) * 100).toFixed(1);
                            return `${context.label}: ${context.parsed} productos (${porcentaje}%)`;
                        }
                    }
                }
            }
        }
    });
}

// Gráfico 2: Evolución de Inventario
function crearGraficoInventarioEvolucion() {
    const ctx = document.getElementById('chartInventarioEvolucion');
    if (!ctx || typeof Chart === 'undefined') return;
    
    if (chartInstances.chartInventarioEvolucion) {
        chartInstances.chartInventarioEvolucion.destroy();
    }
    
    // Agrupar movimientos por fecha (últimos 30 días)
    const ultimos30Dias = [];
    const hoy = new Date();
    for (let i = 29; i >= 0; i--) {
        const fecha = new Date(hoy);
        fecha.setDate(fecha.getDate() - i);
        ultimos30Dias.push(fecha.toISOString().split('T')[0]);
    }
    
    const ingresos = ultimos30Dias.map(fecha => {
        return inventarioData.movimientos
            .filter(m => m.tipo === 'entrada' && m.fecha.toISOString().split('T')[0] === fecha)
            .reduce((sum, m) => sum + m.cantidad, 0);
    });
    
    const salidas = ultimos30Dias.map(fecha => {
        return inventarioData.movimientos
            .filter(m => m.tipo === 'salida' && m.fecha.toISOString().split('T')[0] === fecha)
            .reduce((sum, m) => sum + m.cantidad, 0);
    });
    
    chartInstances.chartInventarioEvolucion = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ultimos30Dias.map(f => new Date(f).toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit' })),
            datasets: [{
                label: 'Ingresos',
                data: ingresos,
                borderColor: '#22c55e',
                backgroundColor: 'rgba(34, 197, 94, 0.1)',
                borderWidth: 2,
                fill: true,
                tension: 0.4
            }, {
                label: 'Salidas',
                data: salidas,
                borderColor: '#ef4444',
                backgroundColor: 'rgba(239, 68, 68, 0.1)',
                borderWidth: 2,
                fill: true,
                tension: 0.4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { position: 'top' },
                tooltip: {
                    callbacks: {
                        label: (context) => {
                            return `${context.dataset.label}: ${context.parsed.y.toFixed(2)}`;
                        }
                    }
                }
            },
            scales: {
                y: { beginAtZero: true }
            }
        }
    });
}

// Gráfico 3: Desempeño vs Planificación
function crearGraficoDesempenoPlanificacion() {
    const ctx = document.getElementById('chartDesempenoPlanificacion');
    if (!ctx || typeof Chart === 'undefined') return;
    
    if (chartInstances.chartDesempenoPlanificacion) {
        chartInstances.chartDesempenoPlanificacion.destroy();
    }
    
    // Top 10 productos con mayor diferencia vs planificado
    const productosOrdenados = [...inventarioData.productos]
        .sort((a, b) => Math.abs(100 - parseFloat(b.desempeno.porcentaje)) - Math.abs(100 - parseFloat(a.desempeno.porcentaje)))
        .slice(0, 10);
    
    chartInstances.chartDesempenoPlanificacion = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: productosOrdenados.map(p => p.nombre),
            datasets: [{
                label: 'Desempeño vs Planificado (%)',
                data: productosOrdenados.map(p => parseFloat(p.desempeno.porcentaje)),
                backgroundColor: productosOrdenados.map(p => {
                    const porcentaje = parseFloat(p.desempeno.porcentaje);
                    if (porcentaje < 50) return '#ef4444';
                    if (porcentaje < 80) return '#f97316';
                    if (porcentaje <= 120) return '#22c55e';
                    if (porcentaje <= 150) return '#3b82f6';
                    return '#8b5cf6';
                }),
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            indexAxis: 'y',
            plugins: {
                legend: { display: false },
                tooltip: {
                    callbacks: {
                        label: (context) => {
                            const producto = productosOrdenados[context.dataIndex];
                            return `${context.parsed.x.toFixed(1)}% - ${producto.desempeno.mensaje}`;
                        }
                    }
                }
            },
            scales: {
                x: {
                    beginAtZero: true,
                    ticks: {
                        callback: (value) => value + '%'
                    }
                }
            }
        }
    });
}

// Exponer funciones globalmente
if (typeof window !== 'undefined') {
    window.mostrarFormularioInventario = mostrarFormularioInventario;
    window.cerrarFormularioInventario = cerrarFormularioInventario;
    window.toggleSolicitante = toggleSolicitante;
    window.procesarMovimientoInventario = procesarMovimientoInventario;
    window.filtrarInventario = filtrarInventario;
    window.inicializarModuloInventario = inicializarModuloInventario;
}

// ============================================
// MÓDULO DE COSTOS VARIABLES DE PRODUCCIÓN
// ============================================

// Estructura de datos de costos
const costosData = {
    costosDiarios: [],
    recetas: [],
    promedioIdeal: 0,
    categorias: {}
};

// Recetas con ingredientes y costos estándar (mock data)
const recetasMock = [
    {
        id: 1,
        nombre: 'Arroz con Frijoles',
        categoria: 'Plato Principal',
        ingredientes: [
            { producto: 'Arroz Premium', cantidad: 0.2, unidad: 'kg' },
            { producto: 'Frijoles Negros', cantidad: 0.15, unidad: 'kg' },
            { producto: 'Aceite', cantidad: 0.05, unidad: 'L' },
            { producto: 'Sal', cantidad: 0.01, unidad: 'kg' }
        ],
        costoIdeal: 8.50,
        rendimiento: 10 // porciones
    },
    {
        id: 2,
        nombre: 'Pollo Asado',
        categoria: 'Plato Principal',
        ingredientes: [
            { producto: 'Pollo', cantidad: 0.3, unidad: 'kg' },
            { producto: 'Aceite', cantidad: 0.03, unidad: 'L' },
            { producto: 'Sal', cantidad: 0.01, unidad: 'kg' },
            { producto: 'Cebolla', cantidad: 0.1, unidad: 'kg' }
        ],
        costoIdeal: 12.00,
        rendimiento: 8
    },
    {
        id: 3,
        nombre: 'Carne a la Plancha',
        categoria: 'Plato Principal',
        ingredientes: [
            { producto: 'Carne Res', cantidad: 0.25, unidad: 'kg' },
            { producto: 'Aceite', cantidad: 0.02, unidad: 'L' },
            { producto: 'Sal', cantidad: 0.01, unidad: 'kg' }
        ],
        costoIdeal: 15.50,
        rendimiento: 6
    },
    {
        id: 4,
        nombre: 'Ensalada Mixta',
        categoria: 'Acompañamiento',
        ingredientes: [
            { producto: 'Lechuga', cantidad: 0.1, unidad: 'kg' },
            { producto: 'Tomates', cantidad: 0.08, unidad: 'kg' },
            { producto: 'Cebolla', cantidad: 0.05, unidad: 'kg' },
            { producto: 'Aceite', cantidad: 0.02, unidad: 'L' }
        ],
        costoIdeal: 3.50,
        rendimiento: 12
    },
    {
        id: 5,
        nombre: 'Sopa de Verduras',
        categoria: 'Sopa',
        ingredientes: [
            { producto: 'Papa', cantidad: 0.2, unidad: 'kg' },
            { producto: 'Cebolla', cantidad: 0.1, unidad: 'kg' },
            { producto: 'Zanahoria', cantidad: 0.1, unidad: 'kg' },
            { producto: 'Sal', cantidad: 0.01, unidad: 'kg' }
        ],
        costoIdeal: 4.00,
        rendimiento: 15
    }
];

// Generar datos mock de costos
function generarDatosMockCostos() {
    const hoy = new Date();
    const ultimos7Dias = [];
    
    // Generar costos para los últimos 7 días
    for (let i = 6; i >= 0; i--) {
        const fecha = new Date(hoy);
        fecha.setDate(fecha.getDate() - i);
        
        const costosDelDia = [];
        let costoTotalDia = 0;
        
        // Generar costos para cada receta del día
        recetasMock.forEach(receta => {
            const cantidad = Math.floor(Math.random() * 20) + 10; // 10-30 porciones
            const costoUnitario = receta.costoIdeal * (0.85 + Math.random() * 0.3); // Variación ±15%
            const costoTotal = costoUnitario * cantidad;
            const desviacion = ((costoUnitario - receta.costoIdeal) / receta.costoIdeal) * 100;
            
            costosDelDia.push({
                fecha: new Date(fecha),
                receta: receta.nombre,
                categoria: receta.categoria,
                cantidad: cantidad,
                costoUnitario: parseFloat(costoUnitario.toFixed(2)),
                costoTotal: parseFloat(costoTotal.toFixed(2)),
                costoIdeal: receta.costoIdeal,
                desviacion: parseFloat(desviacion.toFixed(2)),
                estado: desviacion > 10 ? 'alto' : desviacion < -10 ? 'bajo' : 'normal'
            });
            
            costoTotalDia += costoTotal;
        });
        
        costosData.costosDiarios.push({
            fecha: new Date(fecha),
            costoTotal: parseFloat(costoTotalDia.toFixed(2)),
            detalle: costosDelDia
        });
    }
    
    // Calcular promedio ideal
    const promedioIdeal = costosData.costosDiarios.reduce((sum, dia) => sum + dia.costoTotal, 0) / costosData.costosDiarios.length;
    costosData.promedioIdeal = parseFloat(promedioIdeal.toFixed(2));
    
    // Calcular costos por categoría
    costosData.categorias = {};
    costosData.costosDiarios.forEach(dia => {
        dia.detalle.forEach(costo => {
            if (!costosData.categorias[costo.categoria]) {
                costosData.categorias[costo.categoria] = 0;
            }
            costosData.categorias[costo.categoria] += costo.costoTotal;
        });
    });
    
    // Calcular promedios por categoría
    Object.keys(costosData.categorias).forEach(cat => {
        costosData.categorias[cat] = parseFloat((costosData.categorias[cat] / costosData.costosDiarios.length).toFixed(2));
    });
}

// Calcular costos basados en facturas y recetas
function calcularCostosDesdeFacturas() {
    // Obtener precios promedio de facturas
    const preciosProductos = {};
    
    if (typeof comprasData !== 'undefined' && comprasData.facturas) {
        comprasData.facturas.forEach(factura => {
            if (factura.productos) {
                factura.productos.forEach(prod => {
                    if (!preciosProductos[prod.producto]) {
                        preciosProductos[prod.producto] = [];
                    }
                    preciosProductos[prod.producto].push(prod.precioUnitario);
                });
            }
        });
    }
    
    // Calcular precio promedio por producto
    const preciosPromedio = {};
    Object.keys(preciosProductos).forEach(producto => {
        const precios = preciosProductos[producto];
        const promedio = precios.reduce((a, b) => a + b, 0) / precios.length;
        preciosPromedio[producto] = parseFloat(promedio.toFixed(2));
    });
    
    // Actualizar costos de recetas basados en precios reales
    recetasMock.forEach(receta => {
        let costoCalculado = 0;
        receta.ingredientes.forEach(ing => {
            const precio = preciosPromedio[ing.producto] || 0;
            costoCalculado += precio * ing.cantidad;
        });
        if (costoCalculado > 0) {
            receta.costoIdeal = parseFloat((costoCalculado / receta.rendimiento).toFixed(2));
        }
    });
}

// Inicializar módulo de costos
function inicializarModuloCostos() {
    console.log('💰 Inicializando módulo de costos variables...');
    
    // Calcular costos desde facturas
    calcularCostosDesdeFacturas();
    
    // Generar datos mock si no existen
    if (costosData.costosDiarios.length === 0) {
        generarDatosMockCostos();
    }
    
    // Actualizar KPIs
    actualizarKPIsCostos();
    
    // Cargar tabla de costos
    cargarTablaCostos();
    
    // Cargar categorías
    cargarCostosPorCategoria();
    
    // Crear gráficos
    crearGraficosCostos();
}

// Actualizar KPIs de costos
function actualizarKPIsCostos() {
    const hoy = new Date();
    const hoyStr = hoy.toISOString().split('T')[0];
    
    const costoHoy = costosData.costosDiarios.find(d => 
        d.fecha.toISOString().split('T')[0] === hoyStr
    );
    
    const costoTotalHoy = costoHoy ? costoHoy.costoTotal : 0;
    const promedioIdeal = costosData.promedioIdeal;
    const desviacion = costoTotalHoy > 0 ? ((costoTotalHoy - promedioIdeal) / promedioIdeal) * 100 : 0;
    const eficiencia = costoTotalHoy > 0 ? ((promedioIdeal / costoTotalHoy) * 100) : 0;
    
    // Actualizar valores
    document.getElementById('kpiCostoTotal').textContent = `$${costoTotalHoy.toFixed(2)}`;
    document.getElementById('kpiPromedioIdeal').textContent = `$${promedioIdeal.toFixed(2)}`;
    document.getElementById('kpiDesviacion').textContent = `${desviacion >= 0 ? '+' : ''}${desviacion.toFixed(1)}%`;
    document.getElementById('kpiEficiencia').textContent = `${eficiencia.toFixed(1)}%`;
    
    // Actualizar tendencias
    const costoTotalTrend = document.getElementById('kpiCostoTotalTrend');
    const desviacionTrend = document.getElementById('kpiDesviacionTrend');
    const eficienciaTrend = document.getElementById('kpiEficienciaTrend');
    
    if (costoTotalTrend) {
        costoTotalTrend.className = 'kpi-trend ' + (desviacion > 0 ? 'negative' : 'positive');
        costoTotalTrend.textContent = desviacion > 0 ? `↑ +${desviacion.toFixed(1)}%` : `↓ ${desviacion.toFixed(1)}%`;
    }
    
    if (desviacionTrend) {
        desviacionTrend.className = 'kpi-trend ' + (Math.abs(desviacion) > 10 ? 'negative' : 'positive');
        desviacionTrend.textContent = Math.abs(desviacion) > 10 ? '⚠️ Atención' : '✅ Normal';
    }
    
    if (eficienciaTrend) {
        eficienciaTrend.className = 'kpi-trend ' + (eficiencia >= 90 ? 'positive' : eficiencia >= 80 ? 'neutral' : 'negative');
        eficienciaTrend.textContent = eficiencia >= 90 ? '✅ Óptimo' : eficiencia >= 80 ? '⚠️ Regular' : '❌ Bajo';
    }
}

// Cargar tabla de costos
function cargarTablaCostos() {
    const tbody = document.getElementById('tablaCostosBody');
    if (!tbody) return;
    
    const filtroFecha = document.getElementById('filtroFechaCostos')?.value || 'hoy';
    const busqueda = document.getElementById('buscarReceta')?.value.toLowerCase() || '';
    
    const hoy = new Date();
    let fechaInicio = new Date(hoy);
    
    if (filtroFecha === 'semana') {
        fechaInicio.setDate(fechaInicio.getDate() - 7);
    } else if (filtroFecha === 'mes') {
        fechaInicio.setMonth(fechaInicio.getMonth() - 1);
    } else {
        fechaInicio = new Date(hoy);
        fechaInicio.setHours(0, 0, 0, 0);
    }
    
    let costosFiltrados = [];
    costosData.costosDiarios.forEach(dia => {
        if (dia.fecha >= fechaInicio) {
            dia.detalle.forEach(costo => {
                if (!busqueda || costo.receta.toLowerCase().includes(busqueda)) {
                    costosFiltrados.push({ ...costo, fecha: dia.fecha });
                }
            });
        }
    });
    
    // Ordenar por fecha (más reciente primero)
    costosFiltrados.sort((a, b) => b.fecha - a.fecha);
    
    tbody.innerHTML = costosFiltrados.map(c => {
        const estadoClass = {
            'alto': 'estado-alto',
            'bajo': 'estado-bajo',
            'normal': 'estado-normal'
        }[c.estado] || '';
        
        const estadoLabel = {
            'alto': '🔴 Alto',
            'bajo': '🟢 Bajo',
            'normal': '🟡 Normal'
        }[c.estado] || '';
        
        const desviacionClass = Math.abs(c.desviacion) > 10 ? 'desviacion-alta' : Math.abs(c.desviacion) > 5 ? 'desviacion-media' : 'desviacion-baja';
        
        return `
            <tr>
                <td>${c.fecha.toLocaleDateString('es-ES')}</td>
                <td><strong>${c.receta}</strong><br><small>${c.categoria}</small></td>
                <td>${c.cantidad} porciones</td>
                <td>$${c.costoUnitario.toFixed(2)}</td>
                <td><strong>$${c.costoTotal.toFixed(2)}</strong></td>
                <td>
                    <span class="desviacion-badge ${desviacionClass}">
                        ${c.desviacion >= 0 ? '+' : ''}${c.desviacion.toFixed(1)}%
                    </span>
                </td>
                <td><span class="badge ${estadoClass}">${estadoLabel}</span></td>
            </tr>
        `;
    }).join('');
}

// Cargar costos por categoría
function cargarCostosPorCategoria() {
    const grid = document.getElementById('categoriasGrid');
    if (!grid) return;
    
    grid.innerHTML = Object.keys(costosData.categorias).map(categoria => {
        const costo = costosData.categorias[categoria];
        const porcentaje = (costo / costosData.promedioIdeal) * 100;
        
        return `
            <div class="categoria-card">
                <div class="categoria-header">
                    <h3>${categoria}</h3>
                    <span class="categoria-costo">$${costo.toFixed(2)}</span>
                </div>
                <div class="categoria-bar">
                    <div class="categoria-bar-fill" style="width: ${Math.min(porcentaje, 100)}%;"></div>
                </div>
                <p class="categoria-porcentaje">${porcentaje.toFixed(1)}% del total</p>
            </div>
        `;
    }).join('');
}

// Crear gráficos de costos
function crearGraficosCostos() {
    crearGraficoCostoDiario();
    crearGraficoDesviacionPromedio();
    crearGraficoCostosReceta();
    crearGraficoTendenciaCostos();
}

// Gráfico 1: Costo Variable Total del Día
function crearGraficoCostoDiario() {
    const ctx = document.getElementById('chartCostoDiario');
    if (!ctx || typeof Chart === 'undefined') return;
    
    if (chartInstances.chartCostoDiario) {
        chartInstances.chartCostoDiario.destroy();
    }
    
    const ultimos7Dias = costosData.costosDiarios.slice(-7);
    const labels = ultimos7Dias.map(d => d.fecha.toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit' }));
    const costos = ultimos7Dias.map(d => d.costoTotal);
    const promedioIdeal = costosData.promedioIdeal;
    
    chartInstances.chartCostoDiario = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Costo Total del Día',
                data: costos,
                backgroundColor: costos.map(c => {
                    const desv = ((c - promedioIdeal) / promedioIdeal) * 100;
                    if (desv > 10) return '#ef4444';
                    if (desv < -10) return '#22c55e';
                    return '#3b82f6';
                }),
                borderColor: costos.map(c => {
                    const desv = ((c - promedioIdeal) / promedioIdeal) * 100;
                    if (desv > 10) return '#dc2626';
                    if (desv < -10) return '#16a34a';
                    return '#2563eb';
                }),
                borderWidth: 2
            }, {
                label: 'Promedio Ideal',
                data: Array(7).fill(promedioIdeal),
                type: 'line',
                borderColor: '#f59e0b',
                borderWidth: 2,
                borderDash: [5, 5],
                fill: false,
                pointRadius: 0
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { position: 'top' },
                tooltip: {
                    callbacks: {
                        label: (context) => {
                            if (context.datasetIndex === 0) {
                                const desv = ((context.parsed.y - promedioIdeal) / promedioIdeal) * 100;
                                return `Costo: $${context.parsed.y.toFixed(2)} (${desv >= 0 ? '+' : ''}${desv.toFixed(1)}%)`;
                            }
                            return `Promedio Ideal: $${context.parsed.y.toFixed(2)}`;
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: false,
                    ticks: {
                        callback: (value) => '$' + value.toFixed(0)
                    }
                }
            }
        }
    });
}

// Gráfico 2: Desviación del Promedio Ideal
function crearGraficoDesviacionPromedio() {
    const ctx = document.getElementById('chartDesviacionPromedio');
    if (!ctx || typeof Chart === 'undefined') return;
    
    if (chartInstances.chartDesviacionPromedio) {
        chartInstances.chartDesviacionPromedio.destroy();
    }
    
    const ultimos7Dias = costosData.costosDiarios.slice(-7);
    const labels = ultimos7Dias.map(d => d.fecha.toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit' }));
    const desviaciones = ultimos7Dias.map(d => ((d.costoTotal - costosData.promedioIdeal) / costosData.promedioIdeal) * 100);
    
    chartInstances.chartDesviacionPromedio = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Desviación (%)',
                data: desviaciones,
                borderColor: '#8b5cf6',
                backgroundColor: 'rgba(139, 92, 246, 0.1)',
                borderWidth: 3,
                fill: true,
                tension: 0.4,
                pointRadius: 4,
                pointHoverRadius: 6,
                pointBackgroundColor: '#8b5cf6',
                pointBorderColor: '#fff',
                pointBorderWidth: 2
            }, {
                label: 'Límite Superior (+10%)',
                data: Array(7).fill(10),
                type: 'line',
                borderColor: '#ef4444',
                borderWidth: 1,
                borderDash: [5, 5],
                fill: false,
                pointRadius: 0
            }, {
                label: 'Límite Inferior (-10%)',
                data: Array(7).fill(-10),
                type: 'line',
                borderColor: '#ef4444',
                borderWidth: 1,
                borderDash: [5, 5],
                fill: false,
                pointRadius: 0
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { position: 'top' },
                tooltip: {
                    callbacks: {
                        label: (context) => {
                            if (context.datasetIndex === 0) {
                                return `Desviación: ${context.parsed.y >= 0 ? '+' : ''}${context.parsed.y.toFixed(1)}%`;
                            }
                            return context.dataset.label;
                        }
                    }
                }
            },
            scales: {
                y: {
                    ticks: {
                        callback: (value) => value + '%'
                    }
                }
            }
        }
    });
}

// Gráfico 3: Costos por Receta
function crearGraficoCostosReceta() {
    const ctx = document.getElementById('chartCostosReceta');
    if (!ctx || typeof Chart === 'undefined') return;
    
    if (chartInstances.chartCostosReceta) {
        chartInstances.chartCostosReceta.destroy();
    }
    
    // Agrupar costos por receta (últimos 7 días)
    const costosPorReceta = {};
    costosData.costosDiarios.slice(-7).forEach(dia => {
        dia.detalle.forEach(costo => {
            if (!costosPorReceta[costo.receta]) {
                costosPorReceta[costo.receta] = { total: 0, cantidad: 0, ideal: costo.costoIdeal };
            }
            costosPorReceta[costo.receta].total += costo.costoTotal;
            costosPorReceta[costo.receta].cantidad += costo.cantidad;
        });
    });
    
    const recetas = Object.keys(costosPorReceta);
    const costosPromedio = recetas.map(r => costosPorReceta[r].total / 7);
    const costosIdeales = recetas.map(r => costosPorReceta[r].ideal * (costosPorReceta[r].cantidad / 7));
    
    chartInstances.chartCostosReceta = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: recetas,
            datasets: [{
                label: 'Costo Real Promedio',
                data: costosPromedio,
                backgroundColor: '#3b82f6',
                borderColor: '#2563eb',
                borderWidth: 2
            }, {
                label: 'Costo Ideal',
                data: costosIdeales,
                backgroundColor: '#22c55e',
                borderColor: '#16a34a',
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            indexAxis: 'y',
            plugins: {
                legend: { position: 'top' },
                tooltip: {
                    callbacks: {
                        label: (context) => {
                            return `${context.dataset.label}: $${context.parsed.x.toFixed(2)}`;
                        }
                    }
                }
            },
            scales: {
                x: {
                    beginAtZero: true,
                    ticks: {
                        callback: (value) => '$' + value.toFixed(0)
                    }
                }
            }
        }
    });
}

// Gráfico 4: Tendencia de Costos (7 días)
function crearGraficoTendenciaCostos() {
    const ctx = document.getElementById('chartTendenciaCostos');
    if (!ctx || typeof Chart === 'undefined') return;
    
    if (chartInstances.chartTendenciaCostos) {
        chartInstances.chartTendenciaCostos.destroy();
    }
    
    const ultimos7Dias = costosData.costosDiarios.slice(-7);
    const labels = ultimos7Dias.map(d => d.fecha.toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit' }));
    const costos = ultimos7Dias.map(d => d.costoTotal);
    
    // Calcular media móvil
    const mediaMovil = [];
    for (let i = 0; i < costos.length; i++) {
        const inicio = Math.max(0, i - 2);
        const fin = i + 1;
        const promedio = costos.slice(inicio, fin).reduce((a, b) => a + b, 0) / (fin - inicio);
        mediaMovil.push(promedio);
    }
    
    chartInstances.chartTendenciaCostos = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Costo Total',
                data: costos,
                borderColor: '#3b82f6',
                backgroundColor: 'rgba(59, 130, 246, 0.1)',
                borderWidth: 2,
                fill: true,
                tension: 0.4,
                pointRadius: 4,
                pointHoverRadius: 6
            }, {
                label: 'Media Móvil (3 días)',
                data: mediaMovil,
                borderColor: '#f59e0b',
                backgroundColor: 'transparent',
                borderWidth: 2,
                borderDash: [5, 5],
                fill: false,
                pointRadius: 3
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { position: 'top' },
                tooltip: {
                    callbacks: {
                        label: (context) => {
                            return `${context.dataset.label}: $${context.parsed.y.toFixed(2)}`;
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: false,
                    ticks: {
                        callback: (value) => '$' + value.toFixed(0)
                    }
                }
            }
        }
    });
}

// Actualizar costos
function actualizarCostos() {
    calcularCostosDesdeFacturas();
    generarDatosMockCostos();
    actualizarKPIsCostos();
    cargarTablaCostos();
    cargarCostosPorCategoria();
    crearGraficosCostos();
    ToastNotification.show('Costos actualizados correctamente', 'success', 2000);
}

// Filtrar costos
function filtrarCostos() {
    cargarTablaCostos();
}

// Exponer funciones globalmente
if (typeof window !== 'undefined') {
    window.inicializarModuloCostos = inicializarModuloCostos;
    window.actualizarCostos = actualizarCostos;
    window.filtrarCostos = filtrarCostos;
}

// ============================================
// MÓDULO DE PLANIFICACIÓN EJECUTIVO
// ============================================

// Estructura de datos de planificación
const planificacionData = {
    menus: {}, // { '2025-01-15': { desayuno: [], almuerzo: [], cena: [] } }
    recetas: [], // Recetas maestras
    fechaActual: new Date(),
    vistaActual: 'mes'
};

// Recetas maestras con productos
const recetasMaestras = [
    {
        id: 1,
        nombre: 'Arroz con Frijoles',
        categoria: 'plato-principal',
        rendimiento: 10,
        productos: [
            { producto: 'Arroz Premium', cantidad: 0.2, unidad: 'kg' },
            { producto: 'Frijoles Negros', cantidad: 0.15, unidad: 'kg' },
            { producto: 'Aceite', cantidad: 0.05, unidad: 'L' },
            { producto: 'Sal', cantidad: 0.01, unidad: 'kg' }
        ],
        costoPorcion: 8.50
    },
    {
        id: 2,
        nombre: 'Pollo Asado',
        categoria: 'plato-principal',
        rendimiento: 8,
        productos: [
            { producto: 'Pollo', cantidad: 0.3, unidad: 'kg' },
            { producto: 'Aceite', cantidad: 0.03, unidad: 'L' },
            { producto: 'Sal', cantidad: 0.01, unidad: 'kg' },
            { producto: 'Cebolla', cantidad: 0.1, unidad: 'kg' }
        ],
        costoPorcion: 12.00
    },
    {
        id: 3,
        nombre: 'Jugo de Sandía',
        categoria: 'bebida',
        rendimiento: 15,
        productos: [
            { producto: 'Sandía', cantidad: 0.5, unidad: 'kg' },
            { producto: 'Azúcar', cantidad: 0.05, unidad: 'kg' }
        ],
        costoPorcion: 2.50
    },
    {
        id: 4,
        nombre: 'Flan de Vainilla',
        categoria: 'postre',
        rendimiento: 12,
        productos: [
            { producto: 'Huevos', cantidad: 0.5, unidad: 'kg' },
            { producto: 'Leche', cantidad: 0.5, unidad: 'L' },
            { producto: 'Azúcar', cantidad: 0.1, unidad: 'kg' },
            { producto: 'Vainilla', cantidad: 0.01, unidad: 'L' }
        ],
        costoPorcion: 3.00
    },
    {
        id: 5,
        nombre: 'Ensalada Mixta',
        categoria: 'ensalada',
        rendimiento: 12,
        productos: [
            { producto: 'Lechuga', cantidad: 0.1, unidad: 'kg' },
            { producto: 'Tomates', cantidad: 0.08, unidad: 'kg' },
            { producto: 'Cebolla', cantidad: 0.05, unidad: 'kg' },
            { producto: 'Aceite', cantidad: 0.02, unidad: 'L' }
        ],
        costoPorcion: 3.50
    },
    {
        id: 6,
        nombre: 'Sopa de Verduras',
        categoria: 'sopa',
        rendimiento: 15,
        productos: [
            { producto: 'Papa', cantidad: 0.2, unidad: 'kg' },
            { producto: 'Cebolla', cantidad: 0.1, unidad: 'kg' },
            { producto: 'Zanahoria', cantidad: 0.1, unidad: 'kg' },
            { producto: 'Sal', cantidad: 0.01, unidad: 'kg' }
        ],
        costoPorcion: 4.00
    }
];

// Inicializar módulo de planificación
function inicializarModuloPlanificacion() {
    console.log('📅 Inicializando módulo de planificación ejecutivo...');
    
    // Cargar recetas maestras
    planificacionData.recetas = [...recetasMaestras];
    
    // Generar datos mock de planificación
    generarDatosMockPlanificacion();
    
    // Renderizar calendario
    renderizarCalendario();
    
    // Cargar vista actual
    cambiarVista(planificacionData.vistaActual);
    
    // Actualizar resumen
    actualizarResumenPlanificacion();
}

// Generar datos mock de planificación
function generarDatosMockPlanificacion() {
    const hoy = new Date();
    const fechaInicio = new Date(hoy.getFullYear(), hoy.getMonth(), 1);
    const fechaFin = new Date(hoy.getFullYear(), hoy.getMonth() + 1, 0);
    
    for (let d = new Date(fechaInicio); d <= fechaFin; d.setDate(d.getDate() + 1)) {
        const fechaStr = d.toISOString().split('T')[0];
        const diaSemana = d.getDay();
        
        // Solo planificar días laborables (lunes a viernes)
        if (diaSemana >= 1 && diaSemana <= 5) {
            planificacionData.menus[fechaStr] = {
                desayuno: [
                    { recetaId: 1, cantidad: 1, nombre: 'Arroz con Frijoles' },
                    { recetaId: 3, cantidad: 1, nombre: 'Jugo de Sandía' }
                ],
                almuerzo: [
                    { recetaId: 2, cantidad: 1, nombre: 'Pollo Asado' },
                    { recetaId: 5, cantidad: 1, nombre: 'Ensalada Mixta' },
                    { recetaId: 4, cantidad: 1, nombre: 'Flan de Vainilla' }
                ],
                cena: [
                    { recetaId: 6, cantidad: 1, nombre: 'Sopa de Verduras' },
                    { recetaId: 1, cantidad: 1, nombre: 'Arroz con Frijoles' }
                ]
            };
        }
    }
}

// Renderizar calendario mensual
function renderizarCalendario() {
    const calendarioDias = document.getElementById('calendarioDias');
    const mesActual = document.getElementById('mesActual');
    if (!calendarioDias || !mesActual) return;
    
    const fecha = planificacionData.fechaActual;
    const año = fecha.getFullYear();
    const mes = fecha.getMonth();
    
    // Actualizar mes en header
    const meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
    mesActual.textContent = `${meses[mes]} ${año}`;
    
    // Primer día del mes
    const primerDia = new Date(año, mes, 1);
    const ultimoDia = new Date(año, mes + 1, 0);
    const diasEnMes = ultimoDia.getDate();
    const diaInicioSemana = primerDia.getDay() === 0 ? 6 : primerDia.getDay() - 1; // Lunes = 0
    
    let html = '';
    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);
    
    // Días vacíos al inicio
    for (let i = 0; i < diaInicioSemana; i++) {
        html += '<div class="cal-dia empty"></div>';
    }
    
    // Días del mes
    for (let dia = 1; dia <= diasEnMes; dia++) {
        const fechaDia = new Date(año, mes, dia);
        const fechaStr = fechaDia.toISOString().split('T')[0];
        const esHoy = fechaDia.getTime() === hoy.getTime();
        const menu = planificacionData.menus[fechaStr] || { desayuno: [], almuerzo: [], cena: [] };
        const totalRecetas = menu.desayuno.length + menu.almuerzo.length + menu.cena.length;
        
        html += `
            <div class="cal-dia ${esHoy ? 'hoy' : ''}" onclick="seleccionarDia('${fechaStr}')">
                <div class="cal-dia-numero">${dia}</div>
                <div class="cal-dia-recetas">
                    ${totalRecetas > 0 ? `
                        <span class="receta-badge desayuno">${menu.desayuno.length}</span>
                        <span class="receta-badge almuerzo">${menu.almuerzo.length}</span>
                        <span class="receta-badge cena">${menu.cena.length}</span>
                    ` : '<span class="sin-recetas">Sin planificar</span>'}
                </div>
            </div>
        `;
    }
    
    calendarioDias.innerHTML = html;
}

// Seleccionar día
function seleccionarDia(fechaStr) {
    planificacionData.fechaSeleccionada = fechaStr;
    cambiarVista('dia');
    cargarVistaDia(fechaStr);
}

// Cambiar vista
function cambiarVista(vista) {
    planificacionData.vistaActual = vista;
    
    // Ocultar todas las vistas
    document.querySelectorAll('.vista-calendario').forEach(v => {
        v.style.display = 'none';
        v.classList.remove('active');
    });
    
    // Mostrar vista seleccionada
    const vistaEl = document.getElementById(`vista${vista.charAt(0).toUpperCase() + vista.slice(1)}`);
    if (vistaEl) {
        vistaEl.style.display = 'block';
        vistaEl.classList.add('active');
    }
    
    // Actualizar botones
    document.querySelectorAll('.view-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.vista === vista) {
            btn.classList.add('active');
        }
    });
    
    // Cargar datos según vista
    if (vista === 'mes') {
        renderizarCalendario();
    } else if (vista === 'semana') {
        cargarVistaSemana();
    } else if (vista === 'dia') {
        const fecha = planificacionData.fechaSeleccionada || planificacionData.fechaActual.toISOString().split('T')[0];
        cargarVistaDia(fecha);
    }
    
    actualizarResumenPlanificacion();
}

// Cargar vista día
function cargarVistaDia(fechaStr) {
    const fecha = new Date(fechaStr);
    const diaActual = document.getElementById('diaActual');
    if (diaActual) {
        const diasSemana = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
        const meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
        diaActual.textContent = `${diasSemana[fecha.getDay()]}, ${fecha.getDate()} de ${meses[fecha.getMonth()]} ${fecha.getFullYear()}`;
    }
    
    const menu = planificacionData.menus[fechaStr] || { desayuno: [], almuerzo: [], cena: [] };
    
    // Guardar fecha seleccionada
    planificacionData.fechaSeleccionada = fechaStr;
    
    // Cargar recetas por comida
    cargarRecetasComida('desayuno', menu.desayuno, fechaStr);
    cargarRecetasComida('almuerzo', menu.almuerzo, fechaStr);
    cargarRecetasComida('cena', menu.cena, fechaStr);
}

// Cargar recetas de una comida
function cargarRecetasComida(comida, recetas, fechaStr) {
    const container = document.getElementById(`recetas${comida.charAt(0).toUpperCase() + comida.slice(1)}`);
    if (!container) return;
    
    if (recetas.length === 0) {
        container.innerHTML = `
            <div class="receta-empty">
                <p>No hay recetas planificadas</p>
                <button class="btn-add-small" onclick="abrirModalReceta('${comida}')">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 5V19M5 12H19" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                    </svg>
                    Agregar Receta
                </button>
            </div>
        `;
        return;
    }
    
    container.innerHTML = recetas.map((rec, index) => {
        const receta = planificacionData.recetas.find(r => r.id === rec.recetaId) || recetasMaestras.find(r => r.id === rec.recetaId);
        return `
            <div class="receta-item-exec" data-receta-id="${rec.recetaId}" data-index="${index}">
                <div class="receta-item-header">
                    <div class="receta-info">
                        <h4>${rec.nombre || receta?.nombre || 'Receta'}</h4>
                        <span class="receta-categoria">${receta?.categoria || 'plato-principal'}</span>
                    </div>
                    <div class="receta-actions">
                        <button class="btn-icon-small" onclick="editarRecetaPlanificacion('${fechaStr}', '${comida}', ${index})" title="Editar">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M11 4H4C3.46957 4 2.96086 4.21071 2.58579 4.58579C2.21071 4.96086 2 5.46957 2 6V20C2 20.5304 2.21071 21.0391 2.58579 21.4142C2.96086 21.7893 3.46957 22 4 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V13" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M18.5 2.5C18.8978 2.10218 19.4374 1.87868 20 1.87868C20.5626 1.87868 21.1022 2.10218 21.5 2.5C21.8978 2.89782 22.1213 3.43739 22.1213 4C22.1213 4.56261 21.8978 5.10218 21.5 5.5L12 15L8 16L9 12L18.5 2.5Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                        </button>
                        <button class="btn-icon-small" onclick="eliminarRecetaPlanificacion('${fechaStr}', '${comida}', ${index})" title="Eliminar">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                        </button>
                    </div>
                </div>
                <div class="receta-details">
                    <div class="receta-detail-item">
                        <span class="detail-label">Rendimiento:</span>
                        <span class="detail-value">${receta?.rendimiento || 10} porciones</span>
                    </div>
                    <div class="receta-detail-item">
                        <span class="detail-label">Costo:</span>
                        <span class="detail-value">$${(receta?.costoPorcion || 0).toFixed(2)}/porción</span>
                    </div>
                    <div class="receta-productos">
                        <span class="detail-label">Productos:</span>
                        <div class="productos-tags">
                            ${(receta?.productos || []).map(p => `<span class="producto-tag">${p.producto} (${p.cantidad} ${p.unidad})</span>`).join('')}
                        </div>
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

// Abrir modal de receta
function abrirModalReceta(comida) {
    const modal = document.getElementById('modalReceta');
    const titulo = document.getElementById('modalRecetaTitulo');
    if (modal && titulo) {
        titulo.textContent = `Agregar Receta - ${comida.charAt(0).toUpperCase() + comida.slice(1)}`;
        modal.style.display = 'flex';
        planificacionData.comidaActual = comida;
        
        // Limpiar formulario
        document.getElementById('formReceta').reset();
        document.getElementById('productosRecetaList').innerHTML = '';
        document.getElementById('costoReceta').value = '0.00';
    }
}

// Cerrar modal de receta
function cerrarModalReceta() {
    const modal = document.getElementById('modalReceta');
    if (modal) {
        modal.style.display = 'none';
    }
}

// Agregar producto a receta
function agregarProductoReceta() {
    const container = document.getElementById('productosRecetaList');
    if (!container) return;
    
    const productosDisponibles = ['Arroz Premium', 'Frijoles Negros', 'Pollo', 'Aceite', 'Sal', 'Cebolla', 'Tomates', 'Lechuga', 'Papa', 'Zanahoria', 'Sandía', 'Azúcar', 'Huevos', 'Leche', 'Vainilla'];
    
    const productoItem = document.createElement('div');
    productoItem.className = 'producto-receta-item';
    productoItem.innerHTML = `
        <select class="producto-select" onchange="actualizarCostoReceta()">
            <option value="">Seleccionar producto...</option>
            ${productosDisponibles.map(p => `<option value="${p}">${p}</option>`).join('')}
        </select>
        <input type="number" class="producto-cantidad" placeholder="Cantidad" step="0.01" min="0" onchange="actualizarCostoReceta()">
        <select class="producto-unidad" onchange="actualizarCostoReceta()">
            <option value="kg">kg</option>
            <option value="L">L</option>
            <option value="unidad">unidad</option>
        </select>
        <button type="button" class="btn-remove-producto" onclick="this.parentElement.remove(); actualizarCostoReceta();">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
        </button>
    `;
    
    container.appendChild(productoItem);
}

// Actualizar costo de receta
function actualizarCostoReceta() {
    // Esta función calcularía el costo basado en productos e inventario
    // Por ahora es un placeholder
    const costoInput = document.getElementById('costoReceta');
    if (costoInput) {
        costoInput.value = '8.50'; // Mock
    }
}

// Guardar receta
function guardarReceta(event) {
    event.preventDefault();
    
    const nombre = document.getElementById('nombreReceta').value;
    const categoria = document.getElementById('categoriaReceta').value;
    const rendimiento = parseInt(document.getElementById('rendimientoReceta').value);
    const productos = [];
    
    // Recopilar productos
    document.querySelectorAll('.producto-receta-item').forEach(item => {
        const producto = item.querySelector('.producto-select').value;
        const cantidad = parseFloat(item.querySelector('.producto-cantidad').value);
        const unidad = item.querySelector('.producto-unidad').value;
        
        if (producto && cantidad > 0) {
            productos.push({ producto, cantidad, unidad });
        }
    });
    
    if (productos.length === 0) {
        ToastNotification.show('Debe agregar al menos un producto', 'warning', 3000);
        return;
    }
    
    // Crear nueva receta maestra
    const nuevaReceta = {
        id: Date.now(),
        nombre,
        categoria,
        rendimiento,
        productos,
        costoPorcion: parseFloat(document.getElementById('costoReceta').value) || 0
    };
    
    planificacionData.recetas.push(nuevaReceta);
    
    // Agregar a menú del día
    const fecha = planificacionData.fechaSeleccionada || planificacionData.fechaActual.toISOString().split('T')[0];
    const comida = planificacionData.comidaActual || 'almuerzo';
    
    if (!planificacionData.menus[fecha]) {
        planificacionData.menus[fecha] = { desayuno: [], almuerzo: [], cena: [] };
    }
    
    planificacionData.menus[fecha][comida].push({
        recetaId: nuevaReceta.id,
        cantidad: 1,
        nombre: nuevaReceta.nombre
    });
    
    // Guardar en memoria
    guardarPlanificacionEnMemoria();
    
    // Recargar vista
    cargarVistaDia(fecha);
    actualizarResumenPlanificacion();
    
    // Cerrar modal
    cerrarModalReceta();
    
    ToastNotification.show('Receta agregada correctamente', 'success', 2000);
}

// Eliminar receta de planificación
function eliminarRecetaPlanificacion(fecha, comida, index) {
    if (planificacionData.menus[fecha] && planificacionData.menus[fecha][comida]) {
        planificacionData.menus[fecha][comida].splice(index, 1);
        guardarPlanificacionEnMemoria();
        cargarVistaDia(fecha);
        actualizarResumenPlanificacion();
        ToastNotification.show('Receta eliminada', 'success', 2000);
    }
}

// Editar receta de planificación
function editarRecetaPlanificacion(fecha, comida, index) {
    const menu = planificacionData.menus[fecha];
    if (menu && menu[comida] && menu[comida][index]) {
        const recetaPlan = menu[comida][index];
        const receta = planificacionData.recetas.find(r => r.id === recetaPlan.recetaId);
        
        if (receta) {
            // Llenar formulario con datos de receta
            document.getElementById('nombreReceta').value = receta.nombre;
            document.getElementById('categoriaReceta').value = receta.categoria;
            document.getElementById('rendimientoReceta').value = receta.rendimiento;
            document.getElementById('costoReceta').value = receta.costoPorcion.toFixed(2);
            
            // Cargar productos
            const productosList = document.getElementById('productosRecetaList');
            productosList.innerHTML = '';
            receta.productos.forEach(prod => {
                agregarProductoReceta();
                const lastItem = productosList.lastElementChild;
                lastItem.querySelector('.producto-select').value = prod.producto;
                lastItem.querySelector('.producto-cantidad').value = prod.cantidad;
                lastItem.querySelector('.producto-unidad').value = prod.unidad;
            });
            
            // Abrir modal
            planificacionData.comidaActual = comida;
            planificacionData.recetaEditando = { fecha, comida, index };
            abrirModalReceta(comida);
        }
    }
}

// Actualizar resumen de planificación
function actualizarResumenPlanificacion() {
    let totalRecetas = 0;
    const productosAcumulados = {};
    let costoTotal = 0;
    
    Object.keys(planificacionData.menus).forEach(fecha => {
        const menu = planificacionData.menus[fecha];
        ['desayuno', 'almuerzo', 'cena'].forEach(comida => {
            menu[comida].forEach(recPlan => {
                totalRecetas++;
                const receta = planificacionData.recetas.find(r => r.id === recPlan.recetaId);
                if (receta) {
                    costoTotal += receta.costoPorcion * receta.rendimiento;
                    receta.productos.forEach(prod => {
                        if (!productosAcumulados[prod.producto]) {
                            productosAcumulados[prod.producto] = { cantidad: 0, unidad: prod.unidad };
                        }
                        productosAcumulados[prod.producto].cantidad += prod.cantidad;
                    });
                }
            });
        });
    });
    
    // Actualizar UI
    document.getElementById('totalRecetas').textContent = totalRecetas;
    document.getElementById('totalProductos').textContent = Object.keys(productosAcumulados).length;
    document.getElementById('costoEstimado').textContent = `$${costoTotal.toFixed(2)}`;
    
    // Actualizar lista de productos
    const productosList = document.getElementById('productosRequeridos');
    if (productosList) {
        productosList.innerHTML = Object.keys(productosAcumulados).map(producto => {
            const prod = productosAcumulados[producto];
            return `
                <div class="producto-item-sidebar">
                    <span class="producto-nombre">${producto}</span>
                    <span class="producto-cantidad">${prod.cantidad.toFixed(2)} ${prod.unidad}</span>
                </div>
            `;
        }).join('');
    }
}

// Generar lista de compras
function generarListaCompras() {
    const productosAcumulados = {};
    let costoTotal = 0;
    
    // Acumular productos de todas las recetas planificadas
    Object.keys(planificacionData.menus).forEach(fecha => {
        const menu = planificacionData.menus[fecha];
        ['desayuno', 'almuerzo', 'cena'].forEach(comida => {
            menu[comida].forEach(recPlan => {
                const receta = planificacionData.recetas.find(r => r.id === recPlan.recetaId);
                if (receta) {
                    costoTotal += receta.costoPorcion * receta.rendimiento;
                    receta.productos.forEach(prod => {
                        if (!productosAcumulados[prod.producto]) {
                            productosAcumulados[prod.producto] = { cantidad: 0, unidad: prod.unidad };
                        }
                        productosAcumulados[prod.producto].cantidad += prod.cantidad;
                    });
                }
            });
        });
    });
    
    // Contrastar con inventario
    const listaCompras = [];
    Object.keys(productosAcumulados).forEach(producto => {
        const necesario = productosAcumulados[producto];
        let stockActual = 0;
        
        // Buscar en inventario
        if (typeof inventarioData !== 'undefined' && inventarioData.productos) {
            const prodInventario = inventarioData.productos.find(p => p.nombre === producto);
            if (prodInventario) {
                stockActual = prodInventario.stockActual || 0;
            }
        }
        
        const diferencia = necesario.cantidad - stockActual;
        if (diferencia > 0) {
            listaCompras.push({
                producto,
                cantidad: diferencia,
                unidad: necesario.unidad,
                stockActual,
                necesario: necesario.cantidad
            });
        }
    });
    
    // Mostrar lista de compras
    if (listaCompras.length === 0) {
        ToastNotification.show('No se requieren compras adicionales', 'info', 3000);
        return;
    }
    
    // Guardar lista en memoria para que esté disponible en compras
    if (typeof MEMORIA_TEMPORAL !== 'undefined') {
        MEMORIA_TEMPORAL.guardar('listaComprasPlanificacion', listaCompras, 1);
        MEMORIA_TEMPORAL.guardar('costoTotalPlanificacion', costoTotal, 1);
    }
    
    // Navegar a módulo de compras y mostrar formulario
    navegar('compras');
    
    // Esperar a que se cargue el módulo de compras
    setTimeout(() => {
        mostrarFormularioListaCompras(listaCompras, costoTotal);
    }, 500);
}

// Vista anterior
function vistaAnterior() {
    if (planificacionData.vistaActual === 'mes') {
        planificacionData.fechaActual.setMonth(planificacionData.fechaActual.getMonth() - 1);
        renderizarCalendario();
    } else if (planificacionData.vistaActual === 'semana') {
        planificacionData.fechaActual.setDate(planificacionData.fechaActual.getDate() - 7);
        cargarVistaSemana();
    } else if (planificacionData.vistaActual === 'dia') {
        const fecha = new Date(planificacionData.fechaSeleccionada || planificacionData.fechaActual);
        fecha.setDate(fecha.getDate() - 1);
        planificacionData.fechaSeleccionada = fecha.toISOString().split('T')[0];
        cargarVistaDia(planificacionData.fechaSeleccionada);
    }
}

// Vista siguiente
function vistaSiguiente() {
    if (planificacionData.vistaActual === 'mes') {
        planificacionData.fechaActual.setMonth(planificacionData.fechaActual.getMonth() + 1);
        renderizarCalendario();
    } else if (planificacionData.vistaActual === 'semana') {
        planificacionData.fechaActual.setDate(planificacionData.fechaActual.getDate() + 7);
        cargarVistaSemana();
    } else if (planificacionData.vistaActual === 'dia') {
        const fecha = new Date(planificacionData.fechaSeleccionada || planificacionData.fechaActual);
        fecha.setDate(fecha.getDate() + 1);
        planificacionData.fechaSeleccionada = fecha.toISOString().split('T')[0];
        cargarVistaDia(planificacionData.fechaSeleccionada);
    }
}

// Cargar vista semana
function cargarVistaSemana() {
    const semanaDias = document.getElementById('semanaDias');
    const semanaDesayuno = document.getElementById('semanaDesayuno');
    const semanaAlmuerzo = document.getElementById('semanaAlmuerzo');
    const semanaCena = document.getElementById('semanaCena');
    
    if (!semanaDias || !semanaDesayuno || !semanaAlmuerzo || !semanaCena) return;
    
    // Calcular semana actual
    const fecha = planificacionData.fechaActual;
    const diaSemana = fecha.getDay();
    const diff = fecha.getDate() - diaSemana + (diaSemana === 0 ? -6 : 1); // Lunes
    const lunes = new Date(fecha.setDate(diff));
    
    // Generar días de la semana
    const diasSemana = [];
    for (let i = 0; i < 7; i++) {
        const dia = new Date(lunes);
        dia.setDate(lunes.getDate() + i);
        diasSemana.push(dia);
    }
    
    // Renderizar headers de días
    const diasNombres = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];
    semanaDias.innerHTML = diasSemana.map((dia, index) => {
        const fechaStr = dia.toISOString().split('T')[0];
        const esHoy = dia.toDateString() === new Date().toDateString();
        return `
            <div class="semana-dia-header ${esHoy ? 'hoy' : ''}">
                <div class="dia-nombre">${diasNombres[index]}</div>
                <div class="dia-numero">${dia.getDate()}</div>
            </div>
        `;
    }).join('');
    
    // Renderizar recetas por comida
    const renderizarRecetasSemana = (comida, container) => {
        container.innerHTML = diasSemana.map((dia, diaIndex) => {
            const fechaStr = dia.toISOString().split('T')[0];
            const menu = planificacionData.menus[fechaStr] || { desayuno: [], almuerzo: [], cena: [] };
            const recetas = menu[comida] || [];
            
            return `
                <div class="semana-dia-col" data-fecha="${fechaStr}" data-dia="${diaIndex}">
                    <div class="semana-recetas">
                        ${recetas.length > 0 ? recetas.map((rec, recIndex) => {
                            const receta = planificacionData.recetas.find(r => r.id === rec.recetaId) || recetasMaestras.find(r => r.id === rec.recetaId);
                            return `
                                <div class="semana-receta-item" onclick="seleccionarDia('${fechaStr}'); cambiarVista('dia');">
                                    <div class="semana-receta-nombre">${rec.nombre || receta?.nombre || 'Receta'}</div>
                                    <div class="semana-receta-info">
                                        <span>${receta?.rendimiento || 10} porc.</span>
                                    </div>
                                </div>
                            `;
                        }).join('') : `
                            <div class="semana-receta-empty" onclick="seleccionarDia('${fechaStr}'); cambiarVista('dia');">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M12 5V19M5 12H19" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                                </svg>
                            </div>
                        `}
                    </div>
                </div>
            `;
        }).join('');
    };
    
    renderizarRecetasSemana('desayuno', semanaDesayuno);
    renderizarRecetasSemana('almuerzo', semanaAlmuerzo);
    renderizarRecetasSemana('cena', semanaCena);
}

// Agregar receta día
function agregarRecetaDia() {
    const comida = prompt('Seleccione comida:\n1. Desayuno\n2. Almuerzo\n3. Cena', '2');
    const comidas = ['', 'desayuno', 'almuerzo', 'cena'];
    if (comida && comidas[parseInt(comida)]) {
        abrirModalReceta(comidas[parseInt(comida)]);
    }
}

// Exportar planificación
function exportarPlanificacion() {
    ToastNotification.show('Exportando planificación...', 'info', 2000);
    // Aquí se implementaría la exportación a Excel/PDF
}

// Duplicar semana
function duplicarSemana() {
    ToastNotification.show('Función de duplicar semana en desarrollo', 'info', 2000);
}

// Guardar planificación en memoria
function guardarPlanificacionEnMemoria() {
    if (typeof MEMORIA_TEMPORAL !== 'undefined') {
        MEMORIA_TEMPORAL.guardar('planificacionMenus', planificacionData.menus, 15);
        MEMORIA_TEMPORAL.guardar('planificacionRecetas', planificacionData.recetas, 15);
    }
}

// Recuperar planificación de memoria
function recuperarPlanificacionDeMemoria() {
    if (typeof MEMORIA_TEMPORAL !== 'undefined') {
        const menus = MEMORIA_TEMPORAL.recuperar('planificacionMenus');
        const recetas = MEMORIA_TEMPORAL.recuperar('planificacionRecetas');
        if (menus) planificacionData.menus = menus;
        if (recetas) planificacionData.recetas = recetas;
    }
}

// Mostrar formulario de lista de compras
function mostrarFormularioListaCompras(listaCompras, costoTotal) {
    const modal = document.getElementById('formularioListaCompras');
    const tbody = document.getElementById('productosListaComprasBody');
    const totalEl = document.getElementById('totalListaCompras');
    
    if (!modal || !tbody) return;
    
    // Llenar tabla de productos
    let totalEstimado = 0;
    tbody.innerHTML = listaCompras.map((item, index) => {
        // Obtener precio estimado del inventario o usar precio promedio
        let precioUnit = 15.00; // Precio por defecto
        if (typeof inventarioData !== 'undefined' && inventarioData.productos) {
            const prodInventario = inventarioData.productos.find(p => p.nombre === item.producto);
            if (prodInventario && prodInventario.ultimaCompra) {
                // Usar precio de última compra si está disponible
                precioUnit = prodInventario.ultimaCompra.precioUnit || 15.00;
            }
        }
        
        const subtotal = item.cantidad * precioUnit;
        totalEstimado += subtotal;
        
        return `
            <tr>
                <td><strong>${item.producto}</strong></td>
                <td>${item.necesario.toFixed(2)}</td>
                <td>${item.stockActual.toFixed(2)}</td>
                <td><strong>${item.cantidad.toFixed(2)}</strong></td>
                <td>${item.unidad}</td>
                <td>
                    <input type="number" class="precio-unit-input" value="${precioUnit.toFixed(2)}" step="0.01" min="0" 
                           data-index="${index}" onchange="actualizarTotalListaCompras()" style="width: 100px; padding: 0.5rem; border: 1px solid var(--border-color); border-radius: 0.5rem;">
                </td>
                <td class="subtotal-item" data-index="${index}">$${subtotal.toFixed(2)}</td>
            </tr>
        `;
    }).join('');
    
    // Actualizar total
    if (totalEl) {
        totalEl.textContent = `$${totalEstimado.toFixed(2)}`;
    }
    
    // Establecer fecha de entrega por defecto (3 días desde hoy)
    const fechaEntrega = document.getElementById('fechaEntregaLista');
    if (fechaEntrega) {
        const fecha = new Date();
        fecha.setDate(fecha.getDate() + 3);
        fechaEntrega.value = fecha.toISOString().split('T')[0];
    }
    
    // Mostrar modal
    modal.style.display = 'flex';
    
    // Guardar datos en variable global para actualización
    window.listaComprasActual = listaCompras;
}

// Actualizar total de lista de compras
function actualizarTotalListaCompras() {
    if (!window.listaComprasActual) return;
    
    let total = 0;
    window.listaComprasActual.forEach((item, index) => {
        const precioInput = document.querySelector(`.precio-unit-input[data-index="${index}"]`);
        const subtotalEl = document.querySelector(`.subtotal-item[data-index="${index}"]`);
        
        if (precioInput && subtotalEl) {
            const precio = parseFloat(precioInput.value) || 0;
            const subtotal = item.cantidad * precio;
            subtotalEl.textContent = `$${subtotal.toFixed(2)}`;
            total += subtotal;
        }
    });
    
    const totalEl = document.getElementById('totalListaCompras');
    if (totalEl) {
        totalEl.textContent = `$${total.toFixed(2)}`;
    }
}

// Cerrar formulario de lista de compras
function cerrarFormularioListaCompras() {
    const modal = document.getElementById('formularioListaCompras');
    if (modal) {
        modal.style.display = 'none';
    }
    window.listaComprasActual = null;
}

// Aprobar y enviar lista de compras
function aprobarYEnviarListaCompras(event) {
    event.preventDefault();
    
    if (!window.listaComprasActual || window.listaComprasActual.length === 0) {
        ToastNotification.show('No hay productos en la lista', 'warning', 3000);
        return;
    }
    
    const proveedor = document.getElementById('proveedorLista').value;
    const fechaEntrega = document.getElementById('fechaEntregaLista').value;
    const observaciones = document.getElementById('observacionesLista').value;
    
    // Calcular total final
    let totalFinal = 0;
    const productosFinales = window.listaComprasActual.map((item, index) => {
        const precioInput = document.querySelector(`.precio-unit-input[data-index="${index}"]`);
        const precio = parseFloat(precioInput.value) || 0;
        const subtotal = item.cantidad * precio;
        totalFinal += subtotal;
        
        return {
            producto: item.producto,
            cantidad: item.cantidad,
            unidad: item.unidad,
            precioUnit: precio,
            subtotal: subtotal
        };
    });
    
    // Crear pedido de compra
    const pedidoCompra = {
        id: Date.now(),
        proveedor: proveedor,
        fechaSolicitud: new Date().toISOString().split('T')[0],
        fechaEntrega: fechaEntrega,
        productos: productosFinales,
        total: totalFinal,
        observaciones: observaciones,
        estado: 'aprobado',
        origen: 'planificacion'
    };
    
    // Guardar en comprasData si existe
    if (typeof comprasData !== 'undefined') {
        if (!comprasData.pedidos) {
            comprasData.pedidos = [];
        }
        comprasData.pedidos.push(pedidoCompra);
    }
    
    // Guardar en memoria
    if (typeof MEMORIA_TEMPORAL !== 'undefined') {
        MEMORIA_TEMPORAL.guardar('pedidoCompraAprobado', pedidoCompra, 1);
    }
    
    // Mostrar mensaje de éxito
    ToastNotification.show('Lista de compras aprobada y enviada correctamente', 'success', 4000);
    
    // Cerrar modal
    cerrarFormularioListaCompras();
    
    // Limpiar lista de memoria
    if (typeof MEMORIA_TEMPORAL !== 'undefined') {
        MEMORIA_TEMPORAL.eliminar('listaComprasPlanificacion');
        MEMORIA_TEMPORAL.eliminar('costoTotalPlanificacion');
    }
    
    // Recargar lista de compras
    if (typeof cargarListaCompras === 'function') {
        cargarListaCompras();
    }
}

// Verificar si hay lista de compras pendiente al cargar módulo de compras
function verificarListaComprasPendiente() {
    if (typeof MEMORIA_TEMPORAL !== 'undefined') {
        const listaCompras = MEMORIA_TEMPORAL.recuperar('listaComprasPlanificacion');
        const costoTotal = MEMORIA_TEMPORAL.recuperar('costoTotalPlanificacion');
        
        if (listaCompras && listaCompras.length > 0) {
            setTimeout(() => {
                mostrarFormularioListaCompras(listaCompras, costoTotal || 0);
            }, 500);
        }
    }
}

// Exponer funciones globalmente
if (typeof window !== 'undefined') {
    window.inicializarModuloPlanificacion = inicializarModuloPlanificacion;
    window.cambiarVista = cambiarVista;
    window.seleccionarDia = seleccionarDia;
    window.abrirModalReceta = abrirModalReceta;
    window.cerrarModalReceta = cerrarModalReceta;
    window.agregarProductoReceta = agregarProductoReceta;
    window.guardarReceta = guardarReceta;
    window.eliminarRecetaPlanificacion = eliminarRecetaPlanificacion;
    window.editarRecetaPlanificacion = editarRecetaPlanificacion;
    window.generarListaCompras = generarListaCompras;
    window.vistaAnterior = vistaAnterior;
    window.vistaSiguiente = vistaSiguiente;
    window.agregarRecetaDia = agregarRecetaDia;
    window.exportarPlanificacion = exportarPlanificacion;
    window.duplicarSemana = duplicarSemana;
    window.actualizarCostoReceta = actualizarCostoReceta;
    window.mostrarFormularioListaCompras = mostrarFormularioListaCompras;
    window.cerrarFormularioListaCompras = cerrarFormularioListaCompras;
    window.aprobarYEnviarListaCompras = aprobarYEnviarListaCompras;
    window.actualizarTotalListaCompras = actualizarTotalListaCompras;
    window.verificarListaComprasPendiente = verificarListaComprasPendiente;
}

// Recuperar datos al cargar
window.addEventListener('DOMContentLoaded', function() {
    recuperarPlanificacionDeMemoria();
});

// ============================================
// MÓDULO DE PRODUCCIÓN
// ============================================

// Estructura de datos de producción
const produccionData = {
    registros: [] // Registros de producción diaria
};

// Generar datos mock de producción
function generarDatosMockProduccion() {
    const hoy = new Date();
    const recetas = ['Arroz con Frijoles', 'Pollo Asado', 'Carne a la Plancha', 'Ensalada Mixta', 'Sopa de Verduras', 'Flan de Vainilla'];
    const comidas = ['desayuno', 'almuerzo', 'cena'];
    const responsables = ['Juan Pérez', 'María González', 'Carlos Rodríguez', 'Ana Martínez'];
    
    produccionData.registros = [];
    
    // Generar registros para los últimos 7 días
    for (let i = 0; i < 7; i++) {
        const fecha = new Date(hoy);
        fecha.setDate(fecha.getDate() - i);
        const fechaStr = fecha.toISOString().split('T')[0];
        
        comidas.forEach(comida => {
            const numRecetas = Math.floor(Math.random() * 3) + 1;
            for (let j = 0; j < numRecetas; j++) {
                const receta = recetas[Math.floor(Math.random() * recetas.length)];
                const charolas = Math.floor(Math.random() * 50) + 20;
                const merma = Math.random() * 15 + 2; // 2-17%
                const comentarioMerma = merma > 10 ? 'Desperdicio por sobreproducción' : (merma > 5 ? 'Desperdicio normal' : 'Merma mínima');
                
                produccionData.registros.push({
                    id: Date.now() + Math.random(),
                    fecha: fechaStr,
                    comida: comida,
                    receta: receta,
                    charolas: charolas,
                    merma: parseFloat(merma.toFixed(2)),
                    comentarioMerma: comentarioMerma,
                    responsable: responsables[Math.floor(Math.random() * responsables.length)]
                });
            }
        });
    }
    
    // Ordenar por fecha (más recientes primero)
    produccionData.registros.sort((a, b) => new Date(b.fecha) - new Date(a.fecha));
}

// Inicializar módulo de producción
function inicializarModuloProduccion() {
    console.log('👨‍🍳 Inicializando módulo de producción...');
    
    // Recuperar datos desde memoria
    recuperarProduccionDeMemoria();
    
    // Generar datos mock si no existen
    if (produccionData.registros.length === 0) {
        generarDatosMockProduccion();
    }
    
    // Actualizar UI
    actualizarKPIsProduccion();
    actualizarResumenComidasProduccion();
    crearGraficosProduccion();
    cargarTablaProduccion();
}

// Actualizar KPIs de producción
function actualizarKPIsProduccion() {
    const hoy = new Date().toISOString().split('T')[0];
    const registrosHoy = produccionData.registros.filter(r => r.fecha === hoy);
    
    const totalCharolas = registrosHoy.reduce((sum, r) => sum + r.charolas, 0);
    const mermaPromedio = registrosHoy.length > 0 
        ? registrosHoy.reduce((sum, r) => sum + r.merma, 0) / registrosHoy.length 
        : 0;
    const recetasProducidas = registrosHoy.length;
    const eficiencia = mermaPromedio > 0 ? Math.max(0, 100 - mermaPromedio) : 100;
    
    if (document.getElementById('kpiTotalCharolas')) {
        document.getElementById('kpiTotalCharolas').textContent = totalCharolas;
    }
    if (document.getElementById('kpiMermaPromedio')) {
        document.getElementById('kpiMermaPromedio').textContent = mermaPromedio.toFixed(1) + '%';
    }
    if (document.getElementById('kpiRecetasProducidas')) {
        document.getElementById('kpiRecetasProducidas').textContent = recetasProducidas;
    }
    if (document.getElementById('kpiEficienciaProduccion')) {
        document.getElementById('kpiEficienciaProduccion').textContent = eficiencia.toFixed(1) + '%';
    }
}

// Actualizar resumen por comidas
function actualizarResumenComidasProduccion() {
    const hoy = new Date().toISOString().split('T')[0];
    const registrosHoy = produccionData.registros.filter(r => r.fecha === hoy);
    
    ['desayuno', 'almuerzo', 'cena'].forEach(comida => {
        const registrosComida = registrosHoy.filter(r => r.comida === comida);
        const totalCharolas = registrosComida.reduce((sum, r) => sum + r.charolas, 0);
        const totalRecetas = registrosComida.length;
        const mermaPromedio = registrosComida.length > 0 
            ? registrosComida.reduce((sum, r) => sum + r.merma, 0) / registrosComida.length 
            : 0;
        
        const card = document.querySelector(`.comida-resumen-card[data-comida="${comida}"]`);
        if (card) {
            const charolasEl = card.querySelector('.stat-comida:nth-child(1) .stat-value');
            const recetasEl = card.querySelector('.stat-comida:nth-child(2) .stat-value');
            const mermaEl = card.querySelector('.stat-comida:nth-child(3) .stat-value');
            
            if (charolasEl) charolasEl.textContent = totalCharolas;
            if (recetasEl) recetasEl.textContent = totalRecetas;
            if (mermaEl) mermaEl.textContent = mermaPromedio.toFixed(1) + '%';
        }
    });
}

// Crear gráficos de producción
function crearGraficosProduccion() {
    crearGraficoProduccionDiaria();
    crearGraficoMermaReceta();
    crearGraficoProduccionComida();
    crearGraficoTendenciaMerma();
}

// Gráfico de producción diaria
function crearGraficoProduccionDiaria() {
    const ctx = document.getElementById('chartProduccionDiaria');
    if (!ctx || typeof Chart === 'undefined') return;
    
    // Destruir gráfico existente
    if (chartInstances['chartProduccionDiaria']) {
        chartInstances['chartProduccionDiaria'].destroy();
    }
    
    // Agrupar por fecha
    const datosPorFecha = {};
    produccionData.registros.forEach(r => {
        if (!datosPorFecha[r.fecha]) {
            datosPorFecha[r.fecha] = 0;
        }
        datosPorFecha[r.fecha] += r.charolas;
    });
    
    const fechas = Object.keys(datosPorFecha).sort().slice(-7);
    const charolas = fechas.map(f => datosPorFecha[f] || 0);
    
    chartInstances['chartProduccionDiaria'] = new Chart(ctx, {
        type: 'line',
        data: {
            labels: fechas.map(f => new Date(f).toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit' })),
            datasets: [{
                label: 'Charolas Producidas',
                data: charolas,
                borderColor: 'rgb(59, 130, 246)',
                backgroundColor: 'rgba(59, 130, 246, 0.1)',
                tension: 0.4,
                fill: true
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false },
                tooltip: {
                    callbacks: {
                        label: (context) => `${context.parsed.y} charolas`
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: (value) => value + ' charolas'
                    }
                }
            }
        }
    });
}

// Gráfico de merma por receta
function crearGraficoMermaReceta() {
    const ctx = document.getElementById('chartMermaReceta');
    if (!ctx || typeof Chart === 'undefined') return;
    
    if (chartInstances['chartMermaReceta']) {
        chartInstances['chartMermaReceta'].destroy();
    }
    
    // Agrupar por receta
    const mermaPorReceta = {};
    produccionData.registros.forEach(r => {
        if (!mermaPorReceta[r.receta]) {
            mermaPorReceta[r.receta] = { total: 0, count: 0 };
        }
        mermaPorReceta[r.receta].total += r.merma;
        mermaPorReceta[r.receta].count++;
    });
    
    const recetas = Object.keys(mermaPorReceta);
    const mermas = recetas.map(r => mermaPorReceta[r].total / mermaPorReceta[r].count);
    
    chartInstances['chartMermaReceta'] = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: recetas,
            datasets: [{
                label: 'Merma Promedio (%)',
                data: mermas,
                backgroundColor: mermas.map(m => m > 10 ? 'rgba(239, 68, 68, 0.8)' : (m > 5 ? 'rgba(251, 191, 36, 0.8)' : 'rgba(34, 197, 94, 0.8)'))
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false },
                tooltip: {
                    callbacks: {
                        label: (context) => `${context.parsed.y.toFixed(1)}% merma`
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: (value) => value + '%'
                    }
                }
            }
        }
    });
}

// Gráfico de producción por comida
function crearGraficoProduccionComida() {
    const ctx = document.getElementById('chartProduccionComida');
    if (!ctx || typeof Chart === 'undefined') return;
    
    if (chartInstances['chartProduccionComida']) {
        chartInstances['chartProduccionComida'].destroy();
    }
    
    const comidas = ['desayuno', 'almuerzo', 'cena'];
    const charolas = comidas.map(c => 
        produccionData.registros.filter(r => r.comida === c).reduce((sum, r) => sum + r.charolas, 0)
    );
    
    chartInstances['chartProduccionComida'] = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: comidas.map(c => c.charAt(0).toUpperCase() + c.slice(1)),
            datasets: [{
                data: charolas,
                backgroundColor: [
                    'rgba(251, 191, 36, 0.8)',
                    'rgba(59, 130, 246, 0.8)',
                    'rgba(139, 92, 246, 0.8)'
                ]
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                tooltip: {
                    callbacks: {
                        label: (context) => `${context.label}: ${context.parsed} charolas`
                    }
                }
            }
        }
    });
}

// Gráfico de tendencia de merma
function crearGraficoTendenciaMerma() {
    const ctx = document.getElementById('chartTendenciaMerma');
    if (!ctx || typeof Chart === 'undefined') return;
    
    if (chartInstances['chartTendenciaMerma']) {
        chartInstances['chartTendenciaMerma'].destroy();
    }
    
    const datosPorFecha = {};
    produccionData.registros.forEach(r => {
        if (!datosPorFecha[r.fecha]) {
            datosPorFecha[r.fecha] = { total: 0, count: 0 };
        }
        datosPorFecha[r.fecha].total += r.merma;
        datosPorFecha[r.fecha].count++;
    });
    
    const fechas = Object.keys(datosPorFecha).sort().slice(-7);
    const mermas = fechas.map(f => datosPorFecha[f].total / datosPorFecha[f].count);
    
    chartInstances['chartTendenciaMerma'] = new Chart(ctx, {
        type: 'line',
        data: {
            labels: fechas.map(f => new Date(f).toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit' })),
            datasets: [{
                label: 'Merma Promedio (%)',
                data: mermas,
                borderColor: 'rgb(239, 68, 68)',
                backgroundColor: 'rgba(239, 68, 68, 0.1)',
                tension: 0.4,
                fill: true
            }, {
                label: 'Objetivo Ideal',
                data: new Array(fechas.length).fill(5),
                borderColor: 'rgb(34, 197, 94)',
                borderDash: [5, 5],
                borderWidth: 2,
                pointRadius: 0
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                tooltip: {
                    callbacks: {
                        label: (context) => {
                            if (context.datasetIndex === 0) {
                                return `Merma: ${context.parsed.y.toFixed(1)}%`;
                            }
                            return 'Objetivo: 5%';
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: (value) => value + '%'
                    }
                }
            }
        }
    });
}

// Cargar tabla de producción
function cargarTablaProduccion() {
    const tbody = document.getElementById('tablaProduccionBody');
    if (!tbody) return;
    
    const fechaFiltro = document.getElementById('filtroFechaProduccion')?.value;
    const comidaFiltro = document.getElementById('filtroComidaProduccion')?.value;
    const buscar = document.getElementById('buscarRecetaProduccion')?.value.toLowerCase() || '';
    
    let registrosFiltrados = produccionData.registros;
    
    if (fechaFiltro) {
        registrosFiltrados = registrosFiltrados.filter(r => r.fecha === fechaFiltro);
    }
    if (comidaFiltro) {
        registrosFiltrados = registrosFiltrados.filter(r => r.comida === comidaFiltro);
    }
    if (buscar) {
        registrosFiltrados = registrosFiltrados.filter(r => r.receta.toLowerCase().includes(buscar));
    }
    
    if (registrosFiltrados.length === 0) {
        tbody.innerHTML = '<tr><td colspan="8" style="text-align: center; padding: 2rem;">No hay registros de producción</td></tr>';
        return;
    }
    
    tbody.innerHTML = registrosFiltrados.map(reg => {
        const mermaClass = reg.merma > 10 ? 'merma-alta' : (reg.merma > 5 ? 'merma-media' : 'merma-baja');
        return `
            <tr>
                <td>${new Date(reg.fecha).toLocaleDateString('es-ES')}</td>
                <td><span class="badge-comida ${reg.comida}">${reg.comida.charAt(0).toUpperCase() + reg.comida.slice(1)}</span></td>
                <td><strong>${reg.receta}</strong></td>
                <td>${reg.charolas}</td>
                <td><span class="merma-badge ${mermaClass}">${reg.merma.toFixed(1)}%</span></td>
                <td>
                    <div class="comentario-merma">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M21 15C21 15.5304 20.7893 16.0391 20.4142 16.4142C20.0391 16.7893 19.5304 17 19 17H7L3 21V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H19C19.5304 3 20.0391 3.21071 20.4142 3.58579C20.7893 3.96086 21 4.46957 21 5V15Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                        ${reg.comentarioMerma}
                    </div>
                </td>
                <td>${reg.responsable}</td>
                <td>
                    <button class="btn-icon-small" onclick="editarRegistroProduccion('${reg.id}')" title="Editar">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M11 4H4C3.46957 4 2.96086 4.21071 2.58579 4.58579C2.21071 4.96086 2 5.46957 2 6V20C2 20.5304 2.21071 21.0391 2.58579 21.4142C2.96086 21.7893 3.46957 22 4 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V13" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M18.5 2.5C18.8978 2.10218 19.4374 1.87868 20 1.87868C20.5626 1.87868 21.1022 2.10218 21.5 2.5C21.8978 2.89782 22.1213 3.43739 22.1213 4C22.1213 4.56261 21.8978 5.10218 21.5 5.5L12 15L8 16L9 12L18.5 2.5Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </button>
                </td>
            </tr>
        `;
    }).join('');
}

// Filtrar producción
function filtrarProduccion() {
    cargarTablaProduccion();
}

// Mostrar simulador de producción
function mostrarSimuladorProduccion() {
    const modal = document.getElementById('simuladorProduccion');
    if (modal) {
        modal.style.display = 'flex';
    }
}

// Cerrar simulador de producción
function cerrarSimuladorProduccion() {
    const modal = document.getElementById('simuladorProduccion');
    if (modal) {
        modal.style.display = 'none';
        document.getElementById('mensajeProduccion').value = '';
    }
}

// Procesar mensaje de producción
function procesarMensajeProduccion() {
    const input = document.getElementById('mensajeProduccion');
    const mensaje = input.value.trim();
    
    if (!mensaje) return;
    
    // Simular procesamiento de mensaje WhatsApp
    // Formato esperado: "Receta: Arroz con Frijoles, Charolas: 50, Merma: 5%, Comentario: Normal"
    const regex = /Receta:\s*([^,]+),\s*Charolas:\s*(\d+),\s*Merma:\s*([\d.]+)%(?:,\s*Comentario:\s*(.+))?/i;
    const match = mensaje.match(regex);
    
    if (!match) {
        ToastNotification.show('Formato incorrecto. Usa: "Receta: [nombre], Charolas: [número], Merma: [%], Comentario: [texto]"', 'warning', 4000);
        return;
    }
    
    const receta = match[1].trim();
    const charolas = parseInt(match[2]);
    const merma = parseFloat(match[3]);
    const comentario = match[4]?.trim() || 'Sin comentarios';
    
    // Agregar registro
    const nuevoRegistro = {
        id: Date.now(),
        fecha: new Date().toISOString().split('T')[0],
        comida: 'almuerzo', // Por defecto, se podría detectar del mensaje
        receta: receta,
        charolas: charolas,
        merma: merma,
        comentarioMerma: comentario,
        responsable: 'Usuario WhatsApp'
    };
    
    produccionData.registros.unshift(nuevoRegistro);
    
    // Guardar en memoria
    guardarProduccionEnMemoria();
    
    // Actualizar UI
    actualizarKPIsProduccion();
    actualizarResumenComidasProduccion();
    crearGraficosProduccion();
    cargarTablaProduccion();
    
    // Limpiar input
    input.value = '';
    
    // Mostrar respuesta simulada
    const mensajesContainer = document.getElementById('mensajesProduccion');
    if (mensajesContainer) {
        const respuesta = document.createElement('div');
        respuesta.className = 'message received';
        respuesta.innerHTML = `
            <div class="message-content">
                <p>✅ Registro guardado:<br>${receta} - ${charolas} charolas - ${merma}% merma</p>
            </div>
            <div class="message-time">Ahora</div>
        `;
        mensajesContainer.appendChild(respuesta);
        mensajesContainer.scrollTop = mensajesContainer.scrollHeight;
    }
    
    ToastNotification.show('Producción registrada correctamente', 'success', 3000);
}

// Usar ejemplo de producción
function usarEjemploProduccion() {
    const input = document.getElementById('mensajeProduccion');
    input.value = 'Receta: Arroz con Frijoles, Charolas: 50, Merma: 5%, Comentario: Producción normal';
}

// Editar registro de producción (placeholder)
function editarRegistroProduccion(id) {
    ToastNotification.show('Función de edición en desarrollo', 'info', 2000);
}

// Guardar producción en memoria
function guardarProduccionEnMemoria() {
    if (typeof MEMORIA_TEMPORAL !== 'undefined') {
        MEMORIA_TEMPORAL.guardar('produccionRegistros', produccionData.registros, 15);
    }
}

// Recuperar producción de memoria
function recuperarProduccionDeMemoria() {
    if (typeof MEMORIA_TEMPORAL !== 'undefined') {
        const registros = MEMORIA_TEMPORAL.recuperar('produccionRegistros');
        if (registros) {
            produccionData.registros = registros;
        }
    }
}

// Exponer funciones globalmente
if (typeof window !== 'undefined') {
    window.inicializarModuloProduccion = inicializarModuloProduccion;
    window.mostrarSimuladorProduccion = mostrarSimuladorProduccion;
    window.cerrarSimuladorProduccion = cerrarSimuladorProduccion;
    window.procesarMensajeProduccion = procesarMensajeProduccion;
    window.usarEjemploProduccion = usarEjemploProduccion;
    window.filtrarProduccion = filtrarProduccion;
    window.editarRegistroProduccion = editarRegistroProduccion;
}

// ============================================
// GRÁFICOS INNOVADORES DEL DASHBOARD
// ============================================

// Gráfico Principal: Tendencia de Producción y Costos
function crearGraficoTendenciaPrincipal() {
    const ctx = document.getElementById('chartTendenciaPrincipal');
    if (!ctx || typeof Chart === 'undefined') {
        console.warn('Chart.js no disponible o canvas no encontrado');
        return;
    }
    
    // Destruir instancia anterior si existe
    if (chartInstances.chartTendenciaPrincipal) {
        try {
            chartInstances.chartTendenciaPrincipal.destroy();
        } catch (e) {
            console.warn('Error al destruir gráfico anterior:', e);
        }
    }
    
    // Generar datos mock realistas para 30 días
    const dias = [];
    const produccion = [];
    const costos = [];
    const hoy = new Date();
    
    // Valores base con tendencia realista
    let baseProd = 70;
    let baseCosto = 950;
    
    for (let i = 29; i >= 0; i--) {
        const fecha = new Date(hoy);
        fecha.setDate(fecha.getDate() - i);
        dias.push(fecha.toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit' }));
        
        // Simular variación realista con tendencia suave
        const variacionProd = (Math.random() - 0.5) * 8;
        baseProd = Math.max(65, Math.min(85, baseProd + variacionProd * 0.15));
        produccion.push(Math.round(baseProd));
        
        const variacionCosto = (Math.random() - 0.5) * 150;
        baseCosto = Math.max(850, Math.min(1100, baseCosto + variacionCosto * 0.15));
        costos.push(Math.round(baseCosto));
    }
    
    // Calcular rangos dinámicos
    const minProd = Math.min(...produccion);
    const maxProd = Math.max(...produccion);
    const minCosto = Math.min(...costos);
    const maxCosto = Math.max(...costos);
    
    const paddingProd = (maxProd - minProd) * 0.15;
    const paddingCosto = (maxCosto - minCosto) * 0.15;
    
    try {
        chartInstances.chartTendenciaPrincipal = new Chart(ctx, {
            type: 'line',
            data: {
                labels: dias,
                datasets: [{
                    label: 'Producción (Charolas)',
                    data: produccion,
                    borderColor: '#3b82f6',
                    backgroundColor: 'rgba(59, 130, 246, 0.08)',
                    borderWidth: 3,
                    fill: true,
                    tension: 0.35,
                    pointRadius: 0,
                    pointHoverRadius: 7,
                    pointBackgroundColor: '#3b82f6',
                    pointBorderColor: '#ffffff',
                    pointBorderWidth: 2,
                    pointHoverBorderWidth: 3,
                    yAxisID: 'y',
                    order: 1
                }, {
                    label: 'Costos ($)',
                    data: costos,
                    borderColor: '#10b981',
                    backgroundColor: 'rgba(16, 185, 129, 0.08)',
                    borderWidth: 3,
                    fill: true,
                    tension: 0.35,
                    pointRadius: 0,
                    pointHoverRadius: 7,
                    pointBackgroundColor: '#10b981',
                    pointBorderColor: '#ffffff',
                    pointBorderWidth: 2,
                    pointHoverBorderWidth: 3,
                    yAxisID: 'y1',
                    order: 2
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                layout: {
                    padding: {
                        top: 10,
                        right: 15,
                        bottom: 10,
                        left: 10
                    }
                },
                interaction: {
                    mode: 'index',
                    intersect: false
                },
                plugins: {
                    legend: {
                        display: true,
                        position: 'top',
                        align: 'end',
                        labels: {
                            usePointStyle: true,
                            pointStyle: 'circle',
                            padding: 15,
                            font: { 
                                size: 12, 
                                weight: '600',
                                family: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
                            },
                            color: '#1e293b'
                        }
                    },
                    tooltip: {
                        enabled: true,
                        backgroundColor: 'rgba(15, 23, 42, 0.95)',
                        padding: 12,
                        titleFont: { 
                            size: 13, 
                            weight: '700',
                            family: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
                        },
                        bodyFont: { 
                            size: 12,
                            family: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
                        },
                        borderColor: 'rgba(255, 255, 255, 0.1)',
                        borderWidth: 1,
                        cornerRadius: 8,
                        displayColors: true,
                        callbacks: {
                            title: function(context) {
                                return `Fecha: ${context[0].label}`;
                            },
                            label: function(context) {
                                if (context.datasetIndex === 0) {
                                    return `Producción: ${context.parsed.y} charolas`;
                                } else {
                                    return `Costos: $${context.parsed.y.toLocaleString('es-ES')}`;
                                }
                            }
                        }
                    }
                },
                scales: {
                    x: {
                        grid: {
                            display: true,
                            color: 'rgba(0, 0, 0, 0.04)',
                            drawBorder: false,
                            drawOnChartArea: true
                        },
                        ticks: {
                            maxRotation: 0,
                            minRotation: 0,
                            font: { 
                                size: 10,
                                family: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
                            },
                            color: '#64748b',
                            maxTicksLimit: 12,
                            padding: 8
                        }
                    },
                    y: {
                        type: 'linear',
                        display: true,
                        position: 'left',
                        beginAtZero: false,
                        min: Math.max(0, minProd - paddingProd),
                        max: maxProd + paddingProd,
                        title: {
                            display: true,
                            text: 'Producción (Charolas)',
                            font: { 
                                size: 11, 
                                weight: '600',
                                family: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
                            },
                            color: '#3b82f6',
                            padding: { top: 5, bottom: 5 }
                        },
                        grid: {
                            color: 'rgba(59, 130, 246, 0.08)',
                            drawBorder: false,
                            drawOnChartArea: true
                        },
                        ticks: {
                            color: '#3b82f6',
                            font: { 
                                size: 10,
                                family: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
                            },
                            stepSize: Math.ceil((maxProd - minProd) / 6),
                            padding: 8,
                            callback: function(value) {
                                return value;
                            }
                        }
                    },
                    y1: {
                        type: 'linear',
                        display: true,
                        position: 'right',
                        beginAtZero: false,
                        min: Math.max(0, minCosto - paddingCosto),
                        max: maxCosto + paddingCosto,
                        title: {
                            display: true,
                            text: 'Costos ($)',
                            font: { 
                                size: 11, 
                                weight: '600',
                                family: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
                            },
                            color: '#10b981',
                            padding: { top: 5, bottom: 5 }
                        },
                        grid: {
                            drawOnChartArea: false,
                            drawBorder: false
                        },
                        ticks: {
                            color: '#10b981',
                            font: { 
                                size: 10,
                                family: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
                            },
                            stepSize: Math.ceil((maxCosto - minCosto) / 6),
                            padding: 8,
                            callback: function(value) {
                                return '$' + value.toLocaleString('es-ES');
                            }
                        }
                    }
                },
                animation: {
                    duration: 1200,
                    easing: 'easeOutQuart'
                }
            }
        });
        
        console.log('✅ Gráfico de Tendencia Principal creado exitosamente');
    } catch (error) {
        console.error('❌ Error al crear gráfico de tendencia:', error);
    }
}

// Gráfico de Eficiencia por Módulo (Radar Chart)
function crearGraficoEficienciaModulos() {
    const ctx = document.getElementById('chartEficienciaModulos');
    if (!ctx || typeof Chart === 'undefined') return;
    
    if (chartInstances.chartEficienciaModulos) {
        chartInstances.chartEficienciaModulos.destroy();
    }
    
    chartInstances.chartEficienciaModulos = new Chart(ctx, {
        type: 'radar',
        data: {
            labels: ['Compras', 'Inventario', 'Producción', 'Calidad', 'Costos', 'Satisfacción'],
            datasets: [{
                label: 'Eficiencia Actual',
                data: [92, 88, 87, 94, 85, 91],
                borderColor: '#3b82f6',
                backgroundColor: 'rgba(59, 130, 246, 0.2)',
                borderWidth: 3,
                pointBackgroundColor: '#3b82f6',
                pointBorderColor: '#fff',
                pointBorderWidth: 2,
                pointRadius: 5,
                pointHoverRadius: 8
            }, {
                label: 'Objetivo',
                data: [95, 90, 90, 95, 90, 93],
                borderColor: '#10b981',
                backgroundColor: 'rgba(16, 185, 129, 0.1)',
                borderWidth: 2,
                borderDash: [5, 5],
                pointBackgroundColor: '#10b981',
                pointBorderColor: '#fff',
                pointBorderWidth: 2,
                pointRadius: 4,
                pointHoverRadius: 7
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        usePointStyle: true,
                        padding: 15,
                        font: { size: 12, weight: '600' }
                    }
                },
                tooltip: {
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    padding: 12,
                    callbacks: {
                        label: function(context) {
                            return `${context.dataset.label}: ${context.parsed.r}%`;
                        }
                    }
                }
            },
            scales: {
                r: {
                    beginAtZero: true,
                    max: 100,
                    ticks: {
                        stepSize: 20,
                        font: { size: 11 },
                        color: '#6b7280'
                    },
                    grid: {
                        color: 'rgba(107, 114, 128, 0.1)'
                    },
                    pointLabels: {
                        font: { size: 12, weight: '600' },
                        color: '#374151'
                    }
                }
            },
            animation: {
                duration: 2000,
                easing: 'easeInOutQuart'
            }
        }
    });
}

// Heatmap de Actividad Semanal
function crearGraficoHeatmap() {
    const ctx = document.getElementById('chartHeatmap');
    if (!ctx || typeof Chart === 'undefined') return;
    
    if (chartInstances.chartHeatmap) {
        chartInstances.chartHeatmap.destroy();
    }
    
    const dias = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];
    const comidas = ['Desayuno', 'Almuerzo', 'Cena'];
    
    // Generar datos mock para heatmap
    const datasets = comidas.map((comida, idx) => {
        return {
            label: comida,
            data: dias.map(() => Math.floor(Math.random() * 50) + 30),
            backgroundColor: idx === 0 ? 'rgba(245, 158, 11, 0.8)' : idx === 1 ? 'rgba(59, 130, 246, 0.8)' : 'rgba(99, 102, 241, 0.8)',
            borderColor: idx === 0 ? '#d97706' : idx === 1 ? '#2563eb' : '#4f46e5',
            borderWidth: 2
        };
    });
    
    chartInstances.chartHeatmap = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: dias,
            datasets: datasets
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            indexAxis: 'x',
            scales: {
                x: {
                    stacked: true,
                    grid: { display: false }
                },
                y: {
                    stacked: true,
                    beginAtZero: true,
                    max: 100,
                    title: {
                        display: true,
                        text: 'Intensidad de Producción (%)',
                        font: { size: 12, weight: '600' }
                    }
                }
            },
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        usePointStyle: true,
                        padding: 15
                    }
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return `${context.dataset.label}: ${context.parsed.y}% intensidad`;
                        }
                    }
                }
            },
            animation: {
                duration: 2000,
                easing: 'easeInOutQuart'
            }
        }
    });
}

// Gráfico de Desviaciones
function crearGraficoDesviaciones() {
    const ctx = document.getElementById('chartDesviaciones');
    if (!ctx || typeof Chart === 'undefined') return;
    
    if (chartInstances.chartDesviaciones) {
        chartInstances.chartDesviaciones.destroy();
    }
    
    const categorias = ['Costos', 'Producción', 'Merma', 'Inventario', 'Satisfacción'];
    const desviaciones = categorias.map(() => (Math.random() * 20 - 10).toFixed(1));
    
    chartInstances.chartDesviaciones = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: categorias,
            datasets: [{
                label: 'Desviación (%)',
                data: desviaciones,
                backgroundColor: (ctx) => {
                    const value = ctx.parsed.y;
                    if (value > 5) return 'rgba(239, 68, 68, 0.8)';
                    if (value < -5) return 'rgba(16, 185, 129, 0.8)';
                    return 'rgba(59, 130, 246, 0.8)';
                },
                borderColor: (ctx) => {
                    const value = ctx.parsed.y;
                    if (value > 5) return '#dc2626';
                    if (value < -5) return '#059669';
                    return '#2563eb';
                },
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            indexAxis: 'y',
            plugins: {
                legend: { display: false },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const valor = parseFloat(context.parsed.x);
                            const estado = valor > 5 ? '⚠️ Alta' : valor < -5 ? '✅ Favorable' : '✓ Normal';
                            return `${estado}: ${valor > 0 ? '+' : ''}${valor}%`;
                        }
                    }
                }
            },
            scales: {
                x: {
                    beginAtZero: true,
                    grid: {
                        color: 'rgba(107, 114, 128, 0.1)'
                    },
                    ticks: {
                        callback: function(value) {
                            return (value > 0 ? '+' : '') + value + '%';
                        }
                    }
                },
                y: {
                    grid: { display: false }
                }
            },
            animation: {
                duration: 2000,
                easing: 'easeInOutQuart'
            }
        }
    });
}

// Gráfico de ROI por Categoría
function crearGraficoROI() {
    const ctx = document.getElementById('chartROI');
    if (!ctx || typeof Chart === 'undefined') return;
    
    if (chartInstances.chartROI) {
        chartInstances.chartROI.destroy();
    }
    
    const categorias = ['Carnes', 'Verduras', 'Granos', 'Bebidas', 'Postres'];
    const roi = categorias.map(() => (Math.random() * 30 + 10).toFixed(1));
    
    chartInstances.chartROI = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: categorias,
            datasets: [{
                data: roi,
                backgroundColor: [
                    'rgba(239, 68, 68, 0.8)',
                    'rgba(16, 185, 129, 0.8)',
                    'rgba(245, 158, 11, 0.8)',
                    'rgba(59, 130, 246, 0.8)',
                    'rgba(139, 92, 246, 0.8)'
                ],
                borderColor: [
                    '#dc2626',
                    '#059669',
                    '#d97706',
                    '#2563eb',
                    '#7c3aed'
                ],
                borderWidth: 3,
                hoverOffset: 15
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            cutout: '60%',
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        usePointStyle: true,
                        padding: 15,
                        font: { size: 12 }
                    }
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return `${context.label}: ${context.parsed}% ROI`;
                        }
                    }
                }
            },
            animation: {
                animateRotate: true,
                animateScale: true,
                duration: 2000,
                easing: 'easeInOutQuart'
            }
        }
    });
}

// Exponer funciones globalmente
if (typeof window !== 'undefined') {
    window.actualizarDashboard = actualizarDashboard;
    window.exportarDashboard = exportarDashboard;
    window.toggleChartView = toggleChartView;
}

// ============================================
// MÓDULO DE CONTROL DE CALIDAD
// ============================================

// Estructura de datos de calidad
const calidadData = {
    verificaciones: [] // Historial de verificaciones
};

// Generar datos mock de órdenes de compra para calidad
function generarDatosMockOrdenesCompra() {
    if (!comprasData.ordenesCompra) {
        comprasData.ordenesCompra = [];
    }

    // Si ya hay órdenes (más de 4 para tener variedad), no generar más
    // Pero si hay menos de 4, regenerar para asegurar datos suficientes
    if (comprasData.ordenesCompra.length >= 4) {
        console.log(`📦 Ya existen ${comprasData.ordenesCompra.length} órdenes de compra, no se generan más`);
        return;
    }
    
    // Limpiar órdenes existentes si hay menos de 4
    if (comprasData.ordenesCompra.length > 0 && comprasData.ordenesCompra.length < 4) {
        console.log(`🔄 Regenerando órdenes de compra (solo había ${comprasData.ordenesCompra.length})`);
        comprasData.ordenesCompra = [];
    }

    const proveedores = ['Distribuidora Alimentos SA', 'Carnes Premium Ltda', 'Verduras Frescas SL', 'Granos y Cereales SA', 'Productos Lácteos del Sur'];
    const productosBase = [
        { nombre: 'Arroz Premium', unidad: 'kg', precioBase: 2.50 },
        { nombre: 'Frijoles Negros', unidad: 'kg', precioBase: 3.20 },
        { nombre: 'Pollo Entero', unidad: 'kg', precioBase: 4.50 },
        { nombre: 'Carne Res', unidad: 'kg', precioBase: 8.00 },
        { nombre: 'Lechuga', unidad: 'kg', precioBase: 1.80 },
        { nombre: 'Tomates', unidad: 'kg', precioBase: 2.20 },
        { nombre: 'Cebolla', unidad: 'kg', precioBase: 1.50 },
        { nombre: 'Aceite Vegetal', unidad: 'L', precioBase: 3.50 },
        { nombre: 'Huevos', unidad: 'unidad', precioBase: 0.15 },
        { nombre: 'Leche Entera', unidad: 'L', precioBase: 1.20 }
    ];

    // Generar 8 órdenes con diferentes estados
    const estados = ['pendiente_verificacion', 'pendiente_verificacion', 'pendiente_verificacion', 'pendiente_verificacion', 'aprobada', 'aprobada', 'rechazada', 'rechazada'];
    
    for (let i = 0; i < 8; i++) {
        const proveedor = proveedores[Math.floor(Math.random() * proveedores.length)];
        const fechaFactura = new Date();
        fechaFactura.setDate(fechaFactura.getDate() - Math.floor(Math.random() * 10)); // Últimos 10 días

        // Seleccionar 3-6 productos aleatorios
        const numProductos = Math.floor(Math.random() * 4) + 3;
        const productosSeleccionados = [];
        const productosUsados = new Set();

        for (let j = 0; j < numProductos; j++) {
            let producto;
            do {
                producto = productosBase[Math.floor(Math.random() * productosBase.length)];
            } while (productosUsados.has(producto.nombre));

            productosUsados.add(producto.nombre);

            const cantidad = producto.unidad === 'unidad'
                ? Math.floor(Math.random() * 200) + 50
                : Math.random() * 50 + 10;
            const precioUnit = producto.precioBase * (0.9 + Math.random() * 0.2); // Variación ±10%

            productosSeleccionados.push({
                producto: producto.nombre,
                cantidad: parseFloat(cantidad.toFixed(2)),
                unidad: producto.unidad,
                precioUnit: parseFloat(precioUnit.toFixed(2)),
                subtotal: parseFloat((cantidad * precioUnit).toFixed(2))
            });
        }

        const total = productosSeleccionados.reduce((sum, p) => sum + p.subtotal, 0);
        const estado = estados[i];
        
        // Generar datos de verificación si está aprobada o rechazada
        let verificacionCalidad = null;
        if (estado === 'aprobada' || estado === 'rechazada') {
            const fechaVerificacion = new Date(fechaFactura);
            fechaVerificacion.setDate(fechaVerificacion.getDate() + 1);
            
            verificacionCalidad = {
                fechaVerificacion: fechaVerificacion.toISOString(),
                verificador: estado === 'aprobada' ? 'María González' : 'Carlos Rodríguez',
                observaciones: estado === 'aprobada' 
                    ? 'Productos recibidos en buen estado. Cumple con estándares de calidad.'
                    : 'Productos con problemas de calidad. Se requiere devolución parcial.',
                productosVerificados: productosSeleccionados.map(p => ({
                    ...p,
                    cantidadRecibida: estado === 'aprobada' ? p.cantidad : p.cantidad * 0.8,
                    devolucion: estado === 'rechazada' ? p.cantidad * 0.2 : 0,
                    motivoDevolucion: estado === 'rechazada' ? 'calidad' : '',
                    estado: estado === 'aprobada' ? 'aprobado' : 'rechazado'
                }))
            };
        }

        const ordenCompra = {
            id: Date.now() + i,
            numeroOrden: `OC-${String(Date.now() + i).slice(-6)}`,
            proveedor: proveedor,
            fechaFactura: fechaFactura.toISOString().split('T')[0],
            numeroFactura: `FAC-${String(Date.now() + i).slice(-8)}`,
            productos: productosSeleccionados,
            total: parseFloat(total.toFixed(2)),
            fechaRegistro: new Date().toISOString(),
            estado: estado,
            verificacionCalidad: verificacionCalidad
        };

        comprasData.ordenesCompra.push(ordenCompra);

        // También crear factura para compatibilidad
        const factura = {
            id: ordenCompra.id,
            proveedor: ordenCompra.proveedor,
            fechaFactura: ordenCompra.fechaFactura,
            numeroFactura: ordenCompra.numeroFactura,
            productos: ordenCompra.productos,
            total: ordenCompra.total,
            fechaRegistro: ordenCompra.fechaRegistro,
            ordenCompra: ordenCompra.numeroOrden
        };

        if (!comprasData.facturas) {
            comprasData.facturas = [];
        }
        comprasData.facturas.push(factura);
    }

    // Guardar en memoria
    guardarComprasEnMemoria();
    console.log(`📦 Generadas ${comprasData.ordenesCompra.length} órdenes de compra mock para Control de Calidad (con diferentes estados)`);
}

// Inicializar módulo de calidad
// Generar datos mock del historial de verificaciones
function generarDatosMockHistorialCalidad() {
    // Si ya hay verificaciones, no generar más
    if (calidadData.verificaciones.length > 0) {
        return;
    }
    
    // Obtener órdenes aprobadas y rechazadas
    const ordenesVerificadas = (comprasData.ordenesCompra || []).filter(oc => 
        oc.estado === 'aprobada' || oc.estado === 'rechazada'
    );
    
    // Crear verificaciones basadas en las órdenes verificadas
    ordenesVerificadas.forEach((orden, index) => {
        if (orden.verificacionCalidad) {
            const totalDevoluciones = orden.verificacionCalidad.productosVerificados.reduce((sum, p) => 
                sum + (p.devolucion * p.precioUnit), 0
            );
            
            const totalAjustes = orden.verificacionCalidad.productosVerificados.reduce((sum, p) => {
                const ajuste = (p.cantidadRecibida - p.cantidad) * p.precioUnit;
                return sum + (ajuste > 0 ? ajuste : 0);
            }, 0);
            
            const verificacion = {
                id: Date.now() + index,
                ordenId: orden.id,
                numeroOrden: orden.numeroOrden,
                proveedor: orden.proveedor,
                fechaRecepcion: orden.fechaFactura,
                fechaVerificacion: orden.verificacionCalidad.fechaVerificacion,
                estado: orden.estado,
                productos: orden.productos.length,
                devoluciones: parseFloat(totalDevoluciones.toFixed(2)),
                ajustes: parseFloat(totalAjustes.toFixed(2)),
                verificador: orden.verificacionCalidad.verificador,
                observaciones: orden.verificacionCalidad.observaciones
            };
            
            calidadData.verificaciones.push(verificacion);
        }
    });
    
    // Guardar en memoria
    guardarCalidadEnMemoria();
    
    console.log(`📋 Generadas ${calidadData.verificaciones.length} verificaciones mock para el historial`);
}

function inicializarModuloCalidad() {
    console.log('✅ Inicializando módulo de control de calidad...');
    
    // Generar datos mock de órdenes de compra si no existen
    generarDatosMockOrdenesCompra();
    
    // Cargar datos desde memoria
    recuperarCalidadDeMemoria();
    
    // Generar datos mock del historial de verificaciones si no hay datos
    generarDatosMockHistorialCalidad();
    
    // Actualizar UI
    cargarOrdenesPendientes();
    actualizarKPIsCalidad();
    cargarHistorialCalidad();
}

// Cargar órdenes pendientes de verificación
function cargarOrdenesPendientes() {
    const container = document.getElementById('ordenesCalidadGrid');
    if (!container) return;
    
    // Obtener filtro actual
    const filtro = document.getElementById('filtroEstadoCalidad')?.value || 'todas';
    
    let ordenesFiltradas = (comprasData.ordenesCompra || []);
    
    // Aplicar filtro
    if (filtro === 'pendiente') {
        ordenesFiltradas = ordenesFiltradas.filter(oc => oc.estado === 'pendiente_verificacion');
    } else if (filtro === 'aprobada') {
        ordenesFiltradas = ordenesFiltradas.filter(oc => oc.estado === 'aprobada');
    } else if (filtro === 'rechazada') {
        ordenesFiltradas = ordenesFiltradas.filter(oc => oc.estado === 'rechazada');
    }
    
    // Ordenar por fecha (más recientes primero)
    ordenesFiltradas.sort((a, b) => new Date(b.fechaFactura) - new Date(a.fechaFactura));
    
    if (ordenesFiltradas.length === 0) {
        container.innerHTML = `
            <div class="orden-vacia">
                <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style="opacity: 0.3; margin-bottom: 1rem;">
                    <path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                <p>No hay órdenes ${filtro === 'todas' ? '' : filtro === 'pendiente' ? 'pendientes' : filtro === 'aprobada' ? 'aprobadas' : 'rechazadas'} de verificación</p>
            </div>
        `;
        return;
    }
    
    container.innerHTML = ordenesFiltradas.map(orden => {
        const fecha = new Date(orden.fechaFactura);
        const fechaFormateada = fecha.toLocaleDateString('es-ES', { 
            day: '2-digit', 
            month: '2-digit', 
            year: 'numeric' 
        });
        
        // Determinar estado y badge
        let estadoTexto = 'Pendiente';
        let estadoClase = 'pendiente';
        let botonTexto = 'Verificar Calidad';
        let botonIcono = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>`;
        
        if (orden.estado === 'aprobada') {
            estadoTexto = 'Aprobada';
            estadoClase = 'aprobada';
            botonTexto = 'Ver Detalle';
            botonIcono = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1 12C1 12 5 4 12 4C19 4 23 12 23 12C23 12 19 20 12 20C5 20 1 12 1 12Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            <circle cx="12" cy="12" r="3" stroke="currentColor" stroke-width="2"/>
                        </svg>`;
        } else if (orden.estado === 'rechazada') {
            estadoTexto = 'Rechazada';
            estadoClase = 'rechazada';
            botonTexto = 'Ver Detalle';
            botonIcono = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1 12C1 12 5 4 12 4C19 4 23 12 23 12C23 12 19 20 12 20C5 20 1 12 1 12Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            <circle cx="12" cy="12" r="3" stroke="currentColor" stroke-width="2"/>
                        </svg>`;
        }
        
        return `
            <div class="orden-calidad-card" onclick="abrirVerificacionCalidad('${orden.id}')">
                <div class="orden-calidad-header">
                    <div class="orden-info">
                        <h3>${orden.numeroOrden}</h3>
                        <p class="orden-proveedor">${orden.proveedor}</p>
                    </div>
                    <span class="badge-estado ${estadoClase}">${estadoTexto}</span>
                </div>
                <div class="orden-calidad-body">
                    <div class="orden-detail">
                        <span class="detail-label">Factura:</span>
                        <span class="detail-value">${orden.numeroFactura}</span>
                    </div>
                    <div class="orden-detail">
                        <span class="detail-label">Fecha:</span>
                        <span class="detail-value">${fechaFormateada}</span>
                    </div>
                    <div class="orden-detail">
                        <span class="detail-label">Productos:</span>
                        <span class="detail-value">${orden.productos.length} items</span>
                    </div>
                    <div class="orden-detail">
                        <span class="detail-label">Total:</span>
                        <span class="detail-value destacado">$${orden.total.toLocaleString('es-ES', {minimumFractionDigits: 2})}</span>
                    </div>
                    ${orden.verificacionCalidad ? `
                    <div class="orden-detail">
                        <span class="detail-label">Verificador:</span>
                        <span class="detail-value">${orden.verificacionCalidad.verificador}</span>
                    </div>
                    ` : ''}
                </div>
                <div class="orden-calidad-footer">
                    <button class="btn-verificar" onclick="event.stopPropagation(); abrirVerificacionCalidad('${orden.id}')">
                        ${botonIcono}
                        ${botonTexto}
                    </button>
                </div>
            </div>
        `;
    }).join('');
}

// Abrir modal de verificación de calidad
function abrirVerificacionCalidad(ordenId) {
    const orden = (comprasData.ordenesCompra || []).find(oc => oc.id == ordenId);
    if (!orden) {
        ToastNotification.show('Orden de compra no encontrada', 'error', 3000);
        return;
    }
    
    const modal = document.getElementById('modalVerificacionCalidad');
    const titulo = document.getElementById('modalCalidadTitulo');
    const ordenInfo = document.getElementById('calidadOrdenInfo');
    const productosBody = document.getElementById('productosCalidadBody');
    
    if (!modal || !titulo || !ordenInfo || !productosBody) return;
    
    // Actualizar título
    titulo.textContent = `Verificación de Calidad - ${orden.numeroOrden}`;
    
    // Información de la orden
    const fecha = new Date(orden.fechaFactura);
    ordenInfo.innerHTML = `
        <div class="orden-info-card">
            <div class="info-row">
                <span class="info-label">Orden de Compra:</span>
                <span class="info-value">${orden.numeroOrden}</span>
            </div>
            <div class="info-row">
                <span class="info-label">Proveedor:</span>
                <span class="info-value">${orden.proveedor}</span>
            </div>
            <div class="info-row">
                <span class="info-label">Factura:</span>
                <span class="info-value">${orden.numeroFactura}</span>
            </div>
            <div class="info-row">
                <span class="info-label">Fecha Factura:</span>
                <span class="info-value">${fecha.toLocaleDateString('es-ES')}</span>
            </div>
            <div class="info-row destacado">
                <span class="info-label">Total Facturado:</span>
                <span class="info-value">$${orden.total.toLocaleString('es-ES', {minimumFractionDigits: 2})}</span>
            </div>
        </div>
    `;
    
    // Llenar tabla de productos
    productosBody.innerHTML = orden.productos.map((prod, index) => {
        return `
            <tr data-producto-index="${index}">
                <td><strong>${prod.producto}</strong></td>
                <td>${prod.cantidad.toFixed(2)}</td>
                <td>${prod.unidad}</td>
                <td>$${prod.precioUnit.toFixed(2)}</td>
                <td>
                    <input type="number" class="cantidad-recibida-input" 
                           value="${prod.cantidad.toFixed(2)}" 
                           step="0.01" min="0" 
                           data-index="${index}"
                           onchange="actualizarTotalesCalidad()"
                           required>
                </td>
                <td>
                    <input type="number" class="ajuste-input" 
                           value="0" 
                           step="0.01" 
                           data-index="${index}"
                           onchange="actualizarTotalesCalidad()"
                           placeholder="0.00">
                </td>
                <td>
                    <input type="number" class="devolucion-input" 
                           value="0" 
                           step="0.01" min="0" 
                           data-index="${index}"
                           onchange="toggleMotivoDevolucion(${index}); actualizarTotalesCalidad();"
                           placeholder="0.00">
                </td>
                <td>
                    <select class="motivo-devolucion-select" 
                            data-index="${index}" 
                            style="display: none;"
                            onchange="actualizarTotalesCalidad()">
                        <option value="">Seleccionar motivo...</option>
                        <option value="calidad">Mala Calidad</option>
                        <option value="exceso">Entrega de Más</option>
                        <option value="deterioro">Producto Deteriorado</option>
                        <option value="vencido">Producto Vencido</option>
                        <option value="incorrecto">Producto Incorrecto</option>
                    </select>
                </td>
                <td>
                    <select class="estado-producto-select" 
                            data-index="${index}"
                            onchange="actualizarTotalesCalidad()"
                            style="min-width: 120px;">
                        <option value="pendiente" selected>Pendiente</option>
                        <option value="aprobado">Aprobado</option>
                        <option value="rechazado">Rechazado</option>
                    </select>
                </td>
                <td>
                    <textarea class="observaciones-calidad-input" 
                              data-index="${index}"
                              rows="2" 
                              placeholder="Observaciones de calidad..."
                              style="min-width: 200px;"
                              onchange="actualizarTotalesCalidad()"></textarea>
                </td>
            </tr>
        `;
    }).join('');
    
    // Guardar orden actual
    window.ordenCalidadActual = orden;
    
    // Actualizar totales
    actualizarTotalesCalidad();
    
    // Mostrar modal
    modal.style.display = 'flex';
}

// Toggle motivo de devolución
function toggleMotivoDevolucion(index) {
    const devolucionInput = document.querySelector(`.devolucion-input[data-index="${index}"]`);
    const motivoSelect = document.querySelector(`.motivo-devolucion-select[data-index="${index}"]`);
    
    if (devolucionInput && motivoSelect) {
        const devolucion = parseFloat(devolucionInput.value) || 0;
        if (devolucion > 0) {
            motivoSelect.style.display = 'block';
            motivoSelect.required = true;
        } else {
            motivoSelect.style.display = 'none';
            motivoSelect.required = false;
            motivoSelect.value = '';
        }
    }
}

// Actualizar totales de calidad
function actualizarTotalesCalidad() {
    if (!window.ordenCalidadActual) return;
    
    let totalFacturado = window.ordenCalidadActual.total;
    let totalRecibido = 0;
    let totalDevoluciones = 0;
    
    window.ordenCalidadActual.productos.forEach((prod, index) => {
        const recibidaInput = document.querySelector(`.cantidad-recibida-input[data-index="${index}"]`);
        const devolucionInput = document.querySelector(`.devolucion-input[data-index="${index}"]`);
        
        if (recibidaInput) {
            const recibida = parseFloat(recibidaInput.value) || 0;
            totalRecibido += recibida * prod.precioUnit;
        }
        
        if (devolucionInput) {
            const devolucion = parseFloat(devolucionInput.value) || 0;
            totalDevoluciones += devolucion * prod.precioUnit;
        }
    });
    
    const totalAprobar = totalRecibido - totalDevoluciones;
    
    document.getElementById('totalFacturadoCalidad').textContent = 
        `$${totalFacturado.toLocaleString('es-ES', {minimumFractionDigits: 2})}`;
    document.getElementById('totalRecibidoCalidad').textContent = 
        `$${totalRecibido.toLocaleString('es-ES', {minimumFractionDigits: 2})}`;
    document.getElementById('totalDevolucionesCalidad').textContent = 
        `$${totalDevoluciones.toLocaleString('es-ES', {minimumFractionDigits: 2})}`;
    document.getElementById('totalAprobarCalidad').textContent = 
        `$${totalAprobar.toLocaleString('es-ES', {minimumFractionDigits: 2})}`;
}

// Cerrar modal de calidad
function cerrarModalCalidad() {
    const modal = document.getElementById('modalVerificacionCalidad');
    if (modal) {
        modal.style.display = 'none';
    }
    window.ordenCalidadActual = null;
}

// Aprobar verificación de calidad
function aprobarVerificacionCalidad(event) {
    event.preventDefault();
    
    if (!window.ordenCalidadActual) {
        ToastNotification.show('No hay orden seleccionada', 'warning', 3000);
        return;
    }
    
    const verificador = document.getElementById('verificadorCalidad').value;
    const observacionesGenerales = document.getElementById('observacionesGeneralesCalidad').value;
    
    // Recopilar datos de verificación
    const productosVerificados = window.ordenCalidadActual.productos.map((prod, index) => {
        const recibidaInput = document.querySelector(`.cantidad-recibida-input[data-index="${index}"]`);
        const ajusteInput = document.querySelector(`.ajuste-input[data-index="${index}"]`);
        const devolucionInput = document.querySelector(`.devolucion-input[data-index="${index}"]`);
        const motivoSelect = document.querySelector(`.motivo-devolucion-select[data-index="${index}"]`);
        const observacionesInput = document.querySelector(`.observaciones-calidad-input[data-index="${index}"]`);
        const estadoSelect = document.querySelector(`.estado-producto-select[data-index="${index}"]`);
        
        const cantidadRecibida = parseFloat(recibidaInput?.value) || prod.cantidad;
        const ajuste = parseFloat(ajusteInput?.value) || 0;
        const devolucion = parseFloat(devolucionInput?.value) || 0;
        const motivoDevolucion = motivoSelect?.value || '';
        const observaciones = observacionesInput?.value || '';
        const estado = estadoSelect?.value || 'pendiente';
        
        return {
            producto: prod.producto,
            cantidadFacturada: prod.cantidad,
            cantidadRecibida: cantidadRecibida,
            ajuste: ajuste,
            devolucion: devolucion,
            motivoDevolucion: motivoDevolucion,
            observaciones: observaciones,
            estado: estado,
            unidad: prod.unidad,
            precioUnit: prod.precioUnit
        };
    });
    
    // Crear registro de verificación
    const verificacion = {
        id: Date.now(),
        ordenCompraId: window.ordenCalidadActual.id,
        numeroOrden: window.ordenCalidadActual.numeroOrden,
        proveedor: window.ordenCalidadActual.proveedor,
        fechaVerificacion: new Date().toISOString().split('T')[0],
        verificador: verificador,
        productos: productosVerificados,
        observacionesGenerales: observacionesGenerales,
        estado: 'aprobada',
        totalFacturado: window.ordenCalidadActual.total,
        totalAprobado: parseFloat(document.getElementById('totalAprobarCalidad').textContent.replace(/[^0-9.-]/g, ''))
    };
    
    // Actualizar estado de orden
    window.ordenCalidadActual.estado = 'aprobada';
    window.ordenCalidadActual.verificacionCalidad = verificacion;
    
    // Guardar verificación
    calidadData.verificaciones.push(verificacion);
    
    // Procesar productos aprobados (sumar a inventario)
    productosVerificados.forEach(prod => {
        const cantidadAprobar = prod.cantidadRecibida - prod.devolucion;
        if (cantidadAprobar > 0) {
            // Sumar a inventario
            if (typeof inventarioData !== 'undefined' && inventarioData.productos) {
                const prodInventario = inventarioData.productos.find(p => p.nombre === prod.producto);
                if (prodInventario) {
                    prodInventario.ingresos += cantidadAprobar;
                    prodInventario.stockActual += cantidadAprobar;
                    prodInventario.ultimaCompra = {
                        fecha: verificacion.fechaVerificacion,
                        cantidad: cantidadAprobar,
                        precioUnit: prod.precioUnit
                    };
                    
                    // Agregar movimiento
                    inventarioData.movimientos.push({
                        id: Date.now() + Math.random(),
                        fecha: verificacion.fechaVerificacion,
                        producto: prod.producto,
                        tipo: 'entrada',
                        cantidad: cantidadAprobar,
                        unidad: prod.unidad,
                        quienSolicita: 'Control de Calidad',
                        saldoAnterior: prodInventario.stockActual - cantidadAprobar,
                        saldoFinal: prodInventario.stockActual,
                        observaciones: `Aprobado desde OC ${window.ordenCalidadActual.numeroOrden}`
                    });
                }
            }
        }
        
        // Si hay devolución por mala calidad, registrar en costos variables
        if (prod.devolucion > 0 && prod.motivoDevolucion === 'calidad') {
            // Registrar en costos variables para procesamiento contable
            if (typeof costosData !== 'undefined') {
                const costoDevolucion = prod.devolucion * prod.precioUnit;
                console.log(`Devolución por calidad registrada: ${prod.producto} - $${costoDevolucion.toFixed(2)}`);
            }
        }
    });
    
    // Guardar en memoria
    guardarCalidadEnMemoria();
    guardarComprasEnMemoria();
    if (typeof guardarInventarioEnMemoria === 'function') {
        guardarInventarioEnMemoria();
    }
    
    // Actualizar UI
    cargarOrdenesPendientes();
    actualizarKPIsCalidad();
    cargarHistorialCalidad();
    
    // Cerrar modal
    cerrarModalCalidad();
    
    ToastNotification.show('Verificación de calidad aprobada y procesada correctamente', 'success', 4000);
}

// Rechazar verificación de calidad
function rechazarVerificacionCalidad() {
    if (!window.ordenCalidadActual) {
        ToastNotification.show('No hay orden seleccionada', 'warning', 3000);
        return;
    }
    
    const motivo = prompt('Ingrese el motivo del rechazo:');
    if (!motivo) return;
    
    // Actualizar estado de orden
    window.ordenCalidadActual.estado = 'rechazada';
    window.ordenCalidadActual.motivoRechazo = motivo;
    
    // Guardar
    guardarComprasEnMemoria();
    
    // Actualizar UI
    cargarOrdenesPendientes();
    actualizarKPIsCalidad();
    cargarHistorialCalidad();
    
    // Cerrar modal
    cerrarModalCalidad();
    
    ToastNotification.show('Orden de compra rechazada', 'warning', 3000);
}

// Actualizar KPIs de calidad
function actualizarKPIsCalidad() {
    // Asegurar que comprasData.ordenesCompra existe
    if (!comprasData.ordenesCompra) {
        comprasData.ordenesCompra = [];
    }
    
    const ordenesPendientes = comprasData.ordenesCompra.filter(oc => 
        oc.estado === 'pendiente_verificacion'
    ).length;
    
    // Calcular devoluciones y ajustes desde las verificaciones
    // Las verificaciones tienen devoluciones y ajustes ya calculados
    const totalDevoluciones = calidadData.verificaciones.reduce((sum, v) => {
        return sum + (v.devoluciones || 0);
    }, 0);
    
    const totalAjustes = calidadData.verificaciones.reduce((sum, v) => {
        return sum + (v.ajustes || 0);
    }, 0);
    
    const totalOrdenes = comprasData.ordenesCompra.length;
    const ordenesAprobadas = comprasData.ordenesCompra.filter(oc => 
        oc.estado === 'aprobada'
    ).length;
    const tasaAprobacion = totalOrdenes > 0 ? ((ordenesAprobadas / totalOrdenes) * 100).toFixed(1) : '0.0';
    
    if (document.getElementById('kpiOrdenesPendientes')) {
        document.getElementById('kpiOrdenesPendientes').textContent = ordenesPendientes;
    }
    if (document.getElementById('kpiDevoluciones')) {
        document.getElementById('kpiDevoluciones').textContent = `$${totalDevoluciones.toLocaleString('es-ES', {minimumFractionDigits: 2})}`;
    }
    if (document.getElementById('kpiAjustes')) {
        document.getElementById('kpiAjustes').textContent = totalAjustes > 0 ? totalAjustes.toLocaleString('es-ES', {minimumFractionDigits: 0}) : '0';
    }
    if (document.getElementById('kpiTasaAprobacion')) {
        document.getElementById('kpiTasaAprobacion').textContent = tasaAprobacion + '%';
    }
    
    // Actualizar badge en sidebar
    const badge = document.getElementById('badgeCalidadPendiente');
    if (badge) {
        if (ordenesPendientes > 0) {
            badge.textContent = ordenesPendientes;
            badge.style.display = 'flex';
        } else {
            badge.style.display = 'none';
        }
    }
    
    console.log(`📊 KPIs Calidad actualizados: ${ordenesPendientes} pendientes, $${totalDevoluciones.toFixed(2)} devoluciones, ${tasaAprobacion}% aprobación`);
}

// Cargar historial de verificaciones
function cargarHistorialCalidad() {
    const tbody = document.getElementById('historialCalidadBody');
    if (!tbody) return;
    
    const verificaciones = [...calidadData.verificaciones].sort((a, b) => 
        new Date(b.fechaVerificacion) - new Date(a.fechaVerificacion)
    );
    
    if (verificaciones.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="9" style="text-align: center; padding: 2rem; color: var(--text-secondary);">
                    No hay verificaciones registradas
                </td>
            </tr>
        `;
        return;
    }
    
    tbody.innerHTML = verificaciones.map(ver => {
        const fecha = new Date(ver.fechaRecepcion || ver.fechaVerificacion);
        const fechaFormateada = fecha.toLocaleDateString('es-ES', { 
            day: '2-digit', 
            month: '2-digit', 
            year: 'numeric' 
        });
        
        // Determinar estado y badge
        let estadoTexto = 'Aprobada';
        let estadoClase = 'aprobada';
        if (ver.estado === 'rechazada') {
            estadoTexto = 'Rechazada';
            estadoClase = 'rechazada';
        }
        
        return `
            <tr>
                <td><strong>${ver.numeroOrden}</strong></td>
                <td>${ver.proveedor}</td>
                <td>${fechaFormateada}</td>
                <td><span class="badge-estado ${estadoClase}">${estadoTexto}</span></td>
                <td>${ver.productos || 0} productos</td>
                <td class="${ver.devoluciones > 0 ? 'text-danger' : ''}">$${ver.devoluciones.toLocaleString('es-ES', {minimumFractionDigits: 2})}</td>
                <td class="${ver.ajustes > 0 ? 'text-warning' : ''}">$${ver.ajustes.toLocaleString('es-ES', {minimumFractionDigits: 2})}</td>
                <td>${ver.verificador || 'N/A'}</td>
                <td>
                    <button class="btn-icon-small" onclick="verDetalleVerificacion('${ver.ordenId || ver.id}')" title="Ver Detalle">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1 12C1 12 5 4 12 4C19 4 23 12 23 12C23 12 19 20 12 20C5 20 1 12 1 12Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            <circle cx="12" cy="12" r="3" stroke="currentColor" stroke-width="2"/>
                        </svg>
                    </button>
                </td>
            </tr>
        `;
    }).join('');
}

// Filtrar órdenes de calidad
function filtrarOrdenesCalidad() {
    cargarOrdenesPendientes();
}

// Ver detalle de verificación
function verDetalleVerificacion(ordenId) {
    const orden = (comprasData.ordenesCompra || []).find(oc => oc.id == ordenId);
    if (orden) {
        window.ordenCalidadActual = orden;
        abrirVerificacionCalidad(orden.id);
        
        // Si la orden ya está verificada, deshabilitar edición (solo lectura)
        if (orden.estado === 'aprobada' || orden.estado === 'rechazada') {
            setTimeout(() => {
                document.querySelectorAll('#formVerificacionCalidad input, #formVerificacionCalidad select, #formVerificacionCalidad textarea').forEach(el => {
                    el.disabled = true;
                });
                document.querySelectorAll('.form-exec-actions button').forEach(btn => {
                    btn.style.display = 'none';
                });
                
                // Agregar mensaje de solo lectura
                const form = document.getElementById('formVerificacionCalidad');
                if (form && !form.querySelector('.readonly-notice')) {
                    const notice = document.createElement('div');
                    notice.className = 'readonly-notice';
                    notice.style.cssText = 'padding: 1rem; background: #fef3c7; border-radius: 0.5rem; margin-bottom: 1rem; color: #92400e; font-weight: 600;';
                    notice.textContent = '📋 Esta verificación ya fue procesada. Solo lectura.';
                    form.insertBefore(notice, form.firstChild);
                }
            }, 100);
        }
    }
}

// Guardar calidad en memoria
function guardarCalidadEnMemoria() {
    if (typeof MEMORIA_TEMPORAL !== 'undefined') {
        MEMORIA_TEMPORAL.guardar('calidadVerificaciones', calidadData.verificaciones, 15);
    }
}

// Recuperar calidad de memoria
function recuperarCalidadDeMemoria() {
    if (typeof MEMORIA_TEMPORAL !== 'undefined') {
        const verificaciones = MEMORIA_TEMPORAL.recuperar('calidadVerificaciones');
        if (verificaciones) {
            calidadData.verificaciones = verificaciones;
        }
    }
}

// Exponer funciones globalmente
if (typeof window !== 'undefined') {
    window.inicializarModuloCalidad = inicializarModuloCalidad;
    window.abrirVerificacionCalidad = abrirVerificacionCalidad;
    window.cerrarModalCalidad = cerrarModalCalidad;
    window.aprobarVerificacionCalidad = aprobarVerificacionCalidad;
    window.rechazarVerificacionCalidad = rechazarVerificacionCalidad;
    window.toggleMotivoDevolucion = toggleMotivoDevolucion;
    window.actualizarTotalesCalidad = actualizarTotalesCalidad;
    window.filtrarOrdenesCalidad = filtrarOrdenesCalidad;
    window.verDetalleVerificacion = verDetalleVerificacion;
}

// ============================================
// MÓDULO DE CONFIGURACIÓN
// ============================================

// Datos mock de configuración
const configuracionData = {
    usuarios: [],
    respaldos: [],
    configuracion: {
        general: {
            nombreComedor: 'Comedor Industrial Central',
            direccion: 'Av. Principal 123, Ciudad',
            telefono: '+1 234 567 8900',
            email: 'contacto@comedor.com',
            zonaHoraria: 'America/Mexico_City',
            idioma: 'es',
            moneda: 'MXN',
            formatoFecha: 'DD/MM/YYYY'
        },
        inventario: {
            diasAlertaMinimo: 3,
            porcentajeSeguridad: 20,
            unidadPredeterminada: 'kg',
            actualizacionAutomatica: true
        },
        produccion: {
            mermaObjetivo: 5,
            mermaCritica: 10,
            charolasLote: 50,
            reporteAutomatico: true
        },
        notificaciones: {
            email: true,
            push: true,
            alertasInventario: true,
            alertasCostos: true,
            frecuenciaResumen: 'diario'
        },
        integraciones: {
            whatsapp: {
                enabled: true,
                numero: '+1 234 567 8900',
                token: '••••••••••••'
            },
            api: {
                enabled: false,
                url: '',
                key: ''
            },
            email: {
                enabled: true,
                server: 'smtp.gmail.com',
                port: 587,
                user: '',
                password: ''
            }
        }
    }
};

// Generar datos mock de usuarios
function generarDatosMockUsuarios() {
    if (configuracionData.usuarios.length > 0) return;
    
    const roles = ['administrador', 'gerente', 'supervisor', 'operador', 'lectura'];
    const nombres = [
        { nombre: 'Juan Pérez', email: 'juan.perez@comedor.com', rol: 'administrador' },
        { nombre: 'María González', email: 'maria.gonzalez@comedor.com', rol: 'gerente' },
        { nombre: 'Carlos Rodríguez', email: 'carlos.rodriguez@comedor.com', rol: 'supervisor' },
        { nombre: 'Ana Martínez', email: 'ana.martinez@comedor.com', rol: 'operador' },
        { nombre: 'Luis Sánchez', email: 'luis.sanchez@comedor.com', rol: 'operador' }
    ];
    
    configuracionData.usuarios = nombres.map((u, i) => {
        const fecha = new Date();
        fecha.setDate(fecha.getDate() - Math.floor(Math.random() * 7));
        
        return {
            id: i + 1,
            nombre: u.nombre,
            email: u.email,
            rol: u.rol,
            estado: Math.random() > 0.2 ? 'activo' : 'inactivo',
            ultimoAcceso: fecha.toISOString(),
            fechaCreacion: new Date(Date.now() - (30 + Math.random() * 60) * 24 * 60 * 60 * 1000).toISOString()
        };
    });
}

// Generar datos mock de respaldos
function generarDatosMockRespaldos() {
    if (configuracionData.respaldos.length > 0) return;
    
    const tipos = ['completo', 'incremental', 'diferencial'];
    const estados = ['completado', 'completado', 'completado', 'error'];
    
    for (let i = 0; i < 10; i++) {
        const fecha = new Date();
        fecha.setDate(fecha.getDate() - i * 2);
        fecha.setHours(14, 30, 0, 0);
        
        const tipo = tipos[Math.floor(Math.random() * tipos.length)];
        const estado = estados[Math.floor(Math.random() * estados.length)];
        const tamano = (1.5 + Math.random() * 2).toFixed(1);
        
        configuracionData.respaldos.push({
            id: i + 1,
            fecha: fecha.toISOString(),
            tamano: `${tamano} MB`,
            tipo: tipo,
            estado: estado,
            descripcion: `Respaldo ${tipo} del sistema`
        });
    }
    
    // Ordenar por fecha descendente
    configuracionData.respaldos.sort((a, b) => new Date(b.fecha) - new Date(a.fecha));
}

// Mostrar sección de configuración
function mostrarSeccionConfig(seccion) {
    // Ocultar todas las secciones
    document.querySelectorAll('.config-seccion').forEach(sec => {
        sec.classList.remove('active');
    });
    
    // Ocultar todos los botones de navegación
    document.querySelectorAll('.config-nav-item').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Mostrar sección seleccionada
    const seccionElement = document.getElementById(`seccion${seccion.charAt(0).toUpperCase() + seccion.slice(1)}`);
    if (seccionElement) {
        seccionElement.classList.add('active');
    }
    
    // Activar botón de navegación
    const navBtn = document.querySelector(`[data-section="${seccion}"]`);
    if (navBtn) {
        navBtn.classList.add('active');
    }
    
    // Cargar datos específicos de la sección
    if (seccion === 'usuarios') {
        cargarUsuarios();
    } else if (seccion === 'backup') {
        cargarHistorialBackup();
    }
}

// Cargar usuarios en tabla
function cargarUsuarios() {
    generarDatosMockUsuarios();
    const tbody = document.getElementById('tablaUsuariosBody');
    if (!tbody) return;
    
    if (configuracionData.usuarios.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="6" style="text-align: center; padding: 2rem; color: var(--text-secondary);">
                    No hay usuarios registrados
                </td>
            </tr>
        `;
        return;
    }
    
    tbody.innerHTML = configuracionData.usuarios.map(usuario => {
        const fecha = new Date(usuario.ultimoAcceso);
        const fechaFormateada = fecha.toLocaleDateString('es-ES', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
        
        const rolLabels = {
            'administrador': 'Administrador',
            'gerente': 'Gerente',
            'supervisor': 'Supervisor',
            'operador': 'Operador',
            'lectura': 'Solo Lectura'
        };
        
        return `
            <tr>
                <td><strong>${usuario.nombre}</strong></td>
                <td>${usuario.email}</td>
                <td><span class="badge-rol">${rolLabels[usuario.rol] || usuario.rol}</span></td>
                <td><span class="badge-estado ${usuario.estado}">${usuario.estado === 'activo' ? 'Activo' : 'Inactivo'}</span></td>
                <td>${fechaFormateada}</td>
                <td>
                    <button class="btn-icon-small" onclick="editarUsuario(${usuario.id})" title="Editar">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M11 4H4C3.46957 4 2.96086 4.21071 2.58579 4.58579C2.21071 4.96086 2 5.46957 2 6V20C2 20.5304 2.21071 21.0391 2.58579 21.4142C2.96086 21.7893 3.46957 22 4 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V13" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M18.5 2.5C18.8978 2.10218 19.4374 1.87868 20 1.87868C20.5626 1.87868 21.1022 2.10218 21.5 2.5C21.8978 2.89782 22.1213 3.43739 22.1213 4C22.1213 4.56261 21.8978 5.10218 21.5 5.5L12 15L8 16L9 12L18.5 2.5Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </button>
                    <button class="btn-icon-small" onclick="eliminarUsuario(${usuario.id})" title="Eliminar" style="margin-left: 8px;">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M3 6H5H21" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M8 6V4C8 3.46957 8.21071 2.96086 8.58579 2.58579C8.96086 2.21071 9.46957 2 10 2H14C14.5304 2 15.0391 2.21071 15.4142 2.58579C15.7893 2.96086 16 3.46957 16 4V6M19 6V20C19 20.5304 18.7893 21.0391 18.4142 21.4142C18.0391 21.7893 17.5304 22 17 22H7C6.46957 22 5.96086 21.7893 5.58579 21.4142C5.21071 21.0391 5 20.5304 5 20V6H19Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </button>
                </td>
            </tr>
        `;
    }).join('');
}

// Cargar historial de respaldos
function cargarHistorialBackup() {
    generarDatosMockRespaldos();
    const tbody = document.getElementById('historialBackupBody');
    if (!tbody) return;
    
    if (configuracionData.respaldos.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="5" style="text-align: center; padding: 2rem; color: var(--text-secondary);">
                    No hay respaldos registrados
                </td>
            </tr>
        `;
        return;
    }
    
    tbody.innerHTML = configuracionData.respaldos.map(backup => {
        const fecha = new Date(backup.fecha);
        const fechaFormateada = fecha.toLocaleDateString('es-ES', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
        
        const tipoLabels = {
            'completo': 'Completo',
            'incremental': 'Incremental',
            'diferencial': 'Diferencial'
        };
        
        return `
            <tr>
                <td>${fechaFormateada}</td>
                <td>${backup.tamano}</td>
                <td><span class="badge-tipo">${tipoLabels[backup.tipo] || backup.tipo}</span></td>
                <td><span class="badge-estado ${backup.estado}">${backup.estado === 'completado' ? 'Completado' : 'Error'}</span></td>
                <td>
                    <button class="btn-icon-small" onclick="descargarBackup(${backup.id})" title="Descargar">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M21 15V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V15" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M7 10L12 15L17 10" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M12 15V3" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </button>
                </td>
            </tr>
        `;
    }).join('');
}

// Guardar configuración
function guardarConfiguracion(seccion) {
    const config = configuracionData.configuracion[seccion];
    if (!config) return;
    
    // Guardar valores según la sección
    if (seccion === 'general') {
        config.nombreComedor = document.getElementById('nombreComedor')?.value || config.nombreComedor;
        config.direccion = document.getElementById('direccionComedor')?.value || config.direccion;
        config.telefono = document.getElementById('telefonoComedor')?.value || config.telefono;
        config.email = document.getElementById('emailComedor')?.value || config.email;
        config.zonaHoraria = document.getElementById('zonaHoraria')?.value || config.zonaHoraria;
        config.idioma = document.getElementById('idiomaSistema')?.value || config.idioma;
        config.moneda = document.getElementById('monedaSistema')?.value || config.moneda;
        config.formatoFecha = document.getElementById('formatoFecha')?.value || config.formatoFecha;
    } else if (seccion === 'inventario') {
        config.diasAlertaMinimo = parseInt(document.getElementById('diasAlertaMinimo')?.value) || config.diasAlertaMinimo;
        config.porcentajeSeguridad = parseInt(document.getElementById('porcentajeSeguridad')?.value) || config.porcentajeSeguridad;
        config.unidadPredeterminada = document.getElementById('unidadPredeterminada')?.value || config.unidadPredeterminada;
        config.actualizacionAutomatica = document.getElementById('actualizacionAutomatica')?.checked || config.actualizacionAutomatica;
    } else if (seccion === 'produccion') {
        config.mermaObjetivo = parseFloat(document.getElementById('mermaObjetivo')?.value) || config.mermaObjetivo;
        config.mermaCritica = parseFloat(document.getElementById('mermaCritica')?.value) || config.mermaCritica;
        config.charolasLote = parseInt(document.getElementById('charolasLote')?.value) || config.charolasLote;
        config.reporteAutomatico = document.getElementById('reporteAutomatico')?.checked || config.reporteAutomatico;
    } else if (seccion === 'notificaciones') {
        config.email = document.getElementById('notificacionesEmail')?.checked || config.email;
        config.push = document.getElementById('notificacionesPush')?.checked || config.push;
        config.alertasInventario = document.getElementById('alertasInventario')?.checked || config.alertasInventario;
        config.alertasCostos = document.getElementById('alertasCostos')?.checked || config.alertasCostos;
        config.frecuenciaResumen = document.getElementById('frecuenciaResumen')?.value || config.frecuenciaResumen;
    } else if (seccion === 'integraciones') {
        config.whatsapp.enabled = document.getElementById('whatsappEnabled')?.checked || config.whatsapp.enabled;
        config.whatsapp.numero = document.getElementById('whatsappNumber')?.value || config.whatsapp.numero;
        config.api.enabled = document.getElementById('apiEnabled')?.checked || config.api.enabled;
        config.api.url = document.getElementById('apiUrl')?.value || config.api.url;
        config.email.enabled = document.getElementById('emailEnabled')?.checked || config.email.enabled;
        config.email.server = document.getElementById('smtpServer')?.value || config.email.server;
        config.email.port = parseInt(document.getElementById('smtpPort')?.value) || config.email.port;
    }
    
    // Guardar en memoria
    if (typeof MEMORIA_TEMPORAL !== 'undefined') {
        MEMORIA_TEMPORAL.guardar('configuracion', configuracionData, 15);
    }
    
    ToastNotification.show('Configuración guardada exitosamente', 'success', 2000);
}

// Abrir modal de usuario
function abrirModalUsuario(usuarioId = null) {
    const modal = document.getElementById('modalUsuario');
    const titulo = document.getElementById('modalUsuarioTitulo');
    const form = document.getElementById('formUsuario');
    
    if (!modal || !titulo || !form) return;
    
    if (usuarioId) {
        const usuario = configuracionData.usuarios.find(u => u.id === usuarioId);
        if (usuario) {
            titulo.textContent = 'Editar Usuario';
            document.getElementById('usuarioNombre').value = usuario.nombre;
            document.getElementById('usuarioEmail').value = usuario.email;
            document.getElementById('usuarioRol').value = usuario.rol;
            document.getElementById('usuarioActivo').checked = usuario.estado === 'activo';
            window.usuarioEditando = usuarioId;
        }
    } else {
        titulo.textContent = 'Nuevo Usuario';
        form.reset();
        window.usuarioEditando = null;
    }
    
    modal.style.display = 'flex';
}

// Cerrar modal de usuario
function cerrarModalUsuario() {
    const modal = document.getElementById('modalUsuario');
    if (modal) {
        modal.style.display = 'none';
    }
    window.usuarioEditando = null;
}

// Guardar usuario
function guardarUsuario(event) {
    event.preventDefault();
    
    const nombre = document.getElementById('usuarioNombre')?.value;
    const email = document.getElementById('usuarioEmail')?.value;
    const rol = document.getElementById('usuarioRol')?.value;
    const password = document.getElementById('usuarioPassword')?.value;
    const activo = document.getElementById('usuarioActivo')?.checked;
    
    if (!nombre || !email || !rol) {
        ToastNotification.show('Por favor complete todos los campos requeridos', 'error', 2000);
        return;
    }
    
    if (window.usuarioEditando) {
        // Editar usuario existente
        const usuario = configuracionData.usuarios.find(u => u.id === window.usuarioEditando);
        if (usuario) {
            usuario.nombre = nombre;
            usuario.email = email;
            usuario.rol = rol;
            usuario.estado = activo ? 'activo' : 'inactivo';
            if (password) {
                // En producción, aquí se hashearía la contraseña
                console.log('Contraseña actualizada para usuario:', email);
            }
        }
        ToastNotification.show('Usuario actualizado exitosamente', 'success', 2000);
    } else {
        // Crear nuevo usuario
        const nuevoUsuario = {
            id: configuracionData.usuarios.length > 0 
                ? Math.max(...configuracionData.usuarios.map(u => u.id)) + 1 
                : 1,
            nombre: nombre,
            email: email,
            rol: rol,
            estado: activo ? 'activo' : 'inactivo',
            ultimoAcceso: new Date().toISOString(),
            fechaCreacion: new Date().toISOString()
        };
        configuracionData.usuarios.push(nuevoUsuario);
        ToastNotification.show('Usuario creado exitosamente', 'success', 2000);
    }
    
    cargarUsuarios();
    cerrarModalUsuario();
}

// Editar usuario
function editarUsuario(usuarioId) {
    abrirModalUsuario(usuarioId);
}

// Eliminar usuario
function eliminarUsuario(usuarioId) {
    if (!confirm('¿Está seguro de eliminar este usuario?')) return;
    
    const index = configuracionData.usuarios.findIndex(u => u.id === usuarioId);
    if (index > -1) {
        configuracionData.usuarios.splice(index, 1);
        cargarUsuarios();
        ToastNotification.show('Usuario eliminado exitosamente', 'success', 2000);
    }
}

// Crear respaldo
function crearRespaldo() {
    ToastNotification.show('Creando respaldo...', 'info', 2000);
    
    setTimeout(() => {
        const fecha = new Date();
        const tamano = (1.5 + Math.random() * 2).toFixed(1);
        
        const nuevoBackup = {
            id: configuracionData.respaldos.length > 0 
                ? Math.max(...configuracionData.respaldos.map(b => b.id)) + 1 
                : 1,
            fecha: fecha.toISOString(),
            tamano: `${tamano} MB`,
            tipo: 'completo',
            estado: 'completado',
            descripcion: 'Respaldo completo del sistema'
        };
        
        configuracionData.respaldos.unshift(nuevoBackup);
        
        // Actualizar info de último respaldo
        document.getElementById('ultimoBackup').textContent = fecha.toLocaleDateString('es-ES', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
        document.getElementById('tamanoBackup').textContent = `${tamano} MB`;
        
        cargarHistorialBackup();
        ToastNotification.show('Respaldo creado exitosamente', 'success', 2000);
    }, 1500);
}

// Restaurar respaldo
function restaurarRespaldo() {
    if (!confirm('¿Está seguro de restaurar el último respaldo? Esta acción no se puede deshacer.')) return;
    
    ToastNotification.show('Restaurando respaldo...', 'info', 2000);
    
    setTimeout(() => {
        ToastNotification.show('Respaldo restaurado exitosamente', 'success', 2000);
    }, 2000);
}

// Descargar backup
function descargarBackup(backupId) {
    const backup = configuracionData.respaldos.find(b => b.id === backupId);
    if (backup) {
        ToastNotification.show(`Descargando respaldo del ${new Date(backup.fecha).toLocaleDateString('es-ES')}...`, 'info', 2000);
    }
}

// Toggle password visibility
function togglePassword(inputId) {
    const input = document.getElementById(inputId);
    if (!input) return;
    
    const button = input.nextElementSibling;
    if (input.type === 'password') {
        input.type = 'text';
        if (button) button.textContent = 'Ocultar';
    } else {
        input.type = 'password';
        if (button) button.textContent = 'Mostrar';
    }
}

// Inicializar módulo de configuración
function inicializarModuloConfiguracion() {
    console.log('⚙️ Inicializando módulo de configuración...');
    
    // Generar datos mock
    generarDatosMockUsuarios();
    generarDatosMockRespaldos();
    
    // Cargar última sección activa o mostrar General
    const seccionActiva = document.querySelector('.config-seccion.active');
    if (seccionActiva) {
        const seccionId = seccionActiva.id.replace('seccion', '');
        const seccion = seccionId.charAt(0).toLowerCase() + seccionId.slice(1);
        if (seccion === 'general') {
            cargarUsuarios();
        } else if (seccion === 'backup') {
            cargarHistorialBackup();
        }
    }
}

// Exponer funciones globalmente
if (typeof window !== 'undefined') {
    window.mostrarSeccionConfig = mostrarSeccionConfig;
    window.guardarConfiguracion = guardarConfiguracion;
    window.abrirModalUsuario = abrirModalUsuario;
    window.cerrarModalUsuario = cerrarModalUsuario;
    window.guardarUsuario = guardarUsuario;
    window.editarUsuario = editarUsuario;
    window.eliminarUsuario = eliminarUsuario;
    window.crearRespaldo = crearRespaldo;
    window.restaurarRespaldo = restaurarRespaldo;
    window.descargarBackup = descargarBackup;
    window.togglePassword = togglePassword;
    window.inicializarModuloConfiguracion = inicializarModuloConfiguracion;
}

// Inicializar cuando se navega a configuración
if (typeof cambiarPantalla !== 'undefined') {
    const cambiarPantallaOriginal = cambiarPantalla;
    cambiarPantalla = function(ocultar, mostrar) {
        cambiarPantallaOriginal(ocultar, mostrar);
        if (mostrar === 'configuracion') {
            setTimeout(() => {
                inicializarModuloConfiguracion();
            }, 300);
        }
    };
}
