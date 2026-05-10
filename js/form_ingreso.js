/**
 * Portal de Talentos Escolares
 * Formulario de Contacto - Validaciones
 * Tecnologías: JavaScript + jQuery
 * Archivo: contacto.js
 */

// Esperar a que el DOM esté completamente cargado (jQuery)
$(document).ready(function() {
    inicializarFormulario();
    
    // Efecto de focus con jQuery
    $('.form-control, .form-select').on('focus', function() {
        $(this).css('box-shadow', '0 0 0 0.2rem rgba(102, 126, 234, 0.25)');
    }).on('blur', function() {
        $(this).css('box-shadow', 'none');
    });
});

function inicializarFormulario() {
    // Evento submit con jQuery
    $('#formTalento').on('submit', function(e) {
        e.preventDefault();
        validarFormulario();
    });
    
    // Evento reset con jQuery
    $('#btnReset').on('click', function() {
        resetearFormulario();
    });
    
    // Validaciones en tiempo real con jQuery
    $('#nombre').on('input', function() { validarNombre(); });
    $('#direccion').on('input', function() { validarDireccion(); });
    $('#telefono').on('input', function() { validarTelefono(); });
    $('#email').on('input', function() { validarEmail(); });
    $('#talento').on('change', function() { validarTalento(); });
    $('#descripcion').on('input', function() { validarDescripcion(); });
    
    // Validación de radio buttons (género)
    $('input[name="genero"]').on('change', function() { validarGenero(); });
}

// Función principal de validación
function validarFormulario() {
    let esValido = true;
    
    // Limpiar mensajes de error y estilos
    limpiarErrores();
    
    // Validar cada campo
    esValido = validarNombre() && esValido;
    esValido = validarDireccion() && esValido;
    esValido = validarTelefono() && esValido;
    esValido = validarEmail() && esValido;
    esValido = validarGenero() && esValido;
    esValido = validarTalento() && esValido;
    esValido = validarDescripcion() && esValido;
    
    // Si todo es válido, mostrar mensaje de éxito
    if (esValido) {
        mostrarMensajeExito();
        console.log('Formulario válido:', obtenerDatosFormulario());
    }
    
    return esValido;
}

// Validar Nombre y Apellidos
function validarNombre() {
    const $nombre = $('#nombre');
    const valor = $nombre.val().trim();
    const $errorDiv = $('#error-nombre');
    
    if (valor === '') {
        $errorDiv.text('El nombre y apellidos son obligatorios');
        $nombre.addClass('input-error').removeClass('input-valid');
        return false;
    }
    
    if (valor.length < 5) {
        $errorDiv.text('Ingresa nombre y apellido completo (mínimo 5 caracteres)');
        $nombre.addClass('input-error').removeClass('input-valid');
        return false;
    }
    
    if (valor.length > 80) {
        $errorDiv.text('El nombre no puede tener más de 80 caracteres');
        $nombre.addClass('input-error').removeClass('input-valid');
        return false;
    }
    
    // Validar que solo contenga letras, espacios y algunos caracteres especiales
    const regex = /^[a-zA-ZáéíóúñÁÉÍÓÚÑ\s]+$/;
    if (!regex.test(valor)) {
        $errorDiv.text('El nombre solo puede contener letras y espacios');
        $nombre.addClass('input-error').removeClass('input-valid');
        return false;
    }
    
    $errorDiv.text('');
    $nombre.removeClass('input-error').addClass('input-valid');
    return true;
}

// Validar Dirección
function validarDireccion() {
    const $direccion = $('#direccion');
    const valor = $direccion.val().trim();
    const $errorDiv = $('#error-direccion');
    
    if (valor === '') {
        $errorDiv.text('La dirección es obligatoria');
        $direccion.addClass('input-error').removeClass('input-valid');
        return false;
    }
    
    if (valor.length < 10) {
        $errorDiv.text('Ingresa una dirección completa (mínimo 10 caracteres)');
        $direccion.addClass('input-error').removeClass('input-valid');
        return false;
    }
    
    if (valor.length > 100) {
        $errorDiv.text('La dirección no puede tener más de 100 caracteres');
        $direccion.addClass('input-error').removeClass('input-valid');
        return false;
    }
    
    $errorDiv.text('');
    $direccion.removeClass('input-error').addClass('input-valid');
    return true;
}

// Validar Teléfono
function validarTelefono() {
    const $telefono = $('#telefono');
    const valor = $telefono.val().trim();
    const $errorDiv = $('#error-telefono');
    
    if (valor === '') {
        $errorDiv.text('El teléfono es obligatorio');
        $telefono.addClass('input-error').removeClass('input-valid');
        return false;
    }
    
    // Validar formato de teléfono chileno/internacional
    // Formatos: +56912345678, 56912345678, 912345678, 9 1234 5678
    const regex = /^(\+?56)?\s?9\s?\d{4}\s?\d{4}$/;
    if (!regex.test(valor)) {
        $errorDiv.text('Ingresa un teléfono válido (ej: +56 9 1234 5678)');
        $telefono.addClass('input-error').removeClass('input-valid');
        return false;
    }
    
    $errorDiv.text('');
    $telefono.removeClass('input-error').addClass('input-valid');
    return true;
}

// Validar Email
function validarEmail() {
    const $email = $('#email');
    const valor = $email.val().trim();
    const $errorDiv = $('#error-email');
    
    if (valor === '') {
        $errorDiv.text('El correo electrónico es obligatorio');
        $email.addClass('input-error').removeClass('input-valid');
        return false;
    }
    
    // Expresión regular completa para validar email
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!regex.test(valor)) {
        $errorDiv.text('Ingresa un correo electrónico válido (ejemplo@dominio.com)');
        $email.addClass('input-error').removeClass('input-valid');
        return false;
    }
    
    $errorDiv.text('');
    $email.removeClass('input-error').addClass('input-valid');
    return true;
}

// Validar Género
function validarGenero() {
    const $generoSeleccionado = $('input[name="genero"]:checked');
    const $errorDiv = $('#error-genero');
    
    if ($generoSeleccionado.length === 0) {
        $errorDiv.text('Debes seleccionar un género');
        return false;
    }
    
    $errorDiv.text('');
    return true;
}

// Validar Talento (menú desplegable)
function validarTalento() {
    const $talento = $('#talento');
    const valor = $talento.val();
    const $errorDiv = $('#error-talento');
    
    if (valor === '') {
        $errorDiv.text('Debes seleccionar un talento');
        $talento.addClass('input-error').removeClass('input-valid');
        return false;
    }
    
    $errorDiv.text('');
    $talento.removeClass('input-error').addClass('input-valid');
    return true;
}

// Validar Descripción del talento
function validarDescripcion() {
    const $descripcion = $('#descripcion');
    const valor = $descripcion.val().trim();
    const $errorDiv = $('#error-descripcion');
    
    if (valor === '') {
        $errorDiv.text('Cuéntanos sobre tu talento, es obligatorio');
        $descripcion.addClass('input-error').removeClass('input-valid');
        return false;
    }
    
    if (valor.length < 20) {
        $errorDiv.text('Describe tu talento con más detalle (mínimo 20 caracteres)');
        $descripcion.addClass('input-error').removeClass('input-valid');
        return false;
    }
    
    if (valor.length > 500) {
        $errorDiv.text('La descripción no puede tener más de 500 caracteres');
        $descripcion.addClass('input-error').removeClass('input-valid');
        return false;
    }
    
    $errorDiv.text('');
    $descripcion.removeClass('input-error').addClass('input-valid');
    return true;
}

// Limpiar todos los mensajes de error
function limpiarErrores() {
    // Limpiar mensajes de error
    $('.error-message').text('');
    
    // Limpiar clases de validación
    $('.form-control, .form-select').removeClass('input-error input-valid');
    
    // Restaurar bordes originales
    $('.form-control, .form-select').css('border-color', '');
}

// Resetear formulario manualmente
function resetearFormulario() {
    // Resetear el formulario
    $('#formTalento')[0].reset();
    
    // Limpiar mensajes de error
    limpiarErrores();
    
    // Ocultar mensaje de éxito si está visible
    $('#mensajeExito').fadeOut(300);
    
    // Remover clases de validación de radio buttons
    $('#error-genero').text('');
}

// Mostrar mensaje de éxito
function mostrarMensajeExito() {
    const $mensajeExito = $('#mensajeExito');
    
    // Mostrar mensaje con efecto fade
    $mensajeExito.hide().fadeIn(500);
    
    // Desplazar suavemente hacia el mensaje
    $('html, body').animate({
        scrollTop: $mensajeExito.offset().top - 100
    }, 500);
    
    // Limpiar el formulario después de enviar
    setTimeout(() => {
        resetearFormulario();
    }, 1000);
    
    // Ocultar mensaje después de 5 segundos
    setTimeout(() => {
        $mensajeExito.fadeOut(500);
    }, 5000);
}

// Obtener datos del formulario (para depuración)
function obtenerDatosFormulario() {
    return {
        nombre: $('#nombre').val(),
        direccion: $('#direccion').val(),
        telefono: $('#telefono').val(),
        email: $('#email').val(),
        genero: $('input[name="genero"]:checked').val(),
        talento: $('#talento option:selected').text(),
        descripcion: $('#descripcion').val(),
        fechaRegistro: new Date().toLocaleString('es-CL')
    };
}

// Validación en tiempo real con efectos jQuery
function mostrarTooltip(elemento, mensaje) {
    $(elemento).tooltip({
        content: mensaje,
        position: { my: "left bottom", at: "left top" },
        show: { effect: "fade", duration: 200 },
        hide: { effect: "fade", duration: 200 }
    });
    $(elemento).tooltip("open");
}

// Efecto de vibración para campos inválidos (jQuery UI)
function vibrarCampo(elemento) {
    $(elemento).addClass('animate__animated animate__shakeX');
    setTimeout(() => {
        $(elemento).removeClass('animate__animated animate__shakeX');
    }, 500);
}