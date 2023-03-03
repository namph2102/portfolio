import changeTheme from "../module/theme.js";
import { effectObserve , lazyLoading } from "../module/observe.js";



(async function () {

  // change Theme Dar kLight
  changeTheme();
  
  const res = await fetch("/assets/json/skills.json");
  const mySkills = await res.json();

  const skill__box_container = document.querySelector(".skill__box .row");
  skill__box_container.innerHTML = mySkills.map(
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
  ).join('');


/*      -- when scrolling --     */

// lazyloading images
  const listImages= document.querySelectorAll("img[data-src]");
  listImages.forEach((img) => lazyLoading(img));
//skill effect
document.querySelectorAll(".skill__item").forEach((el) => effectObserve(el));
})();

//effect info
const infos_container=document.querySelector(".info");
effectObserve(infos_container);

// effect info cart
const listCart=document.querySelectorAll(".info__more--cart");
listCart.forEach((el) => effectObserve(el));

// resume effect 
const resumes=document.querySelectorAll(".resume__box--item");
resumes.forEach((resume) => effectObserve(resume));

window.addEventListener("load", () => {
  document.documentElement.scrollIntoView();
});

