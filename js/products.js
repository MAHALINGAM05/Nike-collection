document.addEventListener('DOMContentLoaded', () => {
    const productGrid = document.getElementById('productGrid');
    const searchInput = document.getElementById('searchInput');
    const searchButton = document.getElementById('searchButton');
    const categoryFilter = document.getElementById('categoryFilter');
    const priceRange = document.getElementById('priceRange');
    const minPrice = document.getElementById('minPrice');
    const maxPrice = document.getElementById('maxPrice');
    const clearFilters = document.getElementById('clearFilters');

    const toggleFiltersBtn = document.getElementById('toggleFilters');
    const filtersPanel = document.getElementById('filtersPanel');

    // Sample product data with all attributes
    const products = [
        {
            id: 1,
            name: 'Classic T-Shirt',
            price: 29.99,
            image: './img/img4.png',
            category: 'clothing',
            sizes: ['S', 'M', 'L', 'XL'],
            brand: 'nike',
            color: 'black',
            description: 'Comfortable cotton t-shirt'
        },
        {
            id: 2,
            name: 'Running Shoes',
            price: 89.99,
            image: './img/img-single.png',
            category: 'shoes',
            sizes: ['40', '41', '42', '43'],
            brand: 'adidas',
            color: 'white',
            description: 'Lightweight running shoes'
        },
        {
            id: 3,
            name: 'Sports Jersey',
            price: 49.99,
            image: './img/img1.png',
            category: 'clothing',
            sizes: ['M', 'L', 'XL'],
            brand: 'puma',
            color: 'red',
            description: 'Professional sports jersey'
        },
        {
            id: 4,
            name: 'Denim Jeans',
            price: 79.99,
            image: 'https://via.placeholder.com/300',
            category: 'clothing',
            sizes: ['30', '32', '34', '36'],
            brand: 'nike',
            color: 'blue',
            description: 'Classic denim jeans'
        },
        {
            id: 5,
            name: 'Training Shorts',
            price: 34.99,
            image: 'https://via.placeholder.com/300',
            category: 'clothing',
            sizes: ['S', 'M', 'L'],
            brand: 'adidas',
            color: 'black',
            description: 'Comfortable training shorts'
        },
        {
            id: 6,
            name: 'Basketball Shoes',
            price: 129.99,
            image: 'https://via.placeholder.com/300',
            category: 'shoes',
            sizes: ['41', '42', '43', '44'],
            brand: 'nike',
            color: 'red',
            description: 'High-performance basketball shoes'
        },
        {
            id: 7,
            name: 'Sports Watch',
            price: 199.99,
            image: 'https://via.placeholder.com/300',
            category: 'accessories',
            sizes: ['ONE SIZE'],
            brand: 'adidas',
            color: 'black',
            description: 'Digital sports watch with heart rate monitor'
        },
        {
            id: 8,
            name: 'Workout Leggings',
            price: 44.99,
            image: 'https://via.placeholder.com/300',
            category: 'clothing',
            sizes: ['XS', 'S', 'M', 'L'],
            brand: 'puma',
            color: 'blue',
            description: 'High-waist workout leggings'
        },
        {
            id: 9,
            name: 'Sports Bag',
            price: 59.99,
            image: 'https://via.placeholder.com/300',
            category: 'accessories',
            sizes: ['ONE SIZE'],
            brand: 'nike',
            color: 'black',
            description: 'Spacious sports bag with compartments'
        },
        {
            id: 10,
            name: 'Running Cap',
            price: 24.99,
            image: 'https://via.placeholder.com/300',
            category: 'accessories',
            sizes: ['ONE SIZE'],
            brand: 'adidas',
            color: 'white',
            description: 'Lightweight running cap with moisture-wicking'
        }
    ];

    // Get unique values for each filter
    const getUniqueValues = (key) => [...new Set(products.flatMap(product => 
        Array.isArray(product[key]) ? product[key] : [product[key]]
    ))];

    // Dynamically populate size checkboxes
    const sizes = getUniqueValues('sizes');
    const sizeGroup = document.querySelector('.checkbox-group[name="size"]');
    if (sizeGroup) {
        sizeGroup.innerHTML = sizes.map(size => `
            <label><input type="checkbox" name="size" value="${size}"> ${size}</label>
        `).join('');
    }

    // Dynamically populate brand checkboxes
    const brands = getUniqueValues('brand');
    const brandGroup = document.querySelector('.checkbox-group[name="brand"]');
    if (brandGroup) {
        brandGroup.innerHTML = brands.map(brand => `
            <label><input type="checkbox" name="brand" value="${brand}"> ${brand.charAt(0).toUpperCase() + brand.slice(1)}</label>
        `).join('');
    }

    function filterProducts() {
        let filteredProducts = [...products];

        // Search filter
        const searchTerm = searchInput.value.toLowerCase();
        if (searchTerm) {
            filteredProducts = filteredProducts.filter(product => 
                product.name.toLowerCase().includes(searchTerm) ||
                product.description.toLowerCase().includes(searchTerm)
            );
        }

        // Category filter
        const selectedCategory = categoryFilter.value;
        if (selectedCategory) {
            filteredProducts = filteredProducts.filter(product => 
                product.category === selectedCategory
            );
        }

        // Size filter
        const selectedSizes = [...document.querySelectorAll('input[name="size"]:checked')]
            .map(input => input.value);
        if (selectedSizes.length) {
            filteredProducts = filteredProducts.filter(product => 
                product.sizes.some(size => selectedSizes.includes(size))
            );
        }

        // Brand filter
        const selectedBrands = [...document.querySelectorAll('input[name="brand"]:checked')]
            .map(input => input.value);
        if (selectedBrands.length) {
            filteredProducts = filteredProducts.filter(product => 
                selectedBrands.includes(product.brand)
            );
        }

        // Color filter
        const selectedColors = [...document.querySelectorAll('input[name="color"]:checked')]
            .map(input => input.value);
        if (selectedColors.length) {
            filteredProducts = filteredProducts.filter(product => 
                selectedColors.includes(product.color)
            );
        }

        // Price filter
        const minPriceValue = parseFloat(minPrice.value) || 0;
        const maxPriceValue = parseFloat(maxPrice.value) || parseFloat(priceRange.max);
        filteredProducts = filteredProducts.filter(product => 
            product.price >= minPriceValue && product.price <= maxPriceValue
        );

        renderProducts(filteredProducts);
    }

    function renderProducts(products) {
        productGrid.innerHTML = '';
        
        if (products.length === 0) {
            productGrid.innerHTML = '<p class="no-results">No products found matching your criteria</p>';
            return;
        }

        products.forEach(product => {
            const card = createProductCard(product);
            productGrid.appendChild(card);
        });
    }

    function createProductCard(product) {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <div class="product-info">
                <h3>${product.name}</h3>
                <p class="description">${product.description}</p>
                <p class="details">
                    <span class="brand">${product.brand.toUpperCase()}</span>
                    <span class="color" style="background-color: ${product.color}"></span>
                </p>
                <p class="sizes">Sizes: ${product.sizes.join(', ')}</p>
                <p class="price">$${product.price.toFixed(2)}</p>
                <button class="add-to-cart" data-product-id="${product.id}">Add to Cart</button>
            </div>
        `;
        return card;
    }

    function clearAllFilters() {
        searchInput.value = '';
        categoryFilter.value = '';
        document.querySelectorAll('input[type="checkbox"]').forEach(input => input.checked = false);
        minPrice.value = '';
        maxPrice.value = '';
        priceRange.value = priceRange.max;
        filterProducts();
    }

    function updateCartCount() {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        document.querySelector('.cart-count').textContent = totalItems;
    }

    function addToCart(productId) {
        const product = products.find(p => p.id === productId);
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

    // Event Listeners
    searchButton.addEventListener('click', filterProducts);
    searchInput.addEventListener('keyup', (e) => {
        if (e.key === 'Enter') filterProducts();
    });
    categoryFilter.addEventListener('change', filterProducts);
    document.querySelectorAll('input[type="checkbox"]').forEach(input => 
        input.addEventListener('change', filterProducts)
    );
    priceRange.addEventListener('input', () => {
        maxPrice.value = priceRange.value;
        filterProducts();
    });
    minPrice.addEventListener('change', filterProducts);
    maxPrice.addEventListener('change', filterProducts);
    clearFilters.addEventListener('click', clearAllFilters);

    // Add event delegation for "Add to Cart" buttons
    productGrid.addEventListener('click', (e) => {
        if (e.target.classList.contains('add-to-cart')) {
            const productId = parseInt(e.target.dataset.productId);
            addToCart(productId);
        }
    });

    // Add or modify the toggle filters functionality
    toggleFiltersBtn.addEventListener('click', () => {
        filtersPanel.classList.toggle('active');
        toggleFiltersBtn.classList.toggle('active');
        
        // Toggle product grid visibility on mobile
        if (window.innerWidth <= 720) {
            productGrid.classList.toggle('hidden-mobile');
        }
    });

    // Add close filters on click outside
    document.addEventListener('click', (e) => {
        if (window.innerWidth <= 720 && 
            !filtersPanel.contains(e.target) && 
            !toggleFiltersBtn.contains(e.target) &&
            filtersPanel.classList.contains('active')) {
            filtersPanel.classList.remove('active');
            toggleFiltersBtn.classList.remove('active');
            productGrid.classList.remove('hidden-mobile');
        }
    });

    // Handle responsive filters
    function handleResponsiveFilters() {
        if (window.innerWidth <= 720) {
            filtersPanel.classList.remove('active');
            productGrid.classList.remove('hidden-mobile');
            toggleFiltersBtn.classList.remove('active');
        }
    }

    // Initialize responsive behavior
    handleResponsiveFilters();
    window.addEventListener('resize', handleResponsiveFilters);

    // Initialize cart count
    updateCartCount();

    // Initial render
    filterProducts();
});