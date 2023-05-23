<?php get_header(); ?>
<?php
	if( $post_type != "" ) {
		get_template_part( 'components/parts/detail-portfolio', NULL,  get_post_type() );
	}
?>
<?php get_footer(); ?>
