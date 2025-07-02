Custom Pipe

@Pipe({
  name: 'temperature',
  standalone: true
})

this is Pipe decorator which has the name of the pip here its 'temperature' and standalone property.
Pipe has a transform method where Angular calls automatically when it encounters a custom pipe in a template. The value you pass to the pipe from template is used as arguments in transform method in pipe. Here 'args'. 

example:-

transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }


Additionally PipeTransform is added after implements next to the TemperaturePipe class.

eg:-

export class TemperaturePipe implements PipeTransform {

  transform(value: string | number, ...args: unknown[]): unknown {
    return null;
  }

}

here 'value' in transform method is the value on which the pipe is used and args is the arguments passed from template where pipe is used, args can have multiple arguments.

The type of 'value' to accept here we use either string or number as per the above code.

app.component.html

 <p>New York: {{ currentTemperaturs.newYork | temperature }}</p>

here 'value' in transform in TemperaturePipe gets value 'currentTemperaturs.newYork'

Full example

app.component.html

  <p>New York: {{ currentTemperaturs.newYork | temperature }}</p>
    <p>Berlin: {{ currentTemperaturs.berlin | temperature }}</p>
    <p>Paris: {{ currentTemperaturs.paris | temperature }}</p>
    <p>Chicago: {{ currentTemperaturs.chicago | temperature }}</p>

app.component.ts

import { Component } from '@angular/core';
import { TemperaturePipe } from './temperature.pipe';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  imports: [TemperaturePipe],
})
export class AppComponent {
  currentDate = new Date();
  currentTemperaturs = {
    berlin: 4.2749812,
    newYork: 18.1214,
    paris: 72.1209001,
    chicago: 65.0775238,
  };
}


temperature.pipe.ts

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'temperature',
  standalone: true,
})
export class TemperaturePipe implements PipeTransform {
  transform(value: string | number,  inputType: 'cel' | 'fah',
    outputType?: 'cel' | 'fah') {
    let val;
    if (typeof value === 'string') {
      val = parseFloat(value);
    } else {
      val = value;
    }
    const celsiusToFaranheit = val * (9 / 5) + 32;
    return `${celsiusToFaranheit} F`;
  }
}


Accepting parameters to custom pipe


Here args are given as inputType and outputType with data type as string 'cel' and 'fah' which represents Celsius and Fahrenheit. Additionally we have kept outputType argument optional.

temperature.pipe.ts

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

app.component.html

<p>New York: {{ currentTemperaturs.newYork | temperature :'cel':'fah'}}</p>

here inputType is cel and outputType is fah.

 <p>Berlin: {{ currentTemperaturs.berlin | temperature : "fah" : "cel" }}</p>

here inputType is fah and outputType is cel.

 <p>Paris: {{ currentTemperaturs.paris | temperature : "cel" }}</p>

here inputType is cel and outputType is not having value since its optional

 <p>Chicago: {{ currentTemperaturs.chicago | temperature : "fah" }}</p>

here inputType is fah and outputType is not having value since its optional


app.component.ts

import { Component } from '@angular/core';
import { TemperaturePipe } from './temperature.pipe';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  imports: [TemperaturePipe],
})
export class AppComponent {
  currentDate = new Date();
  currentTemperaturs = {
    berlin: 4.2749812,
    newYork: 18.1214,
    paris: 72.1209001,
    chicago: 65.0775238,
  };
}
