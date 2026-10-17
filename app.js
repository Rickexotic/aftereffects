const scenes = document.querySelectorAll(".scene");

function showScene(index){

    scenes.forEach(scene=>{
        scene.classList.remove("active");
    });

    scenes[index].classList.add("active");

    runAnimation(index);

}

/* ======================
   CONTADOR
====================== */

function animateCounter(element,target){

    element.textContent = "0";

    let counter = {
        value:0
    };

    gsap.to(counter,{
        value:target,
        duration:2.5,
        ease:"power2.out",

        onUpdate(){

            element.textContent =
                Math.floor(counter.value)
                .toLocaleString("es-CL");

        }
    });

}

/* ======================
   ESCENAS
====================== */

function runAnimation(index){

*   switch(index){

        case 0:*
            gsap.fromTo(
        *       ".hero-video",
            *   {
                    scale:1
 *              },
                {*                    scale:1.08,
  *                 duration:3.5,
   *                ease:"none"
      *         }
            );

       *    gsap.from("#scene1 h1",{
     *          opacity:0,
             *  y:50,
                duration:.*
            });

            gsap*from("#scene1 p",{
               *opacity:0,
                y:20,
 *              delay:.2,
          *     duration:.8
            });

*           break;

        case 1:*
            animateCounter(
     *          document.getElementById(*counterNacional"),
               *18000000
            );

         *  animateCounter(
                *ocument.getElementById("counterInt*rnacional"),
                11000*00
            );

            gsa*.from("#scene2",{
                *pacity:0,
                duration*.6
            });

            br*ak;

        case 2:

            *sap.fromTo(
                ".worl*-map",
                {
         *          scale:1.08,
            *       x:-30
                },
  *             {
                   *scale:1,
                    x:0,
*                   duration:3,
   *                ease:"power1.out"
*               }
            );

 *          gsap.from(".overlay-text*,{
                opacity:0,
    *           y:40,
                d*ration:.8
            });

       *    break;

        case 3:

            gsap.from("#scene4 h1",{
                opacity:0,
                y:50,
                duration:1
            });

            break;

        case 4:

            gsap.from("#scene5 h1",{
                opacity:0,
                y:50,
                duration:.8
            });

            gsap.from("#scene5 h2",{
                opacity:0,
                y:30,
                duration:.8,
                delay:.25
            });

            break;
    }
}

/* ======================
   INICIO
====================== */

showScene(0);

/* ======================
   TIMELINE
====================== */

const master = gsap.timeline({
    repeat:-1
});

master

.to({},{
    duration:3.5,
    onComplete:()=>showScene(1)
})

.to({},{
    duration:3.5,
    onComplete:()=>showScene(2)
})

.to({},{
    duration:3.5,
    onComplete:()=>showScene(3)
})

.to({},{
    duration:3.5,
    onComplete:()=>showScene(4)
})

.to({},{
    duration:3.5,
    onComplete:()=>showScene(0)
});
