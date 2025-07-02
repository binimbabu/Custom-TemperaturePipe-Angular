import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'temperature',
  standalone: true,
})
export class TemperaturePipe implements PipeTransform {
  transform(
    value: string | number,
    inputType: 'cel' | 'fah',
    outputType?: 'cel' | 'fah'
  ) {
    let val;
    if (typeof value === 'string') {
      val = parseFloat(value);
    } else {
      val = value;
    }
    let celsiusToFaranheit: number;
    if (inputType === 'cel' && outputType === 'fah') {
      celsiusToFaranheit = val * (9 / 5) + 32;
    } else if (inputType === 'fah' && outputType === 'cel') {
      celsiusToFaranheit = (val - 32) * (5 / 9);
    } else {
      celsiusToFaranheit = val;
    }
    let symbol: 'C' | 'F';
    if (!outputType) {
      symbol = inputType === 'cel' ? 'C' : 'F';
    } else {
      symbol = outputType === 'cel' ? 'C' : 'F';
    }
    return `${celsiusToFaranheit} ${symbol}`;
  }
}
