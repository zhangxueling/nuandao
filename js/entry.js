(function ($) {
	// 创建Tab构造函数
	var BoxRight = function (boxright) {
		// 获取菜单LI
		var aEntryLi = boxright.find('.entry li');

		var aFormBox = boxright.find('.form-box');

		aEntryLi.click(function () {
			var index = $(this).index();

			// 切换菜单
			aEntryLi.removeClass('active').eq(index).addClass('active');
			
			 aFormBox.css('display','none').eq(index).css('display','block');
		});
	};

	// 注册成jQuery方法
	$.fn.extend({
		boxright: function () {
			this.each(function (k, v) {
				new BoxRight($(v));
			});
		}
	});
})(jQuery);