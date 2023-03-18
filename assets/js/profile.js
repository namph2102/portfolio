import changeTheme from "../module/theme.js";

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
})();
const renderView = (portfolios = []) => {
  const profilioBody = document.querySelector(".portfolio__list--body");
  profilioBody.innerHTML = "";
  const TIME__DELAY = 0.5;
  profilioBody.innerHTML = portfolios
    .map(
      (item, index) => `
    <div style="animation-delay: ${
      index * TIME__DELAY + "s"
    }" class="portfolio__list--item col-lg-4 col-md-6 col-12" data-id="${
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
