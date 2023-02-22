var count = 1;
var productid
function Plus1(){
    count ++
    document.getElementById("Amount").value = count
}
function Minus1(){
    if(count > 1){
        count --
    }
    document.getElementById("Amount").value = count
}

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
async function loadPostData(){
    const url = new URL(window.location.href); 
    const id = url.searchParams.get('id'); 
    let pack = await GetData("","/post-data/"+id)
    document.getElementsByClassName("titleProduct")[0].innerHTML = pack["Name"]
    let star = "Rate:   "
    for (let index = 0; index < pack["Rate"]; index++) {
        star += "⭐"
    }
    document.getElementsByClassName("rate")[0].innerHTML = star
    document.getElementsByClassName("Pricing")[0].innerHTML = `Price:  ${pack["Price"]}`
    document.getElementsByClassName("Latin")[0].children[0].innerHTML = pack["Description"].replaceAll('\n', '<br>')
    elementAdd(`<img src="${pack["img"][0]}" alt="">`, document.getElementsByClassName("ProductImg")[0])
    for(const img of pack["img"]){
        elementAdd(`<img src="${img}" alt="">`, document.getElementsByClassName("SProductImg")[0])
    }
}
async function addtocart(){
    const url = new URL(window.location.href); 
    const id = url.searchParams.get('id'); 
    if(localStorage.getItem("seasion")){
        let r =  await GetData("",`/add-to-cart?ssid=${localStorage.getItem("seasion")}&productid=${id}`)
        window.open("/cart", "_self")
    }else{
        window.open("/account-setup", "_self")
    }
}
function buynow(){
    if(localStorage.getItem("seasion")){
        window.open('/cart', '_self')
    }else{
        window.open('/account-setup', '_self')
    }
}
window.onload = loadPostData()