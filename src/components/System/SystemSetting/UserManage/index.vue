<template>
	<div class="main-content">
		<el-card class="box-card">
			<div slot="header" class="clearfix">
				<span>用户列表</span>
			</div>
			<div class="search">
				<el-form :inline="true" class="demo-form-inline" size="small">
					<el-form-item label="姓名">
						<el-input placeholder="姓名" v-model="findName"></el-input>
					</el-form-item>
					<el-form-item label="登录名">
						<el-input placeholder="登录名" v-model="findUsername"></el-input>
					</el-form-item>
					<el-form-item label="归属公司">
						<el-select v-model="findCompany" placeholder="请选择">
							<el-option label="总公司" value="总公司"></el-option>
							</el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="归属部门">
						<el-select v-model="findDepartment" placeholder="请选择">
							<el-option label="市场部" value="市场部"></el-option>
							<el-option label="行政部" value="行政部"></el-option>
							<el-option label="财务部" value="财务部"></el-option>
							<el-option label="技术部" value="技术部"></el-option>
						</el-select>
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
				<upload-excel btnType="default" btnTxt="导入" @on-selected-file="onSelectedFile"/>
				<el-button type="default" size="mini" icon="el-icon-download" :loading="downloadLoading" @click.native="exportExcel">导出</el-button>
				<a href="../../../../../static/template.xlsx" download="template.xlsx" class="download-btn"><svg-icon iconClass="excel-icon"></svg-icon> 下载模板</a>
				<el-button type="default" size="mini" icon="el-icon-refresh" :loading="refreshing" @click.native="refresh">刷新</el-button>
				
			</div>
			<div class="table">
				<el-table :data="users" @selection-change="selectionChange" border style="width: 100%" size="mini">
					<el-table-column label="Id" type="selection" align="center"></el-table-column>
					<el-table-column label="登录名" prop="LoginName" align="left"></el-table-column>
					<el-table-column label="姓名" prop="Name" align="left"></el-table-column>
					<el-table-column label="电话" prop="Phone" align="left"></el-table-column>
					<el-table-column label="手机" prop="Mobile" align="left"></el-table-column>
					<el-table-column label="归属公司" prop="company" align="left"></el-table-column>
					<el-table-column label="归属部门" prop="department" align="left"></el-table-column>
					<el-table-column label="操作" width="230" align="center">
						<template slot-scope="scope">
							<el-button size="mini" icon="el-icon-view" @click="viewUser(scope.row.User_ID)">查看</el-button>
							<el-button size="mini" icon="el-icon-edit" @click="editUser(scope.row.User_ID)">编辑</el-button>
							<el-button size="mini" icon="el-icon-delete" @click="deleteConfirm(scope.row.User_ID)">删除</el-button>
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
import UploadExcel from '../../../CommonComponents/UploadExcel'
const userMap = {
	'Id': '_id',
	'登录名': 'LoginName',
	'姓名': 'Name',
	'电话': 'Phone',
	'手机': 'Mobile',
	'归属公司': 'company',
	'归属部门': 'department'
}
export default {
	data() {
		return {
			downloadLoading: false,
			refreshing: false,
			filename: '用户数据',
			users: [],
			pageIndex: 1,
			pageSize: 10,
			findName: '',
			findUsername: '',
			findCompany: '',
			findDepartment: '',
			count: 0,
			selectedUsers: []
		}
	},
	created() {
		this.getUsers()
	},
	methods: {
		exportExcel() {
			this.downloadLoading = true
			import('../../../../common/Export2Excel').then(excel => {
				const tHeader = ['Id', '登录名', '姓名', '电话', '手机', '归属公司', '归属部门']
				const filterVal = [userMap['Id'], userMap['登录名'], userMap['姓名'], userMap['电话'], userMap['手机'], userMap['归属公司'], userMap['归属部门']]
				const data = this.formatJson(filterVal, this.users)
				excel.export_json_to_excel(tHeader, data, this.filename)
				this.downloadLoading = false
			})
		},
		formatJson(filterVal, jsonData) {
			return jsonData.map(v => filterVal.map(j => {
				if (j === 'timestamp') {
					return parseTime(v[j])
				} else {
					return v[j]
				}
			}))
		},
		onSelectedFile(result) {
			new Promise((resolve, reject) => {
				let uploadExcelUsers = []
				result.forEach(item => {
					let excelUser = {}
					for (let key in item) {
						excelUser[userMap[key]] = item[key]
					}
					uploadExcelUsers.push(excelUser)
				})
				resolve(uploadExcelUsers)
			}).then(users => {
				this.addUserMutiple(users)
			})
		},
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
					this.count = res.data.data.count
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
		UploadExcel
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
