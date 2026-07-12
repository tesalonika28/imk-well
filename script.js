// Data Dummy Produk Berdasarkan Gambar Figma (bnb, g2g, wardah, dll)
const products = [
    { id: 1, name: "Peach Makes Perfect Lip Tint", brand: "Barenbliss", price: 69000, category: "makeup", img: "https://placehold.co/200x200/fff0f3/a8435d?text=Lip+Tint" },
    { id: 2, name: "Pomegranate Moisture Brightening Moisturizer", brand: "Glad2Glow", price: 49000, category: "skincare", img: "https://placehold.co/200x200/fff0f3/a8435d?text=Moisturizer" },
    { id: 3, name: "Milk Amino Acid Gentle Cleanser", brand: "Glad2Glow", price: 35000, category: "skincare", img: "https://placehold.co/200x200/fff0f3/a8435d?text=Cleanser" },
    { id: 4, name: "Brightly Ever After Serum", brand: "Scarlett", price: 75000, category: "skincare", img: "https://placehold.co/200x200/fff0f3/a8435d?text=Serum" },
    { id: 5, name: "Colorfit Velvet Matte Lip Mousse", brand: "Wardah", price: 73000, category: "makeup", img: "https://placehold.co/200x200/fff0f3/a8435d?text=Lip+Mousse" },
    { id: 6, name: "UV Shield Essential Sunscreen SPF 30", brand: "Wardah", price: 35000, category: "skincare", img: "https://placehold.co/200x200/fff0f3/a8435d?text=Sunscreen" }
];

let cart = [];
let selectedProduct = null;

// Render Produk ke Grid
function renderProducts(filter = 'all') {
    const grid = document.getElementById('product-list');
    grid.innerHTML = '';

    const filtered = filter === 'all' ? products : products.filter(p => p.category === filter);

    filtered.forEach(product => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.onclick = () => openModal(product);
        card.innerHTML = `
            <img src="${product.img}" alt="${product.name}">
            <h4>${product.name}</h4>
            <p class="price">Rp ${product.price.toLocaleString('id-ID')}</p>
        `;
        grid.appendChild(card);
    });
}

// Filter Kategori Sidebar
function filterCategory(cat) {
    renderProducts(cat);
    const lis = document.querySelectorAll('.sidebar ul li');
    lis.forEach(li => li.classList.remove('active'));
    event.target.classList.add('active');
}

// Modal View Detail
function openModal(product) {
    selectedProduct = product;
    document.getElementById('modal-product-img').src = product.img;
    document.getElementById('modal-product-name').innerText = product.name;
    document.getElementById('modal-product-brand').innerText = product.brand;
    document.getElementById('modal-product-price').innerText = `Rp ${product.price.toLocaleString('id-ID')}`;
    
    document.getElementById('product-modal').style.display = 'flex';

    // Assign dynamic action to modal button
    document.getElementById('add-to-cart-btn').onclick = () => {
        addToCart(product);
        closeModal();
    };
}

function closeModal() {
    document.getElementById('product-modal').style.display = 'none';
}

// Sistem Keranjang (Cart)
function toggleCart() {
    const sidebar = document.getElementById('cart-sidebar');
    sidebar.classList.toggle('open');
}

function addToCart(product) {
    const existing = cart.find(item => item.id === product.id);
    if (existing) {
        existing.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    updateCartUI();
}

function updateCartUI() {
    // Hitung total items
    const count = cart.reduce((acc, item) => acc + item.quantity, 0);
    document.getElementById('cart-count').innerText = count;

    // Render list items di dalam sidebar
    const container = document.getElementById('cart-items-container');
    container.innerHTML = '';

    let totalHarga = 0;

    cart.forEach(item => {
        totalHarga += item.price * item.quantity;
        const itemEl = document.createElement('div');
        itemEl.className = 'cart-item';
        itemEl.innerHTML = `
            <img src="${item.img}">
            <div>
                <h4>${item.name}</h4>
                <p>Rp ${item.price.toLocaleString('id-ID')} x ${item.quantity}</p>
            </div>
        `;
        container.appendChild(itemEl);
    });

    document.getElementById('cart-total-price').innerText = `Rp ${totalHarga.toLocaleString('id-ID')}`;
}

function processCheckout() {
    if(cart.length === 0) {
        alert("Keranjang masih kosong!");
        return;
    }
    alert("Menuju ke halaman Pembayaran (Simulasi)... Pesanan Anda berhasil dibuat!");
    cart = [];
    updateCartUI();
    toggleCart();
}

// Jalankan saat pertama kali dibuka
window.onload = () => {
    renderProducts('all');
};