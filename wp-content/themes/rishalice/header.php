<!DOCTYPE html>
<html <?php language_attributes(); ?>>
	<head>
		<meta charset="<?php bloginfo( 'charset' ); ?>">
		<meta http-equiv="X-UA-Compatible" content="IE=edge">
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<title><?php bloginfo( 'name' ); ?></title>
		<?php wp_head(); ?>
		<!-- 管理画面にログイン中はアドミンバーを上に固定し、コンテンツを下げる -->
		<?php if( is_user_logged_in() ): ?>
			<style type="text/css">
				.p-header__button {
					top: 70px;
				}
				.p-header__menu #menu-header-menu {
					top: 32px;
				}
				#wpadminbar {
					position: fixed;
				}
			</style>
		<?php endif; ?>
	</head>
	<body <?php body_class(); ?>>
		<div class="p-bg c-bg--stripe">
			<div class="c-bg--parallax1">
			<div class="c-bg--parallax2">
			<header class="l-header p-header">
				<button class="p-header__button">
					<span>メニュー展開ボタン</span>
				</button>
				<nav class="p-header__menu">
					<?php
						wp_nav_menu( array (
							'theme_location' => 'header-menu',
							'container'		 => false
						) );
					?>
					<?php
						wp_nav_menu( array (
							'theme_location' => 'header-left-menu',
							'container'		 => false
						) );
					?>
					<h1 class="p-header__menu__logo">
						<a href="<?php echo esc_url(home_url('/')); ?>">
							<?php if ( is_home() || is_front_page() ) : //フロントページのみspanあり ?>
								<span><img src="<?php echo esc_url( get_theme_file_uri( '/images/header-footer/logo_header.svg' ) ); ?>" alt="ロゴ画像"></span>
							<?php else : ?>
								<img src="<?php echo esc_url( get_theme_file_uri( '/images/header-footer/logo_header.svg' ) ); ?>" alt="ロゴ画像">
							<?php endif; ?>
						</a>
					</h1>
					<?php
						wp_nav_menu( array (
							'theme_location' => 'header-right-menu',
							'container'		 => false
						) );
					?>
				</nav>
			</header>
			<?php wp_body_open(); ?>
