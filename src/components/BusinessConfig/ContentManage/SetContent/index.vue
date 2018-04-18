<template>
	<div class="main-content">
		<el-card class="box-card">
			<div slot="header" class="clearfix">
				<span>内容列表</span>
			</div>
			<div class="tableControl">
				<el-button type="default" size="mini" icon="el-icon-plus" @click="addContent">添加</el-button>
				<el-button type="default" size="mini" icon="el-icon-delete" @click="deleteConfirm">批量删除</el-button>
				<el-button type="default" size="mini" icon="el-icon-refresh" :loading="refreshing" @click.native="refresh">刷新</el-button>
			</div>
			<div class="table">
				<el-table :data="setContent" @selection-change="selectionChange" border style="width: 100%" size="mini">
					<el-table-column type="selection" align="center"></el-table-column>
					<el-table-column label="所属栏目" prop="set_contenttopic.Name"></el-table-column>
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
				<el-row type="flex">
					<el-col :span="12" style="padding-top: 15px; font-size: 12px; color: #909399">
						<span>总共 {{count}} 条记录每页显示</span>
						<el-select size="mini" style="width: 90px; padding: 0 5px" v-model="pageSize" @change="getContents()">
							<el-option label="10" value="10"></el-option>
							<el-option label="20" value="20"></el-option>
							<el-option label="30" value="30"></el-option>
							<el-option label="40" value="40"></el-option>
							<el-option label="50" value="50"></el-option>
							<el-option label="100" value="100"></el-option>
						</el-select>
						<span>条记录</span>
					</el-col>
					<el-col :span="12">
						<div class="pagination">
							<el-pagination :current-page="pageIndex" :page-size="pageSize" align="right" background layout="prev, pager, next" :total="count" @current-change="pageChange"></el-pagination>
						</div>
					</el-col>
				</el-row>
			</div>
		</el-card>
	</div>
</template>
<script type="text/javascript">
import request from '../../../../common/request'
import { Message } from 'element-ui'
export default {
	data() {
      	return {
			refreshing: false,
			pageIndex: Number(sessionStorage.getItem('pageIndex')) || 1,
			pageSize: Number(sessionStorage.getItem('pageSize')) || 10,
			count: 0,
			setContent: [],
			selectedContents: []
		}
	},
	watch: {
		pageSize(newVal) {
			sessionStorage.setItem('pageSize', newVal)
		},
		pageIndex(newVal) {
			sessionStorage.setItem('pageIndex', newVal)
		},
	},
	created() {
		this.getContents()
	},
	methods: {
		getContents() {
			let params = {
				pageIndex: this.pageIndex || 1,
				pageSize: this.pageSize
			}
			request({
				url: '/set_content/list',
				method: 'get',
				params
			}).then(res => {
				if (res.data.code == 0) {
					this.count = res.data.data.count
					this.setContent = res.data.data.rows
				} else {
					Message.error(res.data.msg)
				}
			})
		},
		pageChange(index) {
			this.pageIndex = index
			this.getContents()
		},
		refresh() {
			this.refreshing = true
			this.getContents()
			setTimeout(() => {
				this.refreshing = false
			}, 500)
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
					this.getContents()
				} else {
					Message.error(res.data.msg)
				}
			})
		},
		selectionChange(data) {
			this.selectedContents = data.map(item => item.Content_ID)
			console.log(this.selectedContents)
		},
	}
}
</script>
<style lang="stylus" scoped>
	
</style>