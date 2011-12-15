;(function($) {
    var methods = {
        init: function() {
            var $this = $(this), data = $this.data('sfWidgetFormDmDatePicker');
            if (data) return;
            
            var year = $this.find('select[name$="[year]"]');
            var classes = "";
            
            if (year.attr("class") != null )
            {
                classes =  year.attr("class");
            }
            
            $this.data('sfWidgetFormDmDatePicker', {
                target:     $this,
                day:        $this.find('select[name$="[day]"]'),
                month:      $this.find('select[name$="[month]"]'),
                year:       year,
                picker:     $('<input type="text" class="sfWidgetFormDmDatePicker '+ classes +' " />').datepicker({
                    minDate: new Date($('option:first', year).next().val(), 0, 1),
                    maxDate: new Date($('option:last', year).val(), 11, 31),                    
                    onClose: function(dateText, instance) {
                        methods['serialize'].apply($this,[]);
                    }
                }),
                clear:      '',
                pick:       '',
                original:   ''
            });
            data = $this.data('sfWidgetFormDmDatePicker');
            data.original = $this.html();            
            $this.empty();
            
            $this.append(data.picker)            
            
            $this.append(data.pick).append(data.clear);
            
            var $hidden = $('<span style="display:none;"></span>').append(data.day).append(data.month).append(data.year);
            $this.append($hidden);            
            
            methods['deserialize'].apply($this,[]);
        },
        deserialize: function() {            
            var $this = $(this), data = $this.data('sfWidgetFormDmDatePicker');
            if (data) {
                if (data.year.val() == '') return;
                data.picker.datepicker('setDate', new Date(data.year.val(), data.month.val()-1, data.day.val()));
            } else methods['init'].apply($this,[]);
        },
        serialize: function() {
            var $this = $(this), data = $this.data('sfWidgetFormDmDatePicker');
            if (!data) methods['init'].apply($this,[]);
            var date = data.picker.datepicker('getDate');
            if (date == null) {
                data.day.val('');
                data.month.val('');
                data.year.val('');
            } else {
                data.day.val(date.getDate());
                data.month.val(date.getMonth()+1);
                data.year.val(date.getFullYear());
            };            
        },
        destroy: function() {
            var $this = $(this), data = $this.data('sfWidgetFormDmDatePicker');
            if (!data) return;
            $this.empty();
            $this.append(data.original);
            $this.removeData('sfWidgetFormDmDatePicker');
        }
    };
    $.fn.sfWidgetFormDmDatePicker = function(method) {
        if ( methods[method] ) {
            return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
        } else if ( typeof method === 'object' || ! method ) {
            return methods.init.apply( this, arguments );
        } else {
            $.error( 'Method ' +  method + ' does not exist on jQuery.sfWidgetFormDmDatePicker' );
        };   
    };
     
})(jQuery);

(function($) {
    if ($('#dm_admin_content').length >0) {
        $.each($('#dm_admin_content').find('.sfWidgetFormDmDatePicker'), function(){
            $(this).sfWidgetFormDmDatePicker();
        });
    };

    $('#dm_page div.dm_widget').bind('dmWidgetLaunch', function() {
        $.each($(this).find('.sfWidgetFormDmDatePicker'), function(){
            $(this).sfWidgetFormDmDatePicker();
        });       
    });

    $('div.dm.dm_widget_edit_dialog_wrap').live('dmAjaxResponse', function() {
        $.each($(this).find('.sfWidgetFormDmDatePicker'), function(){
            $(this).sfWidgetFormDmDatePicker();
        });       
    });
})(jQuery);