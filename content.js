var adpObj, adpPopup;

if($('body').find('.d3fy-droplr-preview-popup-modal').length === 0){
  var modalOverlay = $('<div class="d3fy-droplr-preview-popup-modal-overlay"></div>');
  var modal = $('<div class="d3fy-droplr-preview-popup-modal"></div>');
  var modalCloseBtn = $('<img class="d3fy-droplr-preview-close-btn-img" src="'+chrome.extension.getURL('close_btn.png') + '" />')

  modal.append(modalCloseBtn);

  modalOverlay.append(modal);

  $('body').append(modalOverlay);

  modalOverlay.on('click', function(){
    modalOverlay.hide();
  });

  modal.on('click', function(e){
    e.stopPropagation();

    if(!!$(this).attr('droplr-url')){
      window.open($(this).attr('droplr-url'));
    }
    return false;
  })

  modalCloseBtn.on('click', function(e){
    e.stopPropagation();
    modalOverlay.hide();
  });
}

$('body').on('mouseenter mouseleave', 'a:regex(href, d.pr)', function(event){
  var el = $(this);

    if(event.type === 'mouseenter'){
      adpObj = el.asanaDroplrPreview();
      el.attr('hovered', '1');

      setTimeout(function(){
        adpObj.onReady(function(popup){
          adpPopup = popup;

          if(el.attr('hovered') == '1'){
            popup.show();

            var hoverChecker = setInterval(function(){
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

$(document).keyup(function(e) {
  if (e.keyCode == 27 && $('.d3fy-droplr-preview-popup-modal-overlay').length > 0) {
    $('.d3fy-droplr-preview-popup-modal-overlay').hide();
  }
});
