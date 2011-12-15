<?php
/**
 * Description of sfWidgetFormDateTimePicker
 *
 * @author TheCelavi
 */
class sfWidgetFormDmDateTimePicker extends sfWidgetFormDateTime {
    
    public function render($name, $value = null, $attributes = array(), $errors = array()) {
        return sprintf('<span class="sfWidgetFormDmDateTimePicker">%s</span>', 
                
                parent::render($name, $value, $attributes, $errors));
    }

    public function getStylesheets() {
        return array_merge(parent::getStylesheets(), array(
            'lib.ui' => null,
            'lib.ui-slider' => null,
            'lib.ui-datepicker' => null,
            'dmDateTimePickerPlugin.addOn' => null,
            'dmDateTimePickerPlugin.all' => null
        ));
    }
    
    public function getJavaScripts() {
        $addJS = array();
        $culture = dmContext::getInstance()->getUser()->getCulture();
        if ($culture != 'en') 
            $addJS = array(
                sprintf('/dmCorePlugin/lib/jquery-ui/js/i18n/jquery.ui.datepicker-%s.js', $culture),
                sprintf('/dmDateTimePickerPlugin/js/i18n/jquery-ui-timepicker-%s.js', $culture)
                );
        return array_merge(
                parent::getJavaScripts(),
                array(
                    'lib.ui-core',
                    'lib.ui-slider',
                    'lib.ui-datepicker',
                    'dmDateTimePickerPlugin.addOn'
                ), 
                $addJS,
                array(                    
                    'dmDateTimePickerPlugin.dateTimePicker'
                )
        );
    }
    
}
