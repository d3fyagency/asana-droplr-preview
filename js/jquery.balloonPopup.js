/**
 *
 * Ballon Popup jQuery Plugin
 *
 * -Shows popup buble/tooltip of droplr preview
 *
 * @author www.d3fy.com
 * @param  {[type]} $ [description]
 * @return {[type]}   [description]
 */
(function ($){
  $.fn.adpBalloonPopup = function(params){
    var defaults = {
      thePopupHTML: '<div class="d3fy-asana-preview-popup" hovered="0"></div>',
      styles: {
        height: 200,
        position: 'fixed',
        'z-index': '9999998',
        'background-color': 'white',
        left: '0',
        overflow: 'visible',
        'box-shadow': '0 0 25px rgb(90, 90, 90)',
        'border-radius': '5px',
        'cursor': 'pointer',
        'dimensionRatio': 2
      },
      contents: '',
      contentType: 'image'
    };

    var settings = $.extend(true, {}, defaults, params);

    settings.styles.width = Math.ceil(settings.styles.height * settings.styles.dimensionRatio);

    settings.styles.width += 'px';
    settings.styles.height += 'px';

    var el = $(this);
    var body = $('body');

    var thePopupBox = body.find('.d3fy-asana-preview-popup');

    if(thePopupBox.length > 0){
      thePopupBox.empty();
      thePopupBox.append(settings.contents);
    }else{
      thePopupBox = $(settings.thePopupHTML).append(settings.contents);
      body.append(thePopupBox);
    }
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
      'top': el.offset().top - 202 + 'px'
    });

    thePopupBox.find('.balloon-tail-img').css({
      'left': el.offset().left + Math.floor(el.width() / 2) + 'px',
      'top': el.offset().top - 2 + 'px'
    });

    thePopupBox.on('mouseenter mouseleave', function(event) {
      if(event.type === 'mouseenter'){
        thePopupBox.attr('hovered', '1');
      }else{
        thePopupBox.attr('hovered', '0');
      }
    });

    thePopupBox.on('click', function() {
      var theModal = $('.d3fy-asana-preview-popup-modal:last');
      var theOverlay = $('.d3fy-asana-preview-popup-modal-overlay');

      if (settings.contentType === 'video') {
        theModal.css({
          'background-image': 'none',
        });

        var videoHtml = ' <video style="width:100%; background-color: #ffffff; height:auto;" controls autoplay> ';
        videoHtml += '  <source src="' + settings.resourceUrl + '" type="video/mp4">';
        videoHtml += '  Your browser does not support the video tag. ';
        videoHtml += '</video>';
        theModal.find('.modal-content').html(videoHtml);

      } else {
        theModal.find('.modal-content').html("");
        theModal.css({
          'background-image': 'url("'+ settings.resourceUrl + '")',
          'background-size': 'cover'
        });
      }

      theModal.attr('serviceUrl', settings.serviceUrl);
      theOverlay.show();
    });

    this.show = function(){
      $('.d3fy-asana-preview-popup:last').fadeIn('fast');
    }

    this.hide = function(){
      $('.d3fy-asana-preview-popup:last').fadeOut('fast');
    }

    this.popupBox = thePopupBox;

    return this;
  }
}(jQuery))
