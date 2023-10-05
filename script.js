const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

class Dot {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * 3 + 1;
        this.speedX = Math.random() * 3 - 1.5;
        this.speedY = Math.random() * 3 - 1.5;
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.size > 0.2) this.size -= 0.1;
    }

    draw() {
        ctx.fillStyle = '#FFF';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
    }
}

let dotsArray = [];
function handleDots() {
    for (let i = 0; i < dotsArray.length; i++) {
        dotsArray[i].update();
        dotsArray[i].draw();

        for (let j = i; j < dotsArray.length; j++) {
            const dx = dotsArray[i].x - dotsArray[j].x;
            const dy = dotsArray[i].y - dotsArray[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            if (distance < 100) {
                ctx.strokeStyle = 'white';
                ctx.lineWidth = 0.2;
                ctx.beginPath();
                ctx.moveTo(dotsArray[i].x, dotsArray[i].y);
                ctx.lineTo(dotsArray[j].x, dotsArray[j].y);
                ctx.stroke();
            }
        }

        if (dotsArray[i].size <= 0.2) {
            dotsArray.splice(i, 1);
            i--;
        }
    }
}

window.addEventListener('mousemove', function(event) {
    let mouseX = event.x;
    let mouseY = event.y;
    dotsArray.push(new Dot(mouseX, mouseY));
    handleDots();
});

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    handleDots();
    requestAnimationFrame(animate);
}

animate();
