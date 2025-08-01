const container = document.querySelector(".container")
const sizeX = document.querySelector("#sizeX")
const sizeY = document.querySelector("#sizeY")
const cursorColor = document.querySelector(".color")
const resetBtn = document.querySelector(".btn")

let size = [parseInt(sizeX.value), parseInt(sizeY.value)]
let draw = false

// function populate(size) {
//   container.style.setProperty('--size', size)
//   for (let i = 0; i < size * size; i++) {
//     const div = document.createElement('div')
//     div.classList.add('pixel')

//     div.addEventListener('mouseover', function(){
//         if(!draw) return
//         div.style.backgroundColor = color.value
//     })
//     div.addEventListener('mousdown', function(){
//         div.style.backgroundColor = color.value
//     })

//     container.appendChild(div)
//   }
// }

/**
 * Populate the container with a text area filled with the character "t" at
 * the given size.
 *
 * @param {number[]} size - The size of the text area in terms of rows and
 * columns.
 */
function make_text(size){
    const div = document.createElement("div")
    div.style.caretColor = cursorColor.value
    div.contentEditable = true

    for (let i = 0; i < size[1]; i++) {
        for (let j = 0; j < size[0]; j++) {
            div.innerHTML += "█"
        }
        div.innerHTML += "\n"
    }

    div.className = "pixel"
    container.appendChild(div)

    // TODO: Fix the drawing method.
    container.querySelector("div").addEventListener("keydown", function(event){

        let textarea = container.querySelector("div");
        const selection = window.getSelection();

        if (!textarea) {
            return
        }else if (!selection) {
            return
        };

        let start = selection.anchorOffset;
        let finish = selection.focusOffset;
        const range = document.createRange();

        if (finish < start){
            [start, finish] = [finish, start];
        };

        if (event.key.length === 1 && event.key.match(/^.$/u)) {
            textarea.innerHTML = textarea.innerHTML.substring(0, start) + event.key.repeat(Math.abs(finish - start)) + textarea.innerHTML.substring(finish);

            // Set the cursor position to the desired offset
            range.selectNodeContents(textarea);
            range.collapse(true); // collapse to the start of the range
            range.setEnd(textarea.childNodes[0], finish); // move the end of the range
            range.setStart(textarea.childNodes[0], start); // move the start of the range

            selection.removeAllRanges();
            selection.addRange(range);

            event.preventDefault();
        }
    })
}

document.addEventListener("mouseup", function(){
    draw = false
})


if (cursorColor){
    cursorColor.addEventListener("input", function(){
        container.querySelector("div").style.caretColor = cursorColor.value
    })
}

function reset(){
    container.innerHTML = ''
    make_text(size)
}

resetBtn.addEventListener("click", reset)

sizeX.addEventListener('keyup', function(){
    size[0] = sizeX.value
    reset()
})

sizeY.addEventListener('keyup', function(){
    size[1] = sizeY.value
    reset()
})

make_text(size)
