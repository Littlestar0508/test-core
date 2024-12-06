import "@/pages/login/login.css";
import pb from "@/api/pocketbase";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
import { html } from "lit";

function createTag() {
  const tag = /*html*/ `
    <div class="container">
      <h1>로그인</h1>
      <hr />
      <form>
        <div>
          <label for="idField"></label>
          <input type="email" id="idField" placeholder="아이디(이메일)" />
        </div>
        <div>
          <label for="pwField"></label>
          <input type="password" id="pwField" placeholder="아이디(이메일)" />
        </div>
        <button type="submit" class="login">LOGIN</button>
      </form>

      <a href="/src/pages/register/">간편 회원가입</a>
    </div>
  `;
  return tag;
}

function renderTag(data) {
  document.body.insertAdjacentHTML("beforeend", data);
}

function render() {
  const tag = createTag();

  renderTag(tag);
}

async function handleLogin(e) {
  e.preventDefault();

  try {
    const id = "aaa@aaa.com";
    const pw = "12345678";

    // const id = document.querySelector("#idField").value;
    // const pw = document.querySelector("#pwField").value;

    await pb.collection("users").authWithPassword(id, pw);

    const { record, token } = JSON.parse(localStorage.getItem("pocketbase_auth"));

    localStorage.setItem(
      "auth",
      JSON.stringify({
        isAuth: !!record,
        user: record,
        token: token,
      })
    );

    Swal.fire({
      title: "hello",
      text: "로그인 성공!",
      icon: "success",
      confirmButtonText: "닫기",
    }).then((res) => {
      setTimeout(() => {
        location.href = "/index.html";
      }, 300);
    });

    // alert("로그인 성공! 메인 페이지로 이동합니다");
    // location.href = "/index.html";
  } catch {
    Swal.fire({
      title: "hello",
      text: "로그인 실패!",
      icon: "error",
    });
  }
}

render();

const loginBtn = document.querySelector(".login");
loginBtn.addEventListener("click", handleLogin);
