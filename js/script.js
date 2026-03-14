const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('reveal');
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('section').forEach(el => observer.observe(el));

function rotateCard(card) {
    card.classList.toggle('rotated');
}

const filterBtns = document.querySelectorAll('.filter-btn');
const projects = document.querySelectorAll('.project-card');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        const filter = btn.dataset.filter;
        
        projects.forEach(project => {
            if (filter === 'all' || project.dataset.category === filter) {
                project.style.display = 'block';
                setTimeout(() => project.style.opacity = '1', 100);
            } else {
                project.style.opacity = '0';
                setTimeout(() => project.style.display = 'none', 300);
            }
        });
    });
});

const menuBtn = document.querySelector('.menu-mobile');
const nav = document.querySelector('.nav-desktop');

if (menuBtn) {
    menuBtn.addEventListener('click', () => {
        nav.classList.toggle('active');
        menuBtn.classList.toggle('active');
    });

    document.querySelectorAll('.nav-link, .btn-contato').forEach(link => {
        link.addEventListener('click', () => {
            nav.classList.remove('active');
            menuBtn.classList.remove('active');
        });
    });

    document.addEventListener('click', (e) => {
        if (!nav.contains(e.target) && !menuBtn.contains(e.target) && nav.classList.contains('active')) {
            nav.classList.remove('active');
            menuBtn.classList.remove('active');
        }
    });
}

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

const titles = ['Desenvolvedor Full Stack', 'Front-end Developer', 'Back-end Developer'];
let titleIndex = 0;
let charIndex = 0;
let isDeleting = false;
let currentText = '';

function typeEffect() {
    const element = document.querySelector('.glitch-text span');
    if (!element) return;
    
    const currentTitle = titles[titleIndex];
    
    if (isDeleting) {
        currentText = currentTitle.substring(0, charIndex - 1);
        charIndex--;
    } else {
        currentText = currentTitle.substring(0, charIndex + 1);
        charIndex++;
    }
    
    element.textContent = currentText;
    
    if (!isDeleting && charIndex === currentTitle.length) {
        isDeleting = true;
        setTimeout(typeEffect, 2000);
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        titleIndex = (titleIndex + 1) % titles.length;
        setTimeout(typeEffect, 500);
    } else {
        setTimeout(typeEffect, isDeleting ? 50 : 100);
    }
}

const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const nome = this.querySelector('input[type="text"]').value;
        const email = this.querySelector('input[type="email"]').value;
        const mensagem = this.querySelector('textarea').value;
        
        if (!nome || !email || !mensagem) {
            alert('Por favor, preencha todos os campos!');
            return;
        }
        
        const telefone = '5514996168417'; 
        
        const texto = `Olá Lucas! 👋\n\n` +
                     `Meu nome: ${nome}\n` +
                     `Meu email: ${email}\n\n` +
                     `Mensagem:\n${mensagem}`;
        
        // Codifica a mensagem para URL
        const textoCodificado = encodeURIComponent(texto);
        
        // Cria o link do WhatsApp
        const linkWhatsApp = `https://wa.me/${telefone}?text=${textoCodificado}`;
        
        // Abre o WhatsApp em uma nova aba
        window.open(linkWhatsApp, '_blank');
        
        // Limpa o formulário
        this.reset();
        
        // Mostra mensagem de sucesso (opcional)
        alert('Mensagem enviada com sucesso! Você será redirecionado para o WhatsApp.');
    });
}

// Scroll ativo no menu
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
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

// Inicia o efeito quando a página carrega
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(typeEffect, 1000);
});