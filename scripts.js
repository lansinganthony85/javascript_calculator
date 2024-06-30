const button = document.querySelectorAll(".sm-button");

button.forEach(element => {
    let backgroundColor = element.style.backgroundColor;
    element.addEventListener("mousedown", () => {
        element.style.backgroundColor = "red";
    });
    element.addEventListener("mouseup", () => {
        element.style.backgroundColor = backgroundColor;
    })
});