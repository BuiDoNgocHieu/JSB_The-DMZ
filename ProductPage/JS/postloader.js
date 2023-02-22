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
        <div class="PostImg">
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
var postPage = [];
var postBackup = []
var postPageIndex = 1
async function loadPost() {
  let post = [];
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const search = urlParams.get('s')
  console.log("Loading post...")
  console.log(search)
  let postData;
  if(search){
    postData = await GetData(
        "",
        `/search-product/${search}`
    );
    console.log("Searching for " + search)
  }else{
    postData = await GetData(
        "",
        `/require/Data+Post+Product+Product-data.json`
    );
  }
  postBackup = postData
  SetupPage(postData)
}
function SetupPage(pdata){
  let post = [];
  postPage = []
  for (const key in pdata) {
    if (Object.hasOwnProperty.call(pdata, key)) {
      const element = pdata[key];
      post.push(CreatePostBlock(element));
    }
  }
  let postSlideNumber = Math.ceil(post.length / 5);
  for (let x = 0; x < postSlideNumber; x++) {
    let PostLine = ""
    for (let y = 0; y < 5; y++) {
        let Element = post[0]
        if(Element){
            PostLine += Element
        }
        console.log(post[0])
        console.log('state y: '+y)
        post.shift()
    }
    let PostLineElement =  `
    <div class="PostSlide" id="LimitedPostSlider">
        ${PostLine}                    
    </div>
    `
    postPage.push(PostLineElement)
  }
  let data = CreatePostPage()
  postPage = data
  document.getElementById("PageChange").innerHTML = ""
  let pageSingle = Object.keys(data)
  for(let x = 1; x < pageSingle.length +1; x++){
    if(x == 1){
      elementAdd(
        `
          <div class="pageNumber" pageNum="${x}" onclick="pageChange(this)" style = "background-color:rgba(70,70,70,0.5);">${x}</div>
        `,
        document.getElementById("PageChange")
      )
    }else{
      elementAdd(
        `
          <div class="pageNumber" pageNum="${x}" onclick="pageChange(this)">${x}</div>
        `,
        document.getElementById("PageChange")
      )
    }
    
  }
  loadPage(1)
  
}
function pageChange(t){
  let listOfPage = t.parentNode.getElementsByClassName("pageNumber")
  for(ele of listOfPage){
    ele.style.backgroundColor = "white"
  }
  t.style.backgroundColor = "rgba(70,70,70,0.5)"
  loadPage(Number(t.getAttribute("pageNum")))
}
function loadPage(index){
  console.log("New page")
  document.getElementById("PostDisplay-product").innerHTML=""
  for(let singleLine in postPage[index]){
    console.log(singleLine)
    elementAdd(postPage[index][singleLine], document.getElementById("PostDisplay-product")) 
  }
  window.scrollTo(0,0)
}
function CreatePostPage(){
  console.log(postPage)
  let Page =  {}
  let pageMax = Math.ceil(postPage.length / 5)+1
  for (let index = 1; index < pageMax; index++) {
    console.log("Config page "+index)
    Page[index]=[]
    for(let x = 0; x < 5; x++){
      let line = postPage[0]
      console.log(line)
      if(line!=undefined){
        Page[index].push(line)
        console.log("Addedline")
      }
      postPage.shift()
    }
  }
  return Page
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

loadPost();

var checkbox = document.getElementsByName("checkbox-filter")
for (const iterator of checkbox) {
  iterator.addEventListener("change", (t)=>{
    for(const main of checkbox){
      if(main != t.currentTarget){
        main.checked = false
        console.log(main.parentNode)
      }
    }
    let todo = t.currentTarget.parentNode.getAttribute("action")
    console.log(todo)
    if(t.currentTarget.checked){
      if(todo == "PriceLowToHigh"){
        postBackup.sort(function(a, b) {
          return a.Price - b.Price;
        });
        SetupPage(postBackup)
      }else if(todo == "PriceHighToLow"){
        postBackup.sort(function(a, b) {
          return  b.Price - a.Price;
        });
        SetupPage(postBackup)
      }else if(todo == "RateHighToLow"){
        postBackup.sort(function(a, b) {
          return  b.Rate - a.Rate;
        });
        SetupPage(postBackup)
      }else if(todo == "RateLowToHigh"){
        postBackup.sort(function(a, b) {
          return   a.Rate - b.Rate;
        });
        SetupPage(postBackup)
      }
    }
    
  })
}

