console.log('%c HI', 'color: firebrick')
const imgUrl = "https://dog.ceo/api/breeds/image/random/4";
const breedUrl = 'https://dog.ceo/api/breeds/list/all'
let list = document.querySelectorAll('ul#dog-breeds li');
let dropdownOptions = document.getElementById("breed-dropdown").children;


function fetchImages() {
    return fetch(imgUrl)
        .then(resp => resp.json())
        .then(json => renderDogImages(json))
};

function fetchBreeds() {
    return fetch(breedUrl)
        .then(resp => resp.json())
        .then(json => renderAllDogBreeds(json))
}



function renderDogImages(json) {
    const dogContainer = document.getElementById("dog-image-container");
    json["message"].forEach(function(image){
        const img = document.createElement('img');
        img.src = image;
        img.style.width = "200px";
        img.style.height = "200px"
        dogContainer.appendChild(img);
    })
}

let breedsList;


function renderAllDogBreeds(json) {
    breedsList = document.getElementById('dog-breeds');
    let dogBreeds = Object.keys(json["message"]);
    dogBreeds.forEach(function(breed) {
        let dogBreed = document.createElement('li');
        dogBreed.innerText = breed;
        toggleColor(dogBreed)
        breedsList.appendChild(dogBreed); 
        if (json["message"][breed].length > 0) {
            json["message"][breed].forEach(function(subBreed) {
                let ul = document.createElement('ul')
                let sub = document.createElement('li');
                sub.innerText = subBreed;
                ul.appendChild(sub);
                dogBreed.appendChild(ul);
            })
        }
    })
}

dropdownOptions.addEventListener('change', function(event){
    sortByLetter(event.target.value);
})

funciton sortByLetter(letter) {
    breedsList = document.getElementById('dog-breeds');
    let dogBreeds = Object.keys(json["message"]);
    return dogBreeds.filter(function(breed){
        return breed[0] === letter;
    })
}

function toggleColor(dogBreed) {
    dogBreed.addEventListener('click', function(event){
        if (event.target.style.color === 'black') {
            event.target.style.color = "red";
        } else {
            event.target.style.color = 'black'
        }
    })
}





document.addEventListener("DOMContentLoaded", function() {
    fetchImages();
    fetchBreeds();
})