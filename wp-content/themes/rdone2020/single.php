<?php get_header(); ?>
<?php
	if( $post_type != "" ) {
		echo "<script>console.log('" . $post_type . "');</script>";
		get_template_part( 'components/parts/detail-portfolio', NULL,  get_post_type() );
	}
?>
<?php get_footer(); ?>
