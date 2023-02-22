var input = document.getElementById("imageUpload");
var imageResponse = undefined;
var PostUploadData = {};
function uploadImg() {
  let data = new FormData();
  console.log(input.files);
  data.append("image", input.files[0], input.files[0].name);
  fetch("/uploadImage", {
    method: "POST",
    body: data,
  })
    .then((response) => response.json())
    .then((data) => {
      imageResponse = data;
      let path = imageResponse.path;
      let res = "/require/";
      for (let i = 0; i < path.length; i++) {
        if (path[i] == "\\") {
          res += "+";
        } else {
          res += path[i];
        }
      }
      document.getElementById("ImagePreview").src = res;
      PostUploadData["img"] = [res];
      PostUploadData["comment"] = [];
    });
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
function uuidv4() {
  return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
    (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
  );
}
async function UploadPost() {
  PostUploadData["Name"] = document.getElementById("ProductTitle").value;
  PostUploadData["Description"] = document.getElementById("Description").value;
  PostUploadData["Price"] = document.getElementById("ProductPrice").value;
  PostUploadData["Rate"] = 0;
  PostUploadData["id"] = uuidv4();
  await UploadData("", "/Upload", PostUploadData, "PRODUCTPOST");
  window.open(window.location.href, "_self")
}
