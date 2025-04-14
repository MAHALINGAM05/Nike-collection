document.addEventListener('DOMContentLoaded', () => {
    let cartCount = 0;
    const cartCountElement = document.querySelector('.cart-count');
    const productGrid = document.getElementById('productGrid');

    // Sample product data
    const products = [
        {
            id: 1,
            name: 'Classic T-Shirt',
            price: 29.99,
            image:'./img/img1.png',
            rating: 2
        },
        {
            id: 2,
            name: 'Running Shoes',
            price: 89.99,
            image: 'https://via.placeholder.com/300',
            rating: 5
        },
        {
            id: 3,
            name: 'Sports Jersey',
            price: 49.99,
            image: 'https://via.placeholder.com/300',
            rating: 4.2
        },
        {
            id: 4,
            name: 'Denim Jeans',
            price: 79.99,
            image: 'https://via.placeholder.com/300',
            rating: 4.0
        },
        {
            id: 5,
            name: 'Training Shorts',
            price: 34.99,
            image: 'https://via.placeholder.com/300',
            rating: 4.3
        },
        {
            id: 6,
            name: 'Basketball Shoes',
            price: 129.99,
            image: 'https://via.placeholder.com/300',
            rating: 4.7
        },
    ];

    // Discount products data
    const discountProducts = [
        {
            id: 101,
            name: 'Premium Sports Shoes',
            originalPrice: 199.99,
            discountPercentage: 30,
            image: './img/img1.png',
            rating: 4.8
        },
        {
            id: 102,
            name: 'Designer Jacket',
            originalPrice: 149.99,
            discountPercentage: 25,
            image: 'https://via.placeholder.com/300',
            rating: 4.6
        },
        {
            id: 103,
            name: 'Luxury Handbag',
            originalPrice: 299.99,
            discountPercentage: 40,
            image: 'https://via.placeholder.com/300',
            rating: 4.9
        }
    ];

    function createStarRating(rating) {
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 !== 0;
        const emptyStars = 5 - Math.ceil(rating);
        
        return `
            <div class="rating">
                ${Array(fullStars).fill('<i class="fas fa-star"></i>').join('')}
                ${hasHalfStar ? '<i class="fas fa-star-half-alt"></i>' : ''}
                ${Array(emptyStars).fill('<i class="far fa-star"></i>').join('')}
                <span class="rating-number">(${rating})</span>
            </div>
        `;
    }

    function createProductCard(product) {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <div class="product-info">
                <h3>${product.name}</h3>
                ${createStarRating(product.rating)}
                <p class="price">$${product.price.toFixed(2)}</p>
                <button class="add-to-cart" data-product-id="${product.id}">Add to Cart</button>
            </div>
        `;
        return card;
    }

    function createDiscountCard(product) {
        const discountedPrice = product.originalPrice * (1 - product.discountPercentage / 100);
        const card = document.createElement('div');
        card.className = 'discount-card';
        card.innerHTML = `
            <div class="discount-badge">-${product.discountPercentage}%</div>
            <img class="discount-img" src="${product.image}" alt="${product.name}">
            <div class="product-info discard-info">
                <h3>${product.name}</h3>
                ${createStarRating(product.rating)}
                <p>
                    <span class="original-price">$${product.originalPrice.toFixed(2)}</span>
                    <span class="discount-price">$${discountedPrice.toFixed(2)}</span>
                </p>
                <button class="add-to-cart" data-product-id="${product.id}" 
                        data-discount-percentage="${product.discountPercentage}">
                    Add to Cart
                </button>
            </div>
        `;
        return card;
    }

    function updateCartCount() {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCountElement.textContent = totalItems;
    }

    function addToCart(productId) {
        const product = products.find(p => p.id === productId) || 
                       discountProducts.find(p => p.id === productId);
        if (!product) return;

        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        const existingItem = cart.find(item => item.id === productId);

        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            const isDiscountProduct = discountProducts.find(p => p.id === productId);
            const price = isDiscountProduct ? 
                product.originalPrice * (1 - product.discountPercentage / 100) : 
                product.price;

            cart.push({
                id: product.id,
                name: product.name,
                price: price,
                originalPrice: isDiscountProduct ? product.originalPrice : price,
                discountPercentage: isDiscountProduct ? product.discountPercentage : 0,
                image: product.image,
                quantity: 1
            });
        }

        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();
    }

    // Generate product cards
    products.forEach(product => {
        const card = createProductCard(product);
        productGrid.appendChild(card);
    });

    // Add discount products to the grid
    const discountGrid = document.getElementById('discountGrid');
    if (discountGrid) {
        discountProducts.forEach(product => {
            const card = createDiscountCard(product);
            discountGrid.appendChild(card);
        });
    }

    // Add event delegation for "Add to Cart" buttons
    productGrid.addEventListener('click', (e) => {
        if (e.target.classList.contains('add-to-cart')) {
            const productId = parseInt(e.target.dataset.productId);
            addToCart(productId);
        }
    });

    // Add event delegation for discount products
    if (discountGrid) {
        discountGrid.addEventListener('click', (e) => {
            if (e.target.classList.contains('add-to-cart')) {
                const productId = parseInt(e.target.dataset.productId);
                addToCart(productId);
            }
        });
    }

    // Initialize cart count
    updateCartCount();
});