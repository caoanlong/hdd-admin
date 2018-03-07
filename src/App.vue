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
			console.log(newVal.name, oldVal.name)
			if (oldVal.name) {
				sessionStorage.removeItem('pageSize')
				sessionStorage.removeItem('pageIndex')
			}
		}
	},
	created() {
		this.$store.dispatch('getMenu')
	}
}
</script>
<style lang="stylus" scoped>
</style>
