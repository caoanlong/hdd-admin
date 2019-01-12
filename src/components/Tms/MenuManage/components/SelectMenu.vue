<template>
    <div>
        <el-dialog 
            title="选择菜单" 
            :visible="isVisible" 
            :show-close="false" 
            :close-on-click-modal="false" 
            :append-to-body="true">
            <el-tree 
                :data="data" 
                :props="defaultProps" 
                highlight-current 
                :expand-on-click-node="false"
                @node-click="handleNodeClick">
            </el-tree>
            <div slot="footer" class="dialog-footer">
                <el-button @click="close(false)">取消</el-button>
                <el-button type="primary" @click="close(true)">确定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
export default {
    props: {
        isVisible: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
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
            ],
            defaultProps: {
                children: 'children',
                label: 'name'
            },
            selected: null
        }
    },
    methods: {
        handleNodeClick(data) {
            this.selected = data
        },
        close(bool) {
            bool ? this.$emit('control', this.selected) : this.$emit('control')
        }
    }
}
</script>

<style lang="stylus">
.el-tree--highlight-current .el-tree-node.is-current>.el-tree-node__content {
    color: #ffffff;
    background-color: #409EFF !important;
}
</style>
