function hide(el: HTMLElement) {
    el.classList.remove('show');
}

function show(el: HTMLElement) {
    el.classList.add('show');
}

class GameInfoImpl {
    el: {
        ready: HTMLElement,
        running: HTMLElement,
        finished: HTMLElement,
    } = {
        ready: document.getElementById('ready'),
        running: document.getElementById('running'),
        finished: document.getElementById('finished'),
    }

    text = {
        lives: document.getElementById('lives') as HTMLElement,
        score: document.getElementById('score') as HTMLElement,
        ammo: document.getElementById('ammo') as HTMLElement,
        finalScore: document.getElementById('final-score') as HTMLElement,
        highScore: document.getElementById('high-score') as HTMLElement,
    }

    updateScore(score: number) {
        this.text.score.textContent = score + '';
    }

    updateLives(lives: number) {
        this.text.lives.textContent = lives + '';
    }

    updateAmmo(ammo: number) {
        this.text.ammo.textContent = ammo + '';
    }

    paused(paused: boolean) {
        
    }

    ready() {
        this.hideAll();
        show(this.el.ready);
    }

    running() {
        this.hideAll();
        show(this.el.running);
    }

    finished(highScore: number, finalScore: number) {
        this.text.finalScore.textContent = finalScore + '';
        this.text.highScore.textContent = highScore + '';
        this.hideAll();
        show(this.el.finished);
    }

    hideAll() {
        hide(this.el.ready);
        hide(this.el.running);
        hide(this.el.finished);       
    }
}

const gameInfo = new GameInfoImpl();

export default function getGameInfo() {
    return gameInfo;
};

export interface GameInfo extends GameInfoImpl {};