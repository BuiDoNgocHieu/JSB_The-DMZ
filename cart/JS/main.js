async function GetData(url, mode) {
  console.log(`Current url:  ${window.location.toLocaleString()}`);
  console.log(`Getting at url:  ${url}${mode}`);
  let pack = undefined;
  const response = await fetch(`${url}${mode}`);
  // Storing data in form of JSON
  var data = await response.json();
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
async function loadcart(){
    if(localStorage.getItem("seasion")){
        let cart = await GetData("","/cart-item/"+localStorage.getItem("seasion"))
        for(const post of cart){
            let data = await GetData("", "/post-data/"+post["id"])
            elementAdd(`
        <div class="product-block" postid="${post["id"]}">
            <input type="checkbox" class="select" width="25px" height="25px" onchange="reprice(this)">
            <img src="${data["img"][0]}" alt="">
            <div class="info" onclick = "window.open('/product-view?id=${post["id"]}', '_self')">
                <div class="title">
                    ${data["Name"]}
                </div>
                <div class="price" price="${data["Price"]}">
                    Price: ${data["Price"]}$
                </div>
            </div>
            <div class="interact">
                <div class="square-button" onclick="amountChange(this)" type="-">
                    -
                </div>
                <input type="number" placeholder="${post["amount"]}" max="10" value="${post["amount"]}" onchange="reprice()" disabled>
                <div class="square-button"onclick=" amountChange(this)" type="+">
                    +
                </div>
            </div>
        </div>`, document.getElementsByClassName("cart-contain")[0])
        }
    }else{
        window.open("/account-setup", "_self")
    }
}
async function amountChange(ts){
    //let ts = document.getElementById("sa")
    if(ts.getAttribute("type") == "-"){
        if(Number(ts.parentNode.children[1].value) > 1){
            ts.parentNode.children[1].value = Number(ts.parentNode.children[1].value)-1
            let r =  await GetData("",`/remove-from-cart?ssid=${localStorage.getItem("seasion")}&productid=${ts.parentNode.parentNode.getAttribute("postid")}`)
            ts.parentNode.children[1].value = r["amount"]
        }else{
            if(confirm("Are you sure to delete this item?")){
                ts.parentNode.children[1].value = Number(ts.parentNode.children[1].value)-1
                let r =  await GetData("",`/remove-from-cart?ssid=${localStorage.getItem("seasion")}&productid=${ts.parentNode.parentNode.getAttribute("postid")}`)
                ts.parentNode.children[1].value = r["amount"]
                window.open("/cart", "_self")
            }
        }
        reprice()
    }else{
        ts.parentNode.children[1].value = Number(ts.parentNode.children[1].value)+1
        let r =  await GetData("",`/add-to-cart?ssid=${localStorage.getItem("seasion")}&productid=${ts.parentNode.parentNode.getAttribute("postid")}`)
        ts.parentNode.children[1].value = r["amount"]
        reprice()
    }
}
var itemSelected = []
function reprice(){
    let cart_item_container = document.getElementsByClassName("cart-contain")[0].children
    let total = 0
    for(const cart_item of cart_item_container){
        let selected = cart_item.getElementsByClassName("select")[0]
        console.log(selected.checked)
        if(selected.checked){
            let price = cart_item.getElementsByClassName("info")[0].getElementsByClassName("price")[0].getAttribute("price")
            total += Number(price) * Number(cart_item.getElementsByClassName("interact")[0].children[1].value)
            itemSelected.push(cart_item.getAttribute("postid"))
        }else{
            let replacer = []
            for(const item of itemSelected){
                if(item != cart_item.getAttribute("postid")){
                    replacer.push(item)
                    break
                }
            }
            itemSelected = replacer
        }
    }
    document.getElementById("display-price").setAttribute("total", total)
    document.getElementById("display-price").innerHTML = `${total}.00$`

}
async function buynow(){
    if(document.getElementById("display-price").getAttribute("total") != "0"){
        for(const item of itemSelected){
            console.log("Removing item...")
            await GetData("",`/remove-product?ssid=${localStorage.getItem("seasion")}&id=${item}`)
        }
        window.open("/specialthanks?product="+itemSelected, "_self")
    }else{
        alert("Please choose some item first!")
    }
}
window.onload = loadcart()