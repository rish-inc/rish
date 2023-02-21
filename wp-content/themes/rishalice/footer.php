			<footer class="p-footer">
				<nav class="p-footer__menu">
					<?php
						wp_nav_menu( array (
							'theme_location' => 'footer-menu',
							'container'		 => false
						) );
					?>
				</nav>
				<p class="p-footer__logo">
					<a href="<?php echo esc_url(home_url('/')); ?>">
						<img src="<?php echo esc_url( get_theme_file_uri( '/images/header-footer/logo_footer.svg' ) ); ?>" alt="ロゴ画像">
					</a>
				</p>
				<p class="p-footer__copy"><small>&copy; Rish inc. All Rights Reserved.</small></p>
			</footer>
			<?php wp_footer(); ?>
		</div>
	</body>
</html>
