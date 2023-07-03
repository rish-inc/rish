<?php // coni 現行より
	if ( $args['template_name'] ) :
		include_once( ABSPATH . 'wp-admin/includes/plugin.php' );
		if ( is_plugin_active( "smart-custom-fields/smart-custom-fields.php" ) ) :
			$sticky = SCF::get( 'sticky' );
			$query_args = array (
				'post_type' => $args['template_name'],
				'meta_query' => array (
					array (
						'key' => 'sticky',
						'value' => true
					)
				)
			);
			if ( $args['template_name'] == 'webdesign' ) :
				$wp_query = new WP_Query( $query_args );
				if ( $wp_query -> have_posts() ) : ?>
					<ul class="p-works-archive__items--2column__sticky">
						<?php while ( $wp_query -> have_posts() ) : $wp_query -> the_post(); ?>
							<li>
								<figure class="p-works-archive__items--2column__sticky__figure p-stack">
									<div class="p-stack__bg">
										<div class="c-imgwrap">
											<a href="<?php the_permalink(); ?>"><?php the_post_thumbnail( 'full' ); ?></a>
										</div>
									</div>
									<figcaption class="c-img-description">
										<?php if ( SCF::get( 'url' ) ) : ?>
											<dl>
												<dt class="c-img-description__title"><?php the_title(); ?></dt>
												<dd class="c-img-description__link">
													<a href="<?php echo esc_html( SCF::get( 'url' ) ); ?>" target="_blank"><?php echo esc_html( str_replace( array( 'http://', 'https://' ) , '', SCF::get( 'url' ) ) ); ?></a>
												</dd>
											</dl>
										<?php else : ?>
												<p class="c-img-description__title"><?php the_title(); ?></p>
										<?php endif; ?>
									</figcaption>
								</figure>
							</li>
						<?php endwhile;
							wp_reset_postdata();
						?>
						</ul>
					<?php
				endif;
			endif;
			$query_args = array (
				'post_type' => $args['template_name'],
				'meta_query' => array (
					array (
						'key' => 'sticky',
						'value' => true,
						'compare' =>  '!='
					)
				)
			);
			$wp_query = new WP_Query( $query_args );
			if ( $wp_query -> have_posts() ) : ?>
				<ul class="p-works-archive__items--2column__list">
					<?php while ( $wp_query -> have_posts() ) : $wp_query -> the_post(); ?>
						<li>
							<figure class="p-works-archive__items--2column__list__figure">
								<div class="c-imgwrap">
									<a href="<?php the_permalink(); ?>"><?php the_post_thumbnail( 'webdesign-thumb' ); ?></a>
								</div>
								<figcaption>
									<?php if ( SCF::get( 'url' ) ) : ?>
										<dl class="c-img-description">
											<dt class="c-img-description__title"><?php the_title(); ?></dt>
											<dd class="c-img-description__link">
												<a href="<?php echo esc_html( SCF::get( 'url' ) ); ?>" target="_blank"><?php echo esc_html( str_replace( array( 'http://', 'https://' ) , '', SCF::get( 'url' ) ) ); ?></a>
											</dd>
										</dl>
									<?php else : ?>
										<p class="c-img-description__title"><?php the_title(); ?></p>
									<?php endif; ?>
								</figcaption>
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