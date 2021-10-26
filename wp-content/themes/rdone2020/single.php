<?php get_header(); ?>
<?php
	if( $post_type != "" ) {
		get_template_part( 'components/parts/detail-portfolio' );
	}
?>
<?php get_footer(); ?>
