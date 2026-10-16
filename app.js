// -----------------------------------
// GSAP
// -----------------------------------

gsap.registerPlugin(ScrollTrigger);

// -----------------------------------
// HERO ANIMATION
// -----------------------------------

gsap.from(".hero-title", {
    opacity: 0,
    y: 120,
    duration: 1.5,
    ease: "power3.out"
});

gsap.from(".hero-content p", {
    opacity: 0,
    y: 50,
    duration: 1.5,
    delay: 0.3,
    ease: "power2.out"
});

// -----------------------------------
// COUNTERS
// -----------------------------------

document.querySelectorAll(".counter").forEach(counter => {

    const target = parseInt(
        counter.dataset.value || 0
    );

    const obj = {
        value: 0
    };

    gsap.to(obj, {

        value: target,

        duration: 2.5,

        ease: "power2.out",

        scrollTrigger: {
            trigger: counter,
            start: "top 80%"
        },

        onUpdate: () => {

            counter.textContent =
                Math.floor(obj.value)
                .toLocaleString("es-CL");

        }

    });

});

// -----------------------------------
// SVG ROUTES
// -----------------------------------

gsap.to(".route", {

    strokeDashoffset: 0,

    duration: 3,

    stagger: 0.35,

    ease: "power2.inOut",

    scrollTrigger: {
        trigger: ".world",
        start: "top 70%"
    }

});

// -----------------------------------
// BENCHMARK CARDS
// -----------------------------------

gsap.from(".card", {

    opacity: 0,

    y: 80,

    duration: 1,

    stagger: 0.20,

    scrollTrigger: {
        trigger: ".cards",
        start: "top 80%"
    }

});

// -----------------------------------
// PHONE 3D
// -----------------------------------

const phone =
document.getElementById("phone");

if(phone){

    window.addEventListener(
        "mousemove",
        (e) => {

            const x =
            ((e.clientX / window.innerWidth) - 0.5) * 20;

            const y =
            ((e.clientY / window.innerHeight) - 0.5) * 15;

            gsap.to(phone, {

                rotationY: x,

                rotationX: -y,

                transformPerspective: 1000,

                duration: 1

            });

        }
    );

}

// -----------------------------------
// FADE SECTIONS
// -----------------------------------

gsap.utils
.toArray("section")
.forEach(section => {

    gsap.from(section, {

        opacity: 0,

        y: 60,

        duration: 1,

        scrollTrigger: {

            trigger: section,

            start: "top 85%"

        }

    });

});

// -----------------------------------
// RADAR PARTICLES
// -----------------------------------

const canvas =
document.getElementById("radar");

if(canvas){

    const ctx =
    canvas.getContext("2d");

    function resizeCanvas(){

        canvas.width =
        window.innerWidth;

        canvas.height =
        window.innerHeight;

    }

    resizeCanvas();

    window.addEventListener(
        "resize",
        resizeCanvas
    );

    const particles = [];

    const particleCount = 150;

    for(let i=0;i<particleCount;i++){

        particles.push({

            x:
            Math.random() * window.innerWidth,

            y:
            Math.random() * window.innerHeight,

            vx:
            (Math.random()-0.5) * 0.4,

            vy:
            (Math.random()-0.5) * 0.4

        });

    }

    function drawRadar(){

        ctx.clearRect(
            0,
            0,
            canvas.width,
            canvas.height
        );

        particles.forEach(p=>{

            p.x += p.vx;
            p.y += p.vy;

            if(p.x > canvas.width)
                p.x = 0;

            if(p.x < 0)
                p.x = canvas.width;

            if(p.y > canvas.height)
                p.y = 0;

            if(p.y < 0)
                p.y = canvas.height;

            ctx.beginPath();

            ctx.arc(
                p.x,
                p.y,
                1.5,
                0,
                Math.PI * 2
            );

            ctx.fillStyle =
            "#E0B96B";

            ctx.fill();

        });

        requestAnimationFrame(
            drawRadar
        );

    }

    drawRadar();

}

// -----------------------------------
// PARALLAX HERO
// -----------------------------------

window.addEventListener(
    "scroll",
    () => {

        const hero =
        document.querySelector(".hero");

        if(hero){

            hero.style.backgroundPositionY =
            `${window.scrollY * 0.4}px`;

        }

    }
);
