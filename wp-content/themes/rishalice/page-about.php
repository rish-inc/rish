<?php get_header(); ?>
	<main class="l-main">
		<article class="p-about c-inner c-content">
			<div class="p-about__head c-decoration--wing-line--under">
				<span class="c-decoration--english">About us</span>
				<h1 class="c-font--big">会社概要</h1>
			</div>
			<section class="p-about--philosophy">
				<figure class="p-about--philosophy__figure c-drop-shadow-bg--big--left">
					<img src="<?php echo esc_url( get_theme_file_uri( '/images/about/alice.jpg' ) ); ?>" alt="アリス">
				</figure>
				<div class="p-about--philosophy__inner">
					<h2 class="p-about--philosophy__head"><span>あなたらしく</span></h2>
					<p class="p-about--philosophy__text">自分らしくありたい。 この気持ちを持って生きているからこそ、関わる人に対してあなたらしくあってほしいと我々は考えています。</p>
					<p class="p-about--philosophy__text">弊社のビジョンは「相手の意見や生き方を尊重し、自分も自分らしく生きていく事」です。 自分らしくいきる権利は誰にも存在しますが、権利は義務を果たしてこそ。 会社という場所は関わってくださる方々をまず幸せにし、それがかなって初めて自分たちに幸せが返ってくると考えています。</p>
					<p class="p-about--philosophy__text">これをシンプルに表現した言葉が 「あなたらしく」 であり、会社のキャッチフレーズとしています。</p>
				</div>
			</section>

			<div class="p-about--profile">
				<dl class="p-about--profile__list">
					<dt class="p-about--profile__list__title">会社名<span>-Company name-</span></dt>
					<div class="p-about--profile__list__wrapper">
						<dd class="p-about--profile__list__text">株式会社 リッシュ</dd>
						<dd class="p-about--profile__list__text">Rish inc.</dd>
					</div>

					<dt class="p-about--profile__list__title c-line--ornament">住所<span>-Address-</span></dt>
					<div class="p-about--profile__list__wrapper">
						<dd class="p-about--profile__list__text">
							<dl>
								<dt>所在地</dt>
								<dd>〒581-0031 大阪府八尾市</dd>
								<dd class="u-mb--40 u-mb--pc--24">Yao-shi, Osaka 581-0031</dd>
							</dl>
						</dd>
					</div>

					<dt class="p-about--profile__list__title c-line--ornament">設立日<span>-Founded-</span></dt>
					<div class="p-about--profile__list__wrapper">
						<dd class="p-about--profile__list__text">2020年 8月</dd>
						<dd class="p-about--profile__list__text">August 2020</dd>
					</div>

					<dt class="p-about--profile__list__title c-line--ornament">資本金<span>-Capital-</span></dt>
					<div class="p-about--profile__list__wrapper">
						<dd class="p-about--profile__list__text">1,000,000円</dd>
						<dd class="p-about--profile__list__text">1,000,000 Yen</dd>
					</div>

					<dt class="p-about--profile__list__title c-line--ornament">代表取締役<span>-CEO-</span></dt>
					<div class="p-about--profile__list__wrapper">
						<dd class="p-about--profile__list__text">川西 康人</dd>
						<dd class="p-about--profile__list__text">Yasuhito Kawanishi</dd>
					</div>

					<dt class="p-about--profile__list__title c-line--ornament">事業内容<span>-Business-</span></dt>
					<div class="p-about--profile__list__wrapper">
						<dd class="p-about--profile__list__text u-mb--14">ウェブデザイン, ウェブ開発, コンテンツマーケティング,写真・動画撮影, 写真・動画編集, コンサルティング,電子商取引, ファッション・アパレルの物販, メディア運用</dd>
						<dd class="p-about--profile__list__text">E-commerce, Fashion and apparel product sales, Web design, Web Developent, Photo/video shooting, Photo/video edting, Consulting, Media Management</dd>
					</div>

					<dt class="p-about--profile__list__title c-line--ornament">古物商許可番号<span>-Curio dealer-</span></dt>
					<div class="p-about--profile__list__wrapper">
						<dd class="p-about--profile__list__text u-mb--14 u-mb--pc--0">古物商許可番号: 62107R021247</dd>
						<dd class="p-about--profile__list__text">Secondhand dealer license number: 62107R021247</dd>
					</div>

					<dt class="p-about--profile__list__title c-line--ornament">就業規則<span>-Labor regulations-</span></dt>
					<div class="p-about--profile__list__wrapper">
						<dd class="p-about--profile__list__text"><a href="//github.com/yat8823jp/EmployeeHandbook" target="_blank">GitHub のリポジトリをお読みください</a></dd>
						<dd class="p-about--profile__list__text"><a href="//github.com/yat8823jp/EmployeeHandbook" target="_blank">Lead GitHub repository</a></dd>
					</div>

					<dt class="p-about--profile__list__title c-line--ornament">主要取引先<span>-Main client-</span></dt>
					<div class="p-about--profile__list__wrapper">
						<dd class="p-about--profile__list__text u-mb--14 u-mb--pc--0">株式会社 TAM, 株式会社 RaiseTech, 株式会社 Studio Cologne, 株式会社フロンティアワークス, エックスサーバー株式会社</dd>
						<dd class="p-about--profile__list__text">TAM Co., Ltd., Raise Tech Co., Ltd., Studio Cologne, Frontier Works Inc., Server Co.</dd>
					</div>
					<dt class="p-about--profile__list__title c-line--ornament">税理士<span>-Advisory tax accountant-</span></dt>
					<div class="p-about--profile__list__wrapper">
						<dd class="p-about--profile__list__text"><a href="https://vs-group.jp/tax/" target="_blank">ベンチャーサポート税理士法人</a></dd>
						<dd class="p-about--profile__list__text"><a href="https://vs-group.jp/tax/" target="_blank">Venture Support Tax Corporation</a></dd>
					</div>
				</dl>
			</div>

			<?php get_template_part( 'components/template/contact' ); ?>
		</article>
	</main>
<?php get_footer(); ?>
