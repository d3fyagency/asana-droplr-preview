
/**
 * Script for settings.html or browser_action - default_popup
 *
 * @author www.d3fy.com
 * @method if
 * @param  {[type]} $ [description]
 * @return {[type]}   [description]
 */
if ($('body').find('#asana-droplr-prev-settings').length > 0) {
  var $form = $('#asana-droplr-prev-settings');
  var $baseUrlInput = $form.find('#droplr-base-url');
  var $saveBtn = $form.find('#setting-save-btn');
  var $message = $form.find('.help-block');
  var $fromGroups = $form.find('.form-group');

  //get droplr Url from storage
  chrome.storage.local.get('droplrUrl', function(response) {
    $baseUrlInput.val(response.droplrUrl);
  });

  //save button
  $saveBtn.click(function(e){
    e.preventDefault();
    var droplrUrl = $.trim($baseUrlInput.val());
    $fromGroups.removeClass('has-error');
    $fromGroups.removeClass('has-success');

    if (droplrUrl.length == 0) {
      $fromGroups.addClass('has-error');
      $message.text("This field is required.");
      return;
    } else if (/^(ftp|http|https):\/\/[^ "]+$/.test(droplrUrl) == false) {
      $fromGroups.addClass('has-error');
      $message.text("This is invalid Droplr url.");
      return;
    }

    //save to browser's local storage
    //@todo exception handling
    chrome.storage.local.set({'droplrUrl': $baseUrlInput.val()}, function() {
      $fromGroups.removeClass('has-error');
      $fromGroups.addClass('has-success');
      $message.text("Doplr url is successfully saved.");
    });

    setTimeout(function() {
      $message.text("");
      $fromGroups.removeClass('has-success');
    },3000);

  });
}
