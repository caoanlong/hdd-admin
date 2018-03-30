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
						</el-select>
					</el-form-item>
					<el-form-item>
						<el-button type="primary" @click.native="getList(1)">查询</el-button>
						<el-button type="default" @click.native="reset">重置</el-button>
					</el-form-item>
				</el-form>
			</div>
			<div class="table">
				<el-table :data="tableData" border style="width: 100%" size="mini">
					<el-table-column label="企业名称" prop="companyName"></el-table-column>
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
                    <el-table-column label="审核失败原因" prop="auditFailedReason"></el-table-column>
                    <el-table-column label="是否有效" prop="isValid"></el-table-column>
                    <el-table-column label="创建时间" width="140">
						<template slot-scope="scope">
							<span v-if="scope.row.createTime">{{scope.row.createTime | getdatefromtimestamp()}}</span>
						</template>
					</el-table-column>
					<el-table-column label="操作">
                        <template slot-scope="scope">
							<el-dropdown  @command="handleCommand"  trigger="click">
								<el-button type="default" size="mini">操作<i class="el-icon-arrow-down el-icon--right"></i></el-button>
								<el-dropdown-menu slot="dropdown">
									<el-dropdown-item :command="{
                                        type: 'view', 
                                        businessApplyID: scope.row.businessApplyID}" icon="el-icon-view">查看</el-dropdown-item>
									<el-dropdown-item :command="{
                                        type: '', 
                                        businessApplyID: scope.row.businessApplyID}">审核通过</el-dropdown-item>
									<el-dropdown-item :command="{
                                        type: 'Rejected', 
                                        businessApplyID: scope.row.businessApplyID
                                        }">驳回</el-dropdown-item>
								</el-dropdown-menu>
							</el-dropdown>
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
			pageNum: 1,
			pageSize: 10,
			count: 0,
			tableData: [],
			auditStatusList: [],
			findKeyWords:'',
			findAuditStatus:''
		}
	},
	created() {
		this.getAuditStatus()
	},
	methods: {
		pageChange(index) {
			this.getList(index)
		},
		getList(pageNum) {
			let params = {
				pageNum: pageNum || 1,
				pageSize: this.pageSize,
				// realName: this.findKeyWords,
				// auditStatus: this.findAuditStatus
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
		reset() {
			this.findKeyWords = '',
			this.findAuditStatus = '',
			this.getList()
        },
        handleCommand(command) {
			if(command.type == 'view'){
				this.$router.push({ 
                    name: 'viewmerchantcertify' , 
                    query: { 'businessApplyID': command.businessApplyID } 
                })
			} else {
                this.approve(command)
			}
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
