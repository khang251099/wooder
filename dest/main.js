/*Nav mobile*/

const btnMenu = document.querySelector(".btnMenu");
const nav = document.querySelector(".nav");
let offsetHeightHeader = document.querySelector(".header").offsetHeight;
const navmenus = document.querySelectorAll(".nav ul li a");

function removeNav() {
  btnMenu.classList.remove("active");
  nav.classList.remove("active");
}

/*click nav mobile to section*/
navmenus.forEach(function (val, index) {
  const className = val.getAttribute("href").replace("#", "");
  const section = document.querySelector(`.${className}`);
  val.addEventListener("click", function (e) {
    e.preventDefault();
    window.scrollTo({
      top: section?.offsetTop - offsetHeightHeader + 1,
      behavior: "smooth",
    });
    removeNav();
    val.classList.add("active");
  });
});

btnMenu.addEventListener("click", function () {
  this.classList.toggle("active");
  nav.classList.toggle("active");
});

/*Resize menu nav*/
window.addEventListener("resize", function (e) {
  if (this.innerWidth > 992) {
    removeNav();
  }
});

const header = document.querySelector(".header");
const slider = document.querySelector(".slider");
const heightSlider = slider.offsetHeight;
const heightHeader = header.clientHeight;

function changeBackground() {
  const scrollY = window.pageYOffset;
  if (scrollY > heightSlider - heightHeader) {
    header.classList.add("active");
  } else {
    header.classList.remove("active");
  }
}
document.addEventListener("scroll", changeBackground);
/*Change background header*/

/*Jquery scroll change background*/

// $(function () {
//   $(window).on("scroll", function () {
//     if ($(window).scrollTop() > 615) {
//       $(".header").addClass("active");
//     } else {
//       $(".header").removeClass("active");
//     }
//   });
// });

/*back to top*/
const btnTop = document.querySelector(".btn-top");

btnTop.onclick = () => window.scrollTo({ top: 0, behavior: "smooth" });

/*Language*/

const lang = document.querySelector(".language");
const langOption = document.querySelector(".language .language__option");
const langsOption = document.querySelectorAll(".language .language__option a");
const langCurr = document.querySelector(
  ".language .language__current .language__current-item"
);
const langCurrItem = document.querySelector(
  ".language .language__current .language__current-item span"
);

lang.addEventListener("click", function () {
  this.classList.toggle("active");
  langOption.classList.toggle("active");
});

langsOption.forEach(function (val) {
  val.addEventListener("click", function (e) {
    //swap
    let temp = langCurrItem.innerText;
    langCurrItem.innerText = this.innerText;
    this.innerText = temp;
  });
});

/*Modal video*/
const btnPlay = document.querySelectorAll(".quality .play-button");
const videoMod = document.querySelector(".video-modal");
const btnClose = document.querySelector(".video-modal .close");
const iframe = document.querySelector(".video-modal iframe");
btnPlay.forEach(function (val) {
  val.addEventListener("click", function (e) {
    e.preventDefault();
    // videoMod.classList.add("active");
    const id = val.getAttribute("data-video-id");
    iframe.setAttribute(
      "src",
      `https://www.youtube.com/embed/${id}?autoplay=1&mute=1`
    );
    videoMod.style.display = "flex";
  });
});

btnClose.addEventListener("click", function () {
  // videoMod.classList.remove("active");

  iframe.setAttribute("src", "none");
  videoMod.style.display = "none";
});

videoMod.addEventListener("click", function (e) {
  e.stopPropagation();
  videoMod.style.display = "none";
  iframe.setAttribute("src", "none");
});

/*Scroll to section */

let menus = document.querySelectorAll(".menu-item  a");

//offsetHeight lấy chiều cao phần tử bao gồm cả padding n border
//clientHeight: lấy chiều cao phần tử bao gồm cả padding

let sections = [];
const removeMenuActive = () => {
  menus.forEach(function (menuElement, index) {
    menuElement.classList.remove("active");
  });
};
menus.forEach(function (element, index) {
  const className = element.getAttribute("href").replace("#", "");
  const section = document.querySelector(`.${className}`);
  sections.push(section);
  element.addEventListener("click", function (e) {
    e.preventDefault();
    //offsetTop: lấy vị trí của một element nào đó dựa vào body.
    const positionSection = section?.offsetTop;
    window.scrollTo({
      top: positionSection - offsetHeightHeader + 1,
      behavior: "smooth",
    });
    removeMenuActive();
    element.classList.add("active");
  });
});

window.addEventListener("scroll", function (e) {
  let positionScroll = window.pageYOffset;
  sections.forEach(function (section, index) {
    if (
      positionScroll > section?.offsetTop - offsetHeightHeader &&
      positionScroll < section?.offsetTop + section?.offsetHeight
    ) {
      removeMenuActive();
      menus[index].classList.add("active");
    } else {
      menus[index].classList.remove("active");
    }
  });
});

/*Slider*/

const listItemSlider = document.querySelectorAll(".slider__item");
let number = document.querySelectorAll(".slider__bottom-paging .number");
let dotted = document.querySelectorAll(".slider__bottom-paging .paging li");

let currentSlider = 0;

listItemSlider.forEach(function (itemSlider, index) {
  if (itemSlider.classList.contains("active")) {
    currentSlider = index;
  }
});
const showNumber = (index) => {
  number.innerHTML = index.toString().padStart(2, "0");
};

const btnNext = document.querySelector(".btn .--next");

btnNext.addEventListener("click", function (e) {
  if (currentSlider < listItemSlider.length - 1) {
    goTo(currentSlider + 1);
  } else {
    goTo(0);
  }
});
const btnPrev = document.querySelector(".btn .--prev");

btnPrev.addEventListener("click", function (e) {
  e.preventDefault();
  if (currentSlider > 0) {
    goTo(currentSlider - 1);
  } else {
    goTo(listItemSlider.length - 1);
  }
});

dotted.forEach(function (li, index) {
  li.addEventListener("click", function (e) {
    goTo(index);
  });
});

function goTo(index) {
  /*Dotted*/
  dotted[currentSlider].classList.remove("active");
  dotted[index].classList.add("active");
  /*Number*/
  number[currentSlider].classList.remove("active");
  number[index].classList.add("active");
  /*Slider*/
  listItemSlider[currentSlider].classList.remove("active");
  listItemSlider[index].classList.add("active");
  currentSlider = index;
  showNumber(currentSlider + 1);
}

/*TOP*/
const btnClickTop = document.querySelector(".btn-to-top");
btnClickTop.addEventListener("click", function () {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});
const decorSec = document.querySelector(".decor").offsetTop;

window.addEventListener("scroll", function () {
  const position = window.pageYOffset;
  if (position > decorSec) {
    btnClickTop.style.display = "block";
  } else {
    btnClickTop.style.display = "none";
  }
});

/*Prevent  news heading*/
const newHeadings = document.querySelectorAll(".news .new-heading");
newHeadings.forEach(function (val, index) {
  val.addEventListener("click", function (e) {
    e.preventDefault();
  });
});

/*Tab new*/

const tabs = document.querySelectorAll(".new-btn .btn");
const tab = document.querySelector(".new-btn .btn");
const newItems = document.querySelectorAll(".new-list");

tabs.forEach(function (tab, index) {
  //get index lấy để element tương ứng
  const newItem = newItems[index];

  tab.addEventListener("click", function () {
    document.querySelector(".new-btn .btn.active").classList.remove("active");
    document.querySelector(".new-list.active").classList.remove("active");
    this.classList.add("active");
    newItem.classList.add("active");
  });
});

/*FAQ*/

const accordion = document.querySelectorAll(".faq__item .accordion");
accordion.forEach(function (val, index) {
  val.addEventListener("click", function () {
    this.classList.toggle("active");
    const panel = this.nextElementSibling;
    if (panel.style.maxHeight) {
      panel.style.maxHeight = null;
    } else {
      panel.style.maxHeight = panel.scrollHeight + "px";
    }
  });
});
