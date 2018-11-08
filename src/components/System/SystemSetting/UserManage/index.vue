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
					<el-form-item label="归属公司">
						<el-select v-model="find.company" placeholder="请选择" @change="changeCompany">
							<el-option :label="company.Name" :value="company.Organization_ID" v-for="company in companys" :key="company.Organization_ID"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="归属部门">
						<el-select v-model="find.department" placeholder="请选择">
							<el-option :label="department.Name" :value="department.Organization_ID" v-for="department in departments" :key="department.Organization_ID"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item>
						<el-button type="primary" @click="getList()">查询</el-button>
						<el-button type="default" @click="reset">重置</el-button>
					</el-form-item>
				</el-form>
			</div>
			<div class="tableControl">
				<el-button type="default" size="mini" icon="el-icon-plus" @click="addUser">添加</el-button>
				<el-button type="default" size="mini" icon="el-icon-delete" @click="deleteConfirm">批量删除</el-button>
				<!-- <upload-excel btnType="default" btnTxt="导入" @on-selected-file="onSelectedFile"/> -->
				<el-button type="default" size="mini" icon="el-icon-download" :loading="downloadLoading" @click="exportExcel">导出</el-button>
				<!-- <a href="../../../../../static/user_template.xlsx" download="user_template.xlsx" class="download-btn"><svg-icon iconClass="excel-icon"></svg-icon> 下载模板</a> -->
			</div>
			<div class="table">
				<el-table :data="tableData" @selection-change="selectionChange" border style="width: 100%" size="mini">
					<el-table-column label="Id" type="selection" align="center" width="40"></el-table-column>
					<el-table-column label="登录名" prop="LoginName"></el-table-column>
					<el-table-column label="姓名" prop="Name"></el-table-column>
					<el-table-column label="电话" prop="Phone" align="center" width="120"></el-table-column>
					<el-table-column label="手机" prop="Mobile" align="center" width="100"></el-table-column>
					<el-table-column label="归属公司" prop="company.Name"></el-table-column>
					<el-table-column label="归属部门" prop="department.Name"></el-table-column>
					<el-table-column label="操作" width="230" align="center">
						<template slot-scope="scope">
							<el-button size="mini" icon="el-icon-view" @click="viewUser(scope.row.User_ID)">查看</el-button>
							<el-button size="mini" icon="el-icon-edit" @click="editUser(scope.row.User_ID)">编辑</el-button>
							<el-button size="mini" icon="el-icon-delete" @click="deleteConfirm(scope.row.User_ID)">删除</el-button>
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
import UploadExcel from '../../../CommonComponents/UploadExcel'
import { validUploadFile } from '../../../../common/utils'
import { baseMixin } from '../../../../common/mixin'
const userMap = {
	'登录名': 'LoginName',
	'姓名': 'Name',
	'电话': 'Phone',
	'手机': 'Mobile',
	'归属公司': 'company.Name',
	'归属部门': 'department.Name'
}
export default {
	mixins: [baseMixin],
	data() {
		return {
			downloadLoading: false,
			filename: '用户数据',
			tableData: [],
			find: {
				name: '',
				loginName: '',
				company: '',
				department: ''
			},
			companys: [],
			departments: []
		}
	},
	components: { UploadExcel },
	created() {
		this.getList()
		this.getOrgs()
	},
	activated() {
		if(!this.$route.query.cache) {
			this.reset()
		}
	},
	methods: {
		exportExcel() {
			this.downloadLoading = true
			import('../../../../common/Export2Excel').then(excel => {
				const tHeader = ['登录名', '姓名', '电话', '手机', '归属公司', '归属部门']
				const filterVal = [userMap['登录名'], userMap['姓名'], userMap['电话'], userMap['手机'], userMap['归属公司'], userMap['归属部门']]
				const data = this.formatJson(filterVal, this.tableData)
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
		// 选择导入文件
		onSelectedFile(result) {
			validUploadFile(result, userMap, [
				'登录名', '姓名', '电话', '手机', '归属公司', '归属部门'
			]).then(res => {
				this.addMutiple(res)
			}).catch(err => {
				Message.error(err)
			})
		},
		// 导入
		addMutiple(users) {
			const data = { users }
			request({
				url: '/sys_user/addmutip',
				method: 'post',
				data
			}).then(res => {
				if (res.data.code == 0) {
					Message.success(res.data.msg)
					this.getList()
				} else {
					Message.error(res.data.msg)
				}
			})
		},
		reset() {
			this.find.name = ''
			this.find.loginName = ''
			this.find.company = ''
			this.find.department = ''
			this.pageIndex = 1
			this.pageSize = 10
			this.getList()
		},
		getList() {
			const params = {
				pageIndex: this.pageIndex || 1,
				pageSize: this.pageSize,
				LoginName: this.find.loginName,
				Name: this.find.name,
				Company_ID: this.find.company,
				Organization_ID: this.find.department
			}
			request({
				url: '/sys_user/list',
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
		addUser() {
			this.$router.push({ name: 'adduser' })
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
					this.getList()
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
		getOrgs(Organization_PID) {
			const params = {
				Organization_PID: Organization_PID || ''
			}
			request({
				url: '/sys_organization/list',
				method: 'get',
				params
			}).then(res => {
				if (res.data.code == 0) {
					if (Organization_PID) {
						this.departments = res.data.data
					} else {
						this.companys = res.data.data
					}
				} else {
					Message.error(res.data.msg)
				}
			})
		},
		changeCompany(id) {
			this.find.department = ''
			this.getOrgs(id)
		},
		selectionChange(data) {
			this.selectedList = data.map(item => item.User_ID)
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
