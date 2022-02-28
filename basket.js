"use strict";

const basketCountEl = document.querySelector('.cartIconWrap span');
const basketTotalValueEl = document.querySelector('.basketTotalValue');
const basketEl = document.querySelector('.basket');
const basketTotalEl = document.querySelector('.basketTotal');

document.querySelector('.cartIcon').addEventListener('click', () => {
    basketEl.classList.toggle('hidden');
});

const basket = {};

document.querySelector('.featuredItems').addEventListener('click', e => {
    if (!e.target.closest('.addToCart')) {
        return;
    }
    const featuredItemEl = e.target.closest('.featuredItem');
    const id = +featuredItemEl.dataset.id;
    const name = featuredItemEl.dataset.name;
    const price = +featuredItemEl.dataset.price;
    addToCart(id, name, price);
});

function addToCart(id, name, price) {
    if (!(id in basket)) {
        basket[id] = {
            id: id,
            name: name,
            price: price,
            count: 0,
        }
    }
    basket[id].count++;
    basketCountEl.textContent = getTotalBasketCount();
    basketTotalValueEl.textContent = getTotalBasketPrice().toFixed(2);
    putProductInBasket(id);
};

function getTotalBasketCount() {
    return Object.values(basket).
    reduce((acc, product) => acc + product.count, 0);
};

function getTotalBasketPrice() {
    return Object.values(basket).
    reduce((acc, product) => acc + product.count*product.price, 0);
};

function putProductInBasket(id) {
    const basketRowEl = basketEl.
    querySelector(`.basketRow[data-id="${id}"]`);

  if (!basketRowEl) {
    createNewProductInBasket(id);
    return;
  }
  basketRowEl.querySelector('.productCount').textContent = basket[id].count;
  basketRowEl.querySelector('.productTotalRow').
  textContent = basket[id].count*basket[id].price;

}

function createNewProductInBasket(productId) {
    const productRow = `
        <div class="basketRow" data-id="${productId}">
            <div>${basket[productId].name}</div>
            <div>
                <span class="productCount">${basket[productId].count}</span> шт.
            </div>
            <div>$${basket[productId].price}</div>
            <div>
                $<span class="productTotalRow">${(basket[productId].price * basket[productId].count).toFixed(2)}</span>
            </div>
        </div>
    `;
    basketTotalEl.insertAdjacentHTML('beforebegin', productRow);
};