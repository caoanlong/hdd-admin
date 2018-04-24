<template>
	<div class="main-content">
		<el-card class="box-card">
			<div slot="header" class="clearfix">
				<span>编辑常量</span>
			</div>
			<el-row :gutter="20">
				<el-col :span="12" :offset="6">
					<el-form label-width="120px" :model="info" :rules="rules" ref="ruleForm">
						<el-form-item label="代码" prop="code">
							<el-input placeholder="请输入..." v-model="info.code"></el-input>
						</el-form-item>
						<el-form-item label="名称" prop="name">
							<el-input placeholder="请输入..." v-model="info.name"></el-input>
						</el-form-item>
                        <el-form-item label="值" prop="value">
							<el-input placeholder="请输入..." v-model="info.value"></el-input>
						</el-form-item>
                        <el-form-item label="序号" prop="sortNumber">
                            <el-input-number v-model="info.SortNumber" :min="1"></el-input-number>
						</el-form-item>
						<el-form-item label="常量类型" prop="type">
							<el-input placeholder="请输入..." v-model="info.type"></el-input>
						</el-form-item>
						<el-form-item label="描述" prop="description">
							<el-input type="textarea" placeholder="请输入..." v-model="info.description"></el-input>
						</el-form-item>
                        <el-form-item label="是否标准常量" prop="stdConstFlag">
                            <el-switch v-model="info.stdConstFlag"></el-switch>
						</el-form-item>
						<el-form-item>
							<el-button type="primary" @click="save">保存</el-button>
							<el-button @click="back">返回</el-button>
						</el-form-item>
					</el-form>
				</el-col>
			</el-row>
		</el-card>
	</div>
</template>
<script type="text/javascript">
	import requestJava from '../../../../common/requestJava'
	import { Message } from 'element-ui'
	export default {
		data() {
			return {
				info: {
					'code': '',
                    'name': '',
                    'value': '',
					'sortNumber': 1,
					'type': '',
					'description': '',
					'stdConstFlag': true
				},
				rules: {
					code: [
						{required: true, message: '请输入代码'},
						{min: 2, max: 10, message: '长度在 2 到 10 个字符'}
                    ],
                    name: [
                        {required: true, message: '请输入名称'},
                        {min: 2, max: 10, message: '长度在 2 到 10 个字符'}
					],
					value: [
						{required: true, message: '请输入值'},
						{min: 2, max: 10, message: '长度在 2 到 10 个字符'}
					],
					type: [
						{required: true, message: '请输入类型'},
						{min: 2, max: 20, message: '长度在 2 到 20 个字符'}
					],
					description: [
                        {required: true, message: '请输入描述'},
                        {min: 2, max: 50, message: '长度在 2 到 50 个字符'}
                    ]
				}
			}
        },
        created() {
            this.getInfo()
        },
		methods: {
			save() {
                let data = this.info
                data.stdConstFlag = this.info.stdConstFlag ? 'Y' : 'N'
				this.$refs['ruleForm'].validate(valid => {
					if (valid) {
						requestJava({
							url: '/admin/baseConst/update',
							method: 'post',
							data
						}).then(res => {
							Message.success('成功！')
						}).catch(err => {})
					}
				})
            },
            getInfo() {
                let params = {
					constStdID: this.$route.query.constStdID
				}
				requestJava({
					url: '/customer/findById',
					params
				}).then(res => {
                    this.info = res.data.data
                    this.info.stdConstFlag = res.data.data.stdConstFlag == 'Y' ? true : false
				}).catch(err => {})
			},
			back() {
				this.$router.go(-1)
			}
		}
	}
</script>
<style lang="stylus" scoped>
.el-form-item__content
	p
		margin 0
		border 1px solid #fff
		border-bottom-color #dcdfe6
		padding 0 15px
		height 40px
		font-family 'sans-serif'
		line-height 40px
		color #999
	.el-input__inner
		vertical-align top
</style>