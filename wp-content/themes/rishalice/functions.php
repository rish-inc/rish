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
    wp_enqueue_style( 'googlefonts', "//fonts.googleapis.com/css2?family=Meie+Script&family=Vollkorn:ital,wght@0,400;0,600;1,400;1,600&display=swap", array() );
	wp_enqueue_style( 'rishalice_css', get_theme_file_uri( '/css/style.css' ), array(), '1.0.0' );
	wp_enqueue_script( 'jquery', '//code.jquery.com/jquery-3.6.3.min.js', '', '', true );
	wp_enqueue_script( 'rishalice_js', get_theme_file_uri( '/js/bundle.js' ), array(), '1.0.0');
    if( is_front_page() ) {
		wp_enqueue_script( 'masonry', get_theme_file_uri( '/js/masonry.min.js' ), array(), '4.2.2', true );
		wp_enqueue_script( 'masonry-config', get_theme_file_uri( '/js/masonry-config.js' ), array( 'masonry' ), '4.2.2', true );
	}
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

// デバイスによる表示切替
function is_mobile() {
    $useragents = array(
        'iPhone',          // iPhone
        'iPod',            // iPod touch
        '^(?=.*Android)(?=.*Mobile)', // 1.5+ Android
        'dream',           // Pre 1.5 Android
        'CUPCAKE',         // 1.5+ Android
        'blackberry9500',  // Storm
        'blackberry9530',  // Storm
        'blackberry9520',  // Storm v2
        'blackberry9550',  // Storm v2
        'blackberry9800',  // Torch
        'webOS',           // Palm Pre Experimental
        'incognito',       // Other iPhone browser
        'webmate'          // Other iPhone browser
    );
    $pattern = '/'.implode('|', $useragents).'/i';
    return preg_match($pattern, $_SERVER['HTTP_USER_AGENT']);
}

// 投稿一覧に表示する記事数（PCとスマホで表示数を変える）
// PCは管理画面で設定した記事数（9件表示）
function mobile_posts_per_page( $query ) {
	if ( ! is_admin() && is_mobile() && $query->is_main_query() ) {
		$query->set( 'posts_per_page', 5 );  // スマホは5件表示
	}
}
add_action( 'pre_get_posts', 'mobile_posts_per_page' );
