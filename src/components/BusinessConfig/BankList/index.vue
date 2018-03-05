<template>
	<div class="main-content">
		<el-card class="box-card">
			<div slot="header" class="clearfix">
				<span>支付银行列表</span>
			</div>
			<div class="tableControl">
				<el-button type="default" size="mini" icon="el-icon-plus" @click="addBank">添加</el-button>
                <el-button type="default" size="mini" icon="el-icon-delete">批量删除</el-button>
			</div>
			<div class="table">
				<el-table :data="tableData" @selection-change="selectionChange" border style="width: 100%" size="mini">
					<el-table-column type="selection" align="center"></el-table-column>
					<el-table-column label="银行名称" prop="bankName"></el-table-column>
					<el-table-column label="单笔限额" prop="perLimit"></el-table-column>
					<el-table-column label="单日限额" prop="dailyLimit"></el-table-column>
					<el-table-column label="logo" align="center">
						<template slot-scope="scope">
							<img :src="scope.row.logoUrl">
						</template>
					</el-table-column>
					<el-table-column label="logo图标名称" align="center" prop="logoName" width="100"></el-table-column>
					<el-table-column label="背景图片">
						<template slot-scope="scope">
							<img :src="scope.row.bgUrl">
						</template>
					</el-table-column>
					<el-table-column label="背景名称" prop="bgName"></el-table-column>
					<el-table-column label="创建时间" align="center" width="140">
						<template slot-scope="scope" v-if="scope.row.createTime">
							<span>{{scope.row.createTime | getdatefromtimestamp()}}</span>
						</template>
					</el-table-column>
					<el-table-column label="操作" width="230" align="center">
                        <template slot-scope="scope">
                            <el-button type="default" size="mini" icon="el-icon-view" @click="viewBank(scope.row.supportBankCode)">查看</el-button>
                            <el-button type="default" size="mini" icon="el-icon-edit" @click="editBank(scope.row.supportBankCode)">编辑</el-button>
                            <el-button type="default" size="mini" icon="el-icon-delete">删除</el-button>
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
		created() {
			this.getList()
		},
		methods: {
			pageChange(index) {
				this.getList(index)
			},
			reset() {
				this.findType = '',
				this.getList()
			},
			selectionChange(data) {
                // this.selectedtableDatas = data.map(item => item.MessageTemplate_ID)
            },
			getList(pageNum) {
				let params = {
					pageNum: pageNum || 1,
					pageSize: this.pageSize
				}
				requestJava({
					url: '/paySupportBank/list',
					method: 'get',
					params
				}).then(res => {
					if (res.data.code == 200) {
						this.count = res.data.data.total
						this.tableData = res.data.data.records
						console.log(res.data.data)
					} else {
						Message.error(res.data.message)
					}
				})
			},
			addBank() {
                this.$router.push({name: 'addbank'})
			},
			viewBank(supportBankCode) {
				this.$router.push({name: 'viewbank', query: {supportBankCode}})
			},
			editBank(supportBankCode) {
				this.$router.push({name: 'editbank', query: {supportBankCode}})
			},
		}
	}
</script>
<style lang="stylus">
.table
	p
		margin 0
		padding 0
		
</style>