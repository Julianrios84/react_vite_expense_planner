export const generateId = () => {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
};

export const formatterDate = (date) => {
  const d = new Date(date);
  const options = { year: 'numeric', month: 'long', day: '2-digit' };
  return d.toLocaleDateString('es-ES', options);
};
