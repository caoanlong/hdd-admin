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
import SysMenu from '../../../../api/SysMenu'
export default {
    props: {
        isVisible: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            data: [],
            defaultProps: {
                children: 'children',
                label: 'name'
            },
            selected: null
        }
    },
    watch: {
        isVisible(val) {
            val && this.getList()
        }
    },
    methods: {
        getList() {
            SysMenu.find().then(res => {
                // this.walkMenus(res)
                this.data = res
            })
        },
        walkMenus(menus) {
            const queue =  [...menus]
            while (queue.length > 0) {
                const item = queue.shift()
                const curItem = Object.assign({}, item)
                if (curItem.type == 'Module') {
                    delete curItem.children
                    this.data.push(curItem)
                }
                if (item.children && item.children.length > 0) {
                    for (let i = 0; i < item.children.length; i++) {
                        queue.push(item.children[i])
                    }
                }
            }
        },
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
