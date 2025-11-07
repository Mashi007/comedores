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
    const pantallasSistema = ['menu', 'dashboard', 'compras', 'inventario', 'planificacion', 'produccion', 'servicio', 'notificaciones', 'chat-ai', 'configuracion'];
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
        
        console.log('✅ Cambio de pantalla completado');
    } catch (error) {
        console.error('❌ Error al cambiar pantalla:', error);
    }
}

// Hacer funciones globales
window.cambiarPantalla = cambiarPantalla;
window.navegar = navegar;
window.toggleSidebar = toggleSidebar;
window.toggleUserMenu = toggleUserMenu;
window.cerrarSesion = cerrarSesion;
window.marcarLeida = marcarLeida;
window.marcarTodasLeidas = marcarTodasLeidas;
window.gestionarNotificacion = gestionarNotificacion;
window.enviarMensajeAI = enviarMensajeAI;
window.mostrarSimuladorOCR = mostrarSimuladorOCR;
window.cerrarSimuladorOCR = cerrarSimuladorOCR;
window.procesarFacturaOCR = procesarFacturaOCR;
window.cerrarFormularioDigitalizacion = cerrarFormularioDigitalizacion;
window.agregarProducto = agregarProducto;
window.guardarFactura = guardarFactura;
window.mostrarDashboardKardex = mostrarDashboardKardex;
window.cerrarDashboardKardex = cerrarDashboardKardex;
window.filtrarKardex = filtrarKardex;

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
    crearGrafico7();
    crearGrafico8();
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
        { name: 'Sal', stock: 350, reorder: 100, usage: 15, category: 'Condimentos', cuadrante: 4 },
        { name: 'Vinagre', stock: 180, reorder: 50, usage: 10, category: 'Condimentos', cuadrante: 4 },
        { name: 'Especias', stock: 120, reorder: 30, usage: 8, category: 'Condimentos', cuadrante: 4 },
        { name: 'Conservas', stock: 300, reorder: 80, usage: 25, category: 'Enlatados', cuadrante: 4 }
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
        if (stock < reorder) return 1; // Stock menor al inventario de seguridad
        if (stock < reorder * 2) return 2; // Dentro de inventario de seguridad
        if (stock < reorder * 3) return 3; // Inventario según menús planificados
        return 4; // Sobre stock
    }
    
    // Función para obtener color según cuadrante
    function getColorByCuadrante(cuadrante, opacity = '80') {
        const colors = {
            1: '#ef4444', // Rojo - Crítico
            2: '#f59e0b', // Naranja - Atención
            3: '#10b981', // Verde - Óptimo
            4: '#3b82f6'  // Azul - Sobre stock
        };
        return colors[cuadrante] + opacity;
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
                    min: 0,
                    max: maxReorder,
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
                        stepSize: Math.ceil(maxReorder / 10), // Dividir en 10 pasos
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
                    agregarEtiquetasCuadrantes(chart, maxStock, maxReorder);
                }, 100);
            }
        }
    });
    
    // Agregar etiquetas de cuadrantes después de la inicialización
    setTimeout(() => {
        agregarEtiquetasCuadrantes(chartInstances.chart8, maxStock, maxReorder);
    }, 500);
}

function agregarEtiquetasCuadrantes(chart, maxStock, maxReorder) {
    if (!chart || !chart.canvas) return;
    
    const canvas = chart.canvas;
    const ctx = canvas.getContext('2d');
    const chartArea = chart.chartArea;
    
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
    
    const labels = [
        {
            text: '1. Stock menor al inventario de seguridad',
            x: maxStock * 0.25,
            y: maxReorder * 0.25,
            color: '#ef4444',
            bg: 'rgba(239, 68, 68, 0.1)'
        },
        {
            text: '2. Dentro de inventario de seguridad',
            x: maxStock * 0.75,
            y: maxReorder * 0.25,
            color: '#f59e0b',
            bg: 'rgba(245, 158, 11, 0.1)'
        },
        {
            text: '3. Inventario según menús planificados',
            x: maxStock * 0.25,
            y: maxReorder * 0.75,
            color: '#10b981',
            bg: 'rgba(16, 185, 129, 0.1)'
        },
        {
            text: '4. Sobre stock',
            x: maxStock * 0.75,
            y: maxReorder * 0.75,
            color: '#3b82f6',
            bg: 'rgba(59, 130, 246, 0.1)'
        }
    ];
    
    labels.forEach(label => {
        const labelEl = document.createElement('div');
        labelEl.className = 'cuadrante-label';
        labelEl.textContent = label.text;
        labelEl.style.position = 'absolute';
        labelEl.style.padding = '0.5rem 1rem';
        labelEl.style.borderRadius = '6px';
        labelEl.style.fontSize = '0.85rem';
        labelEl.style.fontWeight = '600';
        labelEl.style.color = label.color;
        labelEl.style.background = label.bg;
        labelEl.style.border = `2px solid ${label.color}40`;
        labelEl.style.pointerEvents = 'none';
        labelEl.style.zIndex = '10';
        
        // Calcular posición basada en el área del gráfico
        const chartArea = chart.chartArea;
        if (!chartArea) return;
        
        const xPercent = ((label.x / maxStock) * 100);
        const yPercent = ((label.y / maxReorder) * 100);
        
        labelEl.style.left = xPercent + '%';
        labelEl.style.top = yPercent + '%';
        labelEl.style.transform = 'translate(-50%, -50%)';
        
        labelContainer.appendChild(labelEl);
    });
}

// Compras - OCR y KARDEX
const comprasData = {
    facturas: [],
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

function cerrarSimuladorOCR() {
    document.getElementById('simuladorOCR').style.display = 'none';
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

function cerrarFormularioDigitalizacion() {
    document.getElementById('formularioDigitalizacion').style.display = 'none';
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
    
    const factura = {
        id: Date.now(),
        proveedor,
        fechaFactura,
        numeroFactura,
        productos,
        total,
        fechaRegistro: new Date().toISOString()
    };
    
    comprasData.facturas.push(factura);
    
    // Actualizar KARDEX
    productos.forEach(prod => {
        actualizarKardex(prod.producto, prod.cantidad, fechaFactura);
    });
    
    // Guardar en memoria temporal
    guardarComprasEnMemoria();
    
    ToastNotification.show('Factura guardada correctamente', 'success', 2000);
    cerrarFormularioDigitalizacion();
    
    setTimeout(() => {
        mostrarDashboardKardex();
    }, 500);
    
    cargarListaCompras();
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
    document.getElementById('dashboardKardex').style.display = 'block';
    cargarKardex();
    cargarProductosEnFiltro();
}

function cerrarDashboardKardex() {
    document.getElementById('dashboardKardex').style.display = 'none';
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
    
    tbody.innerHTML = kardexFiltrado.map(mov => `
        <tr>
            <td>${new Date(mov.fecha).toLocaleDateString('es-ES')}</td>
            <td><strong>${mov.producto}</strong></td>
            <td>${mov.saldoInicial.toFixed(2)} kg</td>
            <td class="ingreso">+${mov.ingreso.toFixed(2)} kg</td>
            <td class="salida">${mov.salida > 0 ? '-' + mov.salida.toFixed(2) : '0.00'} kg</td>
            <td class="saldo-final"><strong>${mov.saldoFinal.toFixed(2)} kg</strong></td>
            <td>${mov.consumoPromedio.toFixed(2)} kg/día</td>
            <td class="${mov.diasEstimados > 30 ? 'dias-optimo' : (mov.diasEstimados > 15 ? 'dias-atencion' : 'dias-critico')}">
                <strong>${mov.diasEstimados} días</strong>
            </td>
            <td>${mov.estado}</td>
        </tr>
    `).join('');
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

// Notificaciones
function marcarLeida(id) {
    const notificacion = document.querySelector(`[onclick*="${id}"]`)?.closest('.notificacion-card');
    if (notificacion) {
        notificacion.style.opacity = '0.6';
        notificacion.style.transform = 'translateX(-20px)';
        setTimeout(() => {
            notificacion.remove();
            actualizarContadorNotificaciones();
        }, 300);
        ToastNotification.show('Notificación marcada como leída', 'success', 2000);
    }
}

function marcarTodasLeidas() {
    const notificaciones = document.querySelectorAll('.notificacion-card');
    notificaciones.forEach((notif, index) => {
        setTimeout(() => {
            notif.style.opacity = '0.6';
            notif.style.transform = 'translateX(-20px)';
            setTimeout(() => notif.remove(), 300);
        }, index * 100);
    });
    setTimeout(() => {
        actualizarContadorNotificaciones();
        ToastNotification.show('Todas las notificaciones marcadas como leídas', 'success', 2000);
    }, notificaciones.length * 100);
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
    }
}

function actualizarContadorNotificaciones() {
    const contador = document.querySelector('[data-section="notificaciones"] .nav-badge');
    const notificaciones = document.querySelectorAll('.notificacion-card').length;
    if (contador) {
        contador.textContent = notificaciones || '';
        if (notificaciones === 0) {
            contador.style.display = 'none';
        }
    }
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
