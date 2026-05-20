export const DIFFICULTY_LABELS = {
  easy: 'Easy',
  medium: 'Medium',
  hard: 'Hard'
}

export const DIFFICULTY_COLORS = {
  easy: 'bg-green-100 text-green-800',
  medium: 'bg-yellow-100 text-yellow-800',
  hard: 'bg-red-100 text-red-800'
}

export const SEARCH_DEBOUNCE_MS = 300

export const FUSE_OPTIONS = {
  keys: [
    { name: 'title', weight: 0.4 },
    { name: 'description', weight: 0.2 },
    { name: 'ingredients', weight: 0.2 },
    { name: 'tags', weight: 0.2 }
  ],
  threshold: 0.4,
  includeScore: true
}
