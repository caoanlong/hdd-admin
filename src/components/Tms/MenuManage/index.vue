<template>
    <div class="main-content">
		<el-card class="box-card">
			<div slot="header" class="clearfix">
				<span>菜单列表</span>
			</div>
			<div class="search">
				<el-form :inline="true" class="form-inline" size="small">
                    <el-form-item label="菜单">
						<el-input placeholder="请输入..." v-model="find.name"></el-input>
					</el-form-item>
					<el-form-item label="显示/隐藏" >
						<el-select placeholder="请选择" v-model="find.isShow" class="constantSelect">
							<el-option label="全部" value=""></el-option>
							<el-option label="可见" value="Y"></el-option>
							<el-option label="隐藏" value="N"></el-option>
						</el-select>
					</el-form-item>
                    <el-form-item label="类型" >
						<el-select placeholder="请选择" v-model="find.type" class="constantSelect">
							<el-option label="全部" value=""></el-option>
							<el-option label="模块" value="module"></el-option>
							<el-option label="菜单" value="menu"></el-option>
							<el-option label="按钮" value="button"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item>
						<el-button type="primary">查询</el-button>
						<el-button type="default">重置</el-button>
					</el-form-item>
				</el-form>
			</div>
            <div class="tableControl">
				<el-button 
                    type="default" 
                    size="mini" 
                    icon="el-icon-plus" 
                    @click="$router.push({name: 'tmsaddmenu'})">
                    添加
                </el-button>
			</div>
            <div class="table">
                <zk-table
                    ref="table"
                    sum-text="sum"
                    index-text="#"
                    :data="data" 
                    :columns="columns" 
                    :expand-type="false" 
                    :selection-type="false">
                    <template slot="type" slot-scope="scope">
                        <el-tag size="mini" v-if="scope.row.type == 'module'">模块</el-tag>
                        <el-tag type="success" size="mini" v-else-if="scope.row.type == 'menu'">菜单</el-tag>
                        <el-tag type="warning" size="mini" v-else-if="scope.row.type == 'button'">按钮</el-tag>
                    </template>
                    <template slot="isShow" slot-scope="scope">
                        <el-tag type="success" size="mini" v-if="scope.row.isShow == 'Y'">显示</el-tag>
                        <el-tag type="danger" size="mini" v-else-if="scope.row.isShow == 'N'">隐藏</el-tag>
                    </template>
                    <template slot="operation" slot-scope="scope">
                        <el-button 
                            type="primary"
                            size="mini" 
                            icon="el-icon-edit" 
                            @click="edit(scope.row.id)">
                            修改
                        </el-button>
						<el-button 
                            type="danger"
                            size="mini" 
                            icon="el-icon-delete" 
                            @click="del(scope.row.id)">
                            删除
                        </el-button>
                    </template>
                </zk-table>
            </div>
		</el-card>
    </div>
</template>

<script>
import { Message } from 'element-ui'
export default {
    data() {
        return {
            find: {
                name: '',
                isShow: '',
                type: ''
            },
            columns: [
                {
                    label: '菜单',
                    prop: 'name',
                    width: '400px'
                },
                {
                    label: '排序',
                    prop: 'sort',
                    minWidth: '50px'
                },
                {
                    label: '菜单类型',
                    prop: 'type',
                    type: 'template',
                    template: 'type'
                },
                {
                    label: '显示隐藏',
                    prop: 'isShow',
                    type: 'template',
                    template: 'isShow'
                },
                {
                    label: '请求地址',
                    prop: 'path'
                },
                {
                    label: '操作',
                    prop: 'operation',
                    width: '180px',
                    type: 'template',
                    template: 'operation'
                }
            ],
            data: [
                {
                    id: 1,
                    name: '系统管理',
                    sort: 1,
                    type: 'module',
                    isShow: 'Y',
                    children: [
                        {
                            id: 2,
                            name: '系统设置',
                            sort: 1,
                            type: 'module',
                            isShow: 'Y',
                            children: [
                                {
                                    id: 3,
                                    name: '用户管理',
                                    sort: 1,
                                    type: 'menu',
                                    isShow: 'Y',
                                    path: '/user'
                                },
                                {
                                    id: 4,
                                    name: '角色管理',
                                    sort: 2,
                                    type: 'menu',
                                    isShow: 'Y',
                                    path: '/role'
                                }
                            ],
                        },
                        {
                            id: 5,
                            name: '区域管理',
                            sort: 2,
                            type: 'menu',
                            isShow: 'Y',
                            path: '/area'
                        }
                    ]
                },
                {
                    id: 6,
                    name: '业务配置',
                    sort: 2,
                    type: 'module',
                    isShow: 'Y',
                    children: [
                        {
                            id: 7,
                            name: 'App客户',
                            sort: 2,
                            type: 'menu',
                            isShow: 'Y',
                            path: '/customer'
                        },
                        {
                            id: 8,
                            name: 'App管理',
                            sort: 3,
                            type: 'menu',
                            isShow: 'Y',
                            path: '/app'
                        }
                    ]
                },
                {
                    id: 9,
                    name: 'TMS管理',
                    sort: 3,
                    type: 'menu',
                    isShow: 'Y',
                    path: '/tms'
                }
            ]
        }
    },
    methods: {
        edit(id) {
            console.log(id)
            this.$router.push({name: 'tmseditmenu', query: { id }})
        },
        del(id) {
			this.$confirm('此操作将永久删除, 是否继续?', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			}).then(() => {
				// SetContent.del({ id }).then(res => {
                //     Message.success('删除成功!')
                //     this.getList()
                // })
			}).catch(() => {
                Message.info('已取消删除!')
			})
        }
    }
}
</script>

<style lang="stylus" scoped>

</style>
