$(document).ready(function () {
	$('.header__burger').on('click', function () {
		$('.header__burger, .header__list').toggleClass('active');
		$('body').toggleClass('lock');
	});


	const slider = $('.slider').slick({
		arrows: true,
		dots: false,
		slidesToShow: 3,
		slidesToScroll: 3,
		speed: 1000,
		autoplay: true,
		autoplaySpeed: 3000,
		touchThreshold: 8,
		responsive: [
			{
				breakpoint: 1050,
				settings: {
					dots: true,
					slidesToShow: 2,
					slidesToScroll: 2,
				}
			},
			{
				breakpoint: 768,
				settings: {
					dots: true,
					slidesToShow: 1,
					slidesToScroll: 1,
					arrows: false,
				}
			},
		]
	});


	slider.on('beforeChange', (event, slick, currentSlide, nextSlide) => {
		$(`.products__slider-nav[data-slide="${currentSlide}"]`).removeClass('active');
		$(`.products__slider-nav[data-slide="${nextSlide}"]`).addClass('active');
	});

	$('.products__slider-nav').on('click', (event) => {
		slider.slick('slickGoTo', event.target.attributes['data-slide'].value);
	});

	$("a").on('click', function (event) {
		if (this.hash !== "") {
			event.preventDefault();
			var hash = this.hash;
			$('html, body').animate({
				scrollTop: $(hash).offset().top
			}, 800, function () {
				window.location.hash = hash;
			});
		}
	});
   
   window.addEventListener(
      'orientationchange',
      function () {
        $('body').removeClass('lock');
        $('.header__burger, .header__list').removeClass('active');
      },
      false
    );

	$('#order-form').validate({
		rules: {
			userName: {
				required: true,
				minlength: 2
			},
			userPhone: 'required'
		},
		messages: {
			userName: {
				required: "Введіть своє ім'я",
				minlength: jQuery.validator.format("Введіть мінімум {0} символа")
			},
			userPhone: 'Введіть номер телефону',
		}
	});

	$("input[name=userPhone]").mask("+38(999) 999-99-99");

	$('form.form').submit(function(e) {
		e.preventDefault();
		if (!$(this).valid()) {
			return;
		}
		$.ajax({
			type: 'POST',
			url: 'mailer/smart.php',
			data: $(this).serialize()
		}).done(function() {
			$(this).find("input").val("");


			$('form.form').trigger('reset');
		});
		return false;
	});
});