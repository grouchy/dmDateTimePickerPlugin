<?php

/**
 * Replaces standard Symfony UI time with jQuery time picker
 *
 * @author TheCelavi
 */
class sfWidgetFormDmTimePicker extends sfWidgetFormTime {

    public function render($name, $value = null, $attributes = array(), $errors = array()) {
        return sprintf('<span class="sfWidgetFormDmTimePicker">%s</span>', 
                
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
        if ($culture = dmContext::getInstance()->getUser()->getCulture() != 'en') $addJS = array(sprintf('/dmDateTimePickerPlugin/js/i18n/jquery.ui.timepicker-%s.js', $culture));
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
                    'dmDateTimePickerPlugin.timePicker'
                )
        );
    }

}
