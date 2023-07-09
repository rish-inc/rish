<?php
/*
Template Name: 制作実績詳細
Template Post Type: webdesign, print
*/
?>
<?php get_header(); ?>
	<main class="l-main">
		<article class="p-single-works">
			<div class="p-single-works__head c-decoration--wing-line--under">
				<span class="c-decoration--english">Works</span>
				<h1 class="c-font--big">制作実績</h1>
			</div>
			<!-- カスタム投稿の詳細ページなら専用ヘッダーを表示 -->
			<?php
				if ( is_singular( array( 'webdesign', 'print' ) ) ) :
					get_template_part( 'components/template/header-single-works' );
				endif;
			?>
			<?php
				if( $post_type != "" ) {
					get_template_part( 'components/template/detail-portfolio', NULL,  get_post_type() );
				}
			?>
			<?php get_template_part( 'components/template/contact' ); ?>
		</article>
	</main>
<?php get_footer(); ?>
