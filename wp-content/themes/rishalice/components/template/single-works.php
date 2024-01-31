	<main class="l-main">
		<article class="p-single-works">
			<div class="p-single-works__head c-decoration--wing-line--under">
				<!-- 遷移元URLによって見出しを変更 -->
				<?php $url = $_SERVER['HTTP_REFERER']; ?>
				<?php if( strstr( $url, 'graphic' ) ): ?>
					<span class="c-decoration--english">Graphic Design</span>
					<h1 class="c-font--big">グラフィックデザイン</h1>
				<?php else: ?>
					<span class="c-decoration--english">Works</span>
					<h1 class="c-font--big">制作実績</h1>
				<?php endif; ?>
			</div>
			<!-- カスタム投稿の詳細ページなら専用ヘッダーを表示 -->
			<?php
				if ( is_singular( array( 'webdesign', 'print' ) ) ) :
					get_template_part( 'components/template/header-single-works' );
				endif;
			?>
			<?php
				if( $post_type != "" ) {
					get_template_part( 'components/template/detail-portfolio', NULL,  get_post_type() );
				}
			?>
			<?php get_template_part( 'components/template/contact' ); ?>
		</article>
	</main>
