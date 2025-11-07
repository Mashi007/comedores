// Mock Data
const mockData = {
    usuario: {
        email: 'admin@comedor.com',
        password: 'demo123',
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
        { id: 10, nombre: 'Azúcar', categoria: 'Endulzantes', stock: 40, stockMinimo: 10, unidad: 'kg' }
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
    movimientosInventario: [],
    menus: [],
    produccion: [],
    encuestas: [],
    notificaciones: []
};

// Navegación - Disponible inmediatamente
function mostrarLogin() {
    try {
        cambiarPantalla('portada', 'login');
    } catch (error) {
        console.error('Error al mostrar login:', error);
        alert('Error al cargar la página de login. Por favor, recarga la página.');
    }
}

function cambiarPantalla(ocultar, mostrar) {
    const ocultarEl = document.getElementById(ocultar);
    const mostrarEl = document.getElementById(mostrar);
    if (ocultarEl && mostrarEl) {
        ocultarEl.classList.remove('active');
        mostrarEl.classList.add('active');
    } else {
        console.error('Elementos no encontrados:', { ocultar, mostrar });
    }
}

// Inicialización
document.addEventListener('DOMContentLoaded', function() {
    try {
        inicializarApp();
    } catch (error) {
        console.error('Error en inicialización:', error);
    }
});

function inicializarApp() {
    try {
        // Solo cargar funciones que no requieren estar en una pantalla específica
        // Los gráficos se cargarán cuando se navegue al dashboard
    } catch (error) {
        console.error('Error al inicializar app:', error);
    }
}

function validarLogin(event) {
    event.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    if (email === mockData.usuario.email && password === mockData.usuario.password) {
        document.getElementById('userName').textContent = mockData.usuario.nombre;
        cambiarPantalla('login', 'menu');
        return false;
    } else {
        alert('Credenciales incorrectas. Use: admin@comedor.com / demo123');
        return false;
    }
}

function cerrarSesion() {
    cambiarPantalla('menu', 'portada');
    document.getElementById('loginForm').reset();
}


function navegar(destino) {
    cambiarPantalla('menu', destino);
    
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
    }
}

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

function crearGrafico1() {
    const ctx = document.getElementById('chart1');
    if (!ctx) return;
    if (typeof Chart === 'undefined') return;
    try {
        new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'],
            datasets: [{
                label: 'Consumo (kg)',
                data: [45, 52, 48, 61, 55, 42, 38],
                borderColor: '#2563eb',
                backgroundColor: 'rgba(37, 99, 235, 0.1)',
                tension: 0.4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: { display: false }
            }
        }
    });
}

function crearGrafico2() {
    const ctx = document.getElementById('chart2');
    if (!ctx) return;
    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Carnes', 'Verduras', 'Granos', 'Otros'],
            datasets: [{
                data: [35, 25, 30, 10],
                backgroundColor: ['#ef4444', '#10b981', '#f59e0b', '#64748b']
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true
        }
    });
}

function crearGrafico3() {
    const ctx = document.getElementById('chart3');
    if (!ctx) return;
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'],
            datasets: [{
                label: 'Comidas Servidas',
                data: [320, 345, 310, 365, 342, 280, 250],
                backgroundColor: '#10b981'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: { display: false }
            }
        }
    });
}

function crearGrafico4() {
    const ctx = document.getElementById('chart4');
    if (!ctx) return;
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Arroz', 'Frijoles', 'Papa', 'Carne', 'Pollo'],
            datasets: [{
                label: 'Uso (kg)',
                data: [180, 150, 200, 120, 90],
                backgroundColor: '#2563eb'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            indexAxis: 'y',
            plugins: {
                legend: { display: false }
            }
        }
    });
}

function crearGrafico5() {
    const ctx = document.getElementById('chart5');
    if (!ctx) return;
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Sem 1', 'Sem 2', 'Sem 3', 'Sem 4'],
            datasets: [{
                label: 'Satisfacción',
                data: [4.2, 4.4, 4.5, 4.6],
                borderColor: '#f59e0b',
                backgroundColor: 'rgba(245, 158, 11, 0.1)',
                tension: 0.4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            scales: {
                y: {
                    min: 3,
                    max: 5
                }
            }
        }
    });
}

function crearGrafico6() {
    const ctx = document.getElementById('chart6');
    if (!ctx) return;
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Lun', 'Mar', 'Mié', 'Jue', 'Vie'],
            datasets: [{
                label: 'Planificado (kg)',
                data: [50, 55, 52, 58, 54],
                backgroundColor: '#10b981'
            }, {
                label: 'Merma (kg)',
                data: [5, 6, 4, 7, 5],
                backgroundColor: '#ef4444'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true
        }
    });
}

// Compras
function simularOCRWhatsApp() {
    const modal = document.createElement('div');
    modal.className = 'whatsapp-modal';
    modal.innerHTML = `
        <div class="whatsapp-modal-content">
            <div class="whatsapp-icon">📱</div>
            <h3>Simulación de Ingreso por WhatsApp</h3>
            <p>Se ha recibido una factura por WhatsApp y procesado con OCR</p>
            <div style="margin: 1.5rem 0; padding: 1rem; background: #f0f0f0; border-radius: 0.5rem; text-align: left;">
                <p><strong>Proveedor:</strong> Proveedor Nuevo</p>
                <p><strong>Factura:</strong> FAC-NEW-001</p>
                <p><strong>Productos detectados:</strong> Arroz 50kg, Frijoles 30kg</p>
                <p><strong>Monto:</strong> $3,200</p>
            </div>
            <button class="btn-primary" onclick="procesarFacturaOCR(this)">Procesar Factura</button>
            <button class="btn-secondary" onclick="this.closest('.whatsapp-modal').remove()" style="margin-top: 0.5rem;">Cerrar</button>
        </div>
    `;
    document.body.appendChild(modal);
}

function procesarFacturaOCR(btn) {
    const nuevaCompra = {
        id: mockData.compras.length + 1,
        fecha: new Date().toISOString().split('T')[0],
        proveedor: 'Proveedor Nuevo',
        factura: 'FAC-NEW-001',
        productos: 'Arroz, Frijoles',
        monto: 3200,
        estado: 'Procesada'
    };
    mockData.compras.unshift(nuevaCompra);
    cargarCompras();
    btn.closest('.whatsapp-modal').remove();
    alert('Factura procesada exitosamente');
}

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

function filtrarCompras() {
    // Implementación básica de filtros
    alert('Filtros aplicados (funcionalidad de demo)');
}

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

function mostrarFormularioInventario() {
    document.getElementById('formularioInventario').style.display = 'block';
}

function ocultarFormularioInventario() {
    document.getElementById('formularioInventario').style.display = 'none';
    document.getElementById('formularioInventario').querySelector('form').reset();
}

function procesarMovimientoInventario(event) {
    event.preventDefault();
    const productoId = parseInt(document.getElementById('productoInventario').value);
    const tipo = document.getElementById('tipoMovimiento').value;
    const cantidad = parseFloat(document.getElementById('cantidadInventario').value);
    const observaciones = document.getElementById('observacionesInventario').value;
    
    const producto = mockData.productos.find(p => p.id === productoId);
    if (!producto) return;
    
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
    
    mostrarModalWhatsApp('Movimiento de Inventario', `Se registró ${tipo === 'entrada' ? 'entrada' : 'salida'} de ${cantidad} ${producto.unidad} de ${producto.nombre}`);
    cargarInventario();
    ocultarFormularioInventario();
}

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

// Planificación de Menús
function nuevoMenu() {
    const fecha = document.getElementById('fechaMenu').value;
    if (!fecha) {
        alert('Seleccione una fecha');
        return;
    }
    document.getElementById('fechaMenuForm').value = fecha;
    document.getElementById('formularioMenu').style.display = 'block';
}

function agregarReceta() {
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
}

function agregarMaterial(btn) {
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
}

function guardarMenu(event) {
    event.preventDefault();
    const fecha = document.getElementById('fechaMenuForm').value;
    const recetasItems = document.querySelectorAll('.receta-item');
    const recetas = [];
    
    recetasItems.forEach((item, index) => {
        const nombre = item.querySelector('.nombre-receta').value;
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
        recetas.push({ nombre, materiales });
    });
    
    const menu = {
        id: mockData.menus.length + 1,
        fecha,
        recetas,
        fechaCreacion: new Date().toISOString()
    };
    
    mockData.menus.push(menu);
    cargarMenus();
    cancelarMenu();
    alert('Menú guardado exitosamente');
}

function cancelarMenu() {
    document.getElementById('formularioMenu').style.display = 'none';
    document.getElementById('formularioMenu').querySelector('form').reset();
    document.getElementById('recetasContainer').innerHTML = `
        <div class="receta-item">
            <h4>Receta 1</h4>
            <div class="form-group">
                <label>Nombre del Plato</label>
                <input type="text" class="nombre-receta" placeholder="Ej: Arroz con Frijoles" required>
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
        </div>
    `;
    cargarProductosEnSelects();
}

function cargarMenus() {
    const container = document.getElementById('menusList');
    if (!container) return;
    
    if (mockData.menus.length === 0) {
        container.innerHTML = '<p style="text-align: center; color: var(--text-secondary);">No hay menús planificados</p>';
        return;
    }
    
    container.innerHTML = mockData.menus.map(menu => `
        <div class="menu-item">
            <h4>Menú del ${new Date(menu.fecha).toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</h4>
            <div class="receta-list">
                ${menu.recetas.map(receta => `
                    <div class="receta-list-item">
                        <strong>${receta.nombre}</strong>
                        <ul style="margin-top: 0.5rem; margin-left: 1.5rem;">
                            ${receta.materiales.map(m => `<li>${m.producto}: ${m.cantidad} kg</li>`).join('')}
                        </ul>
                    </div>
                `).join('')}
            </div>
        </div>
    `).join('');
}

function generarCompras() {
    if (mockData.menus.length === 0) {
        alert('No hay menús planificados para generar compras');
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
        alert('El inventario actual es suficiente para los menús planificados');
        return;
    }
    
    const pedidoTexto = pedidos.map(p => `${p.producto}: ${p.cantidad.toFixed(2)} ${p.unidad}`).join('\n');
    alert(`Pedido de compra generado:\n\n${pedidoTexto}\n\nSe ha enviado al departamento de compras`);
}

function cargarMenusEnProduccion() {
    const select = document.getElementById('menuProduccion');
    if (!select) return;
    
    select.innerHTML = '<option value="">Seleccionar menú del día...</option>' +
        mockData.menus.map(menu => 
            `<option value="${menu.id}">${new Date(menu.fecha).toLocaleDateString()}</option>`
        ).join('');
}

// Producción
function mostrarFormularioProduccion() {
    const menuId = document.getElementById('menuProduccion').value;
    if (!menuId) {
        alert('Seleccione un menú primero');
        return;
    }
    
    const menu = mockData.menus.find(m => m.id === parseInt(menuId));
    if (!menu) return;
    
    const selectReceta = document.getElementById('recetaProduccion');
    selectReceta.innerHTML = '<option value="">Seleccionar receta...</option>' +
        menu.recetas.map((r, i) => `<option value="${i}">${r.nombre}</option>`).join('');
    
    document.getElementById('formularioProduccion').style.display = 'block';
}

function ocultarFormularioProduccion() {
    document.getElementById('formularioProduccion').style.display = 'none';
    document.getElementById('formularioProduccion').querySelector('form').reset();
}

function reportarProduccion(event) {
    event.preventDefault();
    const menuId = parseInt(document.getElementById('menuProduccion').value);
    const recetaIndex = parseInt(document.getElementById('recetaProduccion').value);
    const cantidad = parseInt(document.getElementById('cantidadReceta').value);
    const charolas = parseInt(document.getElementById('charolas').value);
    const merma = parseFloat(document.getElementById('merma').value);
    const observaciones = document.getElementById('observacionesProduccion').value;
    
    const menu = mockData.menus.find(m => m.id === menuId);
    if (!menu) return;
    
    const receta = menu.recetas[recetaIndex];
    
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
}

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
function crearEncuesta() {
    document.getElementById('formularioEncuesta').style.display = 'block';
}

function cancelarEncuesta() {
    document.getElementById('formularioEncuesta').style.display = 'none';
    document.getElementById('formularioEncuesta').querySelector('form').reset();
}

function guardarEncuesta(event) {
    event.preventDefault();
    const titulo = document.getElementById('tituloEncuesta').value;
    const preguntasTexto = document.getElementById('preguntasEncuesta').value;
    const preguntas = preguntasTexto.split('\n').filter(p => p.trim());
    
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
    
    // Generar QR
    generarQR(encuesta);
}

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

// Notificaciones
function cargarNotificaciones() {
    generarNotificacionesAutomaticas();
    const container = document.getElementById('notificacionesContainer');
    if (!container) return;
    
    if (mockData.notificaciones.length === 0) {
        container.innerHTML = '<p style="text-align: center; color: var(--text-secondary);">No hay notificaciones</p>';
        return;
    }
    
    container.innerHTML = mockData.notificaciones.map(notif => `
        <div class="notificacion-item ${notif.tipo}">
            <div class="notificacion-icon">${notif.icono}</div>
            <div class="notificacion-content">
                <h4>${notif.titulo}</h4>
                <p>${notif.mensaje}</p>
                <small>${new Date(notif.fecha).toLocaleString()}</small>
            </div>
        </div>
    `).join('');
}

function generarNotificacionesAutomaticas() {
    mockData.notificaciones = [];
    
    // Notificación de consumo excesivo
    mockData.notificaciones.push({
        id: 1,
        tipo: 'warning',
        icono: '⚠️',
        titulo: 'Consumo Excesivo',
        mensaje: 'Has consumido 10% (3kg) más de arroz de lo planificado',
        fecha: new Date().toISOString()
    });
    
    // Notificación de inventario bajo
    const productoBajo = mockData.productos.find(p => p.stock <= p.stockMinimo * 1.5);
    if (productoBajo) {
        mockData.notificaciones.push({
            id: 2,
            tipo: 'danger',
            icono: '🔴',
            titulo: 'Inventario Bajo',
            mensaje: `El inventario de ${productoBajo.nombre} ha disminuido 3% (${productoBajo.stock} ${productoBajo.unidad}). Estás a ${(productoBajo.stockMinimo - productoBajo.stock).toFixed(1)} ${productoBajo.unidad} del inventario mínimo`,
            fecha: new Date().toISOString()
        });
    }
    
    // Notificación de inventario crítico
    const productoCritico = mockData.productos.find(p => p.stock <= p.stockMinimo);
    if (productoCritico) {
        mockData.notificaciones.push({
            id: 3,
            tipo: 'danger',
            icono: '🚨',
            titulo: 'Inventario Crítico',
            mensaje: `Estás a ${productoCritico.stockMinimo - productoCritico.stock} ${productoCritico.unidad} del inventario mínimo para ${productoCritico.nombre}. Remito gestión de compra a departamento.`,
            fecha: new Date().toISOString()
        });
    }
    
    // Notificación informativa
    mockData.notificaciones.push({
        id: 4,
        tipo: 'info',
        icono: 'ℹ️',
        titulo: 'Menú Planificado',
        mensaje: `Tienes ${mockData.menus.length} menú(s) planificado(s) para esta semana`,
        fecha: new Date().toISOString()
    });
}

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

