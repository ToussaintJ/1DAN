import { Component, EventEmitter, OnDestroy, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Subscription, debounceTime, distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent implements OnDestroy {
  @Output() queryChange = new EventEmitter<string>();
  @Output() toggleAll = new EventEmitter<void>();

  readonly searchControl = new FormControl('', { nonNullable: true });
  private readonly sub: Subscription;

  constructor() {
    this.sub = this.searchControl.valueChanges
      .pipe(debounceTime(200), distinctUntilChanged())
      .subscribe((value) => this.queryChange.emit(value.trim()));
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
