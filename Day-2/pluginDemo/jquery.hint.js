$.fn.hint = function(){
	var $that = this;
	$that.each(function(index,elem){
		var $elem = $(elem);
		var hintText = $elem.attr("data-hint");
		$elem.focus(function(){
			if ($elem.val() === hintText){
				$elem.removeClass("hint").val('');
			}
		}).blur(function(){
			if ($elem.val() === ""){
				$elem.addClass("hint").val(hintText);
			}
		});//.trigger('blur');
	});
}