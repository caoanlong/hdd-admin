<template>
	<div class="main-content">
		<el-card class="box-card">
			<div slot="header" class="clearfix">
				<span>短信模板</span>
			</div>
			<div class="tableControl">
				<el-button type="default" size="mini" icon="el-icon-plus">添加</el-button>
				<el-button type="default" size="mini" icon="el-icon-delete">批量删除</el-button>
				<el-button type="default" size="mini" icon="el-icon-refresh">刷新</el-button>
			</div>
			<div class="table">
				<el-table :data="smsTemps" border style="width: 100%" size="mini">
					<el-table-column type="expand">
						<template slot-scope="props">
							<el-form label-position="left" inline class="table-expand">
								<el-form-item label="装货地点">
									<span>{{ props.row.address }}</span>
								</el-form-item>
								<el-form-item label="错误描述">
									<span>{{ props.row.desc }}</span>
								</el-form-item>
							</el-form>
						</template>
					</el-table-column>
					<el-table-column sortable label="托运单号">
					</el-table-column>
					<el-table-column sortable label="承运人">
					</el-table-column>
					<el-table-column sortable label="托运时间">
					</el-table-column>
					<el-table-column sortable label="实际发运时间" width="140">
					</el-table-column>
					<el-table-column sortable label="收货时间">
					</el-table-column>
					<el-table-column sortable label="发货人">
					</el-table-column>
					<el-table-column sortable label="收货人">
					</el-table-column>
					<el-table-column sortable label="状态">
					</el-table-column>
					<el-table-column sortable label="创建时间">
					</el-table-column>
					<el-table-column label="操作" width="230" align="center">
						<template slot-scope="scope">
							<el-button type="default" size="mini" icon="el-icon-view">查看</el-button>
							<el-button type="default" size="mini" icon="el-icon-edit" title>编辑</el-button>
							<el-button type="default" size="mini" icon="el-icon-delete">删除</el-button>
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
				findType: '',
				pageNum: 1,
				pageSize: 10,
				count: 0,
				smsTemps: []
			}
	  	},
		methods: {
			getList(pageNum) {
				let params = {
					pageNum: pageNum || 1,
					pageSize: this.pageSize,
					type: this.findType
				}
				requestJava({
					url: '/walletBill/list',
					method: 'get',
					params
				}).then(res => {
					if (res.data.code == 200) {
						this.count = res.data.data.total
						this.tableData = res.data.data.list
						console.log(res.data.data.list)
					} else {
						Message.error(res.data.message)
					}
				})
			},
		}
	}
</script>
<style lang="stylus">
	.main-content
		.table
			th
				.cell
					text-align center
			.table-expand
				font-size 0
				label
					width 120px
					text-align right
					color #99a9bf
				.el-form-item
					margin-right 0
					margin-bottom 0
					width 100%
</style>