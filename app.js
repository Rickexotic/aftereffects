const scenes = document.querySelectorAll(".scene");

let currentScene = 0;
let countersAnimated = false;

//------------------------------------------------

function showScene(index){

    scenes.forEach(scene=>{
        scene.classList.remove("active");
    });

    scenes[index].classList.add("active");

    animateScene(index);

}

//------------------------------------------------

function animateCounter(element,target){

    let counter = {value:0};

    gsap.to(counter,{
        value:target,
        duration:4,
        ease:"power2.out",

        onUpdate(){

            element.textContent =
            Math.floor(counter.value)
            .toLocaleString("es-CL");

        }
    });

}

//------------------------------------------------

function animateScene(index){

    if(index===0){

        gsap.from("#scene1 h1",{
            opacity:0,
            y:80,
            duration:1.5
        });

        gsap.from("#scene1 p",{
            opacity:0,
            y:40,
            delay:.4,
            duration:1.2
        });

    }

    if(index===1){

        if(!countersAnimated){

            countersAnimated = true;

            animateCounter(
                document.getElementById("counterNacional"),
                18000000
            );

            animateCounter(
                document.getElementById("counterInternacional"),
                11000000
            );

        }

    }

    if(index===2){

        gsap.from(".world-map",{
            scale:1.2,
            opacity:0,
            duration:3
        });

        gsap.from(".overlay-text",{
            y:60,
            opacity:0,
            duration:2
        });

    }

    if(index===3){

        gsap.from("#scene4 h1",{
            opacity:0,
            scale:.8,
            duration:2
        });

    }

    if(index===4){

        gsap.from("#scene5 h1",{
            opacity:0,
            y:60,
            duration:1.5
        });

        gsap.from("#scene5 h2",{
            opacity:0,
            scale:.7,
            delay:.5,
            duration:1.5
        });

    }

}

//------------------------------------------------

showScene(0);

const master = gsap.timeline({
    repeat:-1
});

master
.to({}, {duration:6, onComplete:()=>showScene(1)})
.to({}, {duration:6, onComplete:()=>showScene(2)})
.to({}, {duration:6, onComplete:()=>showScene(3)})
.to({}, {duration:6, onComplete:()=>showScene(4)})
.to({}, {duration:6, onComplete:()=>showScene(0)});
