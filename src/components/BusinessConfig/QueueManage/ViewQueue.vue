<template>
	<div class="main-content">
		<el-card class="box-card">
			<div slot="header" class="clearfix">
				<span>查看队列配置</span>
			</div>
			<el-row>
				<el-col :span="8">
					<el-form label-width="120px">
						<el-form-item label="业务名称">
							<p>{{queue.opType}}</p>
						</el-form-item>
						<el-form-item label="业务ID">
							<p>{{queue.opID}}</p>
						</el-form-item>
						<el-form-item label="业务参数">
							<p>{{queue.opArgs}}</p>
						</el-form-item>
						<el-form-item label="业务接口">
							<p>{{queue.opInterface}}</p>
						</el-form-item>
						<el-form-item label="修改人">
							<p>{{queue.updateBy}}</p>
						</el-form-item>
					</el-form>
				</el-col>
				<el-col :span="8">
					<el-form label-width="120px">
						<el-form-item label="业务时间">
							<p>{{queue.opTime | getdatefromtimestamp()}}</p>
						</el-form-item>
						<el-form-item label="是否暂停推送">
							<p>{{queue.isPausePush=='Y'?'是':'否'}}</p>
						</el-form-item>
						<el-form-item label="是否已推送">
							<p>{{queue.isPush=='Y'?'是':'否'}}</p>
						</el-form-item>
						<el-form-item label="是否已处理">
							<p>{{queue.isFinish=='Y'?'是':'否'}}</p>
						</el-form-item>
						<el-form-item label="修改时间">
							<p>{{queue.updateTime ? (queue.updateTime | getdatefromtimestamp()) : ''}}</p>
						</el-form-item>
					</el-form>
				</el-col>
				<el-col :span="8">
					<el-form label-width="120px">
						<el-form-item label="处理记录数">
							<p>{{queue.execRows}}</p>
						</el-form-item>
						<el-form-item label="处理结果">
							<p>{{queue.execContent}}</p>
						</el-form-item>
						<el-form-item label="创建人">
							<p>{{queue.createBy}}</p>
						</el-form-item>
						<el-form-item label="创建时间">
							<p>{{queue.createTime | getdatefromtimestamp()}}</p>
						</el-form-item>
					</el-form>
				</el-col>
				<el-col :span="24">
					<el-form label-width="120px">
						<el-form-item>
							<el-button @click="back">返回</el-button>
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
	export default {
		data() {
			return {
				queue: {
					opType:'',
					opID:'',
					opArgs:'',
					opInterface:'',
					opTime:''
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
						Message.success(res.data.message)
						this.queue = res.data.data
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