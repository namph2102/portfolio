import changeTheme from "../module/theme.js";
import { effectObserve, lazyLoading } from "../module/observe.js";

(async function () {
  // change Theme Dar kLight
  changeTheme();

  const res = await fetch("/assets/json/skills.json");
  const mySkills = await res.json();

  const skill__box_container = document.querySelector(".skill__box .row");
  skill__box_container.innerHTML = mySkills
    .map(
      (skill) =>
        `
    <div class="col-lg-3 col-md-4 col-6">
        <figure class="skill__item">
            <div class="language__avata">
                <img class="lazy__loading" src="/public/image/react.png" data-src="${skill.image}" alt="${skill.title}">
             </div>
            <figcaption class="skill__item--des">${skill.title}</figcaption>
        </figure>
    </div>
    `
    )
    .join("");

  /*      -- when scrolling --     */

  // lazyloading images
  const listImages = document.querySelectorAll("img[data-src]");
  listImages.forEach((img) => lazyLoading(img));
  //skill effect
  document.querySelectorAll(".skill__item").forEach((el) => effectObserve(el));

  // EDUCATION & EXPERIENCE
  const resEducation = await fetch("/assets/json/infos.json");
  const myInfos = await resEducation.json();

  const resume__container = document.querySelector(".resume__box .row");
  resume__container.innerHTML = myInfos
    .map((info) => {
      return `
      <div class="resume__box--item  col-md-6 col-12" data-id="${info.id}">
        <div class="resume__item">
            <div class="resume__item--attach">
              <div class="resume__item--attach__icon">
                <i class="fa-solid fa-bag-shopping"></i>
              </div>
            </div>
            <div class="resume__item--content">
              <time class="resume__item--content__time">${info.time}</time>
              <div class="resume__item--content__title">
              ${info.title}
              </div>
              <div class="resume__item--content__des">
              ${info.description}
               </div>
            </div>
          </div>
        </div>
      `;
    })
    .join("");
  //effect
  const resume_listItems = document.querySelectorAll(".resume__box--item");
  resume_listItems.forEach((re) => effectObserve(re));
})();

//effect info
const infos_container = document.querySelector(".info");
effectObserve(infos_container);

// effect info cart
const listCart = document.querySelectorAll(".info__more--cart");
// listCart.forEach((el) => effectObserve(el));

// resume effect
const resumes = document.querySelectorAll(".resume__box--item");
// resumes.forEach((resume) => effectObserve(resume));

window.addEventListener("load", () => {
  document.documentElement.scrollIntoView();
});

// resume
