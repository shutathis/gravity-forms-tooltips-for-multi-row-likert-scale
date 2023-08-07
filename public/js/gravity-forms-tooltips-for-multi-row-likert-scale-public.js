/**
 * Assign tooltip ids on page load instead of saving them on the database.
 * This fixes the duplication issue when the survey form is duplicated.
 */
(function(t){
    t('document').ready(function(){
        t('.gfttflr-icon').each(function(i, e) {
            var id = `gfttflr-${Math.floor(Math.random() * 1000000)}`;
            t(e)
                .attr('id', id)
                .siblings('.gftt-content').attr('id', `${id}-wrap`)
                .children('span').attr('id', `${id}-content`)
                .data('tid', id);
        });
    });
})(jQuery);