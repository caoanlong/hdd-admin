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
				<el-button type="default" size="mini" icon="el-icon-plus" @click="$router.push({name: 'addrole'})">添加</el-button>
				<el-button type="default" size="mini" icon="el-icon-delete" @click="deleteConfirm">批量删除</el-button>
			</div>
			<div class="table">
				<el-table 
					ref="roleTable" 
					:data="tableData" 
					@selection-change="selectRoleChange" 
					border style="width: 100%" size="mini">
					<el-table-column type="selection" align="center" width="40"></el-table-column>
					<el-table-column label="角色名称" prop="name" align="left"></el-table-column>
					<el-table-column label="英文名称" prop="enName" align="left"></el-table-column>
					<el-table-column label="归属机构" prop="organizationName" align="left"></el-table-column>
					<el-table-column label="操作" width="420" align="center">
						<template slot-scope="scope">
							<el-button type="default" size="mini" icon="el-icon-view" @click="viewRole(scope.row.roleID)">查看</el-button>
							<el-button type="default" size="mini" icon="el-icon-edit" @click="editRole(scope.row.roleID)">修改</el-button>
							<el-button type="default" size="mini" icon="el-icon-delete" @click="deleteConfirm(scope.row.roleID)">删除</el-button>
							<el-button type="default" size="mini" icon="el-icon-setting" @click="setPermission(scope.row.roleID)">权限设置</el-button>
							<el-button type="default" size="mini" icon="el-icon-plus"  @click="setUser(scope.row.roleID)">分配用户</el-button>
						</template>
					</el-table-column>
				</el-table>
				<Page :total="total" :pageIndex="pageIndex" :pageSize="pageSize" @pageChange="pageChange" @pageSizeChange="pageSizeChange"/>
			</div>
		</el-card>
		<set-user :isVisible="isSetUserVisible" :roleID="currentRoleID" @control="handSetUser"></set-user>
		<set-permission :isVisible="isSetPermissionVisible" :roleID="currentRoleID" @control="handSetPermission"></set-permission>
	</div>
</template>
<script type="text/javascript">
import { Message } from 'element-ui'
import SysRole from '../../../../api/SysRole'
import { baseMixin } from '../../../../common/mixin';
import { deleteConfirm } from '../../../../common/utils'
import SetUser from './components/SetUser'
import SetPermission from './components/SetPermission'
export default {
	mixins: [baseMixin],
	components: { SetUser, SetPermission },
	data() {
		return {
			findRoleName: '',
			isSetUserVisible: false,
			isSetPermissionVisible: false,
			currentRoleID: ''
		}
	},
	created() {
		this.getList()
	},
	methods: {
		editRole(roleID) {
			this.$router.push({name: 'editrole', query: {roleID}})
		},
		viewRole(roleID) {
			this.$router.push({name: 'viewrole', query: {roleID}})
		},
		selectRoleChange(data) {
			this.selectedList = data.map(item => item.roleID)
		},
		setUser(roleID) {
			this.currentRoleID = roleID
			this.isSetUserVisible = true
		},
		setPermission(roleID) {
			this.currentRoleID = roleID
			this.isSetPermissionVisible = true
		},
		handSetUser() {
			this.isSetUserVisible = false
		},
		handSetPermission() {
			this.isSetPermissionVisible = false
		},
		// 重置搜索表单
		reset() {
			this.findRoleName = ''
			this.pageIndex = 1
			this.pageSize = 10
			this.getList()
		},
        getList() {
			SysRole.find({
				pageNum: this.pageIndex,
				pageSize: this.pageSize,
				name: this.findRoleName
			}).then(res => {
				this.total = res.total
                this.tableData = res.list
			})
		},
		deleteConfirm(id) {
			let ids = ''
			if (id && typeof id == 'string') {
				ids = id
			} else {
				if (this.selectedList.length == 0) {
					Message.warning('请选择')
					return
				}
				ids = this.selectedList.join(',')
			}
			this.$confirm('此操作将永久删除, 是否继续?', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			}).then(() => {
				this.del(ids)
			}).catch(() => {
				Message.info('已取消删除')
			})
		},
        del(ids) {
			SysRole.del({ ids }).then(res => {
				Message.success(res.data.msg)
				this.getList()
			})
		},
	}
}
</script>
<style lang="stylus" scoped>

</style>