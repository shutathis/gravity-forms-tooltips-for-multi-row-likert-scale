<?php

/**
 * Define the internationalization functionality
 *
 * Loads and defines the internationalization files for this plugin
 * so that it is ready for translation.
 *
 * @link       https://shutathis.wordpress.com
 * @since      1.0.0
 *
 * @package    Gravity_Forms_Tooltips_For_Multi_Row_Likert_Scale
 * @subpackage Gravity_Forms_Tooltips_For_Multi_Row_Likert_Scale/includes
 */

/**
 * Define the internationalization functionality.
 *
 * Loads and defines the internationalization files for this plugin
 * so that it is ready for translation.
 *
 * @since      1.0.0
 * @package    Gravity_Forms_Tooltips_For_Multi_Row_Likert_Scale
 * @subpackage Gravity_Forms_Tooltips_For_Multi_Row_Likert_Scale/includes
 * @author     Dominique A. Mariano <dom.cpa.ano@gmail.com>
 */
class Gravity_Forms_Tooltips_For_Multi_Row_Likert_Scale_i18n {


	/**
	 * Load the plugin text domain for translation.
	 *
	 * @since    1.0.0
	 */
	public function load_plugin_textdomain() {

		load_plugin_textdomain(
			'gravity-forms-tooltips-for-multi-row-likert-scale',
			false,
			dirname( dirname( plugin_basename( __FILE__ ) ) ) . '/languages/'
		);

	}



}
