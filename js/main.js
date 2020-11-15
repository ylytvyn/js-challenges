'use strict';

(function($){
	$(document).ready(function() {
		// Code

		$('.btn').click(function() {
			let task = $(this).data('task'),
				item = $('.content').find(`[data-list=${task}]`);

			$('.list').removeClass('list--active');
			$('.btn').removeClass('btn--active');
			$('.viewer').removeClass('viewer--active');
			item.addClass('list--active');
			$(this).addClass('btn--active');
		});

		$('.list__item').click(function() {
			let url = $(this).data('src');

			$(this).removeClass('list--active');
			$('.list').removeClass('list--active');
			$('.viewer').addClass('viewer--active').attr('src', url);
		});
	});
})(jQuery);
