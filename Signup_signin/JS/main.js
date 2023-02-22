var state = 0
function elementAdd(html, parent) {
    const placeholder = document.createElement("div");
    placeholder.insertAdjacentHTML("afterbegin", html);
    const node = placeholder.firstElementChild;
    parent.appendChild(node);
}
function ToggleSign(){
    document.getElementsByClassName("Logo")[0].classList.toggle("Logo-left")
    document.getElementsByClassName("Logo")[0].classList.toggle("Logo-right")
    document.getElementsByClassName("Logo")[0].children[0].classList.toggle("logoImg-left")
    document.getElementsByClassName("Logo")[0].children[0].classList.toggle("logoImg-right")
    document.getElementsByClassName("halfBackground")[0].classList.toggle("halfBackground-left")
    document.getElementsByClassName("halfBackground")[0].classList.toggle("halfBackground-right")
    document.getElementsByClassName("circle")[0].classList.toggle("circle-left")
    document.getElementsByClassName("circle")[0].classList.toggle("circle-right")
    if(state == 0){
        document.getElementById("TitlePage").innerHTML = "Sign up"
        document.getElementById("HBTITLE").innerHTML = "Sign up"
        document.getElementsByClassName("ForgotPassword")[0].children[0].innerHTML = "​​​​​"
        document.getElementsByClassName("SigninButton")[0].children[0].innerHTML = "Sign up"
        document.getElementsByClassName("SignUp")[0].innerHTML = ""
        elementAdd(`
        <i>
            Already have an account? <u onclick="ToggleSign()" id="CreateAccount">Sign in here!</u>
        </i>
        `, document.getElementsByClassName("SignUp")[0])
    }else{
        document.getElementById("TitlePage").innerHTML = "Sign in"
        document.getElementById("HBTITLE").innerHTML = "Sign in"
        document.getElementsByClassName("ForgotPassword")[0].children[0].innerHTML = "Forgot Password?"
        document.getElementsByClassName("SigninButton")[0].children[0].innerHTML = "Sign in"
        document.getElementsByClassName("SignUp")[0].innerHTML = ""
        elementAdd(`
        <i>
            Already have an account? <u onclick="ToggleSign()" id="CreateAccount">Create one here!</u>
        </i>
        `,  document.getElementsByClassName("SignUp")[0])
    }
    console.log(state)
    state++
    if(state > 1){
        state = 0 
    }
}
function uuidv4() {
    return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
      (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    );
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
        if(res.status == 200){
            return Promise.resolve(true)
        }
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
async function AccountForm(){
    if(document.getElementById("Username").value && document.getElementById("Password").value){
        if(state == 1){
            let uuid;
            while (true) {
                let uuidUse = uuidv4()
                let res = await GetData("","/check-uuid/"+uuidUse)
                if (res["Response"] == "OK"){
                    uuid = uuidUse
                    break
                }        
            }
            let form = {
                "uuid"    : uuid,
                "Username": document.getElementById("Username").value,
                "Password": document.getElementById("Password").value
            }
            let res = await UploadData("","/upload", form, "CreateInstantAccount")
            window.open("/account-setup", "_self")
        }else{
            let form = {
                "Username": document.getElementById("Username").value,
                "Password": document.getElementById("Password").value
            }
            let res = await GetData("", `/login?un=${form["Username"]}&pw=${form["Password"]}`)
            if(res["Response"] == "OK"){
                console.log(res)
                localStorage.setItem("seasion", res["SeasionID"])
                window.open("/home", "_self")
            }else{
                alert("Wrong username or password, please try again")
            }
            
        }
    }else{
        alert("Enter username and password first!")
    }   
}
window.onload = ()=>{
    if(localStorage["seasion"]){
        window.open("/home", "_self")
    }
}