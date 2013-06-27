/**
 * Bogdan Select Box js.
 * @author      Bogdan Constantinescu <bogstar007@yahoo.com>
 * @since       2013.06.25
 */
"use strict";

(function($) {
    
    /**
     * The new jQuery functionality "selectbogbox"
     * @return  object  The jQuery instance
     */
    $.fn.selectbogbox = function(options, value) {
        init(this, options, value);
        return this;
    }
    
    
    
    /**
     * Inits select box.
     * @param   obj     object  JQuery instance
     * @param   option  string  An option as 'disable', 'enable', 'change';
     * @param   value   string  Extra param for 'change' option.
     * @return          void
     */
    function init(obj, option, value) {
        obj.each(function() {
            if ($(this).prop('tagName') != 'SELECT') return;
            $(this).css('display', 'none');

            if (option == 'disable') {
                $(this).attr('disabled', 'disabled');
            } else if (option == 'enable') {
                $(this).removeAttr('disabled');
            } else if (option == 'change' && value != null) {
                $(this).find('option').removeAttr('selected');
                $(this).find('option[value="' + value + '"]').attr('selected', 'selected');
                $(this).change();
            }
            
            $(this).next('div.bogdan-select-box').remove();

            var container = $('<div />');
            container.addClass('bogdan-select-box')
                     .width($(this).width())
                     .html('<span>' + $(this).find('option:selected').last().text() + '</span>')
                     .append(cloneSelect($(this)));
            
            if ($(this).is(':disabled')) {
                container.addClass('bsbDisabled');
                container.unbind('click');
            } else {
                container.removeClass('bsbDisabled');
                container.bind('click', function(ev) {
                    container.find('ul').fadeToggle('fast', 'linear');
                    ev.stopPropagation();
                });
            }
                
            $(this).after(container);
        });
            
        $(window).click(function(ev){
            $('div.bogdan-select-box').find('ul').hide();
        });
            
        $('div.bogdan-select-box ul li').hover(
            function() {
                $(this).addClass('hover');
            },
            function() {
                $(this).removeClass('hover');
            }
        );
    }
    
    
    
    /**
     * Clones select option into an <ul>.
     * @param   objSelect       object      The <select> jQuery object.
     * @return                  object      The <ul> jQuery object.
     */
    function cloneSelect(objSelect)
    {
        var objReturnValue = $('<ul />');
        
        objSelect.find('option').each(function() {
            objReturnValue.append('<li' + ($(this).attr('selected') == 'selected' ? ' class="selected"' : '') + ' rel="' + $(this).val() + '">' + $(this).text() + '</li>' + "\n");
        });
        if (objReturnValue.find('li[class*="selected"]').length == 0) {
            objReturnValue.find('li[rel="' + objSelect.find('option:selected').val() + '"]').addClass('selected');
        }
        objReturnValue.find('li').click(function() {
            $(this).parents('div').first().find('span').first().text($(this).text());
            $(this).parent().find('li').removeClass('selected');
            $(this).addClass('selected');
            objSelect.find('option').removeAttr('selected');
            objSelect.find('option[value="' + $(this).attr('rel') + '"]').attr('selected', 'selected');
            objSelect.change();
        });
        return objReturnValue;
    }
})(jQuery);
