﻿/* ==================================
 1. bgColor:      #fff
    spinnerColor: #5983fe

 2. bgColor:      #fff
    spinnerColor: #38d368

 3. bgColor:      #fff
    spinnerColor: #666666

 4. bgColor:      #31d864
    spinnerColor: #fff

 5. bgColor:      #057bff
    spinnerColor: #fff

 6. bgColor:      #404041
    spinnerColor: #fff

 7. bgColor:      #404041
    spinnerColor: #38d368
 ================================== */

var preloader = {
    html: function (position, bgColor, spinnerColor, addBorderRadius) {
        bgColor = bgColor || '#fff';
        spinnerColor = spinnerColor || '#5983fe';
        var radius = addBorderRadius ? 'border-radius:17px;' : '';

        var html =
            '<div class="js-preloader" style="position:' + position + ';top:0;left:0;z-index:99999;width:100%;height:100%;">' +
            '<div style="position:absolute;top:0;left:0;z-index:1;width:100%;height:100%;opacity:0.8;' + radius + 'background-color:' + bgColor + '"></div>' +
            '<div style="position:absolute;top:50%;left:50%;z-index:2;transform:translate(-50%,-50%)">' +
            '<svg width="48px" height="48px" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid" style="background: none;"><g transform="rotate(0 50 50)"><style type="text/css">.spinner-item{fill:' + spinnerColor + ';}</style> <rect class="spinner-item" x="47" y="22.5" rx="9.4" ry="4.5" width="6" height="15"> <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.9s" repeatCount="indefinite"></animate> </rect></g><g transform="rotate(36 50 50)"> <rect class="spinner-item" x="47" y="22.5" rx="9.4" ry="4.5" width="6" height="15"> <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.8s" repeatCount="indefinite"></animate> </rect></g><g transform="rotate(72 50 50)"> <rect class="spinner-item" x="47" y="22.5" rx="9.4" ry="4.5" width="6" height="15"> <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.7s" repeatCount="indefinite"></animate> </rect></g><g transform="rotate(108 50 50)"> <rect class="spinner-item" x="47" y="22.5" rx="9.4" ry="4.5" width="6" height="15"> <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.6s" repeatCount="indefinite"></animate> </rect></g><g transform="rotate(144 50 50)"> <rect class="spinner-item" x="47" y="22.5" rx="9.4" ry="4.5" width="6" height="15"> <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.5s" repeatCount="indefinite"></animate> </rect></g><g transform="rotate(180 50 50)"> <rect class="spinner-item" x="47" y="22.5" rx="9.4" ry="4.5" width="6" height="15"> <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.4s" repeatCount="indefinite"></animate> </rect></g><g transform="rotate(216 50 50)"> <rect class="spinner-item" x="47" y="22.5" rx="9.4" ry="4.5" width="6" height="15"> <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.3s" repeatCount="indefinite"></animate> </rect></g><g transform="rotate(252 50 50)"> <rect class="spinner-item" x="47" y="22.5" rx="9.4" ry="4.5" width="6" height="15"> <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.2s" repeatCount="indefinite"></animate> </rect></g><g transform="rotate(288 50 50)"> <rect class="spinner-item" x="47" y="22.5" rx="9.4" ry="4.5" width="6" height="15"> <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.1s" repeatCount="indefinite"></animate> </rect></g><g transform="rotate(324 50 50)"> <rect class="spinner-item" x="47" y="22.5" rx="9.4" ry="4.5" width="6" height="15"> <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="0s" repeatCount="indefinite"></animate> </rect></g></svg>'
        '</div>' +
            '</div>';
        return html;
    },

    show: function (options) {
        options = options || {};
        const { selector, bgColor, spinnerColor, addBorderRadius } = options;
        const position = selector ? 'absolute' : 'fixed';
        const target = selector ? $(selector) : $('body');

        target.append(preloader.html(position, bgColor, spinnerColor, addBorderRadius));
    },

    hide: function () {
        $('.js-preloader').remove();
    },

    hideAfterPageLoad: function () {
        $(window).on('load', function () {
            $('.js-preloader').fadeOut(400, function () { $(this).remove(); });
        });
    }
};

$.fn.extend({
    showPreloader: function (bgColor, spinnerColor) {
        bgColor = bgColor || '#fff';
        spinnerColor = spinnerColor || '#5983fe';
        this.append(preloader.html('absolute', bgColor, spinnerColor));
    },
    hidePreloader: function () {
        this.find('.js-preloader').fadeOut(1500, function () { $(this).remove(); });
    }
});