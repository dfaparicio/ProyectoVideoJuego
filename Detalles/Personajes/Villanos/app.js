// config param
let itemActive = 0;
let items, thumbnails;
let refreshInterval;

// función que selecciona los elementos actualizados y agrega eventos
function initSlider() {
    items = document.querySelectorAll('.slider .list .item');
    thumbnails = document.querySelectorAll('.thumbnail .item');

    // Agregar eventos a thumbnails
    thumbnails.forEach((thumbnail, index) => {
        thumbnail.addEventListener('click', () => {
            itemActive = index;
            showSlider();
        });
    });

    // Iniciar auto slider
    refreshInterval = setInterval(() => {
        nextSlide();
    }, 5000);
}

// Mostrar el slide activo
function showSlider() {
    // eliminar el item activo anterior
    const itemActiveOld = document.querySelector('.slider .list .item.active');
    const thumbnailActiveOld = document.querySelector('.thumbnail .item.active');
    if (itemActiveOld) itemActiveOld.classList.remove('active');
    if (thumbnailActiveOld) thumbnailActiveOld.classList.remove('active');

    // activar el nuevo item
    items[itemActive].classList.add('active');
    thumbnails[itemActive].classList.add('active');

    setPositionThumbnail();

    // resetear el intervalo
    clearInterval(refreshInterval);
    refreshInterval = setInterval(() => {
        nextSlide();
    }, 5000);
}

// Desplazar al thumbnail si está fuera de la vista
function setPositionThumbnail() {
    const thumbnailActive = document.querySelector('.thumbnail .item.active');
    const rect = thumbnailActive.getBoundingClientRect();
    if (rect.left < 0 || rect.right > window.innerWidth) {
        thumbnailActive.scrollIntoView({ behavior: 'smooth', inline: 'nearest' });
    }
}

// Avanzar al siguiente slide
function nextSlide() {
    itemActive = (itemActive + 1) % items.length;
    showSlider();
}

// Botón "next"
const next = document.getElementById("next");
if (next) {
    next.addEventListener('click', nextSlide);
}

// 🔁 IMPORTANTE: Llama a `initSlider()` DESPUÉS de generar el HTML dinámicamente
// Ejemplo:
document.addEventListener('DOMContentLoaded', () => {
    // Espera a que el HTML dinámico haya sido generado
    // Entonces inicia el slider
    initSlider();
});



// Datos de las imágenes y nombres
    const sliderItems = [
        { img: "image/card1.png", name: "Elven Warrior" },
        { img: "image/card2.png", name: "Mystic Archer" },
        { img: "image/card3.png", name: "Forest Guardian" },
        { img: "image/card4.png", name: "Tree Village Scout" },
        { img: "image/card5.png", name: "Silver Blade" }
    ];

    // Contenedor donde se insertarán los elementos
    const container = document.getElementById("thumbnail-container");

    // Generar HTML dinámicamente
    sliderItems.forEach((item, index) => {
        const itemDiv = document.createElement("div");
        itemDiv.className = "item" + (index === 0 ? " active" : ""); // solo el primero tiene "active"

        itemDiv.innerHTML = `
            <img src="${item.img}" alt="${item.name}">
            <div class="content">${item.name}</div>
        `;

        container.appendChild(itemDiv);
    });

    // Datos de los sliders
    const sliderData = [
        {
            img: "image/1.png",
            title: "Slider 01",
            subtitle: "design",
            description: "An elven ranger leaps through the forest canopy with unmatched grace, her bow ready to defend her homeland."
        },
        {
            img: "image/2.png",
            title: "Slider 02",
            subtitle: "magic",
            description: "A mystical mage harnesses ancient spells under glowing tree lanterns in the heart of the elven village."
        },
        {
            img: "image/3.png",
            title: "Slider 03",
            subtitle: "adventure",
            description: "Brave elven scouts explore the high branches of their treetop realm, ever watchful for threats from below."
        },
        {
            img: "image/4.png",
            title: "Slider 04",
            subtitle: "guardian",
            description: "The guardian of the forest stands tall, cloaked in sunlight and leaves, protector of all nature’s secrets."
        },
        {
            img: "image/5.png",
            title: "Slider 05",
            subtitle: "legend",
            description: "Legends speak of a silver-haired warrior who once united the clans of the great forest under one banner."
        }
    ];

    // Seleccionar el contenedor donde irán los slides
    const sliderList = document.getElementById("slider-list");

    // Insertar dinámicamente los items
    sliderData.forEach((item, index) => {
        const slideItem = document.createElement("div");
        slideItem.className = "item" + (index === 0 ? " active" : "");

        slideItem.innerHTML = `
            <img src="${item.img}" alt="${item.title}">
            <div class="content">
                <p>${item.subtitle}</p>
                <h2>${item.title}</h2>
                <p>${item.description}</p>
            </div>
        `;

        sliderList.appendChild(slideItem);
    });
