/**
 *
 * Asana CloudApp Preview jQuery Plugin
 * This controls the fetching of the droplr image
 *
 * @author www.d3fy.com
 * @param  {[type]} $ [description]
 * @return {[type]}   [description]
 */
(function ($){
  $.fn.asanaCloudAppPreview = function(params){
    var defaults = {
      popupOptions: {},
      cloudAppDefaultBaseUrl : 'https://cl.ly/',
    }

    var settings = $.extend(defaults, params);
    var el = $(this);
    var previewImg = $('<div></div>');

    /**
     * Displays  image preview on hover
     * @supports image/png, image/gif, image/jpeg content-type
     * @function getPreviewImage
     * @param  {[type]}   imageUrl [description]
     * @param  {Function} fn       [description]
     * @return {[type]}            [description]
     */
    var getPreviewImage = function(imageUrl, fn) {

      var img = new Image();
      img.src = imageUrl;
      img.onload = function() {
        previewImg.css({
          'width': '100%',
          'height': '100%',
          'background-image': 'url("'+ imageUrl  + '")',
          'background-size': 'cover'
        });

        var balloonPopup = $(el).adpBalloonPopup($.extend(settings.popupOptions, {
            contents: previewImg,
            resourceUrl: imageUrl , //url of the server to bridge https /secured link
            serviceUrl: el.attr('href'), //droplr url link
            contentType: 'image',
            styles: {
              dimensionRatio: img.width / img.height
            }
          }));

        fn.call(this, balloonPopup);
      }
    };

    /**
     * Display Video preview
     * It should only show play icon button on hover
     * @method getPreviewVideo
     * @param  {[type]}   videoUrl [description]
     * @param  {Function} fn       [description]
     * @return {[type]}            [description]
     */
    var getPreviewVideo = function(videoUrl, fn) {

        previewImg.css({
          "text-align": "center",
          'width': '100%',
          'height': '100%',
        });

        previewImg.html('<img src="' + chrome.extension.getURL('images/play_file_icon_blue.png') + '"  style="padding:2px;" /> <label style="display:inline-block; width:100%; text-align:center;  font-weight:700;">Play Screencast</label>');

        var balloonPopup = $(el).adpBalloonPopup($.extend(settings.popupOptions, {
            contents: previewImg,
            resourceUrl: videoUrl, //url of the server to bridge https
            serviceUrl: el.attr('href'),
            contentType: 'video',
            styles: {
              dimensionRatio: 1280 / 800
            }
          }));

        fn.call(this, balloonPopup);
    };

    this.onReady = function(fn) {
      var self = this;
      var url = el.attr('href');

      $.get(url, function(cloudAppPage) {
        var $document = $('<div></div>').html(cloudAppPage);
        var $fileUrlEl = $document.find('#download_file_url');
        if ($fileUrlEl.length > 0) {
          var s3Link = $fileUrlEl.attr('href');
          if ((s3Link.substring(s3Link.length - 4)) === '.mov') {
            getPreviewVideo(s3Link,fn);
          } else {
            getPreviewImage(s3Link,fn);
          }
        }
      });
    }

    return this;
  }
}(jQuery));
