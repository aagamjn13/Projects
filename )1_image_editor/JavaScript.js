let filters = {
    brightness: {
        unit: "%",
        value: 100,
        min: 0,
        max: 200

    },
    contrast: {
        unit: "%",
        value: 100,
        min: 0,
        max: 200
    },
    saturation: {  
        unit: "%",
        value: 100,
        min: 0,
        max: 200
    },
    blur: {
        unit: "px",
        value: 0,
        min: 0,
        max: 20
    },
    hueRotate: {
        unit: "deg",
        value: 0,
        min: 0,
        max: 360
    },
    sepia: {
        unit: "%",
        value: 0,
        min: 0,
        max: 100
    },
    grayscale: {
        unit: "%",
        value: 0,
        min: 0,
        max: 100
    },
    opacity: {
        unit: "%",
        value: 100,
        min: 0,
        max: 100
    },
    invert: {
        unit: "%",
        value: 0,
        min: 0,
        max: 100
    }
}

const filtersContainer = document.querySelector(".filters")
function createFilterElement(name, unit = "%", value, min, max){
    const div = document.createElement("div")
    div.classList.add("filter")
    
    const input = document.createElement("input")
    input.type = "range"
    input.min = min
    input.max = max
    input.value = value
    input.id = name

    const p = document.createElement("p")
    p.innerText = name
    div.appendChild(p)
    div.appendChild(input)

    input.addEventListener("input", (e) => {
        filters[name].value = input.value
        applyFilters()
    })

    return div 
}

function createFilters(){
    Object.keys(filters).forEach(key => {
    // console.log(key)
    // console.log(filters[key])
    // console.log(filters["brightness"])
    // console.log(key,filters[key]);
   const filterElement = createFilterElement(key, filters[key].unit, filters[key].value, filters[key].min, filters[key].max)
   filtersContainer.appendChild(filterElement)   
})
}
createFilters()


const imageCanvas = document.querySelector("#image-canvas")
const imageInput = document.querySelector("#imageInput")
const CanvasCtx = imageCanvas.getContext("2d") // Context of the canvas
let file = null
let image = null

imageInput.addEventListener("change", (e) => {
    file = e.target.files[0]
    imageCanvas.style.display = "block" 
    const placeholder = document.querySelector(".placeholder")
    placeholder.style.display = "none"
    const img = new Image()
    img.src = URL.createObjectURL(file)

    img.onload = () => {  //ratio fixed using gpt 
    image = img
    const container = document.querySelector(".bottom")
    const containerWidth = container.clientWidth
    const containerHeight = container.clientHeight

    // Image aspect ratio
    const imgRatio = img.width/img.height
    const containerRatio = containerWidth/containerHeight
    let drawWidth, drawHeight
    if (imgRatio > containerRatio) {
        drawWidth = containerWidth
        drawHeight = containerWidth / imgRatio
    } else {
        drawHeight = containerHeight
        drawWidth = containerHeight * imgRatio
    }
    // Set canvas internal resolution
    imageCanvas.width = drawWidth
    imageCanvas.height = drawHeight
    // Clear & draw
    CanvasCtx.clearRect(0, 0, drawWidth, drawHeight)
    CanvasCtx.drawImage(img, 0, 0, drawWidth, drawHeight)
}
})


function applyFilters(){
    CanvasCtx.clearRect(0, 0, imageCanvas.width, imageCanvas.height) 
    CanvasCtx.filter = `
    brightness(${filters.brightness.value}${filters.brightness.unit})
    contrast(${filters.contrast.value}${filters.contrast.unit})
    saturate(${filters.saturation.value}${filters.saturation.unit})
    blur(${filters.blur.value}${filters.blur.unit})
    hue-rotate(${filters.hueRotate.value}${filters.hueRotate.unit})
    sepia(${filters.sepia.value}${filters.sepia.unit})
    grayscale(${filters.grayscale.value}${filters.grayscale.unit})
    opacity(${filters.opacity.value}${filters.opacity.unit})
    invert(${filters.invert.value}${filters.invert.unit})
    `

    CanvasCtx.drawImage(image, 0, 0, imageCanvas.width, imageCanvas.height) 
}

const resetButton = document.querySelector("#box2")
resetButton.addEventListener("click", () => {
     filters = {
    brightness: {
        unit: "%",
        value: 100,
        min: 0,
        max: 200

    },
    contrast: {
        unit: "%",
        value: 100,
        min: 0,
        max: 200
    },
    saturation: {  
        unit: "%",
        value: 100,
        min: 0,
        max: 200
    },
    blur: {
        unit: "px",
        value: 0,
        min: 0,
        max: 20
    },
    hueRotate: {
        unit: "deg",
        value: 0,
        min: 0,
        max: 360
    },
    sepia: {
        unit: "%",
        value: 0,
        min: 0,
        max: 100
    },
    grayscale: {
        unit: "%",
        value: 0,
        min: 0,
        max: 100
    },
    opacity: {
        unit: "%",
        value: 100,
        min: 0,
        max: 100
    },
    invert: {
        unit: "%",
        value: 0,
        min: 0,
        max: 100
    }
}
    applyFilters()
    filtersContainer.innerHTML = ""
    createFilters()
})

const downloadbtn = document.querySelector("#box3")

downloadbtn.addEventListener("click", () => {
    const link = document.createElement("a")
    link.download = "image.jpg"
    link.href = imageCanvas.toDataURL()
    link.click()
})

const presets = {
    drama: {
        brightness: 105,
        contrast: 140,
        saturation: 130,
        blur: 0,
        hueRotate: 0,
        sepia: 0,
        grayscale: 0,
        opacity: 100,
        invert: 0
    },

    vintage: {
        brightness: 110,
        contrast: 90,
        saturation: 80,
        blur: 0,
        hueRotate: 10,
        sepia: 35,
        grayscale: 10,
        opacity: 100,
        invert: 0
    },

    oldSchool: {
        brightness: 115,
        contrast: 95,
        saturation: 70,
        blur: 1,
        hueRotate: 5,
        sepia: 50,
        grayscale: 20,
        opacity: 100,
        invert: 0
    },

    cyberpunk: {
        brightness: 100,
        contrast: 160,
        saturation: 160,
        blur: 0,
        hueRotate: 200,
        sepia: 0,
        grayscale: 0,
        opacity: 100,
        invert: 0
    },

    softGlow: {
        brightness: 115,
        contrast: 90,
        saturation: 105,
        blur: 2,
        hueRotate: 0,
        sepia: 0,
        grayscale: 0,
        opacity: 100,
        invert: 0
    },

    noir: {
        brightness: 90,
        contrast: 170,
        saturation: 0,
        blur: 0,
        hueRotate: 0,
        sepia: 0,
        grayscale: 100,
        opacity: 100,
        invert: 0
    },

    warmSunset: {
        brightness: 115,
        contrast: 110,
        saturation: 130,
        blur: 0,
        hueRotate: 20,
        sepia: 25,
        grayscale: 0,
        opacity: 100,
        invert: 0
    },

    coolTone: {
        brightness: 100,
        contrast: 110,
        saturation: 90,
        blur: 0,
        hueRotate: 190,
        sepia: 0,
        grayscale: 0,
        opacity: 100,
        invert: 0
    },

    faded: {
        brightness: 120,
        contrast: 80,
        saturation: 70,
        blur: 0,
        hueRotate: 0,
        sepia: 10,
        grayscale: 5,
        opacity: 100,
        invert: 0
    },

    retroPop: {
        brightness: 110,
        contrast: 130,
        saturation: 150,
        blur: 0,
        hueRotate: 330,
        sepia: 10,
        grayscale: 0,
        opacity: 100,
        invert: 0
    }
}

const presetContainer = document.querySelector(".presets")

Object.keys(presets).forEach(presetName => {
    const button = document.createElement("button")
    button.classList.add("preset")
    button.innerText = presetName
    button.addEventListener("click", () => {
        Object.keys(presets[presetName]).forEach(filter => {
            filters[filter].value = presets[presetName][filter]
        })
        applyFilters()
        filtersContainer.innerHTML = ""
        createFilters()
    })
    presetContainer.appendChild(button)
})
