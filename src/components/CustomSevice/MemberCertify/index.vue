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
						<el-select placeholder="请选择" value=''>
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
				<el-table :data="tableData" border style="width: 100%" size="mini">
					<el-table-column label="会员类型" prop="memberType" width="100"></el-table-column>
					<el-table-column label="姓名" prop="name" width="90"></el-table-column>
					<el-table-column label="手机号" align="center" prop="mobilePhone" width="100"></el-table-column>
					<el-table-column label="车牌/企业名" prop="accountTitle"></el-table-column>
					<el-table-column label="注册时间" align="center" prop="regDate" width="140"></el-table-column>
					<el-table-column label="状态" align="center" prop="status" width="80"></el-table-column>
					<el-table-column label="认证人" align="center" prop="handler" width="100"></el-table-column>
					<el-table-column label="认证状态" width="80"></el-table-column>
					<el-table-column label="钱包状态" align="center" prop="status" width="80"></el-table-column>
					<el-table-column label="实名状态" align="center" prop="status" width="80"></el-table-column>
					<el-table-column label="账号类型" align="center" prop="status" width="80"></el-table-column>
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
				<div class="pagination">
					<el-pagination background layout="prev, pager, next" :total="1000"></el-pagination>
				</div>
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
			tableData: [{
				memberType: '物流企业',
				name: '曹阿龙',
				accountTitle: '深圳市曹阿龙老司机有限公司',
				mobilePhone: '13049497395',
				regDate: '2017-10-10 21:05:07',
				lastvisitDate: '2018-01-23 11:23:15',
				creatDate: '2017-10-11 09:15:27',
				handler: 'admin',
				status: '启用',
				certificateStatus: '',
				address: '上海市普陀区金沙江路 1518 弄'
			}],
			memberTypes: [],
			certifyStatus: []
		}
	},
	created() {
		this.getMemberTypes()
		this.getCertifyStatus()
	},
	methods: {
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
		viewPersionCertify() {
			this.$router.push({name: 'viewpersioncertify'})
		},
		viewCompanyCertify() {
			this.$router.push({name: 'viewcompanycertify'})
		},
	}
}
</script>
<style lang="stylus" scoped>
.table
	p
		margin 0
		padding 0
</style>
