'use strict';
window.HELP_IMPROVE_VIDEOJS = false;

function VideoPlayer() {
  var videoElem = document.createElement('VIDEO');

  videoElem.setAttribute('src', './app/img/imperia_flight.mp4');
  //videoElem.setAttribute('src', './app/img/_-Main Composition_low quality.mp4');
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

    VideoPlayer.prototype.addAnimate1();
    VideoPlayer.prototype.addAnimate2();

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

  // self.myPlayer.on('seeking', function(event) {
  //   if (currentTime < self.myPlayer.currentTime()) {
  //     self.myPlayer.currentTime(currentTime);
  //   }
  // });
  //
  // self.myPlayer.on('seeked', function(event) {
  //   if (currentTime < self.myPlayer.currentTime()) {
  //     self.myPlayer.currentTime(currentTime);
  //   }
  // });
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
VideoPlayer.prototype.addAnimate1 = function () {
  var animation = {
    block: {
      height:$('#greeting').height(),
      width: $('#greeting').width()
    },
    position:{
      x:[181.06,181.06,183.76,186.514,189.355,192.102,194.846,194.846,197.654,200.42,203.144,205.854,208.625,208.625,211.293,213.958,216.5	 ,219.103,221.683,221.683,224.09,226.559,228.853,231.211,233.464,233.464,235.447,237.697,239.437,241.502,243.21,243.21,244.644,246.31,247.405,248.402,249.664,249.664,250.685,251.259,251.671,252.129,252.803,252.803,253.626,254.296,254.835,255.337,255.712,255.712,256.188,256.818,257.524,258.124,258.707,258.707,259.032,259.417,259.87,260.564,261.194,261.194,261.784,262.216,262.581,263.083,263.596,263.596,264.095,264.647,265.08,265.543,266.007,266.007,266.384,266.821,267.493,268.23,269.13,269.13,270.173,271.353,272.961,274.835,277.179,277.179,279.99,283.948,289.495,299.93,309.636,309.636,324.29,352.216,384.556,428.469,490.727,490.727,525.792,518.323,518.323,518.323,518.323,
      ],
      y:[476.592,476.592,476.501,476.566,476.505,476.381,476.442,476.442,476.431,476.416,476.454,476.458,476.481,476.481,476.401,476.545,476.591,476.687,476.665,476.665,476.672,476.799,476.918,477.001,477.042,477.042,477.098,477.112,477.29,477.341,477.439,477.439,477.514,477.489,477.766,477.844,477.856,477.856,478.013,478.174,478.364,478.433,478.552,478.552,478.566,478.7,478.859,479.179,479.29,479.29,479.473,479.563,479.675,479.899,480.032,480.032,480.341,480.468,480.671,480.862,481.124,481.124,481.334,481.593,481.759,481.977,482.115,482.115,482.286,482.656,482.87,483.018,483.212,483.212,483.386,483.643,483.897,484.04,484.243,484.243,484.432,484.649,484.825,484.854,484.978,484.978,485.065,484.991,484.842,484.357,485.133,485.133,486.022,487.693,489.885,491.774,495.003,495.003,499.863,525.776,525.776,525.776,525.776
      ],
      //x:[143.097,145.477,147.851,150.221,152.581,154.928,157.26,159.574,161.843,164.089,166.316,168.522,170.704,172.877,175.012,177.08,179.087,181.037,182.925,184.741,186.489,188.166,189.757,191.225,192.591,193.844,194.974,195.989,196.879,197.631,198.252,198.701,199.009,199.234,199.422,199.611,199.798,199.98,200.156,200.328,200.506,200.679,200.839,200.998,201.149,201.292,201.432,201.598,201.742,201.88,202.01,202.126,202.26,202.374,202.484,202.599,202.71,202.841,202.943,203.042,203.149,203.281,203.474],
      //y:[456.946,456.988,457.036,457.092,457.154,457.222,457.3,457.383,457.469,457.558,457.647,457.739,457.833,457.929,458.027,458.123,458.221,458.322,458.423,458.524,458.628,458.735,458.844,458.951,459.06,459.17,459.281,459.392,459.504,459.616,459.732,459.846,459.962,460.079,460.195,460.312,460.429,460.549,460.67,460.791,460.911,461.034,461.155,461.276,461.4,461.524,461.646,461.771,461.896,462.019,462.143,462.268,462.392,462.515,462.64,462.764,462.887,463.011,463.135,463.258,463.377,463.493,463.6],
      percent:{
        x:[],
        y:[]
      }
    },
    rotation:[2.02728,2.02718,2.02717,2.02667,2.02485,2.02253,2.02064,2.01822,2.0117,2.00306,1.99321,1.98254,1.97253,1.96412,1.95567,1.94387,1.92993,1.9155,1.90056,1.88602,1.87227,1.8583,1.84341,1.82605,1.80871,1.79062,1.7704,1.75111,1.73238,1.71308,1.6945,1.67343,1.6549,1.63579,1.61154,1.58843,1.56538,1.5425,1.51871,1.49427,1.47116,1.44858,1.4243,1.40018,1.37566,1.35046,1.32448,1.30397,1.2804,1.25598,1.23091,1.20457,1.18152,1.15632,1.13184,1.10807,1.08511,1.06409,1.04094,1.01766,0.994945,0.972172,0.950933],
    scale:[
      0.9489,0.9492,0.9497,0.9505,0.9512,0.9521,0.9529,0.9538,0.9548,0.9556,0.9563,0.9571,0.9580,0.9591,0.9602,0.9611,0.9619,0.9628,0.9636,	0.9644,	0.9653,	0.9663,	0.9674,	0.9682,	0.9692,	0.9701,	0.9708,	0.9716,	0.9725,	0.9733,	0.9744,	0.9752,	0.9763,	0.9773,	0.9780,	0.9787,	0.9795,	0.9804,	0.9812,	0.9820,	0.9829,	0.9838,	0.9846,	0.9853,	0.9861,	0.9869,	0.9876,	0.9886,	0.9894,	0.9903,	0.9911,	0.9917,	0.9926,	0.9933,	0.9940,	0.9948,	0.9957,	0.9967,	0.9975,	0.9982,	0.9991,	1,	1.1
    ]
  };
  var animateCss = '@keyframes greeting {';
  var percent = 100/62;
  var i = 0;
  var percentAnimate = 0;

  //console.log((143.097-(animation.block.width/2))/(640/100) );
  //console.log( 0.56 *(640/100) + (animation.block.width/2));


  animation.position.percent.x = animation.position.x.map( function(posX){
    var pos = (posX-(animation.block.width/2))/(640/100);
      return  +pos.toFixed(2);
  });
  animation.position.percent.y = animation.position.y.map( function(posY){
    var pos = (posY-(animation.block.height/2))/(800/100);
      return +pos.toFixed(2);
  });

  while(percentAnimate <= 100){
    animateCss+= percentAnimate + '%{transform: translate('+ animation.position.percent.x[i] +'%,'+ animation.position.percent.y[i]
      +'% )scale('+ animation.scale[i]+')rotate('+ animation.rotation[i] +'deg); } ' +
      '';
    percentAnimate = +(percent + percentAnimate).toFixed(3);
    i++;
  }

  animateCss += '}' +
    '.greeting{animation: greeting 2.9s linear;}';
  var style = document.createElement("style");
  style.innerHTML = animateCss;
  $('head').append(style);
};


VideoPlayer.prototype.addAnimate2 = function () {
  var animation = {
    block: {
      height:$('#name').height(),
      width: $('#name').width()
    },
    position:{
      x:[134,144,154,164,174,184,194,204,214,224,234,244,254,264,274,284,294,304,313.818,321.164,327.361,332.41,336.269,338.914,340.201,339.901,338.741,337.621,336.56,335.571,334.624,333.736,332.852,331.958,331.071,330.173,329.265,328.345,327.39,326.402,325.398,324.37,323.33,322.252,321.154,320.044,318.909,317.75,316.562,315.34,314.136,312.89,311.642,310.381,309.138,307.896,306.663,305.389,304.102,302.767,301.378,299.959,298.494,296.975,295.422,293.822,292.201,290.522,288.812,287.086,285.325,283.533,281.723,279.913,278.104,276.295,274.48,272.69,270.918,269.2,267.498,265.861,264.284,262.752,261.261,259.789,258.378,256.933,255.535,254.136,252.729,251.3,249.867,249.661,249.43,249.17,248.899,248.602,248.275,262.111,285.656,316.401,330.112,329.621,329.107,328.535,327.938,327.346,326.766,326.189,325.648,325.122,324.616,324.14,323.692,323.294,322.904,322.546,322.203,321.893,321.584,321.287,320.973,320.628,320.628,320.628,320.628,320.628,320.628,320.628,320.628,320.628,320.628,320.628,320.628,320.628	],
      y:[326.5,326.5,326.5,326.5,326.5,326.5,326.5,326.5,326.5,326.5,326.5,326.5,326.5,326.5,326.5,326.5,326.5,326.5,326.154,323.965,322.158,320.424,318.83,317.394,316.108,314.93,313.93,313.048,312.243,311.461,310.736,310.105,309.554,309.056,308.702,308.469,308.287,308.182,308.209,308.3,308.497,308.729,309.023,309.415,309.888,310.423,311.03,311.689,312.396,313.184,314.067,314.95,315.861,316.812,317.834,318.688,319.353,319.891,320.428,320.941,321.43,321.975,322.503,323.102,323.703,324.366,325.105,325.824,326.621,327.475,328.417,329.394,330.493,331.611,332.813,334.054,335.417,336.762,338.238,339.759,341.394,343.064,344.788,346.624,348.464,350.357,352.319,354.355,356.474,358.627,360.81,362.965,365.138,367.15,369.068,370.883,372.629,374.324,375.991,377.685,379.784,381.766,383.476,385.012,386.611,388.211,389.847,391.45,392.995,394.587,396.102,397.653,399.168,400.706,402.217,403.78,405.344,406.919,408.566,410.22,411.956,413.779,415.656,417.622,417.622,417.622,417.622,417.622,417.622,417.622,417.622,417.622,417.622,417.622,417.622,417.622],
      percent:{
        x:[],
        y:[]
      }
    },
    rotation:[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0.06,0.10,0.17,0.27,0.37,0.40,0.48,0.62,0.71,0.80,0.89,0.96,1.06,1.13,1.21,1.27,1.37,1.44,1.45,1.56,1.65,1.78,1.85,1.94,2.01,2.09,2.14,2.20,2.20,2.26,2.30,2.35,2.35,2.39,2.41,2.44,2.45,2.48,2.49,2.53,2.59,2.62,2.62,2.63,2.68,2.73,2.76,2.84,2.86,2.91,2.96,3.01,3.05,3.12,3.18,3.22,3.26,3.29,3.32,3.30,3.33,3.37,3.39,3.42,3.44,3.46,3.45,3.50,3.51,3.54,3.56,3.58,3.57,3.58,3.59,3.58,3.59,3.59,3.61,3.61,3.74,4.59,5.41,5.80,5.79,5.81,5.82,5.86,5.87,5.89,5.93,5.94,5.96,5.98,6.01,6.01,6.02,6.06,6.07,6.07,6.12,6.14,6.15,6.18,6.19,6.19,6.19,6.19,6.19,6.19,6.19,6.19,6.19,6.19,6.19,6.19,6.19,
    ],
    scale:[
      0.954,0.954,0.954,0.954,0.954,0.954,0.954,0.954,0.954,0.954,0.954,0.954,0.954,0.954,0.954,0.954,0.954,0.954,0.954,0.955,0.956,0.957,0.958,0.959,0.960,0.961,0.961,0.962,0.963,0.964,0.966,0.967,0.968,0.969,0.970,0.970,0.970,0.970,0.971,0.972,0.973,0.973,0.974,0.974,0.974,0.974,0.973,0.972,0.972,0.972,0.971,0.970,0.970,0.970,0.968,0.967,0.967,0.966,0.965,0.965,0.964,0.963,0.962,0.961,0.961,0.960,0.961,0.960,0.959,0.959,0.960,0.959,0.958,0.958,0.958,0.958,0.957,0.956,0.956,0.955,0.955,0.954,0.954,0.953,0.953,0.952,0.952,0.951,0.951,0.951,0.951,0.950,0.950,0.950,0.950,0.950,0.950,0.950,0.949,0.949,0.947,0.947,0.947,0.946,0.947,0.947,0.949,0.949,0.951,0.952,0.955,0.957,0.960,0.962,0.964,0.967,0.971,0.975,0.978,0.983,0.988,0.994,1,1,1,1,1,1,1,1,1,1,1,1,1,1
    ]
  };
  var animateCss = '@keyframes animate3 {';
  var percent = 100/136;
  var i = 0;
  var percentAnimate = 0;

  animation.position.percent.x = animation.position.x.map( function(posX){
    var pos = (posX-(animation.block.width/2))/(640/100);
    return  +pos.toFixed(2);
  });
  animation.position.percent.y = animation.position.y.map( function(posY){
    var pos = (posY-(animation.block.height/2))/(800/100);
    return +pos.toFixed(2);
  });

  while(percentAnimate < 100){
    animateCss+= percentAnimate + '%{transform: translate('+ animation.position.percent.x[i] +'%,'+ animation.position.percent.y[i]
      +'% )scale('+ animation.scale[i]+')rotate('+ animation.rotation[0] +'deg); } ' +
      '';
    percentAnimate = +(percent + percentAnimate).toFixed(3);
    i++;
  }

  animateCss += '}' +
    '.animate3{animation: animate3 5.44s linear;}';
  animateCss += '@keyframes animate-end {' +
    '  from {' +
    'transform: translate('+ animation.position.percent.x[135] +'%,'+ animation.position.percent.y[135]+
    '% )scale('+ animation.scale[135]+')rotate('+ animation.rotation[0] +'deg);'+
    '    opacity: 1; }' +
    '  to {' +
    '    opacity: 0;' +
    'transform: translate('+ animation.position.percent.x[135] +'%,'+ animation.position.percent.y[135]+
    '% )scale('+ animation.scale[135]+')rotate('+ animation.rotation[0] +'deg);'+
    '  }' +
    '}' +
    '.animate-end {' +
    '  animation: animate-end 0.3s linear;' +
    '}';
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