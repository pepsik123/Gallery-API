async function getImage(url) {
    let data = await fetch(url);
    let json = await data.json();
    console.log(json);
    renderAll(json)
}
getImage('https://pixabay.com/api/?key=30143529-1495ff6bb7852cd7b2d1e48fe&category=travel&per_page=20');
let category = document.querySelector('.form-select');
let allImages = document.querySelector('.all_images');
let bigImage = document.querySelector('.bigImage');
category.addEventListener('change', changeCategory)
function changeCategory(event) {
    console.log(event);
    allImages.innerHTML = '';
    bigImage.innerHTML = '';
    index = 0;
    getImage(`https://pixabay.com/api/?key=30143529-1495ff6bb7852cd7b2d1e48fe&category=${event.target.value.toLowerCase()}&per_page=20`);

}


function renderImage(img, id, isBig = false ) {
    if (isBig) {
        return `<div class = 'big'>
    <div>
        <span class="prev">&#8592;</span>
    </div>
    <img data-id=${id} src = ${img}>
    <div>
         <span class="next">&#8594;</span>
    </div>
     </div>`
    }
    else {
        return `<div class = 'image'><img data-id=${id} src = ${img}></div>`
    }
}

function renderAll(data) {

    allImages.addEventListener('click', changeIcon);
    bigImage.insertAdjacentHTML('afterbegin', renderImage(data.hits[0].largeImageURL, 0,true));

    data.hits.map((el, i) => {
        return allImages.insertAdjacentHTML('beforeend', renderImage(el.largeImageURL, i))
    });
    let prev = document.querySelector('.prev');
    let next = document.querySelector('.next');
    prev.addEventListener('click', (event) => prevImage(event, data.hits));
    next.addEventListener('click', (event) => nextImage(event, data.hits));

}
let index = 0;

function nextImage (event, data) {
    let big = document.querySelector('.big img');
    if (index === data.length) {
        big.src = data[0].largeImageURL;
        index = 0;
    }
    else {
        index++;
        big.src = data[index].largeImageURL;

    }
}

function prevImage(event, data) {
    console.log(data.length - 1)
    let big = document.querySelector('.big img');
    if (index === 0) {
        big.src = data[data.length - 1].largeImageURL;
        index = data.length - 1;
    }
    else {
        index--;
        big.src = data[index].largeImageURL;

    }
}

function changeIcon (event) {
    console.log(event.path[0].currentSrc);
    if (event.path[0].currentSrc) {
        let big = document.querySelector('.big img');
        big.src = event.path[0].currentSrc;
        index = event.target.dataset.id;

        console.log(event.target.dataset.id)
    }

}


