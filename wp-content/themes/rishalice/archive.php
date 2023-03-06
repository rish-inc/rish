<?php get_header(); ?>
    <main class="l-main">
		<article class="p-blog-archive c-inner c-content">
			<div class="p-blog-archive__head c-decoration--wing-line--under">
				<span class="c-decoration--english">Blog</span>
				<h1 class="c-font--big">ブログ</h1>
			</div>
			<ul class="p-blog-archive__list p-card--blog">
                <?php
                    if( have_posts() ) :
                        while( have_posts() ) : the_post(); ?>
                        <li class="p-blog-archive__list__item p-card--blog__list">
                            <a class="p-card--blog__link" href="<?php the_permalink(); ?>"></a>
                            <figure class="p-card--blog__thumbnail">
                                <?php
                                    if(has_post_thumbnail() ):
                                        the_post_thumbnail(array(333, 254), array("alt" => get_the_title(), "class" => "p-card--blog__thumbnail__img"));
                                    else:
                                        ?><img src="<?php echo get_template_directory_uri() ?>/images/blog/none-eye-catching.png" alt="画像はありません" class="p-card--blog__thumbnail__img"><?php
                                    endif;
                                ?>
                            </figure>
                            <!-- <?php the_category() ?> -->
                            <figcaption class="p-card--blog__contents">
                                <span class="p-card--blog__contents__day"><?php echo esc_html( get_the_date( 'Y年m月d日') ); ?></span>
                                <h2 class="p-card--blog__contents__title"><?php the_title(); ?></h2>
                                <p class="p-card--blog__contents__excerpt"><?php the_excerpt(); ?></p>
                                <?php
                                    $posttags = get_the_tags();
                                    if( $posttags ){
                                        echo '<ul class="p-card--blog__tags"><i class="c-mark--tag-icon"></i>';
                                        foreach ( $posttags as $tag ) {
                                            echo '<li><a href="' . get_tag_link( $tag->term_id ) . '">' . $tag->name . '</a></li>'; 
                                        }
                                        echo '</ul>';
                                    }
                                ?>
                            </figcaption>
                        </li>
                    <?php endwhile; ?>
                <?php endif; ?>
			</ul>
			<div class="c-pagination">
            </div>
			<?php get_template_part( 'components/template/contact' ); ?>
		</article>
	</main>
<?php get_footer(); ?>