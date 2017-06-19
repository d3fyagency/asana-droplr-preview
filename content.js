//special thanks to James Padolsey for this filter
//https://j11y.io/javascript/regex-selector-for-jquery/
jQuery.expr[':'].regex = function(elem, index, match) {
    var matchParams = match[3].split(','),
        validLabels = /^(data|css):/,
        attr = {
            method: matchParams[0].match(validLabels) ?
                        matchParams[0].split(':')[0] : 'attr',
            property: matchParams.shift().replace(validLabels,'')
        },
        regexFlags = 'ig',
        regex = new RegExp(matchParams.join('').replace(/^\s+|\s+$/g,''), regexFlags);
    return regex.test(jQuery(elem)[attr.method](attr.property));
}

var balloonTailHTML = '<img class="balloon-tail-img" src="'+chrome.extension.getURL('balloon-tail.png') + '" />';
var thePopupHTML = '<div class="d3fy-droplr-preview-popup"></div>';

var popupStyles = {
  width: '300px',
  height: '200px',
  position: 'fixed',
  'z-index': '9999998',
  'background-color': 'white',
  border: '2px #000 solid',
  top: '-210px',
  left: '0',
  overflow: 'visible',
  padding: '5px'
};

var balloonTailStyles = {
  position: 'fixed',
  'z-index': '9999999',
};

function fetchDroplrAsset(droplrUrl){
  return $.ajax({
      url: 'https://dfetch.d3fy.xyz?target_url=' + droplrUrl,  //Pass URL here
      type: "GET"
  });
}


$('body').on('mouseenter mouseleave', 'a:regex(href, d3fy.xyz)', function(event){
  var el = $(this);

  if(event.type === 'mouseenter'){
    el.attr('hovered', '1');

    setTimeout(function(){
      if(el.attr('hovered') == '1'){
        el.css({'position': 'relative'});
        var thePopup = $(thePopupHTML);
        var thePreviewImg = $('<div></div>');

        thePopup.css(popupStyles);

        var existingPopup = el.find('.d3fy-droplr-preview-popup');
        var balloonTail = el.find('.balloon-tail-img');


        if(!existingPopup.length){
          thePreviewImg.css({
            'width': '100%',
            'height': '100%',
            'background-image': 'url("https://dfetch.d3fy.xyz?target_url='+el.attr('href')+'")',
            'background-size': 'cover'
          });

          thePopup.append(thePreviewImg);

          el.prepend($(balloonTailHTML).css(balloonTailStyles));
          el.prepend(thePopup);

          existingPopup = el.find('.d3fy-droplr-preview-popup');
          balloonTail = el.find('.balloon-tail-img');
        }

        var leftPos = 0;
        var scrollableParent = el.parents('.scrollable:first');

        if(scrollableParent.length){
          var rightBoundary = scrollableParent.offset().left + scrollableParent.innerWidth();

          if(el.offset().left + 300 > rightBoundary){
            leftPos = rightBoundary - 310;
          }else{
            leftPos = el.offset().left;
          }
        }else{
          leftPos = el.offset().left;
        }

        existingPopup.css({
          'left': leftPos + 'px',
          'top': el.offset().top - 212 + 'px'
        });

        balloonTail.css({
          'left': el.offset().left + Math.floor(el.width() / 2) + 'px',
          'top': el.offset().top + 'px'
        });

        existingPopup.show();
        balloonTail.show();
      }
    }, 750);
  }else{
    el.attr('hovered', '0');
    el.find('.d3fy-droplr-preview-popup, .balloon-tail-img').hide();
  }
});
