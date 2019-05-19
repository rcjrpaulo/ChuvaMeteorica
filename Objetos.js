class Nave {
    constructor() {
        this.position = width / 2;
        this.velocity = 0;
        this.maxVelocity = 8;
        this.friction = 0.75;
        this.size = 50;
        this.speed = 5;
    }

    exibir() {
        stroke(20);
        strokeWeight(4);
        fill(255, 255, 255);
        ellipse(this.position, height - this.size, this.size);
        noStroke();
        fill(130, 230, 255);
        ellipse(this.position - this.size * 0.2, height - this.size * 1.2, this.size * 0.3);
        fill(130, 230, 255);
        ellipse(this.position - this.size * 0.2, height - this.size * 1.2, this.size * 0.2);
    }

    atualizar() {
        this.position += this.velocity;
        this.position = constrain(this.position, this.size, width - this.size);
        this.velocity += predicaoAtual * this.speed;
        this.velocity *= this.friction;
        this.velocity = constrain(this.velocity, -this.maxVelocity, this.maxVelocity);
    }
}

class Meteoro {
    constructor() {
        this.size = random(50, 120);
        this.position = createVector(random(this.size / 2, width - this.size / 2), -this.size);
        this.velocity = createVector(random(-3, 3), random(1, 3));    
    }

    exibir() {
        fill(180, 180, 180);
        stroke(120, 120, 120);
        strokeWeight(10);
        ellipse(this.position.x, this.position.y, this.size);
    }

    atualizar() {
        this.position.add(this.velocity);
        if (this.position.x < this.size / 2 || this.position.x > width - this.size / 2) {
            this.velocity.x *= -1;
        }
        if (this.position.y > height + this.size) {
            numDesvios += 1;
            if (numDesvios > maiorPontuacao) {
                maiorPontuacao = numDesvios;
            }
            select('#info').html(numDesvios + ' meteoros desviados. Maior pontuação: ' + maiorPontuacao);
            
            this.size = random(50, 120);
            this.position = createVector(random(this.size / 2, width - this.size / 2), -this.size);
            let velocidadeX = random(-3, 3);
            let velocidadeY = random(1, 3);
            // Aqui incrementa a velocidade máxima final do meteoro conforme vai passando por meteoros
            if (numDesvios > 9) {
                let valorDinamicoVelocidadeMeteoro = 3+(numDesvios/10);
                velocidadeX = random(-3, valorDinamicoVelocidadeMeteoro);
                velocidadeY = random(1, valorDinamicoVelocidadeMeteoro);
            }
            this.velocity = createVector(velocidadeX, velocidadeY);
        }
    }

    colidiu(nave) {
        const d2 = sq(nave.position - this.position.x) + sq(height - nave.size - this.position.y);
        const threshold = sq(nave.size * 0.5) + sq(this.size * 0.5);
        return (d2 < threshold);
    }
}

class Estrela {
    constructor() {
        this.position = createVector(random(width), random(height));
        this.velocity = random(1, 5);
        this.color = random(50, 255);
    }

    exibir() {
        stroke(this.color, this.color, 255);
        strokeWeight(1);
        point(this.position.x, this.position.y);
    }

    atualizar() {
        this.position.y += this.velocity;
        if (this.position.y > height) {
            this.position = createVector(random(width), 0);
            this.velocity = random(1, 5);
            this.color = random(50, 255);
        }
    }
}

function criarEstrelas() {
    estrelas = [];
    for (let i = 0; i < 100; i++) {
        estrelas.push(new Estrela());
    }
}