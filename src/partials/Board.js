import { SVG_NS } from '../settings';

export default class Board {
    constructor(width, height) {
      this.width = width;
      this.height = height;
    }
    render(svg) {
        let rect = document.createElementNS(SVG_NS, 'rect');
        rect.setAttributeNS(null,'fill','white');
        rect.setAttributeNS(null,'height',this.height);
        rect.setAttributeNS(null,'width',this.width);
        rect.setAttributeNS(null,'stroke','black');

        let line = document.createElementNS(SVG_NS, 'line');
        line.setAttributeNS(null,'x1',(this.width / 2));
        line.setAttributeNS(null,'y1',(0));
        line.setAttributeNS(null,'x2',(this.width / 2));
        line.setAttributeNS(null,'y2',(this.height));
        line.setAttributeNS(null,'stroke-width','4');

        

        let circle = document.createElementNS(SVG_NS, 'circle');
        circle.setAttributeNS(null,'r',30),
        circle.setAttributeNS(null,'cx', this.width/2),
        circle.setAttributeNS(null,'cy',this.height/2);
        circle.setAttributeNS(null,'fill','red');
        console.log(circle);

        let circle2 = document.createElementNS(SVG_NS, 'circle2');
        circle2.setAttributeNS(null,'r',40),
        circle2.setAttributeNS(null,'cx', '0'),
        circle2.setAttributeNS(null,'cy',this.height/2);
        circle2.setAttributeNS(null,'fill','skyblue');
        circle2.setAttributeNS(null,'stroke', 'red');

        let circle3 = document.createElementNS(SVG_NS, 'circle3');
        circle3.setAttributeNS(null,'r',40),
        circle3.setAttributeNS(null,'cx', this.width);
        circle3.setAttributeNS(null,'cy',this.height/2);
        circle3.setAttributeNS(null,'fill','skyblue');
        circle3.setAttributeNS(null,'stroke', 'red');
        



  


        svg.appendChild(rect);
        svg.appendChild(line);
        svg.appendChild(circle);
        svg.appendChild(circle3);
        svg.appendChild(circle2);
 

        
    }
  }