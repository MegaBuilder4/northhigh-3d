
// cart
let cartIcon = document.querySelector('#cart-icon');
let cart = document.querySelector('.cart');
let closeCart = document.querySelector('#close-cart');
// Open Close Cart
cartIcon.onclick = () =>{
    cart.classList.add('active');
};

closeCart.onclick = () =>{
    cart.classList.remove('active');
};


// Cart Working JS
if (document.readyState == 'loading'){
    document.addEventListener('DOMContentLoaded', ready);
} else {
    ready();
}


// Making Function
function ready(){
    // Remove items from Cart
    var removeCartButtons = document.getElementsByClassName('cart-remove');
    console.log(removeCartButtons);
    for (var i = 0; i < removeCartButtons.length; i++){
        var button = removeCartButtons[i];
        button.addEventListener('click', removeCartItem);
    }

    var quantityInputs = document.getElementsByClassName('cart-quantity');
    for (var i = 0; i < quantityInputs.length; i++){
        var input = quantityInputs[i];
        input.addEventListener("change", quantityChanged);
    }
    // Add To Cart
    var addCart = document.getElementsByClassName('add-cart');
    for (var i = 0; i < addCart.length; i++){
        var button = addCart[i];
        button.addEventListener('click', addCartClicked);

    }
    loadCartItems();
    document.getElementsByClassName('btn-buy')[0].addEventListener('click', buyButtonClicked);
}
function buyButtonClicked(){
    var cartContent = document.getElementsByClassName('cart-content')[0];
    //while (cartContent.hasChildNodes()) {
    //    cartContent.removeChild(cartContent.firstChild);  //remove item from cart
    //}
    updatetotal();
    saveCartItems();
    updateCartIcon()
}



function removeCartItem(event){
    var buttonClicked = event.target;
    buttonClicked.parentElement.remove();
    updatetotal();
    saveCartItems();
    updateCartIcon()
}

// Quantity Changes

function quantityChanged(event){
    var input = event.target
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1;
    }
    updatetotal();
    saveCartItems();
    updateCartIcon()
}
// Add to Cart


function addCartClicked(event){
    var button = event.target;
    var shopProducts = button.parentElement;
    var title = shopProducts.getElementsByClassName('product-title')[0].innerText;
    var price = shopProducts.getElementsByClassName('price')[0].innerText;
    var productImg = shopProducts.getElementsByClassName('product-img')[0].src;
    addProductToCart(title, price, productImg);
    updatetotal();
    saveCartItems();
    updateCartIcon()
}

function addProductToCart(title, price, productImg){
    var cartShopBox = document.createElement('div');
    cartShopBox.classList.add('cart-box');
    var cartItems = document.getElementsByClassName('cart-content')[0];
    var cartItemsNames = cartItems.getElementsByClassName('cart-product-title');
    for (var i = 0; i < cartItemsNames.length; i++){
        if (cartItemsNames[i].innerText == title) {
            alert('You have already added this item to your cart');
            return;
        }
    }
    var cartBoxContent = `
                        <img src="${productImg}" alt="" class="cart-img">
                        <div class="detail-box">
                            <div class="cart-product-title">${title}</div>
                            <div class="cart-price">${price}</div>
                            <h4>Qty: <input type="number" value="1" class="cart-quantity"></h4>
                            <div class="total2"></div>
                        </div>
                        <i class="bx bxs-trash-alt cart-remove"></i>`;
                    
    cartShopBox.innerHTML = cartBoxContent;
    cartItems.append(cartShopBox);
    cartShopBox.getElementsByClassName("cart-remove")[0].addEventListener("click", removeCartItem);
    cartShopBox.getElementsByClassName("cart-quantity")[0].addEventListener("change", quantityChanged);
    saveCartItems();
    updateCartIcon()
}



// function idk23() {
//     if (debc == 0) {
//         setInterval(addShippingToCard, 10);
//         debc = 1;
//     } else {
//         setInterval(addShippingToCard, -1);
//     }
// }




// Update Total
function updatetotal(){
    var cartContent = document.getElementsByClassName('cart-content')[0];
    var cartBoxes = cartContent.getElementsByClassName('cart-box');
    var total = 0
    for (var i = 0; i < cartBoxes.length; i++){
        var cartBox = cartBoxes[i];
        var priceElement = cartBox.getElementsByClassName('cart-price')[0];
        var quantityElement = cartBox.getElementsByClassName('cart-quantity')[0];
        var price = parseFloat(priceElement.innerText.replace('$', ""));
        var quantity = quantityElement.value;
        total= total + (price * quantity);
    }
        // If price contain some cents value

        total = Math.round(total *100) / 100;

        document.getElementsByClassName('total-price')[0].innerText = '$' + total;

        localStorage.setItem('cartTotal', total);
    
}

function saveCartItems() {
    var cartContent = document.getElementsByClassName('cart-content')[0];
    var cartBoxes = cartContent.getElementsByClassName('cart-box');
    var cartItems = [];

    for (var i=0; i< cartBoxes.length; i++) {
        cartBox = cartBoxes[i];
        var titleElement = cartBox.getElementsByClassName('cart-product-title')[0];
        var priceElement = cartBox.getElementsByClassName('cart-price')[0];
        var quantityElement = cartBox.getElementsByClassName('cart-quantity')[0];
        var productImg = cartBox.getElementsByClassName('cart-img')[0].src;

        var item =  {
            title: titleElement.innerText,
            price: priceElement.innerText,
            quantity: quantityElement.value,
            productImg: productImg,
        };
        cartItems.push(item);
    }
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
 

}

function loadCartItems() {
    var cartItems = localStorage.getItem('cartItems');
    if (cartItems) {
        cartItems = JSON.parse(cartItems);

        for (var i= 0; i < cartItems.length; i++) {
            var item = cartItems[i];
            addProductToCart(item.title, item.price, item.productImg);

            var cartBoxes = document.getElementsByClassName('cart-box');
            var cartBox = cartBoxes[cartBoxes.length - 1];
            var quantityElement = cartBox.getElementsByClassName('cart-quantity')[0];
            quantityElement.value = item.quantity;
        }
    }
    var cartTotal = localStorage.getItem('cartTotal');
    if(cartTotal) {
        document.getElementsByClassName('total-price')[0].innerText = "$" + cartTotal;
    }
    updateCartIcon();
}


function updateCartIcon() {
    var cartBoxes = document.getElementsByClassName('cart-box');
    var quantity = 0;

    for (var i=0; i < cartBoxes.length; i++) {
        var cartBox = cartBoxes[i];
        var quantityElement = cartBox.getElementsByClassName('cart-quantity')[0];
        quantity+= parseInt(quantityElement.value);
    }
    var cartIcon = document.querySelector('#cart-icon');
    cartIcon.setAttribute('data-quantity', quantity);
}










// SEARCH BAR

//fetch("https://jsonplaceholder.typicode.com/users").then(res => res.json()).then(data => {
    
//})

//const searchInput = document.querySelector('[data-search');

//let users = [];

//searchInput.addEventListener('input', (e) => {
  //  const value = e.target.value;
    //console.log(value);
//});

const search = () => {
    const searchbox = document.getElementById('search-item').value.toUpperCase();
    const storeitems = document.getElementById('shop-content');
    const product = document.querySelectorAll('.product-box');
    const pname = document.getElementsByTagName('label');
    const pages = document.querySelector('.listPage');

    for(var i=0; i < pname.length; i++){
        let match = product[i].getElementsByTagName('label')[0];

        if (searchbox == '') {
            // loadItemBar();
            location.reload();
        }

        if (searchbox != '') {
            // loadItemBar();
            pages.style.display = "none";
        }

        if(match){
            let textvalue = match.textContent || match.innerHTML

           

            if(textvalue.toUpperCase().indexOf(searchbox) > -1) {
                product[i].style.display = "block";
            }else{
                product[i].style.display = "none";
            }
        }
    }
};




//clear cart
function clearCart(){
    var cartContent = document.getElementsByClassName('cart-content')[0];
    cartContent.innerHTML = '';
    updatetotal();
    localStorage.removeItem('cartItems');
};

function sendEmail() {
    var cartContent = document.getElementsByClassName('cart-content')[0];
    var cartBoxes = cartContent.getElementsByClassName('cart-box');
    var cartItems = [];

    for (var i=0; i< cartBoxes.length; i++) {
        cartBox = cartBoxes[i];
        var titleElement = cartBox.getElementsByClassName('cart-product-title')[0];
        var priceElement = cartBox.getElementsByClassName('cart-price')[0];
        var quantityElement = cartBox.getElementsByClassName('cart-quantity')[0];
        var productImg = cartBox.getElementsByClassName('cart-img')[0].src;

        var item =  {
            title: titleElement.innerText,
            price: priceElement.innerText,
            quantity: quantityElement.value,
            productImg: productImg,
        };
        cartItems.push(item);
    }
    localStorage.setItem('cartItems', JSON.stringify(cartItems));




}

function sendPopup(){
    // var cartContent = document.getElementsByClassName('cart-content')[0];
    // var cartBoxes = cartContent.getElementsByClassName('cart-box');
    // var cartItems = [];
    var name = document.getElementById('name12').value;
    var email = document.getElementById('email').value;
    var title = document.getElementById('title12').value;
    var quantity = document.getElementById('quantity12').value;
    var date = document.getElementById('date12').value;
    var place = document.getElementById('place12').value;
    var time = document.getElementById('time12').value;
    // var titleElement = cartBox.getElementsByClassName('cart-product-title')[0];
    // var priceElement = cartBox.getElementsByClassName('cart-price')[0];
    // var quantityElement = cartBox.getElementsByClassName('cart-quantity')[0];
    // var productImg = cartBox.getElementsByClassName('cart-img')[0].src;
    // var price = parseFloat(priceElement.innerText.replace('$', ""));
    // var quantity = quantityElement.value;
    // var total = priceElement.value * quantity;
    // var total2 = Math.round(total *100) / 100;
    //var total = priceElement.value * quantityElement.value;

    var params = {
        name: name,
        email: email,
        title: title,
        quantity: quantity,
        date: date,
        time: time,
        place: place,
    };


const serviceId = 'service_tu26j2o';
const templateId = 'template_6wjwzx4';

emailjs.send(serviceId,templateId,params)
.then (
    res => {

        // titleElement.value = '';
        // priceElement.value = '';
        // quantityElement.value = '';
        // productImg.value = '';
        // document.getElementById('title').value = '';
        // document.getElementById('price').value = '';
        // document.getElementById('quantity').value = '';
        // document.getElementById('productImg').value = '';
        console.log(res);
    })
    .catch((err) => console.log(err));

}




// DROP DOWN FILTER MENU

const dropdowns = document.querySelectorAll('.dropdown');

dropdowns.forEach(dropdown => {
    const select = dropdown.querySelector('.select');
    const caret = dropdown.querySelector('.caret');
    const menu = dropdown.querySelector('.menu');
    const options = dropdown.querySelectorAll('.menu li')
    const selected = dropdown.querySelector('.selected');
    const product = document.querySelectorAll('.product-box');
    const pname = document.getElementsByTagName('h6');

    select.addEventListener('click', () => {
        select.classList.toggle('select-clicked');
        caret.classList.toggle('caret-rotate');
        menu.classList.toggle('menu-open');
    });

    options.forEach(option => {
        option.addEventListener('click', () => {
            selected.innerText = option.innerText;
            select.classList.remove('select-clicked');
            caret.classList.remove('caret-rotate');
            menu.classList.remove('menu-open');
            options.forEach(option => {
                option.classList.remove('active');
            });
            option.classList.add('active');
        });
    });

    // const searchbox = document.querySelector('.active');

    // for(var i=0; i < pname.length; i++){
    //     let match = product[i].getElementsByTagName('h6')[0];

    //     if(match){
    //         let textvalue = match.textContent || match.innerHTML

    //         if(textvalue.toUpperCase().indexOf(searchbox) > -1) {
    //             product[i].style.display = "";
    //         }else{
    //             product[i].style.display = "none";
    //         }
    //     }
    // }
});


//FILTER

filterObjects("all");

function filterObjects(c){
    var x, i;
    x = document.getElementsByClassName('product-box');
    if (c == "all") {
        c = "";
    }
    for (i = 0; i < x.length; i++) {
        x[i].style.display = 'none'
        if(x[i].className.indexOf(c) > -1) x[i].style.display = 'block'
    }
}

function addClass(element, name){
    var i, arr1, arr2;
    arr1 = element.className.split(" ");
    arr2 = name.split(" ");
    for (i = 0; i < arr2.length; i++) {
        if (arr1.indexOf(arr2[i]) == -1){
            element.className += " " + arr2[i];
        }
    }
}

function removeClass(element, name){
    var i, arr1, arr2;
    arr1 = element.className.split(" ");
    arr2 = name.split(" ");
    for (i = 0; i < arr2.length; i++){
        while (arr1.indexOf(arr2[i]) > -1){
            arr1.splice(arr1.indexOf(arr2[i]), 1);

        }
    }
    element.className = arr1.join(" ");
}

const test = () => {
    var cartContent = document.getElementsByClassName('cart-content')[0];
    var cartBoxes = cartContent.getElementsByClassName('cart-box');
    var total = 0
    for (var i = 0; i < cartBoxes.length; i++){
        var cartBox = cartBoxes[i];
        var priceElement = cartBox.getElementsByClassName('cart-price')[0];
        var quantityElement = cartBox.getElementsByClassName('cart-quantity')[0];
        var price = parseFloat(priceElement.innerText.replace('$', ""));
        var quantity = quantityElement.value;
        

        total= total + (price * quantity);
        
        
    }
        // If price contain some cents value

        total = Math.round(total*100) / 100;

        document.getElementsByClassName('total-price')[0].innerText = '$' + total;


var amount = total;


if (amount < 5.99){
    var buybtn = document.querySelector('.btn-buy');
    var text = document.querySelector('.graytext2');

    buybtn.style.display = 'none';
    text.style.display = '';

}else {
    var buybtn = document.querySelector('.btn-buy');
    var text = document.querySelector('.graytext2');

    buybtn.style.display = '';
    text.style.display = 'none';
   
   
}
}

setInterval(test, 300);



// const test2 = () => {
//     var cartBoxes = document.getElementsByClassName('cart-box');
//     var quantity = 0;


//     for (var i=0; i < cartBoxes.length; i++) {
//         var cartBox = cartBoxes[i];
//         var quantityElement = cartBox.getElementsByClassName('cart-quantity')[0];
//         quantity+= parseInt(quantityElement.value);
//     }
//     var cartIcon = document.querySelector('#cart-icon');

// if (quantity >= 10 && quantity <= 99){
//     console.log('10-99')
//     cartIcon.style.width = '50px'

// }else {
//     if (quantity >= 100){
//         console.log('100-999')
//         cartIcon.style.width = '75px'
//     }else
//     console.log('0-9')
//     cartIcon.style.width = '25px'
// }
// }

// setInterval(test2, 300);
let popup = document.getElementById('popup');
var popupBtn = document.getElementById('btn-mess');

  function openPopup() {
    popup.classList.add("open-popup");
    popupBtn.classList.add('open-btn-mess');

  }

  function closePopup() {
    popup.classList.remove('open-popup');
    popupBtn.classList.remove('open-btn-mess');

    
  }


// function sendPopup(){
//     Email.send({
//         Host : "smtp.gmail.com",
//         Username : "craftylandon@gmail.com",
//         Password : "04EEB0591B01131766DD36052629F2CCF2BF",
//         To : 'craftylandon@gmail.com',
//         From : document.getElementById('email').value,
//         Subject : "New Contact Form Entry",
//         Body : "And this is the body"
//     }).then(
//       message => alert(message)
//     );
// }



function resizeGridItem(item){
    grid = document.getElementsByClassName("shop-content")[0];
    rowHeight = parseInt(window.getComputedStyle(grid).getPropertyValue('grid-auto-rows'));
    rowGap = parseInt(window.getComputedStyle(grid).getPropertyValue('grid-row-gap'));
    rowSpan = Math.ceil((item.querySelector('.content').getBoundingClientRect().height+rowGap)/(rowHeight+rowGap));
      item.style.gridRowEnd = "span "+rowSpan;
  }
  
  function resizeAllGridItems(){
    allItems = document.getElementsByClassName("item");
    for(x=0;x<allItems.length;x++){
      resizeGridItem(allItems[x]);
    }
  }
  
  function resizeInstance(instance){
    item = instance.elements[0];
    resizeGridItem(item);
  }
  
  window.onload = resizeAllGridItems();
  window.addEventListener("resize", resizeAllGridItems);
  
  allItems = document.getElementsByClassName("item");
  for(x=0;x<allItems.length;x++){
    imagesLoaded( allItems[x], resizeInstance);
  }



let thisPage = 1;
let limit = 21;
let list = document.querySelectorAll('.product-box');

function loadItemBar() {
    let beginGet = limit * (thisPage - 1);
    let endGet = limit * thisPage - 1;
    list.forEach((item, key) => {
        if(key >= beginGet && key <= endGet){
            item.style.display = 'block';
        }else{
            item.style.display= 'none';
        }
    })
    listPage();
}



loadItemBar();
function listPage(){
    let count = Math.ceil(list.length / limit);
    document.querySelector('.listPage').innerHTML = '';

    if(thisPage != 1){
        let prev = document.createElement('li');
        prev.innerText = 'PREV';
        prev.setAttribute('onclick', "changePage(" + (thisPage - 1) + ")");
        document.querySelector('.listPage').appendChild(prev);
    }

    for(i = 1; i <= count; i++){
        // let newPage = document.createElement('li');
        // newPage.innerText = i;
        // if(i == thisPage){
        //     newPage.classList.add('active');
        // }
        // newPage.setAttribute('onclick', "changePage(" + i + ")");
        // document.querySelector('.listPage').appendChild(newPage);
    }

    if(thisPage != count){
        let current = document.createElement('li');
        current.innerText = thisPage;
        document.querySelector('.listPage').appendChild(current);
    }else{
        let current = document.createElement('li');
        current.innerText = thisPage;
        document.querySelector('.listPage').appendChild(current);
    }

    if(thisPage != count){
        let next = document.createElement('li');
        next.innerText = 'NEXT';
        next.setAttribute('onclick', "changePage(" + (thisPage + 1) + ")");
        document.querySelector('.listPage').appendChild(next);

    }


}

function changePage(i){
    thisPage = i;
    loadItemBar();
    document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}

// Get the button:


// When the user clicks on the button, scroll to the top of the document
// function topFunction() {
//   document.body.scrollTop = 0; // For Safari
//   document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
// }

// let list2 = document.querySelectorAll('.shop-content .product-box').style.display == 'none';

// const current = () => {
//     loadItemBar();
// }

//  setInterval(current, 300);
// const month3 = new getMonth();
// const day = new getDate();

const monthtester = () => {
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

// const d = new Date();
// let month = months[d.getMonth()];

const d = new Date();
document.getElementById("date12").defaultValue = months[d.getMonth()] + ", " + (d.getDate() + 5 );

// document.getElementById('date12').defaultValue = month, (day + 4);
if (d.getHours() >= 12) {
    if (d.getMinutes() >=10) {
        document.getElementById('time12').defaultValue = (d.getHours() - 12) + ":" + (d.getMinutes()) + " PM";
    } else {
        document.getElementById('time12').defaultValue = (d.getHours() - 12) + ":0" + (d.getMinutes()) + " PM";
    }
} else {
    if (d.getMinutes() >=10) {
        document.getElementById('time12').defaultValue = (d.getHours()) + ":" + (d.getMinutes()) + " AM";
    } else {
        document.getElementById('time12').defaultValue = (d.getHours()) + ":0" + (d.getMinutes()) + " AM";
    }
}

document.getElementById("quantity12").defaultValue = "1";

}

setInterval(monthtester, 1000);


let mybutton = document.getElementById("myBtn2");

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction2() {
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}