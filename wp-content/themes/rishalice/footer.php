		<button class="p-go-to-top">
			<span class="p-go-to-top__text">Go to Top</span>
			<div class="p-go-to-top__icon"></div>
		</button>
		<footer class="p-footer">
			<nav class="p-footer__menu c-frame--ornament--type-b">
				<h3 class="screen-reader-text">フッター用メニュー</h3>
				<?php
					wp_nav_menu( array (
						'theme_location' => 'footer-menu',
						'container'		 => false
					) );
				?>
				<div class="p-footer__logoCopy">
					<p class="p-footer__logoCopy__logo">
						<a href="<?php echo esc_url(home_url('/')); ?>">
							<img src="<?php echo esc_url( get_theme_file_uri( '/images/header-footer/logo_footer.svg' ) ); ?>" alt="ロゴ画像">
						</a>
					</p>
					<p class="p-footer__logoCopy__copy"><small>&copy; Rish inc. All Rights Reserved.</small></p>
				</div>
				<div class="p-footer__img">
					<img src="<?php echo esc_url( get_theme_file_uri( '/images/header-footer/rabbit.png' ) ); ?>" alt="ウサギ" class="p-footer__img--rabbit">
					<img src="<?php echo esc_url( get_theme_file_uri( '/images/header-footer/alice.png' ) ); ?>" alt="アリス" class="p-footer__img--alice">
				</div>
			</nav>
			<div id="js-wave" class="p-footer__bg bodymovin" data-bm-path="<?php echo esc_url( get_theme_file_uri( '/js/footer_wave.json' ) ); ?>" data-bm-renderer="svg" aria-hidden="true"></div>
		</footer>
		<div class="c-bg--parallax1" aria-hidden="true"></div>
		<div class="c-bg--parallax2" aria-hidden="true"></div>
		<div class="p-bg c-bg--stripe" aria-hidden="true"></div>
		<?php wp_footer(); ?>
	</body>
</html>
