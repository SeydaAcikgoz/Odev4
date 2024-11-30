const cardContainer = document.getElementById('cardContainer');
        const modal = document.getElementById('modal');
        const modalClose = document.getElementById('modalClose');
        const modalTitle = document.getElementById('modalTitle');
        const modalBody = document.getElementById('modalBody');

        // Fetch data from FakeStoreAPI
        fetch('https://fakestoreapi.com/products')
            .then(response => response.json())
            .then(products => {
                products.forEach(product => {
                    // Create card element
                    const card = document.createElement('div');
                    card.classList.add('card');
                    card.innerHTML = `
                        <img src="${product.image}" alt="${product.title}">
                        <div class="card-body">
                            <h3 class="card-title">${product.title}</h3>
                            <p class="card-price">$${product.price}</p>
                        </div>
                    `;

                    // Add click event to open modal
                    card.addEventListener('click', () => {
                        modalTitle.textContent = product.title;
                        modalBody.innerHTML = `
                            <img src="${product.image}" alt="${product.title}" style="width:100%; height:200px; object-fit:cover;">
                            <p>${product.description}</p>
                            <p><strong>Price:</strong> $${product.price}</p>
                            <p><strong>Category:</strong> ${product.category}</p>
                        `;
                        modal.classList.add('active');
                    });

                    cardContainer.appendChild(card);
                });
            })
            .catch(error => console.error('Error fetching data:', error));

        // Close modal
        modalClose.addEventListener('click', () => {
            modal.classList.remove('active');
        });

        modal.addEventListener('click', (event) => {
            if (event.target === modal) {
                modal.classList.remove('active');
            }
        });