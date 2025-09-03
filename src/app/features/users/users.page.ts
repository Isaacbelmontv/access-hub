import { Component, effect, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ApiService } from '../../core/api/api.service';
import { StorageService } from '../../core/storage/storage.service';
import { FormsModule } from '@angular/forms';
import { PhoneMaskPipe } from '../../shared/pipes/phone-mask-pipe';
import { User } from '../../core/models';

@Component({
  selector: 'app-users',
  imports: [TableModule, CommonModule, FormsModule, PhoneMaskPipe],
  templateUrl: './users.page.html',
  styleUrl: './users.page.css',
})
export class UsersPage {
  api = inject(ApiService);
  storage = inject(StorageService);

  users = signal<User[]>([]);
  filter = '';
  selection: User[] = [];
  favs = signal<number[]>(JSON.parse(this.storage.get('favs', []) || '[]'));

  constructor() {
    this.api.getUsers().subscribe((data: User[]) => {
      const localRaw = this.storage.get('local_users', []);
      const local = localRaw ? JSON.parse(localRaw) : [];
      this.users.set([...data, ...local]);
    });

    effect(() => this.storage.set('favs', JSON.stringify(this.favs())));
  }

  filtered = () =>
    this.users().filter((u) => JSON.stringify(u).toLowerCase().includes(this.filter.toLowerCase()));

  toggleFav(id: number) {
    const s = new Set(this.favs());
    s.has(id) ? s.delete(id) : s.add(id);
    this.favs.set([...s]);
  }

  isFav = (id: number) => this.favs().includes(id);
}
