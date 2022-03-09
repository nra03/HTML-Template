/* Load this script using conditional IE comments if you need to support IE 7 and IE 6. */

window.onload = function() {
	function addIcon(el, entity) {
		var html = el.innerHTML;
		el.innerHTML = '<span style="font-family: \'icomoon\'">' + entity + '</span>' + html;
	}
	var icons = {
			'icon-tweet' : '&#xe001;',
			'icon-shopcart' : '&#xe004;',
			'icon-search' : '&#xe005;',
			'icon-phone' : '&#xe007;',
			'icon-location' : '&#xe008;',
			'icon-email' : '&#xe00d;',
			'icon-arrow_right' : '&#xe00f;',
			'icon-arrow_left' : '&#xe010;',
			'icon-twitter' : '&#xe000;',
			'icon-skype' : '&#xe002;',
			'icon-rss' : '&#xe003;',
			'icon-linkedin' : '&#xe006;',
			'icon-googleplus' : '&#xe009;',
			'icon-facebook' : '&#xe00b;',
			'icon-deviantart' : '&#xe00c;',
			'icon-home' : '&#xe00a;',
			'icon-skype-2' : '&#xe00e;',
			'icon-twitter-2' : '&#xe011;',
			'icon-rss-2' : '&#xe012;',
			'icon-linkedin-2' : '&#xe013;',
			'icon-googleplus-2' : '&#xe014;',
			'icon-fb' : '&#xe015;',
			'icon-deviantart-2' : '&#xe016;',
			'icon-remove' : '&#xf00d;',
			'icon-zoom-in' : '&#xf00e;',
			'icon-zoom-out' : '&#xf010;',
			'icon-ok' : '&#xf00c;',
			'icon-repeat' : '&#xf01e;',
			'icon-refresh' : '&#xf021;',
			'icon-reorder' : '&#xf0c9;',
			'icon-arrow-right' : '&#xe01b;',
			'icon-arrow-left' : '&#xe01a;',
			'icon-reply' : '&#xe017;',
			'icon-forward' : '&#xe018;',
			'icon-grid9' : '&#xe057;',
			'icon-list' : '&#xe019;',
			'icon-close' : '&#xe01c;'
		},
		els = document.getElementsByTagName('*'),
		i, attr, html, c, el;
	for (i = 0; ; i += 1) {
		el = els[i];
		if(!el) {
			break;
		}
		attr = el.getAttribute('data-icon');
		if (attr) {
			addIcon(el, attr);
		}
		c = el.className;
		c = c.match(/icon-[^\s'"]+/);
		if (c && icons[c[0]]) {
			addIcon(el, icons[c[0]]);
		}
	}
};