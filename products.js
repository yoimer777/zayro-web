const PRODUCTS = {
  "lattafa-asad": {
    id: "lattafa-asad", name: "Lattafa Asad", image: "assets/catalog-images/Lattafa Asad.png", label: "Perfume",
    brand: "Lattafa", price: 0, status: "Consultar precio", gender: "Masculino",
    gallery: ["assets/catalog-images/Lattafa Asad.png"],
    presentations: ["10ml", "50ml", "100ml"],
    why: "Un clásico amaderado que nunca pasa de moda. Excelente proyección y duración.",
    smell: "Fresco, amaderado y especiado. Notas de almizcares naturales que evolucionan a lo largo del día.",
    vibe: "Confianza, madurez, poder discreto.",
    usage: "Ideal para oficina, uso diario y clima cálido. 3-4 sprays. Dura 8-10 horas en piel.",
    notes: { top: ["Bergamota", "Pimienta"], heart: ["Lavanda", "Jazmín"], base: ["Ámbar", "Almizcle", "Sándalo"] }
  },
  "lattafa-yara": {
    id: "lattafa-yara", name: "Lattafa Yara", image: "assets/catalog-images/Lattafa Yara.png", label: "Perfume",
    brand: "Lattafa", price: 0, status: "Consultar precio", gender: "Femenino",
    gallery: ["assets/catalog-images/Lattafa Yara.png"],
    presentations: ["10ml", "50ml", "100ml"],
    why: "Fragancia femenina con carácter. Mezcla oriental y floral que cautiva desde el primer spray.",
    smell: "Dulce, floral y oriental. Notas de rosa, ámbar y almizcares que envuelven.",
    vibe: "Elegancia urbana, sofisticación, atracción magnética.",
    usage: "Perfecta para salidas nocturnas. 2-3 sprays. Duración: 10-12 horas.",
    notes: { top: ["Rosa", "Pimienta rosa"], heart: ["Ámbar", "Jazmín"], base: ["Almizcle", "Vainilla", "Sándalo"] }
  },
  "lattafa-khamrah": {
    id: "lattafa-khamrah", name: "Lattafa Khamrah", image: "assets/catalog-images/Lattafa Khamrah.png", label: "Perfume",
    brand: "Lattafa", price: 0, status: "Consultar precio", gender: "Unisex",
    gallery: ["assets/catalog-images/Lattafa Khamrah.png"],
    presentations: ["10ml", "50ml", "100ml"],
    why: "Una joya oriental que desafía categorías. Recomendada para quienes aprecian lo auténtico.",
    smell: "Ámbar, musk y notas amaderadas profundas. Hipnotizante y adictivo.",
    vibe: "Misterio, sensualidad, profundidad emocional.",
    usage: "Para momentos especiales y clima frío. 4-5 sprays, dura días en tejido.",
    notes: { top: ["Canela", "Nuez moscada"], heart: ["Ámbar", "Dátil"], base: ["Almizcle", "Vainilla", "Resinas"] }
  },
  "orientica-amber-rouge": {
    id: "orientica-amber-rouge", name: "Orientica Amber Rouge", image: "assets/catalog-images/Orientica Amber Rouge.png", label: "Perfume",
    brand: "Orientica", price: 0, status: "Consultar precio", gender: "Unisex",
    gallery: ["assets/catalog-images/Orientica Amber Rouge.png"],
    presentations: ["10ml", "50ml", "100ml"],
    why: "Fragancia de lujo accesible. Combinación de ámbar y especias que proyecta elegancia inmediata.",
    smell: "Ámbar rojo, especias cálidas, notas ambáricas sutiles.",
    vibe: "Lujo urbano, seducción inteligente, poder controlado.",
    usage: "Uso versátil: diurno y nocturno. 3-4 sprays. Duración: 10+ horas.",
    notes: { top: ["Azafrán", "Bergamota"], heart: ["Ámbar rojo", "Rosa"], base: ["Almizcle", "Pachulí", "Vainilla"] }
  },
  "club-de-nuit-intense-man": {
    id: "club-de-nuit-intense-man", name: "Club de Nuit Intense Man", image: "assets/catalog-images/Club de Nuit Intense Man.png", label: "Perfume",
    brand: "Armaf", price: 0, status: "Consultar precio", gender: "Masculino",
    gallery: ["assets/catalog-images/Club de Nuit Intense Man.png"],
    presentations: ["10ml", "50ml", "100ml"],
    why: "La fragancia más buscada en Colombia. Versión intensa del clásico con mayor concentración.",
    smell: "Fresco, sofisticado, amaderado. Notas de incienso y ámbar.",
    vibe: "Confianza absoluta, profesionalismo, atracción instantánea.",
    usage: "Perfecta para cualquier ocasión. 2-3 sprays. Dura 12+ horas.",
    notes: { top: ["Limón", "Bergamota", "Piña"], heart: ["Incienso", "Pimienta rosa"], base: ["Ámbar", "Almizcle", "Abedul"] }
  },
  "armaf-odyssey-mandarin-sky": {
    id: "armaf-odyssey-mandarin-sky", name: "Armaf Odyssey Mandarin Sky", image: "assets/catalog-images/Armaf Odyssey Mandarin Sky.png", label: "Perfume",
    brand: "Armaf", price: 0, status: "Consultar precio", gender: "Masculino",
    gallery: ["assets/catalog-images/Armaf Odyssey Mandarin Sky.png"],
    presentations: ["10ml", "50ml", "100ml"],
    why: "Fragancia oriental con explosión de cítricos.",
    smell: "Mandarina brillante, notas orientales, especias cálidas.",
    vibe: "Energía, modernidad, libertad urbana.",
    usage: "Ideal para día, especialmente verano. 3-4 sprays. Duración: 6-8 horas.",
    notes: { top: ["Mandarina", "Naranja"], heart: ["Azafrán", "Jengibre"], base: ["Ámbar", "Almizcle"] }
  },
  "lattafa-eclaire": {
    id: "lattafa-eclaire", name: "Lattafa Eclaire", image: "assets/catalog-images/Lattafa Eclaire.png", label: "Perfume",
    brand: "Lattafa", price: 0, status: "Consultar precio", gender: "Unisex",
    gallery: ["assets/catalog-images/Lattafa Eclaire.png"],
    presentations: ["10ml", "50ml", "100ml"],
    why: "Eclaire significa relámpago. Una fragancia que impacta al instante.",
    smell: "Fresco, limpio, especiado. Notas verdes y aromáticas.",
    vibe: "Claridad mental, energía enfocada, presencia inmediata.",
    usage: "Perfecta para gym, trabajo, uso diario. 3-5 sprays. Duración: 8 horas.",
    notes: { top: ["Bergamota", "Limón"], heart: ["Lavanda", "Salvia"], base: ["Almizcle", "Ámbar", "Maderas"] }
  },
  "bharara-king": {
    id: "bharara-king", name: "Bharara King", image: "assets/catalog-images/Bharara King.png", label: "Perfume",
    brand: "Bharara", price: 0, status: "Consultar precio", gender: "Masculino",
    gallery: ["assets/catalog-images/Bharara King.png"],
    presentations: ["10ml", "50ml", "100ml"],
    why: "Una fragancia que proclama dominio. Aroma oriental intenso.",
    smell: "Ámbar, vainilla, especias. Dulce pero masculino, profundo.",
    vibe: "Poder, realeza, magnetismo irresistible.",
    usage: "Para noches especiales. 2-3 sprays. Duración: 14+ horas.",
    notes: { top: ["Piña", "Manzana"], heart: ["Ámbar", "Canela"], base: ["Vainilla", "Almizcle", "Maderas"] }
  },
  "dior-sauvage": {
    id: "dior-sauvage", name: "Dior Sauvage", image: "assets/catalog-images/Dior Sauvage.png", label: "Diseñador",
    brand: "Dior", price: 0, status: "Consultar precio", gender: "Masculino",
    gallery: ["assets/catalog-images/Dior Sauvage.png"],
    presentations: ["10ml", "50ml", "100ml"],
    why: "El clásico moderno. Diseñador de clase mundial.",
    smell: "Ambroxán, cítricos frescos, pimienta. Limpio y sofisticado.",
    vibe: "Caballero contemporáneo, confianza, sofisticación cotidiana.",
    usage: "Versátil: oficina, salidas, gym. 2-3 sprays. Duración: 10+ horas.",
    notes: { top: ["Bergamota", "Pimienta"], heart: ["Lavanda", "Geranio"], base: ["Ambroxán", "Almizcle", "Cedro"] }
  },
  "bleu-de-chanel": {
    id: "bleu-de-chanel", name: "Bleu de Chanel", image: "assets/catalog-images/Bleu de Chanel.png", label: "Diseñador",
    brand: "Chanel", price: 0, status: "Consultar precio", gender: "Masculino",
    gallery: ["assets/catalog-images/Bleu de Chanel.png"],
    presentations: ["10ml", "50ml", "100ml"],
    why: "Icónico diseñador. Aroma fresco que trasciende modas.",
    smell: "Cítricos frescos, notas amaderadas, almizcares.",
    vibe: "Elegancia clásica, confianza, tradición moderna.",
    usage: "Perfecta para cualquier hora. 2-4 sprays. Duración: 10+ horas.",
    notes: { top: ["Toronja", "Limón"], heart: ["Jengibre", "Jazmín"], base: ["Sándalo", "Cedro", "Almizcle"] }
  },
  "paco-rabanne-1-million": {
    id: "paco-rabanne-1-million", name: "Paco Rabanne 1 Million", image: "assets/catalog-images/Paco Rabanne 1 Million.png", label: "Diseñador",
    brand: "Paco Rabanne", price: 0, status: "Consultar precio", gender: "Masculino",
    gallery: ["assets/catalog-images/Paco Rabanne 1 Million.png"],
    presentations: ["10ml", "50ml", "100ml"],
    why: "Fragancia que huele a lujo. Aroma dulce y seductor.",
    smell: "Piña tropical, especias, ámbar y vainilla. Adictivo.",
    vibe: "Éxito, abundancia, seducción inteligente.",
    usage: "Para noches y ocasiones especiales. 2-3 sprays. Duración: 12+ horas.",
    notes: { top: ["Piña", "Mandarina"], heart: ["Canela", "Rosa"], base: ["Ámbar", "Vainilla", "Cuero"] }
  },
  "versace-eros-edt": {
    id: "versace-eros-edt", name: "Versace Eros EDT", image: "assets/catalog-images/versace eros edt.png", label: "Diseñador",
    brand: "Versace", price: 0, status: "Consultar precio", gender: "Masculino",
    gallery: ["assets/catalog-images/versace eros edt.png"],
    presentations: ["10ml", "50ml", "100ml"],
    why: "Fragancia del dios griego del amor. Proyección y carácter irresistible.",
    smell: "Menta, cítricos frescos, vainilla. Fresco y sofisticado.",
    vibe: "Atracción, poder sensual, juventud eterna.",
    usage: "Versátil, ideal para uso diario. 3-4 sprays. Duración: 10 horas.",
    notes: { top: ["Menta", "Limón", "Manzana"], heart: ["Ámbar", "Geranio"], base: ["Vainilla", "Cedro", "Almizcle"] }
  },
  "carolina-herrera-good-girl": {
    id: "carolina-herrera-good-girl", name: "Carolina Herrera Good Girl", image: "assets/catalog-images/Carolina Herrera Good Girl.png", label: "Diseñador",
    brand: "Carolina Herrera", price: 0, status: "Consultar precio", gender: "Femenino",
    gallery: ["assets/catalog-images/Carolina Herrera Good Girl.png"],
    presentations: ["10ml", "50ml", "100ml"],
    why: "Fragancia femenina icónica. Mezcla de sensualidad y sofisticación.",
    smell: "Almendra tostada, café, especias. Dulce pero profundo.",
    vibe: "Poder femenino, sofisticación, atracción magnética.",
    usage: "Perfecta para noches. 2-3 sprays. Duración: 12+ horas.",
    notes: { top: ["Almendra", "Café"], heart: ["Jazmín", "Tuberosa"], base: ["Ámbar", "Vainilla", "Cacao"] }
  },
  "acqua-di-gio": {
    id: "acqua-di-gio", name: "Acqua Di Giò", image: "assets/catalog-images/Acqua Di Giò.png", label: "Diseñador",
    brand: "Giorgio Armani", price: 0, status: "Consultar precio", gender: "Masculino",
    gallery: ["assets/catalog-images/Acqua Di Giò.png"],
    presentations: ["10ml", "50ml", "100ml"],
    why: "El aroma fresco por excelencia. Revolucionó el concepto de frescura.",
    smell: "Cítricos frescos, notas acuáticas, algas marinas.",
    vibe: "Libertad, frescura, virilidad acuática.",
    usage: "Ideal para clima cálido. 3-5 sprays. Duración: 8-10 horas.",
    notes: { top: ["Limón", "Bergamota", "Naranja"], heart: ["Jazmín", "Romero"], base: ["Almizcle", "Cedro", "Pachulí"] }
  },
  "paco-rabanne-invictus": {
    id: "paco-rabanne-invictus", name: "Paco Rabanne Invictus", image: "assets/catalog-images/Paco Rabanne Invictus.png", label: "Diseñador",
    brand: "Paco Rabanne", price: 0, status: "Consultar precio", gender: "Masculino",
    gallery: ["assets/catalog-images/Paco Rabanne Invictus.png"],
    presentations: ["10ml", "50ml", "100ml"],
    why: "Invicto: imbatible. Deportivo con poder y energía sin límites.",
    smell: "Cítricos frescos, notas amaderadas, almizcares limpios.",
    vibe: "Victoria, poder, determinación.",
    usage: "Perfecta para gym, trabajo. 3-4 sprays. Duración: 10+ horas.",
    notes: { top: ["Toronja", "Mandarina"], heart: ["Laurel", "Jazmín"], base: ["Ámbar", "Cedro", "Almizcle"] }
  },
  "lancome-idole": {
    id: "lancome-idole", name: "Lancôme Idôle", image: "assets/catalog-images/Lancôme Idôle.png", label: "Diseñador",
    brand: "Lancôme", price: 0, status: "Consultar precio", gender: "Femenino",
    gallery: ["assets/catalog-images/Lancôme Idôle.png"],
    presentations: ["10ml", "50ml", "100ml"],
    why: "Fragancia contemporánea para la mujer actual.",
    smell: "Floral frutal, notas de manzana y jazmín. Fresco y ligero.",
    vibe: "Autenticidad, modernidad, libertad.",
    usage: "Uso versátil. 2-3 sprays. Duración: 8-10 horas.",
    notes: { top: ["Pera", "Bergamota"], heart: ["Rosa", "Jazmín"], base: ["Almizcle", "Vainilla", "Cedro"] }
  },
  "ysl-libre": {
    id: "ysl-libre", name: "Yves Saint Laurent Libre", image: "assets/catalog-images/Yves Saint Laurent Libre.png", label: "Diseñador",
    brand: "Yves Saint Laurent", price: 0, status: "Consultar precio", gender: "Femenino",
    gallery: ["assets/catalog-images/Yves Saint Laurent Libre.png"],
    presentations: ["10ml", "50ml", "100ml"],
    why: "Libre: sin restricciones. Empodera la libertad femenina.",
    smell: "Lavanda, vainilla, notas florales. Sensual pero fresco.",
    vibe: "Libertad, empoderamiento, elegancia rebelde.",
    usage: "Para cualquier ocasión. 2-4 sprays. Duración: 10+ horas.",
    notes: { top: ["Lavanda", "Mandarina"], heart: ["Azafrán", "Jazmín"], base: ["Vainilla", "Ámbar", "Almizcle"] }
  },
  "jean-paul-gaultier-le-male-elixir": {
    id: "jean-paul-gaultier-le-male-elixir", name: "Jean Paul Gaultier Le Male Elixir", image: "assets/catalog-images/Jean Paul Gaultier Le Male Elixir.png", label: "Diseñador",
    brand: "Jean Paul Gaultier", price: 0, status: "Consultar precio", gender: "Masculino",
    gallery: ["assets/catalog-images/Jean Paul Gaultier Le Male Elixir.png"],
    presentations: ["10ml", "50ml", "100ml"],
    why: "Elixir: bebida mágica. Versión intensificada del clásico Le Male.",
    smell: "Vainilla, lavanda, notas almendradas. Suave pero presente.",
    vibe: "Magnetismo, sofisticación, hechizo irresistible.",
    usage: "Para ocasiones especiales. 2-3 sprays. Duración: 12+ horas.",
    notes: { top: ["Lavanda", "Menta"], heart: ["Almendra", "Salvia"], base: ["Vainilla", "Ámbar", "Cuero"] }
  },
  "valentino-born-in-roma": {
    id: "valentino-born-in-roma", name: "Valentino Born In Roma", image: "assets/catalog-images/Valentino Born In Roma.png", label: "Diseñador",
    brand: "Valentino", price: 0, status: "Consultar precio", gender: "Masculino",
    gallery: ["assets/catalog-images/Valentino Born In Roma.png"],
    presentations: ["10ml", "50ml", "100ml"],
    why: "Nacido en Roma, la cuna de la elegancia. Sofisticación en cada nota.",
    smell: "Incienso, especias, ámbar. Profundo y orientalista.",
    vibe: "Historia, elegancia milenaria, poder ancestral.",
    usage: "Para eventos importantes. 2-3 sprays. Duración: 14+ horas.",
    notes: { top: ["Sal marina", "Bergamota"], heart: ["Lavanda", "Jengibre"], base: ["Ámbar", "Cedro", "Almizcle"] }
  },
  "calvin-klein-ck-one": {
    id: "calvin-klein-ck-one", name: "Calvin Klein CK One", image: "assets/catalog-images/Calvin Klein CK One.png", label: "Diseñador",
    brand: "Calvin Klein", price: 0, status: "Consultar precio", gender: "Unisex",
    gallery: ["assets/catalog-images/Calvin Klein CK One.png"],
    presentations: ["10ml", "50ml", "100ml"],
    why: "Unisex icónico. Fragancia que trasciende género con frescura moderna.",
    smell: "Cítricos frescos, pimienta, notas florales sutiles.",
    vibe: "Unidad, libertad de género, modernidad.",
    usage: "Perfecta para cualquiera. 3-4 sprays. Duración: 8-10 horas.",
    notes: { top: ["Bergamota", "Limón", "Mandarina"], heart: ["Violeta", "Rosa"], base: ["Almizcle", "Ámbar", "Cedro"] }
  }
};

const FRASCOS = {
  pequeño: {
    tipo: "pequeño", nombre: "Frasco Portátil 10ml",
    descripcion: "Ideal para llevar en bolsillo, cartera o maleta.",
    capacidad: "10ml", categoria: "Decant / Bolsillo",
    imagen: "assets/frascos/presentacion disponible  de lujo /Frascos De Perfume De Vidrio De 10 Ml Portátiles por encargo anticipado/Imagen pegada.png",
    caracteristicas: ["Botella de vidrio", "Atomizador fino", "Cierre de seguridad"],
    precioExtra: 5000, tiempoEntrega: "2-3 días"
  },
  estándar_50: {
    tipo: "estándar", nombre: "Frasco Estándar 50ml",
    descripcion: "Tamaño ideal para uso diario.",
    capacidad: "50ml", categoria: "Uso Diario",
    imagen: "assets/frascos/presentaciones disponibles normal /foto 1.png",
    caracteristicas: ["Botella recargable", "Atomizador profesional", "Diseño moderno"],
    precioExtra: 0, tiempoEntrega: "2-5 días"
  },
  estándar_100: {
    tipo: "estándar", nombre: "Frasco Estándar 100ml",
    descripcion: "Nuestro formato estrella. Máximo rendimiento.",
    capacidad: "100ml", categoria: "Mejor Valor",
    imagen: "assets/frascos/presentaciones disponibles normal /foto 2.png",
    caracteristicas: ["Vidrio resistente", "Atomizador precisión", "Sello garantía"],
    precioExtra: 0, tiempoEntrega: "2-5 días"
  },
  premium: {
    tipo: "premium", nombre: "Frasco Premium / Lujo",
    descripcion: "Exclusividad y acabados premium.",
    capacidad: "100ml", categoria: "Edición Especial",
    imagen: "assets/frascos/presentacion disponible  de lujo /frascos de lujos disponibles actual/envase de lujo 1.png",
    caracteristicas: ["Vidrio pesado", "Atomizador dorado", "Caja premium", "Ideal como regalo"],
    precioExtra: 25000, tiempoEntrega: "5-7 días"
  }
};

const AROMAS_INSPIRACION = [
  { nombre: "Creed Aventus", categoria: "Fresco/Cítrico", vibe: "Éxito, confianza, poder" },
  { nombre: "Dior Sauvage", categoria: "Amaderado/Especiado", vibe: "Clásico versátil, confianza" },
  { nombre: "Bleu de Chanel", categoria: "Fresco/Amaderado", vibe: "Elegancia, sofisticación" },
  { nombre: "Creed Green Irish Tweed", categoria: "Fresco/Floral", vibe: "Naturaleza, tranquilidad" },
  { nombre: "Tom Ford Black Orchid", categoria: "Oriental/Floral", vibe: "Misterio, sensualidad" },
  { nombre: "Yves Saint Laurent La Nuit", categoria: "Oriental/Ámbar", vibe: "Nocturno, seducción" },
  { nombre: "Paco Rabanne 1 Million", categoria: "Dulce/Oriental", vibe: "Lujo, poder, atracción" },
  { nombre: "Acqua di Parma Blu Mediterraneo", categoria: "Cítrico/Fresco", vibe: "Vacaciones, frescura" },
  { nombre: "Givenchy Gentleman", categoria: "Especiado/Amaderado", vibe: "Caballerosidad, refinamiento" },
  { nombre: "Jean Paul Gaultier Le Male", categoria: "Dulce/Ambarado", vibe: "Seducción, magnetismo" }
];

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { PRODUCTS, FRASCOS, AROMAS_INSPIRACION };
}
