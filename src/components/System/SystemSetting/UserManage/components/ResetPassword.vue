<template>
    <el-dialog 
        title="分配权限" 
        :visible.sync="isVisible" 
        :show-close="false" 
        :close-on-click-modal="false" 
        width="60%" 
        :append-to-body="true">
        <el-form label-width="120px" :model="user" :rules="rules" ref="ruleForm">
            <el-form-item label="新密码" prop="password">
                <el-input placeholder="请输入密码" v-model="user.password"></el-input>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="close">取 消</el-button>
            <el-button type="primary" @click="save">确 定</el-button>
        </span>
    </el-dialog>
</template>

<script>
import { Message } from 'element-ui'
import SysUser from '../../../../../api/SysUser'
export default {
    props: {
        userID: String,
        isVisible: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            user: {
                password: ''
            },
            rules: {
				password: [
                    { required: true, message: '请输入密码' },
                    { min: 8, max: 16, message: '密码必须是8-16位字母、下划线、数字' }
                ]
			}
        }
    },
    watch: {
        isVisible(val) {
            if (val) {
                this.user.password = ''
            }
        }
    },
    methods: {
        save() {
            this.$refs['ruleForm'].validate(valid => {
				if (!valid) return
				SysUser.updatePassword({
                    userID: this.userID,
                    password: this.user.password
                }).then(res => {
					Message.success('成功！')
					this.$emit('control')
				})
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
