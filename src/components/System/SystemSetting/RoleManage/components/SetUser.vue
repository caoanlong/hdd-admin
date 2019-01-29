<template>
    <el-dialog 
        title="分配用户" 
        :visible.sync="isVisible" 
        :show-close="false" 
        :close-on-click-modal="false" 
        width="60%" 
        :append-to-body="true">
        <table class="dialog-table">
            <thead>
                <tr>
                    <th width="60">选择</th>
                    <th>登录名</th>
                    <th>姓名</th>
                    <th>手机</th>
                    <th>电话</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item in tableData" :key="item.userID" @click="handSelect(item)">
                    <td class="wf-check">
                        <span 
                            class="checkbox" 
                            :class="selectedList.map(i => i.userID).includes(item.userID) ? 'selected' : ''">
                        </span>
                    </td>
                    <td align="center">{{item.loginName}}</td>
                    <td align="center">{{item.name}}</td>
                    <td align="center">{{item.mobile}}</td>
                    <td align="center">{{item.phone}}</td>
                </tr>
            </tbody>
        </table>
        <Page :total="total" :pageIndex="pageIndex" :pageSize="pageSize" @pageChange="pageChange" @pageSizeChange="pageSizeChange"/>
        <span slot="footer" class="dialog-footer">
            <el-button @click="close">取 消</el-button>
            <el-button type="primary" @click="save">确 定</el-button>
        </span>
    </el-dialog>
</template>

<script>
import { Message } from 'element-ui'
import SysRole from '../../../../../api/SysRole'
import { baseMixin } from '../../../../../common/mixin'
export default {
    mixins: [baseMixin],
    props: {
        roleID: String,
        isVisible: {
            type: Boolean,
            default: false
        }
    },
    watch: {
        isVisible(val) {
            if (val) {
                this.getList()
            }
        }
    },
    methods: {
        handSelect(data) {
            const userIDs = this.selectedList.map(item => item.userID)
            const index = userIDs.indexOf(data.userID)
            if (index == -1) {
                this.selectedList.push(data)
            } else {
                this.selectedList.splice(index, 1)
            }
        },
        getList() {
            SysRole.userList({ roleID: this.roleID }).then(res => {
                this.total = res.total
                this.tableData = res.records
                this.selectedList = res.records.filter(item => item.checked)
            })
        },
        save() {
            SysRole.userAdd({
                roleID: this.roleID,
                userIDs: this.selectedList.map(item => item.userID).join(',')
            }).then(res => {
                Message.success(res.data.msg)
                this.close()
            })
        },
        close() {
            this.$emit('control')
        }
    }
}
</script>

<style lang="stylus" scoped>
.dialog-table
    font-size 12px
    background #dcdfe6
    border-spacing 1px
    width 100%
    th
        background #f2f2f2
        color #666
        padding 10px 15px
    td
        padding 10px 15px
        background #fff
    .wf-check
        position relative
        text-align center
        .checkbox
            display block
            width 14px
            height 14px
            margin 0 auto
            background url("../../../../../assets/imgs/checkbox.png") no-repeat 0 0
            cursor pointer
            &:hover
                background-position -14px 0
            &.selected
                background-position -28px 0
            &.disabled
                background-position -43px 0
</style>
