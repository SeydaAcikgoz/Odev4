const cardContainer = document.getElementById('cardContainer');
const modal = document.getElementById('modal');
const modalClose = document.getElementById('modalClose');
const modalContent = document.getElementById('modalContent');

const cart = [];

function addToCart(product) {
    cart.push(product);
    alert(`${product.title} sepete eklendi!`);
    console.log('Sepet:', cart);
}

function createCard(product) {
    const stars = Math.round(product.rating.rate);
    const starIcons = '★'.repeat(stars) + '☆'.repeat(5 - stars);
    const card = document.createElement('div');
    card.classList.add('card');
    card.innerHTML = `
        <div class="card-content">
            <div class="card-image">
                <img src="${product.image}" alt="${product.title}">
            </div>
            <div class="card-title">
                <h3>${product.title}</h3>
            </div>
            <div class="card-price">
                <p>${product.price}$</p>
            </div>
            <div class="card-rating">
                <div class="card-rating-star">
                    <p>${starIcons}</p>
                </div>
                <div class="card-rating-count">
                    <p>${product.rating.count} </p>
                </div>
            </div>
            <div class="card-button">
                <button class="add-button">Sepete Ekle</button>
            </div>
        </div>
    `;
    const addToCartBtn = card.querySelector('.add-button');
    addToCartBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        addToCart(product);
    });
    card.addEventListener('click', () => openModal(product));
    return card;
}

function openModal(product) {
    const stars = Math.round(product.rating.rate);
    const starIcons = '★'.repeat(stars) + '☆'.repeat(5 - stars);
    modalContent.innerHTML = `
        <div class="modal-image">
            <img src="${product.image}" alt="${product.title}">
        </div>
         <div class="modal-info">
            <div class="modal-title">
                <h3>${product.title}</h3>
            </div>
            <div class="modal-rating">
                <div class="modal-rating-star">
                    <p>${starIcons}</p>
                </div>
                <div class="modal-rating-count">
                    <p>${product.rating.count} </p>
                </div>
            </div>
            <div class="modal-description">
                <p>${product.description}</p>
            </div>
            <div class="modal-price">
                <p>${product.price}$</p>
            </div>
            <div class="modal-button">
                <button class="add-button">Sepete Ekle</button>
            </div>
        </div>
    `;

    modal.classList.add('active');

    const modalAddToCartBtn = modalContent.querySelector('.add-button');
    modalAddToCartBtn.addEventListener('click', () => addToCart(product));
}

function fetchProducts() {
    fetch('https://fakestoreapi.com/products')
        .then(response => response.json())
        .then(products => {
            products.forEach(product => {
                const card = createCard(product);
                cardContainer.appendChild(card);
            });
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
}

function closeModal() {
    modal.classList.remove('active');
}

modalClose.addEventListener('click', closeModal);

modal.addEventListener('click', (event) => {
    if (event.target === modal) {
        closeModal();
    }
});

fetchProducts();