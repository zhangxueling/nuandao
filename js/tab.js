(function ($) {
	// 创建Tab构造函数
	var Tab = function (tab) {
		// 获取菜单LI
		var aMenuLi = tab.find('.menu li');

		// 获取所有的nav
		var aNav = tab.find('.navitem');

		aMenuLi.mouseover(function () {
			var index = $(this).index();

			// 切换菜单
			aMenuLi.removeClass('active').eq(index).addClass('active');

			// 切换nav
			aNav.removeClass('active').eq(index).addClass('active');
		});
	};

	// 注册成jQuery方法
	$.fn.extend({
		tab: function () {
			this.each(function (k, v) {
				new Tab($(v));
			});
		}
	});
})(jQuery);