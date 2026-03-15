const products = [
    { id: 1, name: "Lipstick Red", price: 12.99, category: "Makeup", image: "images/ima1.jpg", description: "Vibrant red lipstick with long-lasting formula. Gives you a bold, classic look with a smooth finish. Perfect for any occasion." },
    { id: 2, name: "Face Foundation", price: 18.99, category: "Makeup", image: "images/ima2.webp", description: "Full coverage foundation that evens out skin tone. Lightweight formula provides flawless finish for 12+ hours. Suitable for all skin types." },
    { id: 3, name: "Moisturizing Cream", price: 24.99, category: "Skincare", image: "images/ima3.jpg", description: "Rich moisturizing cream with organic ingredients. Hydrates and nourishes dry skin. Reduces fine lines and improves skin elasticity." },
    { id: 4, name: "Facial Cleanser", price: 15.99, category: "Skincare", image: "images/ima4.webp", description: "Gentle daily face wash that removes impurities and makeup. Contains natural extracts to cleanse without drying. pH-balanced formula." },
    { id: 5, name: "Hair Shampoo", price: 9.99, category: "Haircare", image: "images/ima5.webp", description: "Sulfate-free shampoo for daily use. Cleanses deeply while maintaining natural oils. Makes hair soft, silky, and manageable." },
    { id: 6, name: "Hair Conditioner", price: 10.99, category: "Haircare", image: "images/ima6.webp", description: "Nourishing conditioner that detangles and smooths hair. Infused with argan oil for deep conditioning. Prevents frizz and adds shine." },
    { id: 7, name: "Perfume Floral", price: 45.99, category: "Fragrance", image: "images/ima7.jpg", description: "Luxurious floral fragrance with notes of jasmine and rose. Long-lasting scent that lingers for 8+ hours. Perfect for daily wear and special occasions." },
    { id: 8, name: "Eye Makeup Brush Set", price: 22.99, category: "Tools", image: "images/ima8.webp", description: "Professional 5-piece eye brush set with soft bristles. Includes flat, blending, and liner brushes. Perfect for detailed eye makeup application." },
    { id: 9, name: "Eyeliner Pencil", price: 8.99, category: "Makeup", image: "images/ima9.webp", description: "Precision eyeliner pencil in rich black. Smudge-proof and water-resistant formula. Creates sharp lines or soft smoky looks." },
    { id: 10, name: "Face Serum", price: 28.99, category: "Skincare", image: "images/ima10.webp", description: "Lightweight face serum with Vitamin C and hyaluronic acid. Brightens and hydrates skin. Absorbs quickly without leaving residue." },
    { id: 11, name: "Blush Powder", price: 14.99, category: "Makeup", image: "images/ima11.webp", description: "Silky blush powder with buildable coverage. Creates natural or dramatic flush. Long-wearing formula that won't fade throughout the day." },
    { id: 12, name: "Hair Oil", price: 12.49, category: "Haircare", image: "images/ima12.jpg", description: "Pure coconut and almond oil blend for hair care. Reduces frizz and adds shine. Nourishes scalp and prevents hair breakage." },
];

function displayProducts(filterCategory = null) {
    const productList = document.getElementById('product-list');
    productList.innerHTML = ''; // Clear previous products
    
    let productsToDisplay = filterCategory 
        ? products.filter(p => p.category === filterCategory)
        : products;
    
    if (productsToDisplay.length === 0) {
        productList.innerHTML = '<p style="grid-column: 1/-1; text-align:center; color:#999; padding:40px;">No products found in this category.</p>';
        return;
    }
    
    productsToDisplay.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.className = 'product-card';
        const isWishlisted = isProductInWishlist(product.id);
        productDiv.innerHTML = `
            <img src="${product.image}" alt="${product.name}" class="product-image" data-full="${product.image}">
            <div class="wishlist-btn" data-id="${product.id}" title="Add to Wishlist">❤️</div>
            <h3>${product.name}</h3>
            <p class="category-tag">${product.category}</p>
            <p class="product-description">${product.description}</p>
            <p class="product-price">$${product.price}</p>
            <button class="add-to-cart-btn" data-id="${product.id}" data-name="${product.name}" data-price="${product.price}">Add to Cart</button>
        `;
        if (isWishlisted) {
            productDiv.querySelector('.wishlist-btn').classList.add('wishlisted');
        }
        productList.appendChild(productDiv);
    });
    
    // Add event listeners
    attachZoomFeature();
    attachCartListeners();
    attachWishlistListeners();
}

function attachCartListeners() {
    const cartButtons = document.querySelectorAll('.add-to-cart-btn');
    cartButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const productId = parseInt(this.dataset.id);
            const productName = this.dataset.name;
            const productPrice = parseFloat(this.dataset.price);
            addToCart(productId, productName, productPrice);
        });
    });
}

function attachWishlistListeners() {
    const wishlistBtns = document.querySelectorAll('.wishlist-btn');
    wishlistBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const productId = parseInt(this.dataset.id);
            toggleWishlist(productId);
            this.classList.toggle('wishlisted');
        });
    });
}

function addToCart(productId, productName, productPrice) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingProduct = cart.find(item => item.id === productId);
    
    if (existingProduct) {
        existingProduct.quantity += 1;
    } else {
        cart.push({ id: productId, name: productName, price: productPrice, quantity: 1 });
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    alert(productName + ' added to cart!');
}

function toggleWishlist(productId) {
    let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    const index = wishlist.indexOf(productId);
    
    if (index > -1) {
        wishlist.splice(index, 1);
    } else {
        wishlist.push(productId);
    }
    
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
}

function isProductInWishlist(productId) {
    const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    return wishlist.includes(productId);
}

function filterByCategory(category) {
    // Redirect to products page with category parameter
    window.location.href = `products.html?category=${encodeURIComponent(category)}`;
}

function filterProducts(category) {
    // Update URL and filter products
    if (category) {
        window.history.pushState({}, '', `products.html?category=${encodeURIComponent(category)}`);
    } else {
        window.history.pushState({}, '', 'products.html');
    }
    
    displayProducts(category);
    
    // Update active button
    const buttons = document.querySelectorAll('.filter-btn');
    buttons.forEach(btn => btn.classList.remove('active'));
    
    if (!category) {
        buttons[0].classList.add('active');
    } else {
        buttons.forEach(btn => {
            if (btn.textContent.includes(category)) {
                btn.classList.add('active');
            }
        });
    }
}

function getCategoryFromURL() {
    const params = new URLSearchParams(window.location.search);
    return params.get('category');
}

function attachZoomFeature() {
    const images = document.querySelectorAll('.product-image');
    images.forEach(img => {
        img.addEventListener('click', function() {
            openZoom(this.src, this.alt);
        });
    });
}

function openZoom(imageSrc, productName) {
    // Create modal overlay
    const modal = document.createElement('div');
    modal.className = 'zoom-modal';
    modal.innerHTML = `
        <div class="zoom-container">
            <span class="zoom-close">&times;</span>
            <img src="${imageSrc}" alt="${productName}" class="zoomed-image">
            <p class="zoom-title">${productName}</p>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Close on X button click
    const closeBtn = modal.querySelector('.zoom-close');
    closeBtn.addEventListener('click', function() {
        modal.remove();
    });
    
    // Close on outside modal click
    modal.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.remove();
        }
    });
    
    // Close on Escape key
    const handleEscape = function(event) {
        if (event.key === 'Escape') {
            modal.remove();
            document.removeEventListener('keydown', handleEscape);
        }
    };
    document.addEventListener('keydown', handleEscape);
}

// Initialize page
(function init() {
    const category = getCategoryFromURL();
    if (category) {
        displayProducts(category);
        // Set active button
        setTimeout(() => {
            const buttons = document.querySelectorAll('.filter-btn');
            buttons.forEach(btn => btn.classList.remove('active'));
            buttons.forEach(btn => {
                if (btn.textContent.includes(category)) {
                    btn.classList.add('active');
                }
            });
        }, 100);
    } else {
        displayProducts();
    }
})();