import { CommonModule } from '@angular/common';
import { Component, effect, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { Card } from 'primeng/card';
import { DialogModule } from 'primeng/dialog';
import { FloatLabelModule } from 'primeng/floatlabel';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputMaskModule } from 'primeng/inputmask';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { ApiService } from '../../core/api/api.service';
import { AuthService } from '../../core/auth/auth.service';
import { User } from '../../core/models';
import { StorageService } from '../../core/storage/storage.service';
import { PhoneMaskPipe } from '../../shared/pipes/phone-mask-pipe';
import { UserDialogComponent } from './components/user-dialog.component';
@Component({
  selector: 'app-users',
  imports: [
    CommonModule,
    FormsModule,
    TableModule,
    ButtonModule,
    InputMaskModule,
    InputTextModule,
    IconFieldModule,
    InputIconModule,
    Card,
    DialogModule,
    PhoneMaskPipe,
    UserDialogComponent,
    CommonModule,
    FloatLabelModule,
  ],
  templateUrl: './users.page.html',
  styleUrls: ['./users.page.css'],
})
export class UsersPage {
  api = inject(ApiService);
  storage = inject(StorageService);
  isLoading = signal(false);
  users = signal<User[]>([]);
  filter = '';
  favs = signal<number[]>(JSON.parse(this.storage.get('favs') || '[]'));
  selectedUser = signal<User | null>(null);
  showDialog = signal(false);
  editableUser = signal(true);

  constructor(public authService: AuthService) {
    this.getUsers();
    effect(() => this.storage.set('favs', JSON.stringify(this.favs())));
  }

  filtered = () =>
    this.users().filter((u) => JSON.stringify(u).toLowerCase().includes(this.filter.toLowerCase()));

  toggleFav(id: number) {
    const s = new Set(this.favs());
    s.has(id) ? s.delete(id) : s.add(id);
    this.favs.set([...s]);
  }

  getUsers() {
    this.isLoading.set(true);
    this.api.getUsers().subscribe({
      next: (data: User[]) => {
        const localRaw = this.storage.get('local_users');
        const local = localRaw ? JSON.parse(localRaw) : [];
        this.users.set([...data, ...local]);
      },
      error: (err) => console.error('Error al obtener usuarios', err),
      complete: () => this.isLoading.set(false),
    });
  }

  showUserDialog(user?: User, editable = true) {
    if (user) this.selectedUser.set(JSON.parse(JSON.stringify(user)));
    this.showDialog.set(true);
    this.editableUser.set(editable);
  }

  saveUser(user: User) {
    const exists = this.users().some((u) => u.id === user.id);

    if (exists) {
      this.users.set(this.users().map((u) => (u.id === user.id ? user : u)));
    } else {
      this.users.set([...this.users(), user]);

      const localRaw = this.storage.get('local_users');
      const local = localRaw ? JSON.parse(localRaw) : [];
      local.push(user);
      this.storage.set('local_users', JSON.stringify(local));
    }

    this.closeDialog();
  }

  closeDialog() {
    this.showDialog.set(false);
    this.selectedUser.set(null);
  }

  deleteUser(user: User) {
    this.users.set(this.users().filter((u) => u.id !== user.id));

    const localRaw = this.storage.get('local_users');
    const local = localRaw ? JSON.parse(localRaw) : [];

    const updatedLocal = local.filter((u: User) => u.id !== user.id);
    this.storage.set('local_users', JSON.stringify(updatedLocal));
  }

  isFav = (id: number) => this.favs().includes(id);
}
