<template>
	<div class="main-content">
		<el-card class="box-card">
			<div slot="header">结算模板</div>
			<div class="search">
				<el-form :inline="true" class="demo-form-inline" size="mini">
					<el-form-item label="发货单位">
						<el-input placeholder="请输入..." v-model="findShipperCompanyName"></el-input>
					</el-form-item>
					<el-form-item label="发货地">
						<el-input placeholder="请输入..." v-model="findShipperArea"></el-input>
					</el-form-item>
					<el-form-item label="收货单位">
						<el-input placeholder="请输入..." v-model="findConsigneeCompanyName"></el-input>
					</el-form-item>
					<el-form-item label="收货地">
						<el-input placeholder="请输入..." v-model="findConsigneeArea"></el-input>
					</el-form-item>
					<el-form-item>
						<el-button type="primary" @click="getList">查询</el-button>
						<el-button type="default" @click="reset">重置</el-button>
					</el-form-item>
				</el-form>
			</div>
			<div class="table">
				<el-table 
					ref="recTable" 
					:data="tableData" 
					border style="width: 100%" size="mini" stripe>
					<el-table-column label="序号" type="index" align="center" fixed width="60"></el-table-column>
					<el-table-column label="用户" prop="memberCompany"></el-table-column>
					<el-table-column label="发货单位" prop="shipperCompanyName"></el-table-column>
					<el-table-column label="发货地" prop="shipperArea" width="140"></el-table-column>
					<el-table-column label="发货详细地址" prop="shipperDetailAddress" width="140"></el-table-column>
					<el-table-column label="收货单位" prop="consigneeCompanyName"></el-table-column>
					<el-table-column label="收货地" prop="consigneeArea" width="140"></el-table-column>
					<el-table-column label="收货详细地址" prop="consigneeDetailAddress" width="140"></el-table-column>
					<el-table-column label="对内运距" prop="mileage" align="center"></el-table-column>
					<el-table-column label="对内运价" prop="internalPrice" align="center"></el-table-column>
					<el-table-column label="对内TKM" prop="internalUnitPrice" align="center"></el-table-column>
					<el-table-column label="对外运距" prop="externalMileage" align="center"></el-table-column>
					<el-table-column label="对外运价" prop="externalPrice" align="center"></el-table-column>
					<el-table-column label="对外TKM" prop="externalUnitPrice" align="center"></el-table-column>
					<el-table-column label="对内月结比率" prop="internalAbschlussRate" width="140" align="center">
						<template slot-scope="scope">
							{{(scope.row.internalAbschlussRate)*100+'%'}}
						</template>
					</el-table-column>
					<el-table-column label="对内现付比率" prop="internalCashRate" width="140" align="center">
						<template slot-scope="scope">
							{{(scope.row.internalCashRate)*100+'%'}}
						</template>
					</el-table-column>
					<el-table-column label="对内到付比率" prop="internalCodRate" width="140" align="center">
						<template slot-scope="scope">
							{{(scope.row.internalCodRate)*100+'%'}}
						</template>
					</el-table-column>
					<el-table-column label="对内收货方到付比率" prop="internalConsigneeCodRate" width="140" align="center">
						<template slot-scope="scope">
							{{(scope.row.internalConsigneeCodRate)*100+'%'}}
						</template>
					</el-table-column>
					<el-table-column label="对内回单比率" prop="internalPorRate" width="140" align="center">
						<template slot-scope="scope">
							{{(scope.row.internalPorRate)*100+'%'}}
						</template>
					</el-table-column>
					<el-table-column label="对外月结比率" prop="externalAbschlussRate" width="140" align="center">
						<template slot-scope="scope">
							{{(scope.row.externalAbschlussRate)*100+'%'}}
						</template>
					</el-table-column>
					<el-table-column label="对外现付比率" prop="externalCashRate" width="140" align="center">
						<template slot-scope="scope">
							{{(scope.row.externalCashRate)*100+'%'}}
						</template>
					</el-table-column>
					<el-table-column label="对外到付比率" prop="externalCodRate" width="140" align="center">
						<template slot-scope="scope">
							{{(scope.row.externalCodRate)*100+'%'}}
						</template>
					</el-table-column>
					<el-table-column label="对外收货方到付比率" prop="externalConsigneeCodRate" width="140" align="center">
						<template slot-scope="scope">
							{{(scope.row.externalConsigneeCodRate)*100+'%'}}
						</template>
					</el-table-column>
					<el-table-column label="对外回单比率" prop="externalPorRate" width="140" align="center">
						<template slot-scope="scope">
							{{(scope.row.externalPorRate)*100+'%'}}
						</template>
					</el-table-column>
					<el-table-column width="80" align="center" fixed="right">
						<template slot-scope="scope">
							<el-button size="mini"  icon="el-icon-view" @click="view(scope.row.transporPriceID)">查看</el-button>
						</template>
					</el-table-column>
				</el-table>
				<Page :total="total" :pageIndex="pageIndex" :pageSize="pageSize" @pageChange="pageChange" @pageSizeChange="pageSizeChange"/>
			</div>
		</el-card>
	</div>
</template>
<script type="text/javascript">
import requestJava, { javaUrl } from '../../../../common/requestJava'
import { Message } from 'element-ui'
import Page from '../../../CommonComponents/Page'
export default {
	data() {
		return {
			findConsigneeArea: '',
			findConsigneeCompanyName: '',
			findShipperArea: '',
			findShipperCompanyName: '',
			pageIndex: 1,
			pageSize: 10,
			total: 0,
			tableData: []
		}
	},
	components: { Page },
	created() {
		this.getList()
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
			this.findConsigneeArea = ''
			this.findConsigneeCompanyName = ''
			this.findShipperArea = ''
			this.findShipperCompanyName = ''
			this.pageIndex = 1
			this.pageSize = 10
			this.getList()
		},
		getList() {
			let params = {
				current: this.pageIndex,
				size: this.pageSize,
				consigneeArea: this.findConsigneeArea,
				consigneeCompanyName: this.findConsigneeCompanyName,
				shipperArea: this.findShipperArea,
				shipperCompanyName: this.findShipperCompanyName
			}
			requestJava({
				url: '/transportPrice/findList',
				params
			}).then(res => {
				this.tableData = res.data.data.list
				this.total = res.data.data.total
			})
		},
		view(transporPriceID){
			this.$router.push({ name: 'viewtmssettleconfig' , query: { transporPriceID} })
		}
	}
}

</script>
<style lang="stylus" scoped>
.download-btn
	font-size 12px
	color #606266
	height 29px
	line-height 29px
	padding 0 15px
	border 1px solid #dcdfe6
	border-radius 3px
	background #fff
	margin 0 10px
	display inline-block
	&:hover
		border-color #c6e2ff
		color #409eff
		background #ecf5ff
	&:active
		border-color #3a8ee6
		color #3a8ee6
.table-img
	width 30px
	cursor pointer
</style>
