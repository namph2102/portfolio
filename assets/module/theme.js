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
  let darkTheme = false;
  const changeTheme = function () {
    const { main, bodyBg, textColor } = darkTheme ? darkColor : lightColor;
    toggleIconLight.className = darkTheme
      ? "fa-regular fa-lightbulb"
      : "fa-regular fa-moon";
    darkTheme = !darkTheme;

    handleRoot("--main-color").set(main);
    handleRoot("--body-bg").set(bodyBg);
    handleRoot("--txt-color").set(textColor);
  };
  toggleLight.addEventListener("click", changeTheme);
};
export default themeDarklightOptions;
