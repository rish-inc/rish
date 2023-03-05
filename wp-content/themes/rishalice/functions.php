<?php

function register_my_menus() {
	register_nav_menus( array (
		'header-left-menu' => 'header-left-menu',
		'header-right-menu' => 'header-right-menu',
		'header-menu' => 'header-menu',
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
	wp_enqueue_script( 'jquery', '//code.jquery.com/jquery-3.6.3.min.js', '', '', true );
	wp_enqueue_script( 'rishalice_js', get_theme_file_uri( '/js/bundle.js' ), array(), '1.0.0');
}
add_action( 'wp_enqueue_scripts', 'rishaliceScript' );

// 抜粋文のpタグ除去
remove_filter('the_excerpt','wpautop');

// 抜粋文の文字数変更
function change_excerpt_mblength($length) {
	return 89; // 文字数を設定
}
add_filter('excerpt_mblength', 'change_excerpt_mblength');

// 抜粋文の末尾変更
function change_excerpt_more($more) {
	return '…[…]';
}
add_filter('excerpt_more', 'change_excerpt_more');