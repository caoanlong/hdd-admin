<template>
	<div class="main-content">
		<el-card class="box-card">
			<div slot="header" class="clearfix">
				<span>用户列表</span>
			</div>
			<div class="search">
				<el-form :inline="true" class="demo-form-inline" size="small">
					<el-form-item label="归属公司">
						<el-input  placeholder="归属公司"></el-input>
					</el-form-item>
					<el-form-item label="登录名">
						<el-input  placeholder="登录名"></el-input>
					</el-form-item>
					<el-form-item label="归属部门">
						<el-input  placeholder="归属部门"></el-input>
					</el-form-item>
					<el-form-item label="姓名">
						<el-input  placeholder="姓名"></el-input>
					</el-form-item>
					<el-form-item>
						<el-button type="primary">查询</el-button>
						<el-button type="default">重置</el-button>
					</el-form-item>
				</el-form>
			</div>
			<div class="tableControl">
				<el-button type="default" size="mini" icon="el-icon-plus" @click.native="addUser">添加</el-button>
				<el-button type="default" size="mini" icon="el-icon-delete" @click.native="delUserMutiple">批量删除</el-button>
				<el-button type="default" size="mini" icon="el-icon-upload2">导入</el-button>
				<el-button type="default" size="mini" icon="el-icon-download">导出</el-button>
				<el-button type="default" size="mini" icon="el-icon-refresh" @click.native="getUsers">刷新</el-button>
			</div>
			<div class="table">
				<el-table :data="users" @selection-change="selectionChange" border style="width: 100%" size="mini">
					<el-table-column type="selection" align="center">
					</el-table-column>
					<el-table-column label="登录名" sortable prop="username">
					</el-table-column>
					<el-table-column label="姓名" sortable prop="name">
					</el-table-column>
					<el-table-column label="电话" sortable prop="tel">
					</el-table-column>
					<el-table-column label="手机" sortable prop="mobile">
					</el-table-column>
					<el-table-column label="归属公司" sortable prop="company">
					</el-table-column>
					<el-table-column label="归属部门" sortable prop="department">
					</el-table-column>
					<el-table-column label="操作" width="240" align="center">
						<template slot-scope="scope">
							<el-button-group>
								<el-button type="default" size="mini" icon="el-icon-view" @click.native="viewUser(scope.row._id)">查看</el-button>
								<el-button type="primary" size="mini" icon="el-icon-edit" @click.native="editUser(scope.row._id)">编辑</el-button>
								<el-button type="danger" size="mini" icon="el-icon-delete" @click.native="deleteUser(scope.row._id)">删除</el-button>
							</el-button-group>
						</template>
					</el-table-column>
				</el-table>
				<div class="pagination">
					<el-pagination background layout="prev, pager, next" :total="count" @current-change="pageChange"></el-pagination>
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

			users: [],
			pageIndex: 1,
			pageSize: 10,
			count: 0,
			selectedUsers: []
		}
	},
	created() {
		this.getUsers()
	},
	methods: {
		pageChange(index) {
			this.getUsers(index)
		},
		getUsers(pageIndex) {
			let params = {
				pageIndex: pageIndex || 1,
				pageSize: this.pageSize
			}
			request({
				url: '/user',
				method: 'get',
				params
			}).then(res => {
				if (res.data.code == 0) {
					this.count = res.data.data.count
					this.users = res.data.data.users
					console.log(this.users)
				} else {
					Message.error(res.data.msg)
				}
			})
		},
		addUser() {
			this.$router.push({name: 'adduser'})
		},
		deleteUser(ids) {
			let data = {
				ids: [].concat(ids)
			}
			request({
				url: '/user/delete',
				method: 'post',
				data
			}).then(res => {
				if (res.data.code == 0) {
					console.log(res.data)
					Message.success(res.data.msg)
					this.getUsers()
				} else {
					Message.error(res.data.msg)
				}
			})
		},
		editUser(id) {
			this.$router.push({name: 'edituser', query: {id: id, type: 'edit'}})
		},
		viewUser(id) {
			this.$router.push({name: 'edituser', query: {id: id, type: 'view'}})
		},
		selectionChange(data) {
			this.selectedUsers = data.map(item => item._id)
		},
		delUserMutiple() {
			this.deleteUser(this.selectedUsers)
		},
		getUsers(pageIndex) {
			let params = {
				pageIndex: pageIndex || 1,
				pageSize: this.pageSize
			}
			request({
				url: '/user',
				method: 'get',
				params
			}).then(res => {
				if (res.data.code == 0) {
					this.count = res.data.data.count
					this.users = res.data.data.users
				} else {
					Message.error(res.data.msg)
				}
			})
		}
	}
}
</script>
<style lang="stylus">

</style>