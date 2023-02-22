var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var SnowRendering;
const queryString = window.location.search;
const params = new URLSearchParams(queryString)
var GiftData;
var LetterTextContent;
async function GiftGet(){
  GiftData = await GetData('', `/UnboxData/${params.get('uid')}`)
  LetterTextContent = GiftData["letter"].replaceAll("\n", "<br>")
}
GiftGet()
function RenderSnow() {
  //canvas dimensions
  var W = window.innerWidth;
  var H = window.innerHeight;
  canvas.width = W;
  canvas.height = H;
  //snowflake particles
  var mp = 60; //max particles
  var particles = [];
  for (var i = 0; i < mp; i++) {
    particles.push({
      x: Math.random() * W, //x-coordinate
      y: Math.random() * H, //y-coordinate
      r: Math.random() * 4 + 1, //radius
      d: Math.random() * mp, //density
    });
  }

  //Lets draw the flakes
  function draw() {
    ctx.clearRect(0, 0, W, H);

    ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
    ctx.beginPath();
    for (var i = 0; i < mp; i++) {
      var p = particles[i];
      ctx.moveTo(p.x, p.y);
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2, true);
    }
    ctx.fill();
    update();
  }

  //Function to move the snowflakes
  //angle will be an ongoing incremental flag. Sin and Cos functions will be applied to it to create vertical and horizontal movements of the flakes
  var angle = 0;
  function update() {
    angle += 0.01;
    for (var i = 0; i < mp; i++) {
      var p = particles[i];
      //Updating X and Y coordinates
      //We will add 1 to the cos function to prevent negative values which will lead flakes to move upwards
      //Every particle has its own density which can be used to make the downward movement different for each flake
      //Lets make it more random by adding in the radius
      p.y += Math.cos(angle + p.d) + 1 + p.r / 2;
      p.x += Math.sin(angle) * 2;

      //Sending flakes back from the top when it exits
      //Lets make it a bit more organic and let flakes enter from the left and right also.
      if (p.x > W + 5 || p.x < -5 || p.y > H) {
        if (i % 3 > 0) {
          //66.67% of the flakes
          particles[i] = { x: Math.random() * W, y: -10, r: p.r, d: p.d };
        } else {
          //If the flake is exitting from the right
          if (Math.sin(angle) > 0) {
            //Enter from the left
            particles[i] = { x: -5, y: Math.random() * H, r: p.r, d: p.d };
          } else {
            //Enter from the right
            particles[i] = { x: W + 5, y: Math.random() * H, r: p.r, d: p.d };
          }
        }
      }
    }
  }

  //animation loop
  SnowRendering = setInterval(draw, 33);
}
window.onload = RenderSnow();
addEventListener("resize", (event) => {
  clearInterval(SnowRendering);
  RenderSnow();
});
function RandInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
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
var TextChanger;
async function GiftRes() {
  let letter = document.getElementById("Letter");
  let bg = letter.parentNode.parentNode;
  let phase = bg.getAttribute("phase")
  console.log("Changed");
  console.log(letter);
  console.log(letter.url);
  if (phase == "Closed") {
        bg.classList.add("shake");
    setTimeout(() => {
      letter.src =
        "/require/Data+img+Letter-opened.png";
      document.getElementsByClassName("GiftOpenText")[0].innerHTML =
        "Click to take it out~";
      bg.setAttribute("phase", "opened")
      bg.classList.remove("shake")
    }, 300);
  } else if (phase == "opened") {
          bg.classList.add("shake");
    setTimeout(() => {
      letter.src =
        "/require/Data+img+Letter-paper.png";
      document.getElementsByClassName("GiftOpenText")[0].innerHTML =
        "Enjoy this letter~";
      document.getElementsByClassName("letterText")[0].innerHTML = LetterTextContent
      bg.setAttribute("phase", "Read")
      bg.classList.remove("shake")
    }, 300);
  }else if(phase == "Read"){
      bg.classList.add("shake");
      setTimeout(() => {
      letter.src =
        "/require/Data+img+Gift-closed.png";
      document.getElementsByClassName("GiftOpenText")[0].innerHTML =
        "What is inside?";
      document.getElementsByClassName("letterText")[0].innerHTML = ''
      bg.setAttribute("phase", "GiftBox")
      bg.classList.remove("shake")
    }, 300);
  }else if(phase == "GiftBox"){
      bg.classList.add("shake");
      setTimeout(() => {
      letter.src =GiftData['img'];
      letter.classList.add("ImgLetterZoom")
      document.getElementsByClassName("GiftOpenText")[0].innerHTML =
        `Your gift is: ${GiftData['GiftName']}`;
      document.getElementsByClassName("letterText")[0].innerHTML = ''
      bg.setAttribute("phase", "GiftImg")
      bg.classList.remove("shake")
      TextChanger = setInterval(()=>{
          if(document.getElementsByClassName("GiftOpenText")[0].innerHTML == 'Click to get!~'){
            document.getElementsByClassName("GiftOpenText")[0].innerHTML =
        `Your gift is: ${GiftData['GiftName']}`;
          }else{
            document.getElementsByClassName("GiftOpenText")[0].innerHTML =
        `Click to get!~`;
          }
        }, 2000)
    }, 300);
  }else{
    clearInterval(TextChanger);
  }
}
async function Setup_Gift(){
  
}