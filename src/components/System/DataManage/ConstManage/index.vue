<template>
	<div class="main-content">
		<el-card class="box-card">
			<div slot="header" class="clearfix">
				<span>标准常量列表</span>
			</div>
			<div class="search">
				<el-form :inline="true" class="form-inline" size="small">
					<el-form-item label="常量类型" >
						<el-select placeholder="请选择" v-model="findType" class="constantSelect">
							<el-option v-for="item in ConstantTypeList" :key="item.VALUE" :label="item.VALUE" :value="item.VALUE">
							</el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="名称">
						<el-input placeholder="名称" v-model="findName"></el-input>
					</el-form-item>
					<el-form-item>
						<el-button type="primary" @click="getConstants(1)">查询</el-button>
						<el-button type="default" @click="reset">重置</el-button>
					</el-form-item>
				</el-form>
			</div>
			<div class="tableControl">
				<el-button type="default" size="mini" icon="el-icon-plus" @click.native="AddConstant">添加</el-button>
				<el-button type="default" size="mini" icon="el-icon-delete" @click.native="deleteConfirm">批量删除</el-button>
				<upload-excel btnType="default" btnTxt="导入" @on-selected-file="onSelectedFile"/>
				<el-button type="default" size="mini" icon="el-icon-download" :loading="downloadLoading" @click.native="exportExcel">导出</el-button>
				<a href="../../../../../static/constant_template.xlsx" download="constant_template.xlsx" class="download-btn"><svg-icon iconClass="excel-icon"></svg-icon> 下载模板</a>
				<el-button type="default" size="mini" icon="el-icon-refresh" :loading="refreshing" @click.native="refresh">刷新</el-button>
			</div>
			<div class="table">
				<el-table :data="constants" @selection-change="selectionChange" border style="width: 100%" size="mini">
					<el-table-column label="Id" type="selection" align="center" width="40"></el-table-column>
					<el-table-column label="常量类型" prop="Type"></el-table-column>
					<el-table-column label="代码" prop="Code"></el-table-column>
					<el-table-column label="名称" prop="Name"></el-table-column>
					<el-table-column label="值" prop="Value"></el-table-column>
					<el-table-column label="描述" prop="Description"></el-table-column>
					<el-table-column label="排序" prop="SortNumber" width="60" align="center"></el-table-column>
					<el-table-column label="更新人" prop="UpdateBy" width="100" align="center"></el-table-column>
					<el-table-column label="更新日期" align="center" width="140">
						<template slot-scope="scope">
							<span v-if="scope.row.UpdateTime">{{ new Date(scope.row.UpdateTime).getTime() | getdatefromtimestamp() }}</span>
						</template>
					</el-table-column>
					<el-table-column label="操作" width="230" align="center">
						<template slot-scope="scope">
							<el-button size="mini" icon="el-icon-view" @click="viewConstant(scope.row.ConstStd_ID)">查看</el-button>
							<el-button size="mini" icon="el-icon-edit" @click="editConstant(scope.row.ConstStd_ID)">编辑</el-button>
							<el-button size="mini" icon="el-icon-delete" @click="deleteConfirm(scope.row.ConstStd_ID)">删除</el-button>
						</template>
					</el-table-column>
				</el-table>
				<el-row type="flex">
					<el-col :span="12" style="padding-top: 15px; font-size: 12px; color: #909399">
						<span>总共 {{count}} 条记录每页显示</span>
						<el-select size="mini" style="width: 90px; padding: 0 5px" v-model="pageSize" @change="getConstants()">
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
							<el-pagination :page-size="pageSize" align="right" background layout="prev, pager, next" :total="count" @current-change="pageChange"></el-pagination>
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
import UploadExcel from '../../../CommonComponents/UploadExcel'
const userMap = {
	'常量类型':'Type',
	'代码':'Code',
	'名称':'Name',
	'值':'Value',
	'描述':'Description',
	'排序':'SortNumber'
}
export default {
	data() {
		return {
			downloadLoading: false,
			refreshing: false,
			filename: '基础常量',
			constants: [],
			pageIndex: 1,
			pageSize: 10,
			count: 0,
			selectedConstants: [],
			ConstantTypeList:[],
			findType:'',
			findName: '',
		}
	},
	created() {
		this.getConstants()
		this.getConstantType()
	},
	methods: {
		exportExcel() {
			this.downloadLoading = true
			import('../../../../common/Export2Excel').then(excel => {
				const tHeader = ['常量类型','代码','名称','值','描述','排序']
				const filterVal = [userMap['常量类型'], userMap['代码'], userMap['名称'], userMap['值'], userMap['描述'], userMap['排序']]
				const data = this.formatJson(filterVal, this.constants)
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
				let uploadExcelConstants = []
				result.forEach(item => {
					let excelConstant = {}
					for (let key in item) {
						excelConstant[userMap[key]] = item[key]
					}
					uploadExcelConstants.push(excelConstant)
				})
				resolve(uploadExcelConstants)
			}).then(constants => {
				this.addUserMutiple(constants)
			})
		},
		addUserMutiple(consts) {
			let data = {
				consts: consts,
			}
			request({
				url: '/base_conststand/addmutip',
				method: 'post',
				data
			}).then(res => {
				if (res.data.code == 0) {
					// console.log(res.data)
					Message.success(res.data.msg)
					this.getConstants(1)
				} else {
					Message.error(res.data.msg)
				}
			})
		},
		pageChange(index) {
			this.getConstants(index)
		},
		// 重置搜索表单
		reset() {
			this.findType = ''
			this.findName = ''
		},
		getConstantType() {
			let params = {
				TYPE:'base_constsand'
			}
			request({
				url: '/sys_dict/list/type',
				method: 'get',
				params
			}).then(res => {
				if (res.data.code == 0) {
					this.ConstantTypeList = res.data.data
				} else {
					Message.error(res.data.msg)
				}
			})
		},
		getConstants(pageIndex) {
			let params = {
				pageIndex: pageIndex || 1,
				pageSize: this.pageSize,
				Type: this.findType,
				Name: this.findName
			}
			request({
				url: '/base_conststand/list',
				method: 'get',
				params
			}).then(res => {
				if (res.data.code == 0) {
					this.count = res.data.data.count
					this.constants = res.data.data.rows
				} else {
					Message.error(res.data.msg)
				}
			})
		},
		AddConstant() {
			this.$router.push({ name: 'addconstant' })
		},
		deleteConfirm(id) {
			let ids = []
			if (id && typeof id == 'string') {
				ids = [].concat(id)
			} else {
				ids = this.selectedConstants
			}
			this.$confirm('此操作将永久删除, 是否继续?', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			}).then(() => {
				this.delConstants(ids)
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
		delConstants(ids) {
			let data = {
				ids: ids
			}
			request({
				url: '/base_conststand/delete',
				method: 'post',
				data
			}).then(res => {
				if (res.data.code == 0) {
					this.getConstants()
				} else {
					Message.error(res.data.msg)
				}
			})
		},

		editConstant(id) {
			this.$router.push({ name: 'editconstant', query: { ConstStd_ID: id} })
		},
		viewConstant(id) {
			this.$router.push({ name: 'viewconstant', query: { ConstStd_ID: id} })
		},
		selectionChange(data) {
			this.selectedConstants = data.map(item => item.ConstStd_ID)
			console.log(this.selectedConstants)
		},
		refresh() {
			this.refreshing = true
			this.getConstants()
			setTimeout(() => {
				this.refreshing = false
			}, 500)
		}
	},
	components: {
		UploadExcel
	}
}

</script>
<style lang="stylus" scoped>
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
