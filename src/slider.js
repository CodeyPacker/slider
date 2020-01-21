function Slider(slider) {
  if (!(slider instanceof Element)) { // if an element isn't passed in
    throw new Error('No slider passed in');
  }

  let prev;
  let current;
  let next;
  // select elements needed for the slider
  const slides = slider.querySelector('.slides');
  const prevButton = slider.querySelector('.goToPrev');
  const nextButton = slider.querySelector('.goToNext');

  function startSlider() {
    current = slider.querySelector('.current') || slides.firstElementChild;
    prev = current.previousElementSibling || slides.lastElementChild;
    next = current.nextElementSibling || slides.firstElementChild;
  }

  function applyClasses() {
    current.classList.add('current');
    prev.classList.add('prev');
    next.classList.add('next');
  }

  function move(direction) {
    // first strip all the classes off the current slides
    const classesToRemove = ['prev', 'current', 'next'];
    prev.classList.remove(...classesToRemove)
    current.classList.remove(...classesToRemove)
    next.classList.remove(...classesToRemove)
    // OR be a hotshot and do it in one line
    // [prev, current, next].forEach(el => el.classList.remove(...classesToRemove));

    // use destructuring to easily shift them around
    if (direction === 'back') {
      [prev, current, next] = [
        // get the prev slide, if there is none, get hte last slide
        // from the entire slider for wrapping
        prev.previousElementSibling || slides.lastElementChild,
        prev,
        current
      ];
    } else {
      [prev, current, next] = [
        current,
        next,
        next.nextElementSibling || slides.firstElementChild,
      ];
    }

    // now that the elements have been updated, reapply classes
    applyClasses();
  }

  // when this slider is created, run the start slider function
  startSlider();
  applyClasses();

  // Event listeners
  prevButton.addEventListener('click', () => move('back'));
  nextButton.addEventListener('click', move);
}

const mySlider = Slider(document.querySelector('.slider'));
const dogSlider = Slider(document.querySelector('.dog-slider'));