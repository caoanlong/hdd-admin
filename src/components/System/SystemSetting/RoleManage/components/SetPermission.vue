<template>
    <el-dialog 
        title="分配权限" 
        :visible.sync="isVisible" 
        :show-close="false" 
        :close-on-click-modal="false" 
        width="60%" 
        :append-to-body="true">
        <el-tree 
            ref="tree"
            :data="menus" 
            :props="defaultProps" 
            node-key="menuID"
            show-checkbox 
            highlight-current 
            :default-checked-keys="selectedMenuIds"
            @check="handleCheckChange" 
            style="height:400px;overflow-y:auto">
        </el-tree>
        <span slot="footer" class="dialog-footer">
            <el-button @click="close">取 消</el-button>
            <el-button type="primary" @click="save">确 定</el-button>
        </span>
    </el-dialog>
</template>

<script>
import { Message } from 'element-ui'
import SysRole from '../../../../../api/SysRole'
export default {
    props: {
        roleID: String,
        isVisible: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            menus: [],
            defaultProps: {
                children: 'children',
                label: 'name'
            },
            selectedMenuIds: [],
            selected: []
        }
    },
    watch: {
        isVisible(val) {
            if (val) {
                this.getMenus()
            }
        }
    },
    methods: {
        handleCheckChange(data, checked, indeterminate) {
            const checkedKeys = this.$refs['tree'].getCheckedKeys()
            const halfCheckedKeys = this.$refs['tree'].getHalfCheckedKeys()
            checkedKeys.push(...halfCheckedKeys)
            this.selected = Array.from(new Set(checkedKeys))
        },
        getMenus() {
			SysRole.menuList({ roleID: this.roleID }).then(res => {
                const { menuList, menuIDList } = res
                this.menus = res.menuList
                this.selectedMenuIds = menuIDList
                this.selected = menuIDList
            })
        },
        save() {
            SysRole.menuAdd({
                roleID: this.roleID,
                menuIDs: this.selected.join(',')
            }).then(res => {
                Message.success(res.data.msg)
                this.$emit('control')
            })
        },
        close() {
            this.$emit('control')
        }
    }
}
</script>

<style lang="stylus" scoped>

</style>
