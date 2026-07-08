let currentAroma = null;
let currentFrasco = null;
let currentPrecio = null;
let currentProductVariant = null;
let currentProductCut = null;
let currentProductSize = null;
let chatIsTyping = false;
let chatHistory = [];

// ── Conversation flow ──

const chatFlow = {
  greeting: {
    message: "Hola 👋\n\nBienvenido a ZAYRO.\n\nEstoy aquí para ayudarte con perfumes, ropa o accesorios.\n\n¿Sobre qué quieres hablar?",
    options: [
      { label: "Perfumes", next: "perfumes" },
      { label: "Ropa", next: "ropa" },
      { label: "Accesorios", next: "accesorios" },
      { label: "Inspiración personalizada", action: "inspiracion" },
      { label: "Hablar con un asesor", action: "whatsapp" }
    ]
  },
  perfumes: {
    message: "Tenemos tres opciones.\n\n• Originales\n• Inspiraciones\n• Decants\n\n¿Cuál te interesa conocer?",
    options: [
      { label: "Originales", next: "originales" },
      { label: "Inspiraciones", next: "inspiraciones" },
      { label: "Decants", next: "decants" },
      { label: "Ver catálogo", action: "catalogo" },
      { label: "Hablar con un asesor", action: "whatsapp" }
    ]
  },
  originales: {
    message: "Trabajamos con fragancias originales 100% auténticas. Contamos con marcas de diseñador y de nicho.\n\n¿Quieres ver nuestro catálogo o prefieres hablar con un asesor para recomendaciones personalizadas?",
    options: [
      { label: "Ver catálogo", action: "catalogo" },
      { label: "Hablar con un asesor", action: "whatsapp" },
      { label: "No resolvió mi duda", action: "no-resuelto" }
    ]
  },
  inspiraciones: {
    message: "Nuestras inspiraciones son calidad Parfum de alta concentración con esencias premium.\n\nFijación de 8 a 12 horas en piel. Se presentan en envases exclusivos ZAYRO con diseño de lujo.",
    options: [
      { label: "Duración", next: "duracion" },
      { label: "Presentaciones", next: "presentaciones" },
      { label: "Ver catálogo", action: "catalogo" },
      { label: "Hablar con un asesor", action: "whatsapp" },
      { label: "No resolvió mi duda", action: "no-resuelto" }
    ]
  },
  duracion: {
    message: "Nuestras inspiraciones tienen una concentración Parfum, la más alta en perfumería.\n\nEn piel duran de 8 a 12 horas. En ropa pueden permanecer varios días.\n\nIdeal para el clima colombiano.",
    options: [
      { label: "Presentaciones", next: "presentaciones" },
      { label: "Ver catálogo", action: "catalogo" },
      { label: "Hablar con un asesor", action: "whatsapp" },
      { label: "No resolvió mi duda", action: "no-resuelto" }
    ]
  },
  presentaciones: {
    message: "Manejamos varios formatos:\n\n• 10 ml — ideal para probar\n• 50 ml — personal\n• 100 ml — el más popular\n\nTodos en envases premium con diseño ZAYRO.",
    options: [
      { label: "Precios", next: "precios-inspiraciones" },
      { label: "Ver catálogo", action: "catalogo" },
      { label: "Hablar con un asesor", action: "whatsapp" },
      { label: "No resolvió mi duda", action: "no-resuelto" }
    ]
  },
  "precios-inspiraciones": {
    message: "Los precios varían según el formato.\n\nPara darte una cotización exacta, escríbenos por WhatsApp y te atendemos al instante.",
    options: [
      { label: "Hablar con un asesor", action: "whatsapp" },
      { label: "No resolvió mi duda", action: "no-resuelto" }
    ]
  },
  decants: {
    message: "Los decants son una forma económica de probar varias fragancias antes de decidirte por un frasco completo.\n\nPregunta a nuestro asesor por los tamaños y precios disponibles.",
    options: [
      { label: "Hablar con un asesor", action: "whatsapp" },
      { label: "No resolvió mi duda", action: "no-resuelto" }
    ]
  },
  envios: {
    message: "Hacemos envíos a toda Colombia 🇨🇴\n\nEl tiempo de entrega es de 2 a 5 días hábiles. Una vez confirmado tu pedido, te compartimos la guía de rastreo.",
    options: [
      { label: "Costo de envío", next: "costo-envio" },
      { label: "Tiempo de entrega", next: "tiempo-entrega" },
      { label: "Ver todo", next: "catalogo-general" },
      { label: "Hablar con un asesor", action: "whatsapp" },
      { label: "No resolvió mi duda", action: "no-resuelto" }
    ]
  },
  "costo-envio": {
    message: "El costo de envío depende de tu ciudad y del peso del pedido.\n\nEscríbenos por WhatsApp con tu ubicación y te damos el valor exacto.",
    options: [
      { label: "Hablar con un asesor", action: "whatsapp" },
      { label: "No resolvió mi duda", action: "no-resuelto" }
    ]
  },
  "tiempo-entrega": {
    message: "Una vez confirmado el pedido, lo despachamos en las siguientes 24 horas.\n\nEl tiempo de tránsito es de 2 a 5 días hábiles según la ciudad.",
    options: [
      { label: "Costo de envío", next: "costo-envio" },
      { label: "Hablar con un asesor", action: "whatsapp" },
      { label: "No resolvió mi duda", action: "no-resuelto" }
    ]
  },
  pagos: {
    message: "Aceptamos varios métodos de pago:\n\n• Nequi\n• Daviplata\n• Bancolombia\n• Efectivo (solo en puntos de encuentro)\n\nSi quieres, te envío la forma más fácil para tu compra.",
    options: [
      { label: "¿Cómo funciona?", next: "como-pagar" },
      { label: "Ver catálogo completo", next: "catalogo-general" },
      { label: "Hablar con un asesor", action: "whatsapp" },
      { label: "No resolvió mi duda", action: "no-resuelto" }
    ]
  },
  "como-pagar": {
    message: "Es muy sencillo:\n\n1. Revisa los productos que te interesan\n2. Escríbenos por WhatsApp\n3. El asesor te envía los datos para transferir\n4. Confirmamos tu pago y despachamos",
    options: [
      { label: "Hablar con un asesor", action: "whatsapp" },
      { label: "No resolvió mi duda", action: "no-resuelto" }
    ]
  },
  ropa: {
    message: "Nuestra colección incluye camisas oversize y semi-oversize con corte urbano y actitud premium.\n\n¿Quieres ver las piezas más destacadas o necesitas ayuda con tallas?",
    options: [
      { label: "Ver colección", action: "coleccion" },
      { label: "Preguntar por tallas", next: "tallas" },
      { label: "Hablar con un asesor", action: "whatsapp" },
      { label: "No resolvió mi duda", action: "no-resuelto" }
    ]
  },
  tallas: {
    message: "Trabajamos principalmente con cortes oversize y semi-oversize.\n\nSi prefieres algo más ajustado o una recomendación personalizada, te ayudo con el estilo y la talla adecuada.",
    options: [
      { label: "Ver colección", action: "coleccion" },
      { label: "Hablar con un asesor", action: "whatsapp" },
      { label: "No resolvió mi duda", action: "no-resuelto" }
    ]
  },
  accesorios: {
    message: "También tenemos accesorios como gorras, joyería, gafas, cintillos, bolsos y termos.\n\nTodo pensado para completar tu look urbano con estilo.",
    options: [
      { label: "Ver accesorios", next: "accesorios-ver" },
      { label: "Hablar con un asesor", action: "whatsapp" },
      { label: "No resolvió mi duda", action: "no-resuelto" }
    ]
  },
  "accesorios-ver": {
    message: "Puedes explorar nuestra sección de accesorios y consultar disponibilidad por WhatsApp.\n\n¿Quieres que te muestre los productos que tenemos ahora?",
    options: [
      { label: "Mostrar accesorios", action: "accesorios" },
      { label: "Hablar con un asesor", action: "whatsapp" },
      { label: "No resolvió mi duda", action: "no-resuelto" }
    ]
  },
  "catalogo-general": {
    message: "Aquí tienes el catálogo completo: perfumes, inspiración, colección y accesorios.\n\nPuedes navegar libremente o pedirme una recomendación directa.",
    options: [
      { label: "Ir a perfumes", action: "catalogo" },
      { label: "Ir a ropa", action: "coleccion" },
      { label: "Ir a accesorios", action: "accesorios" },
      { label: "Hablar con un asesor", action: "whatsapp" }
    ]
  },
  inspiracion: {
    message: "¿Quieres una fragancia única? Con ZAYRO puedes crear tu inspiración personalizada.\n\nElige tu aroma favorito y el envase que más te guste, y preparamos todo para ti.",
    options: [
      { label: "Quiero empezar", action: "empezar-inspiracion" },
      { label: "Ver envases", action: "ver-envases" },
      { label: "Hablar con un asesor", action: "whatsapp" },
      { label: "No resolvió mi duda", action: "no-resuelto" }
    ]
  }
};

function showChatTyping() {
  chatIsTyping = true;
  const chatBody = document.getElementById('chat-body');
  const typingDiv = document.createElement('div');
  typingDiv.className = 'chat-message bot typing';
  typingDiv.id = 'chat-typing';
  typingDiv.innerHTML = '<p>Escribiendo<span>.</span><span>.</span><span>.</span></p>';
  chatBody.appendChild(typingDiv);
  chatBody.scrollTop = chatBody.scrollHeight;
}

function removeChatTyping() {
  chatIsTyping = false;
  const typingDiv = document.getElementById('chat-typing');
  if (typingDiv) typingDiv.remove();
}

function addChatMessage(text, isBot = true) {
  removeChatTyping();
  const chatBody = document.getElementById('chat-body');
  const messageDiv = document.createElement('div');
  messageDiv.className = `chat-message ${isBot ? 'bot' : 'user'}`;
  messageDiv.innerHTML = `<p>${text.replace(/\n/g, '<br>')}</p>`;
  chatBody.appendChild(messageDiv);
  chatBody.scrollTop = chatBody.scrollHeight;
  chatHistory.push({ text, isBot });
}

// ========== PRODUCT DETAIL SECTION (replaces modal) ==========
const detailSection = document.getElementById('product-detail-section');
const detailClose = document.getElementById('product-detail-close');

function openProductDetail(productId) {
  const product = PRODUCTS[productId];
  if (!product) return;
  currentProductId = productId;

  document.getElementById('detail-image-main').src = product.image;
  document.getElementById('detail-image-main').alt = product.name;
  document.getElementById('detail-title').textContent = product.name;
  document.getElementById('detail-brand').textContent = product.brand || 'ZAYRO';
  document.getElementById('detail-why').textContent = product.description || product.why || '';
  currentProductCut = product.cuts && product.cuts.length ? product.cuts[0] : null;
  currentProductSize = product.sizes && product.sizes.length ? product.sizes[0] : null;
  updateProductVariant();
  const isClothing = product.cuts && product.cuts.length && product.sizes && product.sizes.length;
  document.getElementById('detail-hint').textContent = isClothing ? '2XL+ tiene costo adicional. Te asesoramos por WhatsApp. Métodos de pago en desarrollo.' : '';
  renderThumbnails(product);
  renderPresentations(product);

  detailSection.classList.add('is-open');
  document.body.style.overflow = 'hidden';
}

function closeProductDetail() {
  detailSection.classList.remove('is-open');
  document.body.style.overflow = '';
  currentProductId = null;
}

function renderThumbnails(product) {
  const container = document.getElementById('detail-gallery-thumbs');
  const images = product.gallery || [product.image];
  container.innerHTML = images.map((img, i) => `
    <button class="${i === 0 ? 'is-active' : ''}" data-index="${i}">
      <img src="${img}" alt="${product.name} ${i + 1}" loading="lazy" />
    </button>
  `).join('');

  container.querySelectorAll('button').forEach(btn => {
    btn.addEventListener('click', () => {
      container.querySelectorAll('button').forEach(b => b.classList.remove('is-active'));
      btn.classList.add('is-active');
      document.getElementById('detail-image-main').src = images[parseInt(btn.dataset.index)];
    });
  });
}

function updateProductVariant() {
  if (currentProductCut && currentProductSize) {
    currentProductVariant = {
      label: `${currentProductCut.label} · ${currentProductSize.label}`,
      basePrice: currentProductCut.basePrice,
      surcharge: currentProductSize.surcharge,
      price: currentProductCut.basePrice + currentProductSize.surcharge
    };
  } else {
    currentProductVariant = null;
  }

  const priceEl = document.getElementById('detail-price');
  const statusEl = document.getElementById('detail-status');

  if (priceEl) {
    priceEl.textContent = currentProductVariant ? formatCurrency(currentProductVariant.price) : 'Bajo encargo';
  }
  if (statusEl) {
    statusEl.textContent = currentProductVariant
      ? `Corte ${currentProductCut.label} · Talla ${currentProductSize.label}`
      : '';
  }
}

function renderPresentations(product) {
  const container = document.getElementById('detail-variant');
  if (!container) return;

  const sections = [];

  if (product.cuts && product.cuts.length) {
    sections.push(`
      <div class="detail-section">
        <p class="detail-section-title">Corte</p>
        <div class="variant-options" id="cut-options"></div>
      </div>
    `);
  }

  if (product.sizes && product.sizes.length) {
    sections.push(`
      <div class="detail-section">
        <p class="detail-section-title">Talla</p>
        <div class="variant-options" id="size-options"></div>
      </div>
      <p style="margin:0.5rem 0 0;color:var(--zayro-mist);font-size:0.9rem;">2XL y 3XL tienen costo adicional.</p>
    `);
  }

  if (!sections.length) {
    container.style.display = 'none';
    container.innerHTML = '';
    return;
  }

  container.style.display = 'block';
  container.innerHTML = sections.join('');

  if (product.cuts && product.cuts.length) {
    const options = document.getElementById('cut-options');
    options.innerHTML = product.cuts.map((cut, index) => `
      <button type="button" class="variant-button ${index === 0 ? 'is-active' : ''}" data-cut="${cut.value}">
        ${cut.label}
      </button>
    `).join('');
    options.querySelectorAll('.variant-button').forEach(btn => {
      btn.addEventListener('click', () => {
        options.querySelectorAll('.variant-button').forEach(b => b.classList.remove('is-active'));
        btn.classList.add('is-active');
        const cutValue = btn.dataset.cut;
        currentProductCut = product.cuts.find(cut => cut.value === cutValue) || product.cuts[0];
        updateProductVariant();
      });
    });
  }

  if (product.sizes && product.sizes.length) {
    const options = document.getElementById('size-options');
    options.innerHTML = product.sizes.map((size, index) => `
      <button type="button" class="variant-button ${index === 0 ? 'is-active' : ''}" data-size="${size.value}">
        ${size.label}
      </button>
    `).join('');
    options.querySelectorAll('.variant-button').forEach(btn => {
      btn.addEventListener('click', () => {
        options.querySelectorAll('.variant-button').forEach(b => b.classList.remove('is-active'));
        btn.classList.add('is-active');
        const sizeValue = btn.dataset.size;
        currentProductSize = product.sizes.find(size => size.value === sizeValue) || product.sizes[0];
        updateProductVariant();
      });
    });
  }
}


detailClose?.addEventListener('click', closeProductDetail);
detailSection?.addEventListener('click', (e) => {
  if (e.target === detailSection) closeProductDetail();
});

document.getElementById('detail-add-cart')?.addEventListener('click', () => {
  if (currentProductId) {
    const product = PRODUCTS[currentProductId];
    if (!product) return;
    const item = {
      productId: product.id,
      name: product.name,
      category: product.label || 'Sin categoría',
      brand: product.brand || 'ZAYRO',
      price: currentProductVariant && currentProductVariant.price ? currentProductVariant.price : 0,
      status: currentProductVariant && currentProductVariant.price ? 'Disponible' : 'Bajo encargo',
      description: product.description || product.why || '',
      image: product.image,
      quantity: 1,
      variant: currentProductVariant ? currentProductVariant.label : null
    };
    cartState.add(item);
    closeProductDetail();
  }
});

document.getElementById('detail-contact-wa')?.addEventListener('click', () => {
  if (currentProductId) {
    const product = PRODUCTS[currentProductId];
    const variantInfo = currentProductVariant ? `, ${currentProductVariant.label}` : '';
    const msg = `Hola, estoy interesado en ${product.name}${variantInfo}. ¿Me das más información?`;
    window.open(`https://api.whatsapp.com/send/?phone=573016731498&text=${encodeURIComponent(msg)}`, '_blank');
  }
});

// ========== PRODUCT CARDS ==========
function initProductCards() {
  document.querySelectorAll('.product-card--catalog').forEach(card => {
    const productId = card.dataset.productId;
    const product = productId ? PRODUCTS[productId] : null;
    if (product) {
      const priceEl = card.querySelector('.product-price');
      if (priceEl) {
        priceEl.textContent = '';
        priceEl.style.display = 'none';
      }
    }

    card.addEventListener('click', (e) => {
      if (e.target.closest('.product-cta') || e.target.closest('.product-add')) return;
      const productId = card.dataset.productId;
      if (productId) openProductDetail(productId);
    });
    const cta = card.querySelector('.product-cta');
    if (cta) {
      cta.addEventListener('click', (e) => {
        e.stopPropagation();
        const productId = card.dataset.productId;
        if (productId) openProductDetail(productId);
      });
    }
  });
  addCartButtonsToProducts();
}

// ========== CART ==========
const CART_STORAGE_KEY = 'zayro-cart';
const WA_PHONE = '573016731498';
const CUSTOMER_STORAGE_KEY = 'zayro-cart-customer';

const cartState = {
  items: [],
  category: null,
  customer: null,
  load() {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      this.items = saved ? JSON.parse(saved) : [];
    } catch (e) { this.items = []; }
    try {
      const savedCustomer = localStorage.getItem(CUSTOMER_STORAGE_KEY);
      this.customer = savedCustomer ? JSON.parse(savedCustomer) : null;
    } catch (e) { this.customer = null; }
    this.category = this.computeCategory();
    this.updateUI();
  },
  save() {
    this.category = this.computeCategory();
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(this.items));
    if (this.customer) {
      localStorage.setItem(CUSTOMER_STORAGE_KEY, JSON.stringify(this.customer));
    } else {
      localStorage.removeItem(CUSTOMER_STORAGE_KEY);
    }
    this.updateUI();
  },
  getQuantity() { return this.items.reduce((sum, item) => sum + item.quantity, 0); },
  getItemsTotal() { return this.items.reduce((sum, item) => sum + ((item.price || 0) * item.quantity), 0); },
  getTotal() { return this.getItemsTotal(); },
  hasConsultItems() { return this.items.some(item => !item.price || item.price <= 0); },
  hasItems() { return this.items.length > 0; },
  add(productOrItem) {
    let itemToAdd;
    let successMessage = 'Producto agregado.';

    if (typeof productOrItem === 'string') {
      const product = PRODUCTS[productOrItem];
      if (!product) return;
      const unitPrice = typeof product.price === 'number' ? product.price : 0;
      itemToAdd = {
        id: product.id,
        productId: product.id,
        name: product.name,
        category: product.label || 'Sin categoría',
        brand: product.brand || 'ZAYRO',
        price: unitPrice,
        status: product.status || (unitPrice > 0 ? 'Disponible' : 'Consultar'),
        description: product.why || '',
        image: product.image,
        quantity: 1
      };
      successMessage = `${product.name} agregado.`;
    } else if (typeof productOrItem === 'object' && productOrItem !== null) {
      const normalizedPrice = typeof productOrItem.precio === 'number'
        ? productOrItem.precio
        : (typeof productOrItem.price === 'number' ? productOrItem.price : 0);
      itemToAdd = {
        id: productOrItem.id || `custom-${Date.now()}`,
        productId: productOrItem.productId || `custom-${Date.now()}`,
        name: productOrItem.name || 'Inspiración personalizada',
        category: productOrItem.category || 'Inspiración',
        brand: productOrItem.brand || 'ZAYRO',
        price: normalizedPrice,
        status: productOrItem.status || (normalizedPrice > 0 ? 'Disponible' : 'Consultar'),
        description: productOrItem.description || '',
        image: productOrItem.image || 'assets/logo-sin-fondo/Carritos.png',
        quantity: typeof productOrItem.quantity === 'number' ? productOrItem.quantity : 1,
        aroma: productOrItem.aroma || null,
        frasco: productOrItem.frasco || null,
        variant: productOrItem.variant || null,
        timestamp: productOrItem.timestamp || new Date().toISOString()
      };
      successMessage = `${itemToAdd.name} agregado.`;
    } else { return; }

    const existing = this.items.find(item => item.productId === itemToAdd.productId && item.name === itemToAdd.name && item.category === itemToAdd.category && (item.variant || '') === (itemToAdd.variant || ''));
    if (existing) {
      existing.quantity += itemToAdd.quantity;
      existing.price = itemToAdd.price || existing.price;
    } else {
      this.items.push(itemToAdd);
    }
    this.save();
    renderCartNotification(successMessage);
    renderCart();
    openCartSidebar();
  },
  remove(itemId) {
    this.items = this.items.filter(item => item.id !== itemId);
    this.save();
    renderCart();
  },
  updateQuantity(itemId, quantity) {
    const item = this.items.find(item => item.id === itemId);
    if (!item) return;
    item.quantity = Math.max(1, quantity);
    this.save();
    renderCart();
  },
  clear() { this.items = []; this.save(); renderCart(); },
  computeCategory() {
    const cats = [...new Set(this.items.map(item => item.category).filter(Boolean))];
    if (cats.length === 0) return null;
    if (cats.length === 1) return cats[0];
    return 'Mixto';
  },
  setCustomerInfo(customer) { this.customer = customer; this.save(); },
  updateUI() { updateCartCount(); renderCart(); }
};

function formatCurrency(amount) { return '$' + amount.toLocaleString('es-CO'); }

function renderCartNotification(message) {
  const notif = document.createElement('div');
  notif.className = 'notification';
  notif.textContent = message;
  document.body.appendChild(notif);
  requestAnimationFrame(() => notif.classList.add('is-visible'));
  setTimeout(() => {
    notif.classList.remove('is-visible');
    setTimeout(() => notif.remove(), 300);
  }, 2800);
}

function updateCartCount() {
  const qty = cartState.getQuantity();
  const count = document.getElementById('cart-count');
  if (count) count.textContent = qty > 0 ? qty : '0';
  const floating = document.getElementById('floating-cart-count');
  if (floating) floating.textContent = qty > 0 ? qty : '0';
}

function updateCategoryUI() {
  const btn = document.getElementById('cart-confirm-btn');
  if (btn) btn.disabled = !cartState.hasItems();
}

function renderCart() {
  updateCartCount();
  updateCategoryUI();
  const cartItems = document.getElementById('cart-items');
  if (!cartItems) return;
  if (!cartState.hasItems()) {
    cartItems.innerHTML = '<p class="cart-empty">El carrito está vacío.</p>';
  } else {
    cartItems.innerHTML = cartState.items.map(item => `
      <div class="cart-item">
        <img src="${item.image}" alt="${item.name}" class="cart-item__image" />
        <div class="cart-item__info">
          <h4>${item.name}</h4>
          <p>${item.price && item.price > 0 ? formatCurrency(item.price) : 'Consultar con asesor'}</p>
          ${item.variant ? `<p style="margin:0.2rem 0 0;font-size:0.8rem;color:var(--zayro-mist)">Talla: ${item.variant}</p>` : ''}
          ${item.aroma ? `<p style="margin:0.2rem 0 0;font-size:0.8rem;color:var(--zayro-mist)">Aroma: ${item.aroma}</p>` : ''}
          ${item.frasco ? `<p style="margin:0;font-size:0.8rem;color:var(--zayro-mist)">Envase: ${item.frasco}</p>` : ''}
        </div>
        <div class="cart-item__controls">
          <button type="button" class="qty-btn" data-action="decrease" data-id="${item.id}">−</button>
          <span>${item.quantity}</span>
          <button type="button" class="qty-btn" data-action="increase" data-id="${item.id}">+</button>
        </div>
        <button type="button" class="cart-item__remove" data-remove="${item.id}" aria-label="Eliminar">&times;</button>
      </div>
    `).join('');
  }
  const sub = document.getElementById('cart-subtotal');
  if (sub) {
    if (cartState.hasConsultItems()) {
      sub.textContent = 'Consultar con asesor';
    } else {
      sub.textContent = formatCurrency(cartState.getTotal());
    }
  }
  attachCartItemListeners();
}

function attachCartItemListeners() {
  document.querySelectorAll('.qty-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.dataset.id;
      const action = btn.dataset.action;
      const item = cartState.items.find(i => i.id === id);
      if (!item) return;
      cartState.updateQuantity(id, action === 'decrease' ? item.quantity - 1 : item.quantity + 1);
    });
  });
  document.querySelectorAll('.cart-item__remove').forEach(btn => {
    btn.addEventListener('click', () => cartState.remove(btn.dataset.remove));
  });
}

function openCartSidebar() { document.getElementById('cart-sidebar')?.classList.add('is-open'); }
function closeCartSidebar() { document.getElementById('cart-sidebar')?.classList.remove('is-open'); }

function addCartButtonsToProducts() {
  document.querySelectorAll('.product-card--catalog').forEach(card => {
    const productId = card.dataset.productId;
    if (productId === 'zayro-camisa-coleccion') return;
    if (card.querySelector('.product-add')) return;
    const body = card.querySelector('.product-card__body');
    if (!body) return;
    const addBtn = document.createElement('button');
    addBtn.type = 'button';
    addBtn.className = 'product-add';
    addBtn.dataset.productId = productId;
    addBtn.textContent = 'Agregar';
    body.appendChild(addBtn);
  });
  document.querySelectorAll('.product-add').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const productId = btn.dataset.productId;
      const product = PRODUCTS[productId];
      if (!product) return;
      const variant = product.sizes && product.sizes.length ? product.sizes[0] : null;
      const price = variant?.price || product.price || 0;
      const item = {
        productId: product.id,
        name: product.name,
        category: product.label || 'Sin categoría',
        brand: product.brand || 'ZAYRO',
        price,
        status: product.status || (price > 0 ? 'Disponible' : 'Consultar'),
        description: product.description || product.why || '',
        image: product.image,
        quantity: 1,
        variant: variant ? variant.label : null
      };
      cartState.add(item);
    });
  });
}

function getCheckoutFormData() {
  const name = document.getElementById('checkout-modal-name')?.value.trim() || '';
  const city = document.getElementById('checkout-modal-city')?.value.trim() || '';
  const email = document.getElementById('checkout-modal-email')?.value.trim() || '';
  return { name, city, email };
}

function setCheckoutMessage(message, isError = false) {
  const msg = document.getElementById('checkout-form-message');
  if (!msg) return;
  msg.textContent = message;
  msg.classList.toggle('is-error', isError);
}

function openCheckoutModal() {
  const modal = document.getElementById('checkout-modal');
  if (!modal) return;
  const customer = cartState.customer || {};
  document.getElementById('checkout-modal-name').value = customer.name || '';
  document.getElementById('checkout-modal-city').value = customer.city || '';
  document.getElementById('checkout-modal-email').value = customer.email || '';
  setCheckoutMessage('');
  modal.classList.add('is-open');
  modal.setAttribute('aria-hidden', 'false');
  setTimeout(() => document.getElementById('checkout-modal-name')?.focus(), 80);
}

function closeCheckoutModal() {
  const modal = document.getElementById('checkout-modal');
  if (!modal) return;
  modal.classList.remove('is-open');
  modal.setAttribute('aria-hidden', 'true');
}

function buildWhatsappMessage() {
  const user = cartState.customer || getCheckoutFormData();
  const name = user.name || 'No indicado';
  const city = user.city || 'No indicado';
  const email = user.email || 'No indicado';
  const lines = [
    'Hola, equipo de ZAYRO. 👋',
    '',
    'Quiero solicitar información sobre los siguientes productos:',
    '',
    '🛍️ Productos:'
  ];
  cartState.items.forEach(item => {
    const variantInfo = item.variant ? ` (${item.variant})` : '';
    lines.push(`• ${item.name}${variantInfo} ×${item.quantity}`);
  });
  lines.push('');
  lines.push('Mis datos:');
  lines.push(`• Nombre: ${name}`);
  lines.push(`• Ciudad/Residencia: ${city}`);
  lines.push(`• Correo: ${email}`);
  lines.push('');
  lines.push('Quedo atento(a). Gracias.');
  return lines.join('\n');
}

function startWhatsappCheckout() {
  if (!cartState.hasItems()) { openCartSidebar(); return; }
  openCheckoutModal();
}

function submitCheckoutModal(event) {
  event.preventDefault();
  const customer = getCheckoutFormData();
  cartState.setCustomerInfo(customer);
  const url = `https://wa.me/${WA_PHONE}?text=${encodeURIComponent(buildWhatsappMessage())}`;
  window.open(url, '_blank');
  closeCheckoutModal();
}

function initCart() {
  document.getElementById('cart-toggle')?.addEventListener('click', openCartSidebar);
  document.getElementById('floating-cart-toggle')?.addEventListener('click', openCartSidebar);
  document.getElementById('cart-close')?.addEventListener('click', closeCartSidebar);
  document.getElementById('cart-confirm-btn')?.addEventListener('click', startWhatsappCheckout);
  document.getElementById('cart-continue-shopping-btn')?.addEventListener('click', closeCartSidebar);
  document.getElementById('checkout-modal-form')?.addEventListener('submit', submitCheckoutModal);
  document.getElementById('checkout-modal-close')?.addEventListener('click', closeCheckoutModal);
  document.getElementById('checkout-skip-btn')?.addEventListener('click', closeCheckoutModal);
  document.querySelectorAll('[data-close-checkout-modal]').forEach(el => {
    el.addEventListener('click', closeCheckoutModal);
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeCheckoutModal();
  });
  renderCart();
}

function initFaqAccordion() {
  document.querySelectorAll('.faq-item').forEach(item => {
    const button = item.querySelector('.faq-question');
    if (!button) return;
    button.addEventListener('click', () => {
      const willOpen = !item.classList.contains('is-open');
      document.querySelectorAll('.faq-item.is-open').forEach(openItem => {
        if (openItem !== item) {
          openItem.classList.remove('is-open');
          const openButton = openItem.querySelector('.faq-question');
          openButton?.setAttribute('aria-expanded', 'false');
        }
      });
      item.classList.toggle('is-open', willOpen);
      button.setAttribute('aria-expanded', String(willOpen));
    });
  });
}

// ========== CHAT ==========

let chatCurrentNode = '';

function renderChatOptions(options) {
  const optionsDiv = document.createElement('div');
  optionsDiv.className = 'chat-options';
  options.forEach(opt => {
    const btn = document.createElement('button');
    btn.className = 'chat-option';
    if (opt.action === 'whatsapp') btn.classList.add('chat-option--whatsapp');
    if (opt.action === 'catalogo' || opt.action === 'empezar-inspiracion') btn.classList.add('chat-option--accent');
    if (opt.action === 'no-resuelto') btn.classList.add('chat-option--cancel');
    btn.textContent = opt.label;
    btn.addEventListener('click', () => handleChatOption(opt));
    optionsDiv.appendChild(btn);
  });
  return optionsDiv;
}


function handleChatAction(action, label) {
  switch (action) {
    case 'whatsapp': {
      const lastUserMsg = [...chatHistory].reverse().find(m => !m.isBot);
      const context = lastUserMsg ? lastUserMsg.text : 'Información general';
      const msg = `Hola.\n\nEl asistente de ZAYRO no resolvió mi duda.\n\nNecesito ayuda con: ${context}`;
      window.open(`https://api.whatsapp.com/send/?phone=573016731498&text=${encodeURIComponent(msg)}`, '_blank');
      addChatMessage('Te conectamos con un asesor por WhatsApp.', true);
      break;
    }
    case 'catalogo': {
      addChatMessage('¡Claro! Te llevo a la sección de perfumes originales.', true);
      const catalogoBtn = document.createElement('div');
      catalogoBtn.className = 'chat-options';
      const link = document.createElement('a');
      link.className = 'chat-option chat-option--accent';
      link.href = '#catalogo';
      link.textContent = 'Ir a perfumes →';
      link.addEventListener('click', () => {
        const panel = document.getElementById('chat-panel');
        if (panel) panel.classList.remove('is-open');
      });
      catalogoBtn.appendChild(link);
      const chatBody = document.getElementById('chat-body');
      chatBody.appendChild(catalogoBtn);
      chatBody.scrollTop = chatBody.scrollHeight;
      break;
    }
  case 'coleccion': {
      addChatMessage('Perfecto, te muestro nuestra colección de ropa urbana.', true);
      const coleccionBtn = document.createElement('div');
      coleccionBtn.className = 'chat-options';
      const link = document.createElement('a');
      link.className = 'chat-option chat-option--accent';
      link.href = '#featured';
      link.textContent = 'Ver colección →';
      link.addEventListener('click', () => {
        const panel = document.getElementById('chat-panel');
        if (panel) panel.classList.remove('is-open');
      });
      coleccionBtn.appendChild(link);
      const chatBody = document.getElementById('chat-body');
      chatBody.appendChild(coleccionBtn);
      chatBody.scrollTop = chatBody.scrollHeight;
      break;
    }
  case 'accesorios': {
      addChatMessage('Ahora te llevo a nuestros accesorios: gorras, joyas, gafas, bolsos y más.', true);
      const accBtn = document.createElement('div');
      accBtn.className = 'chat-options';
      const link = document.createElement('a');
      link.className = 'chat-option chat-option--accent';
      link.href = '#accesorios';
      link.textContent = 'Ver accesorios →';
      link.addEventListener('click', () => {
        const panel = document.getElementById('chat-panel');
        if (panel) panel.classList.remove('is-open');
      });
      accBtn.appendChild(link);
      const chatBody = document.getElementById('chat-body');
      chatBody.appendChild(accBtn);
      chatBody.scrollTop = chatBody.scrollHeight;
      break;
    }
    case 'inspiracion': {
      addChatMessage('Te ayudo con eso.', true);
      const inspiracionOpts = renderChatOptions(chatFlow.inspiracion.options);
      const chatBody = document.getElementById('chat-body');
      chatBody.appendChild(inspiracionOpts);
      chatBody.scrollTop = chatBody.scrollHeight;
      chatCurrentNode = 'inspiracion';
      break;
    }
    case 'empezar-inspiracion': {
      addChatMessage('Vamos a crear tu inspiración personalizada 🎁', true);
      setTimeout(() => {
        openInspirationModal();
      }, 600);
      break;
    }
    case 'ver-envases': {
      addChatMessage('Mira nuestros envases disponibles.', true);
      const envasesBtn = document.createElement('div');
      envasesBtn.className = 'chat-options';
      const link = document.createElement('a');
      link.className = 'chat-option chat-option--accent';
      link.href = '#inspiracion';
      link.textContent = 'Ver envases →';
      link.addEventListener('click', () => {
        const panel = document.getElementById('chat-panel');
        if (panel) panel.classList.remove('is-open');
      });
      envasesBtn.appendChild(link);
      const chatBody = document.getElementById('chat-body');
      chatBody.appendChild(envasesBtn);
      chatBody.scrollTop = chatBody.scrollHeight;
      break;
    }
    case 'no-resuelto': {
      const lastUserMsg = [...chatHistory].reverse().find(m => !m.isBot);
      const context = lastUserMsg ? lastUserMsg.text : 'mi consulta';
      addChatMessage(`Lamento no haber resuelto tu consulta.\n\nUno de nuestros asesores puede ayudarte personalmente.`, true);
      setTimeout(() => {
        const chatBody = document.getElementById('chat-body');
        const waBtn = document.createElement('div');
        waBtn.className = 'chat-options';
        const btn = document.createElement('button');
        btn.className = 'chat-option chat-option--whatsapp';
        btn.textContent = 'Hablar por WhatsApp';
        btn.addEventListener('click', () => {
          const msg = `Hola.\n\nEl asistente de ZAYRO no resolvió mi duda.\n\nNecesito ayuda con: ${context}`;
          window.open(`https://api.whatsapp.com/send/?phone=573016731498&text=${encodeURIComponent(msg)}`, '_blank');
        });
        waBtn.appendChild(btn);
        chatBody.appendChild(waBtn);
        chatBody.scrollTop = chatBody.scrollHeight;
      }, 500);
      break;
    }
  }
}

function handleChatOption(opt) {
  if (opt.action) {
    addChatMessage(opt.label, false);
    handleChatAction(opt.action, opt.label);
    return;
  }
  if (opt.next) {
    addChatMessage(opt.label, false);
    showChatTyping();
    const node = chatFlow[opt.next];
    if (!node) return;
    chatCurrentNode = opt.next;
    setTimeout(() => {
      addChatMessage(node.message, true);
      const chatBody = document.getElementById('chat-body');
      const optsEl = renderChatOptions(node.options);
      chatBody.appendChild(optsEl);
      chatBody.scrollTop = chatBody.scrollHeight;
    }, 500);
  }
}

function handleUserFreeText(text) {
  const lower = text.toLowerCase().trim();
  addChatMessage(text, false);

  // Try keyword matching
  const keywords = {
    perfume: 'perfumes',
    perfumes: 'perfumes',
    envio: 'envios',
    envios: 'envios',
    envío: 'envios',
    envíos: 'envios',
    pago: 'pagos',
    pagos: 'pagos',
    paga: 'pagos',
    inspir: 'inspiracion',
    frasco: 'inspiracion',
    envase: 'inspiracion',
    original: 'originales',
    originales: 'originales',
    duracion: 'duracion',
    duración: 'duracion',
    decant: 'decants',
    decants: 'decants',
    presentacion: 'presentaciones',
    presentaciones: 'presentaciones',
    precio: 'precios-inspiraciones',
    precios: 'precios-inspiraciones',
    costo: 'costo-envio',
    tiempo: 'tiempo-entrega',
    entrega: 'tiempo-entrega',
    ropa: 'ropa',
    coleccion: 'ropa',
    camisa: 'ropa',
    sudadera: 'ropa',
    accesorio: 'accesorios',
    accesorios: 'accesorios',
    gorra: 'accesorios',
    bolso: 'accesorios',
    joya: 'accesorios',
    gafas: 'accesorios'
  };

  const matchedKeyword = Object.keys(keywords).find((keyword) => lower.includes(keyword));
  if (matchedKeyword) {
    const next = keywords[matchedKeyword];
    if (chatFlow[next]) {
      showChatTyping();
      setTimeout(() => {
        addChatMessage(chatFlow[next].message, true);
        const chatBody = document.getElementById('chat-body');
        const optsEl = renderChatOptions(chatFlow[next].options);
        chatBody.appendChild(optsEl);
        chatBody.scrollTop = chatBody.scrollHeight;
        chatCurrentNode = next;
      }, 500);
      return;
    }

    handleChatAction(next);
    return;
  }

  setTimeout(() => {
    addChatMessage("Gracias por compartirlo. Cuéntame más o elige una opción para ayudarte mejor.", true);
    const chatBody = document.getElementById('chat-body');
    const helpOpts = renderChatOptions([
      { label: "Perfumes", next: "perfumes" },
      { label: "Envíos", next: "envios" },
      { label: "Pagos", next: "pagos" },
      { label: "Hablar con un asesor", action: "whatsapp" }
    ]);
    chatBody.appendChild(helpOpts);
    chatBody.scrollTop = chatBody.scrollHeight;
  }, 500);
}

function initChat() {
  const toggle = document.getElementById('chat-toggle');
  const close = document.getElementById('chat-close');
  const panel = document.getElementById('chat-panel');
  const sendBtn = document.getElementById('chat-send');
  const input = document.getElementById('chat-input');

  toggle?.addEventListener('click', () => {
    const isOpen = panel?.classList.toggle('is-open');
    if (isOpen) {
      // First time opening — send greeting
      if (!chatHistory.length) {
        setTimeout(() => {
          addChatMessage(chatFlow.greeting.message, true);
          const chatBody = document.getElementById('chat-body');
          const optsEl = renderChatOptions(chatFlow.greeting.options);
          chatBody.appendChild(optsEl);
          chatBody.scrollTop = chatBody.scrollHeight;
          chatCurrentNode = 'greeting';
        }, 300);
      }
      // Focus input after panel opens
      setTimeout(() => input?.focus(), 400);
    }
  });

  close?.addEventListener('click', () => panel?.classList.remove('is-open'));

  function sendMessage() {
    const text = input?.value.trim();
    if (!text) return;
    input.value = '';
    handleUserFreeText(text);
  }

  sendBtn?.addEventListener('click', sendMessage);
  input?.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') sendMessage();
  });
}

// ========== INSPIRATION MODAL ==========
const modalInspiracion = document.getElementById('modal-inspiracion');
const btnInspiracion = document.getElementById('btn-inspiracion');
const btnInspirationClose = document.getElementById('modal-inspiracion-close');

function openInspirationModal(preserveFrasco = false) {
  modalInspiracion?.classList.add('is-open');
  document.body.style.overflow = 'hidden';
  resetInspirationForm(preserveFrasco);
  renderFrascoGrid();
  renderInspirationAromaOptions();
  showInspirationStep('detalle');
}

function closeInspirationModal() {
  modalInspiracion?.classList.remove('is-open');
  document.body.style.overflow = '';
  resetInspirationForm();
}

function resetInspirationForm(preserveFrasco = false) {
  currentAroma = null;
  currentPrecio = null;
  if (!preserveFrasco) {
    currentFrasco = null;
  }
  showInspirationStep('detalle');
  document.getElementById('inspiracion-text').value = '';
  document.getElementById('inspiracion-size').value = '';
  document.querySelectorAll('.aroma-option.selected').forEach(card => card.classList.remove('selected'));
  document.querySelectorAll('.price-option.selected').forEach(card => card.classList.remove('selected'));
  if (!preserveFrasco) {
    document.querySelectorAll('.frasco-card.selected').forEach(card => card.classList.remove('selected'));
    document.getElementById('btn-frasco-next')?.setAttribute('disabled', '');
  }
}

function showInspirationStep(step) {
  document.getElementById('step-frascos').style.display = step === 'frascos' ? 'block' : 'none';
  document.getElementById('step-detalle').style.display = step === 'detalle' ? 'block' : 'none';
  document.getElementById('step-confirmacion').style.display = step === 'confirmacion' ? 'block' : 'none';
}

function getUniqueFrascos() {
  const seenImages = new Set();
  return Object.entries(FRASCOS).filter(([key, frasco]) => {
    if (seenImages.has(frasco.imagen)) return false;
    seenImages.add(frasco.imagen);
    return true;
  });
}

function renderFrascoGrid() {
  const grid = document.getElementById('frasco-grid');
  if (!grid) return;
  grid.innerHTML = getUniqueFrascos().map(([key, frasco]) => `
    <button type="button" class="frasco-card" data-frasco-key="${key}">
      <img src="${frasco.imagen}" alt="${frasco.nombre}" loading="lazy" />
      <div class="frasco-card-meta">
        <span class="frasco-name">${frasco.nombre}</span>
      </div>
    </button>
  `).join('');

  grid.querySelectorAll('.frasco-card').forEach(card => {
    const key = card.dataset.frascoKey;
    card.addEventListener('click', () => {
      if (currentFrasco === key) {
        currentFrasco = null;
        currentPrecio = null;
        card.classList.remove('selected');
        renderPriceOptions(null);
        document.getElementById('btn-frasco-next')?.setAttribute('disabled', '');
        return;
      }
      currentFrasco = key;
      currentPrecio = null;
      grid.querySelectorAll('.frasco-card').forEach(c => c.classList.remove('selected'));
      card.classList.add('selected');
      renderPriceOptions(key);
    });
    if (currentFrasco === key) {
      card.classList.add('selected');
      renderPriceOptions(key);
    }
  });
}

function renderPriceOptions(frascoKey) {
  const container = document.getElementById('frasco-price-options');
  const nextButton = document.getElementById('btn-frasco-next');
  if (!container) return;
  if (!frascoKey) {
    container.innerHTML = '<p style="color: var(--zayro-mist);">Selecciona un frasco para ver los precios.</p>';
    nextButton?.setAttribute('disabled', '');
    return;
  }
  const frasco = FRASCOS[frascoKey];
  if (!frasco) return;
  if (!currentPrecio) {
    currentPrecio = frasco.precios[0] || null;
  }
  container.innerHTML = frasco.precios.map((precio, index) => {
    const selected = currentPrecio && currentPrecio.volumen === precio.volumen && currentPrecio.valor === precio.valor;
    return `
      <button
        type="button"
        class="price-option${selected ? ' selected' : ''}"
        data-precio-index="${index}"
        data-precio-label="${precio.volumen}"
        data-precio-value="${precio.valor}"
        aria-pressed="${selected ? 'true' : 'false'}"
      >
        ${precio.volumen} · ${precio.valor}
      </button>
    `;
  }).join('');
  nextButton?.removeAttribute('disabled');
  container.querySelectorAll('.price-option').forEach(option => {
    option.addEventListener('click', () => {
      const selectedLabel = option.dataset.precioLabel;
      const selectedValue = option.dataset.precioValue;
      const alreadySelected = currentPrecio && currentPrecio.volumen === selectedLabel && currentPrecio.valor === selectedValue;
      if (alreadySelected) {
        currentPrecio = null;
        option.classList.remove('selected');
        option.setAttribute('aria-pressed', 'false');
        nextButton?.setAttribute('disabled', '');
        return;
      }
      currentPrecio = {
        volumen: selectedLabel,
        valor: selectedValue
      };
      container.querySelectorAll('.price-option').forEach(o => {
        o.classList.remove('selected');
        o.setAttribute('aria-pressed', 'false');
      });
      option.classList.add('selected');
      option.setAttribute('aria-pressed', 'true');
      nextButton?.removeAttribute('disabled');
    });
  });
}

function getAromaInitials(name) {
  return name.split(' ').map(word => word[0]).join('').slice(0, 3).toUpperCase();
}

function renderInspirationAromaOptions() {
  const grid = document.getElementById('inspiracion-aroma-grid');
  const datalist = document.getElementById('inspiracion-presets');
  if (!grid || !datalist) return;
  grid.innerHTML = AROMAS_INSPIRACION.slice(0, 6).map(aroma => `
      <button type="button" class="aroma-option" data-aroma="${aroma.nombre}">
        <div class="aroma-image">
          <img src="${aroma.image || `assets/catalog-images/${aroma.nombre}.png`}" alt="${aroma.nombre}" loading="lazy"
            onload="this.nextElementSibling.style.display='none'"
            onerror="this.style.display='none'; this.nextElementSibling.style.display='flex'" />
          <div class="aroma-image-fallback">${getAromaInitials(aroma.nombre)}</div>
        </div>
        <div>
          <span class="aroma-name">${aroma.nombre}</span>
          <span class="aroma-category">${aroma.categoria}</span>
          <p class="aroma-vibe">${aroma.vibe}</p>
        </div>
      </button>
    `).join('');
  datalist.innerHTML = AROMAS_INSPIRACION.map(aroma => `<option value="${aroma.nombre}"></option>`).join('');
  grid.querySelectorAll('.aroma-option').forEach(option => {
    option.addEventListener('click', () => {
      const selected = option.dataset.aroma;
      currentAroma = selected;
      document.getElementById('inspiracion-text').value = selected;
      grid.querySelectorAll('.aroma-option').forEach(o => o.classList.remove('selected'));
      option.classList.add('selected');
    });
  });
}

function getInspirationSummaryData() {
  const tamano = document.getElementById('inspiracion-size').value.trim();
  const texto = document.getElementById('inspiracion-text').value.trim();
  const descripcion = texto || currentAroma || 'Sin detalles';

  return {
    tamano,
    texto,
    descripcion
  };
}

function updateInspirationSummary() {
  document.getElementById('resumen-frasco').textContent = FRASCOS[currentFrasco]?.nombre || 'Frasco';
  document.getElementById('resumen-precio').textContent = currentPrecio ? `${currentPrecio.volumen} · ${currentPrecio.valor}` : '-';
  return {};
}

function addInspirationToCart() {
  if (!currentFrasco) { renderCartNotification('Selecciona un frasco.'); return; }
  if (!currentPrecio) { renderCartNotification('Selecciona un precio para el frasco.'); return; }

  updateInspirationSummary();
  showInspirationStep('confirmacion');
}

function sendInspirationRequest() {
  const { tamano, descripcion } = updateInspirationSummary();
  const frascoNombre = FRASCOS[currentFrasco]?.nombre || 'un frasco';
  const mensaje = `Hola, quiero que me hagan una fragancia similar a ${descripcion}.
Frasco: ${frascoNombre}.
Tamaño: ${tamano || 'A confirmar por WhatsApp'}.
Te envío la imagen directamente por WhatsApp cuando se abra el chat.`;

  addChatMessage('Perfecto, ya abrí el chat con el asesor. Te la hacemos y te aviso por WhatsApp.', true);
  document.getElementById('chat-panel')?.classList.add('is-open');
  closeInspirationModal();
  window.open(`https://api.whatsapp.com/send/?phone=573016731498&text=${encodeURIComponent(mensaje)}`, '_blank');
}

function renderLandingFrascoHook() {
  const hook = document.getElementById('inspiracion-landing-grid');
  if (!hook) return;
  const references = getUniqueFrascos().slice(0, 3);
  hook.innerHTML = references.map(([key, frasco]) => `
      <button type="button" class="inspiracion-landing-card" data-frasco-key="${key}">
        <div class="card-image">
          <img src="${frasco.imagen}" alt="${frasco.nombre}" loading="lazy" />
        </div>
        <div class="card-info">
          <span>${frasco.nombre}</span>
        </div>
      </button>
    `).join('');
  hook.querySelectorAll('.inspiracion-landing-card').forEach(card => {
    card.addEventListener('click', () => {
      hook.querySelectorAll('.inspiracion-landing-card').forEach(c => c.classList.remove('selected'));
      card.classList.add('selected');
      currentFrasco = card.dataset.frascoKey;
      openInspirationModal(true);
      document.getElementById('inspiracion-text').value = '';
    });
  });
}

function initInspirationModal() {
  btnInspiracion?.addEventListener('click', openInspirationModal);
  btnInspirationClose?.addEventListener('click', closeInspirationModal);
  document.getElementById('btn-frasco-next')?.addEventListener('click', addInspirationToCart);
  document.getElementById('btn-back-frascos')?.addEventListener('click', () => showInspirationStep('detalle'));
  document.getElementById('btn-detalle-next')?.addEventListener('click', () => {
    renderFrascoGrid();
    showInspirationStep('frascos');
  });
  document.getElementById('btn-back-confirmacion')?.addEventListener('click', () => showInspirationStep('frascos'));
  document.getElementById('btn-add-inspiracion-cart')?.addEventListener('click', () => {
    if (!currentFrasco) { renderCartNotification('Selecciona un frasco.'); return; }
    if (!currentPrecio) { renderCartNotification('Selecciona un precio para el frasco.'); return; }

    const frasco = FRASCOS[currentFrasco];
    cartState.add({
      id: `inspiracion-${Date.now()}`,
      productId: `inspiracion-${Date.now()}`,
      name: `Inspiración personalizada - ${frasco?.nombre || 'Frasco'}`,
      category: 'Inspiración',
      brand: 'ZAYRO',
      price: Number((currentPrecio.valor || '0').replace(/\D/g, '')) || 0,
      status: 'Disponible',
      description: 'Inspiración personalizada',
      image: frasco?.imagen || 'assets/logo-sin-fondo/Carritos.png',
      quantity: 1,
      frasco: frasco?.nombre || '',
      variant: currentPrecio ? `${currentPrecio.volumen} · ${currentPrecio.valor}` : null,
      timestamp: new Date().toISOString()
    });
    renderCartNotification('Inspiración agregada al carrito.');
    closeInspirationModal();
  });
  document.getElementById('btn-send-inspiracion')?.addEventListener('click', sendInspirationRequest);
  initInspirationSwipeGestures();
}

function initInspirationSwipeGestures() {
  const modal = document.getElementById('modal-inspiracion');
  if (!modal) return;

  let touchStartX = 0;
  let touchStartY = 0;

  modal.addEventListener('touchstart', event => {
    const touch = event.changedTouches[0];
    touchStartX = touch.clientX;
    touchStartY = touch.clientY;
  }, { passive: true });

  modal.addEventListener('touchend', event => {
    const touch = event.changedTouches[0];
    const deltaX = touch.clientX - touchStartX;
    const deltaY = touch.clientY - touchStartY;
    const absX = Math.abs(deltaX);
    const absY = Math.abs(deltaY);
    const threshold = 50;

    if (absX > absY && absX > threshold) {
      if (deltaX > 0) {
        if (document.getElementById('step-frascos').style.display === 'block') showInspirationStep('detalle');
      } else {
        if (document.getElementById('step-detalle').style.display === 'block') showInspirationStep('frascos');
      }
    }

    if (absY > absX && absY > threshold && deltaY > 0) {
      closeInspirationModal();
    }
  }, { passive: true });
}

// ========== CAROUSEL ==========
function initCarousel() {
  const carousel = document.querySelector('.hero-carousel');
  if (!carousel) return;
  const slides = carousel.querySelectorAll('.carousel__slide');
  const prevBtn = carousel.querySelector('.carousel__prev');
  const nextBtn = carousel.querySelector('.carousel__next');
  let currentSlide = 0;
  let autoplayInterval;

  function showSlide(n) {
    slides.forEach(s => s.classList.remove('active'));
    slides[n].classList.add('active');
  }

  function nextSlide() { currentSlide = (currentSlide + 1) % slides.length; showSlide(currentSlide); }
  function prevSlide() { currentSlide = (currentSlide - 1 + slides.length) % slides.length; showSlide(currentSlide); }

  function startAutoplay() { autoplayInterval = setInterval(nextSlide, 4500); }
  function stopAutoplay() { clearInterval(autoplayInterval); }

  prevBtn?.addEventListener('click', () => { stopAutoplay(); prevSlide(); startAutoplay(); });
  nextBtn?.addEventListener('click', () => { stopAutoplay(); nextSlide(); startAutoplay(); });

  const wrap = carousel.closest('.hero__image-wrap');
  wrap?.addEventListener('mouseenter', stopAutoplay);
  wrap?.addEventListener('mouseleave', startAutoplay);

  carousel?.addEventListener('touchstart', (e) => {
    const startX = e.touches[0].clientX;
    carousel.addEventListener('touchend', (e2) => {
      const endX = e2.changedTouches[0].clientX;
      if (startX - endX > 50) nextSlide();
      if (endX - startX > 50) prevSlide();
    }, { once: true });
  });

  showSlide(0);
  startAutoplay();
}

// ========== REVEAL ==========
function initRevealAnimations() {
  const reveals = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
      }
    });
  }, { threshold: 0.1 });
  reveals.forEach(el => observer.observe(el));
}

// ========== HEADER SCROLL ==========
function initHeaderScroll() {
  const header = document.querySelector('.site-header');
  let lastScrollY = window.scrollY;

  window.addEventListener('scroll', () => {
    const currentY = window.scrollY;
    header?.classList.toggle('scrolled', currentY > 50);

    if (!header) return;
    if (currentY > lastScrollY + 8 && currentY > 120) {
      header.classList.add('hidden');
    } else if (currentY < lastScrollY - 8) {
      header.classList.remove('hidden');
    }

    lastScrollY = currentY;
  }, { passive: true });
}

// ========== METRICS ANIMATION ==========
function initMetrics() {
  const counters = document.querySelectorAll('.metric-number');
  if (!counters.length) return;
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.dataset.target);
        if (isNaN(target)) return;
        let current = 0;
        const step = Math.ceil(target / 60);
        const timer = setInterval(() => {
          current += step;
          if (current >= target) {
            el.textContent = target.toLocaleString('es-CO');
            clearInterval(timer);
          } else {
            el.textContent = current.toLocaleString('es-CO');
          }
        }, 25);
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.3 });
  counters.forEach(el => observer.observe(el));
}

function initCatalogToggle() {
  const catalogWrap = document.querySelector('.catalog-grid-wrap');
  const toggleBtn = document.querySelector('#catalog-toggle-btn');
  if (!catalogWrap || !toggleBtn) return;

  const label = toggleBtn.querySelector('.catalog-toggle-label');

  const updateState = () => {
    const expanded = catalogWrap.classList.contains('expanded');
    catalogWrap.classList.toggle('collapsed', !expanded);
    toggleBtn.setAttribute('aria-expanded', String(expanded));
    if (label) {
      label.textContent = expanded ? 'Ver menos perfumes' : 'Ver más perfumes';
    }
  };

  toggleBtn.addEventListener('click', () => {
    catalogWrap.classList.toggle('expanded');
    updateState();
  });

  updateState();
}

// ========== NAV TOGGLE ==========
function initNavToggle() {
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.site-nav');
  toggle?.addEventListener('click', () => {
    const isOpen = nav?.classList.toggle('is-open');
    toggle?.setAttribute('aria-expanded', String(isOpen));
  });
  nav?.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('is-open');
      toggle?.setAttribute('aria-expanded', 'false');
    });
  });
}

// ========== INIT ==========
document.addEventListener('DOMContentLoaded', () => {
  cartState.load();
  initCarousel();
  initRevealAnimations();
  initHeaderScroll();
  initNavToggle();
  initCart();
  initFaqAccordion();
  initProductCards();
  initCategoryTouchEffects();
  initCatalogToggle();
  initChat();
  initInspirationModal();
  renderLandingFrascoHook();
  initMetrics();
});

function initCategoryTouchEffects() {
  document.querySelectorAll('.card--category').forEach(card => {
    let activeTimeout;
    card.addEventListener('touchstart', () => {
      card.classList.add('touch-active');
      clearTimeout(activeTimeout);
    }, { passive: true });
    const removeTouchActive = () => {
      activeTimeout = setTimeout(() => card.classList.remove('touch-active'), 150);
    };
    card.addEventListener('touchend', removeTouchActive, { passive: true });
    card.addEventListener('touchcancel', removeTouchActive, { passive: true });
  });
}
