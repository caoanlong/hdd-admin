<template>
	<div class="main-content">
		<el-card class="box-card">
			<div slot="header" class="clearfix">
				<span>查看运费模板</span>
			</div>
			<el-form label-width="100px">
				<el-row>
					<div class="split-item">
						<span class="num">1</span>
						<span class="tit">配置运算项</span>
					</div>
				</el-row>
				<el-row>
					<el-col :span="24">
						<el-form-item label="托运人">
							<p>{{templateFreight.consignorName}}</p>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="24">
						<p class="divided"><svg-icon icon-class="list-tag"></svg-icon>从哪</p>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="24">
						<el-form-item label="发货单位">
							<p>{{templateFreight.shipperCompanyName}}</p>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="发货地">
							<p>{{templateFreight.shipperArea}}</p>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="详细地址">
							<p>{{templateFreight.shipperDetailAddress}}</p>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="24">
						<p class="divided"><svg-icon icon-class="list-tag"></svg-icon>到哪</p>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="8">
						<el-form-item label="收货单位">
							<p>{{templateFreight.consigneeCompanyName}}</p>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="收货地">
							<p>{{templateFreight.consigneeArea}}</p>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="详细地址">
							<p>{{templateFreight.consigneeDetailAddress}}</p>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="24">
						<p class="divided"><svg-icon icon-class="list-tag"></svg-icon>对内</p>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="8">
						<el-form-item label="对内运距">
							<p>{{templateFreight.mileage}}</p>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="对内TKM">
							<p>{{templateFreight.internalUnitPrice}}</p>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="对内运费">
							<p>{{templateFreight.internalPrice}}</p>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="24">
						<p class="divided"><svg-icon icon-class="list-tag"></svg-icon>对外</p>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="8">
						<el-form-item label="对外运距">
							<p>{{templateFreight.externalMileage}}</p>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="对外TKM">
							<p>{{templateFreight.externalUnitPrice}}</p>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="对外运费">
							<p>{{templateFreight.externalPrice}}</p>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<div class="split-item">
						<span class="num">2</span>
						<span class="tit">配置收费方式</span>
					</div>
				</el-row>
				<el-row>
					<el-col :span="24">
						<p class="divided"><svg-icon icon-class="list-tag"></svg-icon>对内付款方式占比</p>
					</el-col>
					<el-col :span="24" style="display:flex">
						<el-form-item label="现付" style="flex: 1">
							<p>{{(templateFreight.internalCashRate)*100}}%</p>
						</el-form-item>
						<el-form-item label="到付" style="flex: 1">
							<p>{{(templateFreight.internalCodRate)*100}}%</p>
						</el-form-item>
						<el-form-item label="回单付" style="flex: 1">
							<p>{{(templateFreight.internalPorRate)*100}}%</p>
						</el-form-item>
						<el-form-item label="月结" style="flex: 1">
							<p>{{(templateFreight.internalAbschlussRate)*100}}%</p>
						</el-form-item>
						<el-form-item label="收方到货付" style="flex: 1">
							<p>{{(templateFreight.internalConsigneeCodRate)*100}}%</p>
						</el-form-item>
					</el-col>
					<el-col :span="24">
						<p class="divided"><svg-icon icon-class="list-tag"></svg-icon>对外收款方式占比</p>
					</el-col>
					<el-col :span="24" style="display: flex">
						<el-form-item label="现付" style="flex: 1">
							<p>{{(templateFreight.externalCashRate)*100}}%</p>
						</el-form-item>
						<el-form-item label="到付" style="flex: 1">
							<p>{{(templateFreight.externalCodRate)*100}}%</p>
						</el-form-item>
						<el-form-item label="回单付" style="flex: 1">
							<p>{{(templateFreight.externalPorRate)*100}}%</p>
						</el-form-item>
						<el-form-item label="月结" style="flex: 1">
							<p>{{(templateFreight.externalAbschlussRate)*100}}%</p>
						</el-form-item>
						<el-form-item label="收方到货付" style="flex: 1">
							<p>{{(templateFreight.externalConsigneeCodRate)*100}}%</p>
						</el-form-item>
					</el-col>
				</el-row>		
				<el-row type="flex" class="row-bg" justify="space-around">
					<el-col :span="24">
						<el-form-item>
							<el-button @click="back">返回</el-button>
						</el-form-item>
					</el-col>
				</el-row>
			</el-form>
		</el-card>
	</div>
</template>

<script type="text/javascript">
import requestJava, { javaUrl } from '../../../../common/requestJava'
import { Message } from 'element-ui'
export default {
	data() {
		return {
			templateFreight: {}
		}
	},
	created() {
		this.getInfo()
	},
	methods: {
		getInfo() {
			let params = {
				transporPriceID: this.$route.query.transporPriceID
			}
			requestJava({
				url: '/transportPrice/findById',
				params
			}).then(res => {
				this.templateFreight = res.data.data
			})
		},
		back() {
			this.$router.go(-1)
		}
	}
}

</script>
<style lang="stylus" scoped>
.divided
	padding 10px 15px 5px 30px
	margin-top 0
	color #C0C4CC
	border-bottom 1px solid #f2f2f2
	font-size 14px
	.svg-icon
		margin-right 5px
		color #909399
.el-form-item__content
	p
		margin 0
		border 1px solid #fff
		border-bottom-color #dcdfe6
		padding 0 15px
		min-height 40px
		font-family 'sans-serif'
		line-height 40px
		color #999
		font-size 14px
.split-item
	padding 5px 0 20px 10px 
	color #bfcbd9
	.num
		display inline-block
		width 20px
		height 20px
		color #fff
		background-color #bfcbd9
		text-align center
		line-height 20px
	.tit
		padding-left 5px
</style>