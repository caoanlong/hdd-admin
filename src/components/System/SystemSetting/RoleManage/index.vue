<template>
	<div class="main-content">
		<el-card class="box-card">
		  <div slot="header" class="clearfix">
			<span>角色列表</span>
		  </div>
		  <div class="search">
			<el-form :inline="true"  class="demo-form-inline"  size="small">
			  <el-form-item label="角色名称：">
				<el-input  placeholder="角色名称"></el-input>
			  </el-form-item>
			  <el-form-item>
				<el-button type="primary">查询</el-button>
				<el-button type="default">重置</el-button>
			  </el-form-item>
			</el-form>
		  </div>
		  <div class="tableControl">
			<el-button type="default" size="mini" icon="el-icon-plus" @click.native="addRole">添加</el-button>
			<el-button type="default" size="mini" icon="el-icon-delete">批量删除</el-button>
			<el-button type="default" size="mini" icon="el-icon-refresh">刷新</el-button>
		  </div>
		  <div class="table">
			<el-table :data="tableData" border style="width: 100%" size="mini">
				<el-table-column type="selection" align="center">
				</el-table-column>
				<el-table-column label="角色名称" prop="roleName">
				</el-table-column>
				<el-table-column label="英文名称" prop="name">
				</el-table-column>
				<el-table-column label="归属机构" prop="affiliation">
				</el-table-column>
				<el-table-column label="数据范围" prop="dataArea">
				</el-table-column>
				<el-table-column label="操作" width="430" align="center">
					<template slot-scope="scope">
						<el-button-group>
							<el-button type="default" size="mini" icon="el-icon-view">查看</el-button>
							<el-button type="primary" size="mini" icon="el-icon-edit" title>修改</el-button>
							<el-button type="danger" size="mini" icon="el-icon-delete">删除</el-button>
							<el-button type="default" size="mini" icon="el-icon-setting">权限设置</el-button>
							<el-button type="default" size="mini" icon="el-icon-plus">分配用户</el-button>
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
			addRole() {
				this.$router.push({name: 'addrole'})
			}
		}
	}
</script>
<style lang="stylus">

</style>