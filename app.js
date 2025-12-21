// script.js
document.addEventListener('DOMContentLoaded', function() {
    // Variables globales
    let currentTheme = 'dark';
    
    // Carrusel de imágenes
    const carousel = document.querySelector('.carousel');
    const slides = document.querySelectorAll('.carousel-slide');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const indicators = document.querySelectorAll('.indicator');
    let currentSlide = 0;
    const totalSlides = slides.length;
    
    // Función para cambiar slide del carrusel
    function goToSlide(n) {
        currentSlide = (n + totalSlides) % totalSlides;
        carousel.style.transform = `translateX(-${currentSlide * 100}%)`;
        
        // Actualizar indicadores
        indicators.forEach((indicator, index) => {
            if (index === currentSlide) {
                indicator.classList.add('active');
            } else {
                indicator.classList.remove('active');
            }
        });
    }
    
    // Event listeners para botones del carrusel
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            goToSlide(currentSlide - 1);
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            goToSlide(currentSlide + 1);
        });
    }
    
    // Event listeners para indicadores del carrusel
    indicators.forEach(indicator => {
        indicator.addEventListener('click', () => {
            const slideIndex = parseInt(indicator.getAttribute('data-slide'));
            goToSlide(slideIndex);
        });
    });
    
    // Cambio automático de slides cada 5 segundos
    let slideInterval = setInterval(() => {
        goToSlide(currentSlide + 1);
    }, 5000);
    
    // Pausar el carrusel al pasar el ratón
    const carouselContainer = document.querySelector('.carousel-container');
    if (carouselContainer) {
        carouselContainer.addEventListener('mouseenter', () => {
            clearInterval(slideInterval);
        });
        
        carouselContainer.addEventListener('mouseleave', () => {
            slideInterval = setInterval(() => {
                goToSlide(currentSlide + 1);
            }, 5000);
        });
    }
    
    // Navegación suave para enlaces internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Cerrar menú móvil si está abierto
                const navMenu = document.querySelector('.nav-menu');
                if (navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                }
                
                // Desplazamiento suave
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // Actualizar enlace activo
                document.querySelectorAll('.nav-menu a').forEach(link => {
                    link.classList.remove('active');
                });
                this.classList.add('active');
            }
        });
    });
    
    // Cambio de tema
    const themeToggle = document.getElementById('theme-toggle');
    const themeOptions = document.querySelectorAll('.theme-option');
    
    // Definir los temas disponibles
    const themes = {
        dark: {
            'primary-color': '#4a90e2',
            'secondary-color': '#2d3748',
            'accent-color': '#e53e3e',
            'background-color': '#121212',
            'card-background': '#1e1e1e',
            'text-color': '#f0f0f0',
            'text-secondary': '#b0b0b0',
            'border-color': '#333',
            'shadow-color': 'rgba(0, 0, 0, 0.5)',
            'hover-color': '#2a4365'
        },
        light: {
            'primary-color': '#3182ce',
            'secondary-color': '#edf2f7',
            'accent-color': '#e53e3e',
            'background-color': '#f7fafc',
            'card-background': '#ffffff',
            'text-color': '#2d3748',
            'text-secondary': '#718096',
            'border-color': '#e2e8f0',
            'shadow-color': 'rgba(0, 0, 0, 0.1)',
            'hover-color': '#2b6cb0'
        },
        blue: {
            'primary-color': '#4299e1',
            'secondary-color': '#2c5282',
            'accent-color': '#f56565',
            'background-color': '#1a365d',
            'card-background': '#2d3748',
            'text-color': '#e2e8f0',
            'text-secondary': '#a0aec0',
            'border-color': '#4a5568',
            'shadow-color': 'rgba(0, 0, 0, 0.3)',
            'hover-color': '#2c5282'
        },
        green: {
            'primary-color': '#38a169',
            'secondary-color': '#22543d',
            'accent-color': '#dd6b20',
            'background-color': '#1a202c',
            'card-background': '#2d3748',
            'text-color': '#f0fff4',
            'text-secondary': '#c6f6d5',
            'border-color': '#4a5568',
            'shadow-color': 'rgba(0, 0, 0, 0.3)',
            'hover-color': '#276749'
        }
    };
    
    // Función para aplicar un tema
    function applyTheme(themeName) {
        currentTheme = themeName;
        const theme = themes[themeName];
        
        // Aplicar las variables CSS
        for (const [key, value] of Object.entries(theme)) {
            document.documentElement.style.setProperty(`--${key}`, value);
        }
        
        // Guardar tema en localStorage
        localStorage.setItem('theme', themeName);
        
        // Actualizar texto del botón
        if (themeToggle) {
            themeToggle.innerHTML = `<i class="fas fa-palette"></i> Tema: ${themeName.charAt(0).toUpperCase() + themeName.slice(1)}`;
        }
    }
    
    // Event listener para el botón de cambio de tema
    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            // Ciclar entre temas
            const themeKeys = Object.keys(themes);
            const currentIndex = themeKeys.indexOf(currentTheme);
            const nextIndex = (currentIndex + 1) % themeKeys.length;
            applyTheme(themeKeys[nextIndex]);
        });
    }
    
    // Event listeners para los botones de tema específicos
    themeOptions.forEach(option => {
        option.addEventListener('click', function() {
            const themeName = this.getAttribute('data-theme');
            applyTheme(themeName);
        });
    });
    
    // Cargar tema guardado o usar el predeterminado
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme && themes[savedTheme]) {
        applyTheme(savedTheme);
    } else {
        applyTheme('dark');
    }
    
    // Menú móvil
    const menuToggle = document.getElementById('menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });
    }
    
    // Cerrar menú móvil al hacer clic en un enlace
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
        });
    });
    
    // Formulario de contacto
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Obtener datos del formulario
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const phone = document.getElementById('phone').value;
            const service = document.getElementById('service').value;
            const message = document.getElementById('message').value;
            
            // Validación simple
            if (!name || !email || !service || !message) {
                alert('Por favor, completa todos los campos obligatorios.');
                return;
            }
            
            // Simular envío del formulario
            console.log('Formulario enviado:', { name, email, phone, service, message });
            
            // Mostrar mensaje de éxito
            alert('¡Mensaje enviado con éxito! Me pondré en contacto contigo pronto.');
            
            // Resetear formulario
            contactForm.reset();
        });
    }
    
    // Actualizar enlace activo al hacer scroll
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.nav-menu a');
        
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (scrollY >= sectionTop - 100) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
});

