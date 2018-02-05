<template>
	<div class="main-content">
		<el-card class="box-card">
			<div slot="header" class="clearfix">
				<span>角色列表</span>
			</div>
			<div class="search">
				<el-form :inline="true"  class="demo-form-inline"  size="small">
					<el-form-item label="角色名称：">
						<el-input placeholder="角色名称" v-model="findRoleName"></el-input>
					</el-form-item>
					<el-form-item>
						<el-button type="primary" @click.native="getRoles">查询</el-button>
						<el-button type="default" @click.native="reset">重置</el-button>
					</el-form-item>
				</el-form>
			</div>
			<div class="tableControl">
				<el-button type="default" size="mini" icon="el-icon-plus" @click.native="addRole">添加</el-button>
				<el-button type="default" size="mini" icon="el-icon-delete" @click.native="deleteConfirm">批量删除</el-button>
				<el-button type="default" size="mini" icon="el-icon-refresh" :loading="refreshing" @click.native="refresh">刷新</el-button>
			</div>
			<div class="table">
				<el-table 
					ref="roleTable" 
					:data="roles" 
					@selection-change="selectRoleChange" 
					border style="width: 100%" size="mini">
					<el-table-column type="selection" align="center">
					</el-table-column>
					<el-table-column label="角色名称" prop="Name" align="left">
					</el-table-column>
					<el-table-column label="英文名称" prop="EnName" align="left">
					</el-table-column>
					<el-table-column label="归属机构" prop="organization" align="left">
					</el-table-column>
					<el-table-column label="数据范围" prop="DataScope" align="left">
					</el-table-column>
					<el-table-column label="操作" width="420" align="center">
						<template slot-scope="scope">
							<el-button type="default" size="mini" icon="el-icon-view" @click="viewRole(scope.row.Role_ID)">查看</el-button>
							<el-button type="default" size="mini" icon="el-icon-edit" @click="editRole(scope.row.Role_ID)">修改</el-button>
							<el-button type="default" size="mini" icon="el-icon-delete" @click="deleteConfirm(scope.row.Role_ID)">删除</el-button>
							<el-button type="default" size="mini" icon="el-icon-setting" @click="setAuth(scope.row)">权限设置</el-button>
							<el-button type="default" size="mini" icon="el-icon-plus"  @click="setUser(scope.row)">分配用户</el-button>
						</template>
					</el-table-column>
				</el-table>
				<div class="pagination">
					<el-pagination background layout="prev, pager, next" :total="count" @current-change="pageChange"></el-pagination>
				</div>
			</div>
		</el-card>
		<el-dialog title="权限设置" :visible.sync="showSetAuth" width="30%">
			<el-tree
				:data="menus"
				show-checkbox
				default-expand-all
				node-key="Menu_ID"
				ref="tree"
				highlight-current
				:props="defaultProps"
				@check-change="selectMenu" style="height:400px;overflow-y:auto">
			</el-tree>
			<span slot="footer" class="dialog-footer">
				<el-button @click="showSetAuth = false">取 消</el-button>
				<el-button type="primary" @click="submitSetAuth">确 定</el-button>
			</span>
		</el-dialog>
		<el-dialog title="分配用户" :visible.sync="showSetUser" width="600px">
			<el-table 
				ref="usersTable"
				:data="users" 
				height="400"
				@selection-change="selectUserChange" 
				border style="width: 100%" 
				size="mini">
				<el-table-column type="selection" align="center"></el-table-column>
				<el-table-column label="登录名" prop="LoginName"></el-table-column>
				<el-table-column label="姓名" prop="Name"></el-table-column>
				<el-table-column label="电话" prop="Phone"></el-table-column>
				<el-table-column label="手机" prop="Mobile"></el-table-column>
			</el-table>
			<span slot="footer" class="dialog-footer">
				<el-button @click="showSetUser = false">取 消</el-button>
				<el-button type="primary" @click="submitSetUser">确 定</el-button>
			</span>
		</el-dialog>
	</div>
</template>
<script type="text/javascript">
	import { mapGetters } from 'vuex'
	import request from '../../../../common/request'
	import { Message } from 'element-ui'
	export default {
		data() {
			return {
				refreshing: false,
				roles: [],
				role: {},
				pageIndex: 1,
				pageSize: 10,
				count: 0,
				findRoleName: '',
				selectedRoles: [],
				setAuthId: '',
				setUserId: '',
				// 所有的用户
				users:[],
				showSetAuth: false,
				showSetUser:false,
				defaultProps: {
					children: 'children',
					label: 'title'
				},
				selectedMenuId: [],
				selectedUsers:[],
			}
		},
		computed: {
			...mapGetters([
				'menus'
			])
		},
		created() {
			this.getRoles()
		},
		methods: {
			addRole() {
				this.$router.push({name: 'addrole'})
			},
			editRole(id) {
				this.$router.push({name: 'editrole', query: {Role_ID: id}})
			},
			viewRole(id) {
				this.$router.push({name: 'viewrole', query: {Role_ID: id}})
			},
			pageChange(index) {
				this.getRoles(index)
			},
			selectRoleChange(data) {
				this.selectedRoles = data.map(item => item.Role_ID)
			},
			selectUserChange(data) {
				console.log(data)
				this.selectedUsers = data
			},
			// 重置搜索表单
			reset() {
				this.findRoleName = ''
			},
			getRoles(pageIndex) {
				let params = {
					pageIndex: pageIndex || this.$route.query.pageIndex || 1,
					pageSize: this.$route.query.pageSize || this.pageSize,
					Name: this.findRoleName
				}
				request({
					url: '/sys_role/list',
					method: 'get',
					params
				}).then(res => {
					if (res.data.code == 0) {
						this.count = res.data.data.count
						this.roles = res.data.data.rows
						this.setRouteQuery({
							pageIndex: res.data.data.pageIndex,
							pageSize: res.data.data.pageSize,
						})
					} else {
						Message.error(res.data.msg)
					}
				})
			},
			deleteConfirm(id) {
				let ids = []
				if (id && typeof id == 'string') {
					ids = [].concat(id)
				} else {
					ids = this.selectedRoles
				}
				this.$confirm('此操作将永久删除, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.delRole(ids)
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
			delRole(ids) {
				let data = {
					ids: ids
				}
				request({
					url: '/sys_role/delete',
					method: 'post',
					data
				}).then(res => {
					if (res.data.code == 0) {
						this.getRoles()
					} else {
						Message.error(res.data.msg)
					}
				})
			},
			setAuth(data) {
				this.setAuthId = data.Role_ID
				this.showSetAuth = true
				this.getRole(data.Role_ID, res => {
					let menusID = res.sys_menus.map(item => item.Menu_ID)
					this.$nextTick(() => {
						this.$refs.tree.setCheckedKeys(menusID)
						this.getRoles()
					})
				})
			},
			submitSetAuth() {
				let data = {
					Role_ID: this.setAuthId,
					sys_menus: this.selectedMenuId
				}
				request({
					url: '/sys_role/update/menu',
					method: 'post',
					data
				}).then(res => {
					if (res.data.code == 0) {
						Message.success(res.data.msg)
					} else {
						Message.error(res.data.msg)
					}
					this.showSetAuth = false
				})
			},
			selectMenu(data, isSelected) {
				if (isSelected) {
					this.selectedMenuId.push(data.Menu_ID)
				} else {
					this.selectedMenuId.splice(this.selectedMenuId.indexOf(data.Menu_ID), 1)
				}
			},
			// 获取当前角色详情
			getRole(Role_ID, callback) {
				let params = {
					Role_ID
				}
				request({
					url: '/sys_role/info',
					method: 'get',
					params
				}).then(res => {
					if (res.data.code == 0) {
						this.role = res.data.data
						callback && callback(res.data.data)
					} else {
						Message.error(res.data.msg)
					}
				})
			},
			// 获取所有用户
			getUsers(callback) {
				let params = {
					pageSize: 100
				}
				request({
					url: '/sys_user/list',
					method: 'get',
					params
				}).then(res => {
					if (res.data.code == 0) {
						this.users = res.data.data.rows.map(item => {
							return {
								User_ID: item.User_ID,
								LoginName: item.LoginName,
								Name: item.Name,
								Phone: item.Phone,
								Mobile: item.Mobile
							}
						})
						callback && callback()
					} else {
						Message.error(res.data.msg)
					}
				})
			},
			setUser(data) {
				this.setUserId = data.Role_ID
				this.showSetUser = true
				this.getUsers(() => {
					this.getRole(data.Role_ID, res => {
						let users = res.sys_users.map(item => {
							return {
								User_ID: item.User_ID,
								LoginName: item.LoginName,
								Name: item.Name,
								Phone: item.Phone,
								Mobile: item.Mobile
							}
						})
						this.$nextTick(() => {
							users.forEach(user => {
								this.$refs.usersTable.toggleRowSelection(user)
							})
							this.getRoles()
						})
					})
				})
			},
			handleChange(value, direction, movedKeys) {
				console.log(value, direction, movedKeys)
			},
			submitSetUser() {
				this.showSetUser = false
				let userIds = this.selectedUsers.map(item => item.User_ID)
				let data = {
					Role_ID: this.setUserId,
					sys_users: userIds
				}
				request({
					url: '/sys_role/update/user',
					method: 'post',
					data
				}).then(res => {
					if (res.data.code == 0) {
						Message.success(res.data.msg)
					} else {
						Message.error(res.data.msg)
					}
				})
			},
			refresh() {
				this.refreshing = true
				this.getRoles()
				setTimeout(() => {
					this.refreshing = false
				}, 500)
			},
			setRouteQuery(json) {
				for (let attr in json) {
					this.$route.query[attr] = json[attr]
				}
			}
		}
	}
</script>
<style lang="stylus">

</style>