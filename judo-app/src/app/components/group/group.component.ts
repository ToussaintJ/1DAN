import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TechniqueGroup } from '../../models/technique';
import { TileComponent } from '../tile/tile.component';

@Component({
  selector: 'app-group',
  standalone: true,
  imports: [CommonModule, TileComponent],
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss'],
})
export class GroupComponent {
  @Input({ required: true }) group!: TechniqueGroup;
  @Input() open = false;

  @Output() openChange = new EventEmitter<{ id: string; open: boolean }>();
  @Output() previewVideo = new EventEmitter<string>();

  onToggle(event: Event): void {
    const target = event.target as HTMLDetailsElement;
    this.openChange.emit({ id: this.group.id, open: target.open });
  }
}
