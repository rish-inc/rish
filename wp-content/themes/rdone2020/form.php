<div class="form-block">
	<dl>
		<dt>name *</dt>
		<dd>[mwform_text name="username" id="username" class="text-input" placeholder="川西 康人"]</dd>
	</dl>
	<dl>
		<dt>company</dt>
		<dd>[mwform_text name="company" id="company" class="text-input" placeholder="Rish inc."]</dd>
	</dl>
	<dl>
		<dt>E-mail *</dt>
		<dd>[mwform_email name="useremail" id="useremail" class="text-input" placeholder="sample@example.com"]</dd>
	</dl>
	<dl>
		<dt>Type of inquiry *</dt>
		<dd>[mwform_select name="question" id="question" class="type-select" children="--選択してください--,ご相談,見積依頼,その他"]</dd>
	</dl>
	<dl>
		<dt>message *</dt>
		<dd>[mwform_textarea name="message" id="message" class="text-input" rows="1" placeholder="お仕事の依頼内容を詳しくご記入ください。"]</dd>
	</dl>
	<div class="captcha">[mwform_captcha name="mw-wp-form-captcha" string="0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ" line="5" scratch="50"]
	</div>
	<div class="set-bt">
	[mwform_bconfirm class="check-bt"]send[/mwform_bconfirm]
	[mwform_bback class="reset-bt"][/mwform_bback]
	[mwform_bsubmit name="submit-bt" class="submit-bt" value="送 信"][/mwform_bsubmit]
	</div>
</div>
