<?php get_header(); ?>
	<main class="l-main">
		<article class="p-single c-inner c-content">
			<div class="p-single__head c-decoration--wing-line--under">
				<span class="c-decoration--english">Blog</span>
				<h1 class="c-font--big">ブログ</h1>
			</div>
			<?php
				if( have_posts() ) :
					while( have_posts() ) : the_post(); ?>
						<div class="p-single__contents">
							<h2 class="p-single__contents__title"><?php the_title(); ?></h2>
							<div class="p-single__contents__inner">
								<span class="p-single__contents__day"><?php echo esc_html( get_the_date( 'Y年m月d日') ); ?></span>
								<?php
									$categories = get_the_category();
									if( $categories ){
										echo '<ul class="p-single__contents__category-list">';
										foreach( $categories as $category ){
											echo '<li class="p-single__contents__category-list__item"><a href="' . get_category_link( $category->term_id ) . '">' . $category->name . '</a></li>';
										}
										echo '</ul>';
									}
								?>
							</div>
							<?php
								$posttags = get_the_tags();
								if( $posttags ){
									echo '<div class="p-single__contents__tags">';
									echo '<i class="c-mark--tag-icon"></i>';
									echo '<ul class="p-single__tags">';
									foreach ( $posttags as $tag ) {
										echo '<li><a href="' . get_tag_link( $tag->term_id ) . '">' . $tag->name . '</a></li>'; 
									}
									echo '</ul>';
									echo '</div>';
								}
							?>
						</div>
						<figure class="p-single__contents__thumbnail">
							<?php
								if(has_post_thumbnail() ):
									the_post_thumbnail('full', array("alt" => get_the_title(), "class" => "p-single__contents__thumbnail__img")); ?>
									<?php
								endif;
							?>
						</figure>
						<article class="p-single__contents__content">
							<?php the_content(); ?>
						</article>
					<?php endwhile; ?>
			<?php endif; ?>
			<?php get_template_part( 'components/template/contact' ); ?>
		</article>
	</main>
<?php get_footer(); ?>
