const store = {}
$ul = document.querySelector(".vegetables")
$greenButton = document.querySelector(".green")

function getVegetables(){
    return fetch("./vegetables.json")
        .then(response => response.json())
        .then(response => {
            store.vegetables = response.vegetables
            console.log(response, response.vegetables, store)
        })
}

async function displayVegetables(vegetables){
    clearVegetables()
    vegetables.forEach(displayVegetable)
}

function displayVegetable(vegetable){
    const $li = document.createElement("li")
    $li.textContent = vegetable.name
    $ul.appendChild($li)
}

function clearVegetables(){
    const $lis = document.querySelectorAll("li")
    $lis.forEach($li => {
        $li.remove()
    })
}

$filter = document.querySelector("#filter")

$filter.addEventListener("input", event => {
    filterTerm = document.querySelector("input").value
    const filteredVegetables = store.vegetables.filter(vegetable => {
        return vegetable.name.includes(filterTerm)
    })
    displayVegetables(filteredVegetables)
})

$greenButton.addEventListener("click", event => {
    const filteredVegetables = store.vegetables.filter(vegetable => {
        return vegetable.color === "Green"
    })
    displayVegetables(filteredVegetables)
})

getVegetables().then(() => {
    displayVegetables(store.vegetables)
})
