$('body').on('mouseenter mouseleave', 'a:regex(href, d3fy.xyz)', function(event){
  var el = $(this);
  var adpObj = $(this).asanaDroplrPreview();

  if(event.type === 'mouseenter'){
    el.attr('hovered', '1');

    setTimeout(function(){
      if(el.attr('hovered') == '1'){
        adpObj.show();
      }
    }, 750);
  }else{
    el.attr('hovered', '0');
    adpObj.hide();
  }
});
