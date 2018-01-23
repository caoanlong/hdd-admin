<template>
	<div class="main-content">
		<el-card class="box-card">
			<div slot="header" class="clearfix">
				<span>内容列表</span>
			</div>
			<div class="tableControl">
				<el-button type="default" size="mini" icon="el-icon-plus">添加</el-button>
				<el-button type="default" size="mini" icon="el-icon-delete">批量删除</el-button>
				<el-button type="default" size="mini" icon="el-icon-refresh">刷新</el-button>
			</div>
			<div class="table">
				<el-table :data="tableData" border style="width: 100%" size="mini">
					<el-table-column type="selection" align="center">
					</el-table-column>
					<el-table-column label="所属栏目" prop="type">
					</el-table-column>
					<el-table-column label="代码" prop="code">
					</el-table-column>
					<el-table-column label="名称" prop="name">
					</el-table-column>
					<el-table-column label="标题" prop="title">
					</el-table-column>
					<el-table-column label="描述" prop="des">
					</el-table-column>
					<el-table-column label="排序" align="center" prop="sort">
					</el-table-column>
					<el-table-column label="操作" width="170" align="center">
						<template slot-scope="scope">
							<el-button-group>
								<el-button type="primary" size="mini" icon="el-icon-edit" title>修改</el-button>
								<el-button type="danger" size="mini" icon="el-icon-delete">删除</el-button>
							</el-button-group>
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
export default {
	data() {
      	return {
	        tableData: [
				{
					type:'协议',
					code:'Agreement',
					name:'用户注册协议',
					title:'用户注册协议',
					des:'',
					sort:'1'
				},{
					type:'协议',
					code:'InformationFees',
					name:'信息费代收代付协议',
					title:'信息费代收代付协议',
					des:'',
					sort:'2'
				},
				{
					type:'协议',
					code:'Statement',
					name:'货多多运输协议',
					title:'货多多运输协议',
					des:'',
					sort:'3'
				},{
					type:'常见问题',
					code:'Balance',
					name:'什么是余额',
					title:'什么是余额',
					des:'',
					sort:'4'
				},
				{
					type:'常见问题',
					code:'RechargeLimit',
					name:'充值限额',
					title:'充值限额',
					des:'',
					sort:'5'
				},
				{
					type:'常见问题',
					code:'BankCard',
					name:'添加银行卡',
					title:'添加银行卡',
					des:'',
					sort:'6'
				},
				{
					type:'常见问题',
					code:'Withdrawals',
					name:'提现规则',
					title:'提现规则',
					des:'',
					sort:'7'
				},
				{
					type:'常见问题',
					code:'CashLimit',
					name:'提现限额',
					title:'提现限额',
					des:'',
					sort:'8'
				},{
					type:'常见问题',
					code:'ServiceCharge',
					name:'提现手续费',
					title:'提现手续费',
					des:'',
					sort:'9'
				},
				{
					type:'常见问题',
					code:'PaymentDate',
					name:'提现到账时间',
					title:'提现到账时间',
					des:'',
					sort:'10'
				}
				
	        ]
		}
    }
}
</script>
<style lang="stylus">
	
</style>