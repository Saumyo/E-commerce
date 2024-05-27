let carts = document.querySelectorAll('.add-cart');
let products = [
    {
        name: "Wireless Headphone's For PC",
        tag: "wireless Headphone's For PC",
        price: 35,
        inCart: 0

    },
    {
        name: "HP i5 6th Genration Touch laptop",
        tag: "hp i5 6th Genration Touch laptop",
        price: 1000.55,
        inCart: 0

    },
    {
        name: "Apply 7 Smart Watch",
        tag: "apply 7 Smart Watch",
        price: 50.55,
        inCart: 0,

    },
    {
        name: "Redmi HeandFree For Android",
        tag: "redmi HeandFree For Android",
        price: 5,
        inCart: 0,

    },
    {
        name: "Web Camera For PC",
        tag: "web Camera For PC",
        price: 45,
        inCart: 0,

    },
    {
        name: "Wireless Mouse For PC",
        tag: "Wireless Mouse For Pc",
        price: 15,
        inCart: 0,

    },
    {
        name: "Web Camera For PC",
        tag: "web Camera For PC",
        price: 45,
        inCart: 0,

    },
    {
        name: "Wireless Mouse For PC",
        tag: "Wireless Mouse For Pc",
        price: 15,
        inCart: 0,

    },
    {
        name: "Touch HP Laptop",
        tag: "touch HP Laptop",
        price: 1000,
        inCart: 0,

    },
    {
        name: "HeadPhone's For PC",
        tag: "headPhone's For PC",
        price: 125,
        inCart: 0,

    },
    {
        name: "DSLR Camera",
        tag: "DSLR camera",
        price: 500,
        inCart: 0,

    }
]

for (let i = 0; i < carts.length; i++) {
    carts[i].addEventListener('click', () => {
        cartNumbers(products[i]);
        totalCost(products[i])
    })

}
function onLoadCartNumbers() {
    let productNumbers = localStorage.getItem('cartNumbers');
    if (productNumbers) {
        document.querySelector('.cart span').textContent = productNumbers;
    }
}

function cartNumbers(products) {
    let productNumbers = localStorage.getItem('cartNumbers');
    productNumbers = parseInt(productNumbers);
    if (productNumbers) {
        localStorage.setItem('cartNumbers', productNumbers + 1);
        document.querySelector('.cart span').textContent = productNumbers + 1;
    } else {
        localStorage.setItem('cartNumbers', 1);
        document.querySelector('.cart span').textContent = 1;
    }

    setItems(products);
}
function setItems(products) {
    let cartItems = localStorage.getItem('productInCart');
    cartItems = JSON.parse(cartItems);

    if (cartItems != null) {
        if (cartItems[products.tag] == undefined) {
            cartItems = {
                ...cartItems,
                [products.tag]: products
            }
        }
        cartItems[products.tag].inCart += 1;
    } else {
        products.inCart = 1;

        cartItems = {
            [products.tag]: products
        }

    }
    localStorage.setItem("productsInCart", JSON.stringify(cartItems));
}

function totalCost(products) {
    //console.log("the product price is", products.price);

    let cartCost = localStorage.getItem('totalCost');

    if (cartCost != null) {
        cartCost = parseInt(cartCost);
        localStorage.setItem("totalCost", cartCost +
        products.price);
    } else {
        localStorage.setItem("totalCost", products.price);
    }

}

function displayCart() {
    let cartItems = localStorage.getItem("productsInCart");
    cartItems = JSON.parse(cartItems);
    let productContainer = document.querySelector
        (".products");
    let cartCost = localStorage.getItem('totalCost');
    console.log(cartItems);
    if (cartItems && productContainer) {
        productContainer.innerHTML = '';
        Object.values(cartItems).map(item => {
            productContainer.innerHTML += `
            <div class="product">
                <ion-icon name="close-circle"></ion-icon>
                <img src="./image/${item.tag}.jpg">
                <span>${item.name}</span>
            </div>
            <div class="price">$${item.price},00</div>
            <div class="quantity">
                <ion-icon class="decrease" name="caret-back-circle"></ion-icon>
                <span>${item.inCart}</span>
                <ion-icon name="caret-forward-circle"></ion-icon>
            </div>
            <div class="total">
                   ${item.inCart * item.price},00
            </div>
            `;
        });
        productContainer.innerHTML += `
           <div class= "basketTotalContainer">
                <h4 class="basketTotalTitle">
                    Basket Total
                </h4>
                </h4 class="basketTotal">
                    $${cartCost},00
                <h4>
            </div>
            `;
    }
}


onLoadCartNumbers();
displayCart();