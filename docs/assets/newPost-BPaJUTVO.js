import{r as c,i as p,n as u,a as b,p as m,x as n,t as g}from"./resetCss-BAVtLrC_.js";import"./Header-dGKffybR.js";var f=Object.defineProperty,h=Object.getOwnPropertyDescriptor,d=(t,e,r,i)=>{for(var a=i>1?void 0:i?h(e,r):e,o=t.length-1,l;o>=0;o--)(l=t[o])&&(a=(i?l(e,r,a):l(a))||a);return i&&a&&f(e,r,a),a};let s=class extends b{constructor(){super(...arguments),this.fileImages=[{image:"",label:""}]}get inputs(){return this.renderRoot.querySelectorAll("input")}handleNewPost(){const t=this.inputs[1],e=new FormData;if(!t.files)throw new Error("file의 값이 들어오지 않았습니다");this.inputs.forEach(r=>{e.append(r.id,r.value)}),e.append("photo",t.files[0]),m.collection("products").create(e).then(()=>{location.href="/src/pages/product/"}).catch(()=>{console.error("err!")})}handleUpload(t){const{files:e}=t.target;if(!e)throw new Error("파일이 존재하지 않습니다");const r=Array.from(e).map(i=>({image:URL.createObjectURL(i),label:i.name}));this.fileImages=r}render(){const t=this.fileImages[0].image;return n`
      <div class="container">
        <div class="wrapper">
          <div class="brand">
            <label for="brand">브랜드</label>
            <input type="text" id="brand" />
          </div>

          <div class="visual">
            <label for="imgField"></label>
            <input type="file" id="imgField" @change=${this.handleUpload} />
            <div class="render">${t?n`<img src="${t}" alt="" />`:""}</div>
          </div>

          <div class="desc">
            <label for="description">상품 설명</label>
            <input type="text" id="description" />
          </div>

          <div class="price">
            <label for="price">가격</label>
            <input type="text" id="price" />
          </div>

          <div class="discount">
            <label for="discount">할인율(%)</label>
            <input type="text" id="discount" />
          </div>

          <div class="buttonGroup">
            <button type="button" class="cancel" @click=${()=>history.back()}>취소</button>
            <button type="button" class="add" @click=${this.handleNewPost}>추가</button>
          </div>
        </div>
      </div>
    `}};s.styles=[c,p`
      .container {
        padding: 2rem;
        margin: 0 auto;

        .wrapper {
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          max-width: 400px;
        }

        & input {
          padding: 0.5rem;
          border: 1px solid white;
          width: 100%;
        }
      }

      .buttonGroup {
        text-align: center;

        & button {
          padding: 0.5rem 1rem;
          border: 1px solid dodgerblue;
          cursor: pointer;
          margin-top: 2rem;
        }

        .add {
          background-color: dodgerblue;
          color: white;
        }
      }
    `];d([u()],s.prototype,"fileImages",2);s=d([g("new-post")],s);
