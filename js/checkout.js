// Load the order from localStorage and display it on the checkout page
function loadOrderFromLocalStorage() {
    const savedOrder = localStorage.getItem('order');
    if (savedOrder) {
        const order = JSON.parse(savedOrder);
        displayOrderSummary(order);
    }
}

function displayOrderSummary(order) {
    const orderSummary = document.getElementById('order-summary');
    let totalPrice = 0;

    // Loop through each product and display it
    for (const product in order) {
        if (order[product].quantity > 0) {
            const li = document.createElement('li');
            li.textContent = `${product.charAt(0).toUpperCase() + product.slice(1)}: ${order[product].quantity} x ${order[product].unitPrice} DKK = ${order[product].totalPrice} DKK`;
            orderSummary.appendChild(li);
            totalPrice += order[product].totalPrice;
        }
    }

    // Display the total price
    document.getElementById('total-price').textContent = totalPrice;
}

// Event listener for confirming the order
document.getElementById('confirm-order').addEventListener('click', function() {
    // Redirect to the confirmation page
    window.location.href = 'confirmation.html';
});

// Load the order when the page loads
window.onload = function() {
    loadOrderFromLocalStorage();
};
