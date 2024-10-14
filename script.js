const navLinks = [
    {
      menu: "HOME",
      link: `<a href="index.html">HOME</a>`,
      navType: "MOBILE",
    },
  
    {
      menu: "OUR COFFEES",
      link: `<a href="products.html">OUR COFFEES</a>`,
      navType: "BOTH",
    },
    {
      menu: "CART",
      link: `<a href="cart.html">CART</a>`,
      navType: "BOTH",
    },
  ];
  
  const carouselPages = [
    {
      html: `<div class="carousel-item active">
    <h2>Artisan Brew Café</h2>
    <img src="../public/images/main2.jpg" alt="">
    </div>`,
    },
    {
      html: `<div class="carousel-item">
        <div class="page1">
        <h2>NOT “JUST” COFFEE…</h2>
        <p>Most of our coffees can be requested decaffeinated, without sweetening and with a wide variety of milk alternatives. In addition to coffees, we offer a large selection of premium quality loose teas, fruit and spice infusions. Many of our hot chocolates have their own fan base. For the hotter days − or just for a heavenly thirst quencher − we have iced coffees and teas, as well as homemade lemonades and shakes. We also offer snacks with our beverages: a rich selection of bakery products, pastries, sandwiches and our special savoury snacks.</p>
        <img src="../public/images/main4.jpg" alt="">
       </div></div>"`,
    },
    {
      html: `<div class="carousel-item">
        <h2>OUR TOP 3 COFFEE</h2>
        <div class="pictures">
        <img src="../public/images/T7.png" alt="">
        <img src="../public/images/T2.png" alt="">
        <img src="../public/images/T8.png" alt="">
        </div>
        <button id=products-btn><a href="products.html">Show all products!</a></button>
    </div>`,
    },
  ];

  document.addEventListener("DOMContentLoaded", function () {
    //console.log(this.location);
    if (this.location.pathname === "/index.html") {
      carouselUpload(carouselPages);
    
    }
    createNav("#desktopNav");
    createNav(".mobile-nav-links");
    hamburgerMenu();
  });
  
export function createNav(navType) {
    //console.log("1", navType);
    for (let index = 0; index < navLinks.length; index++) {
      const element = navLinks[index];
      const nav = document.querySelector(navType);
      const buttonElement = document.createElement("button");
      buttonElement.innerHTML = element.link;
      nav.append(buttonElement);
    }
    //console.log("2", navType);
  }
  
  function hamburgerMenu() {
    const hamburgerIcon = document.querySelector("#hamburger-menu");
    const navMenu = document.querySelector(".mobile-nav-links");
  
    hamburgerIcon.addEventListener("click", function () {
      navMenu.classList.toggle("notHidden");
    });
  }
  
  function carouselUpload(array) {
    const pages = document.querySelector(".carousel-inner");
    if (pages) {
      let stringForUp = "";
      for (let index = 0; index < array.length; index++) {
        console.log(array[index].html);
        stringForUp += array[index].html;
        console.log(stringForUp);
      }
      pages.innerHTML = stringForUp;
    }
  }
  
  