var listLoad = [
    `<script type='text/javascript' src="require/Template+JS+postloader.js"></script>`,
    `<script type='text/javascript' src="require/Template+JS+AdvanceRender.js"></script>`,
    `<script type='text/javascript' src="require/Template+JS+template.js"></script>`,
    `<script type='text/javascript' src="https://kit.fontawesome.com/9c3c828c74.js" crossorigin="anonymous"></script>`,
    `<script type='text/javascript' src="require/Slider+zeakSlide.js"></script>`
]
function elementAdd(html, parent) {
    const placeholder = document.createElement("div");
    placeholder.insertAdjacentHTML("afterbegin", html);
    const node = placeholder.firstElementChild;
    parent.appendChild(node);
}
listLoad.forEach(element => {
    elementAdd(element, document.body)
});
