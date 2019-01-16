<template>
    <div class="main-content">
		<el-card class="box-card">
			<div slot="header" class="clearfix">
				<span>添加菜单</span>
			</div>
			<el-row :gutter="20">
				<el-col :span="12" :offset="6">
					<el-form label-width="120px" :model="menu" :rules="rules" ref="ruleForm">
						<el-form-item label="上级菜单" prop="parentName">
							<el-input placeholder="请输入..." v-model="menu.parentName" @focus="isAddVisible = true"></el-input>
						</el-form-item>
                        <el-form-item label="菜单类型" prop="type">
                            <el-radio v-model="menu.type" label="Module">模块</el-radio>
                            <el-radio v-model="menu.type" label="Menu">菜单</el-radio>
                            <el-radio v-model="menu.type" label="Button">按钮</el-radio>
						</el-form-item>
                        <el-form-item label="菜单名称" prop="name">
							<el-input placeholder="请输入..." v-model="menu.name"></el-input>
						</el-form-item>
                        <el-form-item label="目标" prop="target">
							<el-input placeholder="请输入..." v-model="menu.target"></el-input>
						</el-form-item>
                        <el-form-item label="显示排序" prop="totalSort">
							<el-input-number placeholder="请输入..." v-model="menu.totalSort"></el-input-number>
						</el-form-item>
                        <el-form-item label="图标" prop="icon" v-if="menu.type == 'Module'">
                            <el-button type="primary" plain @click="selectIconVisible = true">
                                <svg-icon :iconClass="menu.icon ? menu.icon : 'add-icon'"></svg-icon> 
                                {{menu.icon ? menu.icon : iconTxt}}
                            </el-button>
                        </el-form-item>
                        <el-form-item label="请求地址" prop="apiUrl" v-if="menu.type != 'Module'">
							<el-input placeholder="请输入..." v-model="menu.apiUrl"></el-input>
						</el-form-item>
                        <el-form-item label="显示/隐藏" prop="type">
                            <el-radio v-model="menu.isShow" label="Y">显示</el-radio>
                            <el-radio v-model="menu.isShow" label="N">隐藏</el-radio>
						</el-form-item>
						<el-form-item>
							<el-button type="primary" @click="save">保存</el-button>
							<el-button @click="back">返回</el-button>
						</el-form-item>
					</el-form>
				</el-col>
			</el-row>
		</el-card>
        <select-menu :isVisible="isAddVisible" @control="handSelectMenu"></select-menu>
        <el-dialog title="选择图标" :visible.sync="selectIconVisible" width="30%" :append-to-body="true">
			<ul class="iconList clearfix">
				<li 
                    v-for="icon in svgicons" 
                    :key="icon" 
                    :class="{'selected':menu.icon == icon}" 
                    @click="menu.icon = icon">
					<svg-icon :iconClass="icon"></svg-icon>
				</li>
			</ul>
			<span slot="footer" class="dialog-footer">
				<el-button @click="selectIconVisible = false">取 消</el-button>
				<el-button type="primary" @click="handSelectIcon">确 定</el-button>
			</span>
		</el-dialog>
	</div>
</template>

<script>
import { Message } from 'element-ui'
import SysMenu from '../../../api/SysMenu'
import SelectMenu from './components/SelectMenu'
import { requireAllName, req } from '../../../assets/icons'
export default {
    components: { SelectMenu },
    data() {
        return {
            isAddVisible: false,
            selectIconVisible: false,
            iconTxt: '添加图标',
            menu: {
                parentId: '',
                parentName: '',
                type: 'Module',
                name: '',
                target: '',
                totalSort: 1,
                icon: '',
                apiUrl: '',
                isShow: 'Y'
            },
            rules: {
                type: [{required: true, message: '请选择类型'}],
                name: [
                    {required: true, message: '请输入名称'},
                    {min: 2, max: 10, message: '长度在 2 到 10 个字符'}
                ],
                icon: [{required: true, message: '请选择图标'}],
                target: [{required: true, message: '请输入目标'}],
                apiUrl: [{required: true, message: '请输入请求地址'}]
            }
        }
    },
    computed: {
		svgicons: () => requireAllName(req)
	},
    methods: {
        handSelectMenu(data) {
            if (data) {
                this.menu.parentId = data.id
                this.menu.parentName = data.name
            }
            this.isAddVisible = false
        },
        handSelectIcon() {
			this.iconTxt = this.menu.icon
			this.selectIconVisible = false
		},
        save() {
            this.$refs['ruleForm'].validate(valid => {
                if (!valid) return
                SysMenu.add(this.menu).then(res => {
                    Message.success('成功！')
					this.$router.push({name: 'tmsmenu'})
                })
            })
        },
        back() {
            this.$router.go(-1)
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
