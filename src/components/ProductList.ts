import { LitElement, html, css, CSSResultGroup } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { getPbImageURL } from "../api/getPbImageURL";
import resetCss from "../Layout/resetCss";
import { Auth, Products } from "../@types/type";
import gsap from "gsap";

@customElement("product-list")
class ProductList extends LitElement {
  @property({ type: Object }) data: Products = {
    items: [],
    page: 0,
    perPage: 0,
    totalItems: 0,
    totalPages: 0,
  };

  @state() loginData = {} as Auth;

  static styles: CSSResultGroup = [
    resetCss,
    css`
      .container {
        margin: 0 auto;

        & img {
          width: 100%;
        }

        & ul {
          display: grid;
          place-items: center;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 2rem;
          margin: 2.5rem;

          & li {
            & a {
              max-width: 30vw;
              display: flex;
              flex-direction: column;
              gap: 0.5rem;
            }
          }

          .description {
            font-size: 0.8rem;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }

          .price {
            color: gray;
            text-decoration: line-through;
          }

          .discount {
            font-size: 1.2rem;
            color: red;
          }

          .real-price {
            font-weight: bold;
          }
        }
      }

      .new-post {
        padding: 0.5rem 1rem;
        background-color: dodgerblue;
        color: white;
        border-radius: 20px;
        position: fixed;
        transform: translateX(-50%);
        left: 50%;
        bottom: 2rem;
      }
    `,
  ];

  connectedCallback() {
    super.connectedCallback();
    this.fetchData();
  }

  async fetchData() {
    const response = await fetch(`${import.meta.env.VITE_PB_API}/collections/products/records`);

    const data = await response.json();
    this.data = data;

    this.loginData = JSON.parse(localStorage.getItem("auth") ?? "{}");
  }

  updated(changedProperties: Map<string | number | symbol, unknown>): void {
    // attributeChangedCallback()과 같은 역할을 한다
    super.updated(changedProperties);

    const item = this.renderRoot.querySelectorAll(".product-item");

    if (item.length > 0) {
      gsap.from(item, {
        y: 30,
        opacity: 0,
        stagger: 0.3,
      });
    }
  }

  render() {
    const { isAuth } = this.loginData;
    return html`
      <div class="container">
        <ul>
          ${this.data.items.map(
            (index) => html/*HTML*/ ` <li class="product-item">
              <a href="${isAuth ? `/src/pages/detail/index.html?product=${index.id}` : "/"}">
                <figure>
                  <img src=${getPbImageURL(index, "photo")} alt="" />
                </figure>
                <span class="brand">${index.brand}</span>
                <span class="description">${index.description}</span>
                <span class="price">${index.price.toLocaleString()}원</span>
                <div>
                  <span class="discount">${index.discount}%</span>
                  <span class="real-price"
                    >${(index.price * ((100 - index.discount) / 100)).toLocaleString()}원</span
                  >
                </div>
              </a>
            </li>`
          )}
        </ul>
      </div>

      <a class="new-post" href="/src/pages/newPost/">+ 상품추가</a>
    `;
  }
}
