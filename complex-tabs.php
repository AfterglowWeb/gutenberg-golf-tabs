<?php
/**
 * Plugin Name:       Golf Tabs
 * Description:       Material UI Tabs Block Dedicated to Golf Courses
 * Version:           1.0.4
 * Requires at least: 6.7
 * Requires PHP:      7.4
 * Author:            Cédric Moris Kelly
 * Author URI:        http://moriskelly.com
 * License:           GPL-3.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-3.0.html
 * Text Domain:       complex-tabs
 *
 * @package CreateBlock
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

/**
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://developer.wordpress.org/reference/functions/register_block_type/
 */
function create_block_complex_tabs_block_init() {
	register_block_type( __DIR__ . '/build/complex-tabs' );
}
add_action( 'init', 'create_block_complex_tabs_block_init' );
