<?php get_header(); ?>
	<main class="l-main">
		<article class="p-page c-inner c-content">
			<div class="p-page__head c-decoration--wing-line--under">
				<?php
					include_once( ABSPATH . 'wp-admin/includes/plugin.php' );
					if( is_plugin_active( "smart-custom-fields/smart-custom-fields.php" ) ) {
						if ( SCF::get( "englishtitle" ) ) {
							$englishtitle = SCF::get( "englishtitle" );
						}
					}
				?>
				<?php if ( isset( $englishtitle ) ) : ?>
					<span class="c-decoration--english"><?php echo $englishtitle ?></span>
				<?php endif; ?>
				<h1 class="c-font--big"><?php the_title(); ?></h1>
			</div>
			<div class="p-page__contents">
				<figure class="p-page__contents__thumbnail">
					<?php
						if(has_post_thumbnail() ):
							the_post_thumbnail('full', array("alt" => get_the_title(), "class" => "p-page__contents__thumbnail__img")); ?>
							<?php
						endif;
					?>
				</figure>
				<article class="p-page__contents__content">
					<?php the_content(); ?>
				</article>
			</div>
			<?php get_template_part( 'components/template/contact' ); ?>
		</article>
	</main>
<?php get_footer(); ?>