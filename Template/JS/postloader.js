function CreatePostBlock(data) {
    let rateBlock = "";
    for (let index = 0; index < data["Rate"]; index++) {
      rateBlock +=
        '<i class="fa-solid fa-star" style="color: rgb(255, 251, 0);"></i>';
    }
    if (5 - data["Rate"] > 0) {
      for (let index = 0; index < 5 - data["Rate"]; index++) {
        rateBlock +=
          '<i class="fa-solid fa-star" style="color: rgb(70, 70, 70);"></i>';
      }
    }
  
    let post = `
  <div class="Post" style="margin: auto;" postid = "${data["id"]}" onclick="window.open('/product-view?id=${data["id"]}')">
          <div class="PostImg" >
              <img src="${data["img"][0]}" alt="">
          </div>
          <div class="PostInfo">
              <div class="PostTitle">
                  <strong>${data["Name"]}</strong>
              </div>
              <div class="PostPrice">
                  <strong>${data["Price"]}$</strong>
              </div>
              <div class="ProductStatus">
              <div class="ProductRate">
                  ${rateBlock}
              </div>
              <div class="ProductSold">
                  <i class="fa-solid fa-cart-shopping"></i>
                  <span>? sold</span>
              </div>
          </div>
      </div>
  </div>
      `;
    return post;
}
async function GetData(url, mode) {
    console.log(`Current url:  ${window.location.href}`);
    console.log(`Getting at url:  ${url}${mode}`);
    let pack = undefined;
    const response = await fetch(`${url}${mode}`);
    // Storing data in form of JSON
    var data = await response.json();
    console.log(data);
    if (response) {
    }
    return Promise.resolve(data);
}
function elementAdd(html, parent) {
    const placeholder = document.createElement("div");
    placeholder.insertAdjacentHTML("afterbegin", html);
    const node = placeholder.firstElementChild;
    parent.appendChild(node);
}
async function postLoad(){
    let PostSlide = document.getElementsByClassName("PostSlide")
    let Post = await GetData("", "/require/Data+Post+Product+Product-data.json")
    for (let index of PostSlide){
        for(let i = 0; i < 5; i ++){
            let block = CreatePostBlock(Post[i])
            elementAdd(block, index)
        }
    }
}
window.onload = postLoad()
  