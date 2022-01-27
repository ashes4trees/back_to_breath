

class Breath {

    constructor(ctx) {
        this.pos = [25, 276];
        this.vel = 2.5;
        this.ctx = ctx;
        this.width = 50;
        this.height = 300;
        this.radius = 24;
        this.moveLoop();
    }

    draw() {
      
        this.ctx.beginPath();
        this.ctx.arc(this.pos[0], this.pos[1], this.radius, 0, 2 * Math.PI, false);
        this.ctx.closePath();
        this.ctx.fillStyle = "#18633b";
        this.ctx.fill();
    }

    move() {
        this.ctx.clearRect(0, 0, this.width, this.height);
        this.draw();
        const prompt = document.querySelector('#prompt');
        if (this.pos[1] - this.radius < 0) {
            this.vel = -this.vel;
            prompt.innerHTML = 'out...';
            // prompt.style.left = '3.5%';
            // prompt.style.fontSize = '18px';
        }
        if (this.pos[1] + this.radius > this.height ) {
            this.vel = -this.vel
            prompt.innerHTML = '  in...'
            // prompt.style.left = '4%';
            // prompt.style.fontSize = '20px';
        }
            this.pos[1] -= this.vel;
    }

    moveLoop() {
        const that = this;
        setInterval(this.move.bind(this), 50);
    }

}

export default Breath;


