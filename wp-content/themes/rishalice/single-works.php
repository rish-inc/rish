<?php
/*
Template Name: 制作実績詳細
Template Post Type: webdesign, print
*/
?>
<?php get_header(); ?>
	<main class="l-main">
		<article class="p-single c-inner c-content">
			<div class="p-single__head c-decoration--wing-line--under">
				<span class="c-decoration--english">Works</span>
				<h1 class="c-font--big">制作実績</h1>
			</div>
			<?php
				if( $post_type != "" ) {
					get_template_part( 'components/template/detail-portfolio', NULL,  get_post_type() );
				}
			?>
			<?php get_template_part( 'components/template/contact' ); ?>
		</article>
	</main>
<?php get_footer(); ?>
