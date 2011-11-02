;(function($) {
    var methods = {
        init: function() {
            var $this = $(this), data = $this.data('sfWidgetFormDmTimePicker');
            if (data) return;
            
            $this.data('sfWidgetFormDmTimePicker', {
                target:     $this,
                hour:       $this.find('select[name$="[hour]"]'),
                minute:     $this.find('select[name$="[minute]"]'),
                second:     ($this.find('select[name$="[second]"]').length == 0) ? null : $this.find('select[name$="[second]"]'),
                picker:     $('<input type="text" class="sfWidgetFormDmTimePicker" />').timepicker({
                    showSecond: ($this.find('select[name$="[second]"]').length != 0),
                    onClose: function(dateText, instance) {
                        methods['serialize'].apply($this,[]);
                    }
                }),
                clear:      '',
                pick:       '',
                original:   ''
            });
            data = $this.data('sfWidgetFormDmTimePicker');
            data.original = $this.html();            
            $this.empty();
            
            $this.append(data.picker)            
            
            $this.append(data.pick).append(data.clear);
            
            var $hidden = $('<span style="display:none;"></span>').append(data.hour).append(data.minute).append(data.second);
            $this.append($hidden);            
            
            methods['deserialize'].apply($this,[]);
        },
        deserialize: function() {            
            var $this = $(this), data = $this.data('sfWidgetFormDmTimePicker');
            if (data) {
                if (data.hour.val() == '') return;
                var date = new Date();
                date.setHours(data.hour.val(), data.minute.val(), ((data.second == null) ? 0 : data.second.val()));
                data.picker.datepicker('setDate', date);
            } else methods['init'].apply($this,[]);
        },
        serialize: function() {
            var $this = $(this), data = $this.data('sfWidgetFormDmTimePicker');
            if (!data) methods['init'].apply($this,[]);
            var date = data.picker.datepicker('getDate');
            if (date == null) {
                data.hour.val('');
                data.minute.val('');
                if (data.second != null) data.second.val('');
            } else {
                data.hour.val(date.getHours());
                data.minute.val(date.getMinutes());
                if (data.second != null) data.second.val(date.getSeconds());
            };            
        },
        destroy: function() {
            var $this = $(this), data = $this.data('sfWidgetFormDmTimePicker');
            if (!data) return;
            $this.empty();
            $this.append(data.original);
            $this.removeData('sfWidgetFormDmTimePicker');
        }
    };
    $.fn.sfWidgetFormDmTimePicker = function(method) {
        if ( methods[method] ) {
            return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
        } else if ( typeof method === 'object' || ! method ) {
            return methods.init.apply( this, arguments );
        } else {
            $.error( 'Method ' +  method + ' does not exist on jQuery.sfWidgetFormDmTimePicker' );
        };  
    };
     
})(jQuery);

(function($) {
    if ($('#dm_admin_content').length >0) {
        $.each($('#dm_admin_content').find('.sfWidgetFormDmTimePicker'), function(){
            $(this).sfWidgetFormDmTimePicker();
        });
    };

    $('#dm_page div.dm_widget').bind('dmWidgetLaunch', function() {
        $.each($(this).find('.sfWidgetFormDmTimePicker'), function(){
            $(this).sfWidgetFormDmTimePicker();
        });       
    });

    $('div.dm.dm_widget_edit_dialog_wrap').live('dmAjaxResponse', function() {
        $.each($(this).find('.sfWidgetFormDmTimePicker'), function(){
            $(this).sfWidgetFormDmTimePicker();
        });       
    });
})(jQuery);