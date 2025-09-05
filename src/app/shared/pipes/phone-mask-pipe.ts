import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'phoneMask',
})
export class PhoneMaskPipe implements PipeTransform {
  transform(v: string): string {
    if (!v) return '';

    const [base, ext] = v.toLowerCase().split('x');

    const digits = (base || '').replace(/\D/g, '').slice(-10); // últimos 10 dígitos

    // Format (AAA) BBB-CCCC
    const formatted = digits.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');

    // Add extension if exists
    return ext ? `${formatted} x${ext.trim()}` : formatted;
  }
}
