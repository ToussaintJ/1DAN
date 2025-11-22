import { Component, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../components/header/header.component';
import { ToolbarComponent } from '../../components/toolbar/toolbar.component';
import { GroupListComponent } from '../../components/group-list/group-list.component';
import { VideoModalComponent } from '../../components/video-modal/video-modal.component';
import { TechniqueGroup } from '../../models/technique';
import { TECHNIQUE_GROUPS } from '../../shared/techniques';
import { filterTechniqueGroups } from '../../shared/filter-techniques';
import { VideoModalService } from '../../services/video-modal.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, HeaderComponent, ToolbarComponent, GroupListComponent, VideoModalComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  readonly groups = TECHNIQUE_GROUPS;
  readonly query = signal('');
  readonly openState = signal<Record<string, boolean>>(
    this.groups.reduce((state, group, index) => ({ ...state, [group.id]: index === 0 }), {} as Record<string, boolean>),
  );

  readonly filteredGroups = computed(() => filterTechniqueGroups(this.groups, this.query()));

  constructor(private readonly videoModal: VideoModalService) {}

  onQueryChange(value: string): void {
    this.query.set(value);
  }

  onToggleAll(): void {
    const current = this.openState();
    const shouldOpen = !Object.values(current).every(Boolean);
    const updated: Record<string, boolean> = {};
    this.groups.forEach((group) => (updated[group.id] = shouldOpen));
    this.openState.set(updated);
  }

  onOpenChange(payload: { id: string; open: boolean }): void {
    this.openState.set({ ...this.openState(), [payload.id]: payload.open });
  }

  isOpen(group: TechniqueGroup): boolean {
    return this.openState()[group.id] ?? false;
  }

  openPreview(url: string): void {
    this.videoModal.open(url);
  }
}
