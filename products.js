import { createNav } from "./script.js";

const cart = [];
let savedcart = JSON.parse(localStorage.getItem("cart")) || [];

const filtered = [];

let pcs = {};

let cartItemCount = 0;

let price = 0;

document.addEventListener("DOMContentLoaded", function () {
    //console.log(this.location)
    if (this.location.pathname === "/products.html") {
      createFilterBtn();
      createCardBody();
      cartBadge();
    }
  });

async function fetchCardData() {
    const response = await fetch("products.json");
    const data = await response.json();
    //console.log(data)
    return data;
  
  }
  
  async function createCardBody() {
    const cardData = await fetchCardData();
    const containerDiv = document.querySelector(".card-container");
  
    for (let index = 0; index < cardData.length; index++) {
      const currentElement = cardData[index];
      const cardDiv = createCard(currentElement, index);
      const radioContainer = createRadioContainer(index);
      const counterDiv = createCounter(index, 0, 0);
      const cartBtn = createCartButton(index, currentElement);
  
      cardDiv.append(radioContainer, counterDiv, cartBtn);
      containerDiv.append(cardDiv);
    }
  }
  
  function createCard(currentElement) {
    const cardDiv = document.createElement("div");
    cardDiv.classList.add("card");
    const cardImg = document.createElement("img");
    cardImg.src = currentElement.img;
    const cardText = document.createElement("h2");
    cardText.textContent = currentElement.name;
    cardDiv.append(cardImg, cardText);
    return cardDiv;
  }
  
  function createRadioContainer(index) {
    const radioGroupName = `size${index}`;
    const radioContainer = document.createElement("div");
    radioContainer.classList.add("radio-container");
    const sizes = [" Small (2.99$)", " Grande (3.99$)", " Tall (4.99$)"];
    sizes.forEach((size) => {
     
      const radio = createDrinkSizeRadio(radioGroupName, size);
      radioContainer.appendChild(radio);
    });
    return radioContainer;
  }
  
  export function createCounter(index, text, startnum) {
    const spanElement = document.createElement("span");
    const plusBtn = createButton("public/icons/plus (1).png");
    plusBtn.id = `increment-btn${index}`;
    const counterDiv = document.createElement("div");
    counterDiv.id = `counter-value${index}`;
    counterDiv.textContent = text;
    const minusBtn = createButton("public/icons/minus.png");
    minusBtn.id = `decrement-btn${index}`;
    spanElement.classList.add("span-counter")
    spanElement.appendChild(minusBtn);
    spanElement.appendChild(counterDiv);
    spanElement.appendChild(plusBtn);
  
    pcs[index] = startnum;
  
    plusBtn.addEventListener("click", function () {
      pcs[index]++;
      counterDiv.textContent = pcs[index];
    });
  
    minusBtn.addEventListener("click", function () {
      if (pcs[index] > 0) {
        pcs[index]--;
        counterDiv.textContent = pcs[index];
      }
    });
  
    return spanElement;
  }
  
  function createCartButton(index, currentElement) {
    const cartBtn = document.createElement("button");
    cartBtn.textContent = "Add to cart";
    cartBtn.classList.add("cart-btn")
    cartBtn.addEventListener("click", () => {
      const size = getSize(index);
      if(size == 0){
        price = 2.99
      }else if(size == 1){
        price = 3.99
      }else{
        price = 4.99
      }
      addToCart(index, currentElement.img, currentElement.name, size, price);
      cartSaving();
      cartItemCount++
      cartBadge(cartItemCount);
    });
    return cartBtn;
  }
  
  function createButton(property) {
    const buttonElement = document.createElement("button");
    const imgCounter = document.createElement("img");
    imgCounter.src = property;
    buttonElement.append(imgCounter);
    return buttonElement;
  }
  
  export function createDrinkSizeRadio(groupName, text) {
    const label = document.createElement("label");
    const radioInput = document.createElement("input");
    radioInput.type = "radio";
    label.classList.add("radio")
    radioInput.name = groupName;
    label.appendChild(radioInput);
    label.appendChild(document.createTextNode(text));
    return label;
  }
  
  function getSize(index) {
    const radios = document.querySelectorAll(`input[name="size${index}"]`);
    let selectedIndex = -1;
    radios.forEach((radio, idx) => {
      if (radio.checked) {
        selectedIndex = idx;
      }
    });
    return selectedIndex;
  }
  
  function addToCart(index, image, coffee, size, price) {
    const newItem = {
      dataImg: image,
      dataName: coffee,
      pcs: pcs[index],
      size: size,
      price: price
    };
    cart.push(newItem);
    console.log(cart);
    savedcart.push(newItem);
    localStorage.setItem("cart", JSON.stringify(savedcart));
    //console.log(savedcart);
  }
  
  async function createFilterBtn() {
    const cardData = await fetchCardData();
    const containerDiv = document.querySelector(".card-container");
    const filterContainer = document.querySelector(".filter");
    const uniqueCategories = new Set();
  
    cardData.forEach((coffee) => {
      uniqueCategories.add(coffee.cat);
    });
  
    uniqueCategories.forEach((category) => {
      const button = document.createElement("button");
      button.textContent = category;
      button.classList.add("filterbtn");
      filterContainer.append(button);
      button.addEventListener("click", async () => {
        await search(category);
        showFilteredCoffee();
      });
    });
  
    const clearButton = document.createElement("button");
    clearButton.textContent = "Show all";
    clearButton.classList.add("filterbtn");
    filterContainer.append(clearButton);
    clearButton.addEventListener("click", async () => {
      containerDiv.innerHTML = "";
      createCardBody();
    });
  }
  
  async function search(type) {
    const cardData = await fetchCardData();
  
    filtered.splice(0, filtered.length);
  
    cardData.forEach((card) => {
      if (card.cat.includes(type)) {
        filtered.push(card);
      }
    });
  }
  
  function showFilteredCoffee() {
    const containerDiv = document.querySelector(".card-container");
  
    containerDiv.innerHTML = "";
  
    for (let index = 0; index < filtered.length; index++) {
      const element = filtered[index];
      const cardDiv = createCard(element, index);
      const radioContainer = createRadioContainer(index);
      const counterDiv = createCounter(index);
      const cartBtn = createCartButton(index, element);
      cardDiv.append(radioContainer, counterDiv, cartBtn);
      containerDiv.append(cardDiv);
    }
  }
  
  function cartSaving() {
    localStorage.setItem("cart", JSON.stringify(cart));
    console.log("saved");
  }
  
  function cartBadge(x) {
    const cartDiv = document.createElement("div");
    cartDiv.classList.add("cart")
    const imgDiv = document.createElement("div");
    const a = document.createElement("a");
    a.href = "cart.html"
    const img = document.createElement("img");
    img.src = "public/icons/shopping-cart.png"
    const badgeDiv = document.createElement("div");
    badgeDiv.classList.add("badge")
    badgeDiv.textContent = x;
    a.append(img)
    imgDiv.append(a)
    cartDiv.append(imgDiv, badgeDiv)
    document.body.appendChild(cartDiv)
  }