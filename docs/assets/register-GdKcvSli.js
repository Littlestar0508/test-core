import{r as c,i as h,n as u,a as g,p as b,x as v,t as w}from"./resetCss-BAVtLrC_.js";import{S as a}from"./Header-dGKffybR.js";import{g as d}from"./index-DjKJqAo0.js";var m=Object.defineProperty,f=Object.getOwnPropertyDescriptor,p=(t,e,r,o)=>{for(var i=o>1?void 0:o?f(e,r):e,s=t.length-1,l;s>=0;s--)(l=t[s])&&(i=(o?l(e,r,i):l(i))||i);return o&&i&&m(e,r,i),i};let n=class extends g{constructor(){super(...arguments),this.valid={step1:!1,step2:!1}}handleLengthValidation(t){const e=t.currentTarget,r=e.id==="idField"?"step1":"step2";this.valid[r]=e.value.length>5,e.value.length>5&&this.requestUpdate()}handleNext(){const t=this.renderRoot.querySelector(".wrapper"),e=this.renderRoot.querySelector(".line > div");d.to(e,{width:"70%"}),d.to(t,{x:-460})}get idInput(){return this.renderRoot.querySelector("#idField")}get pwInput(){return this.renderRoot.querySelector("#pwField")}async handleRegister(){const t={email:this.idInput.value,password:this.pwInput.value,passwordConfirm:this.pwInput.value};await b.collection("users").create(t).then(()=>{a.fire({text:"회원가입을 완료하셨습니다.",confirmButtonText:"확인"}).then(()=>{setTimeout(()=>{location.href="/src/pages/login/"},300)})}).catch(()=>{a.fire({text:"잘못된 형식을 입력하셨습니다.",confirmButtonText:"확인",icon:"error"}).then(()=>{setTimeout(()=>{location.href="/src/pages/register/"},300)})})}render(){return v`
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
    `}};n.styles=[c,h`
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
    `];p([u({type:Object})],n.prototype,"valid",2);n=p([w("register-element")],n);
