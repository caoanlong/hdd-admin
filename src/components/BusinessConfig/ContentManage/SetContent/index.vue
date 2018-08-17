<template>
	<div class="main-content">
		<el-card class="box-card">
			<div slot="header" class="clearfix">
				<span>内容列表</span>
			</div>
			<div class="search">
				<el-form :inline="true" class="demo-form-inline" size="small">
					<el-form-item label="关键字">
						<el-input placeholder="请输入关键字" v-model="findKeyword"></el-input>
					</el-form-item>
					<el-form-item>
						<el-button type="primary" @click="getList()">查询</el-button>
						<el-button type="default" @click="reset">重置</el-button>
					</el-form-item>
				</el-form>
			</div>
			<div class="tableControl">
				<el-button type="default" size="mini" icon="el-icon-plus" @click="addContent">添加</el-button>
				<el-button type="default" size="mini" icon="el-icon-delete" @click="deleteConfirm">批量删除</el-button>
			</div>
			<div class="table">
				<el-table :data="setContent" @selection-change="selectionChange" border style="width: 100%" size="mini">
					<el-table-column type="selection" align="center"></el-table-column>
					<el-table-column label="所属栏目" prop="set_contenttopic.Name"></el-table-column>
					<el-table-column label="App客户"></el-table-column>
					<el-table-column label="代码" prop="Code"></el-table-column>
					<el-table-column label="名称" prop="Name"></el-table-column>
					<el-table-column label="标题" prop="Title"></el-table-column>
					<el-table-column label="描述" prop="Tips"></el-table-column>
					<el-table-column label="排序" prop="Sort" width="100"></el-table-column>
					<el-table-column label="操作" width="160" align="center">
						<template slot-scope="scope">
							<el-button type="default" size="mini" icon="el-icon-edit" @click="editContent(scope.row.Content_ID)">修改</el-button>
							<el-button type="default" size="mini" icon="el-icon-delete" @click="deleteConfirm(scope.row.Content_ID)">删除</el-button>
						</template>
					</el-table-column>
				</el-table>
				<Page :total="total" :pageIndex="pageIndex" :pageSize="pageSize" @pageChange="pageChange" @pageSizeChange="pageSizeChange"/>
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
			refreshing: false,
			findKeyword:'',
			pageIndex: 1,
			pageSize: 10,
			total: 0,
			setContent: [],
			selectedContents: []
		}
	},
	components: { Page },
	created() {
		this.getList()
	},
	methods: {
		getList() {
			let params = {
				pageIndex: this.pageIndex,
				pageSize: this.pageSize
			}
			request({
				url: '/set_content/list',
				method: 'get',
				params
			}).then(res => {
				if (res.data.code == 0) {
					this.total = res.data.data.count
					this.setContent = res.data.data.rows
				} else {
					Message.error(res.data.msg)
				}
			})
		},
		pageChange(index) {
			this.pageIndex = index
			this.getList()
		},
		pageSizeChange(size) {
			this.pageSize = size
			this.getList() 
		},
		reset() {
			this.findKeyword = ''
			this.pageIndex = 1
			this.pageSize = 10
			this.getList()
		},
		addContent() {
			this.$router.push({name: 'addcontent'})
		},
		editContent(id) {
			this.$router.push({name: 'editcontent', query: {Content_ID: id}})
		},
		deleteConfirm(id) {
			let ids = []
			if (id && typeof id == 'string') {
				ids = [].concat(id)
			} else {
				if (this.selectedContents.length == 0) {
					this.$message({
						type: 'warning',
						message: '请选择'
					})
					return
				}
				ids = this.selectedContents
			}
			this.$confirm('此操作将永久删除, 是否继续?', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			}).then(() => {
				this.delContents(ids)
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
		delContents(ids) {
			let data = {
				ids: ids
			}
			request({
				url: '/set_content/delete',
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
		selectionChange(data) {
			this.selectedContents = data.map(item => item.Content_ID)
			console.log(this.selectedContents)
		}
	}
}
</script>
<style lang="stylus" scoped>
	
</style>