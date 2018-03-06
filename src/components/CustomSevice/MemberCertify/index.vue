<template>
	<div class="main-content">
		<el-card class="box-card">
			<div slot="header" class="clearfix">
				<span>会员列表</span>
			</div>
			<div class="search">
				<el-form :inline="true" class="form-inline" size="small">
					<el-form-item label="会员类型">
						<el-select placeholder="请选择" v-model="findMemberType">
							<el-option v-for="memberType in memberTypes" :key="memberType.Dict_ID" :label="memberType.NAME" :value="memberType.VALUE"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="关键字">
						<el-input placeholder="请输入..." v-model="findKeywords"></el-input>
					</el-form-item>
					<el-form-item label="状态">
						<el-select placeholder="请选择" v-model="findMemberStatus">
							<el-option label="启用" value="N"></el-option>
							<el-option label="封停" value="Y"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="认证状态">
						<!-- <el-select placeholder="请选择">
							<el-option label="成功" value="Y"></el-option>
							<el-option label="失败" value="N"></el-option>
						</el-select> -->
						<el-select placeholder="请选择">
							<el-option v-for="cerStatus in certifyStatus" :key="cerStatus.Dict_ID" :label="cerStatus.NAME" :value="cerStatus.VALUE"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="钱包状态">
						<el-select placeholder="请选择">
							<el-option label="已激活" value="Y"></el-option>
							<el-option label="未激活" value="N"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="实名状态">
						<el-select placeholder="请选择">
							<el-option v-for="cerStatus in certifyStatus" :key="cerStatus.Dict_ID" :label="cerStatus.NAME" :value="cerStatus.VALUE"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item>
						<el-button type="primary">查询</el-button>
						<el-button type="default">重置</el-button>
					</el-form-item>
				</el-form>
			</div>
			<div class="table">
				<el-table :data="tableData" @selection-change="selectionChange" border style="width: 100%" size="mini">
					<el-table-column label="会员类型" prop="type" width="100">
						<template slot-scope="scope">
							<span v-for="memberType in memberTypes" :key="memberType.Dict_ID" v-if="scope.row.type == memberType.VALUE">{{memberType.NAME}}</span>
						</template>
					</el-table-column>
					<el-table-column label="姓名" prop="realName" width="90"></el-table-column>
					<el-table-column label="手机号" align="center" prop="mobile" width="100"></el-table-column>
					<el-table-column label="车牌/企业名" prop="companyOrPlateNo"></el-table-column>
					<el-table-column label="注册时间" align="center" prop="regDate" width="140">
						<template slot-scope="scope">
							<span>{{scope.row.createTime | getdatefromtimestamp()}}</span>
						</template>
					</el-table-column>
					<el-table-column label="状态" align="center" width="80">
						<template slot-scope="scope">
							<span>{{scope.row.status == 'Y' ? '启用' : '封停'}}</span>
						</template>
					</el-table-column>
					<el-table-column label="认证人" align="center" prop="certifypersonId"></el-table-column>
					<el-table-column label="认证状态" width="140">
						<template slot-scope="scope">
							<span v-for="cerStatus in certifyStatus" :key="cerStatus.Dict_ID" v-if="scope.row.memCertifyPerson.certifyStatus == cerStatus.VALUE">{{cerStatus.NAME}}</span>
							<span v-if="scope.row.memCertifyPerson.certifyStatus && scope.row.memTruckCertify.certifyStatus">/</span>
							<span v-for="cerStatus in certifyStatus" :key="cerStatus.Dict_ID" v-if="scope.row.memTruckCertify.certifyStatus == cerStatus.VALUE">{{cerStatus.NAME}}</span>
						</template>
					</el-table-column>
					<el-table-column label="钱包状态" align="center" width="80">
						<template slot-scope="scope">
							<span>{{scope.row.walletStatus == 'Y' ? '已激活' : '未激活'}}</span>
						</template>
					</el-table-column>
					<el-table-column label="实名状态" align="center" width="80">
						<template slot-scope="scope">
							<span v-for="cerStatus in certifyStatus" :key="cerStatus.Dict_ID" v-if="scope.row.realNameStatus == cerStatus.VALUE">{{cerStatus.NAME}}</span>
						</template>
					</el-table-column>
					<el-table-column label="账号类型" align="center" prop="accountType"></el-table-column>
					<el-table-column label="操作" width="220" align="center">
						<template slot-scope="scope">
							<el-button type="default" size="mini" @click="viewPersionCertify">
								<svg-icon icon-class="file-icon"></svg-icon> 个人
							</el-button>
							<el-button type="default" size="mini" @click="viewCompanyCertify">
								<svg-icon icon-class="file-icon"></svg-icon> 企业
							</el-button>
							<el-button type="default" size="mini" v-if="scope.row.status=='启用'">
								<svg-icon icon-class="stop-icon"></svg-icon> 封停
							</el-button>
							<el-button type="default" size="mini" v-else>
								<svg-icon icon-class="start-icon"></svg-icon> 启用
							</el-button>
						</template>
					</el-table-column>
				</el-table>
				<el-row type="flex">
					<el-col :span="12" style="padding-top: 15px; font-size: 12px; color: #909399">
						<span>总共 {{count}} 条记录每页显示</span>
						<el-select size="mini" style="width: 90px; padding: 0 5px" v-model="pageSize" @change="getList()">
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
import request from '../../../common/request'
import requestJava from '../../../common/requestJava'
import { Message } from 'element-ui'
export default {
	data() {
		return {
			findMemberType: '',
			findKeywords: '',
			findMemberStatus: '',
			pageNum: 1,
			pageSize: 10,
			count: 0,
			tableData: [],
			memberTypes: [],
			certifyStatus: [],
			selectedMembers: []
		}
	},
	created() {
		this.getMemberTypes()
		this.getCertifyStatus()
		this.getList()
	},
	methods: {
		pageChange(index) {
			this.getList(index)
		},
		reset() {
			this.findMemberType = '',
			this.findKeywords = '',
			this.findMemberStatus = '',
			this.getList()
		},
		selectionChange(data) {
			this.selectedMembers = data.map(item => item.memId)
		},
		getMemberTypes() {
			let params = {
				TYPE: 'memberType',
			}
			request({
				url: '/sys_dict/list/type',
				method: 'get',
				params
			}).then(res => {
				if (res.data.code == 0) {
					this.memberTypes = res.data.data
				} else {
					Message.error(res.data.msg)
				}
			})
		},
		getCertifyStatus() {
			let params = {
				TYPE: 'CertifyStatus',
			}
			request({
				url: '/sys_dict/list/type',
				method: 'get',
				params
			}).then(res => {
				if (res.data.code == 0) {
					this.certifyStatus = res.data.data
				} else {
					Message.error(res.data.msg)
				}
			})
		},
		getList(pageNum) {
			let params = {
				pageNum: pageNum || 1,
				pageSize: this.pageSize,
				// businessType: this.findBusinessType
			}
			requestJava({
				url: '/mem/memMember/list',
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
		viewPersionCertify() {
			this.$router.push({name: 'viewpersioncertify'})
		},
		viewCompanyCertify() {
			this.$router.push({name: 'viewcompanycertify'})
		}
	}
}
</script>
<style lang="stylus" scoped>
.table
	p
		margin 0
		padding 0
</style>
