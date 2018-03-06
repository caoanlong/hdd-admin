<template>
	<div>
		<div id="editor" type="text/plain"></div>
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
		let that = this
		// 初始化UE
		this.editor = UE.getEditor('editor', this.config)
		this.editor.addListener('ready', function() {
			// 确保UE加载完成后，放入内容
			that.editor.setContent(that.defaultMsg)
		})
		// if(location.href.indexOf('#reloaded')==-1){
		// 	location.href=location.href+"#reloaded"
		// 	location.reload()
		// }
	},
	methods: {
		getUEContent() {
			return this.editor.getContent()
		}
	},
	destroyed() {
		this.editor.destroy()
	}
}
</script>

