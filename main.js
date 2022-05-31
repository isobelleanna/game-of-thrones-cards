import charactersArr from "./data/data.js";

const characterContainer = document.querySelector(".character-container");
const searchInput =document.getElementById("search");
const checkboxes = document.querySelectorAll(".nav__checkbox");
const checkedArray = [];

const createCards = (array) => {
    const characterHTML = array.map(characterObj => {
        return (
        `<div class="character-card">
        <h1 class="character-card__name">${characterObj.firstName} ${characterObj.lastName}</h1>
        <img class="character-card__img" src="${characterObj.imageUrl}" alt="Image of ${characterObj.firstName}" />
        <h2 class="character-card__title">${characterObj.title}</h2>
        <h3 class="character-card__family">${characterObj.family}</h3>
        </div>`)}).join("")
    return characterHTML
}

const getSearchInput = (event) => {
    return event.target.value;
}

const filterBySearch = (event) => {
    const searchTerm = getSearchInput(event)
    const filteredArr = charactersArr.filter((character) => {
        return character.fullName.toLowerCase().includes(searchTerm.toLowerCase())
        || character.title.toLowerCase().includes(searchTerm.toLowerCase())
        || character.family.toLowerCase().includes(searchTerm.toLowerCase())
    })
    characterContainer.innerHTML = createCards(filteredArr)
}

const addToCheckboxArr = (event) => {
    if(!checkedArray.includes(event.target.id)) {
        checkedArray.push(event.target.id)
    }else if (checkedArray.includes(event.target.id)) {
        const index = checkedArray.indexOf(event.target.id)
        checkedArray.splice(index, 1)
    }
}

const filterByCheckbox = (event) => {
    addToCheckboxArr(event)
    const filterArrayByCheckbox = getFilteredArray(charactersArr, checkedArray)
    if(checkedArray.length < 1) {
        characterContainer.innerHTML = createCards(charactersArr)
    }else {
        characterContainer.innerHTML = createCards(filterArrayByCheckbox)
    }
    
}

const getFilteredArray = (array, checkArray) => {
    const filterArrayByCheckbox = charactersArr.filter((character) => {
        return (
            character.family.toLowerCase().includes(checkArray)
            ) 
    })
    return filterArrayByCheckbox;
}
characterContainer.innerHTML = createCards(charactersArr);
searchInput.addEventListener('input', filterBySearch);
checkboxes.forEach(checkbox => checkbox.addEventListener("change", filterByCheckbox));