const scenes = document.querySelectorAll(".scene");

let currentScene = 0;

function showScene(index){

    scenes.forEach(scene=>{
        scene.classList.remove("active");
    });

    scenes[index].classList.add("active");

    runAnimation(index);
}

const reducedMotion =
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function animateCounter(element,target){

    if(reducedMotion){
        element.textContent = target.toLocaleString("es-CL");
        return;
    }

    const counter = {
        value:0
    };

    gsap.to(counter,{
        value:target,
        duration:1.0,
        ease:"power2.out",

        onUpdate(){

            element.textContent =
                Math.floor(counter.value)
                .toLocaleString("es-CL");

        }
    });

}

function splitWords(root){

    let i = 0;

    function walk(node){

        Array.from(node.childNodes).forEach(child=>{

            if(child.nodeType === Node.TEXT_NODE){

                const frag = document.createDocumentFragment();

                child.textContent.split(/(\s+)/).forEach(part=>{

                    if(!part){ return; }

                    if(/^\s+$/.test(part)){
                        frag.appendChild(document.createTextNode(" "));
                        return;
                    }

                    const w = document.createElement("span");
                    w.className = "word";
                    w.style.setProperty("--i", i++);
                    w.textContent = part;
                    frag.appendChild(w);

                });

                child.replaceWith(frag);

            }else if(child.nodeType === Node.ELEMENT_NODE){
                walk(child);
            }

        });

    }

    walk(root);
}

document.querySelectorAll('[data-reveal="words"]').forEach(splitWords);

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
    duration:2.0,
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
    duration:2.8,
    onComplete:()=>showScene(4)
})

.to({},{
    duration:1.8,
    onComplete:()=>showScene(0)
});
