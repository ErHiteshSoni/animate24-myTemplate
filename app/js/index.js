'use strict';
window.HELP_IMPROVE_VIDEOJS = false;

function VideoPlayer() {
  var videoElem = document.createElement('VIDEO');
  //videoElem.setAttribute('src', './app/img/imperia_flight.mp4');
  videoElem.setAttribute('src', './app/img/_-Main Composition_low quality.mp4');
  videoElem.setAttribute('class', 'video-js vjs-fluid');
  videoElem.setAttribute('webkit-playsinline', '');
  videoElem.setAttribute('playsinline', '');
  videoElem.setAttribute('id', 'js--video-player');
  this.video = videoElem;
}

VideoPlayer.prototype.animationStart = (function(el) {
  var animations = {
    animation: 'animationstart',
    OAnimation: 'oAnimationStart',
    MozAnimation: 'mozAnimationStart',
    WebkitAnimation: 'webkitAnimationStart',
  };

  for (var t in animations) {
    if (el.style[t] !== undefined) {
      return animations[t];
    }
  }
})(document.createElement('div'));

VideoPlayer.prototype.animationEnd = (function(el) {
  var animations = {
    animation: 'animationend',
    OAnimation: 'oAnimationEnd',
    MozAnimation: 'mozAnimationEnd',
    WebkitAnimation: 'webkitAnimationEnd',
  };
  for (var t in animations) {
    if (el.style[t] !== undefined) {
      return animations[t];
    }
  }
  animateFinish();
})(document.createElement('div'));

VideoPlayer.prototype.fetchData = function(uri, callback) {
  var self = this;
  fetch(uri)
    .then(function(response) {
      return response.json();
    })
    .then(function(myJson) {
      self.data = myJson;
      callback();
    });
};


VideoPlayer.prototype.init = function() {
  var self = this;
  var video = self.video;
  this.fetchData('data.json', function callback() {

    VideoPlayer.prototype.divideWordIntoLetters();

    // retargeting video element
    video = document.getElementsByClassName('vjs-tech')[0];
    CHARLIE.setup(video);
    return;
  });


  $('#videoPlayerWrapper').append(video);
  self.myPlayer = videojs('js--video-player', {
    controls: true,
    autoplay: false,
    preload: false,
  });

  self.myPlayer.el_.addEventListener(
    'webkitfullscreenchange',
    function() {
      self.handleFullScreen.call(this, event)
    }
  );
  var currentTime = 0;

  //This example allows users to seek backwards but not forwards.
  //To disable all seeking replace the if statements from the next
  //two functions with myPlayer.currentTime(currentTime);

  self.myPlayer.on('seeking', function(event) {
    if (currentTime < self.myPlayer.currentTime()) {
      self.myPlayer.currentTime(currentTime);
    }
  });

  self.myPlayer.on('seeked', function(event) {
    if (currentTime < self.myPlayer.currentTime()) {
      self.myPlayer.currentTime(currentTime);
    }
  });
  self.myPlayer.on('ended', function() {

    self.myPlayer.posterImage.show();
    $(this.posterImage.contentEl()).show();
    $(this.bigPlayButton.contentEl()).show();
    self.myPlayer.currentTime(0);
    self.myPlayer.controlBar.hide();
    self.myPlayer.bigPlayButton.show();
    self.myPlayer.cancelFullScreen();

  });
  self.myPlayer.on('play', function() {
    self.myPlayer.posterImage.hide();
    self.myPlayer.controlBar.show();
    self.myPlayer.bigPlayButton.hide();
  });
  $("#textAnimationBlock a").on('click',function () {
    self.myPlayer.pause();
  });
};


var vPlayer = new VideoPlayer(),
  video = vPlayer.video,
  textAnimationBlock = document.getElementById('textAnimationBlock');

VideoPlayer.prototype.handleFullScreen = function(event) {
  var self = this;
  console.log('handleFullScreen', event);
  /* Fullscreen */
  lockScreenInLandscape();

  function requestFullscreenVideo() {
    if (videoPlayerWrapper.requestFullscreen) {
      videoPlayerWrapper.requestFullscreen();
    } else {
      video.webkitEnterFullscreen();
    }
  }

  if ('orientation' in screen) {
    screen.orientation.addEventListener('change', function() {
      // Let's automatically request fullscreen if user switches device in landscape mode.
      if (screen.orientation.type.startsWith('landscape')) {
        // Note: It may silently fail in browsers that don't allow requesting
        // fullscreen from the orientation change event.
        // https://github.com/whatwg/fullscreen/commit/e5e96a9da944babf0e246980559cd80a46a300ca
        requestFullscreenVideo();
      } else if (document.fullscreenElement) {
        document.exitFullscreen();
      }
    });
  }

  function lockScreenInLandscape() {
    if (!('orientation' in screen)) {
      return;
    }

    // Let's force landscape mode only if device is in portrait mode and can be held in one hand.
    if (
      matchMedia('(orientation: portrait) and (max-device-width: 768px)')
        .matches
    ) {
      screen.orientation.lock('landscape').then(function() {
        // When screen is locked in landscape while user holds device in
        // portrait, let's use the Device Orientation API to unlock screen only
        // when it is appropriate to create a perfect and seamless experience.
        listenToDeviceOrientationChanges();
      });
    }
  }

  function listenToDeviceOrientationChanges() {
    if (!('DeviceOrientationEvent' in window)) {
      return;
    }

    var previousDeviceOrientation, currentDeviceOrientation;
    window.addEventListener(
      'deviceorientation',
      function onDeviceOrientationChange(event) {
        // event.beta represents a front to back motion of the device and
        // event.gamma a left to right motion.
        if (Math.abs(event.gamma) > 10 || Math.abs(event.beta) < 10) {
          previousDeviceOrientation = currentDeviceOrientation;
          currentDeviceOrientation = 'landscape';
          return;
        }
        if (Math.abs(event.gamma) < 10 || Math.abs(event.beta) > 10) {
          previousDeviceOrientation = currentDeviceOrientation;
          // When device is rotated back to portrait, let's unlock screen orientation.
          if (previousDeviceOrientation == 'landscape') {
            screen.orientation.unlock();
            window.removeEventListener(
              'deviceorientation',
              onDeviceOrientationChange
            );
          }
        }
      }
    );
  }
};



// };
// var vPlayer = new VideoPlayer (),
//   video = vPlayer.video,
//   textAnimationBlock = document.getElementById ('textAnimationBlock');

VideoPlayer.prototype.divideWordIntoLetters = function (month,id,time,time2,animateClass,animateClass2) {
  var word = month;
  var str = word.split ('');
  var i = 0;
  $.each (str, function (index) {
    // идем по массиву
    if(i*5 >= 10){
      var x =("" + time).split(".")[1];
      if(+x === 9){
        time += 0.1;
        i=0;
        time = +time.toFixed(2);
      }else{
        time += 0.1;
        i=0;
        time = +time.toFixed(2);
      }
    };
    if( Number.isInteger(time) === true){
      time+=0.05;
    }

    $(id).append (
      '<span class="charlie" data-animations="'+ animateClass +','+ animateClass2 +'" data-times=" '+ time +','+ time2 +
      (i*5) +
      '">' +
      (this == ' ' ? '&nbsp;' : this) +
      '</span>'
    );
    i++;
  });
};


VideoPlayer.prototype.divideWordIntoLetters = function () {
  var animation = {
    block: {
      height:$('#greeting').clientHeight,
      width:$('#greeting').clientWidth
    },
    position:{
      x:[143.097,145.477,147.851,150.221,152.581,154.928,157.26,159.574,161.843,164.089,166.316,168.522,170.704,172.877,175.012,177.08,179.087,181.037,182.925,184.741,186.489,188.166,189.757,191.225,192.591,193.844,194.974,195.989,196.879,197.631,198.252,198.701,199.009,199.234,199.422,199.611,199.798,199.98,200.156,200.328,200.506,200.679,200.839,200.998,201.149,201.292,201.432,201.598,201.742,201.88,202.01,202.126,202.26,202.374,202.484,202.599,202.71,202.841,202.943,203.042,203.149,203.281,203.474],
      y:[456.946,456.988,457.036,457.092,457.154,457.222,457.3,457.383,457.469,457.558,457.647,457.739,457.833,457.929,458.027,458.123,458.221,458.322,458.423,458.524,458.628,458.735,458.844,458.951,459.06,459.17,459.281,459.392,459.504,459.616,459.732,459.846,459.962,460.079,460.195,460.312,460.429,460.549,460.67,460.791,460.911,461.034,461.155,461.276,461.4,461.524,461.646,461.771,461.896,462.019,462.143,462.268,462.392,462.515,462.64,462.764,462.887,463.011,463.135,463.258,463.377,463.493,463.6]
    },
    rotation:[2.02728,2.02718,2.02717,2.02667,2.02485,2.02253,2.02064,2.01822,2.0117,2.00306,1.99321,1.98254,1.97253,1.96412,1.95567,1.94387,1.92993,1.9155,1.90056,1.88602,1.87227,1.8583,1.84341,1.82605,1.80871,1.79062,1.7704,1.75111,1.73238,1.71308,1.6945,1.67343,1.6549,1.63579,1.61154,1.58843,1.56538,1.5425,1.51871,1.49427,1.47116,1.44858,1.4243,1.40018,1.37566,1.35046,1.32448,1.30397,1.2804,1.25598,1.23091,1.20457,1.18152,1.15632,1.13184,1.10807,1.08511,1.06409,1.04094,1.01766,0.994945,0.972172,0.950933],
    scale:[
      0.9489,0.9492,0.9497,0.9505,0.9512,0.9521,0.9529,0.9538,0.9548,0.9556,0.9563,0.9571,0.9580,0.9591,0.9602,0.9611,0.9619,0.9628,0.9636,	0.9644,	0.9653,	0.9663,	0.9674,	0.9682,	0.9692,	0.9701,	0.9708,	0.9716,	0.9725,	0.9733,	0.9744,	0.9752,	0.9763,	0.9773,	0.9780,	0.9787,	0.9795,	0.9804,	0.9812,	0.9820,	0.9829,	0.9838,	0.9846,	0.9853,	0.9861,	0.9869,	0.9876,	0.9886,	0.9894,	0.9903,	0.9911,	0.9917,	0.9926,	0.9933,	0.9940,	0.9948,	0.9957,	0.9967,	0.9975,	0.9982,	0.9991,	1,	1.1
    ]
  };
  var animateCss = '@keyframes greeting {'+
  ' ';
  var procent = 100/62;
  var i = 0;
  var procentAnimate = 0;
  while(procentAnimate <= 100){
    console.log(procentAnimate);
    animateCss+= procentAnimate + '%{transform: translate('+ animation.position.x[i] +'px,'+ animation.position.y[i]
      +'px )scale('+ animation.scale[i]+')rotate('+ animation.rotation[i] +'deg); } ' +
      '';
    procentAnimate += procent;
    procentAnimate = +procentAnimate.toFixed(3);
    i++;
  }

  animateCss += '}' +
    '.greeting{animation: greeting 3.5s linear;}';
  var style = document.createElement("style");
  style.innerHTML = animateCss;
  $('head').append(style);

};































































































































$(document).ready(function() {

  vPlayer.init();
  $('.vjs-fluid').append(textAnimationBlock);
  textAnimationBlock.classList.add('is-ready');


  // detect iOS full screen
  var iOS = !!navigator.platform && /iPad|iPhone|iPod/.test(navigator.platform);

  if(iOS) {
    $('.vjs-fullscreen-control').hide();

    $('.vjs-play-control').hide();

  }

  var ua = navigator.userAgent.toLowerCase();
  var isAndroid = ua.indexOf("android") > -1;
  if (isAndroid) {
    $('.vjs-fullscreen-control').hide();

    $('.vjs-play-control').hide();
  }

  // iOS special treatment
  var vidEl = document.getElementsByClassName('vjs-tech')[0];
  vidEl.addEventListener('pause', function() {

    if(iOS) {
      $('.charlie').each(function(){
        if ($(this).hasClass('animated')) {
          $(this).css('-webkit-transform', $(this).css('-webkit-transform'))
        }
      })
    }
  })

  //controlbar at bottom
  function controlbarAtBottom() {
    var height = $('.vjs-control-bar').height();
    $('.vjs-control-bar').css('bottom', '-' + height + 'px');
  }
  controlbarAtBottom();
  window.addEventListener('resize', controlbarAtBottom);
  window.addEventListener('orientationchange', controlbarAtBottom);


  console.log(self.myPlayer);
});