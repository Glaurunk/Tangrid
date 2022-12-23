function DetectDisplay()
{
    console.log(window.innerWidth);
    console.log(window.innerHeight);
    if (window.innerWidth < 1280 || window.innerHeight < 900) {
        console.log('Inside');
        const cont = document.querySelector('.container');
        cont.innerHTML = "";
        const msg = document.createElement('DIV');
        msg.classList.add("small-window-msg");
        msg.innerHTML = "The window of your browser is too small. This game requires a window of minimum 1280 X 900 pixels. Please try loading this page in a desktop browser";
        cont.appendChild(msg);
    }
}

//DetectDisplay();
DrawGrid();