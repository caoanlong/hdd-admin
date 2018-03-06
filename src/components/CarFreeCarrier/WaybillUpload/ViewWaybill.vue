<template>
	<div class="main-content">
		<el-card class="box-card">
			<div slot="header" class="clearfix">查看运单</div>
			<div class="el-grop-tit clearfix">
					<p>基本信息</p>
				</div>
			<el-row>
				<el-col :span="8">
					<el-form label-width="160px">
						<el-form-item label="报文参考号：">
							<el-input auto-complete="off"></el-input>
						</el-form-item>
						<el-form-item label="发送方代码：">
							<el-input auto-complete="off"></el-input>
						</el-form-item>
						<el-form-item label="报文功能代码：">
							<el-input auto-complete="off"></el-input>
						</el-form-item>
					</el-form>
				</el-col>
				<el-col :span="8">
					<el-form label-width="160px">
						<el-form-item label="单证名称：">
							<el-input auto-complete="off"></el-input>
						</el-form-item>
						<el-form-item label="接收方代码：">
							<el-input auto-complete="off"></el-input>
						</el-form-item>
					</el-form>
				</el-col>
				<el-col :span="8">
					<el-form label-width="160px">
						<el-form-item label="报文版本号：">
							<el-input auto-complete="off"></el-input>
						</el-form-item>
						<el-form-item label="发送时间：">
							<el-date-picker v-model="SendDate" type="date" placeholder="选择发送时间" style="width:100%">
							</el-date-picker>
						</el-form-item>
					</el-form>
				</el-col>
			</el-row>
			<div class="el-grop-tit clearfix">
				<p>运输信息</p>
			</div>
			<el-row>
				<el-col :span="8">
					<el-form label-width="160px">
						<el-form-item label="原始单号：">
							<el-input auto-complete="off"></el-input>
						</el-form-item>
						<el-form-item label="货物类型分类代码：">
							<el-input auto-complete="off"></el-input>
						</el-form-item>
						<el-form-item label="总件数：">
							<el-input auto-complete="off"></el-input>
						</el-form-item>
					</el-form>
				</el-col>
				<el-col :span="8">
					<el-form label-width="160px">
						<el-form-item label="托运单号：">
							<el-input auto-complete="off"></el-input>
						</el-form-item>
						<el-form-item label="货物项毛重：">
							<el-input auto-complete="off"></el-input>
						</el-form-item>
						<el-form-item label="运输方式代码：">
							<el-input auto-complete="off"></el-input>
						</el-form-item>
					</el-form>
				</el-col>
				<el-col :span="8">
					<el-form label-width="160px">
						<el-form-item label="货物名称：">
							<el-input auto-complete="off"></el-input>
						</el-form-item>
						<el-form-item label="体积：">
							<el-input auto-complete="off"></el-input>
						</el-form-item>
						<el-form-item label="货币总金额：">
							<el-input auto-complete="off"></el-input>
						</el-form-item>
					</el-form>
				</el-col>
				<el-col :span="24">
					<el-form label-width="160px">
						<el-form-item label="价格备注：">
							<el-input auto-complete="off"></el-input>
						</el-form-item>
					</el-form>
				</el-col>
			</el-row>
			<div class="el-grop-tit clearfix">
				<p>承运方信息</p>
			</div>
			<el-row>
				<el-col :span="8">
					<el-form label-width="160px">
						<el-form-item label="承运人：">
							<el-input auto-complete="off"></el-input>
						</el-form-item>
						<el-form-item label="牌照类型代码：">
							<el-input auto-complete="off"></el-input>
						</el-form-item>
						<el-form-item label="车辆载质量：">
							<el-input auto-complete="off"></el-input>
						</el-form-item>
						<el-form-item label="所有人：">
							<el-input auto-complete="off"></el-input>
						</el-form-item>
						<el-form-item label="电话号码：">
							<el-input auto-complete="off"></el-input>
						</el-form-item>
						<el-form-item label="发运实际时间：">
							<el-date-picker v-model="SendDate" type="date" placeholder="选择发运实际时间" style="width:100%">
							</el-date-picker>
						</el-form-item>
					</el-form>
				</el-col>
				<el-col :span="8">
					<el-form label-width="160px">
						<el-form-item label="统一社会信用代码：">
							<el-input auto-complete="off"></el-input>
						</el-form-item>
						<el-form-item label="车辆牌照号：">
							<el-input auto-complete="off"></el-input>
						</el-form-item>
						<el-form-item label="道路运输证号：">
							<el-input auto-complete="off"></el-input>
						</el-form-item>
						<el-form-item label="姓名：">
							<el-input auto-complete="off"></el-input>
						</el-form-item>
						<el-form-item label="托运时间：">
							<el-date-picker v-model="SendDate" type="date" placeholder="选择托期时间" style="width:100%">
							</el-date-picker>
						</el-form-item>
						<el-form-item label="收货时间：">
							<el-date-picker v-model="SendDate" type="date" placeholder="选择收货时间" style="width:100%">
							</el-date-picker>
						</el-form-item>
					</el-form>
				</el-col>
				<el-col :span="8">
					<el-form label-width="160px">
						<el-form-item label="许可证编号：">
							<el-input auto-complete="off"></el-input>
						</el-form-item>
						<el-form-item label="车辆分类代码：">
							<el-input auto-complete="off"></el-input>
						</el-form-item>
						<el-form-item label="挂车牌照号：">
							<el-input auto-complete="off"></el-input>
						</el-form-item>
						<el-form-item label="从业资格证号：">
							<el-input auto-complete="off"></el-input>
						</el-form-item>
						<el-form-item label="业务类型代码：">
							<el-input auto-complete="off"></el-input>
						</el-form-item>
					</el-form>
				</el-col>
			</el-row>
			<div class="el-grop-tit clearfix">
				<p>发货方信息</p>
			</div>
			<el-row>
				<el-col :span="12">
					<el-form label-width="160px">
						<el-form-item label="发货人：">
							<el-input auto-complete="off"></el-input>
						</el-form-item>
					</el-form>
				</el-col>
				<el-col :span="12">
					<el-form label-width="160px">
						<el-form-item label="个人证件号：">
							<el-input auto-complete="off"></el-input>
						</el-form-item>
					</el-form>
				</el-col>
				<el-col :span="12">
					<el-form label-width="160px">
						<el-form-item label="国家行政区划名称：">
							<el-input auto-complete="off"></el-input>
						</el-form-item>
					</el-form>
				</el-col>
				<el-col :span="12">
					<el-form label-width="160px">
						<el-form-item label="国家行政区划代码：">
							<el-input auto-complete="off"></el-input>
						</el-form-item>
					</el-form>
				</el-col>
				<el-col :span="24">
					<el-form label-width="160px">
						<el-form-item label="装货地点：">
							<el-input auto-complete="off"></el-input>
						</el-form-item>
					</el-form>
				</el-col>
				<el-col :span="24">
					<el-form label-width="160px">
						<el-form-item label="其它备注：">
							<el-input auto-complete="off"></el-input>
						</el-form-item>
					</el-form>
				</el-col>
			</el-row>
			<div class="el-grop-tit clearfix">
				<p>收货方信息</p>
			</div>
			<el-row>
				<el-col :span="8">
					<el-form label-width="160px">
						<el-form-item label="收货人">
							<el-input auto-complete="off"></el-input>
						</el-form-item>
					</el-form>
				</el-col>
				<el-col :span="8">
					<el-form label-width="160px">
						<el-form-item label="国家行政区划名称：">
							<el-input auto-complete="off"></el-input>
						</el-form-item>
					</el-form>
				</el-col>
				<el-col :span="8">
					<el-form label-width="160px">
						<el-form-item label="国家行政区划代码：">
							<el-input auto-complete="off"></el-input>
						</el-form-item>
					</el-form>
				</el-col>
				<el-col :span="24">
					<el-form label-width="160px">
						<el-form-item label="收货地点：">
							<el-input auto-complete="off"></el-input>
						</el-form-item>
					</el-form>
				</el-col>
				<el-col :span="24">
					<el-form label-width="160px">
						<el-form-item label="其它备注：">
							<el-input auto-complete="off"></el-input>
						</el-form-item>
					</el-form>
				</el-col>
			</el-row>
			<div class="card-footer">
				<el-row>
					<el-col :span="24">
						<el-form label-width="160px">
							<el-form-item>
								<el-button @click="back">返回</el-button>
							</el-form-item>
						</el-form>
					</el-col>
				</el-row>
			</div>
		</el-card>
	</div>
</template>
<script type="text/javascript">
export default {
	data() {
		return {
			options: [{
					"value": "H01",
					"label": "普通货车"
				},
				{
					"value": "H02",
					"label": "厢式货车"
				},
				{
					"value": "H04",
					"label": "罐式货车"
				},
				{
					"value": "Q00",
					"label": "牵引车"
				},
				{
					"value": "G01",
					"label": "普通挂车"
				},
				{
					"value": "G03",
					"label": "罐式挂车"
				},
				{
					"value": "G05",
					"label": "集装箱挂车"
				},
				{
					"value": "H09",
					"label": "仓栅式货车"
				},
				{
					"value": "H03",
					"label": "封闭货车"
				},
				{
					"value": "H05",
					"label": "平板货车"
				},
				{
					"value": "H06",
					"label": "集装箱车"
				},
				{
					"value": "H07",
					"label": "自卸货车"
				},
				{
					"value": "H08",
					"label": "特殊结构货车"
				},
				{
					"value": "Z00",
					"label": "专项作业车"
				},
				{
					"value": "G02",
					"label": "厢式挂车"
				},
				{
					"value": "G07",
					"label": "仓栅式挂车"
				},
				{
					"value": "G04",
					"label": "平板挂车"
				},
				{
					"value": "G06",
					"label": "自卸挂车"
				},
				{
					"value": "G09",
					"label": "专项作业挂车"
				},
				{
					"value": "X91",
					"label": "车辆运输车"
				},
				{
					"value": "X92",
					"label": "车辆运输车(单排)"
				}
			],
			options2: [{
				"value": "90",
				"label": "电子产品"
			}, {
				"value": "92",
				"label": "商品汽车"
			}, {
				"value": "93",
				"label": "冷藏货物"
			}, {
				"value": "94",
				"label": "大宗货物"
			}, {
				"value": "95",
				"label": "快速消费品"
			}, {
				"value": "96",
				"label": "农产品"
			}, {
				"value": "999",
				"label": " 其他"
			}],
			SendDate: '',
			TruckType: '',
			CargoType: ''
		}
	},
	computed: {
		type() {
			return this.$route.query.type
		}
	},
	methods: {
		back() {
			this.$router.go(-1)
		}
	}
}

</script>
<style lang="stylus" scoped>
.el-textarea
	textarea
		resize none
		min-height 99px!important
.el-grop-tit
	margin 0 -20px 20px
	padding 10px 20px
	border-top 1px solid #ebeef5
	border-bottom 1px solid #ebeef5
	background #f8f8f8
	color #42b983
	p
		margin 0
		font-size 14px
		border-left 3px solid #42b983
		padding-left 5px
	&:first-child
		margin-top -21px
.card-footer
	padding 20px
	border-top 1px solid #ebeef5
	margin 0 -20px -20px
	.el-form-item
		margin-bottom 0
</style>
