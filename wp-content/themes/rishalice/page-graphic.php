<?php get_header(); ?>
    <main class="l-main">
        <article class="p-graphic">
			<div class="p-graphic__head c-decoration--wing-line--under">
				<span class="c-decoration--english">Graphic Design</span>
				<h1 class="c-font--big">グラフィックデザイン</h1>
			</div>
            <div id="print" class="p-graphic__contents">
				<article class="p-top-masonry">
					<?php
						$args = [ 'template_name' => 'print' ];
						get_template_part( 'components/template/works-print', '', $args );
					?>
				</article>
            </div>
			<?php get_template_part( 'components/template/contact' ); ?>
		</article>
	</main>
<?php get_footer(); ?>