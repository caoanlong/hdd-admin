<template>
	<scroll-bar>
		<tree-menu-item :routes="routes"></tree-menu-item>
	</scroll-bar>
</template>
<script type="text/javascript">
import ScrollBar from '../ScrollBar'
import TreeMenuItem from './TreeMenuItem'
export default {
	name: 'tree-menu',
	props: {
		routes: {
			type: Array,
			default: () => [
				{
					"path": "/",
					"name": "home",
					"component": "/Home",
					"meta": {
						"title": "首页",
						"icon": "home-icon",
						"roles": "admin,editor",
						"parent": null,
						"isMenu": true
					},
					"redirect": null,
					"children": null
				}
			]
		}
	},
	methods: {
	},
	components: { 
		ScrollBar,
		TreeMenuItem
	}
}
</script>