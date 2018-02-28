<template>
	<div id="app">
		<router-view/>
	</div>
</template>

<script>
import { getMenus } from '../src/api/menu'
export default {
	name: 'App',
	created() {
		this.$store.dispatch('getMenu')
	}
}
</script>
<style lang="stylus" scoped>
</style>
