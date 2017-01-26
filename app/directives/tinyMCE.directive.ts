import {Directive} from '@angular/core';
declare var tinymce: any;
// Tinymce directive
@Directive({
	inputs: ['htmlEditor'],
	selector: '[htmlEditor]'
	})

export class EditorDirective{
	constructor(){
		tinymce.init({
			selector: "#post-content",
			plugins: "directionality",
			menubar: false,
			directionality: "rtl",
			content_css : "/app/assets/css/main.css",
			body_class: 'bigger',
		});
	}
}