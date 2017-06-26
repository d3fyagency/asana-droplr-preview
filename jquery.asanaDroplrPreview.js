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

    var fetchDroplrAsset = function(droplrUrl){
      return $.ajax({
          url: settings.droplrImageFetcherURL,  //Pass URL here
          type: "GET",
          data: {
            [settings.droplrImageFetcherParamKey]: droplrUrl
          }
      });
    }

    var el = $(this);
    var previewImg = $('<div></div>');

    previewImg.css({
      'width': '100%',
      'height': '100%',
      'background-image': 'url("'+ getPreviewImageUrl(el.attr('href')) + '")',
      'background-size': '100% 100%'
    });

    return $(this).adpBalloonPopup($.extend(settings.popupOptions, {contents: previewImg}));
  }
}(jQuery));