import { Component, EventEmitter, Input, OnChanges, OnDestroy, Output, SimpleChanges } from '@angular/core';
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
export class ToolbarComponent implements OnDestroy, OnChanges {
  @Input() danOptions: string[] = [];
  @Input() selectedDan = 'all';
  @Output() queryChange = new EventEmitter<string>();
  @Output() danChange = new EventEmitter<string>();
  @Output() toggleAll = new EventEmitter<void>();

  readonly searchControl = new FormControl('', { nonNullable: true });
  readonly danControl = new FormControl('all', { nonNullable: true });
  private readonly sub: Subscription;

  constructor() {
    this.sub = new Subscription();

    this.sub.add(
      this.searchControl.valueChanges
        .pipe(debounceTime(200), distinctUntilChanged())
        .subscribe((value) => this.queryChange.emit(value.trim())),
    );

    this.sub.add(
      this.danControl.valueChanges.pipe(distinctUntilChanged()).subscribe((value) => this.danChange.emit(value)),
    );
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['selectedDan'] && this.selectedDan !== this.danControl.value) {
      this.danControl.setValue(this.selectedDan, { emitEvent: false });
    }
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
