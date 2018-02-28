<template>
	<div>
		<script id="editor" type="text/plain"></script>
	</div>
</template>
<script>
export default {
	name: 'UE',
	props: {
		defaultMsg: {
			type: String,
			default: '哈哈'
		},
		config: {
			type: Object
		}
	},
	data() {
		return {
			editor: null
		}
	},
	// watch: {
	// 	defaultMsg(newVal) {
	// 		this.editor.setContent(this.newVal)
	// 	}
	// },
	mounted() {
		this.initEditor()
		// if(location.href.indexOf('#reloaded')==-1){
		// 	location.href=location.href+"#reloaded"
		// 	location.reload()
		// }
	},
	methods: {
		initEditor(n) {
			console.log('初始化')
			let that = this
			// 初始化UE
			this.editor = UE.getEditor('editor', this.config)
			this.editor.addListener('ready', function() {
				// 确保UE加载完成后，放入内容
				that.editor.setContent(that.defaultMsg)
			})
		},
		getUEContent() {
			return this.editor.getContent()
		}
	},
	destroyed() {
		console.log('销毁')
		this.editor.destroy()
	}
}
</script>

