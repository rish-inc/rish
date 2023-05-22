<article class="p-form">
	<div class="p-form__head c-decoration--wing-line--under">
		<span class="c-decoration--english">Contact</span>
		<h2 class="c-font--big">お問い合わせ</h2>
	</div>
	<div class="p-form__sentence">
		<p class="p-form__sentence__text">
			お問合せについて、<br>
			いざ思いや考えを伝えようとすると、どうすればうまく伝わるか考えてしまったり、<br>
			伝えようとしてもうまく話せるか不安になりますよね。<br>
			Web サイトやパンフレットの制作を依頼しようと思ってもどう話すか考えると<br>
			問い合わせボタンすら押せなくなると思います。<br>
		</p>
		<p class="p-form__sentence__text">
			ですが、私達は受託制作のプロですので完璧な話でなくとも<br>
			コミュニケーションを取りながら本当に伝えたい本質を探っていきます。<br>
			まずはざっくりとしたお話でも構いませんのでお聞かせください。<br>
		</p>
		<p class="p-form__sentence__text">
			私達はその本質の中からあなたらしさが何であるか。<br>
			そのあなたが表現したいことが何であるかを汲み取ってデザインをご提案させていただきます。<br>
		</p>
	</div>
	<div class="p-form__inner">
		<!-- 環境によってidが変わるため、コンタクトフォームの情報を取得してからショートコードを埋め込む -->
		<?php
			$get_form = get_posts(array('post_type' => 'wpcf7_contact_form', 'posts_per_page' => -1, 'name' => 'Contact form 1'))[0];
			echo do_shortcode( '[contact-form-7 id="'.$get_form->ID.'" title="'.$get_form->post_title.'"]' );
		?>
	</div>
</article>
