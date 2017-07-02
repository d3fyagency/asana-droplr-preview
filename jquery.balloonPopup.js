(function ($){
  $.fn.adpBalloonPopup = function(params){
    var defaults = {
      balloonTailHTML: '<img class="balloon-tail-img" src="'+chrome.extension.getURL('balloon-tail.png') + '" />',
      thePopupHTML: '<div class="d3fy-droplr-preview-popup"></div>',
      styles: {
        width: '300px',
        height: '200px',
        position: 'fixed',
        'z-index': '9999998',
        'background-color': 'white',
        padding: '5px',
        left: '0',
        border: '2px #000 solid',
        overflow: 'visible'
      },
      balloonTailStyles: {
        position: 'fixed',
        'z-index': '9999999',
      },
      contents: ''
    };

    var settings = $.extend(defaults, params);

    var el = $(this);
    var body = $('body');

    var thePopupBox = body.find('.d3fy-droplr-preview-popup');

    // console.log(thePopupBox.length);

    if(thePopupBox.length > 0){
      thePopupBox.empty();
      thePopupBox.append(settings.contents);
    }else{
      thePopupBox = $(settings.thePopupHTML).append(settings.contents);
      body.append(thePopupBox);
    }

    thePopupBox.append($(settings.balloonTailHTML).css(settings.balloonTailStyles));
    thePopupBox.css( $.extend(settings.styles, {display: 'none'}) );


    var leftPos = el.offset().left;
    var scrollableParent = el.parents('.scrollable:first');

    if(scrollableParent.length){
      var rightBoundary = scrollableParent.offset().left + scrollableParent.innerWidth();

      if(el.offset().left + 300 > rightBoundary){
        leftPos = rightBoundary - 315;
      }else{
        leftPos = el.offset().left;
      }
    }else{
      leftPos = el.offset().left;
    }

    thePopupBox.css({
      left: leftPos + 'px',
      'top': el.offset().top - 212 + 'px'
    });

    thePopupBox.find('.balloon-tail-img').css({
      'left': el.offset().left + Math.floor(el.width() / 2) + 'px',
      'top': el.offset().top + 'px'
    });

    this.show = function(){
      $('.d3fy-droplr-preview-popup:last').fadeIn('fast');
    }

    this.hide = function(){
      $('.d3fy-droplr-preview-popup:last').fadeOut('fast');
    }

    return this;
  }
}(jQuery))
