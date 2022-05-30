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
