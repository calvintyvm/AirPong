import { SVG_NS } from '../settings';

export default class Win {
  constructor(width, height) {
    this.boardWidth = width;
    this.boardHeight = height;
  }

  render(svg) {
    let text = document.createElementNS(SVG_NS, 'text');
		text.setAttributeNS(null, 'x', this.boardWidth/2 -125);
		text.setAttributeNS(null, 'y', this.boardHeight/2);
		text.setAttributeNS(null, 'font-family', '"Silkscreen Web", monotype');
    text.setAttributeNS(null, 'font-size', 50);
		text.setAttributeNS(null, 'fill', 'black');
    text.textContent = 'YOU WIN!';

    let text2 = document.createElementNS(SVG_NS, 'text');
		text2.setAttributeNS(null, 'x', this.boardWidth/2 -150);
		text2.setAttributeNS(null, 'y', this.boardHeight/2 + 25);
		text2.setAttributeNS(null, 'font-family', '"Silkscreen Web", monotype');
    text2.setAttributeNS(null, 'font-size', 20);
		text2.setAttributeNS(null, 'fill', 'red');
    text2.textContent = 'Press ENTER to play again';

    svg.appendChild(text);
    svg.appendChild(text2);
  }
}