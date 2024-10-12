let book_menu = [
    { image: 'book-1.jpg', title: 'One Nation', price: 10, author: 'Ben Carson'},
    { image: 'book-2.jpg', title: 'Gifted Hands', price: 12, author: 'Ben Carson'},
    { image: 'book-3.jpg', title: 'Half of a Yellow Sun', price: 8, author: 'Chimamanda Adichie'},
    { image: 'book-4.jpg', title: 'Made in Asian America', price: 2, author: 'Erika Lee'},
    { image: 'book-5.jpg', title: 'Candle in the Darkness', price: 5, author: 'lauren'},
    { image: 'book-6.jpg', title: 'Unbroken', price: 10, author: 'laura HillenBrand'},
    { image: 'book-7.jpg', title: 'AMerican Gods', price: 10, author: 'Neil Gaiman'},
    { image: 'book-8.jpg', title: 'One Nation', price: 10, author: 'Ben Carson'},
];

let searchInput = document.getElementById('enter-book-name'); 

let localCart = localStorage.getItem('mycart');
// let cart = !localCart ? [] : JSON.parse(localCart);


// cartNumber();

function loadbook() {
    let bookItems = '';
    book_menu.forEach((m, index) => {
        bookItems += `<div id="menu-item" class="col-12 col-md-3">
            <img src="/img/${m.image}" alt="" height="300px">
            <h3>${m.title}</h3>
            <p>$${m.price}</p>
            <p>${m.author}</p>
            <a href="#display-cart"><button class="add-btn" onclick= "addToCart(${index})">Add to Cart</button></a>
        </div>`
    });
    document.getElementById('menu-section').innerHTML = bookItems;
}

function searchbook() {
    let searchInput = document.getElementById('enter-book-name');
    let book = searchInput.value.trim()
    if(book == '') {
        alert('kindly search for your preferred book(s)')
    }else{
        displayBook(book);
    }
}


function displayBook(book) {
    let menulist = book_menu.find((x) => x.title == book)
    if(menulist) {
        let bookitem = `<div id="menu-item" class="col-12 col-md-4">
            <img src="/img/${menulist.image}" alt="" height="300px">
            <h3>${menulist.title}</h3>
            <p>$${menulist.price}</p>
            <p>${menulist.author}</p>
            <button class="add-btn" onclick="">Add to Cart</button>
        </div>`
        document.getElementById('menu-section').innerHTML = bookitem
        searchInput.value = ''
    }else{
        alert(`${book} is currently not available in library`)
        searchInput.value = ''
    }
    
}
let cart = [];
function addToCart(menuIndex) {
    let menuItem = book_menu[menuIndex];
    let cartSearch = cart.find((cartItem) => cartItem.title == menuItem.title);
    if (!cartSearch) {
        document.getElementById('cart-bg').innerHTML = ''
        let quantity = 1 
        cart.push({
            title: menuItem.title,
            price: menuItem.price,
            quantity: 1,
            total: menuItem.price
        });
        updateLocalstorage ()
        alert(`${menuItem.title} added to cart`);
        document.getElementById('display-cart').innerHTML +=`<div id="display-cart" class="col-6 d-lg-block mt-4" style="margin-left: 1px;">        
            <div class="row rounded-2" style="border: 1px dashed; margin-left: 5px; padding: 10px 5px;">
                <div class="col-6">
                    <p style="font-weight: bold;">Pack 1</p>
                </div>
                <div class="col-6 text-end">
                    <i onclick="removeFood()"class="bi bi-trash" style="color: red;"></i>
                </div>
                <div class="col-6">
                    Name: ${menuItem.title}
                    <p>Price: ${menuItem.price}</p>
                    <p>Quantity: ${quantity}</p>
                    <p>Total: ${menuItem.price}</p>
                </div>
                <div class="col-6 text-end">
                    <button class="rounded-pill border-0 px-2"> - 1 + </button>
                </div>
                <div class="col-12 text-center">
                    <a href="payment.html" style="color: white;">
                        <button class="rounded-pill border-0 px-2 w-100" style="background-color: #02C27F;">Place Order</button>
                    </a>
                </div>
            </div>
            <div id="display-total"></div>
        </div>`
        cartNumber();
        sumCartTotal()
    } else {
        cartSearch.quantity += 1;
        cartSearch.price = menuItem.price;
        cartSearch.total = cartSearch.quantity * menuItem.price;
        alert('your cart has been updated')
        let ordered_book = ""
        ordered_book +=`<div id="display-cart" class="col-6 d-lg-block mt-4" style="margin-left: 1px;">
            <div class="row rounded-2" style="border: 1px dashed; margin-left: 5px; padding: 10px 5px;">
                <div class="col-6">
                    <p style="font-weight: bold;">Your Book</p>
                </div>
                <div class="col-6 text-end">
                    <i onclick="removeFood()"class="bi bi-trash" style="color: red;"></i>
                </div>
                <div class="col-6">
                    Dish: ${menuItem.title}
                    <p> Price: ${menuItem.price}</p>
                    <p>Quantity: ${cartSearch.quantity}</p>
                    <p>Total: ${cartSearch.total}</p>
                </div>
                <div class="col-6 text-end">
                    <button class="rounded-pill border-0 px-2"> - 1 + </button>
                </div>
                <div class="col-12 text-center">
                    <a href="payment.html" style="color: white;">
                        <button class="rounded-pill border-0 px-2 w-100" style="background-color: #02C27F;">Place Order</button>
                    </a>
                </div>
            </div>
            <div id="display-total"></div>
        </div>`
        document.getElementById('display-cart').innerHTML = ordered_book
        updateLocalstorage();
        sumCartTotal();
        let localCart = localStorage.getItem('mycart');
        let cart = !localCart ? [] : JSON.parse(localCart);
    }
    
}

function cartNumber() {
    document.getElementById('count').innerHTML = cart.length;
}

function updateLocalstorage () {
    localStorage.setItem('mycart', JSON.stringify(cart));
}



function removeFood(name) {
    let item = cart[name]
    let index = cart.find(cartitem => cartitem.name == item.name);
    if(index) {
        let notification = confirm('are you sure you would like to remove this item?')
        if(notification == true) {
            cart.splice(index)
        }
    }
}

function sumCartTotal() {
    let totalCost = 0;
    cart.forEach(cartItem => {
        totalCost += cartItem.total
    });
    document.getElementById('display-total').innerHTML = `<p style="font-size: 30px;"> Your Total Bill is: $${totalCost}</p>`;
}

function listCartItems() {
    let cartLi = '';
    if (cart.length == 0) {
        cartLi = `<li class="text-center" style="font-size: 80px;" id="cart-bg">your cart appears here!</li>`;
        sumCartTotal()
    } else {
        cart.forEach((cartItem, index) => {
            cartLi += `
            <div id="menu-item" class="col-12">
            <h3>Item: ${cartItem.title}</h3>
            <p>Price: $${cartItem.price}</p>
            <p>Qty: ${cartItem.quantity}</p>
            <p>Total: $${cartItem.total}</p>
            <a href="payment.html" style="color: white;">
                <button class="rounded-pill border-0 px-2 w-100" style="background-color: #02C27F;">Place Order</button>
            </a>
            <div class="col-6 text-end">
                <i onclick="removeFood(${index})"class="bi bi-trash" style="color: white;"></i>
            </div>
        </div>`
        });
        sumCartTotal()
    }

    document.getElementById('display-cart').innerHTML = cartLi;
}

listCartItems()
sumCartTotal()

