// Sistema de Notificaciones Toast
class ToastNotification {
    static show(message, type = 'success', duration = 3000) {
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        toast.innerHTML = `
            <div class="toast-icon">${this.getIcon(type)}</div>
            <div class="toast-message">${message}</div>
            <button class="toast-close" onclick="this.parentElement.remove()">×</button>
        `;
        
        document.body.appendChild(toast);
        
        // Animación de entrada
        setTimeout(() => toast.classList.add('show'), 10);
        
        // Auto-remover después de duration
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 300);
        }, duration);
    }
    
    static getIcon(type) {
        const icons = {
            success: '✓',
            error: '✕',
            warning: '⚠',
            info: 'ℹ'
        };
        return icons[type] || icons.info;
    }
}

// Sistema de Loading States
class LoadingState {
    static setLoading(button, text = 'Procesando...') {
        if (!button) return;
        button.disabled = true;
        button.dataset.originalText = button.innerHTML;
        button.innerHTML = `<span class="spinner"></span> ${text}`;
        button.classList.add('loading');
    }
    
    static removeLoading(button) {
        if (!button) return;
        button.disabled = false;
        button.innerHTML = button.dataset.originalText || button.innerHTML;
        button.classList.remove('loading');
    }
}

// Validación en tiempo real
class FormValidator {
    static validateField(field) {
        const value = field.value.trim();
        const type = field.type;
        let isValid = true;
        let message = '';
        
        // Remover mensajes anteriores
        this.removeError(field);
        
        if (field.hasAttribute('required') && !value) {
            isValid = false;
            message = 'Este campo es obligatorio';
        } else if (type === 'email' && value && !this.isValidEmail(value)) {
            isValid = false;
            message = 'Email inválido';
        } else if (type === 'number' && value) {
            const num = parseFloat(value);
            if (isNaN(num) || num < 0) {
                isValid = false;
                message = 'Debe ser un número válido mayor a 0';
            }
        }
        
        if (!isValid) {
            this.showError(field, message);
        }
        
        return isValid;
    }
    
    static isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }
    
    static showError(field, message) {
        field.classList.add('error');
        const errorDiv = document.createElement('div');
        errorDiv.className = 'field-error';
        errorDiv.textContent = message;
        field.parentElement.appendChild(errorDiv);
    }
    
    static removeError(field) {
        field.classList.remove('error');
        const error = field.parentElement.querySelector('.field-error');
        if (error) error.remove();
    }
    
    static validateForm(form) {
        const fields = form.querySelectorAll('input[required], select[required], textarea[required]');
        let isValid = true;
        
        fields.forEach(field => {
            if (!this.validateField(field)) {
                isValid = false;
            }
        });
        
        return isValid;
    }
}

// Utilidades globales
window.ToastNotification = ToastNotification;
window.LoadingState = LoadingState;
window.FormValidator = FormValidator;

