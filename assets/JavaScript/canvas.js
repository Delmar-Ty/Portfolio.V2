const canvas = document.querySelector('#canvas');
const c = canvas.getContext('2d');
canvas.width = innerWidth;
canvas.height = innerHeight;

const resize = () => {
    canvas.width = innerWidth;
    canvas.height = innerHeight;
}

addEventListener('resize', resize);

const mouse = {
    x: innerWidth / 2,
    y: innerHeight / 2
}

const updateMouse = (e) => {
    mouse.x = e.x;
    mouse.y = e.y;
}

addEventListener('mousemove', updateMouse);

const rand = (min, max) => {
    return Math.round(Math.random() * (max - min) + min);
}

class Trail {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.lastMouse = {
            x: x,
            y: y
        }
        this.update = () => {
            const lastPoint = {
                x: this.x,
                y: this.y
            }

            this.lastMouse.x += (mouse.x - this.lastMouse.x) * 0.25;
            this.lastMouse.y += (mouse.y - this.lastMouse.y) * 0.25;

            this.x = this.lastMouse.x;
            this.y = this.lastMouse.y;
            this.animate(lastPoint);
        }
        this.animate = (lastPoint) => {
            c.beginPath();
            c.strokeStyle = 'white';
            c.lineWidth = 1;
            c.lineCap = 'round';
            c.moveTo (lastPoint.x, lastPoint.y);
            c.lineTo(this.x, this.y);
            c.stroke();
            c.closePath();
        }
    }
}

const trail = new Trail(mouse.x, mouse.y);

let count = 0;

const animate = () => {

    if (count > 20) {
        c.fillStyle = 'rgba(0, 0, 0, 0.2)';
        c.fillRect(0, 0, canvas.width, canvas.height);
        count = 0;
    }
    
    c.fillStyle = 'rgba(0, 0, 0, 0.05)';
    c.fillRect(0, 0, canvas.width, canvas.height);

    trail.update();
    requestAnimationFrame(animate);
    count++;
}

animate();