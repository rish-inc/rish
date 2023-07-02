<?php // coni 現行より
	if ( $args['template_name'] ) :
		include_once( ABSPATH . 'wp-admin/includes/plugin.php' );
		if ( is_plugin_active( "smart-custom-fields/smart-custom-fields.php" ) ) :
			$query_args = array (
				'post_type' => $args['template_name']
			);
				$wp_query = new WP_Query( $query_args );
			if ( $wp_query -> have_posts() ) : ?>
				<ul class="p-top-masonry__list js-masonry">
					<?php while ( $wp_query -> have_posts() ) : $wp_query -> the_post(); ?>
						<li class="p-top-masonry__list__item js-masonry__item">
							<figure class="p-top-masonry__list__figure">
								<div class="c-imgwrap">
									<a href="<?php the_permalink(); ?>"><?php the_post_thumbnail(); ?></a>
								</div>
								<ul class="c-img-description">
									<li class="c-img-description__title"><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></li>
								</ul>
							</figure>
						</li>
					<?php
						endwhile;
						wp_reset_postdata();
					?>
				</ul>
			<?php endif;
		endif;
	endif;
?>
