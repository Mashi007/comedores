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
window.cerrarSesion = cerrarSesion;
window.marcarLeida = marcarLeida;
window.marcarTodasLeidas = marcarTodasLeidas;
window.gestionarNotificacion = gestionarNotificacion;
window.enviarMensajeAI = enviarMensajeAI;

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
    
    const data = [320, 345, 330, 360, 340];
    const labels = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'];
    const charolas = [64, 69, 66, 72, 68];
    const merma = [12, 14, 13, 15, 14];
    
    chartInstances.chart3 = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Comidas Servidas',
                data: data,
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
                            const eficiencia = ((data[index] / (data[index] + merma[index] * 10)) * 100).toFixed(1);
                            return [
                                `🍽️ Comidas: ${data[index]}`,
                                `📦 Charolas: ${charolas[index]}`,
                                `📊 Merma: ${merma[index]} kg`,
                                `📈 Eficiencia: ${eficiencia}%`
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
    
    const productos = [
        { name: 'Arroz', stock: 450, reorder: 150, usage: 85, category: 'Granos', color: '#3b82f6' },
        { name: 'Frijoles', stock: 80, reorder: 50, usage: 45, category: 'Granos', color: '#8b5cf6' },
        { name: 'Pollo', stock: 280, reorder: 100, usage: 120, category: 'Carnes', color: '#ef4444' },
        { name: 'Carne Res', stock: 180, reorder: 80, usage: 95, category: 'Carnes', color: '#f59e0b' },
        { name: 'Tomates', stock: 120, reorder: 60, usage: 35, category: 'Vegetales', color: '#10b981' },
        { name: 'Lechuga', stock: 45, reorder: 30, usage: 25, category: 'Vegetales', color: '#06b6d4' },
        { name: 'Aceite', stock: 200, reorder: 80, usage: 40, category: 'Condimentos', color: '#f97316' },
        { name: 'Sal', stock: 350, reorder: 100, usage: 15, category: 'Condimentos', color: '#64748b' },
        { name: 'Pasta', stock: 220, reorder: 90, usage: 65, category: 'Granos', color: '#ec4899' },
        { name: 'Cebolla', stock: 95, reorder: 50, usage: 55, category: 'Vegetales', color: '#84cc16' }
    ];
    
    const data = productos.map(p => ({
        x: p.stock,
        y: p.reorder,
        r: Math.max(p.usage * 1.2, 15) // Radio basado en uso, mínimo 15 para visibilidad
    }));
    
    chartInstances.chart8 = new Chart(ctx, {
        type: 'bubble',
        data: {
            datasets: productos.map((p, index) => ({
                label: p.name,
                data: [{
                    x: p.stock,
                    y: p.reorder,
                    r: Math.max(p.usage * 1.2, 15)
                }],
                backgroundColor: function(context) {
                    const stock = p.stock;
                    const reorder = p.reorder;
                    if (stock <= reorder * 1.2) return 'rgba(239, 68, 68, 0.6)'; // Rojo si crítico
                    if (stock <= reorder * 2) return 'rgba(245, 158, 11, 0.6)'; // Naranja si bajo
                    return p.color + '80'; // Color del producto con transparencia
                },
                borderColor: function(context) {
                    const stock = p.stock;
                    const reorder = p.reorder;
                    if (stock <= reorder * 1.2) return '#dc2626';
                    if (stock <= reorder * 2) return '#d97706';
                    return p.color;
                },
                borderWidth: 2,
                hoverBackgroundColor: function(context) {
                    const stock = p.stock;
                    const reorder = p.reorder;
                    if (stock <= reorder * 1.2) return 'rgba(239, 68, 68, 0.9)';
                    if (stock <= reorder * 2) return 'rgba(245, 158, 11, 0.9)';
                    return p.color + 'CC';
                },
                hoverBorderColor: function(context) {
                    const stock = p.stock;
                    const reorder = p.reorder;
                    if (stock <= reorder * 1.2) return '#b91c1c';
                    if (stock <= reorder * 2) return '#b45309';
                    return p.color;
                },
                hoverBorderWidth: 3
            }))
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
                            const datasetIndex = context[0].datasetIndex;
                            return productos[datasetIndex].name;
                        },
                        label: function(context) {
                            const datasetIndex = context[0].datasetIndex;
                            const p = productos[datasetIndex];
                            const stock = p.stock;
                            const reorder = p.reorder;
                            const porcentaje = ((stock / reorder) * 100).toFixed(1);
                            
                            let estado = '';
                            let estadoIcon = '';
                            if (stock <= reorder * 1.2) {
                                estado = '🔴 Crítico';
                                estadoIcon = '🔴';
                            } else if (stock <= reorder * 2) {
                                estado = '🟡 Atención';
                                estadoIcon = '🟡';
                            } else {
                                estado = '🟢 Óptimo';
                                estadoIcon = '🟢';
                            }
                            
                            return [
                                `📦 Stock actual: ${stock} kg`,
                                `📋 Punto de reorden: ${reorder} kg`,
                                `📊 Stock vs Reorden: ${porcentaje}%`,
                                `📈 Uso semanal: ${p.usage} kg`,
                                `🏷️ Categoría: ${p.category}`,
                                `🎯 Estado: ${estado}`,
                                stock <= reorder * 1.2 ? '⚠️ COMPRA URGENTE REQUERIDA' : ''
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
                    title: {
                        display: true,
                        text: 'Punto de Reorden (kg)',
                        font: {
                            size: 14,
                            weight: 'bold'
                        },
                        color: '#64748b'
                    },
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
                }
            },
            animation: {
                duration: 2000,
                easing: 'easeInOutQuart'
            }
        }
    });
}

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

// Chat AI
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
        
        // Determinar respuesta
        let respuesta = respuestasAI.default;
        const mensajeLower = mensaje.toLowerCase();
        
        if (mensajeLower.includes('optimizar') || mensajeLower.includes('consumo')) {
            respuesta = respuestasAI.optimizar;
        } else if (mensajeLower.includes('sugiere') || mensajeLower.includes('menú') || mensajeLower.includes('menu')) {
            respuesta = respuestasAI.sugiere;
        } else if (mensajeLower.includes('analiza') || mensajeLower.includes('inventario')) {
            respuesta = respuestasAI.analiza;
        } else if (mensajeLower.includes('comprar') || mensajeLower.includes('compra') || mensajeLower.includes('productos')) {
            respuesta = respuestasAI.comprar;
        }
        
        // Remover indicador de escritura y mostrar respuesta
        setTimeout(() => {
            typingIndicator.remove();
            const aiMessage = document.createElement('div');
            aiMessage.className = 'chat-message ai-message';
            aiMessage.innerHTML = `
                <div class="message-avatar">🤖</div>
                <div class="message-content">
                    <div class="message-text">${respuesta.mensaje.replace(/\n/g, '<br>')}</div>
                    <div class="message-time">Ahora</div>
                </div>
            `;
            chatMessages.appendChild(aiMessage);
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }, respuesta.tiempo);
    }, 500);
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
