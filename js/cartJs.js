
function displayCartData(){
    let itemsInCart = localStorage.getItem("productsInCart")
    itemsInCart = JSON.parse(itemsInCart)
    let theCost = localStorage.getItem("totalCost")
    //console.log(itemsInCart)

    let costArea = document.getElementById("costArea")
    let itemcontainer = document.querySelector(".main-basket")
    if(itemsInCart && itemcontainer){
        itemcontainer.innerHTML = ''
        Object.values(itemsInCart).map(item => {
            itemcontainer.innerHTML += `

        <div class="cart-items-pane">
            <div class="category">${item.name}</div>
            <div class="category centered">
            <span class="deductCart">-</span>
           <span class="value-class"> ${item.incart} </span>
            <span class="addCart">+</span>
            </div>
            <div class="category subtotals-class">${item.price * item.incart}</div>
        </div>            
            `
            costArea.textContent = "Expected Pay: "+theCost


            
        })
    }else{//if no items in cart
        let actionContainer = document.querySelector(".parent-other-stuffs")
        actionContainer.classList.add("hidden")

        itemcontainer.innerHTML=`
        <div class="empty-cart">
        <h3>Oops, Nothing here..</h3>
        <a href="index.html">Go shopping</a>
        </div>
        `
    }
}


function clearCart(){
    localStorage.clear()
    costArea.textContent=""
    let itemcontainer = document.querySelector(".main-basket")
    let buttonsEnclose= document.querySelector(".parent-other-stuffs")
    let shopCart = document.querySelector(".my-shopping-cart")
    itemcontainer.innerHTML = `
    <div class="empty-cart">
    <p>Cart has been cleared!</p>
    </div>
    `
  
    buttonsEnclose.classList.add("hidden")
    shopCart.textContent = 0
}



//deduct the item incart and all corresponding details by clicking the "-" button
function deductValueFromCart(){
    let deduct = document.querySelectorAll(".deductCart")
    let btnValue = document.querySelectorAll(".value-class")
    let subtotals = document.querySelectorAll(".subtotals-class")

        for(let k=0; k < deduct.length; k++){
            deduct[k].addEventListener("click", function(){
                let content = parseInt(btnValue[k].textContent)
                if(content == 1){
                    deduct[k].classList.add("hidden")
                }
                else{
                    btnValue[k].textContent -= 1 //reduce value by 1
                    //then reduce the cart numbers on localstorage
                    let cartItems = localStorage.getItem("productsInCart")
                    cartItems = JSON.parse(cartItems)
                    
                    let selectedItem = Object.values(cartItems)[k]
                    //now set the value of cart
                    selectedItem.incart -= 1

                    //update the new data
                    localStorage.setItem("productsInCart", JSON.stringify(cartItems))
                    //then reduce the cart nos on the shopping cart
                    reduceCartNos()
                    //and also reduce the cart incerement counter
                    reduceCartIncrement()
                     //get the price of that item
                     let selectedItemPrice = selectedItem.price
                     let totals = localStorage.getItem("totalCost")
                     totals = parseInt(totals)

                    //update the selected item subtotals
                    let selectedSubTotal = subtotals[k].textContent
                    selectedSubTotal = parseInt(selectedSubTotal)                    
                    subtotals[k].textContent = selectedSubTotal - selectedItemPrice
                     //then update the totals to reduced value
                     localStorage.setItem("totalCost", totals - selectedItemPrice)
                     updateexpectedPay()
                }
            })
        }
}

function reduceCartNos(){
    let cartNos = document.querySelector(".my-shopping-cart")
    let thenos = parseInt(cartNos.textContent)
    cartNos.textContent = thenos-=1
}

function reduceCartIncrement(){
    let cartValue = localStorage.getItem("CartItems") //the increment values
    cartValue = parseInt(cartValue)//convert to integer for maths functions
    localStorage.setItem("CartItems", cartValue -= 1)
}

//ADD the item incart and all corresponding details by clicking the "+" button
function addValueToCart(){
    let deduct = document.querySelectorAll(".deductCart")
    let add = document.querySelectorAll(".addCart")
    let btnValue = document.querySelectorAll(".value-class")
    let subtotals = document.querySelectorAll(".subtotals-class")
        for(let i=0; i < add.length; i++){
            add[i].addEventListener("click", function(){
                let content = parseInt(btnValue[i].textContent)
               
                deduct[i].classList.remove("hidden")
                btnValue[i].textContent = content + 1 //add value by 1
                    //then add the cart numbers on localstorage
                    let cartItems = localStorage.getItem("productsInCart")
                    cartItems = JSON.parse(cartItems)                    
                    let selectedItem = Object.values(cartItems)[i]
                    //now set the value of cart
                    selectedItem.incart += 1
                    //update the new data
                    localStorage.setItem("productsInCart", JSON.stringify(cartItems))
                    //then add the cart nos on the shopping cart
                    addCartNos()
                    //and also add the cart incerement counter
                    addCartIncrement()
                     //get the price of that item
                     let selectedItemPrice = selectedItem.price
                     let totals = localStorage.getItem("totalCost")
                     totals = parseInt(totals)
                     //update the selected item subtotals
                    let selectedSubTotal = subtotals[i].textContent
                    selectedSubTotal = parseInt(selectedSubTotal)                    
                    subtotals[i].textContent = selectedSubTotal + selectedItemPrice

                     //then update the totals to added value
                     localStorage.setItem("totalCost", totals + selectedItemPrice)
                     updateexpectedPay() 
            })
        }
}

function addCartNos(){
    let cartNos = document.querySelector(".my-shopping-cart")
    let thenos = parseInt(cartNos.textContent)
    cartNos.textContent = thenos += 1
}
function addCartIncrement(){
    let cartValue = localStorage.getItem("CartItems") //the increment values
    cartValue = parseInt(cartValue)//convert to integer for maths functions
    localStorage.setItem("CartItems", cartValue += 1)
}

//the new expected pay
function updateexpectedPay(){
    let costArea = document.getElementById("costArea")  
    let totals = localStorage.getItem("totalCost")
    costArea.textContent = "Expected Pay: "+totals
}








//running always
displayCartData()
deductValueFromCart()
addValueToCart()