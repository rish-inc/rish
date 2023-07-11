( function () {
	const createElement = wp.element.createElement;
	const registerBlockType = wp.blocks.registerBlockType;
	const InnerBlocks = wp.blockEditor.InnerBlocks;
	wp.blocks.registerBlockStyle (
		'core/button', {
			name: 'cta--inquiry',
			label: 'CTA ボタン',
		}
	);
	wp.hooks.addFilter (
		'blocks.registerBlockType',
		'custom-button-block/attributes',
		function( settings, name ) {
			if ( name !== 'core/button' ) {
				return settings;
			}
			settings.attributes = Object.assign( settings.attributes, {
				linkImage: {
					type: 'string',
					default: customButtonBlockData.imagePath, // デフォルトの画像パスを指定します
				},
			} );
			return settings;
		}
	);
	wp.hooks.addFilter (
		'blocks.getSaveContent.extraProps',
		'custom-button-block/save-content-extra-props',
		function( extraProps, blockType, attributes ) {
			if ( blockType.name !== 'core/button' ) {
				return extraProps;
			}

			if ( attributes.linkImage ) {
				if ( extraProps.children !== 'undefined' ) {
					extraProps.children = [
						extraProps.children,
						createElement( 'img', { src: attributes.linkImage, className: 'custom-button-link-image' } )
					];
				}
			}
			return extraProps;
		}
	);
} )();
