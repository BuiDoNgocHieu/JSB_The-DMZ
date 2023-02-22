const axios = require("axios");
const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const fs = require("fs");
const path = require("path");
const multer = require("multer");
const bodyParser = require("body-parser");
const { constants } = require("buffer");
const { randomInt } = require("crypto");

app.use(bodyParser.urlencoded({ extended: true }));



function tobin(myString) {
  result = "";
  for (let i = 0; i < myString.length; i++) {
    if (result != "") {
      result += " ";
    }
    result += myString[i].charCodeAt(0).toString(2);
  }
  return result;
}
function hex2bin(hex) {
  var str = "";
  for (var i = 0; i < hex.length; i += 2)
    str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
  return str;
}
function bin2str(binary) {
  const outputStr = String.fromCharCode(
    ...binary.split(" ").map((bin) => parseInt(bin, 2))
  );
  return outputStr;
}
function longBinToHex(bin) {
  let binarr = bin.split(" ");
  let result = "";
  for (const iterator of binarr) {
    if (result != "") {
      result += " ";
    }
    result += parseInt(iterator, 2).toString(16);
  }
  return result;
}

const serverConf = {
  adress: false, //"172.16.20.199", //"192.168.1.78",//"172.16.20.154", //false,
  port: "5000",
};

const imageStorage = multer.diskStorage({
  // Destination to store image
  destination: "Data/img",
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "_" + Date.now() + path.extname(file.originalname)
    );
    // file.fieldname is name of the field (image)
    // path.extname get the uploaded file extension
  },
});
const imageUpload = multer({
  storage: imageStorage,
  limits: {
    fileSize: 10000000, // 1000000 Bytes = 1 MB
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(png|jpg|jpeg)$/)) {
      return cb(new Error("Please upload a Image"));
    }
    cb(undefined, true);
  },
});
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/Redirect.html");
});
app.get("/get-started", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});
app.get("/search-product/:name", (req, res) => {
  let targetname = req.params.name.toLowerCase();
  let postlist = [];
  fs.readFile(
    __dirname + "/Data/Post/Product/Product-data.json",
    "utf8",
    (err, data) => {
      if (err) {
        console.log(`Error reading file from disk: ${err}`);
        res.sendStatus(400);
      } else {
        // parse JSON string to JSON object
        const Product_data = JSON.parse(data);
        for (const product of Product_data) {
          if (product["Name"].toLowerCase().includes(targetname)) {
            postlist.push(product);
          }
        }
      }
      res.statusCode = 200;
      res.send(postlist);
    }
  );
});
app.get("/pagebanner", (req, res) => {
  res.sendFile(__dirname + "/Data/Banner/Banner-data/data.json");
});
app.get(
  "/22ee344117e166af83ed6f0147f316267323636c9e648a59b5c880b90e11f588",
  (req, res) => {
    res.sendFile(__dirname + "/AdminUI/HTML/Admin.html");
  }
);
app.get("/product", (req, res) => {
  res.sendFile(__dirname + "/ProductPage/HTML/template.html");
});
app.post(
  "/uploadImage",
  imageUpload.single("image"),
  (req, res) => {
    console.log("save call");
    res.send(req.file);
  },
  (error, req, res, next) => {
    res.status(400).send({ error: error.message });
  }
);
app.get("/Product-metadata", (req, res) => {
  fs.readFile(__dirname + "/Data/", "utf8", (err, data) => {
    if (err) {
      console.log(`Error reading file from disk: ${err}`);
      res.sendStatus(400);
    } else {
      // parse JSON string to JSON object
      const Product = JSON.parse(data);
      res.send(Product);
    }
  });
});
app.get("/UnboxData/:uid", (req, res) => {
  let giftData = req.params.uid;
  let rawdata = fs.readFileSync(__dirname + "/Data/GiftBox/Gift.json");
  let jsonData = JSON.parse(rawdata);
  let metaData = jsonData[giftData];
  console.log(metaData);
  res.send(metaData);
});
app.get("/UnboxGift", (req, res) => {
  res.sendFile(__dirname + "/Unbox/HTML/Unbox.html");
});
app.get("/home", (req, res) => {
  res.sendFile(__dirname + "/Template/HTML/template.html");
});
app.get("/require/:file", (req, res) => {
  let file = req.params.file;
  let filedirect = "/";
  for (let i = 0; i < file.length; i++) {
    if (file[i] == "+") {
      filedirect += "/";
    } else {
      filedirect += file[i];
    }
  }
  console.log("Sending:  " + filedirect);
  try {
    if (fs.existsSync(`./${filedirect}`)) {
      let ext = path.extname(filedirect);
      if (ext == ".js") {
        res.setHeader("content-type", "application/javascript");
      } else if (ext == ".html") {
        res.setHeader("content-type", "text/html");
      } else if (ext == ".css") {
        res.setHeader("content-type", "text/css");
      }
      res.statusCode = 200;
      res.sendFile(__dirname + filedirect);
    }
  } catch (err) {
    res.send({ Status: "ERROR-FILE-NOT-FOUND" });
  }
});
app.get("/account-setup", (req, res) => {
  res.sendFile(__dirname + "/Signup_signin/HTML/index.html");
});
app.post("/upload", (req, res, next) => {
  let jsonData = JSON.parse(req.body.JSON);
  let pack = req.body.Package;
  console.log(pack);
  console.log("Upload requet handling...");
  if (pack == "PRODUCTPOST") {
    console.log(jsonData);
    var configFile = fs.readFileSync("./Data/Post/Product/Product-data.json");
    var config = JSON.parse(configFile);
    config.push(jsonData);
    var configJSON = JSON.stringify(config);
    fs.writeFileSync("./Data/Post/Product/Product-data.json", configJSON);
    return;
  } else if (pack == "CreateInstantAccount") {
    console.log(jsonData);
    var configFile = fs.readFileSync("./Data/Account-instant.json");
    var config = JSON.parse(configFile);
    config.push({
      uuid: jsonData["uuid"],
      SeasionID: [],
      Username: jsonData["Username"],
      Password: jsonData["Password"],
      Cart: [],
    });
    var configJSON = JSON.stringify(config);
    fs.writeFileSync("./Data/Account-instant.json", configJSON);
  } else if (pack == "addLetter") {
    let letter = jsonData
    let configFile = fs.readFileSync("./Data/GiftBox/Gift.json");
    let current = JSON.parse(configFile);
    current[letter.id] = letter[letter.id]
    let configured = JSON.stringify(current)
    fs.writeFileSync("./Data/GiftBox/Gift.json", configured);
    return
  }
  return;
});
function GenerateSeasionID(uuid, Username) {
  return uuid + Username + randomInt(999999999);
}

app.get("/public-info/:ssid", (req, res) => {
  let configFile = fs.readFileSync("./Data/Account-instant.json");
  let current = JSON.parse(configFile);
  for (const index of current) {
    for (const ins of index["SeasionID"]) {
      if (req.params.ssid == ins) {
        res.send({
          Username: index["Username"],
        });
      }
    }
  }
});
app.get("/login", (req, res) => {
  let Username = req.query.un;
  let Password = req.query.pw;
  let configFile = fs.readFileSync("./Data/Account-instant.json");
  let current = JSON.parse(configFile);
  console.log(current);
  for (const key in current) {
    if (Object.hasOwnProperty.call(current, key)) {
      const account = current[key];
      console.log(account);
      let un = account["Username"];
      if (un == Username) {
        let pw = account["Password"];
        if (pw == Password) {
          let seasion = GenerateSeasionID(
            account["uuid"],
            longBinToHex(un)
          ).replaceAll(" ", "");
          current[key]["SeasionID"].push(seasion);
          let configJSON = JSON.stringify(current);
          fs.writeFileSync("./Data/Account-instant.json", configJSON);
          res.send({ Response: "OK", SeasionID: seasion });
          return;
        }
      }
    }
  }
  res.send({ Response: "BAD" });
});
app.get("/product-view", (req, res) => {
  res.sendFile(__dirname + "/Product-focus/HTML/template.html");
});
app.get("/cart", (req, res) => {
  res.sendFile(__dirname + "/cart/HTML/cart.html");
});
app.get("/check-uuid/:uuid", (req, res) => {
  let configFile = fs.readFileSync("./Data/Account-instant.json");
  let current = JSON.parse(configFile);
  console.log(current);
  for (const key in current) {
    if (Object.hasOwnProperty.call(current, key)) {
      const account = current[key];
      console.log(account);
      let uuid = account["uuid"];
      if (uuid == req.params.uuid) {
        res.send({ Response: "BAD" });
      }
    }
  }
  res.send({ Response: "OK" });
});
app.get("/post-data/:id", (req, res) => {
  let reqid = req.params.id;
  let configFile = fs.readFileSync("./Data/Post/Product/Product-data.json");
  for (const post of JSON.parse(configFile)) {
    if (post["id"]) {
      if (post["id"] == reqid) {
        res.send(post);
        return;
      }
    }
  }
});
app.get("/cart-item/:ssid", (req, res) => {
  let ssid = req.params.ssid;
  let configFile = fs.readFileSync("./Data/Account-instant.json");
  let current = JSON.parse(configFile);
  for (const x of current) {
    for (const i of x["SeasionID"]) {
      if (i == ssid) {
        res.send(x["Cart"]);
        return;
      }
    }
  }
  res.send({ Status: 404 });
});
app.get("/remove-from-cart", (req, res) => {
  var url_cli = `http://${serverConf["adress"]}:${serverConf["port"]}${req.url}`;
  const url = new URL(url_cli);
  const id = url.searchParams.get("productid");
  const ssid = url.searchParams.get("ssid");
  let configFile = fs.readFileSync("./Data/Account-instant.json");
  let current = JSON.parse(configFile);
  console.log(current);
  for (const key in current) {
    if (Object.hasOwnProperty.call(current, key)) {
      const account = current[key];
      for (const eles of account["SeasionID"]) {
        if (eles == ssid) {
          for (const i in account["Cart"]) {
            if (Object.hasOwnProperty.call(account["Cart"], i)) {
              let t = account["Cart"][i];
              if (t["id"] == id) {
                console.log(t);
                if(current[key]["Cart"][i]["amount"] > 1){
                  current[key]["Cart"][i]["amount"] -= 1;
                }else{
                  let cur = []
                  for(const sub in current[key]["Cart"]){
                    console.log(current[key]["Cart"][sub])
                    if(current[key]["Cart"][sub]["id"] != id){
                      cur.push(current[key]["Cart"][sub])
                    }
                  }
                  current[key]["Cart"] = cur
                }
                let configJSON = JSON.stringify(current);
                fs.writeFileSync("./Data/Account-instant.json", configJSON);
                if(current[key]["Cart"][i]["amount"]){
                  res.send({ Status: 200, amount: current[key]["Cart"][i]["amount"]});
                }else{
                  res.send({ Status: 200, amount: -1});
                }
                return;
              }
            }
          }
          current[key]["Cart"].push({ id: id, amount: 1 });
          console.log(current);
          let configJSON = JSON.stringify(current);
          fs.writeFileSync("./Data/Account-instant.json", configJSON);
          res.send({ Status: 200 });
          return;
        }
      }
    }
  }
  res.send({ Status: 404 });
});
app.get("/remove-product", (req, res) => {
  var url_cli = `http://${serverConf["adress"]}:${serverConf["port"]}${req.url}`;
  const url = new URL(url_cli);
  const id = url.searchParams.get("id");
  const ssid = url.searchParams.get("ssid");
  let configFile = fs.readFileSync("./Data/Account-instant.json");
  let current = JSON.parse(configFile);
  let accIndex = 0
  console.log("Req to remove by: "+ssid)
  for(const account of current){
    console.log(`Index:  ${accIndex}`)
    console.log(current[accIndex])
    for(let seasion of account["SeasionID"]){
      if(seasion == ssid){
        let sub = []
        for (const prod of current[accIndex]["Cart"]){
          if(prod["id"] != id){
            sub.push(prod)
          }
        }
        console.log("Sub product")
        console.log(sub)
        current[accIndex]["Cart"] = sub
        let configJSON = JSON.stringify(current);
        fs.writeFileSync("./Data/Account-instant.json", configJSON);
        res.send({ Status: 200 });
        return
      }
    }
    accIndex++
  }
  res.send({Status: 404})
  return
})
app.get("/specialthanks", (req, res)=>{
  res.sendFile(__dirname + "/thanks/HTML/cart.html")
})
app.get("/add-to-cart", (req, res) => {
  var url_cli = `http://${serverConf["adress"]}:${serverConf["port"]}${req.url}`;
  const url = new URL(url_cli);
  const id = url.searchParams.get("productid");
  const ssid = url.searchParams.get("ssid");
  let configFile = fs.readFileSync("./Data/Account-instant.json");
  let current = JSON.parse(configFile);
  console.log(current);
  for (const key in current) {
    if (Object.hasOwnProperty.call(current, key)) {
      const account = current[key];
      for (const eles of account["SeasionID"]) {
        if (eles == ssid) {
          for (const i in account["Cart"]) {
            if (Object.hasOwnProperty.call(account["Cart"], i)) {
              let t = account["Cart"][i];
              if (t["id"] == id) {
                console.log(t);
                current[key]["Cart"][i]["amount"] += 1;
                let configJSON = JSON.stringify(current);
                fs.writeFileSync("./Data/Account-instant.json", configJSON);
                res.send({ Status: 200, amount: current[key]["Cart"][i]["amount"]});
                return;
              }
            }
          }
          current[key]["Cart"].push({ id: id, amount: 1 });
          console.log(current);
          let configJSON = JSON.stringify(current);
          fs.writeFileSync("./Data/Account-instant.json", configJSON);
          res.send({ Status: 200 });
          return;
        }
      }
    }
  }
  res.send({ Status: 404 });
});

//-------------------------------------------------------------------------

if (serverConf["adress"] != false) {
  server.listen(serverConf["port"], serverConf["adress"], () => {
    console.log(`
    
    EHEHEHEHE THE DMZ NEVER DIEEEEEEEE
  
    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum
  
    RUNNING ON:  http://${serverConf["adress"]}:${serverConf["port"]} 
    - Admin: http://${serverConf["adress"]}:${serverConf["port"]}/22ee344117e166af83ed6f0147f316267323636c9e648a59b5c880b90e11f588
    
    `);
  });
} else {
  server.listen(serverConf["port"], () => {
    console.log(`
    
    EHEHEHEHE THE DMZ NEVER DIEEEEEEEE
  
    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum
  
    RUNNING ON:  http://localhost:${serverConf["port"]} 
    - Admin: http://localhost:${serverConf["port"]}/22ee344117e166af83ed6f0147f316267323636c9e648a59b5c880b90e11f588
    `);
  });
}
