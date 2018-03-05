<template>
	<div class="main-content">
		<el-card class="box-card">
			<div slot="header" class="clearfix">
				<span>无车承运人车源列表</span>
			</div>
			<div class="search">
				<el-form :inline="true"  class="demo-form-inline"  size="small">
					<el-form-item label="报文参考号：">
						<el-input  placeholder="报文参考号"></el-input>
					</el-form-item>
					<el-form-item label="单证名称：">
						<el-input  placeholder="单证名称"></el-input>
					</el-form-item>
					<el-form-item>
						<el-button type="primary">查询</el-button>
						<el-button type="default">重置</el-button>
					</el-form-item>
				</el-form>
			</div>
			<div class="tableControl">
				<el-button type="default" size="mini" icon="el-icon-plus" @click="jump('truck','add')">添加</el-button>
				<el-button type="default" size="mini" icon="el-icon-upload2">导入</el-button>
				<el-button type="default" size="mini" icon="el-icon-download">导出</el-button>
				<el-button type="default" size="mini" icon="el-icon-refresh">刷新</el-button>
			</div>
			<div class="table">
				<el-table :data="tableData" border style="width: 100%" size="mini">
					<el-table-column sortable label="报文参考号">
					</el-table-column>
					<el-table-column sortable label="单证名称">
					</el-table-column>
					<el-table-column sortable label="发送时间">
					</el-table-column>
					<el-table-column sortable label="车辆牌照号">
					</el-table-column>
					<el-table-column sortable label="车型代码">
					</el-table-column>
					<el-table-column sortable label="车辆长度">
					</el-table-column>
					<el-table-column label="核定载质量">
					</el-table-column>
					<el-table-column label="出发地">
					</el-table-column>
					<el-table-column label="目的地">
					</el-table-column>
					<el-table-column sortable label="状态">
					</el-table-column>
					<el-table-column label="描述">
					</el-table-column>
					<el-table-column sortable label="创建时间">
					</el-table-column>
					<el-table-column label="操作">
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
	import requestJava from '../../../common/requestJava'
	import { Message } from 'element-ui'
	export default {
		data() {
			return {
				pageNum: 1,
				pageSize: 10,
				count: 0,
				tableData: []
			}
		},
		methods: {
			pageChange(index) {
				// this.getList(index)
			},
		}
	}	
</script>
<style lang="stylus">
</style>