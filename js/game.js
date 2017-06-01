import { render } from './util/render';
import { input } from './util/input';
import { animation } from './util/animation';
import { movement } from './util/movement';
import { physics } from './util/physics';

import Mario from './entities/mario';
import Goomba from './entities/goomba';
import Koopa from './entities/koopa';

// TODO: enemy deaths. better hitboxes. bricks/coins. mushrooms growing. damage. mario death
// create random spawns. endless. design 'blocks' to spawn. speed increases!
// distance measure. score


class Game {
  init() {
    const canvasEl = document.getElementById('game-canvas');
    const ctx = canvasEl.getContext('2d');
    ctx.scale(3, 3);

    const canvas = {
      canvas: canvasEl,
      ctx: ctx
    };

    const backgroundMusic =
      new Audio('./assets/audio/music/underground_theme.mp3');
    backgroundMusic.loop = true;

    const spriteSheet = new Image();
    spriteSheet.src = './assets/sprites/spritesheet.png';

    spriteSheet.addEventListener('load', () => {

      const data = {
        animationFrame: 0,
        spriteSheet: spriteSheet,
        canvas: canvas,
        control: true
      };

      const mario = new Mario(spriteSheet, 30, 0, 16, 16);
      const goomba = new Goomba(spriteSheet, 100, 0, 16, 16);
      const koopa = new Koopa(spriteSheet, 200, 0, 16, 24);

      // backgroundMusic.play();
      input.init(data);

      data.entities = {};
      data.entities.mario = mario;
      data.entities.goombas = [goomba];
      data.entities.koopas = [koopa];

      window.data = data;

      render.init(data);
      this.run(data);
    });
  }

  run(data) {
    const loop = () => {
      input.update(data);
      animation.update(data);
      movement.update(data);
      physics.update(data);

      this.updateView(data);
      render.update(data);

      data.animationFrame++;
      window.requestAnimationFrame(loop);
    };

    loop();
  }

  updateView(data) {
    const wrapper = document.getElementById('wrapper');
    wrapper.scrollLeft += 1.3;
  }
}

const game = new Game;
game.init();
