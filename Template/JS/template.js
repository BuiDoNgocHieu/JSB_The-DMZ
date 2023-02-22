var resizeStack = false;
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
    rect.bottom >=
      (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right >= (window.innerWidth || document.documentElement.clientWidth)
  );
}
window.onscroll = function () {
  if (window.pageYOffset > sticky) {
    header.classList.add("sticky");
    document.getElementById("SearchInput").style.width = "90%";
    document.getElementById("SearchPanel").style.width = "90%";
  } else {
    header.classList.remove("sticky");
    document.getElementById("SearchInput").style.width = "50%";
    document.getElementById("SearchPanel").style.width = "50%";
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
function resize() {
  let img = document.getElementById("img-bg-3");
  let dateBox = document.getElementById("dateTimeCount");
  let ghost = document.getElementById("ghost");
  console.log(`BGHEIGHT: ${img.offsetHeight} WIDTH: ${img.offsetWidth}`);
  ghost.style.width = img.offsetWidth + "px";
  ghost.style.height = img.offsetHeight + "px";
  dateBox.style.width = img.offsetWidth + "px";
  dateBox.style.height = img.offsetHeight + "px";
  resizeStack = true;
}
window.onresize = () => {
  resize();
};
function dateTime() {
  let HD = document.getElementById("DayDisplay").getElementsByTagName("p")[0];
  let HH = document.getElementById("HourDisplay").getElementsByTagName("p")[0];
  let HM = document.getElementById("MinDisplay").getElementsByTagName("p")[0];
  let HS = document.getElementById("SecDisplay").getElementsByTagName("p")[0];
  let timeNow = new Date();
  let monthNow = Number(timeNow.getMonth()) + 1;
  let day = Math.round(30 - timeNow.getDate() + (12 - monthNow) * 30 - 5);
  HD.innerHTML = day;
  HH.innerHTML = 24 - timeNow.getHours();
  HM.innerHTML = 60 - timeNow.getMinutes();
  HS.innerHTML = 60 - timeNow.getSeconds();
}
async function setup() {
  var adBanner = document.getElementById("Banner-localAds");
  var adBlock = await GetData("", "pagebanner");
  loadImageBlock(adBanner.getElementsByClassName("item")[0], adBlock);
  setInterval(dateTime, 1000);
  resize();
  dateTime();
  createPackage();
  accountLoad();
}
var allproduct;
async function createPackage() {
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
  if (text) {
    console.log("Search call");
    let panel = t.parentNode.getElementsByClassName("SearchPanel")[0];
    let Same = Search(text);
    panel.innerHTML = "";
    panel.style.display = "block";
    for (const element of Same) {
      elementAdd(
        `
          <div class="SearchRecom">${element}</div>
          `,
        panel
      );
    }
  } else {
    let panel = t.parentNode.getElementsByClassName("SearchPanel")[0];
    panel.innerHTML = "";
    panel.style.display = "none";
  }
}
function stopSearchPanel() {
  document.getElementById("SearchPanel").style.display = "none";
}
document.getElementById("SearchInput").addEventListener("keypress", (e) => {
  if (e.key === "Enter" || e.keyCode === 13) {
    console.log("Direct.......");
    window.open(
      `/product?s=${document.getElementById("SearchInput").value}`,
      "_self"
    );
  }
});

setup();
var G = setInterval(() => {
  if (!resizeStack) {
    resize();
    console.log("Call resize page");
  } else {
    clearInterval(G);
  }
}, 10);
async function accountLoad() {
  let acc_name = document.getElementsByClassName("account")[0].children[1];
  let ssid = localStorage.getItem("seasion");
  if (ssid) {
    let re = await GetData("", `/public-info/${ssid}`);
    acc_name.innerHTML = re["Username"];
    document.getElementsByClassName("account")[0].children[0].style.display = "none"
  }
}
function accountCenter(action){
  let ssid = localStorage.getItem("seasion");
  if(ssid){
    let packer = document.getElementsByClassName("account")[0]
    if(action == "hover"){
      for (const element of packer.children){
        if(element.className != "accountOption"){
          element.style.display = "none"
        }else{
          element.style.display = "block"
        }
      }
    }else if(action == "mleave"){
      for (const element of packer.children){
        if(element.className != "accountOption"){
          element.style.display = "block"
        }else{
          element.style.display = "none"
        }
        if((element.id == "acc-ico" && localStorage.getItem("seasion"))){
          element.style.display = "none"
        }
      }
    }
  }
  if(action == "click" && !ssid){
    window.open('/account-setup', '_self')
  }
}
function logout_simple(){
  localStorage.clear()
  GetData("/remove/seasionid/")
  window.open('/account-setup', '_self')

}