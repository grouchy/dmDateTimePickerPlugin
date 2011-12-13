<?php

/**
 * Replaces standard Symfony UI date with jQuery date picker
 *
 * @author TheCelavi
 */
class sfWidgetFormDmDatePicker extends sfWidgetFormDate {

    public function render($name, $value = null, $attributes = array(), $errors = array()) {
        return sprintf('<span class="sfWidgetFormDmDatePicker">%s</span>', 
                
                parent::render($name, $value, $attributes, $errors));
    }

    public function getStylesheets() {
        return array_merge(parent::getStylesheets(), array(
            'lib.ui' => null,
            'lib.ui-datepicker' => null,
            'dmDateTimePickerPlugin.all' => null
        ));
    }
    
    public function getJavaScripts() {
        $addJS = array();
        $culture = dmContext::getInstance()->getUser()->getCulture();
        if ($culture != 'en') $addJS = array(sprintf('/dmCorePlugin/lib/jquery-ui/js/i18n/jquery.ui.datepicker-%s.js', $culture));
        return array_merge(
                parent::getJavaScripts(),
                array(
                    'lib.ui-core',
                    'lib.ui-datepicker'
                ), 
                $addJS,
                array(                    
                    'dmDateTimePickerPlugin.datePicker'
                )
        );
    }

}