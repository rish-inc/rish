<?php get_header(); ?>
	<main class="l-main">
		<article class="p-404 c-inner c-content">
			<div class="p-404__head c-decoration--wing-line--under">
				<h1 class="c-font--big">４０４エラー</h1>
			</div>
			<section class="p-404__contents">
				<h2>お探しのページは見つかりませんでした</h2>
				<img src="<?php echo esc_url( get_theme_file_uri( '/images/hatenaalice.png' ) );?>" alt="ハテナを浮かべるアリス">
				<p>申し訳ありません、アクセスしようとしたページは何らかの理由で見つけられませんでした。</p>
				<p>恐れ入りますがサイトのトップページにアクセスしていただくか、検索やナビゲーションから別のページからご閲覧ください。</p>
			</section>
		</article>
	</main>
<?php get_footer(); ?>
