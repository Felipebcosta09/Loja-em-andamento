// Funções relacionadas ao menu e sobreposição
let btnMenu = document.getElementById('btn-menu');
let menu = document.getElementById('menu-mobile');
let overlay = document.getElementById('overlay-menu');
let btnFechar = document.querySelector('.btn-fechar');

// Evento para abrir o menu
btnMenu.addEventListener('click', () => {
    menu.classList.add('abrir-menu');
    overlay.classList.add('active');
});

// Evento para fechar o menu ao clicar nele
menu.addEventListener('click', () => {
    menu.classList.remove('abrir-menu');
    overlay.classList.remove('active');
});

// Evento para fechar o menu ao clicar no overlay
overlay.addEventListener('click', () => {
    menu.classList.remove('abrir-menu');
    overlay.classList.remove('active');
});

// Quando o botão do menu é clicado
btnMenu.addEventListener("click", function() {
    menu.classList.add("active");
    overlay.classList.add("active");
});

// Quando o botão de fechar é clicado
btnFechar.addEventListener("click", function() {
    menu.classList.remove("active");
    overlay.classList.remove("active");
});

// Quando a sobreposição é clicada, fecha o menu
overlay.addEventListener("click", function() {
    menu.classList.remove("active");
    overlay.classList.remove("active");
});

// Função para verificar se o elemento está visível na tela
function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (rect.top >= 0 && rect.left >= 0 && rect.bottom <= (window.innerHeight || document.documentElement.clientHeight));
}

// Função para adicionar a classe 'visible' aos elementos que estão visíveis
function checkVisibility() {
    const slideInElements = document.querySelectorAll('.slide-in');
    slideInElements.forEach(element => {
        if (isElementInViewport(element)) {
            element.classList.add('visible');
        }
    });
}

// Função para ativar a animação quando o elemento estiver visível
const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('slide-in');
            observer.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.5
});

// Observa os elementos para animação
const elementsToAnimate = document.querySelectorAll('.slide-in');
elementsToAnimate.forEach(element => {
    observer.observe(element);
});

// Configuração do EmailJS para o formulário
emailjs.init("jSVwTzzEpts0wsu3U");

// Evento para submissão do formulário
document.querySelector("form").addEventListener("submit", function(event) {
    event.preventDefault();

    const mensagemFeedback = document.getElementById("mensagem-feedback");

    if (this.checkValidity()) {
        emailjs.sendForm("Formulário.JS", "template_kndjhze", this)
            .then(
                function(response) {
                    mensagemFeedback.innerHTML = "<p style='color: white;'>Mensagem enviada com sucesso!</p>";
                    mensagemFeedback.classList.add("mostrar");
                },
                function(error) {
                    mensagemFeedback.innerHTML = "<p style='color: red;'>Erro ao enviar a mensagem. Tente novamente.</p>";
                    mensagemFeedback.classList.add("mostrar");
                }
            );
    } else {
        mensagemFeedback.innerHTML = "<p style='color: red;'>Por favor, preencha todos os campos corretamente.</p>";
        mensagemFeedback.classList.add("mostrar");
    }
});
