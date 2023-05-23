<?php
/**
 * @package Rish-Custom-Post
 * @version 1.0.0
 */
 /*
Plugin Name: Rish Custom Post
Plugin URI: https://github.com/yat8823jp/rd-add-palecolors
Description: add custom post type for Rish
Author: YAT
Version: 1.1.0
Author URI: http://wp.yat-net.com
Text Domain: add-palecolor
License: GPLv2 or later
License URI: http://www.gnu.org/licenses/gpl-2.0.html
*/

/*
 * Webサイト実績用カスタム投稿
 */
function custom_post_webdesign_init() {
	$labels = array(
		'name'               => 'Web Designs',
		'singular_name'      => 'Web Design',
		'menu_name'          => 'Web Designs',
		'name_admin_bar'     => 'Web Design',
		'add_new'            => 'Add New',
		'add_new_item'       => 'Add New Web Design',
		'new_item'           => 'New Web Design',
		'edit_item'          => 'Edit Web Design',
		'view_item'          => 'View Web Design',
		'all_items'          => 'All Web Designs',
		'search_items'       => 'Search Web Designs',
		'parent_item_colon'  => 'Parent Web Designs:',
		'not_found'          => 'No Web Designs found.',
		'not_found_in_trash' => 'No Web Designs found in Trash.'
	);

	$args = array(
		'labels'             => $labels,
		'public'             => true,
		'publicly_queryable' => true,
		'show_ui'            => true,
		'show_in_menu'       => true,
		'query_var'          => true,
		// 'rewrite'            => array( 'slug' => 'webdesign' ),
		'capability_type'    => 'post',
		'has_archive'        => true,
		'hierarchical'       => false,
		'menu_position'      => 5,
		'show_in_rest'       => true,
		'supports'           => array( 'title', 'editor', 'author', 'thumbnail', 'excerpt', 'comments' )
	);

	register_post_type( 'webdesign', $args );
}
add_action( 'init', 'custom_post_webdesign_init' );

//Webサイト実績用カスタム分類
function create_webdesign_taxonomies() {
	$labels = array(
		'name'                       => 'type_tags',
		'singular_name'              => 'type_tag',
		'search_items'               => 'Search type_tags',
		'popular_items'              => 'Popular type_tags',
		'all_items'                  => 'All type_tags',
		'parent_item'                => null,
		'parent_item_colon'          => null,
		'edit_item'                  => 'Edit type_tag',
		'update_item'                => 'Update type_tag',
		'add_new_item'               => 'Add New type_tag',
		'new_item_name'              => 'New type_tag Name',
		'separate_items_with_commas' => 'Separate type_tags with commas',
		'add_or_remove_items'        => 'Add or remove type_tags',
		'choose_from_most_used'      => 'Choose from the most used type_tags',
		'not_found'                  => 'No type_tags found.',
		'menu_name'                  => 'type_tags'
	);

	$args = array(
		'hierarchical'          => false,
		'labels'                => $labels,
		'show_ui'               => true,
		'show_admin_column'     => true,
		'update_count_callback' => '_update_post_term_count',
		'query_var'             => true,
		'rewrite'               => array( 'slug' => 'type_tag' ),
		'show_in_rest'          => true
	);
	// register_taxonomy_for_object_type( 'type_tag', 'webdesign', $args );
	register_taxonomy( 'type_tag', 'webdesign', $args );
}
add_action( 'init', 'create_webdesign_taxonomies' );

/*
 * 印刷物実績用カスタム投稿
 */
function custom_post_print_init() {
	$labels = array(
		'name'               => 'Prints',
		'singular_name'      => 'Print',
		'menu_name'          => 'Prints',
		'name_admin_bar'     => 'Print',
		'add_new'            => 'Add New',
		'add_new_item'       => 'Add New Print',
		'new_item'           => 'New Print',
		'edit_item'          => 'Edit Print',
		'view_item'          => 'View Print',
		'all_items'          => 'All Prints',
		'search_items'       => 'Search Prints',
		'parent_item_colon'  => 'Parent Prints:',
		'not_found'          => 'No Prints found.',
		'not_found_in_trash' => 'No Prints found in Trash.'
	);

	$args = array(
		'labels'             => $labels,
		'public'             => true,
		'publicly_queryable' => true,
		'show_ui'            => true,
		'show_in_menu'       => true,
		'query_var'          => true,
		// 'rewrite'            => array( 'slug' => 'print' ),
		'capability_type'    => 'post',
		'has_archive'        => true,
		'hierarchical'       => false,
		'menu_position'      => 5,
		'show_in_rest'       => true,
		'supports'           => array( 'title', 'editor', 'author', 'thumbnail', 'excerpt', 'comments' )
	);

	register_post_type( 'print', $args );
}
add_action( 'init', 'custom_post_print_init' );
