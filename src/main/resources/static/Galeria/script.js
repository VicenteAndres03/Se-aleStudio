// Menú hamburguesa - Mismo funcionamiento que la página principal
const hamburguesa = document.getElementById('hamburguesa');
const Menu = document.querySelector('.MenuNavegacion');

hamburguesa.addEventListener('click', () => {
    Menu.classList.toggle('show');
});

// Cerrar menú al hacer click en un enlace (para mobile)
const enlaces = document.querySelectorAll('.MenuNavegacion .Links');
enlaces.forEach(enlace => {
    enlace.addEventListener('click', () => {
        Menu.classList.remove('show');
    });
});

// Cerrar menú al hacer click fuera del menú
document.addEventListener('click', (e) => {
    if (!hamburguesa.contains(e.target) && !Menu.contains(e.target)) {
        Menu.classList.remove('show');
    }
});

// Funcionalidad de la galería
const galleryItems = document.querySelectorAll('.gallery-item');
const modal = document.getElementById('imageModal');
const modalImage = document.getElementById('modalImage');
const modalTitle = document.getElementById('modalTitle');
const closeModal = document.getElementById('closeModal');

// Abrir modal al hacer click en una imagen
galleryItems.forEach(item => {
    item.addEventListener('click', () => {
        const img = item.querySelector('img');
        const title = item.getAttribute('data-style');
        
        modalImage.src = img.src;
        modalImage.alt = img.alt;
        modalTitle.textContent = title;
        modal.style.display = 'block';
        
        // Prevenir scroll del body cuando el modal esté abierto
        document.body.style.overflow = 'hidden';
    });
});

// Cerrar modal
function cerrarModal() {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

closeModal.addEventListener('click', cerrarModal);

// Cerrar modal al hacer click fuera de la imagen
modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        cerrarModal();
    }
});

// Cerrar modal con la tecla Escape
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.style.display === 'block') {
        cerrarModal();
    }
});

// Animación de aparición progresiva de las imágenes
function animateGalleryItems() {
    const items = document.querySelectorAll('.gallery-item');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });

    items.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px)';
        item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(item);
    });
}

// Inicializar animaciones cuando se carga la página
document.addEventListener('DOMContentLoaded', () => {
    animateGalleryItems();
});

// Efecto de hover mejorado para las imágenes
galleryItems.forEach(item => {
    const img = item.querySelector('img');
    
    item.addEventListener('mouseenter', () => {
        // Efecto de brillantez dorada
        item.style.boxShadow = '0 15px 40px rgba(218, 165, 32, 0.4)';
    });
    
    item.addEventListener('mouseleave', () => {
        item.style.boxShadow = '0 5px 15px rgba(0,0,0,0.3)';
    });
});

// Lazy loading para las imágenes
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src || img.src;
                img.classList.remove('lazy');
                observer.unobserve(img);
            }
        });
    });

    const lazyImages = document.querySelectorAll('img[data-src]');
    lazyImages.forEach(img => {
        imageObserver.observe(img);
    });
}