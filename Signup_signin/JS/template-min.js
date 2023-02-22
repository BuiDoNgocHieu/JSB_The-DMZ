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
  } else {
    header.classList.remove("sticky");
    document.getElementById("SearchInput").style.width = "50%"
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
  var adBanner = document.getElementById("Banner-localAds")
  var adBlock = await GetData("","pagebanner")
  loadImageBlock(adBanner.getElementsByClassName("item")[0], adBlock);
  setInterval(dateTime, 1000);
}
setup();
