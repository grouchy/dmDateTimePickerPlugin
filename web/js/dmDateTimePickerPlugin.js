;(function($) {
    var methods = {
        init: function() {
            var $this = $(this), data = $this.data('sfWidgetFormDmDateTimePicker');
            if (data) return;
            
            var year = $this.find('select[name$="[year]"]');
            
            $this.data('sfWidgetFormDmDateTimePicker', {
                target:     $this,
                day:        $this.find('select[name$="[day]"]'),
                month:      $this.find('select[name$="[month]"]'),
                year:       year,
                hour:       $this.find('select[name$="[hour]"]'),
                minute:     $this.find('select[name$="[minute]"]'),
                second:     ($this.find('select[name$="[second]"]').length == 0) ?  null : $this.find('select[name$="[second]"]'),
                picker:     $('<input type="text" class="sfWidgetFormDmDateTimePicker" />').datetimepicker({
                    minDate: new Date($('option:first', year).next().val(), 0, 1),
                    maxDate: new Date($('option:last', year).val(), 11, 31),    
                    showSecond: ($this.find('select[name$="[second]"]').length != 0),
                    onClose: function(dateText, instance) {
                        methods['serialize'].apply($this,[]);
                    }
                }),
                clear:      '',
                pick:       '',
                original:   ''
            });
            data = $this.data('sfWidgetFormDmDateTimePicker');
            data.original = $this.html();            
            $this.empty();
            
            $this.append(data.picker)            
            
            $this.append(data.pick).append(data.clear);
            
            var $hidden = $('<span style="display:none;"></span>').append(data.day).append(data.month).append(data.year).append(data.hour).append(data.minute).append(data.second);
            $this.append($hidden);            
            
            methods['deserialize'].apply($this,[]);
        },
        deserialize: function() {            
            var $this = $(this), data = $this.data('sfWidgetFormDmDateTimePicker');
            if (data) {
                if (data.year.val() == '') return;
                data.picker.datepicker('setDate', new Date(data.year.val(), data.month.val()-1, data.day.val(), data.hour.val(), data.minute.val(), ((data.second == null) ? 0 : data.second.val())));
            } else methods['init'].apply($this,[]);
        },
        serialize: function() {
            var $this = $(this), data = $this.data('sfWidgetFormDmDateTimePicker');
            if (!data) methods['init'].apply($this,[]);
            var date = data.picker.datepicker('getDate');
            if (date == null) {
                data.day.val('');
                data.month.val('');
                data.year.val('');
                data.hour.val('');
                data.minute.val('');
                if (data.second != null) data.second.val('');
            } else {
                data.day.val(date.getDate());
                data.month.val(date.getMonth()+1);
                data.year.val(date.getFullYear());
                data.hour.val(date.getHours());
                data.minute.val(date.getMinutes());
                if (data.second != null) data.second.val(date.getSeconds());
            };            
        },
        destroy: function() {
            var $this = $(this), data = $this.data('sfWidgetFormDmDateTimePicker');
            if (!data) return;
            $this.empty();
            $this.append(data.original);
            $this.removeData('sfWidgetFormDmDateTimePicker');
        }
    };
    $.fn.sfWidgetFormDmDateTimePicker = function(method) {
        if ( methods[method] ) {
            return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
        } else if ( typeof method === 'object' || ! method ) {
            return methods.init.apply( this, arguments );
        } else {
            $.error( 'Method ' +  method + ' does not exist on jQuery.sfWidgetFormDmDateTimePicker' );
        };   
    };
     
})(jQuery);

(function($) {
    if ($('#dm_admin_content').length >0) {
        $.each($('#dm_admin_content').find('.sfWidgetFormDmDateTimePicker'), function(){
            $(this).sfWidgetFormDmDateTimePicker();
        });
    };

    $('#dm_page div.dm_widget').bind('dmWidgetLaunch', function() {
        $.each($(this).find('.sfWidgetFormDmDateTimePicker'), function(){
            $(this).sfWidgetFormDmDateTimePicker();
        });       
    });

    $('div.dm.dm_widget_edit_dialog_wrap').live('dmAjaxResponse', function() {
        $.each($(this).find('.sfWidgetFormDmDateTimePicker'), function(){
            $(this).sfWidgetFormDmDateTimePicker();
        });       
    });
})(jQuery);