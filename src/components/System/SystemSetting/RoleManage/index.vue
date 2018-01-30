<template>
	<div class="main-content">
		<el-card class="box-card">
		  <div slot="header" class="clearfix">
			<span>角色列表</span>
		  </div>
		  <div class="search">
			<el-form :inline="true"  class="demo-form-inline"  size="small">
			  <el-form-item label="角色名称：">
				<el-input  placeholder="角色名称"></el-input>
			  </el-form-item>
			  <el-form-item>
				<el-button type="primary">查询</el-button>
				<el-button type="default">重置</el-button>
			  </el-form-item>
			</el-form>
		  </div>
		  <div class="tableControl">
			<el-button type="default" size="mini" icon="el-icon-plus" @click.native="addRole">添加</el-button>
			<el-button type="default" size="mini" icon="el-icon-delete" @click.native="delRoleMutiple">批量删除</el-button>
			<el-button type="default" size="mini" icon="el-icon-refresh" @click.native="getRoles">刷新</el-button>
		  </div>
		  <div class="table">
			<el-table :data="roles" @selection-change="selectionChange" border style="width: 100%" size="mini">
				<el-table-column type="selection" align="center">
				</el-table-column>
				<el-table-column label="角色名称" prop="name">
				</el-table-column>
				<el-table-column label="英文名称" prop="enName">
				</el-table-column>
				<el-table-column label="归属机构" prop="organization">
				</el-table-column>
				<el-table-column label="数据范围" prop="dataRange">
				</el-table-column>
				<el-table-column label="操作" width="500" align="center">
					<template slot-scope="scope">
						<el-button type="default" size="mini" icon="el-icon-view" @click="viewPole(scope.row._id)">查看</el-button>
						<el-button type="default" size="mini" icon="el-icon-edit" @click="editRole(scope.row._id)">修改</el-button>
						<el-button type="default" size="mini" icon="el-icon-delete" @click="delRole(scope.row._id)">删除</el-button>
						<el-button type="default" size="mini" icon="el-icon-setting" @click="setAuth(scope.row)">权限设置</el-button>
						<el-button type="default" size="mini" icon="el-icon-plus"  @click="SetUser">分配用户</el-button>
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
				node-key="_id"
				ref="tree"
				highlight-current
				:props="defaultProps"
				@check-change="selectMenu">
			</el-tree>
			<span slot="footer" class="dialog-footer">
				<el-button @click="showSetAuth = false">取 消</el-button>
				<el-button type="primary" @click="submitSetAuth">确 定</el-button>
			</span>
		</el-dialog>
		<el-dialog title="分配用户" :visible.sync="showSetUser" width="536px">
			<el-transfer v-model="selectedUsers" :props="{key: '_id',label: 'name'}" :data="users" @change="handleChange">
  			</el-transfer>
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
				roles: [],
				pageIndex: 1,
				pageSize: 10,
				count: 0,
				selectedRoles: [],
				setAuthId: '',
				users:[],
				showSetAuth: false,
				showSetUser:false,
				defaultProps: {
					children: 'children',
					label: 'title'
				},
				selectedMenuId: [],
				selectedUsers:[]
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
				this.$router.push({name: 'editrole', query: {id: id, type: 'edit'}})
			},
			viewPole(id) {
				this.$router.push({name: 'editrole', query: {id: id, type: 'view'}})
			},
			pageChange(index) {
				this.getRoles(index)
			},
			selectionChange(data) {
				this.selectedRoles = data.map(item => item._id)
			},
			getRoles(pageIndex) {
				let params = {
					pageIndex: pageIndex || 1,
					pageSize: this.pageSize
				}
				request({
					url: '/role',
					method: 'get',
					params
				}).then(res => {
					if (res.data.code == 0) {
						this.count = res.data.data.count
						this.roles = res.data.data.roles
					} else {
						Message.error(res.data.msg)
					}
				})
			},
			delRoleMutiple() {
				this.delRole(this.selectedRoles)
			},
			delRole(ids) {
				let data = {
					ids: [].concat(ids)
				}
				request({
					url: '/role/delete',
					method: 'post',
					data
				}).then(res => {
					if (res.data.code == 0) {
						console.log(res.data)
						Message.success(res.data.msg)
						this.getRoles()
					} else {
						Message.error(res.data.msg)
					}
				})
			},
			setAuth(data) {
				this.setAuthId = data._id
				this.showSetAuth = true
				this.$nextTick(() => {
					this.$refs.tree.setCheckedKeys(data.permissions)
					this.getRoles()
				})
			},
			submitSetAuth() {
				let data = {
					id: this.setAuthId,
					permissions: this.selectedMenuId
				}
				request({
					url: '/role/update',
					method: 'post',
					data
				}).then(res => {
					if (res.data.code == 0) {
						console.log(res.data)
						Message.success(res.data.msg)
					} else {
						Message.error(res.data.msg)
					}
					this.showSetAuth = false
				})
			},
			selectMenu(data, isSelected) {
				if (isSelected) {
					this.selectedMenuId.push(data._id)
				} else {
					this.selectedMenuId.splice(this.selectedMenuId.indexOf(data._id), 1)
				}
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
			SetUser() {
				this.showSetUser = true
				this.getUsers()
			},
			handleChange(value, direction, movedKeys) {
				console.log(value, direction, movedKeys)
			},
			submitSetUser() {
				this.showSetUser = false
			}
		}
	}
</script>
<style lang="stylus">

</style>