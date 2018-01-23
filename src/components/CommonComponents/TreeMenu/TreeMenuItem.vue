<template>
	<div class="tree-menu-wrapper">
		<div v-for="item in routes" v-if="item.meta.isMenu">
			<div class="tree-menu-title" :class="{'active': selectedOption.name == item.name}" @click.stop="selectOption(item)">
				<el-checkbox></el-checkbox>
				<svg-icon v-if="item.meta.icon" :icon-class="item.meta.icon"></svg-icon>
				<span slot="title">{{item.meta.title}}</span>
			</div>
			<div v-show="selectedOption.isCollapse">
				<div style="padding-left: 20px" v-for="child in item.children" v-if="child.meta.isMenu">
					<tree-menu-item v-if="child.children && child.children.length > 0" :routes="[child]"></tree-menu-item>
					<div class="tree-menu-title" :class="{'active': selectedOption.name == child.name}" @click.stop="selectOption(child)" v-else>
						<el-checkbox></el-checkbox>
						<svg-icon v-if="child.meta.icon" :icon-class="child.meta.icon"></svg-icon>
						<span>{{child.meta.title}}</span>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'tree-menu-item',
	props: {
		routes: {
			type: Array
		},
		isNest: {
			type: Boolean,
			default: false
		}
	},
	data() {
		return {
			selectedOption: {}
		}
	},
	methods: {
		selectOption(item) {
			this.selectedOption = item
			if (this.selectedOption.isCollapse) {
				this.selectedOption.isCollapse = false
			} else {
				this.selectedOption.isCollapse = true
			}
			console.log(JSON.stringify(item.meta.title), this.selectedOption.isCollapse)
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
</style>

