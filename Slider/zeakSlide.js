var SliderList = {}
function Slider_prev(t){
  let SliderID = t.parentNode.parentNode.id
  SliderList[SliderID]["currentDisplay"] = SliderID + SliderList[SliderID]["index"]
  console.log("current: "+SliderList[SliderID]["index"])
  if(SliderList[SliderID]["index"] > 0){
    SliderList[SliderID]["index"] -= 1
  }
  console.log("new: "+SliderList[SliderID]["index"])
  ImageSet(SliderID)
}
function Slider_next(t){
  let SliderID = t.parentNode.parentNode.id
  SliderList[SliderID]["currentDisplay"] = SliderID + SliderList[SliderID]["index"]
  console.log("current: "+SliderList[SliderID]["index"])
  if(SliderList[SliderID]["index"]+1 < SliderList[SliderID]["Block"].length){
    SliderList[SliderID]["index"] += 1 
  }
  console.log("new: "+SliderList[SliderID]["index"])
  ImageSet(SliderID)
}

async function getAverageRGB(imgEl) {
  var blockSize = 5, // only visit every 5 pixels
    defaultRGB = { r: 0, g: 0, b: 0 }, // for non-supporting envs
    canvas = document.createElement("canvas"),
    context = canvas.getContext && canvas.getContext("2d"),
    data,
    width,
    height,
    i = -4,
    length,
    rgb = { r: 0, g: 0, b: 0 },
    count = 0;

  if (!context) {
    return defaultRGB;
  }

  height = canvas.height =
    imgEl.naturalHeight || imgEl.offsetHeight || imgEl.height;
  width = canvas.width = imgEl.naturalWidth || imgEl.offsetWidth || imgEl.width;

  context.drawImage(imgEl, 0, 0);

  try {
    data = context.getImageData(0, 0, width, height);
  } catch (e) {
    /* security error, img on diff domain */ alert("x");
    return defaultRGB;
  }

  length = data.data.length;

  while ((i += blockSize * 4) < length) {
    ++count;
    rgb.r += data.data[i];
    rgb.g += data.data[i + 1];
    rgb.b += data.data[i + 2];
  }

  // ~~ used to floor values
  rgb.r = ~~(rgb.r / count);
  rgb.g = ~~(rgb.g / count);
  rgb.b = ~~(rgb.b / count);

  return rgb;
}
function elementAdd(html, parent) {
  const placeholder = document.createElement("div");
  placeholder.insertAdjacentHTML("afterbegin", html);
  const node = placeholder.firstElementChild;
  parent.appendChild(node);
}
async function imgBackgroundset() {
  let allBlockAvail = document.getElementsByClassName("imgBlock");
  for (const key in allBlockAvail) {
    if (Object.hasOwnProperty.call(allBlockAvail, key)) {
      const element = allBlockAvail[key];
      let imgs = element.getElementsByTagName("img")[0];
      let color = await getAverageRGB(imgs);
      element.style.backgroundColor = `rgb(${color.r}, ${color.g}, ${color.b})`;
    }
  }
}
async function getOutlineColor(ele) {
  el_style = window.getComputedStyle(ele);
  el_border_color = el_style.getPropertyValue("border-color");
  console.log(el_border_color);
}
function ImageSet(slideName){
  let DisplayBlock = document.getElementById(
    SliderList[slideName]["currentDisplay"]
  );
  DisplayBlock.style.display = "none";
  let newBlock = document.getElementById(slideName + String(SliderList[slideName]["index"]));
  newBlock.style.display = "block";
  imgBackgroundset();
  setTimeout(()=>{
    if(SliderList[slideName]["countdown"]){
      SliderList[slideName]["countdown"] = false
     console.log("ennable auto change")
    } 
  }, 5000)
}
function ImageChange(slideName, block) {
  if (SliderList[slideName]["countdown"] == false){
    console.log("next img")
    let DisplayBlock = document.getElementById(
      slideName + String(SliderList[block]["index"])
    );
    DisplayBlock.style.display = "none";
    if (SliderList[block]["index"] < SliderList[block]["Block"].length) {
      SliderList[block]["index"] += 1;
    }
    if (SliderList[block]["index"] >= SliderList[block]["Block"].length) {
      SliderList[block]["index"] = 0;
    }
    let newBlock = document.getElementById(slideName + String(SliderList[block]["index"]));
    newBlock.style.display = "block";
    imgBackgroundset();
    let controllHandle =
      newBlock.parentNode.parentNode.getElementsByClassName("Controller")[0];
    let Panel = controllHandle.getElementsByClassName("TabPanel")[0];
    Panel.getElementsByClassName("imgTar")[0].innerHTML = `${
      SliderList[block]["index"] + 1
    }/${SliderList[block]["Block"].length}`;
  }
}
function loadImageBlock(contain, blockStorage) {
  blockStorage["Name"] = contain.parentNode.id
  let imgUrlList = blockStorage["Block"];
  for (const key in imgUrlList) {
    if (Object.hasOwnProperty.call(imgUrlList, key)) {
      const element = imgUrlList[key];
      let html = `
                        <div class="imgBlock fade" style ="display: none;" id ="${blockStorage["Name"]}${key}">
                            <img src="${element.url}" alt="${element.cap}">
                            <div class="cap">${element.cap}</div>
                        </div>
                    `;
      elementAdd(html, contain);
    }
  }
  SliderList[blockStorage["Name"]] = blockStorage
  SliderList[blockStorage["Name"]]["countdown"] = false

  setInterval(
    ImageChange,
    blockStorage["duration"],
    (slideName = blockStorage["Name"]),
    (block = blockStorage["Name"])
  );
}

var head = document.getElementsByTagName('HEAD')[0];
 
// Create new link Element
var link = document.createElement('link');

// set the attributes for link element
link.rel = 'stylesheet';

link.type = 'text/css';

link.href = '/require/Slider+zeakSlide.css';

// Append link element to HTML head
head.appendChild(link);