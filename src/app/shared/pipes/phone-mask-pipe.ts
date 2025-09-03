import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'phoneMask',
})
export class PhoneMaskPipe implements PipeTransform {
  transform(v: string) {
    const d = (v || '').replace(/\D/g, '').slice(0, 10);
    return d.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
  }
}
