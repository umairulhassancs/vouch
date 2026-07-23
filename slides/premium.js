(function(){
const deck=document.getElementById('deck'),slides=deck.querySelectorAll('.sl'),total=slides.length;
let cur=0;
const cn=document.getElementById('cn'),ct=document.getElementById('ct'),prog=document.getElementById('prog');
ct.textContent=String(total).padStart(2,'0');

function go(i){if(i<0||i>=total)return;slides[cur].classList.remove('on');cur=i;slides[cur].classList.add('on');
cn.textContent=String(cur+1).padStart(2,'0');prog.style.width=((cur+1)/total*100)+'%';}

function scale(){const s=Math.min(innerWidth/1920,innerHeight/1080);
deck.style.transform='scale('+s+')';deck.style.transformOrigin='center center';}

slides[0].classList.add('on');prog.style.width=(1/total*100)+'%';scale();
addEventListener('resize',scale);

document.addEventListener('keydown',function(e){
if(e.key==='ArrowRight'||e.key==='ArrowDown'||e.key===' '){e.preventDefault();go(cur+1);}
else if(e.key==='ArrowLeft'||e.key==='ArrowUp'){e.preventDefault();go(cur-1);}
else if(e.key==='f'||e.key==='F'){document.fullscreenElement?document.exitFullscreen():document.documentElement.requestFullscreen();}
else if(e.key==='Home'){e.preventDefault();go(0);}
else if(e.key==='End'){e.preventDefault();go(total-1);}
});

document.getElementById('pb').addEventListener('click',function(){go(cur-1);});
document.getElementById('nb').addEventListener('click',function(){go(cur+1);});

let tx=0;
deck.addEventListener('touchstart',function(e){tx=e.changedTouches[0].screenX;},{passive:true});
deck.addEventListener('touchend',function(e){const d=e.changedTouches[0].screenX-tx;if(Math.abs(d)>60){d<0?go(cur+1):go(cur-1);}},{passive:true});

// ── PARTICLE SYSTEM ──
const canvas=document.getElementById('particles'),ctx=canvas.getContext('2d');
let W,H,particles=[];
function resize(){W=canvas.width=innerWidth;H=canvas.height=innerHeight;}
resize();addEventListener('resize',resize);

function Particle(){
this.x=Math.random()*W;this.y=Math.random()*H;
this.r=Math.random()*2+.5;this.vx=(Math.random()-.5)*.3;this.vy=(Math.random()-.5)*.3;
this.alpha=Math.random()*.4+.1;
this.color=Math.random()>.5?'139,92,246':'196,181,253';
}
Particle.prototype.draw=function(){
ctx.beginPath();ctx.arc(this.x,this.y,this.r,0,Math.PI*2);
ctx.fillStyle='rgba('+this.color+','+this.alpha+')';ctx.fill();
ctx.shadowBlur=this.r*4;ctx.shadowColor='rgba('+this.color+','+this.alpha*.5+')';
};
Particle.prototype.update=function(){
this.x+=this.vx;this.y+=this.vy;
if(this.x<0)this.x=W;if(this.x>W)this.x=0;
if(this.y<0)this.y=H;if(this.y>H)this.y=0;
};

for(let i=0;i<80;i++)particles.push(new Particle());
function animate(){
ctx.clearRect(0,0,W,H);
particles.forEach(function(p){p.update();p.draw();});
// Draw connections
for(let i=0;i<particles.length;i++){
for(let j=i+1;j<particles.length;j++){
const dx=particles[i].x-particles[j].x,dy=particles[i].y-particles[j].y;
const dist=Math.sqrt(dx*dx+dy*dy);
if(dist<120){ctx.beginPath();ctx.moveTo(particles[i].x,particles[i].y);
ctx.lineTo(particles[j].x,particles[j].y);
ctx.strokeStyle='rgba(139,92,246,'+(1-dist/120)*.08+')';ctx.lineWidth=.5;ctx.stroke();}
}}
requestAnimationFrame(animate);
}
animate();

// ── 3D TILT on cards ──
document.querySelectorAll('.gc').forEach(function(card){
card.addEventListener('mousemove',function(e){
const rect=card.getBoundingClientRect();
const x=(e.clientX-rect.left)/rect.width-.5;
const y=(e.clientY-rect.top)/rect.height-.5;
card.style.transform='perspective(800px) rotateY('+x*8+'deg) rotateX('+(-y*8)+'deg) translateY(-6px) scale(1.02)';
});
card.addEventListener('mouseleave',function(){
card.style.transform='';
});
});
})();
