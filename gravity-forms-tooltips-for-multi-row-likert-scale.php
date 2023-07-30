<?php

/**
 * The plugin bootstrap file
 *
 * This file is read by WordPress to generate the plugin information in the plugin
 * admin area. This file also includes all of the dependencies used by the plugin,
 * registers the activation and deactivation functions, and defines a function
 * that starts the plugin.
 *
 * @link              https://shutathis.wordpress.com
 * @since             1.0.0
 * @package           Gravity_Forms_Tooltips_For_Multi_Row_Likert_Scale
 *
 * @wordpress-plugin
 * Plugin Name:       Gravity Forms Tooltips for Multi-Row Likert Scale
 * Plugin URI:        https://wordpress.org/plugins/gravity-forms-tooltips-for-multi-row-likert-scale/
 * Description:       This plugin is an extension of the Gravity Forms Tooltips add-on by JetSloth. This plugin allows you to add tooltips to the individual rows of your Likert scale.
 * Version:           1.0.0
 * Author:            Dominique A. Mariano
 * Author URI:        https://shutathis.wordpress.com
 * License:           GPL-2.0+
 * License URI:       http://www.gnu.org/licenses/gpl-2.0.txt
 * Text Domain:       gravity-forms-tooltips-for-multi-row-likert-scale
 * Domain Path:       /languages
 */

// If this file is called directly, abort.
if ( ! defined( 'WPINC' ) ) {
	die;
}

/**
 * Currently plugin version.
 * Start at version 1.0.0 and use SemVer - https://semver.org
 * Rename this for your plugin and update it as you release new versions.
 */
define( 'GRAVITY_FORMS_TOOLTIPS_FOR_MULTI_ROW_LIKERT_SCALE_VERSION', '1.0.0' );

/**
 * The code that runs during plugin activation.
 * This action is documented in includes/class-gravity-forms-tooltips-for-multi-row-likert-scale-activator.php
 */
function activate_gravity_forms_tooltips_for_multi_row_likert_scale() {
	require_once plugin_dir_path( __FILE__ ) . 'includes/class-gravity-forms-tooltips-for-multi-row-likert-scale-activator.php';
	Gravity_Forms_Tooltips_For_Multi_Row_Likert_Scale_Activator::activate();
}

/**
 * The code that runs during plugin deactivation.
 * This action is documented in includes/class-gravity-forms-tooltips-for-multi-row-likert-scale-deactivator.php
 */
function deactivate_gravity_forms_tooltips_for_multi_row_likert_scale() {
	require_once plugin_dir_path( __FILE__ ) . 'includes/class-gravity-forms-tooltips-for-multi-row-likert-scale-deactivator.php';
	Gravity_Forms_Tooltips_For_Multi_Row_Likert_Scale_Deactivator::deactivate();
}

register_activation_hook( __FILE__, 'activate_gravity_forms_tooltips_for_multi_row_likert_scale' );
register_deactivation_hook( __FILE__, 'deactivate_gravity_forms_tooltips_for_multi_row_likert_scale' );

/**
 * The core plugin class that is used to define internationalization,
 * admin-specific hooks, and public-facing site hooks.
 */
require plugin_dir_path( __FILE__ ) . 'includes/class-gravity-forms-tooltips-for-multi-row-likert-scale.php';

/**
 * Begins execution of the plugin.
 *
 * Since everything within the plugin is registered via hooks,
 * then kicking off the plugin from this point in the file does
 * not affect the page life cycle.
 *
 * @since    1.0.0
 */
function run_gravity_forms_tooltips_for_multi_row_likert_scale() {

	$plugin = new Gravity_Forms_Tooltips_For_Multi_Row_Likert_Scale();
	$plugin->run();

}
run_gravity_forms_tooltips_for_multi_row_likert_scale();
