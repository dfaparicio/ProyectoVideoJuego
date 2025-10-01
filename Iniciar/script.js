//////////////////////// ELEMENTOS DOM ////////////////////////
const introContainer = document.getElementById('intro-container');
const introVideo = document.getElementById('intro-video');
const skipText = document.getElementById('skip-text');
const portada = document.querySelector('.Portada');
const bgMusic = document.getElementById('bg-music');
const usernameInput = document.getElementById('username');
const warningText = document.getElementById('warning-text');
const acceptBtn = document.getElementById('accept-btn');
const diceBtn = document.getElementById('dice-btn');
const introlore = document.querySelector('.intro-lore');


let playerName = "";

//////////////////////// CLICK ACEPTAR ////////////////////////
acceptBtn.addEventListener('click', () => {
    playerName = usernameInput.value.trim();

    if (playerName === "") {
        warningText.style.display = 'block';
        return;
    } else {
        warningText.style.display = 'none';
    }

    usernameInput.style.display = 'none';
    acceptBtn.style.display = 'none';
    diceBtn.style.display = 'none';
    introlore.style.display = 'none';


    // Mostrar alerta de bienvenida
    Swal.fire({
        title: `¡Bienvenido, ${playerName}!`,
        text: 'Tu viaje en Eternal Realms está por comenzar...',
        imageUrl: 'img/Bienvenido.gif',
        imageWidth: 250,
        background: 'none',
        color: '#e7d9c4',
        showConfirmButton: false, 
        timer: 5200,              
        timerProgressBar: true    
    }).then(() => {
        introVideo.style.opacity = '1';
        introVideo.style.pointerEvents = 'auto';
        skipText.style.display = 'block';
        introVideo.play();

        const contenedor = document.getElementById("Informacion");
        contenedor.innerHTML = `
      <div id="Logo"><img src="img/Logo.png" alt="Logo"></div>
      <div id="Opciones" aria-label="Menú">
        <button type="button" class="EditOpciones">INICIAR NUEVA PARTIDA</button>
        <button type="button" class="EditOpciones">PERFIL 🛡️ ${playerName}</button>
        <button type="button" class="EditOpciones">OPCIONES</button>
        <button type="button" class="EditOpciones">INVENTARIO</button>
      </div>
    `;
    });

});



//////////////////////// SKIP INTRO////////////////////////
skipText.addEventListener('click', () => {
    introVideo.pause();
    showPortada();
});

//////////////////////// TERMINO INTRO ////////////////////////
introVideo.addEventListener('ended', () => {
    showPortada();
});

function showPortada() {
    introContainer.style.display = 'none';
    portada.style.display = 'flex';

    bgMusic.play().catch(() => {
        console.log("El navegador requiere interacción para iniciar la música.");
    });

    console.log("Jugador:", playerName);
}





//////////////////////// ID ALEATORIO ////////////////////////
const posiblesNombres = ["Guerrero", "Orco", "Paladín", "Mago", "Elfo", "Dragón", "Sombrío", "Caballero"];

diceBtn.addEventListener('click', () => {

    const randomBase = posiblesNombres[Math.floor(Math.random() * posiblesNombres.length)];
    const randomNum = Math.floor(Math.random() * 1000);
    usernameInput.value = `${randomBase}#${randomNum}`;

    diceBtn.classList.add('roll');
    setTimeout(() => diceBtn.classList.remove('roll'), 600); // quitar después de la animación
});

