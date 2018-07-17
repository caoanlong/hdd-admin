<template>
	<div class="main-content">
		<el-card class="box-card">
			<div slot="header" class="clearfix">
				<span>字典列表</span>
			</div>
			<div class="search">
				<el-form :inline="true" class="demo-form-inline" size="small">
					<el-form-item label="类型">
						<el-select placeholder="请选择" v-model="findDictType">
							<el-option v-for="dictType in dictTypes" :label="dictType.TYPE" :value="dictType.TYPE" :key="dictType.TYPE"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="描述">
						<el-input placeholder="描述" v-model="findDesc"></el-input>
					</el-form-item>
					<el-form-item>
						<el-button type="primary" @click="getDict()">查询</el-button>
						<el-button type="default" @click="reset">重置</el-button>
					</el-form-item>
				</el-form>
			</div>
			<div class="tableControl">
				<el-button type="default" size="mini" icon="el-icon-plus" @click="addDict">添加</el-button>
				<el-button type="default" size="mini" icon="el-icon-delete" @click="deleteConfirm">批量删除</el-button>
			</div>
			<div class="table">
				<el-table :data="dicts" @selection-change="selectionChange" border style="width: 100%" size="mini">
					<el-table-column label="Id" type="selection" align="center" width="40"></el-table-column>
					<el-table-column label="键值" prop="VALUE"></el-table-column>
					<el-table-column label="标签" prop="NAME"></el-table-column>
					<el-table-column label="类型" prop="TYPE"></el-table-column>
					<el-table-column label="描述" prop="Description"></el-table-column>
					<el-table-column label="排序" prop="SortNumber" align="center" width="60"></el-table-column>
					<el-table-column label="操作" width="230" align="center">
						<template slot-scope="scope">
							<el-button size="mini" icon="el-icon-view" @click="viewDict(scope.row.Dict_ID)">查看</el-button>
							<el-button size="mini" icon="el-icon-edit" @click="editDict(scope.row.Dict_ID)">编辑</el-button>
							<el-button size="mini" icon="el-icon-delete" @click="deleteConfirm(scope.row.Dict_ID)">删除</el-button>
						</template>
					</el-table-column>
				</el-table>
				<Page :total="count" :pageIndex="pageIndex" :pageSize="pageSize" @pageChange="pageChange" @pageSizeChange="pageSizeChange"/>
			</div>
		</el-card>
	</div>
</template>
<script type="text/javascript">
import request from '../../../../common/request'
import { Message } from 'element-ui'
import Page from '../../../CommonComponents/Page'
export default {
	data() {
		return {
			dicts:[],
			dictTypes: [],
			count:0,
			pageIndex: 1,
			pageSize: 10,
			selectedDicts: [],
			findDictType: '',
			findDesc: ''
		}
	},
	components: { Page },
	created() {
		this.getList()
		this.getDictType()
	},
	methods: {
		pageChange(index) {
			this.pageIndex = index
			this.getList()
		},
		pageSizeChange(size) {
			this.pageSize = size
			this.getList() 
		},
		reset() {
			this.findDictType = ''
			this.findDesc = ''
			this.pageIndex = 1
			this.pageSize = 10
			this.getList()
		},
		getList() {
			let params = {
				pageIndex: this.pageIndex || 1,
				pageSize: this.pageSize,
				TYPE: this.findDictType,
				Description: this.findDesc
			}
			request({
				url: '/sys_dict/list',
				method: 'get',
				params
			}).then(res => {
				if (res.data.code == 0) {
					this.count = res.data.data.count
					this.dicts = res.data.data.rows
				} else {
					Message.error(res.data.msg)
				}
			})
		},
		addDict() {
			this.$router.push({ name: 'adddict' })
		},
		deleteConfirm(id) {
			let ids = []
			if (id && typeof id == 'string') {
				ids = [].concat(id)
			} else {
				if (this.selectedDicts.length == 0) {
					this.$message({
						type: 'warning',
						message: '请选择'
					})
					return
				}
				ids = this.selectedDicts
			}
			this.$confirm('此操作将永久删除, 是否继续?', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			}).then(() => {
				this.delDict(ids)
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
		delDict(ids) {
			let data = {
				ids: ids
			}
			request({
				url: '/sys_dict/delete',
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
		editDict(id) {
			this.$router.push({ name: 'editdict', query: { Dict_ID: id} })
		},
		viewDict(id) {
			this.$router.push({ name: 'viewdict', query: { Dict_ID: id} })
		},
		selectionChange(data) {
			this.selectedDicts = data.map(item => item.Dict_ID)
			console.log(this.selectedDicts)
		},
		getDictType() {
			request({
				url: '/sys_dict/type/list',
				method: 'get'
			}).then(res => {
				if (res.data.code == 0) {
					this.dictTypes = res.data.data
				} else {
					Message.error(res.data.msg)
				}
			})
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
