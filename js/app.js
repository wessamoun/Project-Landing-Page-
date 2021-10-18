/**
 *
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 *
 * Dependencies: None
 *
 * JS Version: ES2015/ES6
 *
 * JS Standard: ESlint
 *
 */

/**
 * Define Global Variables
 *
 */
// a variable to use it in adding sections in nav
let navSectionNum = 0;
// a variable to use it in adding sections
let sectionNum = 4;
// next functions made them as a variable to use them again at
// the part of adding sections button
const addNavSection = function () {
  navSectionNum++;
  let navSectionContent = `<li><a data-section="section${navSectionNum}" class="menu__link">Section ${navSectionNum}</a></li>`;
  document.querySelector("ul").insertAdjacentHTML("beforeend", navSectionContent);
};
const addSection = function () {
  sectionNum++;
  let sectionContent = `<section id="section${sectionNum}" class="" data-nav="Section ${sectionNum}">
  <div class="landing__container">
    <h2>Section ${sectionNum}</h2>
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi fermentum metus faucibus lectus pharetra dapibus. Suspendisse potenti. Aenean aliquam elementum mi, ac euismod augue. Donec eget lacinia ex. Phasellus imperdiet porta orci eget mollis. Sed convallis sollicitudin mauris ac tincidunt. Donec bibendum, nulla eget bibendum consectetur, sem nisi aliquam leo, ut pulvinar quam nunc eu augue. Pellentesque maximus imperdiet elit a pharetra. Duis lectus mi, aliquam in mi quis, aliquam porttitor lacus. Morbi a tincidunt felis. Sed leo nunc, pharetra et elementum non, faucibus vitae elit. Integer nec libero venenatis libero ultricies molestie semper in tellus. Sed congue et odio sed euismod.</p>

    <p>Aliquam a convallis justo. Vivamus venenatis, erat eget pulvinar gravida, ipsum lacus aliquet velit, vel luctus diam ipsum a diam. Cras eu tincidunt arcu, vitae rhoncus purus. Vestibulum fermentum consectetur porttitor. Suspendisse imperdiet porttitor tortor, eget elementum tortor mollis non.</p>
  </div>
</section>`;
  document.querySelector("main").insertAdjacentHTML("beforeend", sectionContent);
};

/**
 * End Global Variables
 */

// build the nav

// use for loop to build the main 4 nav sections
for (let i = 1; i < 5; i++) addNavSection();

// Add class 'active' to section when near top of viewport

//in this part i used (Intersection Observer API) which i learned
// from this link https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API
// we can use getBoundingClientRect() too, so please tell me if there a problem with this method
// i will try to use the another method
// and i made this function as a variable to use it agin later
function obs() {
  let sections = document.querySelectorAll("section");
  function viewPort(inView) {
    inView.forEach(function (ele) {
      //i learned this type of selector from this link
      // https://reactgo.com/select-element-data-attribute-js/
      // so please tell me if there a problem if i use it
      let aClass = document.querySelector(`[data-section=${ele.target.id}]`);
      if (ele.isIntersecting) {
        ele.target.classList.add("your-active-class");
        aClass.classList.add("active");
      } else {
        ele.target.classList.remove("your-active-class");
        aClass.classList.remove("active");
      }
    });
  }

  let options = {
    threshold: [0.6],
  };

  let observer = new IntersectionObserver(viewPort, options);

  sections.forEach(function (section) {
    observer.observe(section);
  });
}
obs();

// Scroll to section on link click

// in this part i made scroll to sections by id when click in links
// so i add data- Attribute in nav to make it like sections id
// so every link go to his section
// and i made this function as a variable to use it agin later
function scrollTo() {
  let links = document.querySelectorAll(".menu__link");
  links.forEach(function scroll(link) {
    link.addEventListener("click", function () {
      let scrollSection = document.getElementById(
        link.getAttribute("data-section")
      );
      //Add some options like behavior: "smooth" to make easy animation
      //not jump to section directly and block: "start" to scroll to start of section
      scrollSection.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });
}
scrollTo();

// Build add section button
//By that button which i put it at the footer we can add sections
document.getElementById("button").addEventListener("click", function () {
  addNavSection();
  addSection();
  //Called next functions again to make them work again after every
  // click in the button to make the functions work with the new sections
  scrollTo();
  obs();
});

// Add a scroll to top button on the page and hide it function
document.querySelector(".icon").addEventListener("click", function () {
  window.scroll({ top: 0, behavior: "smooth" });
});
// I made this function and the next function as a variables to
// call them all at onscroll at the same time
function toTopHide() {
  //I just used that condition because i did not git what you mean
  // by (below the fold of the page) exactly
  if (window.scrollY >= 0.8 * document.querySelector("main").scrollHeight) {
    document.querySelector(".icon").style.display = "block";
  } else {
    document.querySelector(".icon").style.display = "none";
  }
}

// Hide fixed navigation bar while not scrolling function

//here i used a variable (hide) to clear all timers which produce
// after every scroll (i got some help from tutors in this part)
let hide;
function navHide() {
  document.getElementById("page__header").style.top = "0";
  window.clearTimeout(hide);
  hide = window.setTimeout(function () {
    document.getElementById("page__header").style.top = "-500px";
  }, 5000);
}
// call the onscroll functions
window.onscroll = function () {
  toTopHide();
  navHide();
};

// an icon in mobiles to click it to open nav list
document.getElementById("bars").addEventListener("click", function () {
  document.getElementById("navbar__list").classList.toggle("clicked");
});
