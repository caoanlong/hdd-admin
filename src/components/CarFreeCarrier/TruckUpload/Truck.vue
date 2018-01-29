<template>
	<div class="main-content">
		<el-card class="box-card">
			<div slot="header" class="clearfix">
				<span v-if="type=='add'">添加车源</span>
				<span v-else>查看车源</span>
			</div>
			<el-form label-width="120px">
				<el-row :gutter="20">
					<el-col :span="12">
						<el-form-item label="报文参考号：">
							<el-input auto-complete="off"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="单证名称：">
							<el-input auto-complete="off"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="发送日期时间：">
							<el-date-picker v-model="SendDate" type="date" placeholder="选择日期" style="width:100%">
							</el-date-picker>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="车辆牌照号：">
							<el-input auto-complete="off"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="车辆类型：">
							<el-select v-model="TruckType" placeholder="请选择车辆类型" style="width:100%">
								<el-option v-for="item in options" :key="item.value" :label="item.value+' '+item.label " :value="item.value">
									<span style="float: left">{{ item.value }}</span>
									<span style="float: right; color: #8492a6; font-size: 12px">{{ item.label }}</span></el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="车辆长度：">
							<el-input auto-complete="off"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="核定载质量：">
							<el-input auto-complete="off"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="出发地：">
							<el-input auto-complete="off"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="目的地：">
							<el-input auto-complete="off"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="状态：">
							<el-input auto-complete="off"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="24">
						<el-form-item label="错误描述：">
							<el-input type="textarea" style="resize:none"></el-input>
						</el-form-item>
					</el-col>

					
					<el-col :span="24">
						<el-form-item v-if="type=='add'||type=='addsub'">
							<el-button>重置</el-button>
							<el-button type="primary">保存</el-button>
						</el-form-item>
						<el-form-item v-else-if="type=='edit'">
							<el-button>取消</el-button>
							<el-button type="primary">保存</el-button>
						</el-form-item>
						<el-form-item v-else>
							<el-button type="primary">返回</el-button>
						</el-form-item>
					</el-col>
				</el-row>
			</el-form>
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
		handleEdit(index, row) {
			console.log(index, row);
		},
		handleDelete(index, row) {
			console.log(index, row);
		}

	}
}

</script>
<style lang="stylus">
.el-textarea
	textarea
		resize none
		min-height 99px!important

</style>
