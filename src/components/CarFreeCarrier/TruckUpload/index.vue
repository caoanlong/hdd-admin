<template>
	<div class="main-content">
		<el-card class="box-card">
			<div slot="header" class="clearfix">
				<span>无车承运人车源列表</span>
			</div>
			<div class="search">
				<el-form :inline="true"  class="demo-form-inline"  size="small">
					<el-form-item label="报文参考号：">
						<el-input  placeholder="报文参考号" v-model="findMessageReferenceNumber"></el-input>
					</el-form-item>
					<el-form-item label="单证名称：">
						<el-input  placeholder="单证名称" v-model="findDocumentName"></el-input>
					</el-form-item>
					<el-form-item>
						<el-button type="primary"  @click.native="getTruckList()">查询</el-button>
						<el-button type="default" @click.native="reset">重置</el-button>
					</el-form-item>
				</el-form>
			</div>
			<div class="tableControl">
				<el-button type="default" size="mini" icon="el-icon-plus" @click="AddTruck">添加</el-button>
				<el-upload 
					class="upload-File" 
					name="excel" 
					:action="importFileUrl" 
					:auto-upload="true" 
					:onError="uploadError" 
					:onSuccess="uploadSuccess" 
					:beforeUpload="beforeFileUpload" 
					:headers="uploadHeaders" 
					:show-file-list="false">
					<el-button type="default" size="mini" icon="el-icon-upload2">导入</el-button>
				</el-upload>
				<a :href="exportExcelUrl" download="goodssource.xlsx" class="exportExcel el-icon-download">导出</a>
				<a :href="templateUrl" download="trucksource.xlsx" class="download-btn"><svg-icon iconClass="excel-icon"></svg-icon> 下载模板</a>
			</div>
			<div class="table">
				<el-table :data="tableData" border style="width: 100%" size="mini">
					<el-table-column label="报文参考号" prop="messageReferenceNumber">
					</el-table-column>
					<el-table-column label="单证名称" prop="documentName">
					</el-table-column>
					<el-table-column label="发送时间" prop="messageSendingDateTime">
					</el-table-column>
					<el-table-column label="车辆牌照号" prop="vehicleNumber">
					</el-table-column>
					<el-table-column label="车型代码" prop="vehicleClassificationCode">
					</el-table-column>
					<el-table-column label="车辆长度" prop="vehicleLength">
					</el-table-column>
					<el-table-column label="核定载质量" prop="vehicleTonnage">
					</el-table-column>
					<el-table-column label="出发地" prop="placeOfLoading">
					</el-table-column>
					<el-table-column label="目的地" prop="goodsReceiptPlace">
					</el-table-column>
					<el-table-column label="状态" prop="hasFail">
					</el-table-column>
					<el-table-column label="描述" prop="failDescription">
					</el-table-column>
					<el-table-column label="创建时间" prop="createTime"  align="center" width="140">
						<template slot-scope="scope">
							<span v-if="scope.row.createTime">{{scope.row.createTime | getdatefromtimestamp()}}</span>
						</template>
					</el-table-column>
					<el-table-column label="操作" width="150" align="center">
						<template slot-scope="scope">
							<el-button type="default" size="mini" icon="el-icon-view" @click="ViewTruck(scope.row.notrucksourceId)">查看</el-button>
							<el-button type="default" size="mini" icon="el-icon-edit" @click="EditTruck(scope.row.notrucksourceId)">编辑</el-button>
						</template>
					</el-table-column>
				</el-table>
				<el-row type="flex">
					<el-col :span="12" style="padding-top: 15px; font-size: 12px; color: #909399">
						<span>总共 {{count}} 条记录每页显示</span>
						<el-select size="mini" style="width: 90px; padding: 0 5px" v-model="pageSize" @change="getTruckList()">
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
	import requestJava, { javaUrl } from '../../../common/requestJava'
	import { Message } from 'element-ui'
	export default {
		data() {
			return {
				downloadLoading: false,
				importFileUrl: javaUrl + '/notruckTrucksource/importExcel',
				exportExcelUrl: javaUrl + '/notruckTrucksource/export',
				templateUrl: javaUrl + '/notruckUser/export/excelTemplate?fileName=trucksource.xlsx ',
				uploadHeaders: {'Authorization': localStorage.getItem('token')},
				pageIndex: 1,
				pageSize: 10,
				count: 0,
				tableData: [],
				findMessageReferenceNumber:'',
				findDocumentName:''
			}
		},
		created() {
			this.getTruckList()
		},
		methods: {
			reset() {
				this.findMessageReferenceNumber = ''
				this.findDocumentName=''
			},
			pageChange(index) {
				this.pageIndex = index
				this.getTruckList()
			},
			getTruckList() {
				let params = {
					pageNum: this.pageIndex || 1,
					pageSize: this.pageSize,
					messageReferenceNumber: this.findMessageReferenceNumber,
					documentName: this.findDocumentName
				}
				requestJava({
					url: '/notruckTrucksource/list',
					method: 'get',
					params
				}).then(res => {
					if (res.data.code == 200) {
						this.count = res.data.data.total
						this.tableData = res.data.data.list
					} else {
						Message.error(res.data.message)
					}
				})
			},
			AddTruck() {
				this.$router.push({ name: 'addtruck'})
			},
			EditTruck(notrucksourceId) {
				this.$router.push({ name: 'edittruck', query: { notrucksourceId}})
			},
			ViewTruck(notrucksourceId) {
				this.$router.push({ name: 'viewtruck', query: { notrucksourceId}})
			},
			// 导入
			uploadSuccess (response) {
				Message.success(response.message)
				this.getTruckList()
			},
			// 上传错误
			uploadError (response) {
				Message.error('response.message')
			},
			beforeFileUpload (file) {
				const extension = file.name.split('.')[1] === 'xls'
				const extension2 = file.name.split('.')[1] === 'xlsx'
				const isLt2M = file.size / 1024 / 1024 < 10
				if (!extension && !extension2) {
					Message.error('上传模板只能是 xls、xlsx格式!')
				}
				if (!isLt2M) {
					Message.error('上传模板大小不能超过 10MB!')
				}
				return extension || extension2 && isLt2M
			}
		}
	}	
</script>
<style lang="stylus" scoped>
.download-btn
.exportExcel
	font-size 12px
	color #606266
	height 29px
	line-height 29px
	padding 0 15px
	border 1px solid #dcdfe6
	border-radius 3px
	background #fff
	margin-right 10px
	display inline-block
	vertical-align top
	&:hover
		border-color #c6e2ff
		color #409eff
		background #ecf5ff
	&:active
		border-color #3a8ee6
		color #3a8ee6
.upload-File
	display inline-block
	margin 0 10px
</style>