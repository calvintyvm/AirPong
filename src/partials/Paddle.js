import { SVG_NS } from '../settings';


export default class Paddle {
    constructor(boardHeight, width, height, x, y,up,down,player) {
      this.boardHeight = boardHeight;
      this.width = width;
      this.height = height;
      this.x = x;
      this.y = y;
      this.speed = 10;
      this.score = 0;
      
      
    // document.addEventListener('keydown', event => {
    //         switch (event.key) {
    //           case up:
    //             this.up();
    //             break;
    //           case down:
    //             this.down();
    //             break;
    //         }
    //       });
    this.player = player;
    this.keyState = {};
    document.addEventListener('keydown', event => {
      this.keyState[event.key || event.which] = true;
    }, true);
    document.addEventListener('keyup', event => {
      this.keyState[event.key || event.which] = false;
    }, true);
        } // constructor

     
    up(){
        // this.y = this.y - this.speed;
       this.y = Math.max(0,this.y - this.speed);
       
    }    
    down(){
        // this.y = this.y + this.speed;
        this.y = Math.min(this.y + this.speed, this.boardHeight - this.height);
    }

     coordinates(x, y, width, height) {
      let leftX = x;
      let rightX = x + width;
      let topY = y;
      let bottomY = y + height;
      return [leftX, rightX, topY, bottomY];
    }

    //Render SVG images

    render(svg){
        let rect = document.createElementNS(SVG_NS, 'rect');
        rect.setAttributeNS(null,'fill','black');
        rect.setAttributeNS(null,'height',this.height);
        rect.setAttributeNS(null,'width',this.width);
        rect.setAttributeNS(null, 'x', this.x);
        rect.setAttributeNS(null, 'y', this.y);

        // Player movement
    if (this.keyState['a'] && this.player === 'player1') {
      this.up();
    }
    if (this.keyState['z'] && this.player === 'player1') {
      this.down();
    }
    if (this.keyState['ArrowUp'] && this.player === 'player2') {
      this.up();
    }
    if (this.keyState['ArrowDown'] && this.player === 'player2') {
      this.down();
    }

        svg.appendChild(rect);

    }

  }