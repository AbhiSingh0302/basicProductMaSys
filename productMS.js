let checkOut = document.querySelector('.check-out');
checkOut.style.visibility = 'hidden';

let purchase = document.querySelector('.purchase');
purchase.style.visibility = 'hidden';

let cartItems = [];
function addItem(product, price, status=0) {
    let item = {
        Product: product,
        Price: price,
        Status: status,
        count: 0
    }
    cartItems.push(item);
    cart(item);
}

let insideCart = document.querySelector('.inside-cart');

let button = document.querySelectorAll('.btn');
button.forEach((a, b) => {
    button[b].addEventListener('click', addToCart)
});

function addToCart() {
    let classP = this.id;
    let product = document.getElementsByClassName(classP+' item');
    product = product[0].innerHTML;
    let price = document.getElementsByClassName(classP+' price');
    price = price[0].innerHTML;
    let status = classP; 
    addItem(product,price,status); 
    this.disabled = true; 
}

function cart(item){
    let i=1;
    let sum = 0;
    let liItem = document.createElement('li');
    let liPrice = document.createElement('li');
    let liCount = document.createElement('li');
    let inBtn = document.createElement('button');
    let deBtn = document.createElement('button');

    liItem.innerHTML = `Item is ${item.Product}`;
    liItem.className = item.Status;

    liPrice.innerHTML = `Price is &#8377 ${item.Price}`;
    liPrice.className = item.Status;

    liCount.className = item.Status;
    liCount.innerHTML = `Amount: ${i}`;

    inBtn.innerHTML = 'Add';
    inBtn.className = item.Status;

    deBtn.innerHTML = 'Remove';
    deBtn.className = item.Status;

    insideCart.append(liItem,liPrice,liCount,inBtn,deBtn);

    inBtn.addEventListener('click', function(){
        i = i+1;
        liCount.innerHTML = `Amount: ${i}`;
    })

    deBtn.addEventListener('click', function(){
        i = i-1;
        liCount.innerHTML = `Amount: ${i}`;
        if(i<1){
            let allLi = document.querySelectorAll('li.'+item.Status);
            let allBtn = document.querySelectorAll('button.'+item.Status);
            for(let j=0; j<allLi.length; j++){
                allLi[j].remove();
                if(j<allBtn.length){
                    allBtn[j].remove();
                }
            }
            let disabledButton = document.querySelector('#'+item.Status);
            disabledButton.disabled = false; 
        }
    })

    checkOut.style.visibility = 'visible';
    let ulCheckOut = document.querySelector('.totalSum');
    let liCheckOut = document.createElement('li');
    checkOut.addEventListener('click', function(){
        inBtn.disabled = true;
        deBtn.disabled = true;
        if(liCount.className == item.Status){
            item.count = i;
            if(Number(item.Price)*Number(item.count)>0){
            liCheckOut.innerHTML = `Your subtotal of ${item.Product} is &#8377 ${Number(item.Price)*Number(item.count)}`;
            liCheckOut.className = item.Status;
            ulCheckOut.append(liCheckOut);
            }
        }
        checkOut.disabled = true;
        purchase.style.visibility = 'visible';
    })
    purchase.addEventListener('click', function(e){
        e.stopImmediatePropagation();
        for(let key of cartItems){
            sum = sum + Number(key.Price)*Number(key.count);
        }
            alert(`The total amount is ${sum} Rs`);
    })
}