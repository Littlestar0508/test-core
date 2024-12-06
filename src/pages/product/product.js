import { getPbImageURL } from "./../../api/getPbImageURL";

const END_POINT = `${import.meta.env.VITE_PB_API}/collections/products/records`;

async function renderProduct() {
  const response = await fetch(END_POINT);
  const data = await response.json();

  const tag = /*html*/ `
  <div class="container">
      <ul>
      ${data.items
        .map((index) => {
          return /*HTML*/ ` <li>
            <a href="/">
              <figure>
                <img src=${getPbImageURL(index, "photo")} alt="" />
              </figure>
              <span class="brand">${index.brand}</span>
              <span class="description">${index.description}</span>
              <span class="price">${index.price.toLocaleString()}원</span>
              <div>
                <span class="discount">${index.discount}%</span>
                <span class="real-price">${(
                  index.price *
                  ((100 - index.discount) / 100)
                ).toLocaleString()}원</span>
              </div>
            </a>
          </li>`;
        })
        .join("")}
      </ul>
    </div>
    `;

  document.body.insertAdjacentHTML("beforeend", tag);
}

renderProduct();
