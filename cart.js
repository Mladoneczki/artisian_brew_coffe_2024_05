import { createCounter, createDrinkSizeRadio } from "./products.js";

// import { createNav } from "../script.js";

let cart = JSON.parse(localStorage.getItem("cart")) || [];

document.addEventListener("DOMContentLoaded", function () {
  createInput();
  displayCart();
  createOrderButton()
 
 
  for (let index = 0; index < cart.length; index++) {
    const element = cart[index];
    console.log(element);
    // createNav();
  }
});

function createInput() {
  const div = document.querySelector(".personalData");
  const textinput = document.createElement("input");
  textinput.type = "text";
  textinput.placeholder = "Nickname";
  textinput.id = "nicknameInput";
  const radioContainer = createRadioB();
  const checkbox = createCheckbox();

  div.append(textinput, radioContainer, checkbox);
  selectedRadiobutton();
}
function createRadioB() {
  const options = ["Dine-in", "Takeaway"];
  const divElement = document.createElement("div");
  divElement.id = "options-buttons";
  options.forEach((option) => {
    const radioBtn = document.createElement("input");
    radioBtn.type = "radio";
    radioBtn.id = option;
    radioBtn.name = "option";
    radioBtn.value = option;

    const label = document.createElement("label");
    label.htmlFor = option;
    label.textContent = option;

    divElement.appendChild(radioBtn);
    divElement.appendChild(label);

    radioBtn.addEventListener("change", function () {
      if (this.checked) {
        console.log(`Selected option: ${option}`);
      }
    });
  });

  

  return divElement;
}
function selectedRadiobutton(){
  const rdButton = document.querySelector("#Takeaway")
  rdButton.checked = true;
}
function createCheckbox() {
  const checkdiv = document.createElement("div");
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.id = "registrationCheckbox";
  const label = document.createElement("label");
  label.htmlFor = "registrationCheckbox";
  label.textContent = "Registration";
  checkdiv.append(checkbox);
  checkdiv.append(label);
  let div2;
  checkbox.addEventListener("change", function () {
    if (this.checked && !div2) {
      div2 = createRegistation(div2);
      checkdiv.append(div2);
    } else if (!this.checked && div2) {
      checkdiv.removeChild(div2);
      div2 = undefined;
    }
  });
  return checkdiv;
}
function createRegistation(div2) {
  div2 = document.createElement("div");
  div2.className = "div2";
  const text = document.createElement("input");
  text.type = "text";
  text.placeholder = "Your full name";
  const email = document.createElement("input");
  email.type = "email";
  email.placeholder = "johndoe@email.com";
  const passw = document.createElement("input");
  passw.type = "password";
  passw.placeholder = "password";
  const passw2 = document.createElement("input");
  passw2.type = "password";
  passw2.placeholder = "password again";
  div2.append(text, email, passw, passw2);
  return div2;
}
function displayCart() {
  const cartItems = document.querySelector(".cartItems");
  for (let index = 0; index < cart.length; index++) {
    const element = cart[index];
    console.log(element);
    const divElement = document.createElement("div");
    divElement.className = "cartListItem";
    const imgElement = document.createElement("img");
    imgElement.src = element.dataImg;
    imgElement.className = "itemImg";
    const h2Element = document.createElement("h2");
    h2Element.textContent = element.dataName;
    const buttonElement=createCloseButton(index);
    const pcs = element.pcs;
    const counterDiv = createCounter(index, pcs, pcs);
    const pElement = document.createElement("p");
    const p2Element=document.createElement("p");
    const brElement=document.createElement("br");
    const price=(pcs*element.price).toFixed(2)
    pElement.textContent = `Size: ${sizeToString(element.size)}`;
    p2Element.textContent=`Price: ${price}`
    console.log(pElement)
    divElement.append(imgElement, h2Element,buttonElement,pElement,brElement,p2Element, brElement,counterDiv, );
    cartItems.append(divElement);
    
  }}
function createCloseButton(index){
  const buttonElement=document.createElement("button")
    buttonElement.type="button"
    buttonElement.className="btn-close";
    buttonElement.ariaLabel="Close"

    buttonElement.addEventListener("click", function(){
      console.log("click")
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    location.reload();
})

    return buttonElement;

}

function sizeToString(size) {
  let sizeString;
  if (size == 0) {
    sizeString = " Small";
  } else if (size == 1 || size == -1) {
    sizeString = " Grande";
  } else if (size == 2) {
    sizeString == " Tall";
  }
  return sizeString;
}

function getSumPrice() {
  let sumprice = 0;
  for (let index = 0; index < cart.length; index++) {
    const element = cart[index];
    const pcs = element.pcs;
    const price = element.price;
    sumprice += pcs * price;
  }
const sumPrice=sumprice.toFixed(2);
  console.log(sumPrice);
  return sumPrice;
}


  function getCustomerInfo() {
    const nicknameInput = document.getElementById("nicknameInput");
    let nickname;
    const ordernumber=Math.floor(Math.random() * 900000) + 100000;
    if(nicknameInput.value){
     nickname= nicknameInput.value;}
    else{nickname=`#${ordernumber}`}
    const getPrice = getSumPrice();
  
    const price = document.createElement("p");
    price.textContent = "Order total: " + getPrice + "$";
  
    const name = document.createElement("p");
    name.textContent = "Name: " + nickname;
  
    return { name: name, price: price };
  }
  
function createOrderButton(){
  const checkOutBtn = document.querySelector("#primary");
  const div = document.querySelector(".payment");
 

  

  checkOutBtn.addEventListener("click", function(){
    const customerInfo = getCustomerInfo();
    div.append(customerInfo.name, customerInfo.price);
    const button = document.createElement("button");
    button.textContent = "ORDER";
    button.classList.add("oderBTN");
    div.append( button);
    div.classList.remove("hide")
    checkOutBtn.classList="hide";

})}
