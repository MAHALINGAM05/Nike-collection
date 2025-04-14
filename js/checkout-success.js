document.addEventListener('DOMContentLoaded', () => {
    const orderDetails = JSON.parse(localStorage.getItem('lastOrder'));
    const orderItems = document.getElementById('orderItems');
    const subtotalElement = document.getElementById('subtotal');
    const taxElement = document.getElementById('tax');
    const totalElement = document.getElementById('total');

    if (orderDetails) {
        let subtotal = 0;
        let totalSavings = 0;

        orderDetails.items.forEach(item => {
            const itemTotal = item.price * item.quantity;
            subtotal += itemTotal;
            
            if (item.discountPercentage > 0) {
                const savings = (item.originalPrice - item.price) * item.quantity;
                totalSavings += savings;
            }

            const orderItem = document.createElement('div');
            orderItem.className = 'order-item';
            orderItem.innerHTML = `
                <img src="${item.image}" alt="${item.name}" width="50">
                <div class="item-details">
                    <h3>${item.name}</h3>
                    <p>Quantity: ${item.quantity}</p>
                    ${item.discountPercentage ? `
                        <div class="price-info">
                            <p class="original-price">Original: $${(item.originalPrice * item.quantity).toFixed(2)}</p>
                            <p class="discount-info">Discount: ${item.discountPercentage}% off</p>
                            <p class="final-price">Final: $${(item.price * item.quantity).toFixed(2)}</p>
                        </div>
                    ` : `
                        <div class="price-info">
                            <p class="final-price">$${(item.price * item.quantity).toFixed(2)}</p>
                        </div>
                    `}
                </div>
            `;
            orderItems.appendChild(orderItem);
        });

        const tax = subtotal * 0.1;
        const total = subtotal + tax;

        if (totalSavings > 0) {
            const savingsElement = document.createElement('div');
            savingsElement.className = 'savings-info';
            savingsElement.innerHTML = `
                <span>Total Savings:</span>
                <span class="savings-amount">-$${totalSavings.toFixed(2)}</span>
            `;
            document.querySelector('.order-total').insertBefore(
                savingsElement, 
                document.querySelector('.total')
            );
        }

        subtotalElement.textContent = `$${subtotal.toFixed(2)}`;
        taxElement.textContent = `$${tax.toFixed(2)}`;
        totalElement.textContent = `$${total.toFixed(2)}`;
    }
});