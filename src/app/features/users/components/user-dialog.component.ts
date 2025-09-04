import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { FieldsetModule } from 'primeng/fieldset';
import { FloatLabelModule } from 'primeng/floatlabel';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { User } from '../../../core/models';

@Component({
  selector: 'app-user-dialog',
  standalone: true,
  imports: [
    CommonModule,
    DialogModule,
    ButtonModule,
    InputTextModule,
    ReactiveFormsModule,
    FloatLabelModule,
    IconFieldModule,
    InputIconModule,
    FieldsetModule,
  ],
  templateUrl: './user-dialog.component.html',
  styleUrl: './user-dialog.component.css',
})
export class UserDialogComponent implements OnChanges {
  @Input() visible = false;
  @Input() user: User | null = null;

  @Output() save = new EventEmitter<User>();
  @Output() close = new EventEmitter<void>();

  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(21)]],
      website: ['', Validators.required],
      address: this.fb.group({
        street: ['', Validators.required],
        city: ['', Validators.required],
        zipcode: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(10)]],
      }),
      company: this.fb.group({
        name: ['', Validators.required],
        catchPhrase: [''],
        bs: [''],
      }),
    });
  }

  ngOnChanges(): void {
    if (this.user) {
      this.form.reset(this.user);
    }
  }

  onSave() {
    if (this.form.valid) {
      const user: User = {
        ...this.user,
        ...this.form.value,
      };

      this.save.emit(user);
    } else {
      this.form.markAllAsTouched();
    }
  }

  onClose() {
    this.close.emit();
  }
}
