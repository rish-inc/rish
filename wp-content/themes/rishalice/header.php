<!DOCTYPE html>
<html <?php language_attributes(); ?>>
	<head>
		<meta charset="UTF-8">
		<meta http-equiv="X-UA-Compatible" content="IE=edge">
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<title><?php bloginfo( 'name' ); ?></title>
		<?php wp_head(); ?>
	</head>
	<body <?php body_class(); ?>>
		<div class="p-bg c-bg--stripe">
			<header class="l-header p-header">
				<button class="p-header__button"><span></span></button>
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
							<img src="<?php echo esc_url( get_theme_file_uri( '/images/header-footer/logo_header.svg' ) ); ?>" alt="ロゴ画像">
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
