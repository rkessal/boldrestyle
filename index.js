document.addEventListener("DOMContentLoaded", main)
const COLOR_SECONDARY_LIGHT = 'var(--e-global-color-74ffe32)'
const COLOR_MAIN_DARK = 'var(--e-global-color-51a23e9)'
const SHADOW_BULLET_DEFAULT = '0px 0px 0px 1px var(--e-global-color-c9bc447) inset'
const COLOR_MAIN_GREEN = 'var(--e-global-color-c9bc447) '

function menu() {
  const links = document.querySelectorAll('.elementor-nav-menu .menu-item')
  const linksA = document.querySelectorAll('.elementor-nav-menu .menu-item a')
  const active = document.querySelector('.elementor-nav-menu .current_page_item.menu-item')
  const activeA = active ? active.querySelector('a') : null

  function setInitialStyles() {
    gsap.set(active, {
      '--before-opacity': 1,
      '--before-shadow': 'none',
      '--before-bg': COLOR_MAIN_DARK,
    })

    gsap.set(activeA, {
      x: 20,
    })
  }

  setInitialStyles()


  links.forEach((link, index) => {
    link.addEventListener('mouseenter', onMouseEnter)
    link.addEventListener('mouseleave', onMouseLeave)

    const otherAs = [...linksA].filter((_, i) => i !== index)
    const otherLinks = [...links].filter((_, i) => i !== index)

    const a = link.querySelector('a')

    function onMouseEnter() {
      console.log("ENTER")
      gsap.set(linksA, {
        color: COLOR_SECONDARY_LIGHT,
      })

      gsap.to(a, {
        x: 20,
        duration: 0.3,
        ease: 'power4.out',
      })

      gsap.set(a, {
        color: COLOR_MAIN_DARK
      })

      gsap.to(link, {
        '--before-opacity': 1,
        duration: 0.3,
      })

    }

    function onMouseLeave() {
      if (link === active) return

      gsap.to(a, {
        x: 0,
        duration: 0.3,
        ease: 'power4.in',
      })
      gsap.to(link, {
        '--before-opacity': 0,
      })

      gsap.set(otherLinks, {
        clearProps: true,
      })

      gsap.set(otherAs, {
        color: COLOR_MAIN_DARK,
      })

      setInitialStyles()
    }
  })
}

function defaultTemplate() {
  const detailsWrappers = document.querySelectorAll('.details-wrapper')
  const firstDetailsWrapper = detailsWrappers[0]

  if (!firstDetailsWrapper) return

  const h2 = firstDetailsWrapper.querySelector('h2')
  const bullet = firstDetailsWrapper.querySelector('.services-bullet')
  const underline = firstDetailsWrapper.querySelector('.details-underline')

  firstDetailsWrapper.setAttribute('data-state', 'open')

  gsap.set(h2, {
    color: COLOR_MAIN_DARK
  })

  gsap.set([bullet, underline], {
    backgroundColor: COLOR_MAIN_DARK,
    boxShadow: 'none'
  })

  detailsWrappers.forEach((wrapper, index) => {
    if (index !== 0) {
      const description = wrapper.querySelector('.details-description')
      wrapper.setAttribute('data-state', 'closed')
      gsap.set(description, {
        height: 0,
      })
    }

    wrapper.addEventListener('click', () => onDetailsClick(wrapper))
  })

  function onDetailsClick(wrapper) {
    const currentState = wrapper.getAttribute('data-state')
    const description = wrapper.querySelector('.details-description')

    gsap.set(wrapper, {
      pointerEvents: 'none',
    })

    if (!currentState || currentState === 'closed') {
      openDetails(wrapper, description)
    } else {
      closeDetails(wrapper, description)
    }

  }

  function updateColors(wrapper, isOpen) {
    const h2 = wrapper.querySelector('h2')
    const bullet = wrapper.querySelector('.services-bullet')
    const underline = wrapper.querySelector('.details-underline')

    if (isOpen) {
      gsap.set(h2, {
        color: COLOR_MAIN_DARK,
      })
      gsap.to([bullet, underline], {
        backgroundColor: COLOR_MAIN_DARK,
        boxShadow: 'none',
      })
    } else {
      gsap.set([h2, bullet, underline], {
        clearProps: true,
      })
    }
  }

  function closeDetails(wrapper, description) {
    updateColors(wrapper, false)
    gsap.to(description.querySelectorAll('p'), {
      stagger: 0.05,
      yPercent: 30,
      duration: 1,
      ease: 'power4.out',
      onComplete: () => {
        gsap.set(description.querySelectorAll('p'), {
          clearProps: 'all'
        })
      }
    })
    gsap.to(description, {
      height: 0,
      duration: 1,
      ease: 'power4.out',
      onComplete: () => {
        wrapper.setAttribute('data-state', 'closed')
        gsap.set(wrapper, {
          pointerEvents: 'auto'
        })
      }
    })
  }

  function openDetails(wrapper, description) {
    updateColors(wrapper, true)
    gsap.from(description.querySelectorAll('p'), {
      stagger: 0.05,
      yPercent: 40,
      duration: 1,
      ease: 'power4.out',
    })
    gsap.to(description, {
      height: 'auto',
      duration: 1,
      ease: 'power4.out',
      onComplete: () => {
        wrapper.setAttribute('data-state', 'open')
        gsap.set(wrapper, {
          pointerEvents: 'auto'
        })
      }
    })
  }


}

function home() {
  const servicesWrappers = document.querySelectorAll('.services-wrapper')

  if (!servicesWrappers.length) return

  function getMainElements(wrapper) {
    const bullet = wrapper.querySelector('.services-bullet')
    const h3 = wrapper.querySelector('h3')
    const details = wrapper.querySelector('.service-details')

    return { bullet, h3, details }
  }

  function hideOthers(wrapper) {
    servicesWrappers.forEach(otherWrapper => {
      if (otherWrapper !== wrapper) {
        const { h3 } = getMainElements(otherWrapper)
        gsap.set(h3, {
          color: COLOR_SECONDARY_LIGHT,
        })
      }
    })
  }

  servicesWrappers.forEach(wrapper => {
    wrapper.addEventListener('click', onServiceClick)
    wrapper.setAttribute('data-state', 'closed')


    const { bullet, h3, details } = getMainElements(wrapper)

    function onServiceClick() {
      const isOpen = wrapper.getAttribute('data-state') === 'open'
      if (isOpen) {
        resetWrappers(true)
      } else {
        openDetails()
      }
    }

    function openDetails() {
      resetWrappers()
      hideOthers(wrapper)
      gsap.to(details, {
        opacity: 1,
        duration: 1,
      })

      gsap.set(bullet, {
        delay: 0.5,
        backgroundColor: COLOR_MAIN_GREEN,
        boxShadow: 'none',
      })

      gsap.to(bullet, {
        y: 12,
        ease: 'none',
      })

      gsap.to(h3, {
        y: -62,
        color: COLOR_MAIN_DARK,
        scale: 0.9,
        onComplete: () => {
          wrapper.setAttribute('data-state', 'open')
        }
      })
    }

    function resetWrappers(initial) {
      servicesWrappers.forEach(wrapper => {
        const { bullet, h3, details } = getMainElements(wrapper)
        gsap.to(details, {
          opacity: 0,
          duration: 0.5,
        })

        gsap.to(bullet, {
          y: 0,
          ease: 'none',
        })

        gsap.to(h3, {
          y: 0,
          scale: 1,
          onComplete: () => {
            wrapper.setAttribute('data-state', 'closed')
            gsap.set([bullet], {
              clearProps: true,
            })
            gsap.set([h3, details], {
              clearProps: initial ? true : 'scale, y, opacity',
            })
          }
        })

      })
    }
  }
  )
}

function main() {
  menu()
  if (window.location.pathname.includes('/homepage')) {
    home()
  } else {
    defaultTemplate()
  }
}