<template>
	<div class="main-content">
		<el-card class="box-card">
			<div slot="header" class="clearfix">
				<span>查看消息</span>
			</div>
			<el-row>
				<el-col :span="14" :offset="5">
					<el-form label-width="120px">
						<el-form-item label="推送页面">
							<p>{{setMessage.msgTemplate.AppPage.Name}}</p>
						</el-form-item>
						<el-form-item label="接收人">
							<p>{{setMessage.mem_rec ? setMessage.mem_rec.RealName : ''}}</p>
						</el-form-item>
						<el-form-item label="发送人">
							<p>{{setMessage.mem_send ? setMessage.mem_send.RealName : ''}}</p>
						</el-form-item>
						<el-form-item label="内容">
							<p>{{setMessage.Content}}</p>
						</el-form-item>
						<el-form-item label="业务ID">
							<p>{{setMessage.OpID}}</p>
						</el-form-item>
                        <el-form-item label="推送状态">
							<p>{{setMessage.PushStatus == 'Success' ? '成功' : '失败'}}</p>
						</el-form-item>
                        <el-form-item label="推送时间">
							<p v-if="setMessage.PushTime">{{new Date(setMessage.PushTime).getTime() | getdatefromtimestamp()}}</p>
                            <p v-else></p>
						</el-form-item>
                        <el-form-item label="推送结果">
							<p>{{setMessage.PushResult}}</p>
						</el-form-item>
                        <el-form-item label="极光类型">
							<p>{{setMessage.PushType}}</p>
						</el-form-item>
                        <el-form-item label="极光ID">
							<p>{{setMessage.PushID}}</p>
						</el-form-item>
                        <el-form-item label="更新时间">
							<p v-if="setMessage.UpdateTime">{{new Date(setMessage.UpdateTime).getTime() | getdatefromtimestamp()}}</p>
                            <p v-else></p>
						</el-form-item>
                        <el-form-item label="是否查看">
							<p>{{setMessage.IsView == 'N' ? '否' : '是'}}</p>
						</el-form-item>
                        <el-form-item label="App类型">
							<p>{{setMessage.AppType}}</p>
						</el-form-item>
                        <el-form-item label="手机类型">
							<p>{{setMessage.PhoneType}}</p>
						</el-form-item>
                        <el-form-item label="推送消息标题">
							<p>{{setMessage.Title}}</p>
						</el-form-item>
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
	import request from '../../../../common/request'
	import { Message } from 'element-ui'
	export default {
		data() {
			return {
				setMessage: {
                    msgTemplate: {
                        AppPage: {}
                    },
                    mem_rec: {},
                    mem_send: {}
                }
			}
		},
		created() {
			this.getMessage()
		},
		methods: {
			getMessage() {
				let params = {
					Msg_ID: this.$route.query.Msg_ID
				}
				request({
					url: '/set_message/info',
					method: 'get',
					params
				}).then(res => {
					if (res.data.code == 0) {
						this.setMessage = res.data.data
					} else {
						Message.error(res.data.msg)
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