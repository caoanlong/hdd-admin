<template>
	<div class="main-content">
		<el-card class="box-card">
			<div slot="header" class="clearfix">
				<span>短信模板列表</span>
			</div>
			<div class="search">
				<el-form :inline="true"  class="form-inline"  size="small">
					<el-form-item label="业务类型">
						<el-select placeholder="请选择" v-model="find.businessType">
							<el-option label="注册" value="VERFIFY_CODE_REGISTER"></el-option>
							<el-option label="登录" value="VERFIFY_CODE_SINGIN"></el-option>
							<el-option label="更换手机号" value="VERFIFY_CODE_UPDATE_PHONE"></el-option>
							<el-option label="重置支付密码" value="VERIFY_CODE_PAY_PASSWORD_RESET"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item>
						<el-button type="primary" @click="getList()">查询</el-button>
						<el-button type="default" @click="reset">重置</el-button>
					</el-form-item>
				</el-form>
			</div>
			<div class="tableControl">
                <el-form :inline="true"  class="form-inline">
                    <el-button type="default" size="mini" icon="el-icon-plus" @click="addSmsTemp">添加</el-button>
                    <el-button type="default" size="mini" icon="el-icon-delete" @click="deleteConfirm">批量删除</el-button>
                </el-form>
		    </div>
			<div class="table">
				<el-table :data="tableData" @selection-change="selectionChange" border style="width: 100%" size="mini">
					<el-table-column type="selection" align="center"></el-table-column>
					<el-table-column label="任务类型" prop="businessType">
						<template slot-scope="scope">
							<span v-if="scope.row.businessType == 'VERFIFY_CODE_REGISTER'">注册</span>
							<span v-else-if="scope.row.businessType == 'VERFIFY_CODE_SINGIN'">登录</span>
							<span v-else-if="scope.row.businessType == 'VERFIFY_CODE_UPDATE_PHONE'">更换手机号</span>
							<span v-else-if="scope.row.businessType == 'VERIFY_CODE_PAY_PASSWORD_RESET'">重置支付密码</span>
						</template>
					</el-table-column>
					<el-table-column label="模板代码" prop="code"></el-table-column>
					<el-table-column label="模板内容" prop="content"></el-table-column>
					<el-table-column label="修改人" align="center" prop="updateBy" width="120"></el-table-column>
					<el-table-column label="修改时间" align="center" width="140">
						<template slot-scope="scope" v-if="scope.row.updateTime">
							<span>{{scope.row.updateTime | getdatefromtimestamp()}}</span>
						</template>
					</el-table-column>
					<el-table-column label="操作" width="230" align="center">
                        <template slot-scope="scope">
                            <el-button type="default" size="mini" @click="viewSmsTemp(scope.row.smsTemplateId)" icon="el-icon-view">查看</el-button>
                            <el-button type="default" size="mini" icon="el-icon-edit" @click="editSmsTemp(scope.row.smsTemplateId)">编辑</el-button>
                            <el-button type="default" size="mini" icon="el-icon-delete" @click="deleteConfirm(scope.row.smsTemplateId)">删除</el-button>
                        </template>
                    </el-table-column>
				</el-table>
				<Page :total="total" :pageIndex="pageIndex" :pageSize="pageSize" @pageChange="pageChange" @pageSizeChange="pageSizeChange"/>
			</div>
		</el-card>
	</div>
</template>
<script type="text/javascript">
import { Message } from 'element-ui'
import { baseMixin } from '../../../common/mixin'
import SysSmsTemplate from '../../../api/SysSmsTemplate'
export default {
	mixins: [baseMixin],
	data() {
		return {
			find: {
				businessType: ''
			}
		}
	},
	created() {
		this.getList()
	},
	methods: {
		selectionChange(data) {
			this.selectedList = data.map(item => item.smsTemplateId)
		},
		reset() {
			this.find.businessType = ''
			this.pageIndex = 1
			this.pageSize = 10
			this.getList()
		},
		getList() {
			SysSmsTemplate.find({
				pageNum: this.pageIndex,
				pageSize: this.pageSize,
				businessType: this.find.businessType
			}).then(res => {
				this.total = res.total
				this.tableData = res.list
			})
		},
		viewSmsTemp(smsTemplateId) {
			this.$router.push({name: 'viewsmstemp', query: { smsTemplateId }})
		},
		editSmsTemp(smsTemplateId) {
			this.$router.push({name: 'editsmstemp', query: { smsTemplateId }})
		},
		addSmsTemp() {
			this.$router.push({name: 'addsmstemp'})
		},
		deleteConfirm(id) {
			let ids = ''
			if (id && typeof id == 'string') {
				ids = id
			} else {
				if (this.selectedList.length == 0) {
					this.$message({
						type: 'warning',
						message: '请选择'
					})
					return
				}
				ids = this.selectedList.join(',')
			}
			this.$confirm('此操作将永久删除, 是否继续?', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			}).then(() => {
				this.delSmsTemp(ids)
				this.$message({
					type: 'success',
					message: '删除成功!'
				})
			}).catch(() => {
				this.$message({
					type: 'info',
					message: '已取消删除'
				})
			})
		},
		delSmsTemp(smsTemplateIds) {
			SysSmsTemplate.del({ smsTemplateIds }).then(res => {
				Message.error(res.data.message)
				this.getList()
			})
		}
	}
}
</script>
<style lang="stylus" scoped>

</style>