			<div class="p-go-to-top">
				<span>Go to Top</span>
			</div>
			<footer class="p-footer">
				<nav class="p-footer__menu c-frame--ornament--type-b">
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
				</nav>
			</footer>
			<?php wp_footer(); ?>
		</div>
	</body>
</html>
