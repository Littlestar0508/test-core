import gsap from "gsap";
import { css, CSSResultGroup, html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import Swal from "sweetalert2";
import pb from "../api/pocketbase";
import resetCss from "../Layout/resetCss";

@customElement("register-element")
class Register extends LitElement {
  @property({ type: Object }) valid = {
    step1: false,
    step2: false,
  };
  static styles: CSSResultGroup = [
    resetCss,
    css`
      .container {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        width: 440px;
        /* border: 1px solid white; */
        overflow: hidden;
        padding: 1rem;

        & h2 {
          font-size: 3rem;
          font-weight: bold;
        }

        .line {
          height: 4px;
          background-color: white;
          margin-bottom: 1rem;

          & div {
            width: 30%;
            height: 100%;
            background-color: orange;
          }
        }

        .wrapper {
          width: 900px;
          display: flex;
          justify-content: space-between;

          & div {
            width: 440px;
            display: flex;
            flex-direction: column;
            gap: 1rem;
          }

          & input {
            border: 1px solid white;
            padding: 1rem;
            min-width: 200px;
            margin: 0.5rem 0;
            outline: none;
          }

          & button {
            margin-top: 1.5rem;
            background-color: dodgerblue;
            color: white;
            border: none;
            padding: 1rem;
            cursor: pointer;

            &:disabled {
              background-color: #878787;
              color: black;
              cursor: not-allowed;
            }
          }
        }
      }
    `,
  ];

  handleLengthValidation(e: Event) {
    const target = e.currentTarget as HTMLInputElement;

    const stepKey = target.id === "idField" ? "step1" : "step2";
    this.valid[stepKey] = target.value.length > 5;

    if (target.value.length > 5) this.requestUpdate();

    // if (target.value.length > 5) {
    //   this.valid.step1 = true;
    //   this.requestUpdate();
    //   // target.nextElementSibling.disabled = false;
    // } else {
    //   this.valid.step1 = false;
    //   this.requestUpdate();
    //   // target.nextElementSibling.disabled = true;
    // }
  }

  handleNext() {
    const wrapper = this.renderRoot.querySelector(".wrapper");
    const line = this.renderRoot.querySelector(".line > div");

    gsap.to(line, { width: "70%" });
    gsap.to(wrapper, { x: -460 });
  }

  get idInput() {
    return this.renderRoot.querySelector<HTMLInputElement>("#idField")!;
  }

  get pwInput() {
    return this.renderRoot.querySelector<HTMLInputElement>("#pwField")!;
  }

  async handleRegister() {
    const data = {
      email: this.idInput.value,
      password: this.pwInput.value,
      passwordConfirm: this.pwInput.value,
    };

    await pb
      .collection("users")
      .create(data)
      .then(() => {
        Swal.fire({
          text: "회원가입을 완료하셨습니다.",
          confirmButtonText: "확인",
        }).then(() => {
          setTimeout(() => {
            location.href = "/src/pages/login/";
          }, 300);
        });
      })
      .catch(() => {
        Swal.fire({
          text: "잘못된 형식을 입력하셨습니다.",
          confirmButtonText: "확인",
          icon: "error",
        }).then(() => {
          setTimeout(() => {
            location.href = "/src/pages/register/";
          }, 300);
        });
      });
  }

  render() {
    return html`
      <div class="container">
        <h2>회원가입</h2>
        <div class="line">
          <div></div>
        </div>
        <div class="wrapper">
          <div class="step-1">
            <h3>
              로그인에 사용할 <br />
              아이디를 입력해주세요.
            </h3>
            <label for="idField"></label>
            <input
              type="email"
              id="idField"
              placeholder="아이디(이메일)입력"
              @input=${this.handleLengthValidation}
            />
            <button
              type="button"
              class="next-1"
              ?disabled=${!this.valid.step1}
              @click=${this.handleNext}
            >
              다음
            </button>
          </div>
          <div class="step-2">
            <h3>
              로그인에 사용할 <br />
              비밀번호를 입력해주세요.
            </h3>
            <label for="pwField"></label>
            <input
              type="password"
              id="pwField"
              placeholder="비밀번호 입력"
              @input=${this.handleLengthValidation}
            />
            <button
              type="button"
              class="next-2"
              ?disabled=${!this.valid.step2}
              @click=${this.handleRegister}
            >
              회원가입
            </button>
          </div>
        </div>
      </div>
    `;
  }
}
