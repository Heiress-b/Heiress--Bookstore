let book_menu = [
    { image: 'book-1.jpg', title: 'One Nation', price: 10, author: 'Ben Carson', availability: true, lease_price: '6'},
    { image: 'book-2.jpg', title: 'Gifted Hands', price: 12, author: 'Ben Carson', availability: true, lease_price: '8'},
    { image: 'book-3.jpg', title: 'Half of a Yellow Sun', price: 8, author: 'Chimamanda Adichie', availability: false, lease_price: '5'},
    { image: 'book-4.jpg', title: 'Made in Asian America', price: 12, author: 'Erika Lee', availability: true, lease_price: '8'},
    { image: 'book-5.jpg', title: 'Candle in the Darkness', price: 5, author: 'lauren', availability: true, lease_price: '2'},
    { image: 'book-6.jpg', title: 'Unbroken', price: 10, author: 'laura HillenBrand', availability: false, lease_price: '6'},
    { image: 'book-7.jpg', title: 'AMerican Gods', price: 10, author: 'Neil Gaiman', availability: true, lease_price: '6'},
    { image: 'book-8.jpg', title: 'One Nation', price: 10, author: 'Ben Carson', availability: false, lease_price: '6'},
];

let searchInput = document.getElementById('enter-book-name'); 

function loadbook() {
    let bookItems = '';
    book_menu.forEach((m, index) => {
        bookItems += `<div id="menu-item" class="col-12 col-md-3">
            <img src="/img/${m.image}" alt="" height="300px">
            <h3>${m.title}</h3>
            <p>$${m.price}</p>
            <p>${m.author}</p>
            <div class="justify-content-between">
                <a href="#display-cart"><button class="add-btn" onclick= "addToCart(${index})">Add to Cart</button></a>
                <a href="#display-cart"><button class="add-btn" onclick= "borrowBook('0')">Borrow Book</button></a>
            </div>
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
            <button class="add-btn" onclick="addToCart(1)">Add to Cart</button>
        </div>`
        document.getElementById('menu-section').innerHTML = bookitem
        searchInput.value = ''
    }else{
        alert(`${book} is currently not available in library`)
        searchInput.value = ''
    }
    
}
cart = [];
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
        document.getElementById('display-cart').innerHTML +=`<div id="display-cart" class="col-12 col-lg-6 d-lg-block mt-4" style="margin-left: 1px;">        
            <div class="row rounded-2" style="border: 1px dashed; margin-left: 5px; padding: 10px 5px;">
                <div class="col-6">
                    <p style="font-weight: bold;">Pack 1</p>
                </div>
                <div class="col-6 text-end">
                    <i onclick="removeBook('0')"class="bi bi-trash" style="color: red;"></i>
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
        ordered_book +=`<div id="display-cart" class="col-12 col-lg-6 d-lg-block mt-4" style="margin-left: 1px;">
            <div class="row rounded-2" style="border: 1px dashed; margin-left: 5px; padding: 10px 5px;">
                <div class="col-6">
                    <p style="font-weight: bold;">Your Book</p>
                </div>
                <div class="col-6 text-end">
                    <i onclick="removeBook('0')"class="bi bi-trash" style="color: red;"></i>
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

function removeBook(name) {
    let item = cart[name]
    let index = cart.find(cartitem => cartitem.name == item.name);
    if(index) {
        let notification = confirm('are you sure you would like to remove this item?')
        if(notification == true) {
            cart.splice(index)
            alert('your order has been removed')
        }
        document.getElementById('display-cart').innerHTML = ''
        updateLocalstorage()
    }
}

function sumCartTotal() {
    let totalCost = 0;
    cart.forEach(cartItem => {
        totalCost += cartItem.total
    });
    document.getElementById('display-total').innerHTML = `<p style="font-size: 30px;"> Your Total Bill is: $${totalCost}</p>`;
}

function sumLeaseCartTotal() {
    let leasetotalCost = 0;
    lease_cart.forEach(cartItem => {
        totalCost += cartItem.total
    });
    document.getElementById('display-lease-total').innerHTML = `<p style="font-size: 30px;"> Your Total Bill is: $${leasetotalCost}</p>`;
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


// function addBook(title) {
//     let newBook = {
//         title,
//         author,
//         Availability: true
//     }
//     Book_Info.push(newBook)
//     return Book_Info;
// }
// let title = 'Beyound Intelligence'
// let author = 'Uwazie Success Chinwekele'
// let newly_added = addBook(title,author)
// alert('successfully added')

let lease_cart = [];
function borrowBook(mytitle){
    let book_genre = mytitle
    let list = book_menu[mytitle];
    let display = book_menu.find((x) => x.title == book_genre);
   if(!display){
        let notification = confirm(`Hello, Are you sure you would love to borrow this book with charges included?`)
        if(notification == true) {
            let quantity = 1
            document.getElementById('display-cart').innerHTML +=`<div id="display-cart" class="col-12 col-lg-6 d-lg-block mt-4" style="margin-left: 1px;">        
            <div class="row rounded-2" style="border: 1px dashed; margin-left: 5px; padding: 10px 5px;">
                <div class="col-6">
                    <p style="font-weight: bold;">Preview your Order(s)</p>
                </div>
                <div class="col-6 text-end">
                    <i onclick="removeBook('0')"class="bi bi-trash" style="color: red;"></i>
                </div>
                <div class="col-6">
                    Name: ${list.title}
                    <p>Price: ${list.lease_price}</p>
                    <p>Quantity: ${quantity}</p>
                    <p>Total: ${list.lease_price}</p>
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
            <div id="display-lease-total"></div>
        </div>`
        cartNumber();
        sumLeaseCartTotal()
        }
    }else{
        alert(`hello, ${list.title} is currently not available, kindly check another book`)
    }
    
}

// Display available books:
// Create a function listAvailableBooks that lists all books that are available to borrow (i.e., isAvailable: true).
// --------------------------------------

function listAvailableBooks(book){
    let available_items = book_menu[book];
    let available_books = book_menu.filter(book => book.availability == true)
    if(available_books) {
        let book_choice = `<div id="menu-item" class="col-12 col-md-4">
            <img src="/img/${available_items.image}" alt="" height="300px">
            <h3>${available_items.title}</h3>
            <p>$${available_items.price}</p>
            <p>${available_items.author}</p>
            <button class="add-btn" onclick="">Add to Cart</button>
        </div>`
        document.getElementById('menu-section').innerHTML = book_choice
    }
}



listCartItems()
sumCartTotal()

