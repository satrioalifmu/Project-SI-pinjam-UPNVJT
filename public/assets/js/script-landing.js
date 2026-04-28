// ==========================================
// 1. AREA JQUERY (Untuk Header & Smooth Scroll)
// ==========================================
$(document).ready(function () {
    "use strict";
  
    // Efek Sticky Header saat di-scroll
    $(window).on("scroll", function () {
      if ($(window).scrollTop() > 50) {
        $(".header-area").addClass("header-sticky");
      } else {
        $(".header-area").removeClass("header-sticky");
      }
    });
  
    // Efek Smooth Scroll saat link di menu atau tombol ditekan
    $('a[href^="#"]').on("click", function (e) {
      e.preventDefault();
  
      // Update menu active class
      $(".nav-link").removeClass("active");
      $(this).addClass("active");
  
      var target = this.hash;
      var $target = $(target);
  
      if ($target.length) {
        $("html, body")
          .stop()
          .animate(
            {
              scrollTop: $target.offset().top - 80, // Offset dikurangi tinggi header
            },
            800,
            "swing"
          );
      }
    });
  
    // Highlight menu aktif berdasarkan posisi scroll
    $(window).on("scroll", function () {
      var scrollPos = $(document).scrollTop() + 100;
      $(".nav-link").each(function () {
        var currLink = $(this);
        var refElement = $(currLink.attr("href"));
        if (refElement.length) {
          if (
            refElement.position().top <= scrollPos &&
            refElement.position().top + refElement.height() > scrollPos
          ) {
            $(".nav-link").removeClass("active");
            currLink.addClass("active");
          }
        }
      });
    });
});
  
// ==========================================
// 2. AREA VANILLA JS (Untuk Auto Scroll Carousel)
// ==========================================
// Kita gunakan event listener bawaan browser agar lebih aman
window.addEventListener('load', function() {
    const carousel = document.getElementById('carouselFasilitas');
    
    if (carousel) {
        let isHovering = false;
        let autoScrollInterval;

        // Jeda saat kursor berada di atas carousel (Desktop)
        carousel.addEventListener('mouseenter', () => isHovering = true);
        carousel.addEventListener('mouseleave', () => isHovering = false);

        // Jeda saat disentuh (Mobile/HP)
        carousel.addEventListener('touchstart', () => isHovering = true);
        carousel.addEventListener('touchend', () => {
            setTimeout(() => isHovering = false, 1000);
        });

        function jalankanAutoScroll() {
            // Set interval setiap 2 detik (2000 ms)
            autoScrollInterval = setInterval(() => {
                if (!isHovering) {
                    const kartuPertama = carousel.querySelector('a');
                    
                    if (kartuPertama) {
                        // Lebar kartu + jarak gap Tailwind (24px)
                        const jarakGeser = kartuPertama.offsetWidth + 24; 

                        // Cek apakah scroll sudah mentok di ujung kanan
                        // Menggunakan Math.ceil untuk menghindari bug desimal pixel di beberapa browser
                        if (Math.ceil(carousel.scrollLeft + carousel.clientWidth) >= carousel.scrollWidth - 10) {
                            // Mentok -> Kembali ke awal
                            carousel.scrollTo({
                                left: 0,
                                behavior: 'smooth'
                            });
                        } else {
                            // Belum mentok -> Geser ke kanan
                            carousel.scrollBy({
                                left: jarakGeser,
                                behavior: 'smooth'
                            });
                        }
                    }
                }
            }, 2000);
        }

        // Eksekusi fungsi
        jalankanAutoScroll();
    }
});