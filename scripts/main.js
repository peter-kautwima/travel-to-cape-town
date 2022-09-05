let slides = null
const carouselSlides = document.querySelector('.carousel .slides')
if (carouselSlides) {
  slides = Array.from(carouselSlides.children)

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

const body = document.querySelector('body')

/**
 * Accessability Visual
 * 
 */
const accessabilityButton = document.createElement('button')
accessabilityButton.setAttribute('aria-label', 'Enable accessibility mode')
const accessibilityIcon = document.createElement('img')
accessibilityIcon.src = './icons/accessibility.svg'
accessibilityIcon.alt = 'Toggle accessability features'
accessabilityButton.classList.add('accessability-visual')
accessabilityButton.appendChild(accessibilityIcon)
body.appendChild(accessabilityButton)
accessabilityButton.addEventListener('click', () => {
  body.classList.toggle('gray-scale')
})

/**
 * Mobile Menu
 */
const mobileMenu = document.querySelector('#primary-nav')
const mobileMenuToggle = document.querySelector('.toggle-mobile-nav')
mobileMenuToggle.addEventListener('click', () => {
  mobileMenu.classList.toggle('active')
})

/**
 * Scroll to top
 */
const scrollToTopButton = document.createElement('button')
scrollToTopButton.setAttribute('aria-label', 'Scroll to top')
const scrollToTopIcon = document.createElement('img')
scrollToTopIcon.src = './icons/up-arrow.svg'
scrollToTopIcon.alt = 'Scroll to top'
scrollToTopButton.classList.add('scroll-to-top')
scrollToTopButton.appendChild(scrollToTopIcon)
body.appendChild(scrollToTopButton)
scrollToTopButton.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
})

/**
 * Accordion (Handorgel)
 */
const accordion = new handorgel(document.querySelector('.handorgel'), {

  // whether multiple folds can be opened at once
  multiSelectable: true,
  // whether the folds are collapsible
  collapsible: true,

  // whether ARIA attributes are enabled
  ariaEnabled: true,
  // whether W3C keyboard shortcuts are enabled
  keyboardInteraction: true,
  // whether to loop header focus (sets focus back to first/last header when end/start reached)
  carouselFocus: true,

  // attribute for the header or content to open folds at initialization
  initialOpenAttribute: 'data-open',
  // whether to use transition at initial open
  initialOpenTransition: true,
  // delay used to show initial transition
  initialOpenTransitionDelay: 200,

  // header/content class if fold is open
  headerOpenClass: 'handorgel__header--open',
  contentOpenClass: 'handorgel__content--open',

  // header/content class if fold has been opened (transition finished)
  headerOpenedClass: 'handorgel__header--opened',
  contentOpenedClass: 'handorgel__content--opened',

  // header/content class if fold has been focused
  headerFocusClass: 'handorgel__header--focus',
  contentFocusClass: 'handorgel__content--focus',

  // header/content class if fold is disabled
  headerDisabledClass: 'handorgel__header--disabled',
  contentDisabledClass: 'handorgel__content--disabled',

})