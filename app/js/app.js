jQuery(function ($) {

    let
        overlayClasses = 'menu-opened search-opened commercial-form-opened',
        phoneMask = '+7 (000) 000-00-00';

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

});