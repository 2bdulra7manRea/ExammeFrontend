import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pipeTime'
})
export class PipeTimePipe implements PipeTransform {
  transform(value:string, ...args: unknown[]): string {
    let val=value.slice(0,10);
    return val;
  }

}
