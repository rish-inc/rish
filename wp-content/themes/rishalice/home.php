<?php get_header(); ?>
	<main class="l-main">
		<article class="p-blog-archive c-inner c-content">
			<div class="p-blog-archive__head c-decoration--wing-line--under">
				<span class="c-decoration--english">Blog</span>
				<h1 class="c-font--big">ブログ</h1>
			</div>
			<?php get_template_part( 'components/template/archive-blog' ); ?>
			<?php get_template_part( 'components/template/contact' ); ?>
		</article>
	</main>
<?php get_footer(); ?>
