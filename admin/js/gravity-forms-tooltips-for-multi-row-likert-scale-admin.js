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

		window.gsurveyLikertGetRows = function(field) {
			var old_html_string = _gsurveyLikertGetRows(field);
			var new_dom	= $(old_html_string).each(function(index, element){
				$(element).append(`<textarea id="tooltip-${index}" class="gform-input gf-tooltips-choice-content-for-likert-rows" placeholder="Tooltip Content" onkeyup="gsurveyLikertUpdateRowsObject(); gsurveyLikertUpdatePreview();">${field.gsurveyLikertRows[ index ].tooltip}</textarea>`);
			});
		 	return $('<div>').append(new_dom).html();
		}

		window.gsurveyLikertRow = function(text, value, tooltip = '') {
			this.tooltip = tooltip;

    	_gsurveyLikertRow.call(this, text, value);
		}

		window.gsurveyLikertUpdateRowsObject = function() {
	    var field = GetSelectedField();
	    console.log('hello wolrd');
	    $('#gsurvey-likert-rows li').each(function (index) {
	        var gsurveyLikertRowText = $(this).children('input.gsurvey-likert-row-text').val();
	        var gsurveyLikertRowVal = $(this).children('input.gsurvey-likert-row-id').val();
	        var gsurveyLikertRowTooltip = $(this).children('textarea.gf-tooltips-choice-content-for-likert-rows').val();

	        console.log('gsurveyLikertRowText', gsurveyLikertRowText, 'gsurveyLikertUpdateRowsObject', gsurveyLikertRowTooltip);
	        var i = $(this).data("index");
	        var g = new window.gsurveyLikertRow(gsurveyLikertRowText, gsurveyLikertRowVal, gsurveyLikertRowTooltip);
	        field.gsurveyLikertRows[i] = g;
	    });
	    console.log('field', field);
	    window.gsurveyLikertUpdateInputs(field);
		}
  }
}(window.onload, jQuery));

