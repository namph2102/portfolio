import changeTheme from "../module/theme.js";

(async function () {
  // Dark light
  changeTheme();
  const res = await fetch("/assets/json/portfolio.json");
  const portfolios = await res.json();
  console.log(portfolios);
  renderView(portfolios);
})();

const renderView = (portfolios = []) => {
  const profilioBody = document.querySelector(".portfolio__list--body");
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
