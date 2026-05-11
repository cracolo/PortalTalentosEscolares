/**
 * Portal de Talentos Escolares
 * Página Quiénes Somos - Animaciones
 * Archivo: nosotros.js
 */

$(document).ready(function() {
    // Inicializar AOS (Scroll Animations)
    AOS.init({
        duration: 800,
        once: true,
        offset: 100
    });
    
    // Navbar scroll effect
    $(window).on('scroll', function() {
        if ($(window).scrollTop() > 50) {
            $('.navbar').css('padding', '0.5rem 0');
        } else {
            $('.navbar').css('padding', '1rem 0');
        }
    });
    
    // Contador animado para estadísticas
    function animateCounter(element, start, end, duration) {
        let current = start;
        const increment = (end - start) / (duration / 16);
        const timer = setInterval(() => {
            current += increment;
            if (current >= end) {
                clearInterval(timer);
                $(element).text(end + '+');
            } else {
                $(element).text(Math.floor(current) + '+');
            }
        }, 16);
    }
    
    // Detectar cuando las estadísticas son visibles
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter('.stat-number:eq(0)', 0, 500, 2000);
                animateCounter('.stat-number:eq(1)', 0, 25, 2000);
                animateCounter('.stat-number:eq(2)', 0, 15, 2000);
                observer.disconnect();
            }
        });
    });
    
    if ($('.stat-number').length) {
        observer.observe($('.stats-row')[0]);
    }
    
    // Hover efecto para tarjetas
    $('.team-card, .mvv-card, .achievement-card, .testimonial-card').on('mouseenter', function() {
        $(this).css('cursor', 'pointer');
    });
    
    // Smooth scroll para enlaces internos