const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const togglePassword = document.getElementById('toggle-password');
const eyes = document.querySelectorAll('.eye');
const hands = document.querySelector('.hands');
const pupils = document.querySelectorAll('.pupil');

// Função para fechar os olhos
function closeEyes() {
    eyes.forEach(eye => {
        eye.classList.add('closed');
    });
    hands.classList.add('covering');
}

// Função para abrir os olhos
function openEyes() {
    eyes.forEach(eye => {
        eye.classList.remove('closed');
        eye.classList.remove('peeking');
    });
    hands.classList.remove('covering');
}

// Função para espiar (peek)
function peek() {
    eyes.forEach(eye => {
        eye.classList.add('peeking');
    });

    // Remove a animação após completar
    setTimeout(() => {
        eyes.forEach(eye => {
            eye.classList.remove('peeking');
            if (passwordInput === document.activeElement) {
                eye.classList.add('closed');
            }
        });
    }, 600);
}

// Evento de foco no campo de email
emailInput.addEventListener('focus', () => {
    openEyes();
});

// Evento de foco no campo de senha
passwordInput.addEventListener('focus', () => {
    closeEyes();
});

// Evento de blur nos campos
emailInput.addEventListener('blur', () => {
    if (document.activeElement !== passwordInput) {
        openEyes();
    }
});

passwordInput.addEventListener('blur', () => {
    if (document.activeElement !== emailInput) {
        openEyes();
    }
});

// Toggle de visualização de senha com efeito de espiar
togglePassword.addEventListener('click', function() {
    const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordInput.setAttribute('type', type);

    // Troca o ícone
    this.classList.toggle('fa-eye');
    this.classList.toggle('fa-eye-slash');

    // Se a senha está visível e o campo está focado, o avatar espia
    if (type === 'text' && passwordInput === document.activeElement) {
        peek();
    }
});

// Movimento sutil das pupilas seguindo o mouse
document.addEventListener('mousemove', (e) => {
    if (!hands.classList.contains('covering')) {
        const eyes = document.querySelectorAll('.eye');
        eyes.forEach(eye => {
            const eyeRect = eye.getBoundingClientRect();
            const eyeCenterX = eyeRect.left + eyeRect.width / 2;
            const eyeCenterY = eyeRect.top + eyeRect.height / 2;
            
            const deltaX = e.clientX - eyeCenterX;
            const deltaY = e.clientY - eyeCenterY;
            
            const angle = Math.atan2(deltaY, deltaX);
            const distance = Math.min(6, Math.sqrt(deltaX * deltaX + deltaY * deltaY) / 20);
            
            const pupil = eye.querySelector('.pupil');
            const moveX = Math.cos(angle) * distance;
            const moveY = Math.sin(angle) * distance;
            
            pupil.style.transform = `translate(calc(-50% + ${moveX}px), calc(-50% + ${moveY}px))`;
        });
    }
});