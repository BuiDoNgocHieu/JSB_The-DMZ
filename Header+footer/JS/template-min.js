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
function hoverButtonEnter(t) {
  let parent = t.parentNode;
  let under = parent.getElementsByTagName("p");
  console.log(under[0]);
  under[0].classList.remove("unactive-ud");
  under[0].classList.add("active-ud");
}
function hoverButtonLeft(t) {
  let parent = t.parentNode;
  let under = parent.getElementsByTagName("p");
  console.log(under[0]);
  under[0].classList.add("unactive-ud");
  under[0].classList.remove("active-ud");
}
function isInViewport(element) {
  const rect = element.getBoundingClientRect();
  return (
      rect.bottom >= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right >= (window.innerWidth || document.documentElement.clientWidth)
  );
}
window.onscroll = function () {
  if (window.pageYOffset > sticky) {
    header.classList.add("sticky");
    document.getElementById("SearchInput").style.width = "90%"
    let lister = document.getElementsByClassName("action-button")
    for(const element of lister){
      let child = element.children
      for(const childElement of child){
        console.log(childElement)
        childElement.style.color = "white"
      }
    }
    lister = document.getElementById("Signin-Btn").children
    for(const element of lister){
      element.style.color = "white"
    }
    document.getElementsByClassName("header-logo")[0].src = "/require/Data+img+logo.png"
  } else {
    header.classList.remove("sticky");
    document.getElementById("SearchInput").style.width = "50%"
    let lister = document.getElementsByClassName("action-button")
    for(const element of lister){
      let child = element.children
      for(const childElement of child){
        console.log(childElement)
        childElement.style.color = "black"
      }
    }
    lister = document.getElementById("Signin-Btn").children
    for(const element of lister){
      element.style.color = "black"
    }
    document.getElementsByClassName("header-logo")[0].src = "/require/Data+img+logo-black.png"
  }
};

var header = document.getElementsByClassName("header")[0];
var sticky = header.offsetTop;

function showList(t) {
  t = t.parentNode;
  let list = t.getElementsByClassName("lister");
  if (t.getAttribute("act") == "false") {
    list[0].classList.remove("lister-normal");
    list[0].classList.add("lister-active");
    t.setAttribute("act", "true");
  } else {
    list[0].classList.add("lister-normal");
    list[0].classList.remove("lister-active");
    t.setAttribute("act", "false");
  }
}
function closenav() {
  let t = document.getElementById("phone-nav");
  let nav = document.getElementById("nav-main");
  let object = t.childNodes;
  t.classList.add("hide");
  nav.classList.add("hide");
  setTimeout(() => {
    t.classList.add("fullhide");
    nav.classList.add("fullhide");
  }, 200);
}
function opennav() {
  let t = document.getElementById("phone-nav");
  let nav = document.getElementById("nav-main");
  let object = t.childNodes;
  t.classList.remove("hide");
  t.classList.remove("fullhide");
  t.classList.add("show-blur");
  setTimeout(() => {
    nav.classList.remove("fullhide");
    nav.classList.remove("hide");
    nav.classList.add("show");
  }, 200);
}

async function setup() {
  createPackage()
}
window.onload =setup ()


var allproduct;
async function createPackage(){
  allproduct = await GetData(
    "",
    "/require/Data+Post+Product+Product-data.json"
  );
}

function Search(name) {
  let nameList = [];
  for (const element of allproduct) {
    let names = element["Name"].toLowerCase();
    if (names.includes(name.toLowerCase()) == true) {
      let currentInside = false;
      for (const current of nameList) {
        if (current == names) {
          currentInside = true;
          break;
        }
      }
      if (!currentInside) {
        nameList.push(names);
      }
    }
  }
  return nameList;
}
function elementAdd(html, parent) {
  const placeholder = document.createElement("div");
  placeholder.insertAdjacentHTML("afterbegin", html);
  const node = placeholder.firstElementChild;
  parent.appendChild(node);
}
function searchLiveChange(t) {

  let text = t.value;
  if(text){
    console.log("Search call");
    let panel = t.parentNode.getElementsByClassName("SearchPanel")[0];
    let Same = Search(text);
    panel.innerHTML = ""
    panel.style.display="block"
    for (const element of Same) {
      elementAdd(
        `
          <div class="SearchRecom">${element}</div>
          `,
        panel
      );
    }
  }else{
    let panel = t.parentNode.getElementsByClassName("SearchPanel")[0];
    panel.innerHTML = ""
    panel.style.display="none"
  }
  
}
function stopSearchPanel(){
  document.getElementById("SearchPanel").style.display = "none"
}
document.getElementById("SearchInput").addEventListener("keypress",(e)=>{
  if (e.key === 'Enter' || e.keyCode === 13) {
    console.log("Direct.......")
    window.open(`/product?s=${document.getElementById("SearchInput").value}`, '_self')
  }
})
