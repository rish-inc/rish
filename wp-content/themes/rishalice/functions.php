<?php

function register_my_menus() {
	register_nav_menus( array (
		'header-left-menu' => 'header-left-menu',
		'header-right-menu' => 'header-right-menu',
		'footer-menu' => 'footer-menu'
	) );
}
add_action( 'after_setup_theme', 'register_my_menus' );

function custom_theme_support() {
	add_theme_support( "post-thumbnails" );
}
add_action( 'after_setup_theme', 'custom_theme_support' );

function rishaliceScript() {
	wp_enqueue_style( 'rishalice_css', get_theme_file_uri( '/css/style.css' ), array(), '1.0.0' );
}
add_action( 'wp_enqueue_scripts', 'rishaliceScript' );
