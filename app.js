gsap.registerPlugin(ScrollTrigger);

// HERO

gsap.from(".hero-title",{

    opacity:0,
    y:100,

    duration:1.6

});

// CONTADORES

document
.querySelectorAll(".counter")
.forEach(counter=>{

const end =
parseInt(counter.dataset.value);

const value = {
    count:0
};

gsap.to(value,{

    count:end,

    duration:3,

    ease:"power2.out",

    scrollTrigger:{
        trigger:counter,
        start:"top 80%"
    },

    onUpdate:()=>{

        counter.innerHTML =
        Math.floor(value.count)
        .toLocaleString("es-CL");

    }

});

});

// RUTAS

gsap.to(".route",{

    strokeDashoffset:0,

    duration:2,

    stagger:.3,

    scrollTrigger:{
        trigger:".world",
        start:"top 70%"
    }

});

// CARDS

gsap.from(".card",{

    opacity:0,
    y:80,

    stagger:.2,

    duration:1,

    scrollTrigger:{
        trigger:".cards",
        start:"top 80%"
    }

});

// PHONE 3D

const phone =
