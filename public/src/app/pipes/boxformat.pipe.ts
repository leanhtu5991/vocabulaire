import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'boxformat'
})
export class BoxformatPipe implements PipeTransform {

  transform(boxId: number): string {
    
    switch(boxId){
      case 1: return "<div class='box1'> BOX 1 </div>"; break;
      case 2: return "<div class='box2'> BOX 2 </div>"; break;
      case 3: return "<div class='box3'> BOX 3 </div>"; break;
    }
    return "OK";
  }

}
