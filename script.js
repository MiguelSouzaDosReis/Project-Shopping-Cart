const cart = document.querySelector('.cart__items');
const loading = document.querySelector('.loading');

// Fiz o requisito 5 consultando o repositorio Flávia Labanca
// https://github.com/tryber/sd-015-b-project-shopping-cart/pull/113/commits/3cd468ba567d46697eee61394f4de8465f71a302
function Requisito5(preço, status) {
  const PreçoTotal = document.querySelector('.total-price');
  let valor = parseFloat(PreçoTotal.innerText);
  if (status === 'adicionado') valor += preço;
  if (status === 'removido') valor -= preço;
  if (status === 'limpo') valor = 0;
  PreçoTotal.innerText = valor;
}

function createProductImageElement(imageSource) {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
}

function createCustomElement(element, className, innerText) {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
}

function createProductItemElement({ sku, name, image }) {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));
  return section;
}

function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
}

function cartItemClickListener(event) {
  event.target.remove();
  const salePrice = parseFloat(event.target.innerText.split('$').pop());
  Requisito5(salePrice, 'removido');
}

function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  Requisito5(salePrice, 'adicionado');
  return li;
}

function Requisito2(event) {
  const ID = event.target.parentNode.firstChild.innerText;
  fetch(`https://api.mercadolibre.com/items/${ID}`)
  .then((response) => response.json())
  .then(({ id, title, price }) => {
    const Array2 = {
      sku: id,
      name: title,
      salePrice: price,
    };
    const Adicionar2 = createCartItemElement(Array2);
    cart.appendChild(Adicionar2);
  });
}
 function botao() {
  const buttons = document.querySelectorAll('.item__add');
  buttons.forEach((element) => {
  element.addEventListener('click', Requisito2);
 });
} 
function Requisito1() {
  fetch('https://api.mercadolibre.com/sites/MLB/search?q=$QUERY')
 .then((response) => response.json())
 .then((data) => data.results.forEach(({ id, title, thumbnail }) => {
   const ArrayDoResponse = {
     sku: id,
     name: title,
     image: thumbnail,
    };
    const Adicionar = createProductItemElement(ArrayDoResponse);
    const items = document.getElementsByClassName('items')[0];
    items.appendChild(Adicionar);
    loading.remove();
    botao();
  })); 
}

   function Requisito6() {
     const vazio = document.querySelector('.empty-cart');
     vazio.addEventListener('click', () => {
       cart.innerHTML = '';
      });
      Requisito5(0, 'limpo');
  }

window.onload = () => { Requisito1(); Requisito6(); };
