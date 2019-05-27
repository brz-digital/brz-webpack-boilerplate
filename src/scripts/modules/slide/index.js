import Swiper from 'swiper'
import boolParse from '../../helpers/bool'

class Slide {
  constructor () {
    this.slides = {}

    document.querySelectorAll('.js-slide').forEach((slide, index) => {
      const settings = {
        mobileBreak: slide.dataset.mobileBreak || 991,
        onlyMobile: slide.hasAttribute('data-only-mobile')
          ? boolParse(slide.dataset.onlyMobile)
          : false,
        simulateTouch: slide.hasAttribute('data-simulate-touch')
          ? boolParse(slide.dataset.simulateTouch)
          : true,
        autoplay: slide.hasAttribute('data-autoplay')
          ? boolParse(slide.dataset.autoplay)
          : false,
        loop: slide.hasAttribute('data-loop')
          ? boolParse(slide.dataset.loop)
          : false,
        autoHeight: slide.hasAttribute('data-auto-height')
          ? boolParse(slide.dataset.autoHeight)
          : false,
        perView: slide.dataset.perView || 1,
        perViewXL: slide.dataset.perViewXl || 1,
        perViewLG: slide.dataset.perViewLg || 1,
        perViewMD: slide.dataset.perViewMd || 1,
        perViewSM: slide.dataset.perViewSm || 1,
        perViewXS: slide.dataset.perViewXs || 1,
        spaceBetween: slide.dataset.spaceBetween || 0,
        effect: slide.dataset.effect || 'slide', // "slide", "fade", "cube", "coverflow", "flip"
        pagination: slide.dataset.pagination || 'bullets', // "bullets", "fraction", "progressbar",
        direction: slide.dataset.direction || 'horizontal'
      }

      slide.classList.add(`slide-${index}`)

      if (slide.querySelector('.slide-pagination')) {
        slide
          .querySelector('.slide-pagination')
          .classList.add(`pagination-${index}`)
      }
      if (slide.querySelector('.slide-prev')) {
        slide.querySelector('.slide-prev').classList.add(`prev-${index}`)
      }
      if (slide.querySelector('.slide-next')) {
        slide.querySelector('.slide-next').classList.add(`next-${index}`)
      }

      if (settings.onlyMobile === true) {
        slide.classList.add('swiper-only-mobile')

        if (window.outerWidth <= settings.mobileBreak) {
          this.create(slide, index, settings)
        }

        this.handleOnResize(slide, index, settings)
      } else {
        this.create(slide, index, settings)
      }
    })
  }

  create (slide, index, settings) {
    slide.classList.add('swiper')
    slide.querySelector('.slide-wrapper').classList.add('swiper-wrapper')

    slide.querySelectorAll('.slide-item').forEach(item => {
      item.classList.add('swiper-slide')
    })

    this.slides[index] = new Swiper(`.slide-${index}`, {
      pagination: {
        el: `.pagination-${index}`,
        type: settings.pagination,
        clickable: true
      },
      navigation: {
        nextEl: `.next-${index}`,
        prevEl: `.prev-${index}`
      },
      autoHeight: settings.autoHeight,
      direction: settings.direction,
      loop: settings.loop,
      autoplay: settings.autoplay,
      slideClass: 'swiper-slide',
      wrapperClass: 'swiper-wrapper',
      slidesPerView: settings.perView,
      spaceBetween: settings.spaceBetween,
      effect: settings.effect,
      simulateTouch: settings.simulateTouch,
      breakpoints: {
        2600: {
          slidesPerView: settings.perViewXL
        },
        1599: {
          slidesPerView: settings.perViewLG
        },
        1199: {
          slidesPerView: settings.perViewMD
        },
        991: {
          slidesPerView: settings.perViewSM
        },
        767: {
          slidesPerView: settings.perViewXS
        }
      }
    })
  }

  handleOnResize (slide, index, settings) {
    window.addEventListener('resize', () => {
      if (window.innerWidth <= settings.mobileBreak && !this.slides[index]) {
        this.create(slide, index, settings)
      } else if (window.innerWidth >= settings.mobileBreak + 1) {
        slide.classList.remove('swiper')

        const wrapper = slide.querySelector('.slide-wrapper')

        if (wrapper.classList.contains('swiper-wrapper')) {
          wrapper.classList.remove('swiper-wrapper')
        }

        const items = slide.querySelectorAll('.slide-item')

        items.forEach(item => {
          if (item.classList.contains('swiper-slide')) {
            item.classList.remove('swiper-slide')
          }
        })

        if (this.items[index]) {
          this.items[index].destroy(false, true)
          this.items[index] = undefined
        }
      }
    })
  }
}

export const slide = new Slide()
