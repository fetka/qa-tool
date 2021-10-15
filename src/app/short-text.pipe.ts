import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shortText',
})
export class ShortTextPipe implements PipeTransform {
  transform(value: string, ...args: unknown[]): string {
    const strArray = value.split('/');
    return strArray[strArray.length - 1];
  }
}
