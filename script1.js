const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let ParticleArray = [];
let numberOfParticle = 30;
ctx.lineCap = 'round'

window.addEventListener('resize',function () {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
   

});

const mouse = {
    x:null,
    y:null
}
window.addEventListener('mousemove',function (e) {
    mouse.x = e.x;
    mouse.y = e.y;
})

let grd = ctx.createLinearGradient(0,0,0,canvas.height);
grd.addColorStop(0,'purple');
grd.addColorStop(0.7,'pink');
grd.addColorStop(1,'rgba(255,255,255,0.1)');

class Particle{
    constructor(){
        this.radius = Math.random()*100 + 10;
        this.x = Math.random()*canvas.width;//mouse.x;
        this.y = Math.random()*canvas.height;//mouse.y;
        //this.radius = Math.random()*55 +10;
        this.speedY = -(Math.random()*3+1.5);
        this.speedX = Math.random()*3-1.5;
        this.angle = Math.random()*360;
        this.spin = Math.random() < 0.5 ? 1 : -1;
    }
    update(){
        this.angle += 5;
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.radius > 1) {
            this.radius -= 0.5;
        }

    }
    draw(){
        ctx.save();
        ctx.translate(this.x,this.y);
        ctx.rotate(this.angle*Math.PI/360*this.spin);
        ctx.fillStyle = 'white';
        //ctx.fillRect(0-this.radius/2,0-this.radius/2,this.radius,this.radius);  
        ctx.font = this.radius+'px serif';
        ctx.fillText("\u{2764}", 0-this.radius/2+5,10);
        ctx.stroke();
        ctx.fill(); 
        ctx.translate(-this.x,-this.y);
        ctx.restore();
    }
}
function init() {
    for (let i = 0; i < numberOfParticle; i++) {
       ParticleArray.push(new Particle());
    }
}
init();
function animate() {
    ctx.clearRect(0,0,canvas.width,canvas.height);
    if (ParticleArray.length < numberOfParticle) {
       ParticleArray.push(new Particle()); 
    }
   
    for (let i = 0; i < ParticleArray.length; i++) {
        if (ParticleArray[i].radius <= 1 ){
            ParticleArray.splice(i,1);
        }
       ParticleArray[i].draw();
       ParticleArray[i].update();
        
    }
    requestAnimationFrame(animate);
    connect();
    //triangle();
}
animate();

function connect() {
    for (let i = 0; i < ParticleArray.length; i++) {
        ctx.strokeStyle = grd;
        ctx.lineWidth = ParticleArray[i].radius/15;
        ctx.beginPath();
        ctx.moveTo(ParticleArray[i].x,ParticleArray[i].y);
        ctx.lineTo(270,150);
        ctx.stroke();
        ctx.closePath();
        
    }
}
function triangle() {
        ctx.beginPath();
        ctx.moveTo(0,canvas.height);
        ctx.lineTo(mouse.x,mouse.y);
        ctx.lineTo(canvas.width,canvas.height);
        ctx.fillStyle = grd;
        ctx.closePath();
        ctx.fill();
        

}