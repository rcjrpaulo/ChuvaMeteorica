function gameLoop() {
    background(0);

    // Desenha e atualiza estrelas
    estrelas.forEach((estrela) => {
        estrela.exibir();
        estrela.atualizar();
    });

    // Desenha e atualiza nave
    nave.exibir();
    nave.atualizar();

    // Desenha e atualiza meteoro
    meteoros.forEach((meteoro) => {
        meteoro.exibir();
        meteoro.atualizar();
        if (meteoro.colidiu(nave)) {
            mudaEstado(2);
            return
        }
    });

    if (random() < 0.0001 || frameCount % 3600 === 0) {
        meteoros.push(new Meteoro());
    }
}