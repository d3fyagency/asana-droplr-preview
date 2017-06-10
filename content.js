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

var popupStyles = {
  width: '300px',
  height: '200px',
  position: 'absolute',
  'background-color': 'white',
  border: '2px #000 solid',
  top: '-210px',
  left: '0'
};

var thePopupHTML = $('<div class="d3fy-droplr-preview-popup"></div>')

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
        var existingPopup = el.find('.d3fy-droplr-preview-popup');

        if(existingPopup.length){
          existingPopup.show();
        }else{
          thePopup.css(popupStyles);
          var leftPos = el.innerWidth() - 300;
          thePopup.css({
            'background-image': 'url("https://dfetch.d3fy.xyz?target_url='+el.attr('href')+'")',
            'background-size': 'cover',
            'left': leftPos + 'px'
          });
          el.prepend(thePopup);
          thePopup.show();
        }
      }
    }, 750);
  }else{
    el.attr('hovered', '0');
    el.find('.d3fy-droplr-preview-popup').hide();
  }
});
