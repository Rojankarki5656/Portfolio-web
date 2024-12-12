let cart = [];
const cartCount = document.getElementById("cart-count");
const cartModal = document.getElementById("cart-modal");
const cartItems = document.getElementById("cart-items");
const details = document.getElementById('formContainer');
const buttons = document.getElementById('buttons');
// Function to add items to the cart
function addToCart(productName, productPrice, quantityInputId, productImage) {
    const quantity = parseInt(document.getElementById(quantityInputId).value) || 1;

    // Check if the item already exists in the cart
    const existingItem = cart.find((item) => item.name === productName);
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({ name: productName, price: productPrice, quantity: quantity, image: productImage });
    }

    updateCart();
}

// Function to update the cart count
function updateCart() {
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    cartCount.textContent = totalItems;
}

// Function to toggle the cart modal
function toggleCartModal() {
    if (cartModal.style.display === "block") {
        cartModal.style.display = "none";
    } else {
        renderCart();
        cartModal.style.display = "block";
    }
}

// Function to render the cart items in the modal
function renderCart() {
    cartItems.innerHTML = ""; // Clear existing items

    if (cart.length === 0) {
        cartItems.innerHTML = "<p>Your cart is empty.</p>";

        // Disable the checkout button if it exists
        const checkoutButton = document.querySelector("#buttons-container button");
        if (checkoutButton) {
            checkoutButton.disabled = true;
        }
        return;
    }

    // Render each item in the cart
    cart.forEach((item) => {
        const cartItem = document.createElement("div");
        cartItem.className = "cart-item";
        cartItem.innerHTML = `
            <img src="${item.image}" alt="${item.name}" class="cart-item-image" onerror="this.src='fallback-image.jpg';">
            <div class="cart-item-details">
                <h4>${item.name}</h4>
                <p>Quantity: ${item.quantity}</p>
                <p>Price: $${(item.price * item.quantity).toFixed(2)}</p>
            </div>
        `;
        cartItems.appendChild(cartItem);
    });

    // Ensure a single checkout button exists
    let checkoutButton = document.querySelector("#buttons-container button");
    if (!checkoutButton) {
        checkoutButton = document.createElement("button");
        checkoutButton.textContent = "Proceed to Checkout";
        checkoutButton.onclick = checkout;
        document.getElementById("buttons-container").appendChild(checkoutButton);
    }

    // Enable the button if there are items in the cart
    checkoutButton.disabled = false;
}


function checkout() {
    if (cart.length === 0) {
        alert("Your cart is empty.");
        return;
    }

    const cartDetailsContainer = document.getElementById("cartDetailsContainer");
    cartDetailsContainer.innerHTML = ""; // Clear any previous inputs

    // Add cart details as hidden inputs
    cart.forEach((item, index) => {
        const nameInput = document.createElement("input");
        nameInput.type = "hidden";
        nameInput.name = `cart[${index}][name]`;
        nameInput.value = item.name;
        cartDetailsContainer.appendChild(nameInput);

        const priceInput = document.createElement("input");
        priceInput.type = "hidden";
        priceInput.name = `cart[${index}][price]`;
        priceInput.value = item.price;
        cartDetailsContainer.appendChild(priceInput);

        const quantityInput = document.createElement("input");
        quantityInput.type = "hidden";
        quantityInput.name = `cart[${index}][quantity]`;
        quantityInput.value = item.quantity;
        cartDetailsContainer.appendChild(quantityInput);
    });

    // Show the form
    const formContainer = document.getElementById("form-container");
    formContainer.style.display = "block";
}
