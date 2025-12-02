// script.js
(function () {
  const navToggle = document.querySelector('.nav-toggle');
  const navLinksContainer = document.querySelector('.nav-links');
  const navLinks = document.querySelectorAll('.nav-link');
  const scrollButtons = document.querySelectorAll('[data-scroll-target]');
  const header = document.querySelector('.site-header');
  const contactForm = document.getElementById('contact-form');
  const formMessage = document.getElementById('form-message');
  const currentYearEl = document.getElementById('current-year');

  // Set current year in footer
  if (currentYearEl) {
    currentYearEl.textContent = new Date().getFullYear();
  }

  // Mobile nav toggle
  if (navToggle && navLinksContainer) {
    navToggle.addEventListener('click', function () {
      const isOpen = navLinksContainer.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', String(isOpen));
      navLinksContainer.setAttribute('aria-hidden', String(!isOpen));
    });

    // Close nav when a link is clicked (mobile)
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        if (navLinksContainer.classList.contains('open')) {
          navLinksContainer.classList.remove('open');
          navToggle.setAttribute('aria-expanded', 'false');
          navLinksContainer.setAttribute('aria-hidden', 'true');
        }
      });
    });
  }

  // Smooth scrolling helper
  function handleSmoothScroll(event, targetSelector) {
    const targetId = targetSelector || event.currentTarget.getAttribute('href');
    if (!targetId || !targetId.startsWith('#')) return;

    const targetElement = document.querySelector(targetId);
    if (!targetElement) return;

    event.preventDefault();

    const headerOffset = header ? header.offsetHeight : 0;
    const rect = targetElement.getBoundingClientRect();
    const offsetTop = rect.top + window.scrollY - headerOffset + 4;

    window.scrollTo({
      top: offsetTop,
      behavior: 'smooth'
    });
  }

  // Attach smooth scroll to nav links
  navLinks.forEach(link => {
    link.addEventListener('click', event => handleSmoothScroll(event));
  });

  // Buttons that scroll via data-scroll-target
  scrollButtons.forEach(btn => {
    btn.addEventListener('click', event => {
      const selector = btn.getAttribute('data-scroll-target');
      handleSmoothScroll(event, selector);
    });
  });

  // Basic form validation
  function validateForm() {
    if (!contactForm) return false;

    const fields = {
      name: contactForm.querySelector('#name'),
      organization: contactForm.querySelector('#organization'),
      email: contactForm.querySelector('#email'),
      phone: contactForm.querySelector('#phone'),
      service: contactForm.querySelector('#service'),
      message: contactForm.querySelector('#message')
    };

    const errors = {
      name: contactForm.querySelector('#error-name'),
      organization: contactForm.querySelector('#error-organization'),
      email: contactForm.querySelector('#error-email'),
      phone: contactForm.querySelector('#error-phone'),
      service: contactForm.querySelector('#error-service'),
      message: contactForm.querySelector('#error-message')
    };

    let isValid = true;

    // Reset previous errors
    Object.keys(errors).forEach(key => {
      if (errors[key]) errors[key].textContent = '';
    });
    Object.keys(fields).forEach(key => {
      if (fields[key]) fields[key].classList.remove('input-error');
    });
    if (formMessage) {
      formMessage.textContent = '';
      formMessage.classList.remove('form-message--success', 'form-message--error');
    }

    // Name
    if (!fields.name.value.trim()) {
      errors.name.textContent = 'Please enter your name.';
      fields.name.classList.add('input-error');
      isValid = false;
    }

    // Organization
    if (!fields.organization.value.trim()) {
      errors.organization.textContent = 'Please enter your organization.';
      fields.organization.classList.add('input-error');
      isValid = false;
    }

    // Email
    const emailVal = fields.email.value.trim();
    if (!emailVal) {
      errors.email.textContent = 'Please enter your email.';
      fields.email.classList.add('input-error');
      isValid = false;
    } else {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(emailVal)) {
        errors.email.textContent = 'Enter a valid email address.';
        fields.email.classList.add('input-error');
        isValid = false;
      }
    }

    // Service
    if (!fields.service.value) {
      errors.service.textContent = 'Select a service interest.';
      fields.service.classList.add('input-error');
      isValid = false;
    }

    // Message
    if (!fields.message.value.trim()) {
      errors.message.textContent = 'Tell us briefly what you need help with.';
      fields.message.classList.add('input-error');
      isValid = false;
    }

    return isValid;
  }

  if (contactForm) {
    contactForm.addEventListener('submit', function (event) {
      event.preventDefault();

      const isValid = validateForm();

      if (!isValid) {
        if (formMessage) {
          formMessage.textContent = 'Please fix the highlighted fields and try again.';
          formMessage.classList.add('form-message--error');
        }
        return;
      }

      // Simulated success (no backend)
      contactForm.reset();

      if (formMessage) {
        formMessage.textContent = 'Thanks — we’ll respond within one business day.';
        formMessage.classList.remove('form-message--error');
        formMessage.classList.add('form-message--success');
      }
    });
  }
})();
