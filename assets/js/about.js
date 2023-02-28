// scroll effect 
const  effectObserve=(Element,classEffect='effect')=>{
    const options={
        root:null,
        threshold:0,
        rootMargin: '0px',
    }
    const objserveCallback=(entries,observe)=>{
        const [entry]=entries;
        if(entry.isIntersecting){
            Element.classList.add(classEffect);
            observe.unobserve(Element);
        }
        // }else{
        //     Element.classList.remove(classEffect);
        // }
       
    }
    const observe=new IntersectionObserver(objserveCallback,options);
    observe.observe(Element);
}
//effect info
effectObserve(document.querySelector('.info'))
// effect info cart
document.querySelectorAll('.info__more--cart')
.forEach(el=>effectObserve(el))
//skill effect
document.querySelectorAll('.skill__item')
.forEach(el=>effectObserve(el))

document.querySelectorAll('.resume__box--item')
.forEach(el=>effectObserve(el))
window.addEventListener('load',()=>{
    document.documentElement.scrollIntoView();
})

// lazy loading

const lazyLoading=(ImgElement)=>{
    if(ImgElement.dataset.src){
        const options={
            root:null,
            threshold:0.9,
            rootMargin:'0px'
        }
        const callBack=(entries,obsever)=>{
            const [entry]=entries;
          if(entry.isIntersecting){
            console.log('focus');
            ImgElement.src=ImgElement.dataset.src;
            ImgElement.addEventListener('load',()=>{
                ImgElement.classList.remove('lazy__loading');
                obsever.unobserve(ImgElement)
            })
          }
        }
    const imageObserve=new IntersectionObserver(callBack,options);
    imageObserve.observe(ImgElement)
    }
}
document.querySelectorAll('img[data-src]').forEach(img=>lazyLoading(img));

