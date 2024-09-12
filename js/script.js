// Dit globale order objekt, som holder styr på hver type kaffe
let order = {
    coffee: { quantity: 0, totalPrice: 0,unitPrice: 10},
    espresso: { quantity: 0, totalPrice: 0,unitPrice: 18},
    latte: { quantity: 0, totalPrice: 0,unitPrice: 22 }
};

// Funktion til at tilføje et produkt til kurven og opdatere input-feltet
function addToCart(product) {
    let quantity = document.getElementById(product).value;
    document.getElementById(product).value = parseInt(quantity) + 1;
    updateTotalPrice(product); // Opdater produktets totalpris
    saveOrderToLocalStorage(); // Gem ændringer i localStorage
}

// Funktion til at fjerne et produkt fra kurven og opdatere input-feltet
function removeFromCart(product) {
    let quantity = document.getElementById(product).value;
    if (quantity > 0) {
        document.getElementById(product).value = parseInt(quantity) - 1;
        updateTotalPrice(product); // Opdater produktets totalpris
        saveOrderToLocalStorage(); // Gem ændringer i localStorage
    }
}

// Funktion til at øge mængden af et produkt med et bestemt antal
function increaseQuantity(product, amount) {
    let quantity = document.getElementById(product).value;
    document.getElementById(product).value = parseInt(quantity) + amount;
    updateTotalPrice(product); // Opdater produktets totalpris
    saveOrderToLocalStorage(); // Gem ændringer i localStorage
}

// Funktion til at nulstille kurven for et produkt
function resetCart(product) {
    document.getElementById(product).value = 0;
    updateTotalPrice(product); // Opdater produktets totalpris
    saveOrderToLocalStorage(); // Gem ændringer i localStorage
}

// Funktion til at opdatere den totale pris for et produkt
function updateTotalPrice(product) {
    const quantityElement = document.getElementById(product);
    const totalElement = document.getElementById(product + '-total');

    if (quantityElement && totalElement) {
        const quantity = parseInt(quantityElement.value);
        const price = order[product].unitPrice;  // Brug prisen fra order objektet
        const total = quantity * price;

        totalElement.value = total;

        // Opdater bestillingsobjektet
        order[product].quantity = quantity;
        order[product].totalPrice = total;

        checkoutTotalPrice('coffee', 'espresso', 'latte');
    }
}

// Funktion til at opdatere den samlede pris for alle produkter i kurven
function checkoutTotalPrice(productA, productB, productC) {
    const totalPriceProductA = document.getElementById(productA + '-total');
    const totalPriceProductB = document.getElementById(productB + '-total');
    const totalPriceProductC = document.getElementById(productC + '-total');

    const totalPriceA = parseInt(totalPriceProductA.value); // Hent total prisen for produkt A
    const totalPriceB = parseInt(totalPriceProductB.value); // Hent total prisen for produkt B
    const totalPriceC = parseInt(totalPriceProductC.value); // Hent total prisen for produkt C

    const totalSum = totalPriceA + totalPriceB + totalPriceC;
    console.log(order);
    console.log(totalSum);  
    document.getElementById('totalSum').value = totalSum; // Opdater den samlede sum i checkout                 
}

// Funktion til at gemme ordren i localStorage
function saveOrderToLocalStorage() {
    localStorage.setItem('order', JSON.stringify(order));
}

// Funktion til at hente ordren fra localStorage
function loadOrderFromLocalStorage() {
    const savedOrder = localStorage.getItem('order');
    if (savedOrder) {
        order = JSON.parse(savedOrder); // Konverter strengen til et objekt

        // Opdater inputfelterne i HTML med gemte data
        document.getElementById('coffee').value = order.coffee.quantity;
        document.getElementById('coffee-total').value = order.coffee.totalPrice;
        
        document.getElementById('espresso').value = order.espresso.quantity;
        document.getElementById('espresso-total').value = order.espresso.totalPrice;
        
        document.getElementById('latte').value = order.latte.quantity;
        document.getElementById('latte-total').value = order.latte.totalPrice;

        // Opdater totalsummen
        checkoutTotalPrice('coffee', 'espresso', 'latte');
    }
}

// Når siden indlæses, henter vi data fra localStorage
window.onload = function() {
    loadOrderFromLocalStorage();
};

// Tilføjes i bunden af den eksisterende script.js fil
function goToCheckout() {
    window.location.href = 'checkout.html';
}
