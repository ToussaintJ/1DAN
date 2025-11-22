import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface VideoModalState {
  open: boolean;
  url: string | null;
}

export function toEmbed(url: string): string {
  const youtube = url.match(/(?:v=|youtu\.be\/)([\w-]{11})/);
  if (youtube) {
    return `https://www.youtube.com/embed/${youtube[1]}`;
  }

  const vimeo = url.match(/vimeo\.com\/(\d+)/);
  if (vimeo) {
    return `https://player.vimeo.com/video/${vimeo[1]}`;
  }

  return url;
}

@Injectable({ providedIn: 'root' })
export class VideoModalService {
  private readonly state = new BehaviorSubject<VideoModalState>({ open: false, url: null });

  readonly state$ = this.state.asObservable();

  open(url: string): void {
    this.state.next({ open: true, url: toEmbed(url) });
    this.toggleBodyScroll(true);
  }

  close(): void {
    this.state.next({ open: false, url: null });
    this.toggleBodyScroll(false);
  }

  private toggleBodyScroll(disabled: boolean): void {
    if (disabled) {
      document.body.dataset['scrollLock'] = 'true';
      document.body.style.overflow = 'hidden';
    } else {
      delete document.body.dataset['scrollLock'];
      document.body.style.overflow = '';
    }
  }
}
