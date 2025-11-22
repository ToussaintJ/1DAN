import { TechniqueGroup } from '../models/technique';

export function filterTechniqueGroups(groups: TechniqueGroup[], query: string): TechniqueGroup[] {
  const normalized = query.trim().toLowerCase();
  if (!normalized) {
    return groups;
  }

  const terms = normalized.split(/\s+/).filter(Boolean);
  return groups
    .map((group) => ({
      ...group,
      techniques: group.techniques.filter((technique) =>
        terms.every((term) =>
          [technique.name, technique.translation, technique.meta, ...(technique.tags ?? [])]
            .join(' ')
            .toLowerCase()
            .includes(term),
        ),
      ),
    }))
    .filter((group) => group.techniques.length > 0);
}
