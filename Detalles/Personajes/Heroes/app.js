// ================= SLIDER =================

// config param
let itemActive = 0;
let items, thumbnails;
let refreshInterval;

// función que selecciona los elementos actualizados y agrega eventos
function initSlider() {
    items = document.querySelectorAll('.slider .list .item');
    thumbnails = document.querySelectorAll('.thumbnail .item');

    if (!items.length || !thumbnails.length) return; // 🔹 seguridad

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
    if (!items.length) return; // 🔹 seguridad

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
    if (!thumbnailActive) return; // 🔹 seguridad
    const rect = thumbnailActive.getBoundingClientRect();
    if (rect.left < 0 || rect.right > window.innerWidth) {
        thumbnailActive.scrollIntoView({ behavior: 'smooth', inline: 'nearest' });
    }
}

// Avanzar al siguiente slide
function nextSlide() {
    if (!items.length) return; // 🔹 seguridad
    itemActive = (itemActive + 1) % items.length;
    showSlider();
}

// Botón "next"
const next = document.getElementById("next");
if (next) {
    next.addEventListener('click', nextSlide);
}

// ================= PERSONAJES =================
const sliderItems = [
    {
        img: "image/card1.png",
        name: "Aelthar, Sabio de las Estrellas",
        name1: "Aelthar",
        desc: "Mago élfico que canaliza la energía cósmica y los secretos del bosque.",
        stats: { fuerza: 45, agilidad: 70, magia: 100 },
        poderes: ["Rayo estelar", "Bendición lunar", "Orbe arcano"],
        imgpng: "imgpng/png1.png"
    },
    {
        img: "image/card2.png",
        name: "Sylwen, Señor de la Fortaleza",
        name1: "Sylwen",
        desc: "Guerrero acorazado que lidera ejércitos y protege el reino con fuerza indomable.",
        stats: { fuerza: 95, agilidad: 65, magia: 10 },
        poderes: ["Espadazo colosal", "Muralla de acero", "Grito de guerra"],
        imgpng: "imgpng/png2.png"
    },
    {
        img: "image/card3.png",
        name: "Tharok, Campeón del Alba",
        name1: "Tharok",
        desc: "Paladín de la luz, portador de una espada sagrada que brilla contra la oscuridad.",
        stats: { fuerza: 85, agilidad: 70, magia: 10 },
        poderes: ["Espada de la luz", "Escudo divino", "Sanación radiante"],
        imgpng: "imgpng/png3.png"
    },
    {
        img: "image/card4.png",
        name: "Eryndor, Guardián del Bosque",
        name1: "Eryndor",
        desc: "Arquero élfico de los árboles, maestro del sigilo y la precisión letal.",
        stats: { fuerza: 65, agilidad: 100, magia: 15 },
        poderes: ["Flecha venenosa", "Salto ágil", "Emboscada silente"],
        imgpng: "imgpng/png4.png"
    },
    {
        img: "image/card5.png",
        name: "Draegor, Señor de la Forja",
        name1: "Draegor",
        desc: "Enano herrero y guerrero, forjador de armas rúnicas que combinan acero y fuego.",
        stats: { fuerza: 90, agilidad: 55, magia: 50 },
        poderes: ["Martillo rúnico", "Forja viviente", "Llamarada de acero"],
        imgpng: "imgpng/png5.png"
    }
];



const thumbnailContainer = document.getElementById("thumbnail-container");

if (thumbnailContainer) {
    sliderItems.forEach((item, index) => {
        const itemWrapper = document.createElement("div");
        itemWrapper.className = "item-wrapper";

        const itemDiv = document.createElement("div");
        itemDiv.className = `item item${index + 1}`;
        itemDiv.id = `item${index + 1}`;

        // Imagen principal
        const img = document.createElement("img");
        img.src = item.img;
        img.alt = item.name;
        itemDiv.appendChild(img);

        // 🔹 Decoración distinta según el personaje
        let decorClass = "";
        if (index === 0) decorClass = "estrella";        // Aelthar, Hoja Estelar
        if (index === 1) decorClass = "luna";            // Sylwen, Cazadora Arcana
        if (index === 2) decorClass = "roble";           // Tharok, Guardián del Bosque
        if (index === 3) decorClass = "hoja-grande";     // Eryndor, Explorador Sombrío
        if (index === 4) decorClass = "runas";           // Draegor, Forjador de Plata

        // Agregar 4 decoraciones (una en cada esquina)
        if (decorClass) {
            for (let i = 0; i < 4; i++) {
                const deco = document.createElement("div");
                deco.className = `${decorClass} pos${i + 1}`;
                itemDiv.appendChild(deco);
            }
        }

        // Título
        const titleDiv = document.createElement("div");
        titleDiv.className = "titulo";
        titleDiv.textContent = item.name1;

        itemWrapper.appendChild(itemDiv);
        itemWrapper.appendChild(titleDiv);
        thumbnailContainer.appendChild(itemWrapper);

        // Click en tarjeta abre modal de Bootstrap
        itemDiv.addEventListener("dblclick", () => {
            const modalTitle = document.getElementById("modalTitle");
            const modalBody = document.getElementById("modalBody");

            if (!modalTitle || !modalBody) return;

            modalTitle.textContent = item.name;
            modalBody.innerHTML = `
    <div class="modal-content-flex">
      <!-- Columna izquierda: título, descripción, stats y poderes -->
      <div class="modal-info">
        <h4>Descripción</h4>
        <p>${item.desc}</p>
        <br>
        <h4>Habilidades</h4>
        <div class="stat">
          <div class="stat-label">Fuerza</div>
          <div class="stat-bar"><div class="stat-fill" data-value="${item.stats.fuerza}"></div></div>
        </div>
        <div class="stat">
          <div class="stat-label">Agilidad</div>
          <div class="stat-bar"><div class="stat-fill" data-value="${item.stats.agilidad}"></div></div>
        </div>
        <div class="stat">
          <div class="stat-label">Magia</div>
          <div class="stat-bar"><div class="stat-fill" data-value="${item.stats.magia}"></div></div>
        </div>
        <br>
        <h4>Poderes</h4>
        <ul>
          ${item.poderes.map(p => `<li>${p}</li>`).join("")}
        </ul>
      </div>

      <!-- Columna derecha: imagen -->
      <div class="modal-image">
        <div class="pngimg">
          <img src="${item.imgpng}" alt="${item.name}">
        </div>
      </div>
    </div>
  `;

            const modalEl = document.getElementById("characterModal");
            if (modalEl) {
                const modal = new bootstrap.Modal(modalEl);
                modal.show();

                // 🔹 Animar barras después de abrir modal
                setTimeout(() => {
                    document.querySelectorAll(".stat-fill").forEach(bar => {
                        const value = bar.getAttribute("data-value");
                        bar.style.width = value + "%";
                    });
                }, 300);
            }
        });
    });
}


// ================= SLIDER PRINCIPAL =================

// ================= SLIDER PRINCIPAL =================

const sliderData = [
    {
        img: "image/1.png",
        title: "Aelthar",
        subtitle: "Hoja Estelar",
        description: "Guerrero élfico de la luz estelar, su espada arde con energía mística capaz de derrotar a cualquier enemigo."
    },
    {
        img: "image/2.png",
        title: "Sylwen",
        subtitle: "Cazadora Arcana",
        description: "Arquera mágica que dispara flechas imbuidas con fuego, hielo y viento, guardiana del equilibrio ancestral."
    },
    {
        img: "image/3.png",
        title: "Tharok",
        subtitle: "Guardián del Bosque",
        description: "Coloso protector con armadura de corteza viva, defensor de los espíritus del bosque y su sagrado silencio."
    },
    {
        img: "image/4.png",
        title: "Eryndor",
        subtitle: "Explorador Sombrío",
        description: "Rápido y sigiloso, maestro del camuflaje y las emboscadas, vigía incansable de las aldeas entre los árboles."
    },
    {
        img: "image/5.png",
        title: "Draegor",
        subtitle: "Forjador de Plata",
        description: "Herrero ancestral que infunde magia en cada arma creada, liberando poder arcano desde las runas de la forja."
    }
];

const sliderList = document.getElementById("slider-list");
if (sliderList) {
    sliderData.forEach((item, index) => {
        const slideItem = document.createElement("div");
        slideItem.className = "item" + (index === 0 ? " active" : "");
        slideItem.innerHTML = `
                <img src="${item.img}" alt="${item.title}">
                <div class="content">
                    <p class="subtitle">${item.subtitle}</p>
                    <h2 class="title">${item.title}</h2>
                    <p class="desc">${item.description}</p>
                </div>
            `;
        sliderList.appendChild(slideItem);
    });
}


// ================= PARTICULAS =================

document.addEventListener('DOMContentLoaded', function () {
    const particlesContainer = document.getElementById("particles");
    if (!particlesContainer) return; // 🔹 seguridad

    function createParticle(type) {
        const particle = document.createElement("div");
        particle.className = type === "fire" ? "fire-particle" : "smoke-particle";

        particle.style.left = Math.random() * window.innerWidth + "px";
        particle.style.top = "100vh";
        particle.style.animationDelay = `${Math.random() * 3}s`;

        particlesContainer.appendChild(particle);

        setTimeout(() => {
            particle.remove();
        }, 8000);
    }

    setInterval(() => {
        createParticle("fire");
        createParticle("smoke");
    }, 150);
});

// ================= INICIAR SLIDER =================

document.addEventListener('DOMContentLoaded', () => {
    initSlider();
});



// ================= ABRIR MODAL =================
// referencia al botón
const btn = document.getElementById("btnAbrirModal");

// inicializar modal de Bootstrap
const myModal = new bootstrap.Modal(document.getElementById("characterModal"));

// abrir modal solo con doble click
btn.addEventListener("dblclick", () => {
    myModal.show();
});