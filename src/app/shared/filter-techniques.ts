import { TechniqueGroup } from '../models/technique';

export function filterTechniqueGroups(groups: TechniqueGroup[], query: string, dan: string): TechniqueGroup[] {
  const normalized = query.trim().toLowerCase();
  const danFilter = dan.toLowerCase();
  if (!normalized) {
    if (danFilter === 'all') {
      return groups;
    }

    return groups
      .map((group) => ({
        ...group,
        techniques: group.techniques.filter((technique) => technique.dan.toLowerCase() === danFilter),
      }))
      .filter((group) => group.techniques.length > 0);
  }

  const terms = normalized.split(/\s+/).filter(Boolean);
  return groups
    .map((group) => ({
      ...group,
      techniques: group.techniques.filter((technique) => {
        const searchable = [technique.name, technique.translation, technique.meta, technique.dan, ...(technique.tags ?? [])]
          .join(' ')
          .toLowerCase();
        const matchesQuery = terms.every((term) => searchable.includes(term));
        const matchesDan = danFilter === 'all' || technique.dan.toLowerCase() === danFilter;

        return matchesQuery && matchesDan;
      }),
    }))
    .filter((group) => group.techniques.length > 0);
}
