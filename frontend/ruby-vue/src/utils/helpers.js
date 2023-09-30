import { Notify } from 'quasar';

export function formatOptions(items, label = 'name') {
  if (!items) return [];
  return items.map(
    (item) => ({ value: item.id, label: item[label] }),
  );
}

export function filterItems(items, term, key = 'name') {
  if (!items) return [];
  if (!term) return items;
  return items.filter(
    (item) => item[key].toLowerCase().includes(term.toLowerCase()),
  );
}

export function notifyError(e) {
  Notify.create({
    type: 'error',
    message: e.response?.data?.message || e.message || e,
  });
}
