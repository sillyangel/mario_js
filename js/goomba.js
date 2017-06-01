import Entity from './entity';
import Sprite from './sprite';

class Goomba extends Entity {
  constructor(img, xPos, yPos, width, height) {
    const sprite = new Sprite(img, 115, 5, 16, 16);
    super('goomba', sprite, xPos, yPos, width, height);

    let self = this;
    this.squishSound = new Audio('./assets/audio/sounds/stomp.wav');

    this.spriteAnimations = {
      walking: {
        frames: [
          new Sprite(img, 115, 5, 16, 16),
          new Sprite(img, 131, 5, 16, 16)
        ],
        currentFrame: 0
      },
      death: new Sprite(147, 5, 16, 16)
    };

    this.states = {
      walking: {
        movement(data) {
          if (self.direction === 'left') {
            self.xPos -= self.velX;
          } else {
            self.xPos += self.velX;
          }
        },
        animation(data) {
          if (data.animationFrame % 5 === 0) {
            self.sprite = self.spriteAnimations.walking.
              frames[self.spriteAnimations.walking.currentFrame];

            self.spriteAnimations.walking.currentFrame++;

            if (self.spriteAnimations.walking.currentFrame > 1) {
              self.spriteAnimations.walking.currentFrame = 0;
            }
          }
        }
      },
      dead: {
        movement(data) {
          this.velX = 0;
        },
        animation(data) {
          this.sprite = this.spriteAnimations.death;
        }
      }
    };

    this.currentState = this.states.walking;
    this.direction = 'left';
    this.velY = 0;
    this.velX = -2;
    this.xPos = xPos;
    this.yPos = yPos;
    this.width = width;
    this.height = height;
  }
}

export default Goomba;


// locations
//
// <object id="139" x="512" y="176" width="16" height="16"/>
//   <object id="140" x="672" y="176" width="16" height="16"/>
//   <object id="141" x="832" y="176" width="16" height="16"/>
//   <object id="142" x="2768" y="176" width="16" height="16"/>
//   <object id="143" x="560" y="176" width="16" height="16"/>
//   <object id="148" x="1920" y="176" width="16" height="16"/>