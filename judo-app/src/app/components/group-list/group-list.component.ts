import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GroupComponent } from '../group/group.component';
import { TechniqueGroup } from '../../models/technique';

@Component({
  selector: 'app-group-list',
  standalone: true,
  imports: [CommonModule, GroupComponent],
  templateUrl: './group-list.component.html',
  styleUrls: ['./group-list.component.scss'],
})
export class GroupListComponent {
  @Input({ required: true }) groups: TechniqueGroup[] = [];
  @Input() openState: Record<string, boolean> = {};

  @Output() openChange = new EventEmitter<{ id: string; open: boolean }>();
  @Output() previewVideo = new EventEmitter<string>();
}
