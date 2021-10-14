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
let sectionNum = 0;
let sections = document.querySelectorAll("section");

/**
 * End Global Variables
 * Start Helper Functions
 *
 */

/**
 * End Helper Functions
 * Begin Main Functions
 *
 */

// build the nav
const addSection = function () {
  sectionNum++;
  let sectionContent = `<li><a data-section="section${sectionNum}" class="menu__link">Section ${sectionNum}</a></li>`;
  document.querySelector("ul").insertAdjacentHTML("beforeend", sectionContent);
};
for (let i = 1; i < 5; i++) addSection();
// Add class 'active' to section when near top of viewport

function viewPort(inView) {
  inView.forEach(function (ele) {
    if (ele.isIntersecting) {
      ele.target.classList.add("your-active-class");
    } else {
      ele.target.classList.remove("your-active-class");
    }
  });
}

let options = {
  threshold: [0.6],
};

let observer = new IntersectionObserver(viewPort, options);

for (let section of sections) {
  observer.observe(section);
}


// Scroll to anchor ID using scrollTO event
let links = document.querySelectorAll(".menu__link");
links.forEach(function (link) {
  link.addEventListener("click", function () {
    let scrollSection = document.getElementById(
      link.getAttribute("data-section")
    );
    scrollSection.scrollIntoView({ behavior:"smooth",block:"start" });
  });
});
/**
 * End Main Functions
 * Begin Events
 *
 */

// Build menu

// Scroll to section on link click

// Set sections as active