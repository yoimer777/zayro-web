// ========== GLOBAL STATE ==========
const cartState = {
  items: [],
  load() {
    const saved = localStorage.getItem('zayro-cart');
    this.items = saved ? JSON.parse(saved) : [];
    this.updateUI();
  },
  save() {
    localStorage.setItem('zayro-cart', JSON.stringify(this.items));
    this.updateUI();
  },
  add(productId, size) {
    const product = PRODUCTS[productId];
    if (!product) return;
    const [ml, price] = size.split('-');
    const item = {
      id: productId + '-' + ml,
      productId,
      name: product.name,
      ml,
      price: parseInt(price),
      image: product.image,
      quantity: 1
    };
    const existing = this.items.find(i => i.id === item.id);
    if (existing) {
      existing.quantity++;
    } else {
      this.items.push(item);
    }
    this.save();
  },
  remove(itemId) {
    this.items = this.items.filter(i => i.id !== itemId);
    this.save();
  },
  updateQuantity(itemId, qty) {
    const item = this.items.find(i => i.id === itemId);
    if (item) {
      item.quantity = Math.max(1, qty);
      this.save();
    }
  },
  clear() {
    this.items = [];
    this.save();
  },
  getTotal() {
    return this.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  },
  updateUI() {
    const count = document.getElementById('cart-count');
    if (count) count.textContent = this.items.length > 0 ? this.items.length : '0';
    this.renderCart();
  },
  renderCart() {
    const cartItems = document.getElementById('cart-items');
    if (!cartItems) return;
    if (this.items.length === 0) {
      cartItems.innerHTML = '<p class="cart-empty">Carrito vacío</p>';
      return;
    }
    cartItems.innerHTML = this.items.map(item => `
      <div class="cart-item">
        <img src="${item.image}" alt="${item.name}" class="cart-item__image" />
        <div class="cart-item__info">
          <h4>${item.name} (${item.ml})</h4>
          <p>$${item.price.toLocaleString()}</p>
        </div>
        <div class="cart-item__controls">
          <button onclick="cartState.updateQuantity('${item.id}', ${item.quantity - 1})" class="qty-btn">−</button>
          <span>${item.quantity}</span>
          <button onclick="cartState.updateQuantity('${item.id}', ${item.quantity + 1})" class="qty-btn">+</button>
        </div>
        <button onclick="cartState.remove('${item.id}')" class="cart-item__remove">&times;</button>
      </div>
    `).join('');
    const total = document.getElementById('cart-total');
    if (total) total.textContent = '$' + this.getTotal().toLocaleString();
  }
};

// ========== MODAL & PRODUCT DETAILS ==========
const modal = document.getElementById('product-modal');
const modalClose = document.getElementById('modal-close');
const contactBtn = document.getElementById('contact-btn');
let currentProductId = null;

function openProductModal(productId) {
  const product = PRODUCTS[productId];
  if (!product) return;
  currentProductId = productId;
  
  document.getElementById('detail-image').src = product.image;
  document.getElementById('detail-title').textContent = product.name;
  document.getElementById('detail-label').textContent = product.label;
  document.getElementById('detail-why').textContent = product.why;
  document.getElementById('detail-smell').textContent = product.smell;
  document.getElementById('detail-vibe').textContent = product.vibe;
  document.getElementById('detail-usage').textContent = product.usage;
  
  modal.classList.add('is-open');
  document.body.style.overflow = 'hidden';
}

function closeProductModal() {
  modal.classList.remove('is-open');
  document.body.style.overflow = '';
  currentProductId = null;
}

modalClose?.addEventListener('click', closeProductModal);
modal?.addEventListener('click', (e) => {
  if (e.target === modal) closeProductModal();
});

contactBtn?.addEventListener('click', () => {
  if (currentProductId) {
    const product = PRODUCTS[currentProductId];
    const message = `Hola, estoy interesado en el ${product.name}. Me gustaría conocer más información y precios.`;
    const whatsappUrl = `https://api.whatsapp.com/send/?phone=573016731498&text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
    closeProductModal();
  }
});

// ========== PRODUCT CARDS CLICKABLE ==========
document.addEventListener('DOMContentLoaded', () => {
  const productCards = document.querySelectorAll('.product-card--clickable');
  productCards.forEach(card => {
    const productId = card.dataset.productId;
    const cta = card.querySelector('.product-cta');
    
    card.style.cursor = 'pointer';
    card.addEventListener('click', (e) => {
      if (e.target !== cta) openProductModal(productId);
    });
    
    cta?.addEventListener('click', (e) => {
      e.stopPropagation();
      openProductModal(productId);
    });
  });
});

// ========== CHAT WIDGET & FAQ ==========
const chatToggle = document.getElementById('chat-toggle');
const chatClose = document.getElementById('chat-close');
const chatPanel = document.getElementById('chat-panel');
const chatBody = document.getElementById('chat-body');
const chatOptions = document.getElementById('chat-options');

const faqResponses = {
  "1": "Nuestras camisas son de corte Oversized urbano. Si te gusta el estilo holgado de la marca, pide tu talla habitual. Si prefieres algo más entallado, te recomendamos pedir una talla menos.",
  "2": "Trabajamos con esencias puras de alta concentración (calidad Parfum/Eau de Parfum). Garantizan una fijación promedio de 8 a 12 horas en piel y días enteros impregnados en la tela de tu ropa, ideal para el clima de Colombia.",
  "3": "¡Sí, cubrimos toda Colombia! Los envíos toman entre 2 y 5 días hábiles dependiendo de tu ciudad. Al finalizar tu pedido por WhatsApp, el asesor te entregará tu número de guía para rastrearlo.",
  "4": "Dale clic al botón del carrito, revisa tu pedido y presiona 'Ir a Pagar'. Serás redirigido con un mensaje listo que detalla tus productos para que nuestro asesor te dé los datos de transferencia (Nequi, Daviplata, Bancolombia, etc.)."
};

function addChatMessage(text, isBot = true) {
  const messageDiv = document.createElement('div');
  messageDiv.className = `chat-message ${isBot ? 'bot' : 'user'}`;
  messageDiv.innerHTML = `<p>${text}</p>`;
  if (chatBody) {
    chatBody.insertBefore(messageDiv, chatOptions);
    chatBody.scrollTop = chatBody.scrollHeight;
  }
}

function showChatOptions() {
  if (chatOptions) chatOptions.style.display = 'flex';
}

chatToggle?.addEventListener('click', () => {
  chatPanel?.classList.toggle('is-open');
});

chatClose?.addEventListener('click', () => {
  chatPanel?.classList.remove('is-open');
});

chatOptions?.querySelectorAll('.chat-option')?.forEach(btn => {
  btn.addEventListener('click', () => {
    const question = btn.dataset.question;
    const text = btn.textContent;
    
    addChatMessage(text, false);
    
    if (question === 'live') {
      setTimeout(() => {
        addChatMessage('Un asesor en vivo se contactará contigo en breve. 👋');
        window.open('https://api.whatsapp.com/send/?phone=573016731498&text=Hola%20ZAYRO%2C%20quiero%20hablar%20con%20un%20asesor', '_blank');
      }, 500);
    } else {
      setTimeout(() => {
        addChatMessage(faqResponses[question]);
        showChatOptions();
      }, 800);
    }
  });
});

// ========== NOTIFICATION SYSTEM ==========
function showNotification(message) {
  const notif = document.createElement('div');
  notif.className = 'notification';
  notif.textContent = message;
  document.body.appendChild(notif);
  setTimeout(() => {
    notif.classList.add('is-visible');
  }, 10);
  setTimeout(() => {
    notif.classList.remove('is-visible');
    setTimeout(() => notif.remove(), 300);
  }, 3000);
}

// ========== HERO CAROUSEL ==========
(function initCarousel() {
  const slides = document.querySelectorAll('.carousel__slide');
  const indicators = document.querySelectorAll('[data-indicator]');
  if (slides.length === 0) return;
  
  let currentIndex = 0;
  let timer = null;
  const autoplayMs = 5000;
  
  function show(index) {
    currentIndex = (index + slides.length) % slides.length;
    slides.forEach((s, i) => {
      s.classList.toggle('active', i === currentIndex);
    });
    indicators.forEach((ind, i) => {
      ind.classList.toggle('active', i === currentIndex);
    });
  }
  
  function next() {
    show(currentIndex + 1);
  }
  
  function prev() {
    show(currentIndex - 1);
  }
  
  function start() {
    timer = setInterval(next, autoplayMs);
  }
  
  function stop() {
    clearInterval(timer);
    timer = null;
  }
  
  const wrap = document.querySelector('.hero__image-wrap');
  wrap?.addEventListener('mouseenter', stop);
  wrap?.addEventListener('mouseleave', start);
  wrap?.addEventListener('focusin', stop);
  wrap?.addEventListener('focusout', start);
  
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') next();
    if (e.key === 'ArrowLeft') prev();
  });
  
  let touchStart = 0;
  const carousel = document.querySelector('.hero-carousel');
  carousel?.addEventListener('touchstart', (e) => {
    touchStart = e.touches[0].clientX;
    stop();
  });
  carousel?.addEventListener('touchend', (e) => {
    const touchEnd = e.changedTouches[0].clientX;
    if (touchStart - touchEnd > 50) next();
    if (touchEnd - touchStart > 50) prev();
    start();
  });
  
  show(0);
  start();
})();

// ========== MARQUEE & REVEAL ANIMATIONS ==========
(function initMarquee() {
  const marquees = document.querySelectorAll('.marquee-track, .descriptor-marquee__track, .marquee__track');
  marquees.forEach(track => {
    track.innerHTML += track.innerHTML;
  });
})();

const revealItems = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.16 }
);

revealItems.forEach((item) => observer.observe(item));

// ========== HEADER & NAV ==========
const header = document.querySelector('.site-header');
const navToggle = document.querySelector('.nav-toggle');
const siteNav = document.querySelector('.site-nav');

window.addEventListener('scroll', () => {
  header?.classList.toggle('scrolled', window.scrollY > 16);
});

navToggle?.addEventListener('click', () => {
  const isOpen = siteNav?.classList.toggle('is-open');
  navToggle.setAttribute('aria-expanded', String(isOpen));
});

siteNav?.querySelectorAll('a')?.forEach((link) => {
  link.addEventListener('click', () => {
    siteNav.classList.remove('is-open');
    navToggle?.setAttribute('aria-expanded', 'false');
  });
});

// ========== FAQ ACCORDION ==========
const faqItems = document.querySelectorAll('.faq-item');
faqItems.forEach((item) => {
  const button = item.querySelector('.faq-question');
  button?.addEventListener('click', () => {
    const isOpen = item.classList.toggle('is-open');
    button.setAttribute('aria-expanded', String(isOpen));
  });
});

// ========== INITIALIZATION ==========
document.addEventListener('DOMContentLoaded', () => {
  cartState.load();
});
