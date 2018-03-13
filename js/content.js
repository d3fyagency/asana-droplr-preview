/**
 *
 * Content - initiate Droplr Preview Modal on Asana page
 * Finds droplr Url on asana, which has base URL set on settings.html or browser_action - default_popup
 * @supports cloudApp and Droplr
 * @author www.d3fy.com
 */

var adpObj, adpPopup;

if ($('body').find('.d3fy-asana-preview-popup-modal').length === 0) {
  var modalOverlay = $('<div class="d3fy-asana-preview-popup-modal-overlay"></div>');
  var modal = $('<div class="d3fy-asana-preview-popup-modal"><div class="modal-content"></div></div>');
  var modalCloseBtn = $('<img class="d3fy-asana-preview-close-btn-img" src="' + chrome.extension.getURL('images/close_btn.png') + '" />');

  modal.append(modalCloseBtn);
  modalOverlay.append(modal);

  $('body').append(modalOverlay);

  //modal overlay
  //close droplr/cloudApp preview
  modalOverlay.on('click', function(){
    modalOverlay.hide();
  });

  //redirect to droplr/cloudApp link on modal click
  modal.on('click', function(e){
    e.stopPropagation();

    if(!!$(this).attr('serviceUrl')){
      window.open($(this).attr('serviceUrl'));
    }
    return false;
  })

  //modal close button
  //close droplr/cloudApp  preview
  modalCloseBtn.on('click', function(e){
    e.stopPropagation();
    modalOverlay.hide();
  });
}

//get droplr Url from  browser's local storage
//This is being set in browser_action - default_popup
//@see views/settings.html
chrome.storage.local.get(['droplrUrl','cloudAppUrl'], function(response) {
  var error = chrome.runtime.lastError;

  //check strorage runtime error
  if (typeof error === 'undefined' && (typeof response.droplrUrl !== 'undefined' || typeof response.cloudAppUrl !== 'undefined')) {
    var droplrUrl = response.droplrUrl,
        cloudAppUrl = response.cloudAppUrl;

    //droplr URL on mouseenter/hover
    $('body').on('mouseenter mouseleave', 'a:regex(href, ' + droplrUrl + ')', function(event) {
      var el = $(this);
        if (event.type === 'mouseenter') {

          //show droplr preview on hover
          adpObj = el.asanaDroplrPreview();
          el.attr('hovered', '1');

          setTimeout(function() {
            adpObj.onReady(function(popup) {
              adpPopup = popup;

              if(el.attr('hovered') == '1'){
                popup.show();

                var hoverChecker = setInterval(function() {
                  if(el.attr('hovered') === '0' && adpPopup.popupBox.attr('hovered') === '0'){
                    el.attr('hovered', '0');
                    adpPopup.hide();
                    clearInterval(hoverChecker);
                  }
                }, 300);
              }
            })
          }, 750);
        }else{
          el.attr('hovered', '0')
        }
    }); //end droplr URL on hover

    //cloudApp URL on mouse enter/hover
    $('body').on('mouseenter mouseleave', 'a:regex(href, ' + cloudAppUrl + ')', function(event) {
      var el = $(this);
        if (event.type === 'mouseenter') {

          //show cloudapp preview on hover
          adpObj = el.asanaCloudAppPreview();
          el.attr('hovered', '1');

          setTimeout(function() {
            adpObj.onReady(function(popup) {
              adpPopup = popup;

              if(el.attr('hovered') == '1'){
                popup.show();

                var hoverChecker = setInterval(function() {
                  if(el.attr('hovered') === '0' && adpPopup.popupBox.attr('hovered') === '0'){
                    el.attr('hovered', '0');
                    adpPopup.hide();
                    clearInterval(hoverChecker);
                  }
                }, 300);
              }
            })
          }, 750);

        }else{
          el.attr('hovered', '0')
        }
    }); //end cloudApp URL on mouse enter/hover

  }

});

$(document).keyup(function(e) {
  if (e.keyCode == 27 && $('.d3fy-asana-preview-popup-modal-overlay').length > 0) {
    $('.d3fy-asana-preview-popup-modal-overlay').hide();
  }
});
