<template>
    <div class="main-content">
		<el-card class="box-card">
			<div slot="header" class="clearfix">App管理列表</div>
			<div class="search">
				<el-form :inline="true" class="demo-form-inline" size="small">
					<el-form-item label="关键字">
						<el-input placeholder="请输入关键字" v-model="find.keyword"></el-input>
					</el-form-item>
                    <el-form-item label="使用状态">
						<el-select placeholder="请选择" v-model="find.useFlag">
							<el-option label="全部" value=""></el-option>
							<el-option label="使用中" value="Y"></el-option>
							<el-option label="已停用" value="N"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item>
						<el-button type="primary" @click="getList">查询</el-button>
						<el-button type="default" @click="reset">重置</el-button>
					</el-form-item>
				</el-form>
			</div>
			<div class="tableControl">
				<el-button type="default" size="mini" icon="el-icon-plus" @click="add">添加</el-button>
			</div>
			<div class="table">
				<el-table 
                    :data="tableData" 
                    @selection-change="selectionChange" 
                    border style="width: 100%" size="mini">
					<el-table-column label="Id" type="selection" align="center" width="40" fixed></el-table-column>
					<el-table-column label="AppID" align="center" prop="appID"></el-table-column>
					<el-table-column label="App名称" align="center" prop="name"></el-table-column>
					<el-table-column label="App客户" align="center" prop="customerName"></el-table-column>
					<el-table-column label="极光Key" align="center" prop="jiGuangPushKey"></el-table-column>
					<el-table-column label="短信账号" align="center" prop="smsAccount"></el-table-column>
					<el-table-column label="短信标签" align="center" prop="smsFlag"></el-table-column>
					<el-table-column label="使用状态" align="center">
                        <template slot-scope="scope">
                            <span>{{scope.row.useFlag == 'Y' ? '使用中' : '已停用'}}</span>
                        </template>
                    </el-table-column>
					<el-table-column label="修改人" align="center" width="120" prop="updateByName"></el-table-column>
					<el-table-column label="修改时间" align="center" width="140">
						<template slot-scope="scope">
							<span v-if="scope.row.updateTime">{{ new Date(scope.row.updateTime).getTime() | getdatefromtimestamp() }}</span>
						</template>
					</el-table-column>
					<el-table-column label="操作" width="230" align="center" fixed="right">
						<template slot-scope="scope">
                            <el-button type="default" size="mini" @click="view(scope.row.appID)" icon="el-icon-view">查看</el-button>
                            <el-button type="default" size="mini" icon="el-icon-edit" @click="edit(scope.row.appID)">编辑</el-button>
                            <el-button type="default" size="mini" icon="el-icon-check" v-if="scope.row.useFlag=='N'" @click="disable(scope.row.appID, 'Y')">启用</el-button>
                            <el-button type="default" size="mini" icon="el-icon-close" v-else @click="disable(scope.row.appID, 'N')">停用</el-button>
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
import SetApp from '../../../api/SetApp'
import { PAGEINDEX, PAGESIZE } from '../../../common/const'
export default {
    mixins: [baseMixin],
    data() {
        return {
            find: { 
                keyword: '',
                useFlag: ''
            }
        }
    },
    created() {
        this.getList()
    },
    methods: {
        selectionChange(data) {
			this.selectedList = data.map(item => item.appID)
        },
        reset() {
            this.pageIndex = PAGEINDEX
            this.pageSize = PAGESIZE
            this.find.keyword = ''
            this.find.useFlag = ''
            this.getList()
        },
        getList() {
            SetApp.find({
                pageNum: this.pageIndex,
                pageSize: this.pageSize,
                keyword: this.find.keyword,
                useFlag: this.find.useFlag
            }).then(res => {
                this.total = res.total
                this.tableData = res.list
            })
        },
        add() {
            this.$router.push({name: 'addapp'})
        },
        edit(appID) {
            this.$router.push({name: 'editapp', query: { appID }})
        },
        disable(appID, useFlag) {
            SetApp.switchOperation({ appID, useFlag }).then(res => {
                Message.success(res.data.message)
				this.getList()
            })
		}
    }
}
</script>

<style lang="stylus" scoped>

</style>
