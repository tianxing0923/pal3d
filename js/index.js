$(function () {
  var sourceArr = [
    'images/arrow.png',
    'images/mute.png',
    'images/volume.png',
    'images/frame1.png',
    'images/text1_1.png',
    'images/text1_2.png',
    'images/text1_3.png',
    'images/frame2.png',
    'images/text2_1.png',
    'images/text2_2.png',
    'images/text2_3.png',
    'images/text2_4.png',
    'images/frame3.png',
    'images/text3_1.png',
    'images/text3_2.png',
    'images/frame4.png',
    'images/text4_1.png',
    'images/text4_2.png',
    'images/text4_3.png',
    'images/frame5.png',
    'images/text5_1.png',
    'images/text5_2.png',
    'images/text5_3.png',
    'images/text5_4.png',
    'images/text5_5.png',
    'images/frame6.png',
    'images/text6_1.png',
    'images/text6_2.png',
    'images/frame7.png',
    'images/text7_1.png',
    'images/text7_2.png',
    'images/frame8.png',
    'images/text8_1.png',
    'images/text8_2.png',
    'images/text8_3.png',
    'images/text8_4.png',
    'images/frame9.png',
    'images/text9_1.png',
    'images/text9_2.png',
    'images/text9_3.png',
    'images/text9_4.png',
    'images/text9_5.png',
    'images/frame10.png',
    'images/text10_1.png',
    'images/text10_2.png',
    'images/text10_3.png',
    'images/text10_4.png',
    'images/text10_5.png',
    'images/frame11.png',
    'images/slogan.png',
    'images/btn_download.png'
  ];
  var sourceArr2 = [
    'images/sprites1.jpg',
    'images/sprites2.jpg'
  ];
  new mo.Loader(sourceArr, {
    loadType: 1,
    onLoading: function (count, total) {
      var percentage = parseInt(count / total * 100);
      progress(percentage);
    },
    onComplete: function (time) {
      progress(100);
      var $loading = $('#loading'),
        $wrapper = $('#wrapper');
      $wrapper.html($('#tpl').html());
      $loading.removeClass('active');

      $('#fullpage').fullpage({
        afterChange: function (e) {
          setTimeout(function () {
            var $current = $('#fullpage').find('.page').eq(e.cur);
            if ($current.hasClass('page-end')) {
              $('.arrow-wrap').addClass('hide');
            } else {
              $('.arrow-wrap').removeClass('hide');
              $('#fullpage').find('.frame-end').removeClass('loop');
            }
          }, 100);
        }
      });

      var $audio = $('#audio'),
        audio = $audio[0];
      audio.src = 'res/bgm.mp3';
      audio.play();

      setTimeout(function () {
        $loading.addClass('hide');
        $wrapper.addClass('active');
        initListener();
      }, 300);

      new mo.Loader(sourceArr2, {
        loadType: 1,
        onComplete: function (time) {}
      });
    }
  });

  // 进度
  function progress(percentage) {
    $('#load_text').text(percentage + '%');
  }

  // 初始化事件监听
  function initListener() {
    var $wrapper = $('#wrapper'),
      $audio = $('#audio'),
      $music = $('#music'),
      audio = $audio[0];

    // 播放背景音乐
    $audio.on('play', function (e) {
      $music.addClass('playing')
    });
    $audio.on('pause', function (e) {
      $music.removeClass('playing')
    });
    $music.on('touchstart', function (e) {
      $music.hasClass('playing') ? audio.pause() : audio.play();
    });

    $('#fullpage').on('touchstart', function (e) {
      var pageY = e.changedTouches[0].pageY;
      if (pageY < $('#wrapper').height() / 2) {
        $.fn.fullpage.movePrev(true);
      } else {
        $.fn.fullpage.moveNext(true);
      }
    });

    $('#fullpage').on('webkitAnimationEnd', '.frame-end', function() {
      $(this).addClass('loop');
    });
  }
});