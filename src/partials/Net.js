import { SVG_NS } from '../settings';


export default class Board {
    constructor(width, height) {
      this.width = width;
      this.height = height;
    }
    render(svg) {
  
      

        // let circle = document.createElementNS(SVG_NS, 'circle');
        // circle.setAttributeNS(null,'r',40),
        // circle.setAttributeNS(null,'cx', '0'),
        // circle.setAttributeNS(null,'cy',this.height/2);
        // circle.setAttributeNS(null,'fill','skyblue');
        // circle.setAttributeNS(null,'stroke', 'red');

        let circle = document.createElementNS(SVG_NS, 'circle');
        circle.setAttributeNS(null,'r',125),
        circle.setAttributeNS(null,'cx', this.width);
        circle.setAttributeNS(null,'cy',this.height/2);
        circle.setAttributeNS(null,'fill','skyblue');
        circle.setAttributeNS(null,'stroke', 'red');
        


     
        svg.appendChild(circle);
        
 

        
    }
  }