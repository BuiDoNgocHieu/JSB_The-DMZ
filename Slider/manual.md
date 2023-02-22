
var imgClass = document.getElementById("TestSlider");
var ImgContain = imgClass.getElementsByClassName("item")[0];
console.log(ImgContain);
var imgBlockStore = {
  Name: "testSlide",
  index: 0, //image current
  duration: 5000,//Time per image
  Block: [
    {
      url: "imgUrl",
      cap: "info",
    },
    {
      url: "imgUrl",
      cap: "info",
    },
    //<>more and more<>
  ],
};
loadImageBlock(ImgContain, imgBlockStore); //Start a process
---------------------------Above is setup code example


|-=---------------------------------------------------=-|
|                                                       |
|   \\\\\\\\\\\\\\\\\\\\\/////////////////////////////  |
|  //////////////////////\\\\\\\\\\\\\\\\\\\\\\\\\\\\\  |
| ///////////////CREATED BY ZEAKY\\\\\\\\\\\\\\\\\\\\\\ |
| \\\\\\\\\\\\\\\\\\\\\\\////////////////////////////// |
|  //////////////////////\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ |
|             |TextArtGen.zeakydev.com|                 |
|-=---------------------------------------------------=-|