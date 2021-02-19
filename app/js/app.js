jQuery(function ($) {

    let
        overlayClasses = 'menu-opened search-opened commercial-form-opened',
        phoneMask = '+7 (000) 000-00-00';

    let articles = new Swiper('.cards-slider', {
        slidesPerView: 3,
        spaceBetween: 30,
        pagination: {
            el: '.cards-slider_block .swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.cards-slider_block .swiper-button-next',
            prevEl: '.cards-slider_block .swiper-button-prev',
        },
        breakpoints: {
            0: {
                slidesPerView: 1,
                spaceBetween: 30,
            },
            800: {
                slidesPerView: 2,
                spaceBetween: 30,
            },
            1116: {
                slidesPerView: 3,
                spaceBetween: 30,
            },
        }
    });

    let equipment = new Swiper('.equipment-slider', {
        slidesPerView: 3,
        spaceBetween: 30,
        pagination: {
            el: '.equipment-slider_block .swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.equipment-slider_block .swiper-button-next',
            prevEl: '.equipment-slider_block .swiper-button-prev',
        },
        breakpoints: {
            0: {
                slidesPerView: 1,
                spaceBetween: 30,
            },
            1116: {
                slidesPerView: 2,
                spaceBetween: 30,
            },
        }
    });

    $('select').selectric({responsive: true});

    $(document).keyup(function(e) {
        if (e.key === "Escape") {
            $('body').removeClass(overlayClasses);
        }
    });

    $('.burger').click(function() {
        $('body').addClass('menu-opened');
    });

    $('.close-button').click(function() {
        $('body').removeClass(overlayClasses);
    });

    $('.append-options').click(function() {
        $('.table-options .table-row').removeClass('hidden');
        $('.append-options').remove();
    });

    $('.search-link').click(function() {
        $('body').addClass('search-opened').removeClass('menu-opened');
    });

    $('[type="tel"]').mask(phoneMask);

    $('.input')
        .on('focus', 'input', function() {
            $(this).parent().addClass('active');
        })
        .on('blur', 'input', function() {
            if ($.trim($(this).val()) === '')
                $(this).parent().removeClass('active');
        });

    if ($('#map').length > 0) {
        setTimeout(function () {
            let script = document.createElement("script");
            script.type = "text/javascript";
            script.src = "app/js/leaflet.min.js";
            document.getElementsByTagName("body")[0].appendChild(script)
            script.onload = function () {
                let map = L.map('map', {
                    attributionControl: false,
                    scrollWheelZoom: false
                }).setView([55.342998, 86.090009], 16);
                L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png').addTo(map);
                let pin = L.icon({
                    iconUrl: 'app/img/sprite.svg#pin',
                    iconSize: [67, 67],
                    iconAnchor: [30, 67],
                });
                L.marker([55.342698, 86.090009], {icon: pin}).addTo(map);
            };
        }, 1200);
    }

    let galleryThumbs = new Swiper('.gallery-thumbs', {
        spaceBetween: 10,
        slidesPerView: 6,
    });

    let galleryTop = new Swiper('.gallery-top', {
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        thumbs: {
            swiper: galleryThumbs
        }
    });

    galleryThumbs.update();

});