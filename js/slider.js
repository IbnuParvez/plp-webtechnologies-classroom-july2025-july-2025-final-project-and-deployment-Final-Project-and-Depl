/* Simple accessible slider */
document.addEventListener('DOMContentLoaded', () => {
  const slider = document.getElementById('slider');
  if (!slider) return;

  const slidesEl = slider.querySelector('.slides');
  const slides = Array.from(slidesEl.children);
  const prev = slider.querySelector('.prev');
  const next = slider.querySelector('.next');
  let idx = 0;
  const go = (newIdx) => {
    idx = (newIdx + slides.length) % slides.length;
    slidesEl.style.transform = `translateX(${-idx * 100}%)`;
    slides.forEach((s,i)=> s.classList.toggle('active', i===idx));
  };

  prev.addEventListener('click', ()=> go(idx-1));
  next.addEventListener('click', ()=> go(idx+1));
  // auto-play
  let autoplay = setInterval(()=> go(idx+1), 5000);
  slider.addEventListener('mouseenter', ()=> clearInterval(autoplay));
  slider.addEventListener('mouseleave', ()=> autoplay = setInterval(()=> go(idx+1), 5000));
});
