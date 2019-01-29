<template>
    <el-dialog 
        title="选择图标" 
        :visible.sync="isVisible" 
        width="30%" 
        :append-to-body="true">
        <ul class="iconList clearfix">
            <li 
                v-for="item in svgicons" 
                :key="item" 
                :class="{'selected': selected == item}" 
                @click="selectIcon(item)">
                <svg-icon :iconClass="item"></svg-icon>
            </li>
        </ul>
        <span slot="footer" class="dialog-footer">
            <el-button @click="close">取 消</el-button>
            <el-button type="primary" @click="close(true)">确 定</el-button>
        </span>
    </el-dialog>
</template>

<script>
import { requireAllName, req } from '../../../../../assets/icons'
export default {
    props: {
        icon: String,
        isVisible: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            selected: ''
        }
    },
    watch: {
        icon(val) {
            this.selected = val
        }
    },
    computed: {
		svgicons: () => requireAllName(req)
	},
    methods: {
        selectIcon(icon) {
            this.selected = icon
		},
        close(bool) {
            if (bool) {
                this.$emit('control', this.selected)
            } else {
                this.$emit('control')
            }
        }
    }
}
</script>

<style lang="stylus" scoped>
.svg-icon
    vertical-align top
.iconList
    padding 0
    &:after
        clearfix
    li
        list-style-type none
        float left
        font-size 18px
        width 44px
        height 44px
        padding 10px
        text-align center
        cursor pointer
        &:hover
        &.selected
            color #409EFF
</style>
