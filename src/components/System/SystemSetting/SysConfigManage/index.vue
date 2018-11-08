<template>
	<div class="main-content">
		<el-card class="box-card">
			<div slot="header" class="clearfix">
				<span>系统配置列表</span>
			</div>
			<div class="search">
				<el-form :inline="true" class="demo-form-inline" size="small">
					<el-form-item label="代码">
						<el-input placeholder="代码" v-model="findCode"></el-input>
					</el-form-item>
					<el-form-item label="名称">
						<el-input placeholder="名称" v-model="findName"></el-input>
					</el-form-item>
					<el-form-item>
						<el-button type="primary" @click="getList()">查询</el-button>
						<el-button type="default" @click="reset">重置</el-button>
					</el-form-item>
				</el-form>
			</div>
			<div class="tableControl">
				<el-button type="default" size="mini" icon="el-icon-plus" @click="addConfig">添加</el-button>
				<el-button type="default" size="mini" icon="el-icon-delete" @click="deleteConfirm">批量删除</el-button>
			</div>
			<div class="table">
				<el-table :data="tableData" @selection-change="selectionChange" border style="width: 100%" size="mini">
					<el-table-column label="Id" type="selection" align="center" width="40"></el-table-column>
					<el-table-column label="代码" prop="Code"></el-table-column>
					<el-table-column label="名称" prop="Name"></el-table-column>
					<el-table-column label="值" prop="Value"></el-table-column>
					<el-table-column label="排序" prop="SortNumber" width="60" align="center"></el-table-column>
					<el-table-column label="描述" prop="Description"></el-table-column>
					<el-table-column label="更新人" prop="UpdateBy" width="100" align="center"></el-table-column>
					<el-table-column label="更新日期" align="center" width="140">
						<template slot-scope="scope">
							<span>{{ new Date(scope.row.UpdateTime).getTime() | getdatefromtimestamp() }}</span>
						</template>
					</el-table-column>
					<el-table-column label="操作" width="230" align="center">
						<template slot-scope="scope">
							<el-button size="mini" icon="el-icon-view" @click="viewConfig(scope.row.Setting_ID)">查看</el-button>
							<el-button size="mini" icon="el-icon-edit" @click="editConfig(scope.row.Setting_ID)">编辑</el-button>
							<el-button size="mini" icon="el-icon-delete" @click="deleteConfirm(scope.row.Setting_ID)">删除</el-button>
						</template>
					</el-table-column>
				</el-table>
				<Page :total="total" :pageIndex="pageIndex" :pageSize="pageSize" @pageChange="pageChange" @pageSizeChange="pageSizeChange"/>
			</div>
		</el-card>
	</div>
</template>
<script type="text/javascript">
import { Message } from 'element-ui'
import request from '../../../../common/request'
import { baseMixin } from '../../../../common/mixin';
export default {
	mixins: [baseMixin],
	data() {
		return {
			tableData:[],
			findCode: '',
			findName: ''
		}
	},
	created() {
		this.getList()
	},
	activated() {
		if(!this.$route.query.cache) {
			this.reset()
		}
	},
	methods: {
		reset() {
			this.findCode = ''
			this.findName = ''
			this.pageIndex = 1
			this.pageSize = 10
			this.getList()
		},
		getList() {
			const params = {
				pageIndex: this.pageIndex,
				pageSize: this.pageSize,
				Code: this.findCode,
				Name: this.findName
			}
			request({
				url: '/sys_settings/list',
				method: 'get',
				params
			}).then(res => {
				if (res.data.code == 0) {
					this.total = res.data.data.count
					this.tableData = res.data.data.rows
				} else {
					Message.error(res.data.msg)
				}
			})
		},
		addConfig() {
			this.$router.push({ name: 'addsysconfig' })
		},
		deleteConfirm(id) {
			let ids = []
			if (id && typeof id == 'string') {
				ids = [].concat(id)
			} else {
				if (this.selectedList.length == 0) {
					this.$message({
						type: 'warning',
						message: '请选择'
					})
					return
				}
				ids = this.selectedList
			}
			this.$confirm('此操作将永久删除, 是否继续?', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			}).then(() => {
				this.delConfig(ids)
				this.$message({
					type: 'success',
					message: '删除成功!'
				})
			}).catch(() => {
				this.$message({
					type: 'info',
					message: '已取消删除'
				})
			})
		},
		delConfig(ids) {
			let data = {
				ids: ids
			}
			request({
				url: '/sys_settings/delete',
				method: 'post',
				data
			}).then(res => {
				if (res.data.code == 0) {
					this.getList()
				} else {
					Message.error(res.data.msg)
				}
			})
		},
		editConfig(id) {
			this.$router.push({ name: 'editsysconfig', query: { Setting_ID: id} })
		},
		viewConfig(id) {
			this.$router.push({ name: 'viewsysconfig', query: { Setting_ID: id} })
		},
		selectionChange(data) {
			this.selectedList = data.map(item => item.Setting_ID)
		}
	}
}

</script>
<style lang="stylus" scoped>
.download-btn
	font-size 12px
	color #606266
	height 29px
	line-height 29px
	padding 0 15px
	border 1px solid #dcdfe6
	border-radius 3px
	background #fff
	margin 0 10px
	display inline-block
	&:hover
		border-color #c6e2ff
		color #409eff
		background #ecf5ff
	&:active
		border-color #3a8ee6
		color #3a8ee6
</style>
