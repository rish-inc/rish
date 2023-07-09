<?php
	include_once( ABSPATH . 'wp-admin/includes/plugin.php' );
	if ( get_post_type() == 'print' ) {
		$class = get_post_type();
	} else {
		$class = "achievement";
	}
?>
<header class="l-header p-header--<?php echo $class; ?>">
	<!-- <p class="p-backtop"><a href="/">← To the top page of Rish inc.</a></p> -->
	<div class="c-inner">
		<?php global $wp_query;
			if( $wp_query -> have_posts( $args ) ) :
				while( $wp_query -> have_posts() ) :
					$wp_query -> the_post();
					$title = get_the_title();
					if( get_post_type() == "webdesign" ) :
						if( is_plugin_active( "smart-custom-fields/smart-custom-fields.php" ) ) {
							$url = esc_url( SCF::get( "url" ) );
							if ( SCF::get( "releasedate" ) ) {
								$release_date = date_create( SCF::get( "releasedate" ) );
								$date =  date_format( $release_date, 'M, d, Y' );
							}
						}
						$tags = get_the_terms( $post -> ID, 'type_tag');
						if ( $tags ) :
							$type_tags = 'Works: [ ';
							if ( ! isset( $terms ) ) {
								// if ( ! is_array( $terms ) ) {
									foreach( $tags as $tag ) {
										if ( $tag === end( $tags ) ) {
											$type_tags .= $tag -> name;
										} else {
											$type_tags .= $tag -> name . ', ';
										}
									}
								// }
							}
							$type_tags .= ' ]';
						endif; ?>
					<?php endif; ?>
					<h2><?php echo esc_html( $title ); ?></h2>
					<?php if ( isset( $url ) ) : ?>
						<a href="<?php echo $url ?>" target="_blank" class="p-header--achievement__url"><?php echo $url ?></a>
					<?php endif; ?>
					<?php if ( isset( $tags ) ) : ?>
						<p class="p-header--achievement__tag"><?php echo esc_html( $type_tags ); ?></p>
					<?php elseif ( is_single() ) : ?>
						<p class="p-header--achievement__tag"><?php the_category( '', 'multiple' ); ?></p>
					<?php endif; ?>
					<?php if ( isset( $date ) ) : ?>
						<p class="p-header--achievement__date">Release: <?php echo esc_html( $date ); ?></p>
					<?php endif; ?>
					<?php echo imgdescription(); ?>
				<?php endwhile; ?>
			<?php endif;
		?>
	</div><!--./c-inner-->
</header>
