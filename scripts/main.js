const carouselSlides = document.querySelector('.carousel .slides')
if (carouselSlides) {
  const slides = Array.from(carouselSlides.children)

  // Set default X position for each slide
  slides.forEach((slide, index) => {
    slide.style.transform = `translateX(${index * 100}%)`
  })
}

const slideControls = document.querySelector('.carousel-controls')
// Slide control event listener
// Transition slides when controls are clicked
if (slideControls) {
  slideControls.addEventListener('click', event => {
    const target = event.target
    if (target.classList.contains('prev')) {
      transitionSlides('left')
    } else if (target.classList.contains('next')) {
      transitionSlides('right')
    }
  })
}

// Hide left control when no more slides to the left
// Hide right control when no more slides to the right
const updateSlideControls = () => {
  const activeSlide = document.querySelector('.slide--active')
  // check if active slide is the first slide
  const isFirstSlide = activeSlide.previousElementSibling === null
  // check if active slide is the last slide
  const isLastSlide = activeSlide.nextElementSibling === null
  const prev = document.querySelector('.prev')
  const next = document.querySelector('.next')
  // hide left control if first slide
  if (isFirstSlide) {
    prev.classList.add('disabled')
    next.classList.remove('disabled')
  }
  // hide right control if last slide
  if (isLastSlide) {
    next.classList.add('disabled')
    prev.classList.remove('disabled')
  }
}

/**
 * 
 * @param {String} direction 'left'|'right'
 */
const transitionSlides = (direction = 'right') => {
  // find active slide DOM node
  const activeSlide = document.querySelector('.slide--active')
  // find next slide DOM node
  const nextSlide = direction === 'right'
    ? activeSlide.nextElementSibling
    : activeSlide.previousElementSibling

  // remove active class from active slide
  activeSlide.classList.remove('slide--active')
  // add active class to next slide
  nextSlide.classList.add('slide--active')

  // translate slides to the left of the active slide by -100%
  // translate slides to the right of the active slide by 100%
  // translate active slide by 0%
  const activeSlideIndex = slides.findIndex(slide => slide.classList.contains('slide--active'))
  slides.forEach((slide, index) => {
    if (index > activeSlideIndex) {
      slide.style.transform = `translateX(100%)`
    } else if (index < activeSlideIndex) {
      slide.style.transform = `translateX(-100%)`
    } else {
      slide.style.transform = `translateX(0%)`
    }
  })

  updateSlideControls()
}


/**
 * Accessability Visual
 * 
 */
const body = document.querySelector('body')
document.addEventListener('click', event => {
  const target = event.target
  console.log('target', target)
  if (target.id === 'accessability-visual') {
    body.classList.toggle('gray-scale')
  }
})

/**
 * Mobile Menu
 */
const mobileMenu = document.querySelector('#primary-nav')
const mobileMenuToggle = document.querySelector('.toggle-mobile-nav')
mobileMenuToggle.addEventListener('click', event => {
  mobileMenu.classList.toggle('active')
})