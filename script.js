// Efeito de digitação no título
document.addEventListener('DOMContentLoaded', function() {
    const title = document.getElementById('typing-title');
    const originalText = title.textContent;
    title.textContent = '';
    
    let i = 0;
    const typeWriter = () => {
        if (i < originalText.length) {
            title.textContent += originalText.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
        }
    };
    
    typeWriter();
    
    // Animação de revelação dos elementos ao rolar
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.card, .contact-item, .section-title');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (elementPosition < screenPosition) {
                element.style.opacity = 1;
                element.style.transform = 'translateY(0)';
            }
        });
    };
    
    // Configurar estado inicial para animação
    const elementsToAnimate = document.querySelectorAll('.card, .contact-item, .section-title');
    elementsToAnimate.forEach(element => {
        element.style.opacity = 0;
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    // Animar elementos quando a página carrega
    window.addEventListener('load', animateOnScroll);
    
    // Animar elementos ao rolar
    window.addEventListener('scroll', animateOnScroll);
    
    // Navegação suave
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        });
    });
    
    // Efeito de hover nos cartões
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-5px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Alternar modo escuro (experimental)
    const toggleDarkMode = () => {
        document.body.classList.toggle('dark-mode');
        
        // Salvar preferência no localStorage
        if (document.body.classList.contains('dark-mode')) {
            localStorage.setItem('darkMode', 'enabled');
        } else {
            localStorage.setItem('darkMode', 'disabled');
        }
    };
    
    // Verificar preferência de modo escuro salva
    if (localStorage.getItem('darkMode') === 'enabled') {
        document.body.classList.add('dark-mode');
    }
    
    // Adicionar botão de modo escuro (opcional)
    const darkModeButton = document.createElement('button');
    darkModeButton.textContent = '🌓';
    darkModeButton.style.position = 'fixed';
    darkModeButton.style.bottom = '20px';
    darkModeButton.style.right = '20px';
    darkModeButton.style.zIndex = '1000';
    darkModeButton.style.background = 'var(--secondary-color)';
    darkModeButton.style.color = 'white';
    darkModeButton.style.border = 'none';
    darkModeButton.style.borderRadius = '50%';
    darkModeButton.style.width = '50px';
    darkModeButton.style.height = '50px';
    darkModeButton.style.cursor = 'pointer';
    darkModeButton.style.fontSize = '1.5rem';
    darkModeButton.addEventListener('click', toggleDarkMode);
    
    document.body.appendChild(darkModeButton);
    
    // Animação de preloader (opcional)
    const preloader = document.createElement('div');
    preloader.style.position = 'fixed';
    preloader.style.top = '0';
    preloader.style.left = '0';
    preloader.style.width = '100%';
    preloader.style.height = '100%';
    preloader.style.background = 'var(--primary-color)';
    preloader.style.display = 'flex';
    preloader.style.justifyContent = 'center';
    preloader.style.alignItems = 'center';
    preloader.style.zIndex = '9999';
    preloader.style.transition = 'opacity 0.5s ease';
    
    const spinner = document.createElement('div');
    spinner.style.width = '50px';
    spinner.style.height = '50px';
    spinner.style.border = '5px solid rgba(255, 255, 255, 0.3)';
    spinner.style.borderRadius = '50%';
    spinner.style.borderTop = '5px solid white';
    spinner.style.animation = 'spin 1s linear infinite';
    
    preloader.appendChild(spinner);
    document.body.appendChild(preloader);
    
    // Estilo para a animação de spin
    const spinStyle = document.createElement('style');
    spinStyle.textContent = `
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
    `;
    document.head.appendChild(spinStyle);
    
    // Remover preloader quando a página carregar
    window.addEventListener('load', () => {
        setTimeout(() => {
            preloader.style.opacity = '0';
            setTimeout(() => {
                preloader.remove();
            }, 500);
        }, 1000);
    });
});