import { SVG_NS, KEYS } from '../settings';
import Board from './Board';
import Paddle from './Paddle';
import Ball from './Ball';
import Score from './Score';
import Net from './Net';
import Win from './Win';



export default class Game {

	constructor(element, width, height) {
		this.element = element;
		this.width = width;
		this.height = height;
		this.gameElement = document.getElementById(this.element);
		
		this.extraBalls = [];
		this.extraBalls = [];
		this.board = new Board(this.width, this.height);
		this.paddleWidth = 8;
		this.paddleHeight = 50;
		this.boardGap = 10;
		this.netWidth = 0;
		this.netHeight = this.height;
		
    	this.player1 = new Paddle(
		  this.height,
		  this.paddleWidth,
		  this.paddleHeight,
		  this.boardGap,
		  ((this.height - this.paddleHeight) / 2),
		  KEYS.w,
		  KEYS.s,
		 
		  
		  'player1'
		);

		this.player2 = new Paddle(
			this.height,
			this.paddleWidth,
			this.paddleHeight,
			(this.width - this.paddleWidth - this.boardGap),
			((this.height - this.paddleHeight) / 2),
			KEYS.up,
			KEYS.down,
			
			'player2'
		  );

		this.ball = new Ball(
			15,
			this.width,
			this.height,
		);
	

	
		this.net1 = new Net(
			this.netWidth,
			this.netHeight
			
		); 

		this.net2 = new Net(
			this.width,
			this.netHeight
			
		); 
		
		

		

		

		document.addEventListener('keydown', event => {
    
			switch (event.key){
			  case KEYS.spaceBar:
			  this.pause = !this.pause;
			  break;
			}
		
		});

		document.addEventListener('keydown', event => {
    
			switch (event.key){
			  case KEYS.g:

				this.extraBalls.push(new Ball(15, this.width, this.height));
					break;
				}
			
				
			});


	this.winScreen = new Win(this.width, this.height);

	this.score1 = new Score(this.width / 2 - 50, 30, 30);
	this.score2 = new Score(this.width / 2 + 25, 30, 30);
	this.winScreen = new Win(this.width, this.height);
		

	} // end of the constructor


	makeBall(){
		new Ball(15, 200, 200);
	  }

	render() {
		
		
	

		if (this.pause){
			return;
		  }

		this.gameElement.innerHTML = '';
		let svg = document.createElementNS(SVG_NS, 'svg');
		svg.setAttributeNS(null, 'width', this.width);
		svg.setAttributeNS(null, 'height', this.height);
		svg.setAttributeNS(null, 'viewBox', `0 0 ${this.width} ${this.height}`);
		

		this.board.render(svg);
		this.net1.render(svg);
		this.net2.render(svg);
		this.player1.render(svg);
		this.player2.render(svg);
		let myPlayer1 = this.player1;
		let myPlayer2 = this.player2;
		this.extraBalls.forEach(function(el){
			el.render(svg, this.player1, this.player2);
		}, this);
		this.ball.render(svg,this.player1,this.player2);
		this.score1.render(svg, this.player1.score);
		this.score2.render(svg, this.player2.score);

		if(this.player1.score === 10 || this.player2.score === 10) {
			this.winScreen.render(svg);
			this.pause = true; 
			
			
			
			document.addEventListener('keydown', event2 => {
				switch(event2.key) {
					case KEYS.enter:
					this.player1.score = 0;
					this.player2.score = 0;
					this.pause = false;
					this.ball.reset();
					
				
				}
			})
	
	
		
		}



		// 

		this.gameElement.appendChild(svg);


		
	}

}