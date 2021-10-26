<?php
/**
 * init
 */

function custom_theme_support() {
	add_theme_support( 'html5', array(
		'search-form',
		'script',
		'style'
	) );
	add_theme_support( "post-thumbnails" );
	add_theme_support( 'title-tag' );
	add_theme_support( 'custom-header', array(
		'default-image' => get_template_directory_uri() . '/images/top/header/001.jpg',
		'uploads'       => true,
	) );
	add_image_size( 'webdesign_thumb', 350, 9999 );
}
add_action( 'after_setup_theme', 'custom_theme_support' );
add_filter( 'big_image_size_threshold', '__return_false' );


if ( ! isset( $content_width ) ) :
	$content_width = 1200;
endif;

$theme         = wp_get_theme();
$theme_version = $theme->get( 'Version' );
define( 'COMMON_PFIX', get_template_directory_uri() );

function readScript() {
	// wp_enqueue_style(  'reset', "//meyerweb.com/eric/tools/css/reset/reset200802.css", array(), $theme_version );
	wp_enqueue_style(  'a-modern-css-reset', get_template_directory_uri() . "/css/reset.css", array(), $theme_version );
	wp_enqueue_style(  'googlefonts', "//fonts.googleapis.com/css2?family=Meie+Script&family=Vollkorn:ital,wght@0,400;0,600;1,400;1,600&display=swap", array(), $theme_version );
	wp_enqueue_style(  'modaal', get_template_directory_uri() . '/js/modaal/css/modaal.min.css', array(), '0.4.4' );
	wp_enqueue_style(  'style', get_stylesheet_uri(), array(), $theme_version );
	wp_enqueue_style(  'main', get_template_directory_uri() . '/main.css', array(), $theme_version );
	wp_enqueue_script( 'infiniteslide', get_template_directory_uri() . '/js/infiniteslidev2.js', array( 'jquery' ), "2.0.1", true );
	wp_enqueue_script( 'modal', get_template_directory_uri() . '/js/modaal/js/modaal.min.js', array( 'jquery' ), "0.4.4", true );
	wp_enqueue_script( 'bundle', get_template_directory_uri() . '/js/bundle.js', array( 'jquery' ), $theme_version, true );
}
add_action( 'wp_enqueue_scripts', 'readScript' );

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

function imgdescription() {
	if ( SCF::get( 'partner-group' )[0]['partner-name'] ) : ?>
		<dl class="c-img-description__partner">
			<dt class="c-img-description__partner__title">パートナー：</dt>
			<?php foreach ( SCF::get( 'partner-group' ) as $groups ) :
				if ( $groups['partner-url'] ) : ?>
					<dd class="c-img-description__partner__link"><a href="<?php echo esc_url( $groups['partner-url'] ); ?>" target="_blank"><?php echo esc_html( $groups['partner-name'] ); ?></a><?php if( $groups != end( SCF::get( 'partner-group' ) ) ) : ?>, <?php endif; ?></dd>
				<?php else : ?>
					<dd class="c-img-description__partner__link"><?php echo esc_html( $groups['partner-name'] ); ?><?php if( $groups != end( SCF::get( 'partner-group' ) ) ) : ?>, <?php endif; ?></dd>
				<?php endif; ?>
			<?php endforeach; ?>
			</dd>
		</dl>
	<?php endif;
}

function ogpimg() {
	global $post;
	$str           = $post -> post_content;
	$searchPattern = '/<img.*?src = (["\'])(.+?)\1.*?>/i'; //投稿にイメージがあるか調べる
	if ( has_post_thumbnail() ){//投稿にサムネイルがある場合の処理
		$image_id = get_post_thumbnail_id( $post -> ID );
		$image    = wp_get_attachment_image_src( $image_id, 'full' );
		$ogimage  = $image[0];
	} else if ( preg_match( $searchPattern, $str, $imgurl ) ) {//投稿にサムネイルは無いが画像がある場合の処理
		$ogimage = $imgurl[2];
	} else {//投稿にサムネイルも画像も無い場合、もしくはアーカイブページの処理
		$ogimage = COMMON_PFIX . "/img/ogp_image.jpg";
	}
	return $ogimage;
}
