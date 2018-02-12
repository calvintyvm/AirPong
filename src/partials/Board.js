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
      

        // let circle = document.createElementNS(SVG_NS, 'circle');
        // circle.setAttributeNS(null,'r',40),
        // circle.setAttributeNS(null,'cx', '0'),
        // circle.setAttributeNS(null,'cy',this.height/2);
        // circle.setAttributeNS(null,'fill','skyblue');
        // circle.setAttributeNS(null,'stroke', 'red');

        // let circle = document.createElementNS(SVG_NS, 'circle');
        // circle3.setAttributeNS(null,'r',40),
        // circle3.setAttributeNS(null,'cx', this.width);
        // circle3.setAttributeNS(null,'cy',this.height/2);
        // circle3.setAttributeNS(null,'fill','skyblue');
        // circle3.setAttributeNS(null,'stroke', 'red');
        


        svg.appendChild(rect);
        svg.appendChild(line);
        svg.appendChild(circle);
        
 

        
    }
  }