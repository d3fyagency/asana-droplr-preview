/**
 *
 * Asana Droplr Preview jQuery Plugin
 * This controls the fetching of the droplr image
 *
 * @author www.d3fy.com
 * @param  {[type]} $ [description]
 * @return {[type]}   [description]
 */
(function ($){
  $.fn.asanaDroplrPreview = function(params){
    var defaults = {
      popupOptions: {},
      droplrImageFetcherURL: 'https://dfetch.d3fy.xyz',
      droplrImageFetcherParamKey: 'target_url',
    }

    var settings = $.extend(defaults, params);
    var el = $(this);
    var previewImg = $('<div></div>');

    /**
     *
     * This is just to bridge unsecured url (http) of droplr to secure url (https) via backend process
     *
     * @function getPreviewUrl
     * @param  {[type]} droplrUrl [description]
     * @return {[type]}           [description]
     */
    var getPreviewUrl = function(droplrUrl) {
      return settings.droplrImageFetcherURL + '?' + $.param({[settings.droplrImageFetcherParamKey]: droplrUrl});
    };

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
      img.src = getPreviewUrl(imageUrl);
      img.onload = function() {
        previewImg.css({
          'width': '100%',
          'height': '100%',
          'background-image': 'url("'+ getPreviewUrl(imageUrl) + '")',
          'background-size': 'cover'
        });

        var balloonPopup = $(el).adpBalloonPopup($.extend(settings.popupOptions, {
            contents: previewImg,
            resourceUrl: getPreviewUrl(imageUrl) , //url of the server to bridge https /secured link
            droplrUrl: imageUrl, //droplr url link
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
            resourceUrl: getPreviewUrl(videoUrl), //url of the server to bridge https
            droplrUrl: videoUrl,
            contentType: 'video',
            styles: {
              dimensionRatio: 1280 / 800
            }
          }));

        fn.call(this, balloonPopup);
    };


    this.onReady = function(fn) {

      var url = getPreviewUrl(el.attr('href'));

      //get link header to determine if it is image or video
      //@since this takes the hover preview in 1 - 2 seconds to appear
      //@todo refactor , find another way on how to determine the content-type (video or image)
      var xhttp = new XMLHttpRequest();
      xhttp.open("HEAD", url, true);
      xhttp.send();

      xhttp.onreadystatechange = function () {
        if (this.readyState == this.DONE) {
          var contenType = this.getResponseHeader("Content-Type");

          if (contenType === 'video/quicktime') {
            getPreviewVideo(el.attr('href'), fn);
          } else {
            getPreviewImage(el.attr('href'), fn);
          }
        }
      };

    }

    return this;
  }
}(jQuery));
