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
async function UploadData(url, mode, data, pack) {
  fetch(url+mode, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams(
      {"JSON": JSON.stringify(data), "Package": pack}
    ),
  }).then((res) => {
    return Promise.resolve(res)
  });
}
function getDate() {
  var today = new Date();
  var dd = today.getDate();

  var mm = today.getMonth() + 1;
  var yyyy = today.getFullYear();
  if (dd < 10) {
    dd = "0" + dd;
  }

  if (mm < 10) {
    mm = "0" + mm;
  }
  today = mm + "/" + dd + "/" + yyyy;
  return today;
}
function uuidv4() {
  return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
    (
      c ^
      (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
    ).toString(16)
  );
}
function elementAdd(html, parent) {
  const placeholder = document.createElement("div");
  placeholder.insertAdjacentHTML("afterbegin", html);
  const node = placeholder.firstElementChild;
  parent.appendChild(node);
}
async function loadItem() {
  let url_cli = window.location.href;
  const url = new URL(url_cli);
  const productid = url.searchParams.get("product");
  let allitem = productid.split(",");
  for (const item in allitem) {
    console.log(item);
    let data = await GetData("", "/post-data/" + allitem[item]);
    let itemBlock = `
        <div class="item" itemID="${data["id"]}">
            <input type="checkbox" name="" onclick = "letterItemSelection(this)" >
            <img src="${data["img"][0]}" alt="">
            <h4 class="title is-4" style="align-self: flex-start;">
                ${data["Name"]}
            </h4>
        </div>`;
    elementAdd(itemBlock, document.getElementById("itemDisplay"));
  }
}
var selectedItem;
function letterItemSelection(t) {
  let itemContainer = document.getElementById("itemDisplay");
  for (const item of itemContainer.children) {
    if (item != t.parentNode) {
      item.children[0].checked = false;
    } else {
      selectedItem = t.parentNode;
    }
  }
}
async function generateLetter() {
  let title = document.getElementById("LetterTitle");
  let aera = document.getElementById("LetterAera");
  let wished = document.getElementById("LetterWishes");
  let auth = document.getElementById("LetterAuth");
  let data = await GetData(
    "",
    "/post-data/" + selectedItem.getAttribute("itemID")
  );
  if (title.value && aera.value && wished.value && auth.value) {
    let uid = uuidv4()
    let packed = JSON.parse(`
        {"id": "${uid}",
        "${uid}": {
            "img": "${data["img"][0]}",
            "productid": "${selectedItem.getAttribute("itemID")}",
            "letter": "${aera.value}",
            "GiftName": "${data["Name"]}",
            "Title":"${title.value}",
            "Description": "${wished.value}",
            "Author": "${auth.value}",
            "Time": "${getDate()}"
            }
        }`);

    UploadData("","/Upload", packed, "addLetter")
    document.getElementsByClassName("FormScreen")[0].style.display = "none"
    document.getElementById("linkTitle").style.display = "block"
    document.getElementById("LinkDisplay").style.display = "block"
    var url = window.location.href.split('?')[0];
    url = "http://" + url.split("/")[2]
    document.getElementById("LinkDisplay").innerHTML = url+"/UnboxGift?uid="+selectedItem.getAttribute("itemID")
  }else{
    alert("Please fill all require form")
  }
}
window.onload = loadItem();
