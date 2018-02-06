<template>
	<div class="main-content">
		<el-card class="box-card">
			<div slot="header" class="clearfix">
				<span>字典列表</span>
			</div>
			<div class="search">
				<el-form :inline="true" class="demo-form-inline" size="small">
					<el-form-item label="类型">
						<el-select placeholder="请选择" value>
							<el-option label="app_user_type" value="app_user_type"></el-option>
							</el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="描述">
						<el-input placeholder="描述"></el-input>
					</el-form-item>
					<el-form-item>
						<el-button type="primary" @click.native="getUsers">查询</el-button>
						<el-button type="default" @click.native="reset">重置</el-button>
					</el-form-item>
				</el-form>
			</div>
			<div class="tableControl">
				<el-button type="default" size="mini" icon="el-icon-plus" @click.native="addUser">添加</el-button>
				<el-button type="default" size="mini" icon="el-icon-delete" @click.native="deleteConfirm">批量删除</el-button>
				<el-button type="default" size="mini" icon="el-icon-refresh" @click.native="refresh">刷新</el-button>
			</div>
			<div class="table">
				<el-table @selection-change="selectionChange" border style="width: 100%" size="mini">
					<el-table-column label="Id" type="selection" align="center"></el-table-column>
					<el-table-column label="键值"></el-table-column>
					<el-table-column label="标签"></el-table-column>
					<el-table-column label="类型"></el-table-column>
					<el-table-column label="描述"></el-table-column>
					<el-table-column label="排序"></el-table-column>
					<el-table-column label="操作" width="230" align="center">
						<template slot-scope="scope">
							<el-button size="mini" icon="el-icon-view" @click="viewUser(scope.row.User_ID)">查看</el-button>
							<el-button size="mini" icon="el-icon-edit" @click="editUser(scope.row.User_ID)">编辑</el-button>
							<el-button size="mini" icon="el-icon-delete" @click="deleteConfirm(scope.row.User_ID)">删除</el-button>
						</template>
					</el-table-column>
				</el-table>
				<div class="pagination">
					<el-pagination background layout="prev, pager, next"  @current-change="pageChange"></el-pagination>
				</div>
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

		}
	},
	created() {
		// this.getUsers()
	},
	methods: {

		addUserMutiple(users) {
			let data = {
				users: users,
			}
			request({
				url: '/user/addmutip',
				method: 'post',
				data
			}).then(res => {
				if (res.data.code == 0) {
					console.log(res.data)
					Message.success(res.data.msg)
				} else {
					Message.error(res.data.msg)
				}
			})
		},
		pageChange(index) {
			this.getUsers(index)
		},
		// 重置搜索表单
		reset() {
			this.findName = ''
			this.findUsername = ''
			this.findCompany = ''
			this.findDepartment = ''
		},
		getUsers(pageIndex) {
			let params = {
				pageIndex: pageIndex || this.$route.query.pageIndex || 1,
				pageSize: this.$route.query.pageSize || this.pageSize,
				LoginName: this.findName,
				username: this.findUsername,
				Company_ID: this.findCompany,
				Organization_ID: this.findDepartment
			}
			request({
				url: '/sys_user/list',
				method: 'get',
				params
			}).then(res => {
				if (res.data.code == 0) {
					// this.count = res.data.data.count
					this.users = res.data.data.rows
					this.setRouteQuery({
						pageIndex: res.data.data.pageIndex,
						pageSize: res.data.data.pageSize,
					})
				} else {
					Message.error(res.data.msg)
				}
			})
		},
		addUser() {
			this.$router.push({ name: 'adduser' })
		},
		deleteConfirm(id) {
			let ids = []
			if (id && typeof id == 'string') {
				ids = [].concat(id)
			} else {
				ids = this.selectedUsers
			}
			this.$confirm('此操作将永久删除, 是否继续?', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			}).then(() => {
				this.delUser(ids)
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
		delUser(ids) {
			let data = {
				ids: ids
			}
			request({
				url: '/sys_user/delete',
				method: 'post',
				data
			}).then(res => {
				if (res.data.code == 0) {
					this.getUsers()
				} else {
					Message.error(res.data.msg)
				}
			})
		},

		editUser(id) {
			this.$router.push({ name: 'edituser', query: { User_ID: id} })
		},
		viewUser(id) {
			this.$router.push({ name: 'viewuser', query: { User_ID: id} })
		},
		selectionChange(data) {
			this.selectedUsers = data.map(item => item.User_ID)
			console.log(this.selectedUsers)
		},
		refresh() {
			this.refreshing = true
			this.getUsers()
			setTimeout(() => {
				this.refreshing = false
			}, 500)
		},
		setRouteQuery(json) {
			for (let attr in json) {
				this.$route.query[attr] = json[attr]
			}
		}
	},
	components: {
		
	}
}

</script>
<style lang="stylus">
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
