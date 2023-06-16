<?php
    if ( $args['template_name'] == 'webdesign' ) :
        $query_args = array (
            'post_type' => $args['template_name'],
            'posts_per_page' => 6 /* １ページあたりの投稿表示数 */
        );
        $wp_query = new WP_Query( $query_args );
        if ( $wp_query -> have_posts() ) : ?>
            <ul class="p-top-article--works__list">
                <?php while ( $wp_query -> have_posts() ) : $wp_query -> the_post(); ?>
                    <li class="p-card__link">
                        <figure class="p-card__link__caption">
                            <div class="p-card__link__caption__wrap">
                                <div class="p-card__link__caption__wrap__inner">
                                    <a href="<?php the_permalink(); ?>">
                                        <?php if(has_post_thumbnail()): ?>
                                            <img class="p-card__link__caption__wrap__img" src="<?php echo get_the_post_thumbnail_url(); ?>" alt="サムネイル">
                                        <?php else: ?>
                                            <img class="p-card__link__caption__wrap__img" src="<?php echo get_template_directory_uri(); ?>/images/blog/none-eye-catching.png" alt="サムネイルなし">
                                        <?php endif; ?>
                                    </a>
                                </div>
                            </div>
                            <figcaption class="p-card__link__caption__text">
                                <?php if ( SCF::get( 'url' ) ) : ?>
                                    <dl>
                                        <dt class="c-font--normal"><?php the_title(); ?></dt>
                                        <dd class="c-font--medium">
                                            <a href="<?php echo esc_html( SCF::get( 'url' ) ); ?>" target="_blank"><?php echo esc_html( str_replace( array( 'http://', 'https://' ) , '', SCF::get( 'url' ) ) ); ?></a>
                                        </dd>
                                    </dl>
                                <?php else : ?>
                                        <p class="c-font--normal"><?php the_title(); ?></p>
                                <?php endif; ?>
                            </figcaption>
                        </figure>
                    </li>
                <?php endwhile;
                    wp_reset_postdata();
                ?>
            </ul>
            <?php
        endif;
    endif;
?>