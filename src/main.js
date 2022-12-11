import "phaser";

class RoundedCardWithShadow extends Phaser.GameObjects.Container {
  constructor(scene, x, y, width, height) {
    super(scene);
    const offset = 2;

    const card = new Phaser.GameObjects.Graphics(scene);
    card.fillStyle(0xffffff);
    card.fillRoundedRect(0, 0, width, height, 12);
    // this.setAlpha(0);

    const shadow = new Phaser.GameObjects.Graphics(scene);
    shadow.fillStyle(0x01122c);
    shadow.fillRoundedRect(offset * -1, offset, width + offset * 2, height, 12);
    shadow.setAlpha(0.1);
    // this.setAlpha(0);

    this.add([shadow, card]);
    this.setPosition(x, y);

    scene.add.existing(this);
  }
}

class Demo extends Phaser.Scene {
  constructor() {
    super({
      key: "card-example"
    });
  }

  create() {
    const widthDiff = 15;

    // Space between the card and the next one underneath
    const heightAddition = 10;
    const cardWidth = 600;
    const cardHeight = 300;

    // First card transition speed
    const cardInitialTransitionSpeed = 800;

    // Background card transition speed
    const bgCardSpeed = 150;

    // Ease string
    const ease = "Quint";

    const bgCard4 = new RoundedCardWithShadow(
      this,
      100 + (widthDiff * 4) / 2,
      500,
      cardWidth - widthDiff * 4,
      cardHeight
    );
    bgCard4.setAlpha(0);
    bgCard4.setDepth(1);

    const bgCard3 = new RoundedCardWithShadow(
      this,
      100 + (widthDiff * 3) / 2,
      500,
      cardWidth - widthDiff * 3,
      cardHeight
    );
    bgCard3.setAlpha(0);
    bgCard3.setDepth(1);

    const bgCard2 = new RoundedCardWithShadow(
      this,
      100 + (widthDiff * 2) / 2,
      500,
      cardWidth - widthDiff * 2,
      cardHeight
    );
    bgCard2.setAlpha(0);
    bgCard2.setDepth(1);

    const bgCard1 = new RoundedCardWithShadow(
      this,
      100 + widthDiff / 2,
      500,
      cardWidth - widthDiff,
      cardHeight
    );
    bgCard1.setAlpha(0);
    bgCard1.setDepth(1);

    const card = new RoundedCardWithShadow(
      this,
      100,
      600,
      cardWidth,
      cardHeight
    );
    card.setAlpha(0);
    card.setDepth(100);

    this.tweens.add({
      duration: cardInitialTransitionSpeed,
      ease: ease,
      targets: card,
      alpha: 1,
      y: 120,
      onComplete: () => {
        this.tweens.add({
          duration: bgCardSpeed,
          ease: ease,
          targets: bgCard1,
          alpha: 1,
          y: 120 + heightAddition,
          onComplete: () => {
            this.tweens.add({
              duration: bgCardSpeed,
              ease: ease,
              targets: bgCard2,
              alpha: 1,
              y: 120 + heightAddition * 2,
              onComplete: () => {
                this.tweens.add({
                  duration: bgCardSpeed,
                  ease: ease,
                  targets: bgCard3,
                  alpha: 1,
                  y: 120 + heightAddition * 3,
                  onComplete: () => {
                    this.tweens.add({
                      duration: bgCardSpeed,
                      ease: ease,
                      targets: bgCard4,
                      alpha: 1,
                      y: 120 + heightAddition * 4
                    });
                  }
                });
              }
            });
          }
        });
      }
    });
  }
}

var config = {
  type: Phaser.AUTO,
  scene: Demo,
  parent: "content",
  backgroundColor: "#001E4D",
  width: window.innerWidth,
  height: window.innerHeight
};

const game = new Phaser.Game(config);
// game.resize(window.innerWidth, window.innerHeight);
