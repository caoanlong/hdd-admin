<template>
	<div class="main-content">
		<el-card class="box-card">
			<div slot="header" class="clearfix">
				<span>菜单列表</span>
			</div>
			<div class="tableControl">
				<el-button type="default" size="mini" icon="el-icon-plus" @click="jump('addmenu','add')">添加</el-button>
				<el-button type="default" size="mini" icon="el-icon-delete">批量删除</el-button>
				<el-button type="default" size="mini">
					<svg-icon icon-class="save-icon"></svg-icon> 保存排序</el-button>
				<el-button type="default" size="mini" icon="el-icon-refresh">刷新</el-button>
			</div>
			<div class="table">
				<el-table :data="tableData" border style="width: 100%" size="mini">
					<el-table-column type="selection" align="center" width="42"></el-table-column>
					<el-table-column label="名称">
						<template slot-scope="scope">
							<svg-icon icon-class="meun-icon" class="meun_icon"></svg-icon> {{scope.row.meta.title}}
						</template>
					</el-table-column>
					<el-table-column label="图标">
						<template slot-scope="scope">
							<svg-icon :icon-class="scope.row.meta.icon"></svg-icon> {{scope.row.meta.icon}}
						</template>
					</el-table-column>
					<el-table-column label="链接" prop="path"></el-table-column>
					<el-table-column label="组件" prop="component"></el-table-column>
					<!-- <el-table-column label="排序" width="80" align="center">
						<template slot-scope="scope">
							<el-input :value="scope.row.sort" size="mini" class="sort_input"></el-input>
						</template>
					</el-table-column> -->
					<el-table-column label="可见" prop="meta.isMenu" width="120" align="center"></el-table-column>
					<el-table-column label="权限标识" prop="meta.roles"></el-table-column>
					<el-table-column label="操作" width="350" align="center">
						<template slot-scope="scope">
							<el-button type="default" size="mini" icon="el-icon-view" @click="jump('menudetail','view')">查看</el-button>
							<el-button type="primary" size="mini" icon="el-icon-edit" @click="jump('editmenu','edit')">修改</el-button>
							<el-button type="danger" size="mini" icon="el-icon-delete">删除</el-button>
							<el-button type="success" size="mini" icon="el-icon-plus" @click="jump('addsubmenu','addsub')">添加下级菜单</el-button>
						</template>
					</el-table-column>
				</el-table>
				<div class="pagination">
					<el-pagination background layout="prev, pager, next" :total="500"></el-pagination>
				</div>
			</div>
		</el-card>
	</div>
</template>
<script type="text/javascript">
import { findAll, routerDB } from '../../../../routerDB'
export default {
	data() {
		return {
			tableData: [
				{
					"path": "/",
					"name": "home",
					"component": "/Home",
					"meta": {
						"title": "首页",
						"icon": "home_icon",
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
	created() {
		this.getMenus()
	},
	methods: {
		handleEdit(index, row) {
			console.log(index, row)
		},
		handleDelete(index, row) {
			console.log(index, row)
		},
		jump(to, params) {
			if (this.$router) {
				this.$router.push({ name: to, query: { type: params } })
			}
		},
		getMenus() {
			this.tableData = routerDB
			console.log(routerDB)
		}

	}
}

</script>
<style lang="stylus">
.table
	.sort_input
		input 
			text-align center
	.el-button--mini 
		padding 7px 8px 
	.meun_icon 
		cursor pointer
</style>
