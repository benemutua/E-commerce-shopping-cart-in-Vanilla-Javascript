const products = [
    {
        name: "mango juice",
        tag: "mango juice",
        price: 230,
        incart: 0,
    },
    {
        name: "orange juice",
        tag: "orange juice",
        price: 254,
        incart: 0,
    },
    {
        name: "pineaple juice",
        tag: "pineaple juice",
        price: 345,
        incart: 0,
    },
    {
        name: "Banana juice",
        tag: "Banana juice",
        price: 177,
        incart: 0,
    },
]


let basket = document.querySelector(".my-shopping-cart")
let cart = document.querySelectorAll(".add-to-cart-btn")
for(let k=0; k < cart.length; k++){
    cart[k].addEventListener("click", function(){
        //set the local storage
        cartincrement(products[k])
        totalCost(products[k])
    })
}

//get the clicks
function cartincrement(product){
    let cartClicks = localStorage.getItem("CartItems")
    cartClicks = parseInt(cartClicks)
    if(cartClicks){
        localStorage.setItem("CartItems", cartClicks + 1)
        basket.textContent = cartClicks+1
    }
    else{
        localStorage.setItem("CartItems", 1)
        basket.textContent = 1
    }
    setItems(product)
}

function setItems(product){
let cartItems = localStorage.getItem("productsInCart")
cartItems = JSON.parse(cartItems)

if(cartItems != null){
    if(cartItems[product.tag] == undefined){
        cartItems = {
            ...cartItems,
            [product.tag]: product
        }
    }
    cartItems[product.tag].incart += 1
}else{
    product.incart = 1
    cartItems = {
        [product.tag]:product
    }
}
localStorage.setItem("productsInCart", JSON.stringify(cartItems))
}


//the total cost as item is pressed
function totalCost(product){
    let prodCost = localStorage.getItem("totalCost")
    prodCost = parseInt(prodCost)
    if(prodCost){
        localStorage.setItem("totalCost", prodCost + product.price) 
    }else{
        localStorage.setItem("totalCost",product.price)
    }
}








//function to reserve my shopping cart values
function onloadReserveCart(){
    let cartClicks = localStorage.getItem("CartItems")
    cartClicks = parseInt(cartClicks)
    if(cartClicks){
        basket.textContent = cartClicks
    }
}




//these functions execute always when the page loads
onloadReserveCart()