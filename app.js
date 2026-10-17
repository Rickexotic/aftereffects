const scenes = *ocument.querySelectorAll(".scene")*

let current = 0;

function showS*ene(index){

    scenes.forEach(sc*ne=>{
        scene.classList.remo*e("active");
    });

    scenes[i*dex].classList.add("active");

   *animateScene(index);
}

function n*xtScene(){

    current++;

    if*current >= scenes.length){
       *current = 0;
    }

    showScene(*urrent);

}

setInterval(nextScene* 6000);

function animateScene(ind*x){

    if(index === 0){

       *gsap.from("#scene1 h1",{
         *  y:100,
            opacity:0,
  *         duration:1.5
        });
*        gsap.from("#scene1 p",{
  *         opacity:0,
            de*ay:.4,
            duration:1.5
  *     });

    }

    if(index === *){

        animateCounter(
      *     document.getElementById("coun*erNacional"),
            18000000*        );

        animateCounter*
            document.getElementBy*d("counterInternacional"),
       *    11000000
        );

    }

  * if(index === 2){

        gsap.fr*m(".world-map",{
            scale*1.3,
            opacity:0,
      *     duration:5
        });

     *  gsap.from(".overlay-text",{
    *       y:100,
            opacity:*,
            duration:2
        }*;

    }

    if(index === 3){

  *     gsap.from("#scene4 h1",{
    *       scale:.5,
            opaci*y:0,
            duration:2
      * });

    }

    if(index === 4){
*        gsap.from("#scene5 h1",{
 *          y:80,
            opacit*:0,
            duration:1.5
     *  });

        gsap.from("#scene5 *2",{
            opacity:0,
      *     scale:.5,
            delay:.*,
            duration:2
        }*;

    }

}

function animateCount*r(element,target){

    gsap.fromT*(
        element,
        {innerT*xt:0},
        {
            inner*ext:target,
            duration:4*
            snap:{innerText:1},
 *          ease:"power2.out",

    *       onUpdate:function(){
      *         element.innerHTML =
     *          Math.floor(
            *   Number(element.innerHTML))
    *           .toLocaleString("es-CL"*;
            }
        }
    );

*

showScene(0);
