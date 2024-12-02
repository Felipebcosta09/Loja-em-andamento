// Recupera o carrinho do localStorage ou cria um novo caso não exista
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Atualiza o contador de produtos no carrinho
function updateCartCount() {
    const cartCount = document.getElementById('cart-count');
    cartCount.textContent = cart.length;
}

// Função que adiciona o produto ao carrinho
function addToCart(button) {
    const productName = button.getAttribute('data-name');  // Nome do produto a partir do data-name
    const productPrice = parseFloat(button.getAttribute('data-price').replace(',', '.'));  // Preço do produto a partir do data-price

    // Cria um objeto do produto e adiciona ao carrinho
    const product = {
        name: productName,
        price: productPrice,
        quantity: 1  // Inicialmente a quantidade é 1
    };

    // Verifica se o produto já está no carrinho
    const existingProduct = cart.find(item => item.name === product.name);
    if (existingProduct) {
        existingProduct.quantity += 1;  // Se já estiver, aumenta a quantidade
    } else {
        cart.push(product);  // Se não, adiciona o produto ao carrinho
    }

    // Atualiza o carrinho no localStorage
    localStorage.setItem('cart', JSON.stringify(cart));

    // Atualiza o contador de produtos no carrinho
    updateCartCount();
}

// Função para remover um produto do carrinho
function removeFromCart(productName) {
    // Remove o produto do carrinho com base no nome
    cart = cart.filter(item => item.name !== productName);

    // Atualiza o carrinho no localStorage
    localStorage.setItem('cart', JSON.stringify(cart));

    // Atualiza o contador de produtos no carrinho
    updateCartCount();
}

// Função para exibir os itens do carrinho na tela
function displayCartItems() {
    const cartItemsContainer = document.getElementById('cart-items');
    cartItemsContainer.innerHTML = '';  // Limpa os itens atuais na tela

    // Adiciona os itens do carrinho na tela
    cart.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.classList.add('cart-item');
        itemElement.innerHTML = `
            <span>${item.name}</span> 
            <span>R$ ${item.price.toFixed(2).replace('.', ',')}</span>
            <span>Quantidade: ${item.quantity}</span>
            <button onclick="removeFromCart('${item.name}')">Remover</button>
        `;
        cartItemsContainer.appendChild(itemElement);
    });
}

// Função para calcular o total do carrinho
function calculateTotal() {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
}

// Exibe o total no carrinho
function displayCartTotal() {
    const cartTotal = document.getElementById('cart-total');
    cartTotal.textContent = `Total: R$ ${calculateTotal().toFixed(2).replace('.', ',')}`;
}

// Adiciona o evento de clique aos botões de adicionar ao carrinho
document.querySelectorAll('.btn-add-cart').forEach(button => {
    button.addEventListener('click', function() {
        addToCart(button);
    });
});

// Atualiza o contador de produtos no carrinho ao carregar a página
updateCartCount();

// Exibe os itens e o total ao carregar a página (na tela de carrinho)
if (window.location.pathname.includes('carrinho')) {
    displayCartItems();
    displayCartTotal();
}
