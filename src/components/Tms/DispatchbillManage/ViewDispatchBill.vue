<template>
	<div class="main-content">
		<el-card class="box-card">
			<div slot="header" class="header clearfix">
				调度单编号：{{dispatchBill.dispatchOrderNo}}
				<span>创建时间：<span v-if="dispatchBill.createTime">{{dispatchBill.createTime | getdatefromtimestamp()}}</span><span v-else></span></span>
				<span class="status status1" v-if="dispatchBill.status == 'Committed'">待执行</span>
				<span class="status status2" v-else-if="dispatchBill.status == 'Loaded'">已装运</span>
				<span class="status status3" v-else-if="dispatchBill.status == 'Signed'">已签收</span>
				<span class="status status3" v-else-if="dispatchBill.status == 'Canceled'">作废</span>
			</div>
			<table class="wf-table" v-for="(item, index) in dispatchBill.transceiveInfos" :key="index">
				<caption>收发货信息{{index+1}}</caption>
				<tr>
					<td><span class="justify">发货人</span>{{item.shipperName}}</td>
					<td><span class="justify">收货人</span>{{item.consigneeName}}</td>
				</tr>
				<tr>
					<td><span class="justify">联系方式</span>{{item.shipperPhone}}</td>
					<td><span class="justify">联系方式</span>{{item.consigneePhone}}</td>
				</tr>
				<tr>
					<td><span class="justify">发货地</span>{{item.shipperArea + item.shipperDetailAddress}}</td>
					<td><span class="justify">收货地</span>{{item.consigneeArea + item.consigneeDetailAddress}}</td>
				</tr>
				<tr>
					<td>
						<span class="justify">发货时间</span>
						<span v-if="item.shipperDate">{{item.shipperDate | getdatefromtimestamp()}}</span>
						<span v-else></span>
					</td>
					<td>
						<span class="justify">到货时间</span>
						<span v-if="item.consigneeDate">{{item.consigneeDate | getdatefromtimestamp()}}</span>
						<span v-else></span>
					</td>
				</tr>
			</table>
			<table class="wf-table">
				<caption>货物信息</caption>
				<tr>
					<td colspan="6">
						<span class="labels">实际发货时间：</span>
						<span v-if="dispatchBill.loadDate">{{dispatchBill.loadDate | getdatefromtimestamp(true)}}</span>
						<span v-else></span>
						<span class="labels" style="margin-left:40px">实际到货时间：</span>
						<span v-if="dispatchBill.signTime">{{dispatchBill.signTime | getdatefromtimestamp(true)}}</span>
						<span v-else></span>
					</td>
				</tr>
				<tr>
					<th width="60">序号</th>
					<th width="120">承运单编号</th>
					<th>货物规格/名称</th>
					<th>配载量</th>
					<th>运载量</th>
					<th>签收量</th>
				</tr>
				<tr class="is-center" v-for="(item, index) in dispatchBill.cargoInfos">
					<td>{{index+1}}</td>
					<td>{{item.carrierOrderNo}}</td>
					<td>{{item.cargoType}}/{{item.cargoName}}</td>
					<td>{{item.cargoWeight + '吨'}}/{{item.cargoVolume + '方'}}/{{item.cargoNum + '件'}}</td>
					<td>
						{{(item.loadWeight ? item.loadWeight : 0) + '吨'}}
						/{{(item.loadVolume ? item.loadVolume : 0) + '方'}}
						/{{(item.loadNum ? item.loadNum : 0) + '件'}}
					</td>
					<td>
						{{(item.signWeight ? item.signWeight : 0) + '吨'}}
						/{{(item.signVolume ? item.signVolume : 0) + '方'}}
						/{{(item.signNum ? item.signNum : 0) + '件'}}
					</td>
				</tr>
				<tr>
					<td colspan="6">
						<span class="labels">司机：</span>{{dispatchBill.driverName}} {{dispatchBill.driverMobile}}
						<span class="labels" style="margin-left:40px">载具：</span>
						{{dispatchBill.plateNo}} {{dispatchBill.length?'dispatchBill.length/1000':''}}{{dispatchBill.length?'米':''}}{{dispatchBill.truckType}} {{dispatchBill.loads?'dispatchBill.loads/1000':''}}{{dispatchBill.loads?'吨':''}}{{dispatchBill.loadVolume?dispatchBill.loadVolume:''}}{{dispatchBill.loadVolume?'方':''}}
						<span class="labels" style="margin-left:40px">随车人员：</span>{{dispatchBill.superCargoName}} {{dispatchBill.superCargoMobile}}
					</td>
				</tr>
			</table>
			<table class="wf-table">
				<caption>付款信息</caption>
				<tr>
					<th></th>
					<th>现付</th>
					<th>到付</th>
					<th>回单付</th>
					<th>月结</th>
					<th>收方到货付</th>
					<th>绕路里程</th>
					<th>绕路费用</th>
					<th>其他费用</th>
				</tr>
				<tr class="is-center">
					<td>司机</td>
					<td>{{dispatchBill.driverCashAmount}}</td>
					<td>{{dispatchBill.driverCodAmount}}</td>
					<td>{{dispatchBill.driverPorAmount}}</td>
					<td>{{dispatchBill.driverMonthlyAmont}}</td>
					<td>{{dispatchBill.driverCosigneeAmount}}</td>
					<td>{{dispatchBill.driverDetoursMileage}}</td>
					<td>{{dispatchBill.driverDetoursAmount}}</td>
					<td>{{dispatchBill.driverOtherAmount}}</td>
				</tr>
				<tr class="is-center">
					<td>随车人员</td>
					<td>{{dispatchBill.superCargoCashAmount}}</td>
					<td>{{dispatchBill.superCargoCodAmount}}</td>
					<td>{{dispatchBill.superCargoCorAmount}}</td>
					<td>{{dispatchBill.superCargoMonthlyAmount}}</td>
					<td>{{dispatchBill.superCosigneeAmount}}</td>
					<td>{{dispatchBill.superCargoDetoursMileage}}</td>
					<td>{{dispatchBill.superCargoDetoursAmount}}</td>
					<td>{{dispatchBill.superCargoOtherAmount}}</td>
				</tr>
				<tr class="is-center">
					<td colspan="9" class="txt-r">合计：{{ Number(dispatchBill.driverCashAmount) + Number(dispatchBill.superCargoCashAmount) + Number(dispatchBill.driverCodAmount)+ Number(dispatchBill.superCargoCodAmount) + Number(dispatchBill.driverPorAmount) + Number(dispatchBill.superCargoCorAmount) + Number(dispatchBill.driverMonthlyAmont) + Number(dispatchBill.superCargoMonthlyAmount) + Number(dispatchBill.driverCosigneeAmount) + Number(dispatchBill.superCosigneeAmount) + Number(dispatchBill.driverDetoursAmount) + Number(dispatchBill.superCargoDetoursAmount) + Number(dispatchBill.driverOtherAmount) + Number(dispatchBill.superCargoOtherAmount) }}</td>
				</tr>
			</table>
			<div class="wf-footer clearfix is-center">
				<el-button type="default" @click="back">返回</el-button>
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
			isModifyVisible: false,
			isLoadVisible: false,
			isConfirmVisible: false,
			dispatchBill: {},
			payMethods: {
				driverCashAmount: '', // 司机现付金额
				driverCodAmount: '', // 司机到付金额
				driverPorAmount: '', // 司机回单金额
				driverMonthlyAmont: '', // 司机月结金额
				driverCosigneeAmount: '', // 司机收货方到付金额
				superCargoCashAmount: '', // 押运人现付金额
				superCargoCodAmount: '', // 押运人到付金额
				superCargoCorAmount: '', // 押运人回单金额
				superCargoMonthlyAmount: '', // 押运人月结金额
				superCosigneeAmount: '', // 押运人收货方到付金额
			},
		}
	},
	created() {
		this.getInfo()
	},
	methods: {
		getInfo(){
			let params = {
				dispatchOrderID: this.$route.query.dispatchOrderID,
			}
			requestJava({
				url: '/admin/bizDispatchOrder/detail',
				params
			}).then(res => {
				this.dispatchBill = res.data.data
				this.payMethods = {
					driverCashAmount: this.dispatchBill.driverCashAmount, // 司机现付金额
					driverCodAmount: this.dispatchBill.driverCodAmount, // 司机到付金额
					driverPorAmount: this.dispatchBill.driverPorAmount, // 司机回单金额
					driverMonthlyAmont: this.dispatchBill.driverMonthlyAmont, // 司机月结金额
					driverCosigneeAmount: this.dispatchBill.driverCosigneeAmount, // 司机收货方到付金额
					driverDetoursMileage: this.dispatchBill.driverDetoursMileage, // 司机收货方到付金额
					driverDetoursAmount: this.dispatchBill.driverDetoursAmount, // 司机收货方到付金额
					driverOtherAmount: this.dispatchBill.driverOtherAmount, // 司机收货方到付金额
					superCargoCashAmount: this.dispatchBill.superCargoCashAmount, // 押运人现付金额
					superCargoCodAmount: this.dispatchBill.superCargoCodAmount, // 押运人到付金额
					superCargoCorAmount: this.dispatchBill.superCargoCorAmount, // 押运人回单金额
					superCargoMonthlyAmount: this.dispatchBill.superCargoMonthlyAmount, // 押运人月结金额
					superCosigneeAmount: this.dispatchBill.superCosigneeAmount, // 押运人收货方到付金额
					superCargoDetoursMileage: this.dispatchBill.superCargoDetoursMileage, // 押运人收货方到付金额
					superCargoDetoursAmount: this.dispatchBill.superCargoDetoursAmount, // 押运人收货方到付金额
					superCargoOtherAmount: this.dispatchBill.superCargoOtherAmount // 押运人收货方到付金额
				}
			})
		},
		back() {
			this.$router.go(-1)
		}
	},
	components: {

	}
}

</script>
<style lang="stylus" scoped>
.main-content
	background #ebebeb
	padding-top 20px
	.header
		span
			font-size 12px
			margin-left 40px
			&.status
				position absolute
				margin-right 0
				right 20px
				top 15px
				height 24px
				line-height 24px
				color #fff
				padding 0 15px
				font-size 12px
				-moz-border-radius 4px
				     border-radius 4px
			&.status1
				background #F56C6C
			&.status2
				background #409EFF
			&.status3
				background #909399
	.wf-table
		.justify
			width 80px
			height 24px
			display inline-block
			vertical-align top
			padding-right 20px
			color #3582d0
			text-align justify
			&:after
				content '：'
				position relative
				top -24px
				padding-left 100%
				display inline-block
	.txt-r
		text-align right
</style>
