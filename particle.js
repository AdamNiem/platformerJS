//min and max are both inclusive
function randInt(min, max){
    return Math.floor((Math.random() * ((max+1) - min)+min));
}
//min inclusive and max exclusive
function randFloat(min, max){
    return (Math.random() * ((max+1) - min)+min);
}

class Particle {
    constructor(x, y, life, velX = randFloat(-20,20), velY = randFloat(-50,-35), opacityRate, rgb = [255,255,255]){
        this.x = x;
        this.y = y;
        this.velX = velX;
        this.velY = velY;
        this.life = life;
        this.opacityRate = opacityRate;
        this.rgb = rgb.toString();
    }
    update(i, list){
        this.velX *= Math.pow(friction.x, deltaTime);
        this.velY *= Math.pow(friction.y, deltaTime);

        this.velY += gravity.y * deltaTime;
        this.velX += gravity.x * deltaTime;

        this.x += this.velX * deltaTime;
        this.y += this.velY * deltaTime;

        this.life -= 1 * deltaTime;

        if(this.life <= 0){
            list.splice(i, 1);
        }
    }
    draw(ctx, vx = viewport.x, vy = viewport.y){
        //vx and vy is the viewport offset
       // alert(this.rgb.toString());
        ctx.fillStyle = "rgba(" + this.rgb + "," + (this.life/this.opacityRate) + ")";
        ctx.fillRect(this.x - vx, this.y - vy, 10, 10);
    }
}

class ParticleEngine {
    constructor(){
        this.particles = [];
        this.pLife = 100; //50 game ticks
        this.pSize = 10; //pixels
        this.pSpeed = 5; //Added to velocity
        this.p; //for iterating as the reference for the current obj
    }

    createParticleSplash(x, y, numP, pVelX = {min:-10, max:10}, pVelY = {min:-10, max: 10}, pLife = 100, pSize = 10, opacityRate = 100, rgb = [255, 255, 255]){
        let z;
        for(z = 0; z < numP; z++){
            this.particles.push(new Particle(
                x, 
                y, 
                pLife, 
                randFloat(pVelX.min, pVelX.max), 
                randFloat(pVelY.min, pVelY.max),
                opacityRate,
                rgb
            ));
        }
    }

    updateAndDraw(ctx){
        let x;
        for(x = 0; x < this.particles.length; x++){
            this.p = this.particles[x];
            this.p.update(x, this.particles);
            this.p.draw(ctx);
        }       
    }

}