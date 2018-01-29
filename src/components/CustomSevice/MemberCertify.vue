<template>
	<div class="main-content">
		<el-card class="box-card">
		  <div slot="header" class="clearfix">
			<span>会员列表</span>
		  </div>
		  <div class="search">
			<el-form :inline="true"  class="form-inline"  size="small">
			  <el-form-item label="会员类型：">
				<el-input  placeholder="会员类型"></el-input>
			  </el-form-item>
			  <el-form-item label="关键字：">
				<el-input  placeholder="关键字"></el-input>
			  </el-form-item>
			  <el-form-item label="状态：">
				<el-select placeholder="请选择" style="width:100px" value=''>
				  <el-option label="启用" value="启用"></el-option>
				  <el-option label="封停" value="封停"></el-option>
				</el-select>
			  </el-form-item>
			  <el-form-item label="认证状态：">
				<el-select placeholder="请选择" style="width:100px" value=''>
				  <el-option label="草稿" value="草稿"></el-option>
				  <el-option label="已提交" value="已提交"></el-option>
				  <el-option label="成功" value="成功"></el-option>
				  <el-option label="失败" value="失败"></el-option>
				</el-select>
			  </el-form-item>
			  <el-form-item>
				<el-button type="primary">查询</el-button>
				<el-button type="default">重置</el-button>
			  </el-form-item>
			</el-form>
		  </div>
		  <div class="tableControl">
			<el-button type="default" size="mini" icon="el-icon-refresh">刷新</el-button>
		  </div>
		  <div class="table">
			<el-table :data="tableData" border style="width: 100%" size="mini">
				<el-table-column label="会员类型" prop="memberType" width="100">
				</el-table-column>
				<el-table-column label="姓名" prop="name" width="100">
				</el-table-column>
				<el-table-column label="手机号" align="center" prop="mobilePhone" width="100">
				</el-table-column>
				<el-table-column label="车牌/企业名" prop="accountTitle">
				</el-table-column>
				<el-table-column label="注册时间" align="center" prop="regDate" width="140">
				</el-table-column>
				<el-table-column label="最后登录" align="center" prop="lastvisitDate" width="140">
				</el-table-column>
				<el-table-column label="状态" align="center" prop="status" width="60">
				</el-table-column>
				<el-table-column label="申请时间" align="center" prop="creatDate" width="140">
				</el-table-column>
				<el-table-column label="认证人" align="center" prop="handler" width="100">
				</el-table-column>
				<el-table-column label="认证时间" align="center" width="140">
					<template slot-scope="scope">
						<p>
						<span>{{ scope.row.creatDate }}</span></p>
						<p>
						<span>{{ scope.row.creatDate }}</span></p>
					</template>
				</el-table-column>
				<el-table-column label="认证状态" width="80">
				</el-table-column>
				<el-table-column label="操作" width="266" align="center">
					<template slot-scope="scope">
						  <el-button type="default" size="mini">
							<svg-icon icon-class="file_icon"></svg-icon> 个人
						  </el-button>
						  <el-button type="default" size="mini">
							<svg-icon icon-class="file_icon"></svg-icon> 企业
						  </el-button>
						  <el-button type="default" size="mini" v-if="scope.row.status=='启用'">
							<svg-icon icon-class="stop_icon"></svg-icon> 封停
						  </el-button>
						  <el-button type="default" size="mini" v-else>
							<svg-icon icon-class="start_icon"></svg-icon> 启用
						  </el-button>
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
			tableData: [{
				memberType: '物流企业',
				name: '曹阿龙',
				accountTitle:'深圳市曹阿龙老司机有限公司',
				mobilePhone: '13049497395',
				regDate:'2017-10-10 21:05:07',
				lastvisitDate:'2018-01-23 11:23:15',
				creatDate:'2017-10-11 09:15:27',
				handler: 'admin',
				status:'启用',
				certificateStatus: '',
				address: '上海市普陀区金沙江路 1518 弄'
			}]
		  }
		}
	}
</script>
<style lang="stylus">
.table
	p
		margin 0
		padding 0
		
</style>