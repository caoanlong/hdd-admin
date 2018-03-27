<template>
	<div id="app">
		<router-view/>
	</div>
</template>

<script>
import { getMenus } from '../src/api/menu'
export default {
	name: 'App',
	watch: {
		$route(newVal, oldVal) {
			if (oldVal.name) {
				sessionStorage.removeItem('pageSize')
				sessionStorage.removeItem('pageIndex')
			}
		}
	},
	created() {
		if (this.$route.name != 'login' || sessionStorage.getItem('menus') == 'undefined') {
			this.$store.dispatch('GetUserInfo')
			this.$store.dispatch('getMenu')
		}
	}
}
</script>
<style lang="stylus" scoped>
</style>
