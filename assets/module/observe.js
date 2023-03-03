// scroll effect
const effectObserve = (Element, classEffect = "effect") => {
    const options = {
      root: null,
      threshold: 0,
      rootMargin: "0px",
    };
    const objserveCallback = (entries, observe) => {
      const [entry] = entries;
      if (entry.isIntersecting) {
        Element.classList.add(classEffect);
        observe.unobserve(Element);
      }
      // }else{
      //     Element.classList.remove(classEffect);
      // }
    };
    const observe = new IntersectionObserver(objserveCallback, options);
    observe.observe(Element);
  };

// lazy loading observe
const lazyLoading = (ImgElement) => {
    if (ImgElement.dataset.src) {
      const options = {
        root: null,
        threshold: 0.9,
        rootMargin: "0px",
      };
      const callBack = (entries, observe) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          ImgElement.src = ImgElement.dataset.src;
          ImgElement.addEventListener("load", () => {
            ImgElement.classList.remove("lazy__loading");
            observe.unobserve(ImgElement);
          });
        }
      };
      const imageObserve = new IntersectionObserver(callBack, options);
      imageObserve.observe(ImgElement);
    }
  };
  export {effectObserve,lazyLoading}