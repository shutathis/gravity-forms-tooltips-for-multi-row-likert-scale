/**
 * 
 */

window.onload = (function(onload, $) {
  return function(event) {
    onload && onload(event);

    /**
     * The plugin gravityformssurvey defines a function window.gsurveyLikertGetRows() which is then called inside an anonymous function. This anonymous function is then
     * bound to the gform_load_field_settings event. As a result, trying to override the HTML by binding to that event does not work.
     */
		var _gsurveyLikertGetRows = window.gsurveyLikertGetRows;
		var _gsurveyLikertRow = window.gsurveyLikertRow;
		var _gsurveyLikertUpdateRowsObject = window.gsurveyLikertUpdateRowsObject;

		function combineRawTextAndToolTip(raw = '', tooltip = '') {
			if ( typeof combineRawTextAndToolTip.counter == 'undefined' ) {
	        combineRawTextAndToolTip.counter = 0;
	    }

	    if ('' == tooltip ) {
	    	return raw;
	    }
			
			var id = `gftt-tooltip-${combineRawTextAndToolTip.counter}${Date.now()}${Math.floor(Math.random()*100)}`;
			var icon = `<i id='${id}' class='gftt-icon gform-theme__no-reset--el' tabindex='0' data-placement='nw-alt'></i>`;
			var text = `<span class='gftt-content' id='${id}-wrap' role='tooltip' aria-hidden='false'><span id='${id}-content' data-tid='${id}' aria-hidden='false'>${tooltip}</span></span>`;
			
			combineRawTextAndToolTip.counter++;
			return `${raw}${icon}${text}`;
			
		}

		window.gsurveyLikertGetRows = function(field) {
			var old_html_string = _gsurveyLikertGetRows(field);
			
			var defaultTexts = [
				'First row',				
				'Second row',					
				'Third row',					
				'Fourth row',					
				'Fifth row'
			];

			var new_dom	= $(old_html_string).each(function(index, element){
				var defaultText = field.gsurveyLikertRows[ index ].text;
				    defaultText = ('undefined' === typeof defaultText) ? defaultTexts[ index ] : defaultText;

				var raw      = field.gsurveyLikertRows[ index ].raw;
				    raw      = ('undefined' === typeof raw) ? defaultText : raw;

				console.log(field, defaultText, field.gsurveyLikertRows[ index ].raw);
				
				var tooltip  = field.gsurveyLikertRows[ index ].tooltip;
				    tooltip  = ('undefined' === typeof tooltip) ? '' : tooltip;

				if ( '' !== tooltip ) {
					field.gftt_choicesEnabled = 2; // Hack to force the plugin to load CSS styles for the tooltip.
				}
				
				var combined = combineRawTextAndToolTip(raw, tooltip);

				var $tooltip   = `<textarea id="tooltip-${index}" class="gform-input gf-tooltips-choice-content-for-likert-rows" placeholder="Tooltip Content" onkeyup="gsurveyLikertUpdateRowsObject(); gsurveyLikertUpdatePreview();">${tooltip}</textarea>`;
				var $combined  = `<input type='hidden' id='gsurvey-likert-row-hidden-${index}' value="${combined}"  class='gsurvey-row-input gsurvey-likert-row-hidden field-choice-hidden field-choice-hidden--likert' onchange="gsurveyLikertUpdateRowsObject(); gsurveyLikertUpdatePreview();" />`;
				var $raw       = `<input type='text' id='gsurvey-likert-row-text-${index}' value="${raw}"  class='gsurvey-row-input gsurvey-likert-row-text field-choice-text field-choice-text--likert' onkeyup="gsurveyLikertUpdateRowsObject(); gsurveyLikertUpdatePreview();" />`;

				$(element)
					.append($combined)
					.append($tooltip)
					.find('input[type="text"]').replaceWith($raw);
			});
		 	return $('<div>').append(new_dom).html();
		}

		window.gsurveyLikertRow = function(text, value, tooltip = '', raw = undefined) {
			this.tooltip = tooltip;
			this.raw = raw;

    	_gsurveyLikertRow.call(this, text, value);
		}

		window.gsurveyLikertUpdateRowsObject = function() {
	    var field = GetSelectedField();
	    $('#gsurvey-likert-rows li').each(function (index) {
	        var value = $(this).children('input.gsurvey-likert-row-id').val();
	        var tooltip = $(this).children('textarea.gf-tooltips-choice-content-for-likert-rows').val();
	        var raw = $(this).children('input.gsurvey-likert-row-text').val();
	        var combined = combineRawTextAndToolTip(raw, tooltip, index);	        

	        var i = $(this).data("index");
	        var g = new window.gsurveyLikertRow(combined, value, tooltip, raw);
	        field.gsurveyLikertRows[i] = g;

	        if ( '' !== tooltip ) {
						field.gftt_choicesEnabled = 2; // Hack to force the plugin to load CSS styles for the tooltip.
					}
	    });
	    window.gsurveyLikertUpdateInputs(field);
		}
  }
}(window.onload, jQuery));

