async function loadPost(){
    let postData = await GetData('', '/Product-metadata')
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