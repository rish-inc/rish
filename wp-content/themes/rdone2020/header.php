<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
	<?php echo get_template_part( "/components/traking/google_analytics" ); ?>
	<meta charset="<?php bloginfo( 'charset' ); ?>">
	<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0, user-scalable=yes">
	<meta name="description" content="<?php bloginfo( 'description' ); ?>">
	<?php if (is_home() || is_front_page()) :?>
	<meta property="og:title" content="<?php bloginfo('name'); ?>">
	<?php else: ?>
	<meta property="og:title" content="<?php the_title(); ?>">
	<?php endif ;?>
	<?php if (is_home() || is_front_page()) :?>
	<meta property="og:url" content="<?php bloginfo('url'); ?>">
	<?php else: ?>
	<meta property="og:url" content="<?php the_permalink() ?>">
	<?php endif ;?>
	<meta property="og:description" content="<?php bloginfo('description'); ?>">
	<meta name="twitter:card" content="summary_large_image">
	<meta name="twitter:site" content="rish0820">
	<meta name="twitter:title" content="<?php the_title(); ?>">
	<meta name="twitter:description" content="<?php echo wp_strip_all_tags ( get_the_excerpt() ); ?>">
	<meta name="twitter:image" content="<?php echo ogpimg(); ?>">
	<meta property="og:url" content="<?php the_permalink(); ?>">
	<link rel="shortcut icon" type="image/vnd.microsoft.icon" href="<?php echo COMMON_PFIX; ?>/images/common/ico/favicons/favicon.ico">
	<link rel="icon" type="image/vnd.microsoft.icon" href="<?php echo COMMON_PFIX; ?>/images/common/ico/favicons/favicon.ico">
	<link rel="apple-touch-icon" sizes="57x57" href="<?php echo COMMON_PFIX; ?>/images/common/ico/favicons/apple-touch-icon-57x57.png">
	<link rel="apple-touch-icon" sizes="60x60" href="<?php echo COMMON_PFIX; ?>/images/common/ico/favicons/apple-touch-icon-60x60.png">
	<link rel="apple-touch-icon" sizes="72x72" href="<?php echo COMMON_PFIX; ?>/images/common/ico/favicons/apple-touch-icon-72x72.png">
	<link rel="apple-touch-icon" sizes="76x76" href="<?php echo COMMON_PFIX; ?>/images/common/ico/favicons/apple-touch-icon-76x76.png">
	<link rel="apple-touch-icon" sizes="114x114" href="<?php echo COMMON_PFIX; ?>/images/common/ico/favicons/apple-touch-icon-114x114.png">
	<link rel="apple-touch-icon" sizes="120x120" href="<?php echo COMMON_PFIX; ?>/images/common/ico/favicons/apple-touch-icon-120x120.png">
	<link rel="apple-touch-icon" sizes="144x144" href="<?php echo COMMON_PFIX; ?>/images/common/ico/favicons/apple-touch-icon-144x144.png">
	<link rel="apple-touch-icon" sizes="152x152" href="<?php echo COMMON_PFIX; ?>/images/common/ico/favicons/apple-touch-icon-152x152.png">
	<link rel="apple-touch-icon" sizes="180x180" href="<?php echo COMMON_PFIX; ?>/images/common/ico/favicons/apple-touch-icon-180x180.png">
	<link rel="icon" type="image/png" sizes="192x192" href="<?php echo COMMON_PFIX; ?>/images/common/ico/favicons/android-chrome-192x192.png">
	<link rel="icon" type="image/png" sizes="48x48" href="<?php echo COMMON_PFIX; ?>/images/common/ico/favicons/favicon-48x48.png">
	<link rel="icon" type="image/png" sizes="96x96" href="<?php echo COMMON_PFIX; ?>/images/common/ico/favicons/favicon-96x96.png">
	<link rel="icon" type="image/png" sizes="96x96" href="<?php echo COMMON_PFIX; ?>/images/common/ico/favicons/favicon-160x160.png">
	<link rel="icon" type="image/png" sizes="96x96" href="<?php echo COMMON_PFIX; ?>/images/common/ico/favicons/favicon-196x196.png">
	<link rel="icon" type="image/png" sizes="16x16" href="<?php echo COMMON_PFIX; ?>/images/common/ico/favicons/favicon-16x16.png">
	<link rel="icon" type="image/png" sizes="32x32" href="<?php echo COMMON_PFIX; ?>/images/common/ico/favicons/favicon-32x32.png">
	<link rel="manifest" href="<?php echo COMMON_PFIX; ?>/images/common/ico/favicons/manifest.json">
	<meta name="msapplication-TileColor" content="#2d88ef">
	<meta name="msapplication-TileImage" content="/mstile-144x144.png">
	<script>
		(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
		(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
		m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
		})(window,document,'script','//www.google-analytics.com/analytics.js','ga');

		ga('create', 'UA-65107369-1', 'auto');
		ga('send', 'pageview');
	</script>
	<link rel="pingback" href="<?php bloginfo( 'pingback_url' ); ?>">
	<link rel="shortcut icon" type="image/vnd.microsoft.icon" href="<?php echo COMMON_PFIX; ?>/images/common/ico/favicons/favicon.ico">
	<?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>
	<div class="p-bgborder is-fade"></div>
	<?php wp_body_open(); ?>
	<?php
		if ( is_front_page() || is_home() ) :
			get_template_part( 'components/common/header-home' );
		elseif( is_404() ) :
			get_template_part( 'components/common/header-404' );
		else :
			get_template_part( 'components/common/header-other' );
		endif;
	?>
