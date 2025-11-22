import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Technique } from '../../models/technique';

@Component({
  selector: 'app-tile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './tile.component.html',
  styleUrls: ['./tile.component.scss'],
})
export class TileComponent {
  @Input({ required: true }) technique!: Technique;
  @Output() preview = new EventEmitter<string>();

  reviewed = false;
}
