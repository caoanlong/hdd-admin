<template>
	<div class="main-content">
		<el-card class="box-card">
			<div slot="header" class="clearfix">
				<span>编辑队列配置</span>
			</div>
			<el-form label-width="120px" :model="queue" :rules="rules" ref="ruleForm">
				<el-row>
					<el-col :span="8">
						<el-form-item label="业务名称" prop="opType">
							<el-input v-model="queue.opType"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="业务ID" prop="opID">
							<el-input v-model="queue.opID"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="业务时间" prop="opTime">
							<el-date-picker v-model="queue.opTime" type="datetime" placeholder="选择日期时间"></el-date-picker>
						</el-form-item>
					</el-col>
				</el-row>
				<el-form-item label="业务参数" prop="opArgs">
					<el-input type="textarea" resize="none" v-model="queue.opArgs"></el-input>
				</el-form-item>
				<el-form-item label="业务接口">
					<el-input type="textarea" resize="none" v-model="queue.opInterface"></el-input>
				</el-form-item>
				<el-form-item label="是否暂停推送">
					<el-switch v-model="queue.isPausePush"></el-switch>
				</el-form-item>
				<el-form-item label="是否已推送">
					<el-switch v-model="queue.isPush"></el-switch>
				</el-form-item>
				<el-form-item label="是否已处理">
					<el-switch v-model="queue.isFinish"></el-switch>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="saveQueue">立即保存</el-button>
					<el-button @click="back">取消</el-button>
				</el-form-item>
			</el-form>
		</el-card>
	</div>
</template>
<script type="text/javascript">
	import requestJava from '../../../common/requestJava'
	import { Message } from 'element-ui'
	export default {
		data() {
			return {
				queue: {
					queueID: '',
					opType: '',
					opID: '',
					opArgs: '',
					opInterface: '',
					opTime: '',
					isPausePush: false,
					isPush: false,
					isFinish: false
				},
				rules: {
					opType: [
						{required: true, message: '请输入业务名称'},
						{min: 2, max: 50, message: '长度在 2 到 50 个字符'}
					],
					opID: [
						{required: true, message: '请输入业务ID'}
					],
					opArgs: [
						{required: true, message: '请输入业务参数'},
						{min: 2, max: 500, message: '长度在 2 到 500 个字符'}
					],
					opTime: [
						{required: true, message: '请选择业务时间'}
					]
				}
			}
		},
		created() {
			this.ViewQueue()
		},
		methods: {
			ViewQueue() {
				let params = {
					queueID: this.$route.query.queueID
				}
				requestJava({
					url: '/setQueue/configuration/info',
					method: 'get',
					params
				}).then(res => {
					if (res.data.code == 200) {
						this.queue = res.data.data
						console.log(res.data.data)
						this.queue.isPausePush = res.data.data.isPausePush == 'Y' ? true : false
						this.queue.isPush = res.data.data.isPush == 'Y' ? true : false
						this.queue.isFinish = res.data.data.isFinish == 'Y' ? true : false
					} else {
						Message.error(res.data.message)
					}
				})
			},
			saveQueue() {
				let data= {
					queueID:this.$route.query.queueID,
					opType:this.queue.opType,
					opID:this.queue.opID,
					opArgs:this.queue.opArgs,
					opInterface:this.queue.opInterface,
					opTimeTs: new Date(this.queue.opTime).getTime(),
					isPausePush:this.queue.isPausePush?'Y':'N',
					isPush:this.queue.isPush?'Y':'N',
					isFinish:this.queue.isFinish?'Y':'N'
				}
				this.$refs['ruleForm'].validate(valid => {
					if (valid) {
						requestJava({
							url: '/setQueue/configuration/save',
							method: 'post',
							data
						}).then(res => {
							if (res.data.code == 200) {
								Message.success(res.data.message)
								this.$router.push({name: 'queuemanage'})
							} else {
								Message.error(res.data.message)
							}
						})
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