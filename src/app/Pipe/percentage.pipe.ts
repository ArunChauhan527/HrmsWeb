import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'percentage'
})
export class PercentagePipe implements PipeTransform {

  transform(value: number, item : number): number {
    return item!=undefined && value !=undefined?(value*item)/100:0;
  }

}
