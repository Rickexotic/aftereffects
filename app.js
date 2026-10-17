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
        duration:1.2,
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

            // entrada lateral por CSS

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
                    scale:1.1
                },
                {
                    scale:1,
                    duration:.6,
                    ease:"power1.out"
                }
            );


            break;

        case 3:


            break;

        case 4:


            break;

    }

}

showScene(0);

const timeline = gsap.timeline({
    repeat:-1
});

timeline

.to({},{
    duration:1.8,
    onComplete:()=>showScene(1)
})

.to({},{
    duration:1.8,
    onComplete:()=>showScene(2)
})

.to({},{
    duration:1.8,
    onComplete:()=>showScene(3)
})

.to({},{
    duration:1.8,
    onComplete:()=>showScene(4)
})

.to({},{
    duration:1.8,
    onComplete:()=>showScene(0)
});
