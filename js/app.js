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
let navSectionNum = 0;
let sectionNum = 4;
const addNavSection = function () {
  navSectionNum++;
  let navSectionContent = `<li><a data-section="section${navSectionNum}" class="menu__link">Section ${navSectionNum}</a></li>`;
  document
    .querySelector("ul")
    .insertAdjacentHTML("beforeend", navSectionContent);
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
  document
    .querySelector("main")
    .insertAdjacentHTML("beforeend", sectionContent);
};

/**
 * End Global Variables
 */

// build the nav

for (let i = 1; i < 5; i++) addNavSection();

// Add class 'active' to section when near top of viewport

let obs = function () {
  let sections = document.querySelectorAll("section");
  function viewPort(inView) {
    inView.forEach(function (ele) {
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
};
obs();

// Scroll to section on link click
function scrollTo() {
  let links = document.querySelectorAll(".menu__link");
  links.forEach(function scroll(link) {
    link.addEventListener("click", function () {
      let scrollSection = document.getElementById(
        link.getAttribute("data-section")
      );
      scrollSection.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });
}
scrollTo();
// Build add section button
document.getElementById("button").addEventListener("click", function () {
  addNavSection();
  addSection();
  scrollTo();
  obs();
});

// Scroll to section on link click

// Set sections as active

// Hide fixed navigation bar while not scrolling
let hide;
window.onscroll = function () {
  document.getElementById("page__header").style.display = "block";
  window.clearTimeout(hide);
  hide = window.setTimeout(function () {
    document.getElementById("page__header").style.display = "none";
  }, 5000);
  console.log(window.scrollY)
};


// Add a scroll to top button on the page
document.querySelector(".icon").addEventListener("click", function () {
  window.scroll({ top: 0, behavior: "smooth" });
});
window.onscroll = function () {
if (window.scrollY >= (0.9 * document.querySelector("main").scrollHeight)) {
  document.querySelector(".icon").style.display = "block"
} else {
  document.querySelector(".icon").style.display = "none"
}
}

