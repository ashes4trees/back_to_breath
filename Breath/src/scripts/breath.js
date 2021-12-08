// const canvas2 = document.querySelector('#canvas2');
// canvas2.width = 50;
// canvas2.height = 300;
// const ctx = canvas2.getContext('2d');
    

class Breath {

    constructor(ctx) {
        this.pos = [25, 276];
        this.vel = 2.5;
        this.ctx = ctx;
        this.width = 50;
        this.height = 300;
        this.radius = 24
        // this.draw();
        // this.update(); 
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
        if (this.pos[1] - this.radius < 0) {
            this.vel = -this.vel;
        }
        if (this.pos[1] + this.radius > this.height ) {
            this.vel = -this.vel
        }
            this.pos[1] -= this.vel;
    }

    moveLoop() {
        const that = this;
        setInterval(this.move.bind(this), 40);
    }

}

export default Breath;


