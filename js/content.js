/**
 *
 * Content - initiate Droplr Preview Modal on Asana page
 * Finds droplr Url on asana, which has base URL set on settings.html or browser_action - default_popup
 * @author www.d3fy.com
 */

var adpObj, adpPopup;

if ($('body').find('.d3fy-droplr-preview-popup-modal').length === 0) {
  var modalOverlay = $('<div class="d3fy-droplr-preview-popup-modal-overlay"></div>');
  var modal = $('<div class="d3fy-droplr-preview-popup-modal"></div>');
  var modalCloseBtn = $('<img class="d3fy-droplr-preview-close-btn-img" src="'+chrome.extension.getURL('images/close_btn.png') + '" />')

  modal.append(modalCloseBtn);

  modalOverlay.append(modal);

  $('body').append(modalOverlay);

  //modal overlay
  //close droplr preview
  modalOverlay.on('click', function(){
    modalOverlay.hide();
  });

  //redirect to drolr link on modal click
  modal.on('click', function(e){
    e.stopPropagation();

    if(!!$(this).attr('droplr-url')){
      window.open($(this).attr('droplr-url'));
    }
    return false;
  })

  //modal close button
  //close droplr preview
  modalCloseBtn.on('click', function(e){
    e.stopPropagation();
    modalOverlay.hide();
  });
}

//get droplr Url from  browser's local storage
//This is being set in browser_action - default_popup
//@see views/settings.html
chrome.storage.local.get('droplrUrl', function(response) {
  var droplrUrl = response.droplrUrl;
  $('body').on('mouseenter mouseleave', 'a:regex(href, ' + droplrUrl + ')', function(event) {
    var el = $(this);
      console.log(el.attr('href'));
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
              }, 500);
            }
          })
        }, 750);
      }else{
        el.attr('hovered', '0')
      }
  });
});


$(document).keyup(function(e) {
  if (e.keyCode == 27 && $('.d3fy-droplr-preview-popup-modal-overlay').length > 0) {
    $('.d3fy-droplr-preview-popup-modal-overlay').hide();
  }
});
