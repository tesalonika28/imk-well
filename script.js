// State data produk default
let currentProduct = {
    title: "barenbliss Peach Make Perfect Lip Tint (Paradise Found)",
    price: 72900,
    img: "bnb_lip_tint_1.png"
};
let selectedPayment = "BRI";
const shippingCost = 50000;

// Navigasi Antar Halaman
function switchView(viewName) {
    document.querySelectorAll('.view').forEach(view => view.classList.remove('active'));
    document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'));
    
    document.getElementById(`view-${viewName}`).classList.add('active');
    
    if(viewName === 'shop') {
        document.querySelectorAll('.nav-btn')[1].classList.add('active');
    } else if(viewName === 'checkout') {
        document.querySelectorAll('.nav-btn')[2].classList.add('active');
    }
}

// Interaksi tombol Beli Sekarang
function buyProduct(name, price, imgFileName) {
    currentProduct.title = name;
    currentProduct.price = price;
    currentProduct.img = imgFileName;

    document.getElementById('chk-title').innerText = currentProduct.title;
    document.getElementById('chk-price').innerText = "Rp " + price.toLocaleString('id-ID');
    
    const imgElement = document.getElementById('chk-img');
    imgElement.src = imgFileName;
    
    let total = price + shippingCost;
    document.getElementById('chk-total').innerText = "Rp " + total.toLocaleString('id-ID');

    switchView('checkout');
}

// Pilih Bank
function selectPayment(method) {
    selectedPayment = method;
    document.querySelectorAll('.pay-btn').forEach(btn => {
        btn.classList.remove('selected');
        if(btn.innerText === method) btn.classList.add('selected');
    });
}

// Place Order -> Receipt
function processOrder() {
    document.getElementById('rcp-title').innerText = currentProduct.title;
    document.getElementById('rcp-price').innerText = "Rp " + currentProduct.price.toLocaleString('id-ID');
    document.getElementById('rcp-subtotal').innerText = "Rp " + currentProduct.price.toLocaleString('id-ID');
    
    let total = currentProduct.price + shippingCost;
    document.getElementById('rcp-total').innerText = "Rp " + total.toLocaleString('id-ID');
    document.getElementById('rcp-method').innerText = selectedPayment;

    const now = new Date();
    document.getElementById('receipt-date').innerText = now.toLocaleString('id-ID');

    switchView('receipt');
}