export function getTodayISODate() {
  return new Date().toISOString().slice(0, 10);
}

export function addOneMonth(dateString) {
  const date = new Date(dateString);
  date.setMonth(date.getMonth() + 1);
  return date.toISOString().slice(0, 10);
}

export function getEffectiveStatus(member) {
  if (member.status === "Suspended") return "Suspended";
  if (member.expiryDate < getTodayISODate()) return "Expired";
  return "Active";
}