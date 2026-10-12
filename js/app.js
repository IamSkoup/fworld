const categoryMeta = {
  home: { name: 'Домашние растения', short: 'Домашние растения', alt: 'Комнатные растения в светлом интерьере', image: 'images/categories/home.webp' },
  flowers: { name: 'Цветы в подарок', short: 'Цветы', alt: 'Свежие цветы и букеты', image: 'images/categories/flowers.webp' },
  garden: { name: 'Дачные растения', short: 'Дачные растения', alt: 'Садовые саженцы', image: 'images/categories/garden.webp' },
  cards: { name: 'Открытки', short: 'Открытки', alt: 'Цветочные открытки', image: 'images/categories/cards.webp' },
  toys: { name: 'Игрушки', short: 'Игрушки', alt: 'Мягкие игрушки', image: 'images/categories/toys.webp' }
};

const catalogRows = [
  ['ficus-benjamina','Фикус Бенджамина','home','600 ₽'],
  ['monstera','Монстера','home','1000 ₽'],
  ['aglaonema','Аглаонема','home','350 ₽'],
  ['dieffenbachia','Диффенбахия','home','400 ₽'],
  ['echeveria','Эхеверия','home','500 ₽'],
  ['sansevieria','Сансевиерия','home','500 ₽'],
  ['crassula','Толстянка','home','800 ₽'],
  ['schlumbergera','Декабрист','home','650 ₽'],
  ['white-roses','Розы белые','flowers','120 ₽'],
  ['red-roses','Розы красные','flowers','100 ₽'],
  ['gypsophila','Гипсофилы','flowers','200 ₽'],
  ['carnations','Гвоздики','flowers','70 ₽'],
  ['tulips','Тюльпаны','flowers','180 ₽'],
  ['chrysanthemums','Хризантемы','flowers','150 ₽'],
  ['gerberas','Герберы','flowers','90 ₽'],
  ['peonies','Пионы','flowers','130 ₽'],
  ['hydrangeas','Гортензии','flowers','100 ₽'],
  ['lilies','Лилии','flowers','120 ₽'],
  ['irises','Ирисы','flowers','150 ₽'],
  ['medium-bouquet','Букет средний','flowers','500 ₽'],
  ['large-bouquet','Букет большой','flowers','1200 ₽'],
  ['grand-flower-set','Огромные наборы цветов','flowers','от 2500 ₽'],
  ['apple-sapling','Яблоня','garden','200 ₽'],
  ['pear-sapling','Груша','garden','300 ₽'],
  ['raspberry','Малина','garden','200 ₽'],
  ['gooseberry','Крыжовник','garden','600 ₽'],
  ['currant','Смородина','garden','350 ₽'],
  ['honeysuckle','Жимолость','garden','500 ₽'],
  ['ordinary-card','Обычная открытка','cards','150 ₽'],
  ['large-card','Большая открытка','cards','350 ₽'],
  ['premium-greeting','Поздравительный адрес','cards','от 3000 ₽'],
  ['small-teddy','Мишка плюшевый маленький','toys','450 ₽'],
  ['large-teddy','Медведь плюшевый большой','toys','1200 ₽'],
  ['heart-bear-keychain','Мишка с сердечком брелок','toys','200 ₽'],
  ['photo-keychains','Брелоки с вашим фото','toys','500 ₽'],
  ['plush-shark','Акула плюшевая','toys','1500 ₽'],
  ['hug-goose','Гусь-обнимусь','toys','1500 ₽']
];

const products = catalogRows.map(([id, name, category, price]) => ({
  id, name, category, price,
  image: `images/products/${id}.webp`,
  alt: `${name} — ${categoryMeta[category].short.toLowerCase()}`,
  description: `«${name}» из каталога «Цветочный мир». ${category === 'flowers' ? 'Цветы для тёплого повода или приятного знака внимания.' : category === 'home' ? 'Зелёный акцент для дома и уютного пространства.' : category === 'garden' ? 'Растение для сада и дачного участка.' : category === 'cards' ? 'Красивое дополнение к подарку и добрым словам.' : 'Мягкий подарок для близкого человека.'}`
}));

const state = { category: 'all', query: '' };
const grid = document.querySelector('#product-grid');
const count = document.querySelector('#result-count');
const empty = document.querySelector('#empty-state');
const filters = document.querySelector('#filters');
const search = document.querySelector('#catalog-search');

function renderFilters() {
  const categories = [['all', 'Все'], ...Object.entries(categoryMeta).map(([key, value]) => [key, value.short])];
  filters.innerHTML = categories.map(([key, label]) => `<button class="filter-chip${state.category === key ? ' is-active' : ''}" type="button" data-category="${key}" aria-pressed="${state.category === key}">${label}</button>`).join('');
}

function renderProducts() {
  const normalized = state.query.toLocaleLowerCase('ru').trim().replace(/ё/g, 'е');
  const visible = products.filter(product => (state.category === 'all' || state.category === product.category) && `${product.name} ${categoryMeta[product.category].name}`.toLocaleLowerCase('ru').replace(/ё/g, 'е').includes(normalized));
  grid.innerHTML = visible.map(product => `<article class="product-card">
    <button class="product-image-button" type="button" data-product="${product.id}" aria-label="Подробнее: ${product.name}"><img src="${product.image}" alt="${product.alt}" loading="lazy" width="560" height="700"></button>
    <div class="product-info"><span class="product-category">${categoryMeta[product.category].short}</span><h3>${product.name}</h3><div class="product-bottom"><strong class="price">${product.price}</strong><button class="details-button" type="button" data-product="${product.id}">Подробнее <span aria-hidden="true">→</span></button></div></div>
  </article>`).join('');
  count.textContent = `Найдено: ${visible.length}`;
  empty.hidden = visible.length !== 0;
}

function selectCategory(category) {
  state.category = category;
  renderFilters();
  renderProducts();
  document.querySelector('#catalog').scrollIntoView({ behavior: 'smooth' });
}

filters.addEventListener('click', event => {
  const button = event.target.closest('[data-category]');
  if (button) selectCategory(button.dataset.category);
});
search.addEventListener('input', event => { state.query = event.target.value; renderProducts(); });
document.querySelector('#clear-search').addEventListener('click', () => { search.value = ''; state.query = ''; renderProducts(); search.focus(); });
document.querySelectorAll('[data-select-category]').forEach(link => link.addEventListener('click', event => { event.preventDefault(); selectCategory(link.dataset.selectCategory); closeMenu(); }));

const dialog = document.querySelector('#product-dialog');
let lastTrigger;
function openProduct(id, trigger) {
  const product = products.find(item => item.id === id);
  if (!product) return;
  lastTrigger = trigger;
  dialog.querySelector('#dialog-image').src = product.image;
  dialog.querySelector('#dialog-image').alt = product.alt;
  dialog.querySelector('#dialog-category').textContent = categoryMeta[product.category].name;
  dialog.querySelector('#dialog-title').textContent = product.name;
  dialog.querySelector('#dialog-price').textContent = product.price;
  dialog.querySelector('#dialog-description').textContent = product.description;
  dialog.showModal();
  document.body.classList.add('dialog-open');
}
grid.addEventListener('click', event => { const trigger = event.target.closest('[data-product]'); if (trigger) openProduct(trigger.dataset.product, trigger); });
dialog.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => { if (event.target === dialog) dialog.close(); });
dialog.addEventListener('close', () => { document.body.classList.remove('dialog-open'); lastTrigger?.focus(); });

const menuButton = document.querySelector('#menu-toggle');
const nav = document.querySelector('#primary-nav');
function closeMenu() { menuButton.setAttribute('aria-expanded', 'false'); nav.classList.remove('is-open'); }
menuButton.addEventListener('click', () => { const open = menuButton.getAttribute('aria-expanded') === 'true'; menuButton.setAttribute('aria-expanded', String(!open)); nav.classList.toggle('is-open', !open); });
nav.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', event => { if (event.key === 'Escape') closeMenu(); });
document.addEventListener('click', event => { if (!nav.contains(event.target) && !menuButton.contains(event.target)) closeMenu(); });

renderFilters();
renderProducts();

if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const sections = document.querySelectorAll('.categories-section, .catalog-heading, .delivery-copy');
  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });
  sections.forEach(section => { section.classList.add('reveal-ready'); revealObserver.observe(section); });
}
