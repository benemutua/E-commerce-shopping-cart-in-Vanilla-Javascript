function checkoutFormData(){
    let itemsInCart = localStorage.getItem("productsInCart")
    itemsInCart = JSON.parse(itemsInCart)

    let itemcontainer = document.querySelector(".cart-main-pane")
    if(itemsInCart && itemcontainer){
        itemcontainer.innerHTML = ''
        Object.values(itemsInCart).map(item => {
            itemcontainer.innerHTML += `

        <div class="item-container">
            <div class="pname-window">${item.name}</div>
            <div class="pquantity-window centered">x${item.incart}</div>
            <div class="ptotals-window">${item.price * item.incart}</div>
        </div>            
            `
        })
    }else{
        alert("Your cart is empty")
        let form = document.querySelector(".form-submit")
        form.classList.add("hidden")
    }
}

//get the delicvery charge
function getDelivery(){
    let delivery = document.querySelector("#delivery-terms")
    let charges = document.querySelector(".delivery-charge")
    let submit = document.querySelector(".submit-btn")
    let sub = document.querySelector(".item-sub").textContent
    let netpay = document.querySelector(".net-totals")

        if(delivery.value == 'cbd'){
            submit.disabled = false
            //popu;late
            charges.textContent = 0
            netpay.textContent = (parseInt(sub) + 0)
        }
        else if(delivery.value == 'around cbd'){
            submit.disabled = false
            //populate
            charges.textContent = 200
            netpay.textContent = (parseInt(sub) + 200)
        }
        else{
            charges.textContent = "--"
            submit.disabled = true
        }
}

//the subtotals
function getSubtotals(){
    let subtotals = localStorage.getItem("totalCost")
    subtotals = parseInt(subtotals)
    let sub = document.querySelector(".item-sub")
    sub.textContent = subtotals
}

function clearCartData(){
    localStorage.clear()
}

//runnig functions
checkoutFormData()
getSubtotals()