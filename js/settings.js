
/**
 *
 * Script for settings.html or browser_action - default_popup
 * @author www.d3fy.com
 *
 */

 // Main Navebar Tab
 $('#main-tab a').click(function (e) {
   e.preventDefault()
   $(this).tab('show')
 })

 /*
 * Droplr Form Setting
 * @method if
 * @param  {[type]} $ [description]
 * @return {[type]}   [description]
 */
if ($('body').find('#droplr-preview-settings').length > 0) {
  var $droplrForm = $('#droplr-preview-settings');
  var $droplrUrlInput = $droplrForm.find('#droplr-base-url');
  var $saveBtn = $droplrForm.find('#dpl-save-btn');

  chrome.storage.local.get('droplrUrl', function(response) {
    var error = chrome.runtime.lastError;

    if (typeof error === 'undefined' && typeof response.droplrUrl !== 'undefined') {
      $droplrUrlInput.val(response.droplrUrl);
    }
  });

  //save button
  $saveBtn.click(function(e) {
    e.preventDefault();
    var droplrUrl = $.trim($droplrUrlInput.val()),
        $formGroup = $droplrUrlInput.closest('.form-group'),
        $message = $formGroup.find('.help-block');

    $formGroup.removeClass('has-error');
    $formGroup.removeClass('has-success');

    if (droplrUrl.length == 0) {
      $formGroup.addClass('has-error');
      $message.text("This field is required.");
      return;
    } else if (/^(ftp|http|https):\/\/[^ "]+$/.test(droplrUrl) == false) {
      $formGroup.addClass('has-error');
      $message.text("This is invalid url.");
      return;
    }

    //save to browser's local storage
    //@todo exception handling
    chrome.storage.local.set({'droplrUrl': droplrUrl}, function() {
      $formGroup.removeClass('has-error');
      $formGroup.addClass('has-success');
      $message.html('<p class="bg-success">Doplr url is successfully saved....</p>');
    });

    setTimeout(function() {
      $message.text("");
      $formGroup.removeClass('has-success');
    },3000);

  });
}

/**
 *  CloudApp Form Setting
 * @method if
 * @param  {[type]} $ [description]
 * @return {[type]}   [description]
 */
if ($('body').find('#cloudapp-preview-settings').length > 0) {
  var $cloudAppForm = $('#cloudapp-preview-settings');
  var $cloudAppUrlInput = $cloudAppForm.find('#cloudapp-base-url');
  var $saveBtn = $cloudAppForm.find('#cla-save-btn');

  chrome.storage.local.get('cloudAppUrl', function(response) {
    var error = chrome.runtime.lastError;

    if (typeof error === 'undefined' && typeof response.cloudAppUrl !== 'undefined') {
      $cloudAppUrlInput.val(response.cloudAppUrl);
    }
  });

  //save button
  $saveBtn.click(function(e) {
    e.preventDefault();
    var cloudAppUrl = $.trim($cloudAppUrlInput.val()),
        $formGroup = $cloudAppUrlInput.closest('.form-group'),
        $message = $formGroup.find('.help-block');

    $formGroup.removeClass('has-error');
    $formGroup.removeClass('has-success');

    if (cloudAppUrl.length == 0) {
      $formGroup.addClass('has-error');
      $message.text("This field is required.");
      return;
    } else if (/^(ftp|http|https):\/\/[^ "]+$/.test(cloudAppUrl) == false) {
      $formGroup.addClass('has-error');
      $message.text("This is invalid url.");
      return;
    }

    //save to browser's local storage
    //@todo exception handling
    chrome.storage.local.set({'cloudAppUrl': cloudAppUrl}, function() {
      $formGroup.removeClass('has-error');
      $formGroup.addClass('has-success');
      $message.html('<p class="bg-success">CloudApp url is successfully saved....</p>');
    });

    setTimeout(function() {
      $message.text("");
      $formGroup.removeClass('has-success');
    },3000);

  });

}
