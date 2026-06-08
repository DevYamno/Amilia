// script.js - Amelia Massage & Body Treatment

document.addEventListener('DOMContentLoaded', () => {

  // --- Sticky Header Scroll Effect ---
  const header = document.getElementById('main-header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // --- Mobile Menu Toggle ---
  const menuToggle = document.getElementById('menu-toggle');
  const navbar = document.getElementById('navbar');
  const navLinks = document.querySelectorAll('.nav-links a');

  if (menuToggle && navbar) {
    menuToggle.addEventListener('click', () => {
      navbar.classList.toggle('active');
      const icon = menuToggle.querySelector('i');
      if (navbar.classList.contains('active')) {
        icon.className = 'fa-solid fa-xmark';
      } else {
        icon.className = 'fa-solid fa-bars';
      }
    });

    // Close mobile menu when links are clicked
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navbar.classList.remove('active');
        const icon = menuToggle.querySelector('i');
        icon.className = 'fa-solid fa-bars';
      });
    });
  }

  // --- Date Input Restriction (Prevent Past Dates) ---
  const dateInput = document.getElementById('booking-date');
  if (dateInput) {
    const today = new Date();
    const year = today.getFullYear();
    let month = today.getMonth() + 1;
    let day = today.getDate();

    // Pad month and day with leading zeros if necessary
    if (month < 10) month = '0' + month;
    if (day < 10) day = '0' + day;

    const formattedToday = `${year}-${month}-${day}`;
    dateInput.setAttribute('min', formattedToday);
    dateInput.value = formattedToday; // set default to today
  }

  // --- FAQ Accordion ---
  const faqQuestions = document.querySelectorAll('.faq-question');
  
  faqQuestions.forEach(question => {
    question.addEventListener('click', () => {
      const faqItem = question.parentElement;
      const faqAnswer = faqItem.querySelector('.faq-answer');
      
      // Close other active FAQ items
      document.querySelectorAll('.faq-item').forEach(item => {
        if (item !== faqItem && item.classList.contains('active')) {
          item.classList.remove('active');
          item.querySelector('.faq-answer').style.maxHeight = null;
        }
      });

      // Toggle current item
      faqItem.classList.toggle('active');
      
      if (faqItem.classList.contains('active')) {
        faqAnswer.style.maxHeight = faqAnswer.scrollHeight + 'px';
      } else {
        faqAnswer.style.maxHeight = null;
      }
    });
  });

  // --- WhatsApp Booking Form Integration ---
  const bookingForm = document.getElementById('whatsapp-booking-form');
  
  if (bookingForm) {
    bookingForm.addEventListener('submit', (e) => {
      e.preventDefault();

      // Retrieve form values
      const name = document.getElementById('booking-name').value.trim();
      const phone = document.getElementById('booking-phone').value.trim();
      const area = document.getElementById('booking-area').value;
      const treatment = document.getElementById('booking-treatment').value;
      const date = document.getElementById('booking-date').value;
      const time = document.getElementById('booking-time').value;
      const duration = document.getElementById('booking-duration').value;
      const address = document.getElementById('booking-address').value.trim();

      // Formatting date to Indonesian format (e.g. 08 Juni 2026)
      let formattedDate = date;
      try {
        const parsedDate = new Date(date);
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        formattedDate = parsedDate.toLocaleDateString('id-ID', options);
      } catch (err) {
        console.error('Error formatting date:', err);
      }

      // Admin Phone Number (Amelia Massage - 085692912007)
      // Format to international country code format (6285692912007)
      const adminPhoneNumber = '6285692912007';

      // Build structured WhatsApp message
      const message = 
`Halo Amelia Massage, saya ingin melakukan reservasi layanan pijat panggilan:

*📌 DETAIL PELANGGAN:*
* Nama: ${name}
* No. WhatsApp: ${phone}
* Area Layanan: ${area}
* Alamat Lengkap: ${address}

*💆 DETAIL LAYANAN:*
* Jenis Treatment: ${treatment}
* Durasi Pijat: ${duration}
* Hari & Tanggal: ${formattedDate}
* Jam Mulai: ${time} WIB

Mohon informasi jadwal therapist yang tersedia untuk pemesanan ini. Terima kasih!`;

      // Encode message text
      const encodedMessage = encodeURIComponent(message);
      
      // WhatsApp URL
      const whatsappUrl = `https://wa.me/${adminPhoneNumber}?text=${encodedMessage}`;
      
      // Open in a new tab
      window.open(whatsappUrl, '_blank');
    });
  }
});

// --- Service Selection Helper (triggered from Treatment Catalog Cards or Price List) ---
function selectService(serviceName, durationText) {
  const selectElement = document.getElementById('booking-treatment');
  const durationElement = document.getElementById('booking-duration');
  const bookingSection = document.getElementById('booking');
  
  if (selectElement && bookingSection) {
    // Select the option in the dropdown
    selectElement.value = serviceName;
    
    // Select the duration if provided
    if (durationText && durationElement) {
      durationElement.value = durationText;
    }
    
    // Smooth scroll to the booking section
    bookingSection.scrollIntoView({ behavior: 'smooth' });
    
    // Subtly highlight the inputs to guide the user
    selectElement.classList.add('highlight-glow');
    if (durationText && durationElement) {
      durationElement.classList.add('highlight-glow');
    }
    
    setTimeout(() => {
      selectElement.classList.remove('highlight-glow');
      if (durationElement) {
        durationElement.classList.remove('highlight-glow');
      }
    }, 1500);
  }
}

// --- Pricing Tab Switching ---
function switchPricingTab(tabName) {
  // Hide all pricing contents
  document.querySelectorAll('.pricing-tab-content').forEach(content => {
    content.classList.remove('active');
  });
  
  // Deactivate all tab buttons
  document.querySelectorAll('.pricing-tab-btn').forEach(btn => {
    btn.classList.remove('active');
  });
  
  // Show target tab content
  const targetContent = document.getElementById(`pricing-tab-${tabName}`);
  if (targetContent) {
    targetContent.classList.add('active');
  }
  
  // Activate target tab button
  const targetBtn = Array.from(document.querySelectorAll('.pricing-tab-btn')).find(btn => 
    btn.getAttribute('onclick') && btn.getAttribute('onclick').includes(tabName)
  );
  if (targetBtn) {
    targetBtn.classList.add('active');
  }
}

// --- Lightbox Modal for Poster Zoom ---
function openLightbox(imageSrc) {
  const lightbox = document.getElementById('poster-lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  
  if (lightbox && lightboxImg) {
    lightbox.style.display = 'block';
    lightboxImg.src = imageSrc;
    document.body.style.overflow = 'hidden'; // prevent scrolling
    
    // Set optional caption based on image
    const captionText = document.getElementById('lightbox-caption');
    if (captionText) {
      if (imageSrc.includes('placeholder')) {
        captionText.innerHTML = 'Poster Brosur Amelia Massage & Body Treatment';
      } else {
        captionText.innerHTML = 'Detail Brosur Amelia Massage';
      }
    }
  }
}

function closeLightbox() {
  const lightbox = document.getElementById('poster-lightbox');
  if (lightbox) {
    lightbox.style.display = 'none';
    document.body.style.overflow = 'auto'; // restore scrolling
  }
}
