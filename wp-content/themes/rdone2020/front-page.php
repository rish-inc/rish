<?php get_header(); ?>
<article class="l-main">
	<section class="p-top-section is-fade">
		<h2 class="headline">Web<span>Design</span></h2>
		<div class="c-inner">
			<header class="p-top-section__header">
				<dl class="description is-movetxt-r">
					<dt class="title">
						Website architecture
					</dt>
					<dd class="text">
						In order to make a website for business success, we suggest site design,<br>
						what to do and what is necessary.<br>
						It can be done consistently from design to construction, around the server.
					</dd>
				</dl>
			</header>
			<article class="p-top-section__items--2column">
				<?php
					$args = [ 'template_name' => 'webdesign' ];
					get_template_part( 'components/parts/top-webdesign', '', $args );
				?>
			</article>
		</div>
	</section>
	<section id="print" class="p-top-section--print is-fade">
		<h2 class="headline">Print&amp;<span>Graphic</span></h2>
		<div class="c-inner u-mt-20">
			<header class="p-top-section__header">
				<dl class="description is-movetxt-r">
					<dt class="title">
						Printed matter and graphics
					</dt>
					<dd class="text">
						Product and printed matter design work.
					</dd>
				</dl>
			</header>
			<article class="p-top-masonry">
				<?php
					$args = [ 'template_name' => 'print' ];
					get_template_part( 'components/parts/top-print', '', $args );
				?>
			</article>
		</div>
	</section>
	<section id="photo" class="p-top-photo is-fade">
		<header class="header">
			<div class="inner">
				<h2 class="headline">
					Photography
				</h2>
				<dl class="description">
					<dt class="ttl">Canon EOS 5D mark IV</dt>
					<dd class="data">
						<p>
							I am taking pictures of portraits, buildings, cityscapes etc.<br>
							And I use it as a graphic that does not come retouching.<br>
							It is a main visual or a variety of decorations.<br>
							Regarding portrait there are times when we take photos with companies' offer.
						</p>
					</dd>
				</dl>
			</div>
		</header>
		<article class="p-slide-panel">
			<?php
				$upload_dir = wp_upload_dir();
			?>
			<ul class="p-slide-panel__slide js-infiniteslide--left">
				<li><a href="<?php echo get_theme_file_uri( '/images/photo/items/CK8A0109-1024x683.jpg' ); ?>" data-group="gallery" data-modaal-animation="fade" class="gallery"><img src="<?php echo get_theme_file_uri( '/images/photo/items/CK8A0109-150x150.jpg' ); ?>" alt="梅田ビルの写真"></a></li>
				<li><a href="<?php echo get_theme_file_uri( '/images/photo/items/CK8A0796-1024x683.jpg' ); ?>" data-group="gallery" data-modaal-animation="fade" class="gallery"><img src="<?php echo get_theme_file_uri( '/images/photo/items/CK8A0796-150x150.jpg' ); ?>" alt="電線と夏空の写真"></a></li>
				<li><a href="<?php echo get_theme_file_uri( '/images/photo/items/CK8A3703-1024x683.jpg' ); ?>" data-group="gallery" data-modaal-animation="fade" class="gallery"><img src="<?php echo get_theme_file_uri( '/images/photo/items/CK8A3703-150x150.jpg' ); ?>" alt="ピンボールの写真"></a></li>
				<li><a href="<?php echo get_theme_file_uri( '/images/photo/items/CK8A3829-1024x683.jpg' ); ?>" data-group="gallery" data-modaal-animation="fade" class="gallery"><img src="<?php echo get_theme_file_uri( '/images/photo/items/CK8A3829-150x150.jpg' ); ?>" alt="道路と車の光跡の写真"></a></li>
				<li><a href="<?php echo get_theme_file_uri( '/images/photo/items/CK8A3866-1024x683.jpg' ); ?>" data-group="gallery" data-modaal-animation="fade" class="gallery"><img src="<?php echo get_theme_file_uri( '/images/photo/items/CK8A3866-150x150.jpg' ); ?>" alt="秋の雲空の写真"></a></li>
				<li><a href="<?php echo get_theme_file_uri( '/images/photo/items/4M3A5415-1024x683.jpg' ); ?>" data-group="gallery" data-modaal-animation="fade" class="gallery"><img src="<?php echo get_theme_file_uri( '/images/photo/items/4M3A5415-150x150.jpg' ); ?>" alt="ビルと道の写真"></a></li>
				<li><a href="<?php echo get_theme_file_uri( '/images/photo/items/4M3A5518-1024x683.jpg' ); ?>" data-group="gallery" data-modaal-animation="fade" class="gallery"><img src="<?php echo get_theme_file_uri( '/images/photo/items/4M3A5518-150x150.jpg' ); ?>" alt="カメラの写真"></a></li>
				<li><a href="<?php echo get_theme_file_uri( '/images/photo/items/4M3A5597-1024x683.jpg' ); ?>" data-group="gallery" data-modaal-animation="fade" class="gallery"><img src="<?php echo get_theme_file_uri( '/images/photo/items/4M3A5597-150x150.jpg' ); ?>" alt="小道具の写真"></a></li>
				<li><a href="<?php echo get_theme_file_uri( '/images/photo/items/4M3A5615-1024x683.jpg' ); ?>" data-group="gallery" data-modaal-animation="fade" class="gallery"><img src="<?php echo get_theme_file_uri( '/images/photo/items/4M3A5615-150x150.jpg' ); ?>" alt="タイプライターの写真"></a></li>
				<li><a href="<?php echo get_theme_file_uri( '/images/photo/items/4M3A6421-1024x683.jpg' ); ?>" data-group="gallery" data-modaal-animation="fade" class="gallery"><img src="<?php echo get_theme_file_uri( '/images/photo/items/4M3A6421-150x150.jpg' ); ?>" alt="空間の写真"></a></li>
				<li><a href="<?php echo get_theme_file_uri( '/images/photo/items/4M3A6482-1024x684.jpg' ); ?>" data-group="gallery" data-modaal-animation="fade" class="gallery"><img src="<?php echo get_theme_file_uri( '/images/photo/items/4M3A6482-150x150.jpg' ); ?>" alt="踏切の写真"></a></li>
				<li><a href="<?php echo get_theme_file_uri( '/images/photo/items/4M3A6503-1024x683.jpg' ); ?>" data-group="gallery" data-modaal-animation="fade" class="gallery"><img src="<?php echo get_theme_file_uri( '/images/photo/items/4M3A6503-150x150.jpg' ); ?>" alt="空の写真"></a></li>
				<li><a href="<?php echo get_theme_file_uri( '/images/photo/items/4M3A6506-1024x683.jpg' ); ?>" data-group="gallery" data-modaal-animation="fade" class="gallery"><img src="<?php echo get_theme_file_uri( '/images/photo/items/4M3A6506-150x150.jpg' ); ?>" alt="高架下の写真"></a></li>
				<li><a href="<?php echo get_theme_file_uri( '/images/photo/items/4M3A6512-1024x683.jpg' ); ?>" data-group="gallery" data-modaal-animation="fade" class="gallery"><img src="<?php echo get_theme_file_uri( '/images/photo/items/4M3A6512-150x150.jpg' ); ?>" alt="踏切の写真"></a></li>
			</ul>
			<ul class="p-slide-panel__slide js-infiniteslide--right">
				<li><a href="<?php echo get_theme_file_uri( '/images/photo/items/4M3A3849-1024x683.jpg' ); ?>" data-group="gallery" data-modaal-animation="fade" class="gallery"><img src="<?php echo get_theme_file_uri( '/images/photo/items/4M3A3849-150x150.jpg' ); ?>" alt="紫陽花の写真"></a></li>
				<li><a href="<?php echo get_theme_file_uri( '/images/photo/items/4M3A3020-1024x683.jpg' ); ?>" data-group="gallery" data-modaal-animation="fade" class="gallery"><img src="<?php echo get_theme_file_uri( '/images/photo/items/4M3A3020-150x150.jpg' ); ?>" alt="夜の工場とリフレクションの写真"></a></li>
				<li><a href="<?php echo get_theme_file_uri( '/images/photo/items/4M3A4341-1024x683.jpg' ); ?>" data-group="gallery" data-modaal-animation="fade" class="gallery"><img src="<?php echo get_theme_file_uri( '/images/photo/items/4M3A4341-150x150.jpg' ); ?>" alt="神戸と女性モデルの写真"></a></li>
				<li><a href="<?php echo get_theme_file_uri( '/images/photo/items/4M3A4892-1024x683.jpg' ); ?>" data-group="gallery" data-modaal-animation="fade" class="gallery"><img src="<?php echo get_theme_file_uri( '/images/photo/items/4M3A4892-150x150.jpg' ); ?>" alt="窓際と女性モデルの写真"></a></li>
				<li><a href="<?php echo get_theme_file_uri( '/images/photo/items/4M3A4218-1024x683.jpg' ); ?>" data-group="gallery" data-modaal-animation="fade" class="gallery"><img src="<?php echo get_theme_file_uri( '/images/photo/items/4M3A4218-150x150.jpg' ); ?>" alt="工具の写真"></a></li>
				<li><a href="<?php echo get_theme_file_uri( '/images/photo/items/4M3A6518-1024x683.jpg' ); ?>" data-group="gallery" data-modaal-animation="fade" class="gallery"><img src="<?php echo get_theme_file_uri( '/images/photo/items/4M3A6518-150x150.jpg' ); ?>" alt="夕焼けと街の写真"></a></li>
				<li><a href="<?php echo get_theme_file_uri( '/images/photo/items/IMG_7055-1024x683.jpg' ); ?>" data-group="gallery" data-modaal-animation="fade" class="gallery"><img src="<?php echo get_theme_file_uri( '/images/photo/items/IMG_7055-150x150.jpg' ); ?>" alt="薔薇の写真"></a></li>
				<li><a href="<?php echo get_theme_file_uri( '/images/photo/items/4M3A6527-1024x683.jpg' ); ?>" data-group="gallery" data-modaal-animation="fade" class="gallery"><img src="<?php echo get_theme_file_uri( '/images/photo/items/4M3A6527-150x150.jpg' ); ?>" alt="スモークビーフの写真"></a></li>
				<li><a href="<?php echo get_theme_file_uri( '/images/photo/items/4M3A6550-1024x683.jpg' ); ?>" data-group="gallery" data-modaal-animation="fade" class="gallery"><img src="<?php echo get_theme_file_uri( '/images/photo/items/4M3A6550-150x150.jpg' ); ?>" alt="夕焼けと道路の写真"></a></li>
				<li><a href="<?php echo get_theme_file_uri( '/images/photo/items/IMG_7038-1024x683.jpg' ); ?>" data-group="gallery" data-modaal-animation="fade" class="gallery"><img src="<?php echo get_theme_file_uri( '/images/photo/items/IMG_7038-150x150.jpg' ); ?>" alt="薔薇の写真"></a></li>
				<li><a href="<?php echo get_theme_file_uri( '/images/photo/items/4M3A9444-1024x683.jpg' ); ?>" data-group="gallery" data-modaal-animation="fade" class="gallery"><img src="<?php echo get_theme_file_uri( '/images/photo/items/4M3A9444-150x150.jpg' ); ?>" alt="桜の写真"></a></li>
			</ul>
			<ul class="p-slide-panel__slide js-infiniteslide--left">
				<li><a href="<?php echo get_theme_file_uri( '/images/photo/items/4M3A1946-1024x683.jpg' ); ?>" data-group="gallery" data-modaal-animation="fade" class="gallery"><img src="<?php echo get_theme_file_uri( '/images/photo/items/4M3A1946-150x150.jpg' ); ?>" alt="夜の工場"></a></li>
				<li><a href="<?php echo get_theme_file_uri( '/images/photo/items/4M3A6065-1024x683.jpg' ); ?>" data-group="gallery" data-modaal-animation="fade" class="gallery"><img src="<?php echo get_theme_file_uri( '/images/photo/items/4M3A6065-150x150.jpg' ); ?>" alt="女性モデルの写真"></a></li>
				<li><a href="<?php echo get_theme_file_uri( '/images/photo/items/4M3A7095-1024x683.jpg' ); ?>" data-group="gallery" data-modaal-animation="fade" class="gallery"><img src="<?php echo get_theme_file_uri( '/images/photo/items/4M3A7095-150x150.jpg' ); ?>" alt="美術館の写真"></a></li>
				<li><a href="<?php echo get_theme_file_uri( '/images/photo/items/4M3A4161-1024x683.jpg' ); ?>" data-group="gallery" data-modaal-animation="fade" class="gallery"><img src="<?php echo get_theme_file_uri( '/images/photo/items/4M3A4161-150x150.jpg' ); ?>" alt="工場の写真"></a></li>
				<li><a href="<?php echo get_theme_file_uri( '/images/photo/items/4M3A7556-1024x683.jpg' ); ?>" data-group="gallery" data-modaal-animation="fade" class="gallery"><img src="<?php echo get_theme_file_uri( '/images/photo/items/4M3A7556-150x150.jpg' ); ?>" alt="ニューヨークのビルの写真"></a></li>
				<li><a href="<?php echo get_theme_file_uri( '/images/photo/items/4M3A8806-1024x683.jpg' ); ?>" data-group="gallery" data-modaal-animation="fade" class="gallery"><img src="<?php echo get_theme_file_uri( '/images/photo/items/4M3A8806-150x150.jpg' ); ?>" alt="花火の写真"></a></li>
				<li><a href="<?php echo get_theme_file_uri( '/images/photo/items/4M3A6586-1024x683.jpg' ); ?>" data-group="gallery" data-modaal-animation="fade" class="gallery"><img src="<?php echo get_theme_file_uri( '/images/photo/items/4M3A6586-150x150.jpg' ); ?>" alt="夕焼けと道路と高架の写真"></a></li>
				<li><a href="<?php echo get_theme_file_uri( '/images/photo/items/DSCF0341-1024x683.jpg' ); ?>" data-group="gallery" data-modaal-animation="fade" class="gallery"><img src="<?php echo get_theme_file_uri( '/images/photo/items/DSCF0341-150x150.jpg' ); ?>" alt="夜の道路の写真"></a></li>
				<li><a href="<?php echo get_theme_file_uri( '/images/photo/items/IMG_7044-1024x683.jpg' ); ?>" data-group="gallery" data-modaal-animation="fade" class="gallery"><img src="<?php echo get_theme_file_uri( '/images/photo/items/IMG_7044-150x150.jpg' ); ?>" alt="薔薇の写真"></a></li>
				<li><a href="<?php echo get_theme_file_uri( '/images/photo/items/4M3A7538-1024x683.jpg' ); ?>" data-group="gallery" data-modaal-animation="fade" class="gallery"><img src="<?php echo get_theme_file_uri( '/images/photo/items/4M3A7538-150x150.jpg' ); ?>" alt="ニューヨークの町並みの写真"></a></li>
				<li><a href="<?php echo get_theme_file_uri( '/images/photo/items/4M3A6573-1024x683.jpg' ); ?>" data-group="gallery" data-modaal-animation="fade" class="gallery"><img src="<?php echo get_theme_file_uri( '/images/photo/items/4M3A6573-150x150.jpg' ); ?>" alt="夕焼けと高架の写真"></a></li>
				<li><a href="<?php echo get_theme_file_uri( '/images/photo/items/4M3A4160-1024x683.jpg' ); ?>" data-group="gallery" data-modaal-animation="fade" class="gallery"><img src="<?php echo get_theme_file_uri( '/images/photo/items/4M3A4160-150x150.jpg' ); ?>" alt="工場の写真"></a></li>
				<li><a href="<?php echo get_theme_file_uri( '/images/photo/items/4M3A9456-1024x683.jpg' ); ?>" data-group="gallery" data-modaal-animation="fade" class="gallery"><img src="<?php echo get_theme_file_uri( '/images/photo/items/4M3A9456-150x150.jpg' ); ?>" alt="桜の写真"></a></li>
				<li><a href="<?php echo get_theme_file_uri( '/images/photo/items/4M3A4164-1024x683.jpg' ); ?>" data-group="gallery" data-modaal-animation="fade" class="gallery"><img src="<?php echo get_theme_file_uri( '/images/photo/items/4M3A4164-150x150.jpg' ); ?>" alt="機械の写真"></a></li>
				<li><a href="<?php echo get_theme_file_uri( '/images/photo/items/IMG_7060-1024x683.jpg' ); ?>" data-group="gallery" data-modaal-animation="fade" class="gallery"><img src="<?php echo get_theme_file_uri( '/images/photo/items/IMG_7060-150x150.jpg' ); ?>" alt="薔薇の写真"></a></li>
				<li><a href="<?php echo get_theme_file_uri( '/images/photo/items/DSCF0340-1024x683.jpg' ); ?>" data-group="gallery" data-modaal-animation="fade" class="gallery"><img src="<?php echo get_theme_file_uri( '/images/photo/items/DSCF0340-150x150.jpg' ); ?>" alt="夜の高架下の写真"></a></li>
				<li><a href="<?php echo get_theme_file_uri( '/images/photo/items/4M3A9530-1024x683.jpg' ); ?>" data-group="gallery" data-modaal-animation="fade" class="gallery"><img src="<?php echo get_theme_file_uri( '/images/photo/items/4M3A9530-150x150.jpg' ); ?>" alt="カラスの写真"></a></li>
				<li><a href="<?php echo get_theme_file_uri( '/images/photo/items/4M3A9666-1024x683.jpg' ); ?>" data-group="gallery" data-modaal-animation="fade" class="gallery"><img src="<?php echo get_theme_file_uri( '/images/photo/items/4M3A9666-150x150.jpg' ); ?>" alt="夕焼け空の写真"></a></li>
			</ul>
			<div class="js-imgover__close"></div>
			<div class="js-imgover__bg"></div>
		</article>
	</section>
	<section class="p-top--animation is-fade">
		<header class="p-top--animation__header">
			<h2>Animation</h2>
			<div class="c-inner">
				<dl class="description">
					<dt class="title">
						AfterEffects & Premire
					</dt>
					<dd class="text">
						I will use AfterEffects and Premire to make videos.<br>
						These tools will also be effective for promotions other than websites.
					</dd>
				</dl>
			</div>
		</header>
		<ul class="p-top--animation__items">
			<li>
				<iframe width="560" height="315" src="//www.youtube.com/embed/cNIKjufCbZQ?controls=0" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
			</li>
			<li>
				<iframe width="560" height="315" src="//www.youtube.com/embed/eI5GsrOlwJw?controls=0" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
			</li>
			<li>
				<iframe width="560" height="315" src="//www.youtube.com/embed/SmXxDENpE9k?controls=0" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
			</li>
			<li>
				<iframe width="560" height="315" src="//www.youtube.com/embed/T1jbE8i_-qQ?controls=0" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
			</li>
		</ul>
	</section>
	<section id="contact" class="p-top--contact is-fade">
		<dl class="p-top--contact__header">
			<dt>Contact</dt>
			<dd>お仕事のご依頼・ご相談等<br>
			こちらからお願いします。</dd>
		</dl>
		<div class="p-form">
			<?php //echo do_shortcode( '[mwform_formkey key="8"]' ); ?>
			<?php
				echo do_shortcode( '[contact-form-7 id="47" title="Contact form 1"]' );
				//local
				// echo do_shortcode( '[contact-form-7 id="68" title="コンタクトフォーム 1"]' );
			?>
		</div>
	</section>
	<section class="p-top--corpinfo is-fade">
		<div class="c-inner">
			<h2>About</h2>
			<dl>
				<dt>Company name</dt>
				<dd>
					Rish inc.<br>
					<small>株式会社 リッシュ</small>
				</dd>
				<dt>Address - Business office</dt>
				<dd>
					2-2-10 Tokui-cho, Chuo-ku, Osaka-shi, Osaka Arkmine B201 540-0025<br>
					<small>〒540-0025 大阪府大阪市中央区徳井町2−2−10 アークマインB201</small>
				</dd>
				<dt>Address - Headquarters</dt>
				<dd>
					4-114 Minami Uematsucho, Yao City, Osaka 581-0091<br>
					<small>〒581-0091 大阪府八尾市南植松町4丁目114</small>
				</dd>
				<dt>Founded</dt>
				<dd>
					August 2020<br>
					<small>2020年 8月</small>
				</dd>
				<dt>Capital</dt>
				<dd>
					1,000,000 Yen<br>
					<small>1,000,000円</small>
				</dd>
				<dt>CEO</dt>
				<dd>
					Yasuhito Kawanishi<br>
					<small>川西 康人</small>
				</dd>
				<dt>Business</dt>
				<dd>
					Web design, Web Developent, Photo/video shooting, Photo/video edting, Consulting, E-commerce, Fashion and apparel product sales<br>
					<small>ウェブデザイン, ウェブ開発, 写真・動画撮影, 写真・動画編集, コンサルティング, 電子商取引, ファッション・アパレルの物販</small>
				</dd>
				<dt>Curio dealer</dt>
				<dd>
					Secondhand dealer license number: 62107R021247<br>
					<small>古物商許可番号: 62107R021247</small>
				</dd>
				<dt>Labor regulations</dt>
				<dd>
					<a href="//github.com/yat8823jp/EmployeeHandbook" target="_blank">Lead GitHub repository</a><br>
					<small><a href="//github.com/yat8823jp/EmployeeHandbook" target="_blank">GitHub のリポジトリをお読みください</a></small>
				</dd>
				<dt>Main client</dt>
				<dd>
					TAM Co., Ltd., Raise Tech Co., Frontier Works Inc, Ltd., CodeUps LLC., Studio Cologne<br>
					<small>株式会社 TAM, 株式会社 RaiseTech, 株式会社フロンティアワークス, 合同会社CodeUps, 株式会社 Studio Cologne</small>
				</dd>
				<dt>Advisory tax accountant</dt>
				<dd>
					<a href="https://vs-group.jp/tax/" target="_blank">Venture Support Tax Corporation</a><br>
					<small><a href="https://vs-group.jp/tax/" target="_blank">ベンチャーサポート税理士法人</a></small>
				</dd>
				<dt>Legal advisor</dt>
				<dd>
					<a href="https://vs-group.jp/lawyer/" target="_blank">Venture Support Law Office</a><br>
					<small><a href="https://vs-group.jp/lawyer/" target="_blank">弁護士法人ベンチャーサポート法律事務所</a></small>
				</dd>
				<!-- <dt>Qualification</dt>
				<dd>
					Antique dealer permit<br>
					<small>古物商許可証：</small>
				</dd> -->
			</dl>
		</div>
	</section>
</article>
<?php get_footer(); ?>
