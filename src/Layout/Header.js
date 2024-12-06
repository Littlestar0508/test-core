import { LitElement, html, css } from "lit";
import resetCss from "./resetCss";

class Header extends LitElement {
  static get styles() {
    return [
      resetCss,
      css`
        header {
          display: flex;
          justify-content: space-between;
          background-color: white;
          color: black;
          padding: 1rem;
        }

        .logo {
          display: flex;
          align-items: center;
          gap: 0.3rem;
        }

        nav {
          display: flex;
          align-items: center;

          ul {
            display: flex;
            gap: 1rem;
          }
        }
      `,
    ];
  }

  render() {
    return html`
      <header>
        <h1 class="logo">
          <a href="/"><img style="width:30px" src="/logo.png" alt="쇼핑몰 마스코트" /></a>
          <span>MallBar</span>
        </h1>
        <nav>
          <ul>
            <li><a href="/">About</a></li>
            <li><a href="/">Product</a></li>
            <li><a href="/">Contact</a></li>
            <li><a href="/">Login</a></li>
          </ul>
        </nav>
      </header>
    `;
  }
}

customElements.define("c-header", Header);
