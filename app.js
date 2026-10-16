gsap.registerPlugin(ScrollTrigger);

document.querySelectorAll(".counter").forEach(counter=>{

let endValue =
parseInt(counter.dataset.value);

gsap.to(counter,{

innerText:endValue,

duration:3,

snap:{
innerText:1
},

scrollTrigger:{
trigger:counter,
start:"top 80%"
}

});

});

gsap.to(".route",{

strokeDashoffset:0,

duration:3,

stagger:.4,

scrollTrigger:{
trigger:".world",
start:"top 70%"
}

});

gsap.from(".card",{

opacity:0,
y:100,

duration:1.2,

stagger:.2,

scrollTrigger:{
trigger:".cards",
start:"top 75%"
}

});

gsap.from(".hero-title",{

opacity:0,
y:150,

duration:2

});

const phone =
document.getElementById("phone");

window.addEventListener(
"mousemove",
e=>{

const x =
(e.clientX/window.innerWidth-.5)*20;

const y =
(e.clientY/window.innerHeight-.5)*20;

gsap.to(phone,{

rotationY:x,
rotationX:-y,

duration:1

});

}
);

const canvas =
document.getElementById("radar");

const ctx =
canvas.getContext("2d");

function resize(){

canvas.width=
window.innerWidth;

canvas.height=
window.innerHeight;

}

resize();

window.addEventListener(
"resize",
resize
);

const particles=[];

for(let i=0;i<120;i++){

particles.push({

x:Math.random()*canvas.width,
y:Math.random()*canvas.height,

vx:(Math.random()-0.5)*0.3,
vy:(Math.random()-0.5)*0.3

});

}

function animate(){

ctx.clearRect(
0,
0,
canvas.width,
canvas.height
);

particles.forEach(p=>{

p.x+=p.vx;
p.y+=p.vy;

if(p.x<0)p.x=canvas.width;
if(p.x>canvas.width)p.x=0;

if(p.y<0)p.y=canvas.height;
if(p.y>canvas.height)p.y=0;

ctx.beginPath();

ctx.arc(
p.x,
p.y,
1.5,
0,
Math.PI*2
);

ctx.fillStyle="#E0B96B";

ctx.fill();

});

requestAnimationFrame(
animate
);

}

animate();
