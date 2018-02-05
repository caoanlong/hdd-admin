<template>
	<div class="menu-wrapper">
		<template v-for="item in routes" v-if="item.IsShow == 'Y'">
			<el-menu-item v-if="!item.children || item.children.length == 0" :index="item.name" :class="{'submenu-title-noDropdown':!isNest}">
				<svg-icon v-if="item.Icon" :icon-class="item.Icon"></svg-icon>
				<span slot="title">{{item.title}}</span>
			</el-menu-item>
			<el-submenu v-else :index="item.name">
				<template slot="title">
					<svg-icon v-if="item.Icon" :icon-class="item.Icon"></svg-icon>
					<span slot="title">{{item.title}}</span>
				</template>
				<template v-for="child in item.children" v-if="child.IsShow == 'Y'">
					<sidebar-item :is-nest="true" class="nest-menu" v-if="child.children && child.children.length > 0" :routes="[child]" :key="child.name"></sidebar-item>
					<el-menu-item v-else :index="child.name">
						<svg-icon v-if="child.Icon" :icon-class="child.Icon"></svg-icon>
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
	}
}
</script>

