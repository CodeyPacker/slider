function Slider(slider) {
  if (!(slider instanceof Element)) { // if an element isn't passed in
    throw new Error('No slider passed in');
  }

  // select elements needed for the slider
  this.slides = slider.querySelector('.slides');
  this.slider = slider;
  const prevButton = slider.querySelector('.goToPrev');
  const nextButton = slider.querySelector('.goToNext');

  // when this slider is created, run the start slider function
  this.startSlider();
  this.applyClasses();

  // Event listeners
  prevButton.addEventListener('click', () => this.move('back'));
  nextButton.addEventListener('click', () => this.move());
}

Slider.prototype.startSlider = function() {
  this.current = this.slider.querySelector('.current') || this.slides.firstElementChild;
  this.prev = this.current.previousElementSibling || this.slides.lastElementChild;
  this.next = this.current.nextElementSibling || this.slides.firstElementChild;
}

Slider.prototype.applyClasses = function() {
  this.current.classList.add('current');
  this.prev.classList.add('prev');
  this.next.classList.add('next');
}

Slider.prototype.move = function(direction) {
  // first strip all the classes off the current slides

  const classesToRemove = ['prev', 'current', 'next'];
  this.prev.classList.remove(...classesToRemove)
  this.current.classList.remove(...classesToRemove)
  this.next.classList.remove(...classesToRemove)
  // OR be a hotshot and do it in one line
  // [prev, current, next].forEach(el => el.classList.remove(...classesToRemove));

  // use destructuring to easily shift them around
  if (direction === 'back') {
    [this.prev, this.current, this.next] = [
      // get the prev slide, if there is none, get hte last slide
      // from the entire slider for wrapping
      this.prev.previousElementSibling || this.slides.lastElementChild,
      this.prev,
      this.current
    ];
  } else {
    [this.prev, this.current, this.next] = [
      this.current,
      this.next,
      this.next.nextElementSibling || this.slides.firstElementChild,
    ];
  }

  this.applyClasses();
}

const mySlider = new Slider(document.querySelector('.slider'));

window.addEventListener('keyup', function(e) {
  if (e.key === 'ArrowRight') {
    mySlider.move();
  };

  if (e.key === 'ArrowLeft') {
    mySlider.move('back');
  };
});
