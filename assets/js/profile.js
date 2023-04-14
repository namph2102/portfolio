import changeTheme from "../module/theme.js";
const profile_container = document.querySelector(".profile_container");
const profile_subcontainer = document.querySelector(
  ".profile_container-image_sub"
);

const btn_right = document.querySelector(".profile_controller-btn_right");
const btn_left = document.querySelector(".profile_controller-btn_left");
const btn_close_modal = document.querySelector(".btn_close-modal");
const modal_profile = document.querySelector(".modal_profile");
const portfolio__list_body = document.querySelector(".portfolio__list--body ");

(async function () {
  // Dark light
  changeTheme();
  const res = await fetch("/assets/json/portfolio.json");
  const portfolios = await res.json();
  renderView(portfolios);

  const container_web = document.querySelector(".portfolio__list--btn");
  const listBTNRender = [
    ...document.querySelectorAll(".portfolio__list--btn__item"),
  ];
  container_web.addEventListener("click", (e) => {
    if (!e.target.closest(".portfolio__list--btn__item")) return;
    const kindContainer = e.target.closest(".portfolio__list--btn__item");
    listBTNRender
      .find((contain) => contain.classList.contains("active"))
      ?.classList.remove("active");
    kindContainer.classList.add("active");
    const isrenderAll = kindContainer.dataset.kind == "all";
    console.log(isrenderAll);
    renderView(
      isrenderAll
        ? portfolios
        : portfolios.filter(
            (project) => project.kind == kindContainer.dataset.kind
          )
    );
  });
  btn_close_modal.onclick = () => {
    modal_profile.classList.toggle("notshow");
  };
  portfolio__list_body.addEventListener("click", (e) => {
    if (e.target.closest(".portfolio__list--item")) {
      const parentProfile = e.target.closest(".portfolio__list--item");
      const itemModal = portfolios.find(
        (item) => item.id == parentProfile.dataset.id
      );
      window.scrollTo({
        behavior: "smooth",
        top: 0,
      });
      modal_render(itemModal);
      modal_profile.classList.remove("notshow");
    }
  });
})();
const renderView = (portfolios = []) => {
  const profilioBody = document.querySelector(".portfolio__list--body");
  profilioBody.innerHTML = "";
  const TIME__DELAY = 0.5;
  profilioBody.innerHTML = portfolios
    .map(
      (item, index) => `
    <div style="animation-delay: ${index * TIME__DELAY + "s"}" data-id=${
        item.id
      } class="portfolio__list--item col-lg-4 col-md-6 col-12" data-id="${
        item.id
      }">
    <figure class="portfolio-card">
      <img
        class="portfolio-card_avata"
        src="/public/image/img/${item.images[0]}"
        alt=""
      />
      <figcaption class="portfolio-card_title">
        <span>${item.name}</span>
      </figcaption>
    </figure>
  </div>`
    )
    .join("");
};

const modal_render = (itemModal) => {
  let current = 0;
  document.querySelector(".modal_profile-slider_name").innerHTML =
    itemModal.name;
  document.querySelector(".profile-right-name").innerHTML = itemModal.name;
  document.querySelector(".profile-right-frontend").innerHTML =
    itemModal.Frontend;
  document.querySelector(".profile-right-backend").innerHTML =
    itemModal.Backend || "Không có";
  document.querySelector(".linkdemo").href = itemModal.Demo;
  document.querySelector(".linkdemogit").href = itemModal.link;

  render_displaySubimage(profile_container, itemModal, current, 100);
  render_displaySubimage(profile_subcontainer, itemModal, current, 100);
  profile_subcontainer.addEventListener("click", (e) => {
    if (e.target.closest("img")) {
      if (e.target.dataset.index) {
        current = Number(e.target.dataset.index);
        changeIndex([...listMainImage], current);
        changeSubIndex([...listSubImage], current);
      }
    }
  });
  const listMainImage = profile_container.querySelectorAll("img");
  const listSubImage = profile_subcontainer.querySelectorAll("img");

  btn_right.addEventListener("click", () => {
    current++;
    if (current >= listMainImage.length) current = 0;
    changeIndex([...listMainImage], current);
    changeSubIndex([...listSubImage], current);
  });
  btn_left.addEventListener("click", () => {
    current--;
    if (current < 0) current = listMainImage.length - 1;
    changeIndex([...listMainImage], current);
    changeSubIndex([...listSubImage], current);
  });
};
function render_displaySubimage(
  profile_container,
  itemModal,
  current,
  percent = 100
) {
  profile_container.innerHTML = new Array(itemModal.images[1])
    .fill(0)
    .map((_, index) => {
      const calcIndex = `${(index - current) * percent}%`;
      return `
      <img data-index=${index} style="transform: translateX(${calcIndex});${
        current == index && "opacity:1;"
      }" src="/public/image/img/${itemModal.images[0].replace(
        ".",
        `${index == 0 ? "" : index}.`
      )}" alt="" />
      `;
    })
    .join("");
}
function changeIndex(listMainImage, current) {
  listMainImage.forEach(
    (item, index) =>
      (item.style = `transform: translateX(${(index - current) * 100}%)`)
  );
}
function changeSubIndex(listMainImage, current) {
  listMainImage.forEach(
    (item, index) =>
      (item.style = `transform: translateX(${(index - current) * 100}%);${
        current == index && "opacity: 1;"
      }`)
  );
}
