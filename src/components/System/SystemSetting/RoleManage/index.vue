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
						<el-button type="primary" @click="getList()">查询</el-button>
						<el-button type="default" @click="reset">重置</el-button>
					</el-form-item>
				</el-form>
			</div>
			<div class="tableControl">
				<el-button type="default" size="mini" icon="el-icon-plus" @click="addRole">添加</el-button>
				<el-button type="default" size="mini" icon="el-icon-delete" @click="deleteConfirm">批量删除</el-button>
			</div>
			<div class="table">
				<el-table 
					ref="roleTable" 
					:data="tableData" 
					@selection-change="selectRoleChange" 
					border style="width: 100%" size="mini">
					<el-table-column type="selection" align="center" width="40"></el-table-column>
					<el-table-column label="角色名称" prop="Name" align="left"></el-table-column>
					<el-table-column label="英文名称" prop="EnName" align="left"></el-table-column>
					<el-table-column label="归属机构" prop="sys_organization.Name" align="left"></el-table-column>
					<el-table-column label="数据范围" align="left">
						<template slot-scope="scope">
							<span 
							v-for="sysDataScope in sysDataScopes" 
							:key="sysDataScope.Dict_ID" 
							v-if="sysDataScope.VALUE == scope.row.DataScope">{{sysDataScope.NAME}}</span>
						</template>
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
				<Page :total="total" :pageIndex="pageIndex" :pageSize="pageSize" @pageChange="pageChange" @pageSizeChange="pageSizeChange"/>
			</div>
		</el-card>
		<el-dialog title="权限设置" :visible.sync="showSetAuth" width="30%" :append-to-body="true">
			<el-tree
				:data="menus"
				show-checkbox
				default-expand-all
				node-key="Menu_ID"
				ref="tree"
				highlight-current
				:props="defaultProps"
				style="height:400px;overflow-y:auto">
			</el-tree>
			<span slot="footer" class="dialog-footer">
				<el-button @click="showSetAuth = false">取 消</el-button>
				<el-button type="primary" @click="submitSetAuth">确 定</el-button>
			</span>
		</el-dialog>
		<el-dialog title="分配用户" :visible.sync="showSetUser" width="600px" :append-to-body="true">
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
import { Message } from 'element-ui'
import { mapGetters } from 'vuex'
import request from '../../../../common/request'
import { baseMixin } from '../../../../common/mixin';
export default {
	mixins: [baseMixin],
	data() {
		return {
			role: {},
			findRoleName: '',
			setAuthId: '',
			setUserId: '',
			// 所有的用户
			users:[],
			showSetAuth: false,
			showSetUser:false,
			defaultProps: {
				children: 'children',
				label: 'Name'
			},
			selectedUsers: [],
			sysDataScopes: [],
			menus: []
		}
	},
	created() {
		this.getDataScope()
	},
	activated() {
		if(!this.$route.query.cache) {
			this.reset()
		}
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
		selectRoleChange(data) {
			this.selectedList = data.map(item => item.Role_ID)
		},
		selectUserChange(data) {
			this.selectedUsers = data
		},
		// 重置搜索表单
		reset() {
			this.findRoleName = ''
			this.pageIndex = 1
			this.pageSize = 10
			this.getList()
		},
		getList() {
			const params = {
				pageIndex: this.pageIndex || 1,
				pageSize: this.pageSize,
				Name: this.findRoleName
			}
			request({
				url: '/sys_role/list',
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
		// 获取所有菜单
		getMenus() {
			return new Promise((resolve, reject) => {
				request({
					url: '/sys_menu/list/all',
					method: 'get'
				}).then(res => {
					if (res.data.code == 0) {
						this.menus = res.data.data
						resolve()
					} else {
						Message.error(res.data.msg)
						reject(res.data.msg)
					}
				})
			})
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
					this.getList()
				} else {
					Message.error(res.data.msg)
				}
			})
		},
		setAuth(data) {
			this.getMenus().then(() => {
				this.setAuthId = data.Role_ID
				this.showSetAuth = true
				this.getRole(data.Role_ID, res => {
					let menusID = res.sys_menu_2s.map(item => item.Menu_ID)
					for (let i = 0; i < menusID.length; i++) {
						this.$refs.tree.setChecked(menusID[i], true)
					}
					this.getList()
					this.$store.dispatch('getMenu')
				})
			})
		},
		submitSetAuth() {
			let menuKeys = []
			menuKeys.push(...this.$refs.tree.getCheckedKeys())
			menuKeys.push(...this.$refs.tree.getHalfCheckedKeys())
			let data = {
				Role_ID: this.setAuthId,
				sys_menus: menuKeys
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
					this.users = res.data.data.rows
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
					let usersID = res.sys_users.map(item => item.User_ID)
					let users = this.users.filter(user => {
						return usersID.includes(user.User_ID)
					})
					users.forEach(user => {
						this.$refs.usersTable.toggleRowSelection(user)
					})
					this.getList()
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
		// 获取数据范围
		getDataScope() {
			let params = {
				TYPE: 'sys_data_scope'
			}
			request({
				url: '/sys_dict/list/type',
				method: 'get',
				params
			}).then(res => {
				if (res.data.code == 0) {
					this.sysDataScopes = res.data.data
					this.getList()
				} else {
					Message.error(res.data.msg)
				}
			})
		}
	}
}
</script>
<style lang="stylus" scoped>

</style>