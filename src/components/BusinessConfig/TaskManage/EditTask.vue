<template>
	<div class="main-content">
		<el-card class="box-card">
			<div slot="header" class="clearfix">
				<span>编辑定时任务</span>
			</div>
			<el-row>
				<el-col :span="14" :offset="5">
					<el-form label-width="120px" :model="schedule" :rules="rules" ref="ruleForm">
						<el-form-item label="任务名称" prop="jobName">
							<el-input v-model="schedule.jobName"></el-input>
						</el-form-item>
						<el-form-item label="类的BeanId" prop="springBeanId">
							<el-input v-model="schedule.springBeanId"></el-input>
						</el-form-item>
						<el-form-item label="类名" prop="beanClass">
							<el-input v-model="schedule.beanClass"></el-input>
						</el-form-item>
						<el-form-item label="方法名" prop="methodName">
							<el-input v-model="schedule.methodName"></el-input>
						</el-form-item>
						<el-form-item label="任务分组" prop="jobGroup">
							<el-input v-model="schedule.jobGroup"></el-input>
						</el-form-item>
                        <el-form-item label="任务别名" prop="aliasName">
							<el-input v-model="schedule.aliasName"></el-input>
						</el-form-item>
                        <el-form-item label="时间表达式" prop="cronExpression">
							<el-input v-model="schedule.cronExpression"></el-input>
						</el-form-item>
                        <el-form-item label="是否异步">
                            <el-switch v-model="schedule.isSync"></el-switch>
						</el-form-item>
                        <el-form-item label="任务执行url" prop="url">
							<el-input v-model="schedule.url"></el-input>
						</el-form-item>
                        <el-form-item label="任务描述">
							<el-input v-model="schedule.description"></el-input>
						</el-form-item>
						<el-form-item>
							<el-button type="primary" @click="updateSchedule">立即保存</el-button>
							<el-button @click="back">取消</el-button>
						</el-form-item>
					</el-form>
				</el-col>
			</el-row>
		</el-card>
	</div>
</template>
<script type="text/javascript">
	import requestJava from '../../../common/requestJava'
	import { Message } from 'element-ui'
	import { checkURL } from '../../../common/validator'
	export default {
		data() {
			return {
				schedule: {
                    jobName: '',
                    springBeanId: '',
                    beanClass: '',
                    methodName: '',
                    jobGroup: '',
                    aliasName: '',
                    cronExpression: '',
                    isSync: true,
                    url: '',
                    description: ''
				},
				rules: {
					jobName: [
						{required: true, message: '请输入任务名称'},
						{min: 2, max: 50, message: '长度在 2 到 50 个字符'}
					],
					springBeanId: [
						{required: true, message: '请输入类的BeanId'},
						{min: 2, max: 200, message: '长度在 2 到 200 个字符'}
					],
					beanClass: [
						{required: true, message: '请输入类名'},
						{min: 2, max: 100, message: '长度在 2 到 100 个字符'}
					],
					methodName: [
						{required: true, message: '请输入方法名'},
						{min: 2, max: 100, message: '长度在 2 到 100 个字符'}
					],
					jobGroup: [
						{required: true, message: '请输入任务分组'},
						{min: 2, max: 100, message: '长度在 2 到 100 个字符'}
					],
					aliasName: [
						{required: true, message: '请输入任务别名'},
						{min: 2, max: 100, message: '长度在 2 到 100 个字符'}
					],
					cronExpression: [
						{required: true, message: '请输入时间表达式'},
						{min: 2, max: 100, message: '长度在 2 到 100 个字符'}
					],
					url: [
						{validator: checkURL}
					]
				}
			}
        },
        created() {
            this.getSchedule()
        },
		methods: {
			updateSchedule() {
				let data= {
                    jobId: this.$route.query.jobId,
					jobName: this.schedule.jobName,
					springBeanId: this.schedule.springBeanId,
					beanClass: this.schedule.beanClass,
					methodName: this.schedule.methodName,
					jobGroup: this.schedule.jobGroup,
					aliasName: this.schedule.aliasName,
					cronExpression: this.schedule.cronExpression,
					isSync: this.schedule.isSync ? 'Y' : 'N',
					url: this.schedule.url,
                    description: this.schedule.description,
                    keywords: 'delUpdate'
				}
				this.$refs['ruleForm'].validate(valid => {
					if (valid) {
						requestJava({
							url: '/scheduler/saveScheduleJob',
							method: 'post',
							data
						}).then(res => {
							if (res.data.code == 200) {
								Message.success(res.data.message)
								this.$router.push({name: 'taskmanage'})
							} else {
								Message.error(res.data.message)
							}
						})
					}
				})
            },
            getSchedule() {
                let params = {
                    jobId: this.$route.query.jobId
                }
				requestJava({
					url: '/scheduler/inputScheduleJob',
                    method: 'get',
                    params
				}).then(res => {
					if (res.data.code == 200) {
                        this.schedule = res.data.data
                        this.schedule.isSync = res.data.data.isSync == 'Y' ? true : false
						console.log(res.data.data)
					} else {
						Message.error(res.data.message)
					}
				})
            },
			back() {
				this.$router.go(-1)
			}
		}
	}
</script>
<style lang="stylus" scoped>
.avatar-uploader
	line-height 1
	width 100px
	height 100px
	overflow hidden
	border 1px dashed #d9d9d9
	border-radius 6px
	&:hover 
		border-color #409eff
	.avatar-uploader-icon
		font-size 28px
		color #8c939d
		width 98px
		height 98px
		line-height 98px
		text-align center
	.avatar
		width 98px
		height 98px
		display block
		vertical-align top
</style>