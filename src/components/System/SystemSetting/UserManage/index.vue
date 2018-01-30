<template>
	<div class="main-content">
		<el-card class="box-card">
		  <div slot="header" class="clearfix">
			<span>用户列表</span>
		  </div>
		  <div class="search">
			<el-form :inline="true"  class="demo-form-inline"  size="small">
			  <el-form-item label="归属公司：">
				<el-input  placeholder="归属公司"></el-input>
			  </el-form-item>
			  <el-form-item label="登录名：">
				<el-input  placeholder="登录名"></el-input>
			  </el-form-item>
			  <el-form-item label="归属部门：">
				<el-input  placeholder="归属部门"></el-input>
			  </el-form-item>
			  <el-form-item label="姓名：">
				<el-input  placeholder="姓名"></el-input>
			  </el-form-item>
			  <el-form-item>
				<el-button type="primary">查询</el-button>
				<el-button type="default">重置</el-button>
			  </el-form-item>
			</el-form>
		  </div>
		  <div class="tableControl">
			<el-button type="default" size="mini" icon="el-icon-plus" @click.native="addUser">添加</el-button>
			<el-button type="default" size="mini" icon="el-icon-delete">批量删除</el-button>
		  	<el-button type="default" size="mini" icon="el-icon-upload2">导入</el-button>
		  	<el-button type="default" size="mini" icon="el-icon-download">导出</el-button>
		  	<el-button type="default" size="mini" icon="el-icon-refresh">刷新</el-button>
		  </div>
		  <div class="table">
			<el-table :data="tableData" border style="width: 100%" size="mini">
				<el-table-column type="selection" align="center">
				</el-table-column>
				<el-table-column label="登录名" sortable prop="roleName">
				</el-table-column>
				<el-table-column label="姓名" sortable prop="name">
				</el-table-column>
				<el-table-column label="电话" sortable prop="affiliation">
				</el-table-column>
				<el-table-column label="手机" sortable>
				</el-table-column>
				<el-table-column label="归属公司" sortable>
				</el-table-column>
				<el-table-column label="归属部门" sortable>
				</el-table-column>
				<el-table-column label="操作" width="240" align="center">
					<template slot-scope="scope">
						<el-button-group>
							<el-button type="default" size="mini" icon="el-icon-view">查看</el-button>
							<el-button type="primary" size="mini" icon="el-icon-edit" title>修改</el-button>
							<el-button type="danger" size="mini" icon="el-icon-delete">删除</el-button>
						</el-button-group>
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
				id:'1',
				roleName:'管理员',
				name: 'Admin',
				affiliation: '',
				dataArea: '所有数据'
			},{
				id:'2',
				roleName:'客服人员',
				name: 'Customer Service',
				affiliation: '总公司',
				dataArea: '所有数据'
			},{
				id:'3',
				roleName:'系统管理员',
				name: 'Administrator',
				affiliation: '总公司',
				dataArea: '所有数据'
			},{
				id:'4',
				roleName:'运维管理员',
				name: 'Operations Manager',
				affiliation: '总公司',
				dataArea: '所有数据'
			}]
		}
	},
	methods: {
		addUser() {
			this.$router.push({name: 'adduser'})
		}
	}
}
</script>
<style lang="stylus">

</style>