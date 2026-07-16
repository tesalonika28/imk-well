// 1. DATA PRODUK KOSMETIK
const productsData = [
    { id: 1, brand: 'barenbliss', name: 'Peach Makes Perfect Lip Tint', price: 72900, rating: 4.6, type: 'color', variants: ['Paradise Found', 'Pretty Please', 'Brave Enough', 'Peace Out', 'Stay Classy'], defaultVar: 'Paradise Found', img: 'barenbliss1.png' },
    { id: 2, brand: 'Glad2Glow', name: 'Pomegranate Niacinamide Brightening Moisturizer', price: 99000, rating: 4.8, type: 'size', variants: ['30gr', '100gr', '100gr (Pump)'], defaultVar: '100gr', img: 'g2g2.png' },
    { id: 3, brand: 'Glad2Glow', name: 'Milk Amino Acids Gentle Cleanser', price: 42900, rating: 4.9, type: 'size', variants: ['80gr'], defaultVar: '80gr', img: 'g2g1.png' },
    { id: 4, brand: 'Glad2Glow', name: 'PDRN 10% Niacinamide 3% TXA Brightening Serum', price: 49000, rating: 4.9, type: 'size', variants: ['20gr'], defaultVar: '20gr', img: 'g2g4.png' },
    { id: 5, brand: 'Grace and Glow', name: 'Hair Mist', price: 43000, rating: 4.7, type: 'size', variants: ['100ml'], defaultVar: '100ml', img: 'graceglow2.png' },
    { id: 6, brand: 'Grace and Glow', name: 'Brights Glow Body Serum', price: 92000, rating: 4.7, type: 'size', variants: ['300ml'], defaultVar: '300ml', img: 'graceglow1.png' },
    { id: 7, brand: 'Scarlett', name: 'Scarlett Whitening Brightly Serum', price: 75000, rating: 4.5, type: 'size', variants: ['15ml'], defaultVar: '15ml', img: 'scarlett1.png' },
    { id: 8, brand: 'Scarlett', name: 'Scarlett Body Lotion Tube Jolly', price: 49000, rating: 4.8, type: 'size', variants: ['180ml'], defaultVar: '180ml', img: 'scarlett2.png' },
    { id: 9, brand: 'Emina', name: 'Bright Stuff Loose Powder', price: 29500, rating: 4.6, type: 'size', variants: ['55g'], defaultVar: '55g', img: 'emina1.png' },
    { id: 10, brand: 'Wardah', name: 'Colorfit Velvet Matte Lip Mousse', price: 82500, rating: 4.6, type: 'color', variants: ['Red Pioneer', 'Joyful Orange', 'Cherish Marmalade', 'Chic Terracotta'], defaultVar: 'Red Pioneer', img: 'wardah1.png' },
    { id: 11, brand: 'Wardah', name: 'UV Shield Essential Gel Sunscreen Serum SPF 35', price: 40000, rating: 4.6, type: 'size', variants: ['40ml'], defaultVar: '40ml', img: 'wardah2.png' }
];

// State Manajemen Aplikasi
let cart = [];
let selectedBankName = 'BRI';
let currentActiveProductId = null;
let selectedVariantValue = '';
let navigationHistory = ['home'];

// Helper Format Rupiah
function formatRupiah(number) {
    return 'Rp. ' + number.toLocaleString('id-ID');
}

// 2. RENDER DAFTAR PRODUK (DI SHOP)
function renderShopProducts() {
    const container = document.getElementById('product-list-container');
    if (!container) return;
    
    container.innerHTML = '';
    productsData.forEach(prod => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.onclick = () => openProductDetail(prod.id);
        card.innerHTML = `
            <div class="product-img-circle">
                <img src="${prod.img}" alt="${prod.name}">
            </div>
            <div class="product-name">${prod.brand} - ${prod.name}</div>
            <div class="product-price">${formatRupiah(prod.price)}</div>
            <div class="product-rating">★ ${prod.rating}</div>
        `;
        container.appendChild(card);
    });
}

// 3. ENGINE JAVASCRIPT SINGLE PAGE APPLICATION (SPA)
function navigateTo(screenId, addToHistory = true) {
    // Sembunyikan semua section screen
    document.querySelectorAll('.app-screen').forEach(screen => screen.classList.remove('active'));
    // Hapus status active dari navigasi menu atas
    document.querySelectorAll('.nav-item').forEach(item => item.classList.remove('active'));

    // Aktifkan screen tujuan
    const targetScreen = document.getElementById(`screen-${screenId}`);
    if(targetScreen) targetScreen.classList.add('active');

    // Menyesuaikan sorotan menu navbar atas
    if(screenId === 'home') document.getElementById('nav-home').classList.add('active');
    if(screenId === 'shop' || screenId === 'detail') document.getElementById('nav-shop').classList.add('active');
    if(screenId === 'cart') document.getElementById('nav-cart').classList.add('active');

    // Catat histori untuk tombol Back Arrow
    if(addToHistory && navigationHistory[navigationHistory.length - 1] !== screenId) {
        navigationHistory.push(screenId);
    }

    // Update data jika masuk halaman keranjang
    if(screenId === 'cart') updateCartView();
}

function goBack() {
    if(navigationHistory.length > 1) {
        navigationHistory.pop(); 
        const prevScreen = navigationHistory[navigationHistory.length - 1];
        navigateTo(prevScreen, false);
    }
}

// 4. INTERAKSI DETAIL PRODUK
function openProductDetail(productId) {
    currentActiveProductId = productId;
    const product = productsData.find(p => p.id === productId);
    selectedVariantValue = product.defaultVar; 

    const detailContainer = document.getElementById('detail-card-dynamic');
    
    let variantHTML = '';
    if(product.type === 'color') {
        variantHTML = `<div class="variant-title">${selectedVariantValue}</div><div class="color-circles">`;
        product.variants.forEach(v => {
            const colorMap = {
                'Paradise Found': '#e57373', 'Pretty Please': '#f06292', 'Brave Enough': '#ba68c8', 'Peace Out': '#ff8a65', 'Stay Classy': '#8d6e63',
                'Red Pioneer': '#b71c1c', 'Joyful Orange': '#e65100', 'Cherish Marmalade': '#bf360c', 'Chic Terracotta': '#a1887f'
            };
            const colorHex = colorMap[v] || '#ff4081';
            variantHTML += `<div class="color-circle ${v === selectedVariantValue ? 'selected':''}" style="background-color: ${colorHex};" title="${v}" onclick="changeVariant('${v}', this)"></div>`;
        });
        variantHTML += `</div>`;
    } else {
        variantHTML = `<div class="variant-title">Size:</div><div class="size-boxes">`;
        product.variants.forEach(v => {
            variantHTML += `<div class="size-box ${v === selectedVariantValue ? 'selected':''}" onclick="changeVariant('${v}', this)">${v}</div>`;
        });
        variantHTML += `</div>`;
    }

    detailContainer.innerHTML = `
        <div class="detail-img-sec">
            <img src="${product.img}" alt="${product.name}">
        </div>
        <div class="detail-info-sec">
            <div class="detail-brand">${product.brand}</div>
            <div class="detail-title">${product.name}</div>
            <div class="detail-price">${formatRupiah(product.price)}</div>
            <div class="detail-rate">Review: ★★★★★ ${product.rating}</div>
            <div>
                ${variantHTML}
            </div>
            <div class="detail-buttons">
                <button class="btn-navy" onclick="addToCartCurrent()">Add to Cart</button>
                <button class="btn-navy" onclick="buyDirectly()">Check Out</button>
            </div>
        </div>
    `;
    navigateTo('detail');
}

function changeVariant(value, element) {
    selectedVariantValue = value;
    const parent = element.parentElement;
    
    if(element.classList.contains('color-circle')) {
        parent.querySelectorAll('.color-circle').forEach(c => c.classList.remove('selected'));
        element.classList.add('selected');
        const titleElement = parent.previousElementSibling;
        if(titleElement) titleElement.innerText = value;
    } else {
        parent.querySelectorAll('.size-box').forEach(b => b.classList.remove('selected'));
        element.classList.add('selected');
    }
}

// 5. MANAJEMEN KERANJANG BELANJA (CART)
function addToCartCurrent() {
    const product = productsData.find(p => p.id === currentActiveProductId);
    cart.push({
        id: product.id,
        brand: product.brand,
        name: product.name,
        price: product.price,
        variant: selectedVariantValue,
        img: product.img
    });
    alert(`${product.name} (${selectedVariantValue}) dimasukkan ke keranjang.`);
    navigateTo('cart');
}

// Jika klik "Check out" langsung di halaman detail
function buyDirectly() {
    const product = productsData.find(p => p.id === currentActiveProductId);
    cart = [{
        id: product.id,
        brand: product.brand,
        name: product.name,
        price: product.price,
        variant: selectedVariantValue,
        img: product.img
    }];
    navigateTo('cart');
}

function updateCartView() {
    const listContainer = document.getElementById('cart-items-list');
    const totalText = document.getElementById('cart-total-price');
    if (!listContainer || !totalText) return;

    listContainer.innerHTML = '';

    if(cart.length === 0) {
        listContainer.innerHTML = `<div style="text-align:center; padding: 20px; color:#666;">Keranjang belanja Anda kosong.</div>`;
        totalText.innerText = formatRupiah(0);
        return;
    }

    let total = 0;
    cart.forEach(item => {
        total += item.price;
        const row = document.createElement('div');
        row.className = 'cart-item-row';
        row.innerHTML = `
            <div class="cart-item-info">
                <span class="cart-item-name">${item.brand} ${item.name}</span>
                <span class="cart-item-variant">${item.variant}</span>
            </div>
            <div class="cart-item-price">${formatRupiah(item.price)}</div>
        `;
        listContainer.appendChild(row);
    });
    
    totalText.innerText = formatRupiah(total);
}

// 6. METODE PEMBAYARAN DAN STRUK (RECEIPT)
function selectBank(element, bankName) {
    document.querySelectorAll('.bank-card').forEach(b => b.classList.remove('selected'));
    element.classList.add('selected');
    selectedBankName = bankName;
}

function processPayment() {
    const now = new Date();
    const timeString = now.toLocaleDateString('id-ID') + ', ' + now.toLocaleTimeString('id-ID');
    document.querySelectorAll('.current-date-time').forEach(el => el.innerText = timeString);

    document.getElementById('receipt-no').innerText = Math.floor(1000000000 + Math.random() * 9000000000);
    document.getElementById('receipt-order-no').innerText = Math.floor(100000 + Math.random() * 900000);
    
    const inputName = document.getElementById('pay-name').value;
    document.getElementById('receipt-delivery-name').innerText = inputName || 'Customer';
    document.getElementById('receipt-bank-target').innerText = 'Bank ' + selectedBankName;

    const tbody = document.getElementById('receipt-table-body');
    tbody.innerHTML = '';
    
    let totalCartPrice = 0;
    cart.forEach(item => {
        totalCartPrice += item.price;
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td><strong>${item.brand}</strong> ${item.name}<br><small style="color:#777;">Varian: ${item.variant}</small></td>
            <td>${formatRupiah(item.price)}</td>
            <td>1</td>
        `;
        tbody.appendChild(tr);
    });

    const shippingCharges = 50000;
    const grandTotal = totalCartPrice + shippingCharges;

    document.getElementById('receipt-subtotal').innerText = formatRupiah(totalCartPrice);
    document.getElementById('receipt-grandtotal').innerText = formatRupiah(grandTotal);

    // Reset keranjang setelah dibayar sukses
    cart = [];

    navigateTo('receipt');
}

// Eksekusi ketika dokumen web selesai dimuat
window.onload = () => {
    renderShopProducts();
};