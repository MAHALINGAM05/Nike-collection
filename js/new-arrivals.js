document.addEventListener('DOMContentLoaded', () => {
    const newArrivalsGrid = document.querySelector('.new-arrivals-grid');
    
    // Sample new arrivals data
    const newArrivals = [
        {
            id: 1,
            name: 'Summer Collection Shirt',
            price: 39.99,
            image: './img/img4.png',
            dateAdded: '2024-01-15',
            description: 'Light and breathable summer shirt'
        },
        {
            id: 2,
            name: 'Designer Sneakers',
            price: 89.99,
            image: './img/img-sports.png',
            dateAdded: '2024-01-18',
            description: 'Limited edition designer sneakers'
        },
        {
            id: 3,
            name: 'Luxury Watch',
            price: 299.99,
            image: './img/img2.png',
            dateAdded: '2024-01-20',
            description: 'Premium stainless steel watch'
        },
        {
            id: 4,
            name: 'Casual Denim',
            price: 59.99,
            image: './img/img1.png',
            dateAdded: '2024-01-22',
            description: 'Classic denim jeans'
        },
        {
            id: 5,
            name: 'Sport Jacket',
            price: 129.99,
            image: './img/img3.png',
            dateAdded: '2024-01-25',
            description: 'Waterproof sport jacket'
        },
        {
            id: 6,
            name: 'Fashion Backpack',
            price: 79.99,
            image: './img/img4.png',
            dateAdded: '2024-01-28',
            description: 'Stylish everyday backpack'
        }
    ];

    function formatDate(dateString) {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('en-US', options);
    }

    function createNewArrivalCard(product, index) {
        return `
            <div class="product-card" style="--card-index: ${index}">
                <div class="new-label">New</div>
                <img src="${product.image}" alt="${product.name}">
                <div class="product-info">
                    <h3>${product.name}</h3>
                    <p class="description">${product.description}</p>
                    <p class="release-date">Released: ${formatDate(product.dateAdded)}</p>
                    <p class="price">$${product.price.toFixed(2)}</p>
                    <button class="add-to-cart" data-product-id="${product.id}">Add to Cart</button>
                </div>
            </div>
        `;
    }

    // Render all products
    function renderProducts() {
        newArrivalsGrid.innerHTML = newArrivals
            .map((product, index) => createNewArrivalCard(product, index))
            .join('');
    }

    // Add to cart functionality
    function addToCart(productId) {
        const product = newArrivals.find(p => p.id === productId);
        if (!product) return;

        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        const existingItem = cart.find(item => item.id === productId);

        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({
                id: product.id,
                name: product.name,
                price: product.price,
                image: product.image,
                quantity: 1
            });
        }

        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();
    }

    // Update cart count
    function updateCartCount() {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        document.querySelector('.cart-count').textContent = totalItems;
    }

    // Event delegation for add to cart buttons
    newArrivalsGrid.addEventListener('click', (e) => {
        if (e.target.classList.contains('add-to-cart')) {
            const productId = parseInt(e.target.dataset.productId);
            addToCart(productId);
        }
    });

    // Initialize
    renderProducts();
    updateCartCount();
});