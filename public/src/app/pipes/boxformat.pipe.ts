import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'boxformat'
})
export class BoxformatPipe implements PipeTransform {

  transform(boxId: any): string {
    
    switch(Number(boxId)){
      case 1: return "<div class='box1'> BOX 1 </div>"; break;
      case 2: return "<div class='box2'> BOX 2 </div>"; break;
      case 3: return "<div class='box3'> BOX 3 </div>"; break;
      case 4: return "<div class='box4'> BOX 4 </div>"; break;
      case 5: return "<div class='box5'> BOX 5 </div>"; break;
      case 6: return "<div class='box6'> BOX 6 </div>"; break;
    }
    return "OK";
  }

}
