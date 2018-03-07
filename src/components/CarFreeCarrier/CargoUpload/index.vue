<template>
	<div class="main-content">
		<el-card class="box-card">
			<div slot="header" class="clearfix">
				<span>无车承运人货源列表</span>
			</div>
			<div class="search">
				<el-form :inline="true" class="demo-form-inline" size="small">
					<el-form-item label="报文参考号：">
						<el-input placeholder="报文参考号" v-model="findMessageReferenceNumber"></el-input>
					</el-form-item>
					<el-form-item>
						<el-button type="primary"  @click.native="getCargoList(1)">查询</el-button>
						<el-button type="default" @click.native="reset">重置</el-button>
					</el-form-item>
				</el-form>
			</div>
			<div class="tableControl">
				<el-button type="default" size="mini" icon="el-icon-plus" @click="AddCargo">添加</el-button>
				<el-button type="default" size="mini" icon="el-icon-upload2" @click="onSelectedFile">导入</el-button>
				<el-button type="default" size="mini" icon="el-icon-download" :loading="downloadLoading" @click.native="exportExcel">导出</el-button>
				<a href="../../../../../static/cargo_template.xlsx" download="cargo_template.xlsx" class="download-btn"><svg-icon iconClass="excel-icon"></svg-icon> 下载模板</a>
				<el-button type="default" size="mini" icon="el-icon-refresh" :loading="refreshing" @click.native="refresh">刷新</el-button>
			</div>
			<div class="table">
				<el-table :data="tableData" border style="width: 100%" size="mini">
					<el-table-column label="报文参考号" prop="messageReferenceNumber" align="center" width="140">
					</el-table-column>
					<el-table-column label="发送时间"prop="messageSendingDateTime" align="center" width="120">
					</el-table-column>
					<el-table-column label="发货人" prop="consignor">
					</el-table-column>
					<el-table-column label="出发地" prop="placeOfLoading">
					</el-table-column>
					<el-table-column label="费用总金额" prop="totalMonetaryAmount">
					</el-table-column>
					<el-table-column label="车辆分类" prop="vehicleClassificationCode">
					</el-table-column>
					<el-table-column label="货物名称" prop="descriptionOfGoods">
					</el-table-column>
					<el-table-column label="货物毛重" prop="goodsItemGrossWeight">
					</el-table-column>
					<el-table-column label="状态" prop="hasFail">
					</el-table-column>
					<el-table-column label="失败描述" prop="failDescription">
					</el-table-column>
					<el-table-column label="创建时间" prop="createTime"  align="center" width="140">
						<template slot-scope="scope">
							<span v-if="scope.row.createTime">{{scope.row.createTime | getdatefromtimestamp()}}</span>
						</template>
					</el-table-column>
					<el-table-column label="操作" width="150" align="center">
						<template slot-scope="scope">
							<el-button type="default" size="mini" icon="el-icon-view" @click="ViewCargo(scope.row.goodsId)">查看</el-button>
							<el-button type="default" size="mini" icon="el-icon-edit" @click="EditCargo(scope.row.goodsId)">编辑</el-button>
						</template>
					</el-table-column>
				</el-table>
				<el-row type="flex">
					<el-col :span="12" style="padding-top: 15px; font-size: 12px; color: #909399">
						<span>总共 {{count}} 条记录每页显示</span>
						<el-select size="mini" style="width: 90px; padding: 0 5px" v-model="pageSize" @change="getCargoList()">
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
import requestJava from '../../../common/requestJava'
import { Message } from 'element-ui'
import UploadExcel from '../../CommonComponents/UploadExcel'
const userMap = {
	'登录名': 'LoginName',
	'姓名': 'Name',
	'电话': 'Phone',
	'手机': 'Mobile',
	'归属公司': 'company.Name',
	'归属部门': 'department.Name'
}
export default {
	data() {
		return {
			pageNum: 1,
			pageSize: 10,
			count: 0,
			tableData: [],
			refreshing: false,
			downloadLoading: false,
			findMessageReferenceNumber:''
		}
	},
	created() {
		this.getCargoList()
	},
	methods: {
		exportExcel() {
			this.downloadLoading = true
			import('../../../common/Export2Excel').then(excel => {
				const tHeader = ['登录名', '姓名', '电话', '手机', '归属公司', '归属部门']
				const filterVal = [userMap['登录名'], userMap['姓名'], userMap['电话'], userMap['手机'], userMap['归属公司'], userMap['归属部门']]
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
		reset() {
			this.findMessageReferenceNumber = ''
		},
		getCargoList(pageNum) {
			let params = {
				pageNum: pageNum || 1,
				pageSize: this.pageSize,
				messageReferenceNumber: this.findMessageReferenceNumber
			}
			requestJava({
				url: '/notruckCargosource/list',
				method: 'get',
				params
			}).then(res => {
				if (res.data.code == 200) {
					this.count = res.data.data.total
					this.tableData = res.data.data.list
					console.log(res.data)
				} else {
					Message.error(res.data.message)
				}
			})
		},
		pageChange(index) {
			this.getCargoList(index)
		},
		AddCargo() {
			this.$router.push({ name: 'addcargo' })
		},
		EditCargo(goodsId) {
			this.$router.push({ name: 'editcargo', query: { goodsId} })
		},
		ViewCargo(goodsId) {
			this.$router.push({ name: 'viewcargo' , query: { goodsId} })
		},
		refresh() {
			this.refreshing = true
			this.getCargoList()
			setTimeout(() => {
				this.refreshing = false
			}, 500)
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
