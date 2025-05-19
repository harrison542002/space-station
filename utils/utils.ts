export function getDateRange(daysAgo = 9) {
  const dates = [];
  const today = new Date();

  today.setHours(0, 0, 0, 0);

  for (let i = daysAgo; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    dates.push(d);
  }

  return dates;
}

export function formatDate(d: Date) {
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}
