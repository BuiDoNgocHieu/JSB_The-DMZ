window.onload = function(){
  let allElementSizeToPage = document.getElementsByClassName("scaletofull-js")
  for (const inter of allElementSizeToPage) {
    inter.style.width = `${window.innerWidth}px`
    if(inter.getAttribute("height-scale")){
      if(inter.getAttribute("height-scale") == "true"){
        inter.style.height = `${window.innerHeight*Number(inter.getAttribute("scaleRangeY"))}px`

      }
    }
  }
  document.getElementById("stage1").scrollIntoView()

}
window.onresize = ()=>{
  let allElementSizeToPage = document.getElementsByClassName("scaletofull-js")
  for (const inter of allElementSizeToPage) {
    if(window.innerWidth > 1600-500){
      inter.style.width = `${window.innerWidth*Number(inter.getAttribute("scaleRange"))}px`
    }
  }
  let element = document.getElementById("stage"+current) 
    element.classList.remove("hide")
    element.classList.add("display")
    element.scrollIntoView()
}
var current = 1

function changeStage(){
  if(current < 5){
    current ++
    let element = document.getElementById("stage"+current) 
    element.classList.remove("hide")
    element.classList.add("display")
    element.scrollIntoView()
    setTimeout(()=>{
      document.getElementById("stage"+String(current-1)).classList.remove("display")
      document.getElementById("stage"+String(current-1)).classList.add("hide")
      },1000
    )
    
  }
}
function goshopping(){
  window.open('/home','_self')
}
function scrollToElement(element){
  var DistanceToTop = element.getBoundingClientRect().bottom
  window.scrollTo(DistanceToTop,1000)
}