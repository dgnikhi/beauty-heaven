function displayCartItems() {
    const cartItems = document.getElementById('cart-items');
    const totalSpan = document.getElementById('total');
    
    if (!cartItems) return;
    
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let total = 0;
    
    if (cart.length === 0) {
        cartItems.innerHTML = '<p style="text-align:center; font-size:18px; color:#999; padding:40px;">Your cart is empty. <a href="products.html" style="color:#7b2cbf; text-decoration:none; font-weight:bold;">Continue Shopping</a></p>';
        if (totalSpan) totalSpan.textContent = '0.00';
        return;
    }
    
    let cartHTML = '<table style="width:100%; border-collapse:collapse; margin:20px 0;"><tr style="background:#f5f5f5; border-bottom:2px solid #ddd;"><th style="padding:10px; text-align:left;">Product</th><th style="padding:10px; text-align:center;">Price</th><th style="padding:10px; text-align:center;">Quantity</th><th style="padding:10px; text-align:center;">Total</th><th style="padding:10px; text-align:center;">Action</th></tr>';
    
    cart.forEach((item, index) => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        cartHTML += `
            <tr style="border-bottom:1px solid #eee;">
                <td style="padding:10px;">${item.name}</td>
                <td style="padding:10px; text-align:center;">$${item.price.toFixed(2)}</td>
                <td style="padding:10px; text-align:center;">
                    <input type="number" value="${item.quantity}" min="1" onchange="updateQuantity(${index}, this.value)" style="width:50px; padding:5px; text-align:center;">
                </td>
                <td style="padding:10px; text-align:center;">$${itemTotal.toFixed(2)}</td>
                <td style="padding:10px; text-align:center;">
                    <button onclick="removeFromCart(${index})" style="background:#ff6b6b; padding:5px 10px; color:white; border:none; border-radius:4px; cursor:pointer;">Remove</button>
                </td>
            </tr>
        `;
    });
    
    cartHTML += '</table>';
    cartItems.innerHTML = cartHTML;
    if (totalSpan) totalSpan.textContent = total.toFixed(2);
}

function updateQuantity(index, newQuantity) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    newQuantity = parseInt(newQuantity);
    
    if (newQuantity < 1) {
        removeFromCart(index);
    } else {
        cart[index].quantity = newQuantity;
        localStorage.setItem('cart', JSON.stringify(cart));
        displayCartItems();
    }
}

function removeFromCart(index) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    displayCartItems();
}

function checkout() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }
    window.location.href = 'checkout.html';
}

// Display cart when page loads
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', displayCartItems);
} else {
    displayCartItems();
}