(function ($){
  $.fn.asanaDroplrPreview = function(params){
    var defaults = {
      popupOptions: {},
      droplrImageFetcherURL: 'https://dfetch.d3fy.xyz',
      droplrImageFetcherParamKey: 'target_url',
    }

    var settings = $.extend(defaults, params);

    var getPreviewImageUrl = function(droplrUrl){
      return settings.droplrImageFetcherURL + '?' + $.param({[settings.droplrImageFetcherParamKey]: droplrUrl});
    }

    var el = $(this);
    var previewImg = $('<div></div>');


    this.onReady = function(fn){
      var img = new Image();
      img.src = getPreviewImageUrl(el.attr('href'));

      img.onload = function(){
        previewImg.css({
          'width': '100%',
          'height': '100%',
          'background-image': 'url("'+ getPreviewImageUrl(el.attr('href')) + '")',
          'background-size': 'cover'
        });

        var balloonPopup = $(el).adpBalloonPopup($.extend(settings.popupOptions, {
            contents: previewImg,
            imgUrl: getPreviewImageUrl(el.attr('href')),
            droplrUrl: el.attr('href'),
            styles: {
              dimensionRatio: img.width / img.height
            }
          }));

        fn.call(this, balloonPopup);
      }
    }

    return this;
  }
}(jQuery));
