/*--------------- navigation menu ----------------- */
(() => {
    const hamburgerBtn = document.querySelector(".hamburger-btn"),
    navMenu = document.querySelector(".nav-menu"),
    closeNavBtn = navMenu.querySelector(".close-nav-menu");

    hamburgerBtn.addEventListener("click", showNavMenu);
    closeNavBtn.addEventListener("click", hideNavMenu);

    function showNavMenu(){
        navMenu.classList.toggle("open");
        fadeOutEffect();
    }

    function hideNavMenu(){
        navMenu.classList.remove("open");
        fadeOutEffect();
        bodyScrollingToggle();
    }

    function fadeOutEffect(){
        document.querySelector(".fade-out-effect").classList.add("active");
        bodyScrollingToggle();
        setTimeout(() => {
            document.querySelector(".fade-out-effect").classList.remove("active");
        }, 300);
    }

    /*----------- attach an event handler to document  ---------- */
    document.addEventListener("click", (event) =>{
        if(event.target.classList.contains('link-item')){
            // make sure event.target.hash has a value before overridding default behavior
            if(event.target.hash !== ""){
                // prevemnt defaul anchor click behavior 
                event.preventDefault();
                const hash = event.target.hash;
                // deactivate existing active 'section'
                document.querySelector(".section.active").classList.add(".hide");
                document.querySelector(".section.active").classList.remove("active");
                // active new 'section';
                document.querySelector(hash).classList.add("active");
                document.querySelector(hash).classList.remove("hide");
                // deactivate existing active navigation menu 'link-item'
                navMenu.querySelector(".active").classList.add("outer-shadow", "hover-in-shadow");
                navMenu.querySelector(".active").classList.remove("active", "inner-shadow");
                // if clicked 'link-item' is contained within the navigation menu 
                if(navMenu.classList.contains("open")){
                    // activate new navigation menu 'link-item'
                    event.target.classList.add("active", "inner-shadow");
                    event.target.classList.remove("outer-shadow", "hover-in-shadow");
                    // hide navigation manu 
                    hideNavMenu();
                }
                else{
                    let navItems = navMenu.querySelectorAll(".link-item");
                    navItems.forEach((item) =>{
                        if(hash === item.hash){
                            // activate new navigation menu 'link-item'
                            item.classList.add("active", "inner-shadow");
                            item.classList.remove("inner-shadow", "hover-in-shadow");
                        }
                    })
                    fadeOutEffect();
                }
                // add hash (#) to url 
                window.location.hash = hash;
            }
        }
    })
})();

// about tab 
(() => {
    const aboutSection = document.querySelector(".about-section"),
    tabsContainer = document.querySelector(".about-tabs");

    tabsContainer.addEventListener("click", (event) => {
        if(event.target.classList.contains("tab-item") && !event.target.classList.contains("active")){
            const target = event.target.getAttribute("data-target");
            tabsContainer.querySelector(".active").classList.remove("outer-shadow", "active");
            event.target.classList.add("active", "outer-shadow")
            aboutSection.querySelector(".tab-content.active").classList.remove("active");
            aboutSection.querySelector(target).classList.add("active");
        }
    })
    
})();

function bodyScrollingToggle() {
    // document.body.classList.toggle("stop-scrolling");
}

/* --------------- portfolio filter and popup ----------------- */
(() => {
    const filterContainer = document.querySelector(".portfolio-filter"),
    portfolioItemsContainer = document.querySelector(".portfolio-items"),
    portfolioItems = document.querySelectorAll(".portfolio-item"),
    popup = document.querySelector(".portfolio-popup"),
    preBtn = popup.querySelector(".pp-pre"),
    nextBtn = popup.querySelector(".pp-next"),
    closeBtn = popup.querySelector(".pp-close"),
    projectDetailsContainer = popup.querySelector(".pp-details"),
    project_details = popup.querySelector(".pp-project-details"),
    projectDetailsBtn = popup.querySelector(".pp-project-details-btn");
    let itemIndex, slideIndex, screenshots;

    /* filter portfolio items */
    filterContainer.addEventListener("click", (event) => {
        if(event.target.classList.contains("filter-item") &&
        !event.target.classList.contains("active")){
            // deactivate existing active 'filter-item' 
            filterContainer.querySelector(".active").classList.remove("outer-shadow", "active");
            // active new `filter item'
            event.target.classList.add("active", 'outer-shadow');

            const target = event.target.getAttribute("data-target");
            portfolioItems.forEach((item) =>{
                if(target === item.getAttribute("data-category") || target === 'all'){
                    item.classList.remove("hide");
                    item.classList.add("show");
                }
                else{
                    item.classList.remove("show");
                    item.classList.add("hide");
                }
            })
        }
    
    })

    portfolioItemsContainer.addEventListener("click", (event) =>{
        if(event.target.closest(".portfolio-item-inner")){
            const portfolioItem = event.target.closest(".portfolio-item-inner").parentElement;
            // get the portfolio items index 
            itemIndex = Array.from(portfolioItem.parentElement.children).indexOf(portfolioItem);
            screenshots = portfolioItems[itemIndex].querySelector(".portfolio-item-image img").getAttribute("data-screenshots");
            // convert screenshots into array 
            screenshots = screenshots.split(",");
            if(screenshots.length === 1 ){
                preBtn.style.display = "none";
                nextBtn.style.display ="none";
            }
    
            else{
                preBtn.style.display = "block";
                nextBtn.style.display ="block";
            }
            slideIndex = 0;
            popupToggle();
            popupSlideshow();
            popupDetails();
        }
        
    })

    closeBtn.addEventListener("click", () =>{
        popupToggle();
        if(projectDetailsContainer.classList.contains("active")){
            popupDetailsToggle();
        }
    })

    function popupToggle() {
        popup.classList.toggle("open");
        bodyScrollingToggle();
    }

    function popupSlideshow() {
        const imgSrc = screenshots[slideIndex]
        const popupImg = popup.querySelector(".pp-img");
        /**
         * active loader until the popupImg loaded 
         */

        popup.querySelector(".pp-loader").classList.add("active");
        popupImg.src = imgSrc;
        popupImg.onload = () =>{
            popup.querySelector(".pp-loader").classList.remove("active");
        }
        let last_num = Number( screenshots.length);
        last_num-1;
        popup.querySelector(".pp-counter").innerHTML = (slideIndex + 1 ) + " of " + last_num;


    }

    function sendmail(){

    }

    function popupDetails(){
        if(!portfolioItems[itemIndex].querySelector(".portfolio-item-details")){
            projectDetailsBtn.style.display = "none";
            popup.querySelector(".pp-details").style.maxHeight = "0px";
            popup.querySelector(".pp-details").classList.remove("active");
            projectDetailsBtn.querySelector("i").classList.add("fa-plus");
            return;
        }
        else{
            projectDetailsBtn.style.display = "block";
            // projectDetailsContainer.style.maxHeight = projectDetailsContainer.scrollHeight + "px";
        }

        const details = portfolioItems[itemIndex].querySelector(".portfolio-item-details").innerHTML;
        project_details.innerHTML = details;

        const title = portfolioItems[itemIndex].querySelector(".portfolio-item-title").innerHTML;
        popup.querySelector(".pp-title h2").innerHTML = title;

        const category = portfolioItems[itemIndex].getAttribute("data-category");
        popup.querySelector(".pp-project-category").innerHTML = category.split("-").join(" ");

    }

    // next slide 
    nextBtn.addEventListener("click", () =>{
        if(slideIndex === screenshots.length-1){
            slideIndex = 0;
        }
        else{
            slideIndex++;
        }
        popupSlideshow();
    })

    // pre slide
    preBtn.addEventListener("click", () =>{
        if(slideIndex === 0){
            slideIndex = screenshots.length-1
        }
        else{
            slideIndex--;
        }
        popupSlideshow();
    })

    projectDetailsBtn.addEventListener("click", () =>{
        popupDetailsToggle();
    })

    function popupDetailsToggle(){
        if(projectDetailsContainer.classList.contains("active")){
            projectDetailsBtn.querySelector("i").classList.remove("fa-minus");
            projectDetailsBtn.querySelector("i").classList.add("fa-plus");

            popup.querySelector(".pp-details").classList.remove("active");
            popup.querySelector(".pp-details").style.maxHeight = "0px";
        }
        else{
            projectDetailsBtn.querySelector("i").classList.remove("fa-plus");
            projectDetailsBtn.querySelector("i").classList.add("fa-minus");

            projectDetailsContainer.style.maxHeight = projectDetailsContainer.scrollHeight + "px";
            popup.querySelector(".pp-details").classList.add("active");
            popup.scrollTo(0, projectDetailsContainer.offsetTop)
        }
    }
    

    /* --------------- hide all section expect active ----------------- */
    
})();

// (() =>{
//     const section = document.querySelectorAll(".section");
//     section.forEach((section) => {
//         if(!section.classList.contains("active")){
//             section.classList.add("hide");
//         }
//     })
// })();

window.addEventListener("load", () =>{
    // preload
    document.querySelector(".preloader").classList.add("fade-out");
    setTimeout(() =>{
        document.querySelector(".preloader").style.display = "none";
    }, 600)
})







// Custom Cursor

{
  // Some help functions.
  const shuffleArray = arr => arr.sort(() => Math.random() - 0.5);
  const lineEq = (y2, y1, x2, x1, currentVal) => {
      let m = (y2 - y1) / (x2 - x1); 
      let b = y1 - m * x1;
      return m * currentVal + b;
  };
  const lerp = (a, b, n) => (1 - n) * a + n * b;
  const body = document.body;
  const bodyColor = getComputedStyle(body).getPropertyValue('--color-bg').trim() || 'white';
  const getMousePos = (e) => {
      let posx = 0;
      let posy = 0;
      if (!e) e = window.event;
      if (e.pageX || e.pageY) {
          posx = e.pageX;
          posy = e.pageY;
      }
      else if (e.clientX || e.clientY) 	{
          posx = e.clientX + body.scrollLeft + document.documentElement.scrollLeft;
          posy = e.clientY + body.scrollTop + document.documentElement.scrollTop;
      }
      return { x : posx, y : posy }
  }

  // Window sizes.
  let winsize;
  const calcWinsize = () => winsize = {width: window.innerWidth, height: window.innerHeight};
  calcWinsize();
  // Recalculate window sizes on resize.
  window.addEventListener('resize', calcWinsize);

  // Custom mouse cursor.
  class CursorFx {
      constructor(el) {
          this.DOM = {el: el};
          this.DOM.dot = this.DOM.el.querySelector('.cursor__inner--dot');
          this.DOM.circle = this.DOM.el.querySelector('.cursor__inner--circle');
          this.bounds = {dot: this.DOM.dot.getBoundingClientRect(), circle: this.DOM.circle.getBoundingClientRect()};
          this.scale = 1;
          this.opacity = 1;
          this.mousePos = {x:0, y:0};
          this.lastMousePos = {dot: {x:0, y:0}, circle: {x:0, y:0}};
          this.lastScale = 1;
          this.lastOpacity = 1;
          
          this.initEvents();
          requestAnimationFrame(() => this.render());
      }
      initEvents() {
          window.addEventListener('mousemove', ev => this.mousePos = getMousePos(ev));
      }
      render() {
          this.lastMousePos.dot.x = lerp(this.lastMousePos.dot.x, this.mousePos.x - this.bounds.dot.width/2, 1);
          this.lastMousePos.dot.y = lerp(this.lastMousePos.dot.y, this.mousePos.y - this.bounds.dot.height/2, 1);
          this.lastMousePos.circle.x = lerp(this.lastMousePos.circle.x, this.mousePos.x - this.bounds.circle.width/2, 0.15);
          this.lastMousePos.circle.y = lerp(this.lastMousePos.circle.y, this.mousePos.y - this.bounds.circle.height/2, 0.15);
          this.lastScale = lerp(this.lastScale, this.scale, 0.15);
          this.lastOpacity = lerp(this.lastOpacity, this.opacity, 0.1);
          this.DOM.dot.style.transform = `translateX(${(this.lastMousePos.dot.x)}px) translateY(${this.lastMousePos.dot.y}px)`;
          this.DOM.circle.style.transform = `translateX(${(this.lastMousePos.circle.x)}px) translateY(${this.lastMousePos.circle.y}px) scale(${this.lastScale})`;
          this.DOM.circle.style.opacity = this.lastOpacity
          requestAnimationFrame(() => this.render());
      }
      enter() {
          cursor.scale = 2.7;
      }
      leave() {
          cursor.scale = 1;
      }
      click() {
          this.lastScale = 1;
          this.lastOpacity = 0;
      }
  }
  
  const cursor = new CursorFx(document.querySelector('.cursor'));

  // Custom cursor chnages state when hovering on elements with 'data-hover'.
  [...document.querySelectorAll('[data-hover]')].forEach((link) => {
      link.addEventListener('mouseenter', () => cursor.enter() );
      link.addEventListener('mouseleave', () => cursor.leave() );
      link.addEventListener('click', () => cursor.click() );
  });
}
