<template>
	<div class="main-content">
		<el-card class="box-card">
			<div slot="header" class="clearfix">
				<span>商户申请列表</span>
			</div>
			<div class="search">
				<el-form :inline="true" class="form-inline" size="small">
					<el-form-item label="关键字">
						<el-input placeholder="关键字" v-model="findKeyWords"></el-input>
					</el-form-item>
					<el-form-item label="状态">
						<el-select placeholder="请选择" v-model="findAuditStatus">
							<el-option label="草稿" value="Draft"></el-option>
							<el-option label="已提交" value="Commited"></el-option>
							<el-option label="成功" value="Success"></el-option>
							<el-option label="失败" value="Failed"></el-option>
							<el-option label="已拒绝" value="Rejected"></el-option>
							<el-option label="三方审核中" value="Auditing"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item>
						<el-button type="primary" @click="getList()">查询</el-button>
						<el-button type="default" @click="reset">重置</el-button>
					</el-form-item>
				</el-form>
			</div>
			<div class="table">
				<el-table :data="tableData" border style="width: 100%" size="mini">
					<el-table-column label="企业名称" prop="companyName"></el-table-column>
					<el-table-column label="手机号" prop="mobile"></el-table-column>
					<el-table-column label="信用代码" prop="socialCreditCode"></el-table-column>
					<el-table-column label="法人姓名" prop="realName" width="80"></el-table-column>
					<el-table-column label="身份证号" prop="idCardNum"></el-table-column>
					<el-table-column label="开户银行户名" prop="bandkCustName" width="100"></el-table-column>
                    <el-table-column label="审批人" prop="auditByName"></el-table-column>
					<el-table-column label="审批状态" prop="auditStatus" width="100">
						<template slot-scope="scope">
							<span v-if="scope.row.auditStatus == auditStatus.VALUE" v-for="auditStatus in auditStatusList" :key="auditStatus.Dict_ID">{{auditStatus.NAME}}</span>
						</template>
					</el-table-column>
					<el-table-column label="审批时间" align="center" width="140">
						<template slot-scope="scope">
							<span v-if="scope.row.auditTime">{{scope.row.auditTime | getdatefromtimestamp()}}</span>
						</template>
					</el-table-column>
                    <el-table-column label="审核失败原因" prop="auditFailedReason" width="120"></el-table-column>
                    <el-table-column label="创建时间" width="140">
						<template slot-scope="scope">
							<span v-if="scope.row.createTime">{{scope.row.createTime | getdatefromtimestamp()}}</span>
						</template>
					</el-table-column>
					<el-table-column label="操作" fixed="right">
                        <template slot-scope="scope">
							<el-button size="mini" icon="el-icon-view" @click="viewWithDraw(scope.row.businessApplyID)">查看</el-button>
						</template>
					</el-table-column>
				</el-table>
				<Page :total="count" :pageIndex="pageIndex" :pageSize="pageSize" @pageChange="pageChange" @pageSizeChange="pageSizeChange"/>
			</div>
		</el-card>
	</div>
</template>
<script type="text/javascript">
import request from '../../../common/request'
import requestJava from '../../../common/requestJava'
import { Message } from 'element-ui'
import Page from '../../CommonComponents/Page'
export default {
	data() {
		return {
			pageIndex: 1,
			pageSize: 10,
			count: 0,
			tableData: [],
			auditStatusList: [],
			findKeyWords:'',
			findAuditStatus:''
		}
	},
	components: { Page },
	created() {
		this.getAuditStatus()
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
			this.findKeyWords = ''
			this.findAuditStatus = ''
			this.pageIndex = 1
			this.pageSize = 10
			this.getList()
        },
		getList() {
			let params = {
				pageNum: this.pageIndex,
				pageSize: this.pageSize,
				realName: this.findKeyWords,
				auditStatus: this.findAuditStatus
			}
			requestJava({
				url: '/payBusinessApply/list',
				method: 'get',
				params
			}).then(res => {
				if (res.data.code == 200) {
					this.count = res.data.data.total
					this.tableData = res.data.data.list
				} else {
					Message.error(res.data.msg)
				}
			})
		},
		getAuditStatus() {
			let params = {
				TYPE: 'payRealNameApply_auditStatus'
			}
			request({
				url: '/sys_dict/list/type',
				method: 'get',
				params
			}).then(res => {
				this.auditStatusList = res.data.data
				this.getList()
			})
		},
		viewWithDraw(businessApplyID) {
			this.$router.push({ 
				name: 'viewmerchantcertify',
				query: { businessApplyID } 
			})
		},
		approve(command) {
			let data = {
				businessApplyID: command.businessApplyID,
				flag: command.type
			}
			requestJava({
				url: '/customerservice/payRealNameApply/approve',
				method: 'post',
				data
			}).then(res => {
				if (res.data.code == 200) {
					Message.success(res.data.message)
				} else {
					Message.error(res.data.message)
				}
			})
		}
	}
}

</script>
<style lang="stylus" scoped>

</style>
