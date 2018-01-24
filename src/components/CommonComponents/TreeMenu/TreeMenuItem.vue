<template>
	<div class="tree-menu-wrapper">
		<div v-for="item in routes">
			<div class="tree-menu-title" @click.stop="selectOption(item)">
				<el-checkbox></el-checkbox>
				<svg-icon v-if="item.meta.icon" :icon-class="item.meta.icon"></svg-icon>
				<span slot="title">{{item.meta.title}}</span>
				<span v-if="item.children">[{{isOpen ? '-' : '+'}}]</span>
			</div>
			<tree-menu-item :routes="item.children" v-show="isOpen" v-if="item.children"/>
		</div>
	</div>
</template>

<script>
export default {
	name: 'tree-menu-item',
	props: {
		routes: {
			type: Array
		}
	},
	data() {
		return {
			selectedOption: null,
			isOpen: false
		}
	},
	computed: {
		isFolder() {
			return 
		}
	},
	methods: {
		selectOption(item) {
			this.selectedOption = item
			this.isOpen = !this.isOpen
			console.log(item.meta.title)
		}
	}
}
</script>
<style lang="stylus" scoped>
	.tree-menu-title
		line-height 40px
		padding-left 10px
		font-size 14px
		cursor pointer
		&.active
			color #fff
			background #409eff
	.tree-menu-wrapper
		padding-left 15px
</style>

