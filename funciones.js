/* =========================================================
   NEWSLETTER
========================================================= */
function suscribir(e) {
  e.preventDefault();
  const correo = document.getElementById("correo").value.trim();
  const regex  = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

  if (regex.test(correo)) {
    mostrarAlerta();
    e.target.reset();
  } else {
    alert("Por favor escribe un correo válido.");
  }
}

function mostrarAlerta() {
  const alerta = document.getElementById("alerta");
  alerta.classList.add("activo");
  setTimeout(() => alerta.classList.remove("activo"), 4000);
}

/* =========================================================
   ROTACIÓN DE HERO (fade + zoom)
========================================================= */
const slides = [
  {
    img: "https://abscents.com.mx/cdn/shop/files/perfums-fotor-20231220125015_5b4cba10-1091-4840-90a4-26374e3752e3.jpg?v=1703098514&width=5760",
    title: "Essenza Perfumería"
  },
  {
    img: "https://media.glamour.mx/photos/62b9eb31b055c9216ad62282/16:9/w_2560,c_limit/mejores_dupes_de_perfumes.JPG",
    title: "Fragancias que enamoran"
  },
  {
    img: "https://www.portafolio.co/files/article_new_multimedia/uploads/2023/03/31/642720eaae68c.jpeg",
    title: "Siente tu esencia"
  }
];

const hero      = document.getElementById("hero");
const heroTitle = document.getElementById("heroTitle");
let   slideIdx  = 0;

function rotarHero() {
  hero.classList.add("fading-out");

  setTimeout(() => {
    slideIdx = (slideIdx + 1) % slides.length;
    const { img, title } = slides[slideIdx];

    hero.style.backgroundImage = `url('${img}')`;
    heroTitle.textContent      = title;

    hero.classList.remove("fading-out");
    hero.classList.add("fading-in");
    setTimeout(() => hero.classList.remove("fading-in"), 800);
  }, 800);
}

/* =========================================================
   PARALLAX DE PUNTOS BRILLANTES (mouse / touch)
========================================================= */
/*
   - Calcula la posición relativa del cursor (0 → 1)
   - Desplaza suavemente los fondos mediante dos variables CSS:
     --spark-pos1 y --spark-pos2
*/
function moverDestellos(e){
  const x = (e.touches ? e.touches[0].clientX : e.clientX) / window.innerWidth;
  const y = (e.touches ? e.touches[0].clientY : e.clientY) / window.innerHeight;

  // Multiplicadores diferentes para capas delantera y trasera
  const offset1 = `${x * -200}px ${y * 200}px`;
  const offset2 = `${x *  260}px ${y * -260}px`;

  document.body.style.setProperty('--spark-pos1', offset1);
  document.body.style.setProperty('--spark-pos2', offset2);
}

/* =========================================================
   INIT
========================================================= */
window.addEventListener("DOMContentLoaded", () => {
  setInterval(rotarHero, 4000);
  // Parallax para mouse y touch
  window.addEventListener('mousemove', moverDestellos);
  window.addEventListener('touchmove', moverDestellos);
});


document.querySelectorAll('a[href^="#"]').forEach(enlace=>{
  enlace.addEventListener('click', e=>{
    // solo si el ancla existe en la misma página
    const objetivo = document.querySelector(enlace.getAttribute('href'));
    if(objetivo){
      e.preventDefault();
      objetivo.scrollIntoView({behavior:'smooth'});
    }
  });
});



/* =========================================================
   CAMBIO DE LOGO AL HACER CLIC (fade)
========================================================= */
const logo    = document.getElementById('logoToggle');
const img1    = 'img/logo-rosa.png';     // ← ruta logo inicial
const img2    = 'img/logo-oscuro.png';   // ← ruta logo alternativo
let   showing = 1;                       // 1 = rosa, 2 = alternativo

if (logo) {
  logo.addEventListener('click', () => {
    /* 1) activa fade‑out */
    logo.classList.add('fade');

    /* 2) tras 300 ms (coincide con CSS) cambia la imagen y hace fade‑in */
    setTimeout(() => {
      logo.src = (showing === 1) ? img2 : img1;
      showing  = (showing === 1) ? 2 : 1;
      logo.classList.remove('fade');
    }, 300);
  });
}


  const enlaceWhatsApp = "https://chat.whatsapp.com/EHREDxF5ZoU7ggl70O1iYW"; // ← Pega tu enlace real aquí
  const boton = document.getElementById("botonWasap");

  boton.addEventListener("click", function (e) {
    e.preventDefault();
    crearAnimacionPuntos(this);
    setTimeout(() => {
      window.open(enlaceWhatsApp, '_blank');
    }, 2000);
  });

  function crearAnimacionPuntos(boton) {
    const numPuntos = 60;
    const { width, height } = boton.getBoundingClientRect();

    for (let i = 0; i < numPuntos; i++) {
      const punto = document.createElement("span");
      punto.classList.add("punto");

      const borde = Math.random() < 0.5 ? "vertical" : "horizontal";
      if (borde === "vertical") {
        const lado = Math.random() < 0.5 ? 0 : width;
        const y = Math.random() * height;
        punto.style.left = `${lado}px`;
        punto.style.top = `${y}px`;
      } else {
        const x = Math.random() * width;
        const lado = Math.random() < 0.5 ? 0 : height;
        punto.style.left = `${x}px`;
        punto.style.top = `${lado}px`;
      }

      const angulo = Math.random() * 2 * Math.PI;
      const distancia = 80 + Math.random() * 40;
      punto.style.setProperty('--dx', `${Math.cos(angulo) * distancia}px`);
      punto.style.setProperty('--dy', `${Math.sin(angulo) * distancia}px`);

      boton.appendChild(punto);

      punto.addEventListener('animationend', () => punto.remove());
    }
  }
