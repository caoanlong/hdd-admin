<template>
	<div class="dashboard-editor-container">
		<panel-group @handleSetLineChartData="handleSetLineChartData" style="margin-top:0"></panel-group>
		<el-row style="background:#fff;padding:16px 16px 0;">
			<line-chart :chart-data="lineChartData"></line-chart>
		</el-row>
	</div>
</template>
<script type="text/javascript">
	import PanelGroup from '../CommonComponents/PannelGroup'
	import LineChart from '../CommonComponents/LineChart'
	const lineChartData = {
		newVisitis: {
			expectedData: [100, 120, 161, 134, 105, 160, 165],
			actualData: [120, 82, 91, 154, 162, 140, 145]
		},
		messages: {
			expectedData: [200, 192, 120, 144, 160, 130, 140],
			actualData: [180, 160, 151, 106, 145, 150, 130]
		},
		purchases: {
			expectedData: [80, 100, 121, 104, 105, 90, 100],
			actualData: [120, 90, 100, 138, 142, 130, 130]
		},
		shoppings: {
			expectedData: [130, 140, 141, 142, 145, 150, 160],
			actualData: [120, 82, 91, 154, 162, 140, 130]
		}
	}
	export default {
		name: 'home',
		data() {
			return {
				lineChartData: lineChartData.newVisitis
			}
		},
		methods: {
			handleSetLineChartData(type) {
				this.lineChartData = lineChartData[type]
			}
		},
		components: {
			PanelGroup,
			LineChart
		}
	}
</script>
<style lang="stylus" scoped>
	.dashboard-editor-container
		padding 20px
		background-color rgb(240, 242, 245)
		.chart-wrapper
			background #fff
			padding 16px 16px 0
			margin-bottom 32px
</style>