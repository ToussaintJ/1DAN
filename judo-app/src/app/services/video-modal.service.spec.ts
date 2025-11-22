import { toEmbed } from './video-modal.service';

describe('toEmbed', () => {
  it('converts youtube watch urls', () => {
    expect(toEmbed('https://www.youtube.com/watch?v=qTo8HlAAkOo')).toBe('https://www.youtube.com/embed/qTo8HlAAkOo');
  });

  it('converts shortened youtube urls', () => {
    expect(toEmbed('https://youtu.be/12345678901')).toBe('https://www.youtube.com/embed/12345678901');
  });

  it('converts vimeo urls', () => {
    expect(toEmbed('https://vimeo.com/1234')).toBe('https://player.vimeo.com/video/1234');
  });

  it('returns original url when not recognized', () => {
    const raw = 'https://example.com/video';
    expect(toEmbed(raw)).toBe(raw);
  });
});
