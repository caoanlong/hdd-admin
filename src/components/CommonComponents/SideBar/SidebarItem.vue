<template>
	<div class="menu-wrapper">
		<template v-for="item in routes" v-if="item.meta.isMenu">
			<el-menu-item v-if="!item.children || item.children.length == 0" :index="item.name" :class="{'submenu-title-noDropdown':!isNest}">
				<svg-icon v-if="item.meta.icon" :icon-class="item.meta.icon"></svg-icon>
				<span slot="title">{{item.title}}</span>
			</el-menu-item>
			<el-submenu v-else :index="item.name">
				<template slot="title">
					<svg-icon v-if="item.meta.icon" :icon-class="item.meta.icon"></svg-icon>
					<span slot="title">{{item.title}}</span>
				</template>
				<template v-for="child in item.children" v-if="child.meta.isMenu">
					<sidebar-item :is-nest="true" class="nest-menu" v-if="child.children && child.children.length > 0" :routes="[child]" :key="child.name"></sidebar-item>
					<el-menu-item v-else :index="child.name">
						<svg-icon v-if="child.meta.icon" :icon-class="child.meta.icon"></svg-icon>
						<span>{{child.title}}</span>
					</el-menu-item>
				</template>
			</el-submenu>
		</template>
	</div>
</template>

<script>
export default {
	name: 'SidebarItem',
	props: {
		routes: {
			type: Array
		},
		isNest: {
			type: Boolean,
			default: false
		}
	},
	methods: {
		// sortList: function (routes) {
		// 	return routes.sort((a, b) => {
		// 		return a.sort - b.sort
		// 	})
		// }
	}
}
</script>

