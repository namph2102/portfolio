const themeDarklightOptions = () => {
  // toggle light
  const handleRoot = function (rootName) {
    return {
      get() {
        return getComputedStyle(document.documentElement).getPropertyValue(
          rootName
        );
      },
      set(color) {
        document.documentElement.style.setProperty(rootName, color);
      },
    };
  };

  // Change theme Dark light
  const toggleLight = document.querySelector(".app__dark--mode");
  const toggleIconLight = document.querySelector(".app__dark--mode button i");
  const lightColor = Object.freeze({
    bodyBg: "#fff",
    textColor: "#666",
    main: "#ff5722",
  });
  const darkColor = Object.freeze({
    bodyBg: "#111",
    textColor: "#fff",
    main: "#ffb400",
  });
  console.log(localStorage.getItem("darkTheme"));
  let darkTheme = localStorage.getItem("darkTheme") ?? "dark";
  if (darkTheme == "moon") {
    changeTheme();
  }
  function changeTheme() {
    const { main, bodyBg, textColor } =
      darkTheme === "dark" ? darkColor : lightColor;
    toggleIconLight.className =
      darkTheme === "dark" ? "fa-regular fa-lightbulb" : "fa-regular fa-moon";
    localStorage.setItem("darkTheme", darkTheme);
    handleRoot("--main-color").set(main);
    handleRoot("--body-bg").set(bodyBg);
    handleRoot("--txt-color").set(textColor);
  }
  toggleLight.addEventListener("click", () => {
    if (darkTheme == "dark") {
      darkTheme = "moon";
    } else {
      darkTheme = "dark";
    }
    changeTheme();
  });
};
export default themeDarklightOptions;
