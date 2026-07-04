let currentAroma = null;
let currentFrasco = null;
let chatIsTyping = false;
let chatHistory = [];

// ── Conversation flow ──

const chatFlow = {
  greeting: {
    message: "Hola 👋\n\nBienvenido a ZAYRO.\n\nEstoy aquí para ayudarte.\n\n¿Sobre qué necesitas información?",
    options: [
      { label: "Perfumes", next: "perfumes" },
      { label: "Envíos", next: "envios" },
      { label: "Pagos", next: "pagos" },
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
    message: "Aceptamos varios métodos de pago:\n\n• Nequi\n• Daviplata\n• Bancolombia\n• Efectivo (solo en puntos de encuentro)",
    options: [
      { label: "¿Cómo funciona?", next: "como-pagar" },
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
  "inspiracion": {
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
let currentProductId = null;

function openProductDetail(productId) {
  const product = PRODUCTS[productId];
  if (!product) return;
  currentProductId = productId;

  document.getElementById('detail-image-main').src = product.image;
  document.getElementById('detail-image-main').alt = product.name;
  document.getElementById('detail-title').textContent = product.name;
  document.getElementById('detail-brand').textContent = product.brand || 'ZAYRO';
  document.getElementById('detail-price').textContent = 'Consultar con asesor';
  document.getElementById('detail-status').textContent = 'Consultar disponibilidad';
  document.getElementById('detail-why').textContent = product.why;

  renderThumbnails(product);
  renderPresentations(product);
  renderNotes(product);

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

function renderPresentations(product) {
  // Presentaciones eliminadas visualmente
}

function renderNotes(product) {
  const container = document.getElementById('notes-grid');
  if (!product.notes) {
    container.innerHTML = '';
    document.getElementById('detail-notes').style.display = 'none';
    return;
  }
  document.getElementById('detail-notes').style.display = 'block';
  const labels = { top: 'Salida', heart: 'Corazón', base: 'Fondo' };
  container.innerHTML = Object.entries(product.notes).map(([key, notes]) => `
    <div class="note-group">
      <p class="note-group-label">${labels[key] || key}</p>
      <div class="note-group-tags">
        ${notes.map(n => `<span class="note-tag">${n}</span>`).join('')}
      </div>
    </div>
  `).join('');
}

detailClose?.addEventListener('click', closeProductDetail);
detailSection?.addEventListener('click', (e) => {
  if (e.target === detailSection) closeProductDetail();
});

document.getElementById('detail-add-cart')?.addEventListener('click', () => {
  if (currentProductId) {
    cartState.add(currentProductId);
    closeProductDetail();
  }
});

document.getElementById('detail-contact-wa')?.addEventListener('click', () => {
  if (currentProductId) {
    const product = PRODUCTS[currentProductId];
    const msg = `Hola, estoy interesado en ${product.name}. ¿Me das más información?`;
    window.open(`https://api.whatsapp.com/send/?phone=573016731498&text=${encodeURIComponent(msg)}`, '_blank');
  }
});

// ========== PRODUCT CARDS ==========
function initProductCards() {
  document.querySelectorAll('.product-card--catalog').forEach(card => {
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
      itemToAdd = {
        id: productOrItem.id || `custom-${Date.now()}`,
        productId: productOrItem.productId || `custom-${Date.now()}`,
        name: productOrItem.name || 'Inspiración personalizada',
        category: productOrItem.category || 'Inspiración',
        brand: productOrItem.brand || 'ZAYRO',
        price: typeof productOrItem.precio === 'number' ? productOrItem.precio : (typeof productOrItem.price === 'number' ? productOrItem.price : 0),
        status: productOrItem.status || 'Consultar',
        description: productOrItem.description || '',
        image: productOrItem.image || 'assets/logo-sin-fondo/Carritos.png',
        quantity: typeof productOrItem.quantity === 'number' ? productOrItem.quantity : 1,
        aroma: productOrItem.aroma || null,
        frasco: productOrItem.frasco || null,
        timestamp: productOrItem.timestamp || new Date().toISOString()
      };
      successMessage = `${itemToAdd.name} agregado.`;
    } else { return; }

    const existing = this.items.find(item => item.productId === itemToAdd.productId && item.name === itemToAdd.name && item.category === itemToAdd.category);
    if (existing) {
      existing.quantity += itemToAdd.quantity;
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
          <p>Consultar con asesor</p>
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
  if (sub) sub.textContent = 'Consultar con asesor';
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
    if (card.querySelector('.product-add')) return;
    const productId = card.dataset.productId;
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
      cartState.add(btn.dataset.productId);
    });
  });
}

function getCheckoutFormData() {
  const name = document.getElementById('checkout-modal-name')?.value.trim() || '';
  const city = document.getElementById('checkout-modal-city')?.value.trim() || '';
  const phone = document.getElementById('checkout-modal-phone')?.value.trim() || '';
  return { name, city, phone };
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
  document.getElementById('checkout-modal-phone').value = customer.phone || '';
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
  const phone = user.phone || 'No indicado';
  const lines = [
    'Hola, equipo de ZAYRO. 👋',
    '',
    'Quiero solicitar información sobre los siguientes productos:',
    '',
    '🛍️ Productos:'
  ];
  cartState.items.forEach(item => {
    lines.push(`• ${item.name} ×${item.quantity}`);
  });
  lines.push('');
  lines.push('Mis datos:');
  lines.push(`• Nombre: ${name}`);
  lines.push(`• Ciudad/Residencia: ${city}`);
  lines.push(`• Teléfono: ${phone}`);
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
  const panel = document.querySelector('.checkout-modal__panel');
  panel?.addEventListener('mouseleave', closeCheckoutModal);
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
      addChatMessage('¡Claro! Aquí tienes nuestro catálogo.', true);
      const catalogoBtn = document.createElement('div');
      catalogoBtn.className = 'chat-options';
      const link = document.createElement('a');
      link.className = 'chat-option chat-option--accent';
      link.href = '#catalogo';
      link.textContent = 'Ver catálogo de perfumes →';
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
    hola: 'greeting',
    buenas: 'greeting',
    ayu: 'greeting'
  };

  let matched = null;
  for (const [word, node] of Object.entries(keywords)) {
    if (lower.includes(word)) {
      matched = node;
      break;
    }
  }

  if (matched && chatFlow[matched]) {
    showChatTyping();
    const node = chatFlow[matched];
    chatCurrentNode = matched;
    setTimeout(() => {
      addChatMessage(node.message, true);
      const chatBody = document.getElementById('chat-body');
      const optsEl = renderChatOptions(node.options);
      chatBody.appendChild(optsEl);
      chatBody.scrollTop = chatBody.scrollHeight;
    }, 500);
  } else {
    showChatTyping();
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

function openInspirationModal() {
  modalInspiracion?.classList.add('is-open');
  document.body.style.overflow = 'hidden';
  renderAromaOptions();
}

function closeInspirationModal() {
  modalInspiracion?.classList.remove('is-open');
  document.body.style.overflow = '';
  resetInspirationForm();
}

function resetInspirationForm() {
  currentAroma = null;
  currentFrasco = null;
  document.getElementById('step-aroma').style.display = 'block';
  document.getElementById('step-frasco').style.display = 'none';
  document.getElementById('step-confirmacion').style.display = 'none';
  document.getElementById('aroma-search').value = '';
}

function renderAromaOptions() {
  const grid = document.getElementById('aroma-grid');
  if (!grid) return;
  grid.innerHTML = AROMAS_INSPIRACION.map((aroma, idx) => `
    <button class="aroma-option" data-aroma="${aroma.nombre}">
      <span class="aroma-name">${aroma.nombre}</span>
      <span class="aroma-category">${aroma.categoria}</span>
      <span class="aroma-vibe">${aroma.vibe}</span>
    </button>
  `).join('');
  grid.querySelectorAll('.aroma-option').forEach(btn => {
    btn.addEventListener('click', () => {
      currentAroma = btn.dataset.aroma;
      grid.querySelectorAll('.aroma-option').forEach(b => { b.style.opacity = '0.5'; b.style.border = '1px solid rgba(184,145,90,0.18)'; });
      btn.style.opacity = '1';
      btn.style.border = '2px solid var(--zayro-accent)';
      document.getElementById('btn-next-frasco').disabled = false;
    });
  });
}

function renderFrascoOptions() {
  const gallery = document.getElementById('frasco-gallery');
  if (!gallery) return;
  gallery.innerHTML = Object.entries(FRASCOS).map(([key, frasco]) => `
    <button type="button" class="frasco-card" data-frasco-key="${key}">
      <img src="${frasco.imagen}" alt="${frasco.nombre}" loading="lazy" />
      <div class="frasco-card-meta">
        <span class="frasco-name">${frasco.nombre}</span>
      </div>
    </button>
  `).join('');
  gallery.querySelectorAll('.frasco-card').forEach(card => {
    card.addEventListener('click', () => {
      currentFrasco = card.dataset.frascoKey;
      gallery.querySelectorAll('.frasco-card').forEach(c => c.classList.remove('selected'));
      card.classList.add('selected');
      document.getElementById('btn-next-confirmacion').disabled = false;
    });
  });
  if (currentFrasco) {
    const sel = gallery.querySelector(`.frasco-card[data-frasco-key="${currentFrasco}"]`);
    if (sel) sel.classList.add('selected');
  }
}

function showFrascoStep() {
  if (!currentAroma) { renderCartNotification('Selecciona un aroma primero.'); return; }
  document.getElementById('step-aroma').style.display = 'none';
  document.getElementById('step-frasco').style.display = 'block';
  renderFrascoOptions();
}

function showConfirmacionStep() {
  if (!currentFrasco) { renderCartNotification('Selecciona un envase.'); return; }
  document.getElementById('step-frasco').style.display = 'none';
  document.getElementById('step-confirmacion').style.display = 'block';
  const frasco = FRASCOS[currentFrasco];
  const cantidad = parseInt(document.getElementById('cantidad-inspiracion').value) || 1;
  document.getElementById('resumen-aroma').textContent = currentAroma;
  document.getElementById('resumen-frasco').textContent = frasco.nombre;
  document.getElementById('resumen-cantidad').textContent = cantidad;
  document.getElementById('resumen-precio').textContent = 'Consultar con asesor';
}

function addInspirationToCart() {
  if (!currentAroma || !currentFrasco) { renderCartNotification('Completa todos los pasos.'); return; }
  const frasco = FRASCOS[currentFrasco];
  if (!frasco) { renderCartNotification('Selecciona un envase.'); return; }
  const cantidad = parseInt(document.getElementById('cantidad-inspiracion').value) || 1;
  if (cantidad < 1) { renderCartNotification('Cantidad debe ser mayor a 0.'); return; }
  const item = {
    type: 'inspiracion',
    aroma: currentAroma,
    frasco: frasco.nombre,
    name: `Inspiración ${currentAroma} en ${frasco.nombre}`,
    price: frasco.precioExtra || 0,
    image: frasco.imagen,
    category: 'Inspiración',
    description: frasco.descripcion || '',
    status: frasco.precioExtra > 0 ? 'Disponible' : 'Consultar',
    quantity: cantidad,
    timestamp: new Date().toISOString()
  };
  cartState.add(item);
  addChatMessage(`¡Excelente! 🎁 ${item.name} (×${cantidad}) ya está en tu carrito.`, true);
  closeInspirationModal();
  document.getElementById('chat-panel')?.classList.add('is-open');
}

function renderLandingFrascoHook() {
  const hook = document.getElementById('inspiracion-landing-grid');
  if (!hook) return;
  hook.innerHTML = Object.entries(FRASCOS).slice(0, 4).map(([key, frasco]) => `
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
      openInspirationModal();
      showFrascoStep();
      currentFrasco = card.dataset.frascoKey;
    });
  });
}

function initInspirationModal() {
  btnInspiracion?.addEventListener('click', openInspirationModal);
  btnInspirationClose?.addEventListener('click', closeInspirationModal);
  document.getElementById('btn-next-frasco')?.addEventListener('click', showFrascoStep);
  document.getElementById('btn-next-confirmacion')?.addEventListener('click', showConfirmacionStep);
  document.getElementById('btn-back-aroma')?.addEventListener('click', () => {
    document.getElementById('step-frasco').style.display = 'none';
    document.getElementById('step-aroma').style.display = 'block';
  });
  document.getElementById('btn-back-frasco')?.addEventListener('click', () => {
    document.getElementById('step-confirmacion').style.display = 'none';
    document.getElementById('step-frasco').style.display = 'block';
  });
  document.getElementById('btn-agregar-inspiracion')?.addEventListener('click', addInspirationToCart);
  document.getElementById('btn-hablar-asesor')?.addEventListener('click', () => {
    const input = document.getElementById('aroma-search').value.trim();
    const msg = input
      ? `Hola, me gustaría una inspiración de: ${input}.`
      : 'Hola, quiero crear una inspiración personalizada.';
    window.open(`https://api.whatsapp.com/send/?phone=573016731498&text=${encodeURIComponent(msg)}`, '_blank');
    closeInspirationModal();
  });
  document.getElementById('aroma-search')?.addEventListener('keyup', (e) => {
    const search = e.target.value.toLowerCase();
    document.querySelectorAll('.aroma-option').forEach(opt => {
      opt.style.display = opt.dataset.aroma.toLowerCase().includes(search) ? 'block' : 'none';
    });
  });
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
  window.addEventListener('scroll', () => {
    header?.classList.toggle('scrolled', window.scrollY > 50);
  });
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
  initChat();
  initInspirationModal();
  renderLandingFrascoHook();
  initMetrics();
});
