import createGame, { GameStage } from './core/Game';
import getGameInfo from './info/GameInfo';

const gameInfo = getGameInfo();

const game = createGame();

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

document.addEventListener('keydown', ev => {
    if(ev.key === 'F2' && game.stage !== GameStage.RUNNING) {        
        game.init();
        game.start();
    }
});