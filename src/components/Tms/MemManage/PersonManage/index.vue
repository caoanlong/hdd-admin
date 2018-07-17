<template>
	<div class="main-content">
		<el-card class="box-card">
			<div slot="header" class="clearfix">
				<span>人员列表</span>
			</div>
			<div class="search">
				<el-form :inline="true" class="form-inline" size="small">
					<el-form-item label="姓名">
						<el-input placeholder="请输入..." v-model="findrealName"></el-input>
					</el-form-item>
					<el-form-item label="联系电话">
						<el-input placeholder="请输入..." v-model="findmobile"></el-input>
					</el-form-item>
					<el-form-item label="评级">
						<el-select v-model="findintegrityExamineGrade" placeholder="请选择">
							<el-option label="无" value=""></el-option>
							<el-option label="A" value="A"></el-option>
							<el-option label="AA" value="AA"></el-option>
							<el-option label="AAA" value="AAA"></el-option>
							<el-option label="AAAA" value="AAAA"></el-option>
							<el-option label="AAAAA" value="AAAAA"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="岗位">
						<el-select v-model="findposition" placeholder="请选择">
							<el-option label="操作员" value="Operator"></el-option>
							<el-option label="驾驶员" value="Driver"></el-option>
							<el-option label="押运员" value="Supercargo"></el-option>
							<el-option label="专职安全员" value="SafetyOfficer"></el-option>
							<el-option label="装卸管理人员" value="Stevedore"></el-option>
							<el-option label="其他人员" value="Other"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="创建时间">
						<el-date-picker 
							v-model="findRangeDate" 
							type="daterange" 
							range-separator="至" 
							start-placeholder="开始日期" 
							end-placeholder="结束日期" 
							:clearable="false" 
							@change="selectDateRange">
						</el-date-picker>
					</el-form-item>
					<el-form-item>
						<el-button type="primary" @click="getList()">查询</el-button>
						<el-button type="default" @click="reset">重置</el-button>
					</el-form-item>
				</el-form>
			</div>
			<div class="table">
				<el-table :data="tableData" border style="width: 100%" size="mini">
					<el-table-column label="序号" type="index" align="center" width="50"></el-table-column>
					<el-table-column label="用户" prop="memberCompany" width="100px"></el-table-column>
					<el-table-column label="创建时间" width="140px">
						<template slot-scope="scope">
							<span v-if="scope.row.createTime">{{scope.row.createTime | getdatefromtimestamp()}}</span>
						</template>
					</el-table-column>
					<el-table-column label="姓名" prop="realName"></el-table-column>
					<el-table-column label="性别" width="60px" align="center">
						<template slot-scope="scope">
							<span v-if="scope.row.sex=='M'">男</span>
							<span v-else>女</span>
						</template>
					</el-table-column>
					<el-table-column label="聘用岗位" prop="position">
						<template slot-scope="scope">
							<span v-for="post in scope.row.position.split(',')" :key="post">{{postMap[post] + '，'}}</span>
						</template>
					</el-table-column>
					<el-table-column label="身份证号" prop="idCardNum"></el-table-column>
					<el-table-column label="创建人" prop="createName"></el-table-column>
					<el-table-column label="状态" align="center">
						<template slot-scope="scope">
							<span v-if="scope.row.status=='Passed'">通过</span>
							<span v-else-if="scope.row.status=='NotPassed'">未通过</span>
							<span v-else>其它</span>
						</template>
					</el-table-column>
					<el-table-column label="审核人" prop="auditName"></el-table-column>
					<el-table-column label="审核日期" width="90" align="center">
						<template slot-scope="scope" v-if="scope.row.auditTime">
							{{scope.row.auditTime | getdatefromtimestamp(true)}}
						</template>
					</el-table-column>
					<el-table-column label="准驾车型" prop="quasiDrivingType"></el-table-column>
					<el-table-column label="驾驶证审验有效期至" width="90" align="center">
						<template slot-scope="scope" v-if="scope.row.driverLicExamineEndTime">
							{{scope.row.driverLicExamineEndTime | getdatefromtimestamp(true)}}
						</template>
					</el-table-column>
					<el-table-column label="从业资格证件号" prop="qualificationCode"></el-table-column>
					<el-table-column label="从业资格类别" prop="qualificationType"></el-table-column>
					<el-table-column label="从业资格证有效期至" width="90" align="center">
						<template slot-scope="scope" v-if="scope.row.qualificationExpirationTime">
							{{scope.row.qualificationExpirationTime | getdatefromtimestamp(true)}}
						</template>
					</el-table-column>
					<el-table-column label="初次发证件时间">
						<template slot-scope="scope" v-if="scope.row.driverLicenseFirstTime">
							{{scope.row.driverLicenseFirstTime | getdatefromtimestamp(true)}}
						</template>
					</el-table-column>
					<el-table-column label="诚信考核等级" prop="integrityExamineGrade"></el-table-column>
					<el-table-column label="诚信考核有效期至">
						<template slot-scope="scope" v-if="scope.row.integrityExamineEndTime">
							{{scope.row.integrityExamineEndTime | getdatefromtimestamp(true)}}
						</template>
					</el-table-column>
					<el-table-column label="合同有效期起">
						<template slot-scope="scope" v-if="scope.row.laborContractBeginTime">
							{{scope.row.laborContractBeginTime | getdatefromtimestamp(true)}}
						</template>
					</el-table-column>
					<el-table-column label="合同有效期至">
						<template slot-scope="scope" v-if="scope.row.laborContractEndTime">
							{{scope.row.laborContractEndTime | getdatefromtimestamp(true)}}
						</template>
					</el-table-column>
					<el-table-column label="职称或技术等级" prop="titleLever"></el-table-column>
					<el-table-column label="联系电话" prop="mobile"></el-table-column>
					<el-table-column label="家庭地址" prop="homeAddress"></el-table-column>
					<el-table-column label="备注说明" prop="remark"></el-table-column>
					<el-table-column label="操作" width="100" align="center" fixed="right">
						<template slot-scope="scope">
							<el-button size="mini" icon="el-icon-view" @click="viewTmsPerson(scope.row.staffID)">查看</el-button>
						</template>
					</el-table-column>
				</el-table>
				<Page :total="total" :pageIndex="pageIndex" :pageSize="pageSize" @pageChange="pageChange" @pageSizeChange="pageSizeChange"/>
			</div>
		</el-card>
	</div>
</template>
<script type="text/javascript">
import requestJava, { javaUrl } from '../../../../common/requestJava'
import { Message } from 'element-ui'
import Page from '../../../CommonComponents/Page'
const postMap = {
	'Operator': '操作员',
	'Driver': '驾驶员',
	'Supercargo': '押运员',
	'SafetyOfficer': '专职安全员',
	'Stevedore': '装卸管理人员',
	'Other': '其他人员'
}
export default {
	data() {
		return {
			refreshing: false,
			pageIndex: 1,
			pageSize: 10,
			total: 0,
			tableData: [],
			findRangeDate: [],
			createTimeBegin: '',
			createTimeEnd: '',
			findrealName: '',
			findmobile: '',
			findintegrityExamineGrade: '',
			findposition: ''
		}
	},
	computed: {
		postMap: () => postMap
	},
	components: { Page },
	created() {
		this.getList()
	},
	methods: {
		pageChange(index) {
			this.pageIndex = index
			this.getList()
		},
		pageSizeChange(size) {
			this.pageSize = size
			this.getList() 
		},
		reset() {
			this.findrealName = ''
			this.findmobile = ''
			this.findintegrityExamineGrade = ''
			this.findposition = ''
			this.findRangeDate = []
			this.createTimeBegin = ''
			this.createTimeEnd = ''
			this.pageIndex = 1
			this.pageSize = 10
			this.getList()
		},
		getList() {
			let params = {
				current: this.pageIndex,
				size: this.pageSize,
				realName: this.findrealName,
				mobile: this.findmobile,
				integrityExamineGrade: this.findintegrityExamineGrade,
				position: this.findposition,
				createTimeBegin: this.createTimeBegin,
				createTimeEnd: this.createTimeEnd
			}
			requestJava({
				url: '/staff/findList',
				method: 'get',
				params
			}).then(res => {
				if (res.data.code == 200) {
					this.total = res.data.data.total
					this.tableData = res.data.data.list
				} else {
					Message.error(res.data.message)
				}
			})
		},
		selectDateRange(date) {
			this.createTimeBegin = new Date(date[0]).getTime()
			this.createTimeEnd = new Date(date[1]).getTime()
		},
		viewTmsPerson(staffID) {
			this.$router.push({ name: 'viewtmsperson', query: {staffID} })
		}
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
.table-img
	width 30px
	cursor pointer
</style>
