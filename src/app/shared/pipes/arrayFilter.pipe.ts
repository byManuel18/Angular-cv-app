import { Pipe, type PipeTransform } from '@angular/core';

@Pipe({
  name: 'arrayFilter',
  standalone: true,
})
export class ArrayFilterPipe<T> implements PipeTransform {

  transform(value: T[], excluyed: T[], filter: keyof T ): T[] {

    const result: T[] = value.filter(( value )=>{
      return !excluyed.some(excluye=>{
        return (excluye[filter] === value[filter]);
      })
    })

    return result;
  }

}
