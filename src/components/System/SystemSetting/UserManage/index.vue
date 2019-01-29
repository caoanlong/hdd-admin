<template>
	<div class="main-content">
		<el-card class="box-card">
			<div slot="header" class="clearfix">
				<span>用户列表</span>
			</div>
			<div class="search">
				<el-form :inline="true" class="demo-form-inline" size="small">
					<el-form-item label="姓名">
						<el-input placeholder="姓名" v-model="find.name"></el-input>
					</el-form-item>
					<el-form-item label="登录名">
						<el-input placeholder="登录名" v-model="find.loginName"></el-input>
					</el-form-item>
					<el-form-item>
						<el-button type="primary" @click="getList()">查询</el-button>
						<el-button type="default" @click="reset">重置</el-button>
					</el-form-item>
				</el-form>
			</div>
			<div class="tableControl">
				<el-button type="default" size="mini" icon="el-icon-plus" @click="$router.push({name: 'adduser'})">添加</el-button>
				<el-button type="default" size="mini" icon="el-icon-delete" @click="deleteConfirm">批量删除</el-button>
			</div>
			<div class="table">
				<el-table :data="tableData" @selection-change="selectionChange" border style="width: 100%" size="mini">
					<el-table-column label="Id" type="selection" align="center" width="40"></el-table-column>
					<el-table-column label="登录名" align="center" prop="loginName"></el-table-column>
					<el-table-column label="姓名" align="center" prop="name"></el-table-column>
					<el-table-column label="电话" prop="phone" align="center" width="120"></el-table-column>
					<el-table-column label="手机" prop="mobile" align="center" width="100"></el-table-column>
					<el-table-column label="操作" width="320" align="center">
						<template slot-scope="scope">
							<el-button size="mini" icon="el-icon-view" @click="resetPassword(scope.row.userID)">重置密码</el-button>
							<el-button size="mini" icon="el-icon-view" @click="viewUser(scope.row.userID)">查看</el-button>
							<el-button size="mini" icon="el-icon-edit" @click="editUser(scope.row.userID)">编辑</el-button>
							<el-button size="mini" icon="el-icon-delete" @click="deleteConfirm(scope.row.userID)">删除</el-button>
						</template>
					</el-table-column>
				</el-table>
				<Page :total="total" :pageIndex="pageIndex" :pageSize="pageSize" @pageChange="pageChange" @pageSizeChange="pageSizeChange"/>
			</div>
		</el-card>
		<reset-password :isVisible="isResetPasswordVisible" :userID="currentUserID" @control="handSetResetPassword"></reset-password>
	</div>
</template>
<script type="text/javascript">
import { Message } from 'element-ui'
import { baseMixin } from '../../../../common/mixin'
import SysUser from '../../../../api/SysUser'
import ResetPassword from './components/ResetPassword'
export default {
	mixins: [baseMixin],
	components: {
		ResetPassword
	},
	data() {
		return {
			isResetPasswordVisible: false,
			currentUserID: '',
			find: {
				name: '',
				loginName: ''
			}
		}
	},
	created() {
		this.getList()
	},
	methods: {
		handSetResetPassword() {
			this.isResetPasswordVisible = false
		},
		resetPassword(userID) {
			this.currentUserID = userID
			this.isResetPasswordVisible = true
		},
		reset() {
			this.find.name = ''
			this.find.loginName = ''
			this.pageIndex = 1
			this.pageSize = 10
			this.getList()
		},
		getList() {
			SysUser.find({
				current: this.pageIndex,
				size: this.pageSize,
				loginName: this.find.loginName,
				name: this.find.name
			}).then(res => {
				this.total = res.total
				this.tableData = res.records
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
		del(userIDs) {
			SysUser.del({ userIDs }).then(res => {
				Message.success(res.data.msg)
				this.getList()
			})
		},
		editUser(userID) {
			this.$router.push({ name: 'edituser', query: { userID } })
		},
		viewUser(userID) {
			this.$router.push({ name: 'viewuser', query: { userID } })
		},
		selectionChange(data) {
			this.selectedList = data.map(item => item.userID)
		}
	}
}

</script>
<style lang="stylus" scoped>
.el-row
    margin-bottom 20px
    &:last-child
    	margin-bottom 0
.el-col
	border-radius 4px
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
