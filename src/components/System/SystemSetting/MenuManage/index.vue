<template>
	<div class="main-content">
		<el-card class="box-card">
			<div slot="header" class="clearfix">
				<span>菜单列表</span>
			</div>
			<div class="tableControl">
				<el-button type="success" plain size="mini" icon="el-icon-plus" @click="jump('addmenu','add')">添加顶级节点</el-button>
				<!-- <el-button type="default" size="mini" icon="el-icon-delete">批量删除</el-button> -->
			</div>
			<div>
				<el-tree
					class="expand-tree"
					:data="tableData"
					:props="defaultProps"
					node-key="name"
					highlight-current
					:render-content="renderContent"
					@node-click="handleNodeClick">
				</el-tree>
			</div>
		</el-card>
	</div>
</template>
<script type="text/javascript">
import TreeRender from '../../../CommonComponents/TreeRender'
import { findAll, routerDB } from '../../../../routerDB'
export default {
	data() {
		return {
			tableData: [
				{
					"path": "/",
					"name": "home",
					"component": "/Home",
					"title": "首页",
					"meta": {
						"title": "首页",
						"icon": "home_icon",
						"roles": "admin,editor",
						"parent": null,
						"isMenu": true,
						"isEdit": false
					},
					"redirect": null,
					"children": null
				}
			],
			defaultProps: {
				children: 'children',
				label: 'title'
			},
			currentNode: null
		}
	},
	created() {
		this.getMenus()
	},
	methods: {
		handleNodeClick(d) {
			// console.log(d)
			d.meta.isEdit = false
			this.currentNode = d
		},
		renderContent(h, {node, data, store}) {
			let that = this//指向vue
			return h(TreeRender, {
				props: {
					DATA: data, //节点数据
					NODE: node, //节点内容
					STORE: store, //完整树形内容
					CURRENTNODE: this.currentNode // 当前选择的节点
				},
				on: {//绑定方法
					nodeAdd: ((s, d, n) => that.handleAdd(s, d, n)),
					nodeDel: ((s, d, n) => that.handleDelete(s, d, n))
				}
			})
		},
		handleAdd(s, d, n){//增加节点
			console.log(s, d, n)
		},
		handleDelete(s, d, n){//删除节点
			console.log(s, d, n)
		},
		jump(to, params) {
			if (this.$router) {
				this.$router.push({ name: to, query: { type: params } })
			}
		},
		getMenus() {
			this.tableData = routerDB
		}

	},
	components: {
	}
}

</script>
<style lang="stylus">
	.main-content
		.box-card
			width 360px
			.expand-tree
				font-size 14px
</style>
