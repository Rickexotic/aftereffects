const scenes = document.querySelectorAll(".scene");

let currentScene = 0;

function showScene(index){

    scenes.forEach(scene=>{
        scene.classList.remove("active");
    });

    scenes[index].classList.add("active");

    runAnimation(index);
}

function animateCounter(element,target){

    const counter = {
        value:0
    };

    gsap.to(counter,{
        value:target,
        duration:1.8,
        ease:"power2.out",

        onUpdate(){

            element.textContent =
                Math.floor(counter.value)
                .toLocaleString("es-CL");

        }
    });

}

function runAnimation(index){

    

    switch(index){

        case 0:

            gsap.from("#scene1 h1",{
                y:120,
                opacity:0,
                duration:.8
            });

            gsap.from("#scene1 p",{
                y:60,
                opacity:0,
                delay:.4,
                duration:1,
            });

            break;

        case 1:

            document.getElementById("counterNacional").textContent = "0";
            document.getElementById("counterInternacional").textContent = "0";

            animateCounter(
                document.getElementById("counterNacional"),
                18000000
            );

            animateCounter(
                document.getElementById("counterInternacional"),
                11000000
            );

            break;

        case 2:

            gsap.fromTo(
                ".world-map",
                {
                    scale:1.15
                },
                {
                    scale:1,
                    duration:1,
                    ease:"power1.out"
                }
            );

            gsap.from(".overlay-text",{
                y:50,
                opacity:0,
                duration:1,
            });

            break;

        case 3:

            gsap.from("#scene4 h1",{
                scale:.8,
                opacity:0,
                duration:1,
            });

            break;

        case 4:

            gsap.from("#scene5 h1",{
                y:80,
                opacity:0,
                duration:1,
            });

            gsap.from("#scene5 h2",{
                scale:.7,
                opacity:0,
                delay:.4,
                duration:.8
            });

            break;

    }

}

showScene(0);

const timeline = gsap.timeline({
    repeat:-1
});

timeline

.to({},{
    duration:2.2,
    onComplete:()=>showScene(1)
})

.to({},{
    duration:2.2,
    onComplete:()=>showScene(2)
})

.to({},{
    duration:2.2,
    onComplete:()=>showScene(3)
})

.to({},{
    duration:2.2,
    onComplete:()=>showScene(4)
})

.to({},{
    duration:2.2,
    onComplete:()=>showScene(0)
});
