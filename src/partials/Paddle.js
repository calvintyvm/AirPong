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

    left(){
      // this.y = this.y - this.speed;
     this.x = Math.max(0,this.x - this.speed);
     
  }    
  right(){
      // this.y = this.y + this.speed;
      this.x = Math.min(this.x + this.speed, this.boardHeight - this.height);
  }


  right1(){
    // this.y = this.y - this.speed;
   
    this.x = Math.min(this.x + this.speed, 500);
   
  }    
  left1(){
    // this.y = this.y + this.speed;
    this.x = Math.max(this.boardHeight + 23,this.x - this.speed);
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
      let circle = document.createElementNS(SVG_NS, 'circle');
      circle.setAttributeNS(null,'fill','red'),
      circle.setAttributeNS(null,'r',30),
      circle.setAttributeNS(null,'cx',this.x),
      circle.setAttributeNS(null,'cy',this.y);

        // Player movement
    if (this.keyState['w'] && this.player === 'player1') {
      this.up();

    }
    if (this.keyState['s'] && this.player === 'player1') {
      this.down();
    }
    if (this.keyState['a'] && this.player === 'player1') {
      this.left();
    }
    if (this.keyState['d'] && this.player === 'player1') {
      this.right();
    }
    if (this.keyState['ArrowUp'] && this.player === 'player2') {
      this.up();
    }
    if (this.keyState['ArrowDown'] && this.player === 'player2') {
      this.down();
    }

    if (this.keyState['ArrowRight'] && this.player === 'player2') {
      this.right1();
    }
    if (this.keyState['ArrowLeft'] && this.player === 'player2') {
      this.left1();
    }
   
        svg.appendChild(circle);

    }

  }