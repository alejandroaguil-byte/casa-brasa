const pexels = (id: number, width = 1600) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${width}`;

export const photos = {
  hero: pexels(262978, 1920),
  brasas: pexels(1482803),
  fachada: pexels(370984),
  vino: pexels(1407846),
  provoleta: pexels(36691318, 1200),
  pulpo: pexels(30766456, 1200),
  bife: pexels(769289, 1200),
  lecheAsada: pexels(18089587, 1200),
};
