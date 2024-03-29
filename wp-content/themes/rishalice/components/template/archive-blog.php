<?php if( have_posts() ) : ?>
	<ul class="p-blog-archive__list p-card--blog">
		<?php while( have_posts() ) : the_post(); ?>
			<li class="p-blog-archive__list__item p-card--blog__list">
				<a class="p-card--blog__link" href="<?php the_permalink(); ?>">
					<figure class="p-card--blog__thumbnail">
						<?php
							if(has_post_thumbnail() ):
								the_post_thumbnail(array(333, 254), array("alt" => get_the_title(), "class" => "p-card--blog__thumbnail__img"));
							else:
								?><img src="<?php echo get_template_directory_uri() ?>/images/blog/none-eye-catching.png" alt="画像はありません" class="p-card--blog__thumbnail--noimg"><?php
							endif;
						?>
					</figure>
				</a>
				<?php
					$categories = get_the_category();
					if( $categories ){
						echo '<ul class="p-card--blog__category-list">';
						foreach( $categories as $category ){
							echo '<li class="p-card--blog__category-list__item"><a href="' . get_category_link( $category->term_id ) . '">' . $category->name . '</a></li>';
						}
						echo '</ul>';
					}
				?>
				<figcaption class="p-card--blog__contents">
					<a class="p-card--blog__link" href="<?php the_permalink(); ?>">
						<span class="p-card--blog__contents__day"><?php echo esc_html( get_the_date( 'Y年m月d日') ); ?></span>
						<h2 class="p-card--blog__contents__title"><?php the_title(); ?></h2>
						<p class="p-card--blog__contents__excerpt"><?php the_excerpt(); ?></p>
					</a>
					<?php
						$posttags = get_the_tags();
						if( $posttags ){
							echo '<div class="p-card--blog__contents__tags">';
							echo '<i class="c-mark--tag-icon"></i>';
							echo '<ul class="p-card--blog__tags">';
							foreach ( $posttags as $tag ) {
								echo '<li><a href="' . get_tag_link( $tag->term_id ) . '">' . $tag->name . '</a></li>';
							}
							echo '</ul>';
							echo '</div>';
						}
					?>
				</figcaption>
			</li>
		<?php endwhile; ?>
	</ul>
<?php else : ?>
	<div class="p-form__sentence__text">
		<p>投稿はまだありません</p>
	</div>
<?php endif; ?>
<div class="p-blog-archive__pagination p-pagination">
	<?php if ( function_exists( 'wp_pagenavi' ) ) { wp_pagenavi(); } ?>
</div>
