function treinarRede() {
    // Mostra a imagem da webcam
    translate(width, 0);
    scale(-1.0, 1.0);
    image(video, 0, 0, width, height);
}

function atualizarPredicao() {
    regressor.predict((err, camInput) => {
        if (err) {
            console.log('Error: ' + err);
        }
        predicaoAtual = camInput;
    });
}