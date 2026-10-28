/* ══════════════════════════════════════════════════
   VÍDEO DE LA HOMEPAGE CONTROLADO POR EL SCROLL
   La portada se queda fija y el scroll avanza o retrocede el vídeo.
   Misma idea que la animación del diamante de Nácar: un bucle que
   acerca poco a poco el vídeo al segundo que marca el scroll.
   Solo actúa donde ya se reproduce el vídeo de fondo (escritorio,
   sin movimiento reducido ni ahorro de datos). Para quitarlo: borrar
   este archivo, su <script> y el <div id="heroScrub"> que envuelve el hero.
   ══════════════════════════════════════════════════ */
(function () {
  var video = document.querySelector('.home-bg-video');
  var wrap = document.getElementById('heroScrub');
  if (!video || !wrap) return;

  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var desktop = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  var saveData = navigator.connection && navigator.connection.saveData;
  if (!desktop || reduce || saveData) return;

  /* main.js llama a play() al cargar y al volver a la pestaña: aquí el vídeo
     solo lo mueve el scroll, así que se anula play() y se quita el bucle. */
  video.loop = false;
  video.play = function () { return Promise.resolve(); };

  var duration = 0;
  var target = 0;   // segundo al que lleva el scroll
  var current = 0;  // segundo mostrado (se acerca poco a poco al objetivo)

  function ready() {
    duration = video.duration || 0;
    video.pause();
  }
  video.addEventListener('loadedmetadata', ready);
  if (video.readyState >= 1) ready();
  video.addEventListener('error', function () { wrap.classList.remove('is-active'); });
  var source = video.querySelector('source');
  if (source) source.addEventListener('error', function () { wrap.classList.remove('is-active'); });

  wrap.classList.add('is-active');

  function progress() {
    var top = wrap.getBoundingClientRect().top + window.scrollY;
    var range = wrap.offsetHeight - window.innerHeight;
    if (range <= 0) return 0;
    return Math.min(1, Math.max(0, (window.scrollY - top) / range));
  }

  function frame() {
    if (duration) {
      target = progress() * (duration - 0.05);
      current += (target - current) * 0.18;
      if (Math.abs(video.currentTime - current) > 0.02 && !video.seeking) {
        video.currentTime = current;
      }
    }
    requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
})();
