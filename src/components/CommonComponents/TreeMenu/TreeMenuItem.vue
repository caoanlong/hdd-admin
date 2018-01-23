<template>
	<div class="tree-menu-wrapper">
		<template v-for="item in routes" v-if="item.meta.isMenu">
			<div class="tree-menu-title" v-if="!item.children || item.children.length == 0">
					<el-checkbox></el-checkbox>
					<svg-icon v-if="item.meta.icon" :icon-class="item.meta.icon"></svg-icon>
					<span>{{item.meta.title}}</span>
			</div>
			<div class="tree-menu-title" v-else>
				<template>
					<el-checkbox></el-checkbox>
					<svg-icon v-if="item.meta.icon" :icon-class="item.meta.icon"></svg-icon>
					<span slot="title">{{item.meta.title}}</span>
				</template>
				<template v-for="child in item.children" v-if="child.meta.isMenu">
					<tree-menu-item v-if="child.children && child.children.length > 0" :routes="[child]"></tree-menu-item>
					<div v-else class="tree-menu-title">
						<el-checkbox></el-checkbox>
						<svg-icon v-if="child.meta.icon" :icon-class="child.meta.icon"></svg-icon>
						<span>{{child.meta.title}}</span>
					</div>
				</template>
			</div>
		</template>
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
	}
}
</script>
<style lang="stylus" scoped>

.tree-menu-title
	line-height 40px
	padding-left 20px
	font-size 14px
	cursor pointer
	&.active
		background #eee
</style>

