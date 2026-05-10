/**
 * Portal de Talentos Escolares
 * Página de Contacto - Validaciones
 * Tecnologías: JavaScript + jQuery
 * Archivo: contacto.js
 */

$(document).ready(function() {
    inicializarFormulario();
    
    // Efecto de focus
    $('.form-control, .form-select').on('focus', function() {
        $(this).css('box-shadow', '0 0 0 0.2rem rgba(102, 126, 234, 0.25)');
    }).on('blur', function() {
        $(this).css('box-shadow', 'none');
    });
});

function inicializarFormulario() {
    // Evento submit
    $('#formContacto').on('submit', function(e) {
        e.preventDefault();
        validarFormulario();
    });
    
    // Evento reset
    $('#btnReset').on('click', function() {
        resetearFormulario();
    });
    
    // Validaciones en tiempo real
    $('#nombre').on('input', function() { validarNombre(); });
    $('#email').on('input', function() { validarEmail(); });
    $('#telefono').on('input', function() { validarTelefono(); });
    $('#asunto').on('change', function() { validarAsunto(); });
    $('#mensaje').on('input', function() { validarMensaje(); });
    $('#terminos').on('change', function() { validarTerminos(); });
}

// Validar formulario completo
function validarFormulario() {
    let esValido = true;
    
    limpiarErrores();
    
    esValido = validarNombre() && esValido;
    esValido = validarEmail() && esValido;
    esValido = validarTelefono() && esValido;
    esValido = validarAsunto() && esValido;
    esValido = validarMensaje() && esValido;
    esValido = validarTerminos() && esValido;
    
    if (esValido) {
        mostrarMensajeExito();
        console.log('Formulario enviado:', obtenerDatosFormulario());
    }
    
    return esValido;
}

// Validar Nombre
function validarNombre() {
    const $nombre = $('#nombre');
    const valor = $nombre.val().trim();
    const $errorDiv = $('#error-nombre');
    
    if (valor === '') {
        $errorDiv.text('El nombre completo es obligatorio');
        $nombre.addClass('input-error').removeClass('input-valid');
        return false;
    }
    
    if (valor.length < 3) {
        $errorDiv.text('Ingresa un nombre válido (mínimo 3 caracteres)');
        $nombre.addClass('input-error').removeClass('input-valid');
        return false;
    }
    
    const regex = /^[a-zA-ZáéíóúñÁÉÍÓÚÑ\s]+$/;
    if (!regex.test(valor)) {
        $errorDiv.text('El nombre solo puede contener letras');
        $nombre.addClass('input-error').removeClass('input-valid');
        return false;
    }
    
    $errorDiv.text('');
    $nombre.removeClass('input-error').addClass('input-valid');
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
    
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!regex.test(valor)) {
        $errorDiv.text('Ingresa un correo electrónico válido');
        $email.addClass('input-error').removeClass('input-valid');
        return false;
    }
    
    $errorDiv.text('');
    $email.removeClass('input-error').addClass('input-valid');
    return true;
}

// Validar Teléfono (opcional)
function validarTelefono() {
    const $telefono = $('#telefono');
    const valor = $telefono.val().trim();
    const $errorDiv = $('#error-telefono');
    
    if (valor === '') {
        $telefono.removeClass('input-error input-valid');
        $errorDiv.text('');
        return true;
    }
    
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

// Validar Asunto
function validarAsunto() {
    const $asunto = $('#asunto');
    const valor = $asunto.val();
    const $errorDiv = $('#error-asunto');
    
    if (valor === '') {
        $errorDiv.text('Selecciona un asunto');
        $asunto.addClass('input-error').removeClass('input-valid');
        return false;
    }
    
    $errorDiv.text('');
    $asunto.removeClass('input-error').addClass('input-valid');
    return true;
}

// Validar Mensaje
function validarMensaje() {
    const $mensaje = $('#mensaje');
    const valor = $mensaje.val().trim();
    const $errorDiv = $('#error-mensaje');
    
    if (valor === '') {
        $errorDiv.text('El mensaje es obligatorio');
        $mensaje.addClass('input-error').removeClass('input-valid');
        return false;
    }
    
    if (valor.length < 10) {
        $errorDiv.text('El mensaje debe tener al menos 10 caracteres');
        $mensaje.addClass('input-error').removeClass('input-valid');
        return false;
    }
    
    if (valor.length > 500) {
        $errorDiv.text('El mensaje no puede tener más de 500 caracteres');
        $mensaje.addClass('input-error').removeClass('input-valid');
        return false;
    }
    
    $errorDiv.text('');
    $mensaje.removeClass('input-error').addClass('input-valid');
    return true;
}

// Validar Términos
function validarTerminos() {
    const $terminos = $('#terminos');
    const $errorDiv = $('#error-terminos');
    
    if (!$terminos.is(':checked')) {
        $errorDiv.text('Debes aceptar los términos y condiciones');
        return false;
    }
    
    $errorDiv.text('');
    return true;
}

// Limpiar errores
function limpiarErrores() {
    $('.error-message').text('');
    $('.form-control, .form-select').removeClass('input-error input-valid');
}

// Resetear formulario
function resetearFormulario() {
    $('#formContacto')[0].reset();
    limpiarErrores();
    $('#mensajeExito').fadeOut(300);
    $('#error-terminos').text('');
}

// Mostrar mensaje de éxito
function mostrarMensajeExito() {
    const $mensajeExito = $('#mensajeExito');
    
    $mensajeExito.hide().fadeIn(500);
    
    $('html, body').animate({
        scrollTop: $mensajeExito.offset().top - 100
    }, 500);
    
    setTimeout(() => {
        resetearFormulario();
    }, 1000);
    
    setTimeout(() => {
        $mensajeExito.fadeOut(500);
    }, 5000);
}

// Obtener datos del formulario
function obtenerDatosFormulario() {
    return {
        nombre: $('#nombre').val(),
        email: $('#email').val(),
        telefono: $('#telefono').val(),
        asunto: $('#asunto option:selected').text(),
        mensaje: $('#mensaje').val(),
        fecha: new Date().toLocaleString('es-CL')
    };
}