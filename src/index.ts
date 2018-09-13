import createGame, { GameStage } from './core/Game';
import getGameInfo from './info/GameInfo';

const canvasWrap = <HTMLDivElement>document.querySelector('.canvas-wrap');
const canvas = <HTMLCanvasElement>document.getElementById('canvas');

// restart on orientation change
const resizeCanvas = () => {
    const square = Math.min(800, Math.min(window.innerWidth, window.innerHeight));
    canvasWrap.style.top = ((window.innerHeight - square) / 2) + 'px';
    canvasWrap.style.width = square + 'px';
    canvasWrap.style.height = square + 'px';
    canvas.style.width = square + 'px';
    canvas.style.height = square + 'px';
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

const gameInfo = getGameInfo();

const game = createGame(canvas);

game.events.on('paused', data => {
    gameInfo.paused(data.paused);
});
game.events.on('frame-done', data => {
    gameInfo.updateScore(data.score);
    gameInfo.updateLives(data.lives);
});
game.events.on('stage-changed', data => {
    if(data.stage === GameStage.READY) {
        gameInfo.ready();
    } else if(data.stage === GameStage.RUNNING) {
        gameInfo.running();
    } else if(data.stage === GameStage.FINISHED) {
        let highScore = parseInt(localStorage.getItem('high-score'));
        if(isNaN(highScore) || (!isNaN(highScore) && game.score > highScore)) {
            highScore = game.score;
            localStorage.setItem('high-score', highScore + '');
        }
    
        gameInfo.finished(highScore, game.score);
    }
});

game.init();

const gameStart = () => {
    if(game.stage !== GameStage.RUNNING) {        
        game.init();
        game.start();
    }
};

document.addEventListener('keydown', gameStart);
document.addEventListener('touchend', gameStart);