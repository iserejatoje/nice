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

    let frontpage = new Swiper('.frontpage-slider', {
        slidesPerView: 1,
        effect: 'fade',
        pagination: {
            el: '.frontpage-slider .swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.frontpage-slider .swiper-button-next',
            prevEl: '.frontpage-slider .swiper-button-prev',
        },
    });
    $('select').selectric({responsive: true});

    $(document).keyup(function(e) {
        if (e.key === "Escape") {
            $('body').removeClass(overlayClasses);
        }
    });

    $(document).click(function(e) {
        if ($(e.target).hasClass('commercial-overlay')) {
            $('body').removeClass('commercial');
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

    $('.close-commercial').click(function() {
        $('body').removeClass('commercial');
        return false;
    });

    $('.product-links').on('click', 'a', function() {
        $(this).addClass('active').siblings().removeClass('active');
        $('.product_pages').find('.page').eq($(this).index()).show().siblings().hide();
        return false;
    });

    $('[data-commercial]').click(function() {
        $('body').addClass('commercial');
        return false;
    });

    $('header .search-link, .menu .search-link').click(function() {
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
            script.src = "/bitrix/templates/nais/js/leaflet.min.js";
            document.getElementsByTagName("body")[0].appendChild(script)
            script.onload = function () {
                let map = L.map('map', {
                    attributionControl: false,
                    scrollWheelZoom: false
                }).setView([55.342998, 86.090009], 16);
                L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png').addTo(map);
                let pin = L.icon({
                    iconUrl: '/bitrix/templates/nais/img/sprite.svg#pin',
                    iconSize: [67, 67],
                    iconAnchor: [30, 67],
                });
                L.marker([55.342698, 86.090009], {icon: pin}).addTo(map);
            };
        }, 900);
    }
    if ($('.gallery-thumbs').length > 0) {

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
    }

    $('.favorite-toggle_heart, a.favorite').on('click', function() {
        let $th = $(this);
        $.ajax({
            url: '/bitrix/templates/nais/ajax/favorite.php',
            data: {
                'product_id': $th.attr('data-id')
            },
            type: 'post',
            success: function (data) {
                $th.toggleClass('favorite-toggle_heart-active');

                if (!$th.hasClass('active')) {
                    $th.find('.fav_label').html('Убрать из избранного');
                } else {
                    $th.find('.fav_label').html('Добавить в избранное');
                }

                $th.toggleClass('active');

            }
        })
        return false;
    })

    $('.form-request').submit(function() {
        let $form = $(this);
        $.ajax({
            url: $form.attr('action'),
            data: $form.serialize(),
            type: 'post',
            dataType: 'json',
            success: function(data) {
                if (data['error'] == '0') {
                    $form.remove();
                    $('.form-success_message').html('Спасибо за заявку!<br/>Мы свяжемся с вами в ближайшее время');
                }
            }
        });
        return false;
    });

    $('[data-download]').click(function() {
        $.ajax({
            url: '/bitrix/templates/nais/ajax/excel.php',
            data: {},
            type: 'post',
            dataType: 'json',
            success: function(data) {
                if (data['error'] == '0') {
                    let link = document.createElement('a');
                    link.setAttribute('href', data['filename']);
                    link.setAttribute('download', 'Коммерческое предложение.xlsx');
                    link.click();
                    return false;
                }
            }
        });
        return false;
    });

    $('.form-commercial').submit(function() {
        let $form = $(this);
        $.ajax({
            url: $form.attr('action'),
            data: $form.serialize(),
            type: 'post',
            dataType: 'json',
            success: function(data) {
                if (data['error'] == '0') {
                    $form.remove();
                    $('.heading-contact').html('Спасибо за заявку!<br/>Мы свяжемся с вами в ближайшее время').addClass('success');
                }
            }
        });
        return false;
    });

    function delay(callback, ms) {
        let timer = 0;
        return function() {
            let context = this, args = arguments;
            clearTimeout(timer);
            timer = setTimeout(function () {
                callback.apply(context, args);
            }, ms || 0);
        };
    }

    $(document).click(function(e) {
        if ($(e.target).closest('.search-form').length == 0) {
            $('.search-list').html('').hide();
        }
    })

    $('input[name="q"]').on('keyup focus', delay(function (e) {
        let $th = $(this);

        if ($.trim($th.val()).length > 2) {
            $.ajax({
                url: '/bitrix/templates/nais/ajax/search.php',
                data: {
                    'q': $.trim($th.val())
                },
                dataType: 'json',
                type: 'post',
                success: function (data) {
                    console.debug(data);

                    if (data.length > 0) {
                        let html = '';
                        $.each(data, function (i, val) {
                            html += '<a href="' + $(this).attr('DETAIL_PAGE_URL') + '">' + $(this).attr('NAME') + '</a>';
                        });
                        $('.search-list').html(html).show();
                    } else {
                        $('.search-list').html('').hide();
                    }
                }
            })
        } else {
            $('.search-list').html('').hide();
        }

    }, 500));

});