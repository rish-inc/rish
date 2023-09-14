<?php
/**
 * init
 */

//develop mode config
define( "IS_VITE_DEVELOPMENT", false );

//define
define( 'DIST_DEF', 'dist' );
define( 'DIST_URI',  get_template_directory_uri() . '/' . DIST_DEF );
define( 'DIST_PATH', get_template_directory()     . '/' . DIST_DEF );

define( 'JS_DEPENDENCY', array( 'jquery' ) ) ; // array( 'jquery' ) as example
define( 'JS_LOAD_IN_FOOTER', true ) ; // load scripts in footer?

define('VITE_SERVER', 'http://localhost:3000');
define('VITE_ENTRY_POINT', '/main.js');

function cors_http_header() {
	header( "Access-Control-Allow-Origin: *" );
}
// add_action( 'wp_head', 'cors_http_header' );

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

if ( wp_get_theme() ) {
	$theme         = wp_get_theme();
} else {
	$theme = '1.0.0';
}

$theme_version = $theme -> get( 'Version' );

define( 'COMMON_PFIX', get_template_directory_uri() );

function readScript( $theme_version ) {
	wp_enqueue_style(  'googlefonts', "https://fonts.googleapis.com/css2?family=Meie+Script&family=Vollkorn:ital,wght@0,400;0,600;1,400;1,500&display=swap", array(), null );
	wp_enqueue_style(  'tailwind', '//cdn.tailwindcss.com', array() );
	wp_enqueue_style(  'style', get_stylesheet_uri(), array(), $theme_version );
	if( is_front_page() ) {
		wp_enqueue_script( 'masonry', get_theme_file_uri( '/js/masonry.min.js' ), array(), '4.2.2', true );
		wp_enqueue_script( 'masonry-config', get_theme_file_uri( '/js/masonry-config.js' ), array( 'masonry' ), '4.2.2', true );
	}
}
add_action( 'wp_enqueue_scripts', 'readScript' );


add_action( 'wp_enqueue_scripts', function() {
	if ( defined( 'IS_VITE_DEVELOPMENT') && IS_VITE_DEVELOPMENT === true ) {
		//develop mode
		function vite_head_module_hook() {
			echo '<script type="module" crossorigin src="' . VITE_SERVER . VITE_ENTRY_POINT . '"></script>';
		}
		add_action( 'wp_footer', 'vite_head_module_hook' );
	} else {
		// production mode, 'npm run build' must be executed in order to generate assets
		// read manifest.json to figure out what to enqueue
		$manifest = json_decode( file_get_contents( DIST_PATH . '/manifest.json'), true );

		// is ok
		if ( is_array( $manifest ) ) {

			// get first key, by default is 'main.js'
			$manifest_key = array_keys( $manifest );
			if ( isset( $manifest_key[0] ) ) {
				// enqueue CSS files
				foreach( @$manifest["main.css"] as $css_file ) {
					wp_enqueue_style( 'main', DIST_URI . '/' . $css_file );
				}
				// enqueue main JS file
				$js_file = @$manifest["main.js"]['file'];
				if ( ! empty( $js_file ) ) {
					wp_enqueue_script( 'main', DIST_URI . '/' . $js_file, JS_DEPENDENCY, '', JS_LOAD_IN_FOOTER );
				}
			}
		}
	}
} );


function imgdescription() {
	if ( isset( SCF::get( 'partner-group' )[0]['partner-name'] ) ) : ?>
		<dl class="c-img-description__partner">
			<dt class="c-img-description__partner__title">パートナー：</dt>
			<?php
				$partner_groups = SCF::get( 'partner-group' );
				foreach ( $partner_groups as $groups ) :
					if ( $groups['partner-url'] ) : ?>
						<dd class="c-img-description__partner__link"><a href="<?php echo esc_url( $groups['partner-url'] ); ?>" target="_blank"><?php echo esc_html( $groups['partner-name'] ); ?></a><?php if( $groups != end( $partner_groups ) ) : ?>, <?php endif; ?></dd>
					<?php else : ?>
						<dd class="c-img-description__partner__link">
							<?php if ( isset( $groups ) ) : ?>
								<?php echo esc_html( $groups['partner-name'] ); ?>
								<?php if ( $groups != end( $partner_groups ) ) : ?>, <?php endif; ?>
							<?php endif; ?>
						</dd>
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
