function gameOver() {
    background(0);

    // Desenha e atualiza estrelas
    estrelas.forEach((estrela) => {
        estrela.exibir();
        estrela.atualizar();
    });

    // Desenha nave
    nave.exibir();
    
    // Desenha meteoros
    meteoros.forEach((meteor) => {
        meteor.exibir();
    });
    
    textAlign(CENTER);
    textSize(64);
    fill(255);
    stroke(255, 0, 0);
    text('VOCÊ PERDEU', width / 2, height / 2);
}