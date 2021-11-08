/*Nav mobile*/

const btnMenu = document.querySelector(".btnMenu");
const nav = document.querySelector(".nav");
btnMenu.addEventListener("click", function () {
  this.classList.toggle("active");
  nav.classList.toggle("active");
});

/*scroll change background*/
const header = document.querySelector(".header");
const slider = document.querySelector(".slider");

const heightHeader = header.clientHeight;
const heightSlider = slider.clientHeight;
// header.addEventListener('scroll',function(){})
document.onscroll = function () {
  const scrollTop = window.pageYOffset;
  //Khoáng cách scroll tính
  if (scrollTop > heightSlider - heightHeader) {
    header.classList.add("active");
  } else {
    header.classList.remove("active");
  }
};

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

/*Link active*/

/*back to top*/
const btnTop = document.querySelector(".btn-top");

btnTop.onclick = () => window.scrollTo({ top: 0, behavior: "smooth" });

/*Link active*/

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
      `https://www.youtube.com/embed/${id}?autoplay=1`
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
let offsetHeightHeader = document.querySelector(".header").offsetHeight;
//offsetHeight lấy chiều cao phần tử bao gồm cả padding n border
//clientHeight: lấy chiều cao phần tử bao gồm cả padding

let sections = [];
const removeMenuActive = () => {
  menus.forEach(function (menuEle, index) {
    menuEle.classList.remove("active");
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

function goTo(index) {
  listItemSlider[currentSlider].classList.remove("active");
  listItemSlider[index].classList.add("active");
  /*Dotted*/
  dotted[currentSlider].classList.remove("active");
  dotted[index].classList.add("active");
  /*Number*/
  number[currentSlider].classList.remove("active");
  number[index].classList.add("active");
  currentSlider = index;
  showNumber(currentSlider + 1);
}
