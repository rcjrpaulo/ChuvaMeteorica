// Game state variable: Training 0, Game 1, Game over 2
let gameState = 0;

// Input da Webcam e  modelo de regressao
let video;
let regressor;
let predicaoAtual = 0;

// Buttons
let botaoPraEsquerda, botaoNaoMover, botaoPraDireita, trainButton;

// Game variables
let numDesvios;
let maiorPontuacao = 0;
let nave, meteoros, estrelas;

function setup() {
    const canvas = createCanvas(640, 480);
    background(0);
    noStroke(30);
    select('#canvas').child(canvas);
    
    // Camera
    video = createCapture(VIDEO, () => {
        console.log('Video carregou');
    });
    video.hide();

    // Load model
    const mobileNet = ml5.featureExtractor('MobileNet', () => {
        console.log('MobileNet carregou');
    });
    regressor = mobileNet.regression(video, () => {
        console.log('Modelo carregou');
    })

    // Buttons
    const buttonDiv = select('#buttons');
    
    botaoPraEsquerda = createButton('Mover para a esquerda');
    botaoPraEsquerda.parent(buttonDiv);
    botaoPraEsquerda.mouseClicked(() => {
        regressor.addImage(-1)
    });
    
    botaoNaoMover = createButton('Sem movimento');
    botaoNaoMover.parent(buttonDiv);
    botaoNaoMover.mouseClicked(() => {
        regressor.addImage(0)
    });
    
    botaoPraDireita = createButton('Mover para a direita');
    botaoPraDireita.parent(buttonDiv);
    botaoPraDireita.mouseClicked(() => {
        regressor.addImage(1)
    });

    trainButton = createButton('Começar');
    select('#train').child(trainButton);
    trainButton.mouseClicked(() => {
        select('#info').html('Carregando... Por favor, aguarde');
        regressor.train((loss) => {
            if (loss === null) {
                console.log("Pronto");
                setInterval(atualizarPredicao, 200);
                mudaEstado(1);
            }
            console.log(loss);
        });
    });

    mudaEstado(0);
}

function keyPressed() {
    if (key === ' ' && gameState === 2) {
        mudaEstado(1);
    }
}

function draw() {
    if (gameState === 0) {
        treinarRede();
    }
    if (gameState === 1) {
        gameLoop();
    }
    if (gameState === 2) {
        gameOver();
    }
}

function mudaEstado(state) {
    gameState = state;
    
    if (state === 0) {

        var labelInformacao = 'Fique na posição desejada em frente a camêra e clique no comando que quer que seja'
            +' usado para tal posição.';

        select('#info').html(labelInformacao);
        select('#buttons').show();
        select('#train').show();
    } else {
        select('#buttons').hide();
        select('#train').hide();
    }

    if (state === 1) {
        numDesvios = 0;
        nave = new Nave();
        meteoros = [new Meteoro()];
        criarEstrelas();
        select('#info').html('0 meteoros desviados. Maior pontuação: ' + maiorPontuacao);
    }

    if (state === 2) {
        select('#info').html('Aperte a barra de espaço para reiniciar o jogo');
    }
}