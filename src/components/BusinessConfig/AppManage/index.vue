<template>
    <div class="main-content">
		<el-card class="box-card">
			<div slot="header" class="clearfix">App管理列表</div>
			<div class="search">
				<el-form :inline="true" class="demo-form-inline" size="small">
					<el-form-item label="关键字">
						<el-input placeholder="请输入关键字" v-model="find.keyword"></el-input>
					</el-form-item>
					<el-form-item>
						<el-button type="primary" @click="getList">查询</el-button>
						<el-button type="default" @click="reset">重置</el-button>
					</el-form-item>
				</el-form>
			</div>
			<div class="tableControl">
				<el-button type="default" size="mini" icon="el-icon-plus" @click="add">添加</el-button>
				<el-button type="default" size="mini" icon="el-icon-delete" @click="del">批量删除</el-button>
			</div>
			<div class="table">
				<el-table 
                    :data="tableData" 
                    @selection-change="selectionChange" 
                    border style="width: 100%" size="mini">
					<el-table-column label="Id" type="selection" align="center" width="40" fixed></el-table-column>
					<el-table-column label="AppID" align="center" prop="appID"></el-table-column>
					<el-table-column label="App名称" align="center" prop="name"></el-table-column>
					<el-table-column label="App类型" align="center" prop="type"></el-table-column>
					<el-table-column label="App客户" align="center" prop="customerName"></el-table-column>
					<el-table-column label="极光Key" align="center" prop="jiGuangPushKey"></el-table-column>
					<el-table-column label="短信账号" align="center" prop="smsAccount"></el-table-column>
					<el-table-column label="短信标签" align="center" prop="smsFlag"></el-table-column>
					<el-table-column label="修改人" align="center" width="120" prop="updateBy"></el-table-column>
					<el-table-column label="修改时间" align="center" width="140">
						<template slot-scope="scope">
							<span>{{ new Date(scope.row.updateTime).getTime() | getdatefromtimestamp() }}</span>
						</template>
					</el-table-column>
					<el-table-column label="操作" width="230" align="center" fixed="right">
						<template slot-scope="scope">
                            <el-button type="default" size="mini" @click="view(scope.row.appID)" icon="el-icon-view">查看</el-button>
                            <el-button type="default" size="mini" icon="el-icon-edit" @click="edit(scope.row.appID)">编辑</el-button>
                            <el-button type="default" size="mini" icon="el-icon-delete" @click="disable(scope.row.appID)">停用</el-button>
                        </template>
					</el-table-column>
				</el-table>
				<Page :total="total" :pageIndex="pageIndex" :pageSize="pageSize" @pageChange="pageChange" @pageSizeChange="pageSizeChange"/>
			</div>
		</el-card>
	</div>
</template>

<script>
import { baseMixin } from '../../../common/mixin'
export default {
    mixins: [baseMixin],
    data() {
        return {
            find: { keyword: '' }
        }
    },
    created() {
        this.getList()
    },
    methods: {
        selectionChange(data) {
			this.selectedList = data.map(item => item.appID)
		},
        getList() {
            this.total = 2
            this.tableData = [
                {
                    appID: 123,
                    appName: '华新智运',
                    appType: '货主端',
                    appCustomer: '华新水泥有限公司',
                    JGKey: '12346567',
                    smsAccount: '12346567',
                    smsLabel: '华新',
                    updateBy: '罗凯',
                    updateDate: '2018-04-17 21:35:32'
                },
                {
                    appID: 1,
                    appName: '货多多',
                    appType: '车主端',
                    appCustomer: '云南微服物流有限公司',
                    JGKey: '12346567',
                    smsAccount: '12346567',
                    smsLabel: '货多多',
                    updateBy: '罗凯',
                    updateDate: '2018-04-17 21:35:32'
                },
            ]
        },
        add() {
            this.$router.push({name: 'addapp'})
        },
        edit(appID) {
            this.$router.push({name: 'editapp', query: { appID }})
        },
        disable(appID) {

		}
    }
}
</script>

<style lang="stylus" scoped>

</style>
