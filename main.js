const container = document.querySelector(".container")
const sizeX = document.querySelector("#sizeX")
const sizeY = document.querySelector("#sizeY")
const color = document.querySelector(".color")
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
    const div = document.createElement("textarea")
    for (let i = 0; i < size[1]; i++) {
        for (let j = 0; j < size[0]; j++) {
            div.value += "t"
        }
        div.value += "\n"
    }
    div.className = "pixel"
    container.appendChild(div)

    
    // TODO: Fix the drawing method.
    container.querySelector("textarea").addEventListener("keydown", function(event){

        let textarea = container.querySelector("textarea");

        if (textarea) {
            const start = textarea.selectionStart;
            const finish = textarea.selectionEnd;
        
            if (start !== undefined && finish !== undefined) {
                const sel = textarea.value.substring(start, finish);
        
                textarea.value = textarea.value.substring(0, start) + event.key.repeat(sel.length) + textarea.value.substring(finish);
                event.preventDefault();
            }
        }
    })

}

document.addEventListener("mouseup", function(){
    draw = false
})


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
