import { Injectable, signal, computed } from '@angular/core';

@Injectable()
export class PaginationService<T> {

  private items = signal<T[]>([]);
  pageSize = signal(5);
  currentPage = signal(1);

  setPageSize(size: number) {
    this.pageSize.set(size);
    this.currentPage.set(1);
  }

  setItems(data: T[]) {
    this.items.set(data);
    this.currentPage.set(1);
  }

  totalPages = computed(() =>
    Math.ceil(this.items().length / this.pageSize())
  );

  paginatedItems = computed(() => {
    const start = (this.currentPage() - 1) * this.pageSize();
    const end = start + this.pageSize();
    return this.items().slice(start, end);
  });

  nextPage() {
    if (this.currentPage() < this.totalPages()) {
      this.currentPage.update(p => p + 1);
    }
  }

  prevPage() {
    if (this.currentPage() > 1) {
      this.currentPage.update(p => p - 1);
    }
  }

  reset() {
    this.currentPage.set(1);
  }
}