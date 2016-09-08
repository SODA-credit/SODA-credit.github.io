'use strict';


function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
    var r = window.location.search.substr(1).match(reg);  //匹配目标参数
    if (r != null) return unescape(r[2]); return null; //返回参数值
}


$(document).ready(function () {
    var navpos = $('.second-navbar').offset();
    var award = $('#award').offset();

    if ($(window).width() > 768) {
        $(window).bind('scroll', function () {
            if (navpos) {
                if ($(window).scrollTop() + 100 > navpos.top) {
                    $('.second-navbar').addClass('navbar-fixed-top');
                    $('.first-navbar').removeClass('navbar-fixed-top');
                    $('#head-qr').addClass('direct-down');
                   // $('#head-qr').hide();
                }
                else {
                    $('.first-navbar').addClass('navbar-fixed-top');
                    $('.second-navbar').removeClass('navbar-fixed-top');
                    //$('#head-qr').show();
                    $('#head-qr').removeClass('direct-down');
                }
            }

            if (award) {
                if (($(window).scrollTop() > award.top)) {
                    $('#award .special-col').addClass('animated');
                }
            }
        });
    } else {
        $('#award .special-col').css('opacity', 1);
    }

    $('section, .fake-anchor').each(function () {
        if ($(this).attr('id')) {
            var id = $(this).attr('id');
            var anchor = $('<a></a>').addClass('anchor').attr('id', id + '-anchor');
            $(this).prepend(anchor);
        }
    });
    $('.second-navbar .nav a').each(function () {
        var link = $(this).attr('href');
        if (link && link[0] === '#') {
            $(this).attr('href', link + '-anchor');
        }
    })

    $('.btn-wechat').click(function () {
        $('#head-qr').toggle();
        if ($('#head-qr').css('display') == 'none') {
            setTimeout(function () {
                $(window).one('click', function () { $('#head-qr').show(); });
            }, 150);
        }
    });

    $('.second-navbar .nav a').click(function (e) {
        if ($(this).attr('type') !== 'tab-btn') {
            e.preventDefault();
            $(window).scrollTo($(this).attr('href'), 400, { offset: 100 });
        }
    });

    if ($('.hero').length > 0 && $(window).width() > 768) {
        //heroAnimation();
    }

    $('#sponsors .row >div >div').each(function () {
        var h = $(this).html();
        $(this).html('');
        $(this).append($('<img>').attr('src', './img/sponsor/' + $(this).attr('class') + '.png'));
        var newtext = $('<span></span>').html(h);
        if ($(this).parents('.row').hasClass('trans-all')) {
            newtext.addClass('trans');
        }
        $(this).append(newtext);
    });

    try{
       loadNews();
    }catch(e){

    }

    var lang = getUrlParam('lang') || (localStorage && localStorage.lang);
    if (lang === 'en') {
        $('body').removeClass().addClass('lang-en');
        $('.show-cn').hide();
        $('.show-en').show();
        localStorage.lang = 'en';
        $.i18n.load(translation);
        $('.trans').each(function () {
            $(this)._t($(this).text()).addClass('done');
        });
    } else {
        $('.trans').addClass('done');
        $('body').removeClass().addClass('lang-cn');

        $('.show-cn').show();
        $('.show-en').hide();
        if (getUrlParam('lang') == 'cn') {
            localStorage.lang = 'cn';
        }
    }

    $('#datasecondnav .nav a').click(function (e) {
        if ($(this).attr('target') !== '_blank') {
            e.preventDefault();
            $('.tab-content').hide();
            $($(this).attr('data-target')).show();
            $(window).scrollTo($(this).attr('data-target'), 400, { offset: 100 });
        }
    });
});

var items = ['城市安全', '交通安全', '食品安全', '商圈安全', '环境治理', '社会治安', '生产安全', '信息安全', '金融安全'];

function logoBounce() {
    $('#header-logo .logo-big').addClass('animated');
    setTimeout(function () {
        $('#header-logo .logo-big').removeClass('animated');
    }, 1760);

}

function circleBounceAll() {
    $('.hero .circles div').addClass('animated');
    $('.hero .circles, .hero .wrapper').css({
        top: '50%',
        right: '50%'
    });
    bubbleAnimation(30, '50%', '50%');
    setTimeout(function () {
        $('.hero .circles div').removeClass('animated');
    }, 1260);
}

function imageBounce(idx) {
    $('.hero .circle-1').addClass('animated');
    $('.hero .wrapper .text').text(items[idx]);
    $('.hero .wrapper .pic div').removeClass().addClass('pic-' + idx);
    $('.hero .wrapper').addClass('animated');

    var topR = Math.random() * 60 + 10;
    var RightR = Math.random() * 80;
    $('.hero .circles, .hero .wrapper').css({
        top: topR+'%',
        right: RightR +'%'
    });
    bubbleAnimation(5, topR+'%', RightR+'%');

    setTimeout(function () {
        $('.hero .circle-1').removeClass('animated');
        $('.hero .wrapper').removeClass('animated');
    }, 1200);
}

function heroAnimation() {
    logoBounce();
    setTimeout(circleBounceAll, 500);
    for (var i = 0; i < items.length; i++) {
        setTimeout(imageBounce.bind(this, i), i * 1700 + 2160);
    }
    setTimeout(heroAnimation, items.length * 1700 + 2160);
}

function bubbleAnimation(cnt, top, left) {
    for (var i = 0; i < cnt; i++) {
        var b = $('<div></div>').addClass('bubble');
        $('.hero .bubbles').append(b);
        animateLeft(b, top, left);
    }
}

function animateLeft(obj, top, right) {
    var dirR = Math.random() > 0.5;
    var topR = Math.random() * 140 - 60;
    var speedR = Math.random() * 2000 + 1000;
    var rightR = 0;

    if (dirR)
        rightR = 110;
    else
        rightR = -10;

    $(obj).css({
        'right': right,
        'top': top,
        'opacity': '0',
        'transition': 'all ' + speedR + 'ms',
        '-webkit-transition': 'all ' + speedR + 'ms',
        '-ms-transition': 'all ' + speedR + 'ms',
        '-o-transition': 'all ' + speedR + 'ms',
    });
    setTimeout(function () {
        $(obj).css({
            'right': rightR + '%',
            'top': topR + '%',
            'opacity': '0.8'
        });
    }, 200);

    setTimeout(function () {
        $(obj).remove();
    }, speedR + 200);
}


function loadNews() {
    var cnt = 0;
    for (var i = 0; i < news_list.length; i++) {
        var news = news_list[i];
        var block = $($('#news-template').html());
        console.log(block.find('h4').length);
        if(block.find('h4').length!==0 || news.is_top){
            if(block.find('h4').length===0){
                block.find('.text-block p').text(news.title);
            }else{
                block.find('.body h4').text(news.title);
                block.find('.body p').text(news.description);
                block.find('.site-name').text(news.site);
            }
            block.find('.meta-line p').text(news.published_datetime.slice(0, 10));
            block.find('.meta-line a').attr('href', news.url);
            block.find('.image-block').css('background-image', 'url('+news.image+')');

            $('#news-row').append(block) ;

            cnt += 1;
            if(block.find('h4').length===0 && cnt>=4){
                break;
            }
        }
    }
}