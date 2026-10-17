const scenes = document.querySelectorAll(".scene");

let currentScene = 0;

/* =====================================
   MOSTRAR ESCENA
===================================== */

function showScene(index) {

    scenes.forEach(scene => {
        scene.classList.remove("active");
    });

    scenes[index].classList.add("active");

    runAnimation(index);
}

/* =====================================
   CONTADORES
===================================== */

function animateCounter(element, target) {

    element.textContent = "0";

    const counter = {
        value: 0
    };

    gsap.to(counter, {
        value: target,
        duration: 2,
        ease: "power2.out",

        onUpdate: () => {
            element.textContent =
                Math.floor(counter.value)
                .toLocaleString("es-CL");
        }
    });
}

/* =====================================
   ANIMACIONES POR ESCENA
===================================== */

function runAnimation(index) {

    switch (index) {

        case 0:

            gsap.from("#scene1 h1", {
                opacity: 0,
                y: 40,
                duration: 0.8
            });

            gsap.from("#scene1 p", {
                opacity: 0,
                y: 20,
                duration: 0.8,
                delay: 0.2
            });

            const heroVideo = document.querySelector(".hero-video");

            if (heroVideo) {
                gsap.fromTo(
                    heroVideo,
                    {
                        scale: 1
                    },
                    {
                        scale: 1.08,
                        duration: 3,
                        ease: "none"
                    }
                );
            }

            break;

        case 1:

            const counterNacional =
                document.getElementById("counterNacional");

            const counterInternacional =
                document.getElementById("counterInternacional");

            if (counterNacional) {
                animateCounter(counterNacional, 18000000);
            }

            if (counterInternacional) {
                animateCounter(counterInternacional, 11000000);
            }

            break;

        case 2:

            gsap.from(".overlay-text", {
                opacity: 0,
                y: 40,
                duration: 0.8
            });

            const worldMap =
                document.querySelector(".world-map");

            if (worldMap) {

                gsap.fromTo(
                    worldMap,
                    {
                        scale: 1.08,
                        x: -20
                    },
                    {
                        scale: 1,
                        x: 0,
                        duration: 3,
                        ease: "power1.out"
                    }
                );

            }

            break;

        case 3:

            gsap.from("#scene4 h1", {
                opacity: 0,
                y: 50,
                duration: 1
            });

            break
