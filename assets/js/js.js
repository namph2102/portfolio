// toggle light
const handleRoot = function (rootName) {
    return {
        get() {
            return getComputedStyle(document.documentElement)
                .getPropertyValue(rootName);
        },
        set(color) {
            document.documentElement.style
                .setProperty(rootName, color);
        }
    }
}
const toggleLight = document.querySelector('.app__dark--mode');


const lightColor={
    bodyBg:'#fff',
    textColor:'#111',
    main:"#ff5722"
}
const darkColor={
    bodyBg:'#111',
    textColor:'#fff',
    main:"#ffb400"
}
let darkTheme=true;
let toggleColor;

toggleLight.addEventListener('click', function () {
    toggleColor=darkTheme?darkColor:lightColor;
    console.log(darkTheme);
    handleRoot('--main-color').set(toggleColor.main);
    handleRoot('--body-bg').set(toggleColor.bodyBg);
    handleRoot('--txt-color').set(toggleColor.textColor);

    darkTheme=!darkTheme;   
})
