import { css, CSSResultGroup, html, LitElement } from "lit";
import { customElement, state } from "lit/decorators.js";
import Swal from "sweetalert2";
import { Auth } from "../@types/type";
import pb from "../api/pocketbase";
import resetCss from "./resetCss";

@customElement("c-header")
class Header extends LitElement {
  @state() private loginData: Auth = {} as Auth;

  static styles: CSSResultGroup = [
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

  connectedCallback(): void {
    super.connectedCallback();
    this.fetchData();
  }

  fetchData() {
    const auth = JSON.parse(localStorage.getItem("auth") ?? "{}");

    this.loginData = auth;
  }

  render() {
    const { isAuth, user } = this.loginData;

    return html`
      <header>
        <h1 class="logo">
          <a href="/"><img style="width:30px" src="/logo.png" alt="쇼핑몰 마스코트" /></a>
          <span>MallBar</span>
        </h1>
        <nav>
          <ul>
            <li><a href="/">About</a></li>
            <li><a href="/src/pages/product/">Product</a></li>
            <li><a href="/">Contact</a></li>
            <li>
              ${isAuth
                ? html` <div>
                    <span>${user.name}님</span>
                    <a @click=${this.handleLogout} href="/src/pages/login/">Logout</a>
                  </div>`
                : html` <a href="/src/pages/login/">Login</a>`}
            </li>
          </ul>
        </nav>
      </header>
    `;
  }

  handleLogout(e: Event) {
    e.preventDefault();

    Swal.fire({
      title: "로그 아웃",
      text: "로그 아웃 하시겠습니까?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "확인",
      cancelButtonText: "취소",
    }).then(({ isConfirmed }) => {
      if (isConfirmed) {
        localStorage.removeItem("auth");
        pb.authStore.clear();
        // this.loginData.isAuth = false;
        // this.requestUpdate();

        location.reload();
      }
    });
  }
}
