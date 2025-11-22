import { filterTechniqueGroups } from './filter-techniques';
import { TechniqueGroup } from '../models/technique';

const sample: TechniqueGroup[] = [
  {
    id: 'koshi',
    label: 'Koshi',
    description: 'Hanches',
    techniques: [
      {
        name: 'Harai-goshi',
        translation: 'Fauchage de hanche',
        meta: 'demo',
        videoUrl: 'a',
        tags: ['hanche', 'fauchage'],
      },
      {
        name: 'Uki-goshi',
        translation: 'Hanche flottante',
        meta: 'demo',
        videoUrl: 'b',
        tags: ['hanche'],
      },
    ],
  },
  {
    id: 'osae',
    label: 'Osaekomi',
    description: 'Immobilisations',
    techniques: [
      {
        name: 'Hon-gesa-gatame',
        translation: 'Contrôle fondamental latéral',
        meta: 'demo',
        videoUrl: 'c',
        tags: ['immobilisation'],
      },
    ],
  },
];

describe('filterTechniqueGroups', () => {
  it('returns original groups when query is empty', () => {
    expect(filterTechniqueGroups(sample, '')).toEqual(sample);
  });

  it('keeps techniques that match tags or names', () => {
    const result = filterTechniqueGroups(sample, 'immobilisation');
    expect(result.length).toBe(1);
    expect(result[0].techniques[0].name).toBe('Hon-gesa-gatame');
  });

  it('removes groups with no matching techniques', () => {
    const result = filterTechniqueGroups(sample, 'harai');
    expect(result.length).toBe(1);
    expect(result[0].techniques.length).toBe(1);
  });
});
