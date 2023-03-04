<?php get_header(); ?>
    <main class="l-main">
		<article class="p-blog-archive c-inner c-content">
			<div class="p-blog-archive__head c-decoration--wing-line--under">
				<span class="c-decoration--english">Blog</span>
				<h1 class="c-font--big">ブログ</h1>
			</div>
			<ul class="p-blog-archive__list">
                <?php
                    if( have_posts() ) :
                        while( have_posts() ) :
                            the_post(); ?>
                            <li class="p-blog-archive__list__item">
                                <a class="p-card__link" href="<?php the_permalink(); ?>">
                                <h2><?php the_title(); ?></h2>
                                </a>
                            </li>
                        <?php endwhile; ?>
                <?php endif; ?>
			</ul>
			
			<?php get_template_part( 'components/template/contact' ); ?>
		</article>
	</main>
<?php get_footer(); ?>