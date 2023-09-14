<?php
/**
 * Plugin Name: cta-button-block
 * Description: add button block style for CTA
 * Version:     1.0.0
 * Author:      YAT
 * Author URI:  https://wp.yat-net.com
 * License:     GPLv2+
 *
 * @package cta-button-block
 */


add_action( 'wp_enqueue_scripts', function() {
	wp_enqueue_style( 'front-cta-block', plugin_dir_url( __FILE__ ) . 'assets/css/block.css' );
} );

add_action( 'enqueue_block_editor_assets', function () {
	wp_enqueue_script (
		'cta-block',
		plugin_dir_url( __FILE__ ) . 'assets/js/block.js',
		array (
			'wp-blocks',
			'wp-element',
			'wp-rich-text',
			'wp-editor',
		)
	);
	wp_localize_script (
		'cta-block',
		'customButtonBlockData',
		array(
			'imagePath' => plugin_dir_url( __FILE__ ) . 'assets/images/common/link.svg',
		)
	);
	wp_enqueue_style( 'cta-block',  plugin_dir_url( __FILE__ ) . 'assets/css/block.css' );
} );
