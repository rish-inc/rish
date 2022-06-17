<?php
function rishinc_readScript() {
    wp_enqueue_style ( 'rishinc_css', get_theme_file_uri( '/css/style.css' ), array(), '1.0.0' );
}
add_action( 'wp_enqueue_scripts', 'rishinc_readScript' );