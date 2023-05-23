<?php
	if ( is_plugin_active( "smart-custom-fields/smart-custom-fields.php" ) ) {
		$post_meta_data = array (
			'post_type'         => $args,
		);
		if( $args == 'webdesign' ) {
			array_push(
				$post_meta_data,
				array (
					'meta_query'    => array (
						array (
							'key'   => 'sticky',
							'value' => true
						)
					)
				)
			);
		}
	} else {
		$post_meta_data = array (
			'post_type' => "",
		);
	}
	global $wp_query;
?>
	<article class="p-thumbnail--portfolio-detail">
		<?php if ( has_post_thumbnail() ) : ?>
			<div class="p-thumbnail__imgbox p-single__thumbnail">
				<?php the_post_thumbnail( 'post-thumbnail', array( 'class' => $post_meta_data['post_type'] ) ); ?>
			</div>
		<?php else : ?>
			<div class="p-thumbnail__imgbox no-thumbnail">
				<img src="<?php echo COMMON_PFIX; ?>/images/common/eyecatch/noimage.jpg" alt="no image" class="attachment-post-thumbnail">
			</div>
		<?php endif; ?>
	</article>
	<?php if ( $wp_query -> have_posts() && get_the_content() ) : ?>
		<article class="p-portfolio-detail">
			<?php while ( $wp_query -> have_posts() ) : $wp_query -> the_post(); ?>
				<article class="p-portfolio-detail__contents">
					<?php the_content(); ?>
				</article>
				<?php if ( SCF::get( 'sitecapturei-mage' ) ) : ?>
					<article class="p-portfolio-detail__imgs">
						<ul>
							<?php
								$images = SCF::get( 'sitecapturei-mage' );
								foreach( $images as $image ) :
									echo '<li>' . wp_get_attachment_image( $image, 'full', false, array( 'class' => $post_meta_data['post_type'], ) ) . '</li>';
								endforeach;
							?>
						</ul>
					</article>
				<?php endif; ?>
			<?php endwhile;
				wp_reset_postdata();
			?>
		</article>
	<?php endif; ?>