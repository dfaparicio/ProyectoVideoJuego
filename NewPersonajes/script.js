const heroes = [
  'img/Villano1.png',
  'img/Villano4.png',
  'img/Villano3.png',
  'img/Villano2.png',
  'img/Villano5.png',
];

const container = document.getElementById('scene');

container.innerHTML = heroes.map((src, i) => `
  <div class="hero hero${i + 1}">
    <img src="${src}" alt="Hero ${i + 1}">
  </div>
`).join('');
