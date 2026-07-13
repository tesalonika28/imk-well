
// DATA PRODUK
const products = [
    {
        id:1,
        nama:"BNB Perfect Lip Tint",
        harga:79000,
        gambar:"images/bnb1.png",
        kategori:"makeup"
    },
    {
        id:2,
        nama:"Wardah Colorfit",
        harga:62500,
        gambar:"images/wardah1.png",
        kategori:"makeup"
    },
    {
        id:3,
        nama:"Scarlett Brightly Serum",
        harga:85000,
        gambar:"images/scarlett1.png",
        kategori:"skincare"
    }
];


// CART
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// TAMPILKAN PRODUK


function tampilkanProduk(data){

    const container = document.getElementById("product-list");

    if(!container) return;

    container.innerHTML="";

    data.forEach(item=>{

        container.innerHTML +=`

        <div class="card">

            <img src="${item.gambar}">

            <h3>${item.nama}</h3>

            <h2>Rp ${item.harga.toLocaleString()}</h2>

            <button onclick="tambahCart(${item.id})">
            Add Cart
            </button>

        </div>

        `;

    });

}


// SEARCH
function cariProduk(){

    const input=document.getElementById("search");

    if(!input) return;

    input.addEventListener("keyup",()=>{

        const keyword=input.value.toLowerCase();

        const hasil=products.filter(item=>

            item.nama.toLowerCase().includes(keyword)

        );

        tampilkanProduk(hasil);

    });

}


// FILTER
function filterProduk(kategori){

    const hasil=products.filter(item=>item.kategori===kategori);

    tampilkanProduk(hasil);

}

// ADD CART
function tambahCart(id){

    const produk=products.find(item=>item.id===id);

    const cek=cart.find(item=>item.id===id);

    if(cek){

        cek.qty++;

    }else{

        cart.push({
            ...produk,
            qty:1
        });

    }

    localStorage.setItem("cart",JSON.stringify(cart));

    alert("Produk berhasil ditambahkan!");

}


// TAMPILKAN CART
function tampilCart(){

    const list=document.getElementById("cart-list");

    const total=document.getElementById("total");

    if(!list) return;

    list.innerHTML="";

    let subtotal=0;

    cart.forEach(item=>{

        subtotal+=item.harga*item.qty;

        list.innerHTML+=`

        <div class="cart-item">

            <img src="${item.gambar}" width="80">

            <div>

                <h3>${item.nama}</h3>

                <p>Qty : ${item.qty}</p>

            </div>

            <h4>Rp ${(item.harga*item.qty).toLocaleString()}</h4>

            <button onclick="hapusCart(${item.id})">
            Hapus
            </button>

        </div>

        `;

    });

    if(total){

        total.innerHTML="Rp "+subtotal.toLocaleString();

    }

}

// HAPUS CART
function hapusCart(id){

    cart=cart.filter(item=>item.id!==id);

    localStorage.setItem("cart",JSON.stringify(cart));

    location.reload();

}

// CHECKOUT
function checkout(){

    window.location.href="payment.html";

}

// PAYMENT
function bayar(){

    localStorage.setItem("status","Lunas");

    window.location.href="receipt.html";

}

// RECEIPT
function tampilReceipt(){

    const receipt=document.getElementById("receipt");

    if(!receipt) return;

    let total=0;

    cart.forEach(item=>{

        total+=item.harga*item.qty;

    });

    receipt.innerHTML=`

    <h2>Pembayaran Berhasil</h2>

    <p>Total : Rp ${total.toLocaleString()}</p>

    <p>Tanggal : ${new Date().toLocaleDateString()}</p>

    `;

}


// AUTO RUN
window.onload=()=>{

    tampilkanProduk(products);

    cariProduk();

    tampilCart();

    tampilReceipt();

}