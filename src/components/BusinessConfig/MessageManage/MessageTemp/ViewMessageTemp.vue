<template>
	<div class="main-content">
		<el-card class="box-card">
			<div slot="header" class="clearfix">
				<span>查看消息模板</span>
			</div>
			<el-row>
				<el-col :span="14" :offset="5">
					<el-form label-width="120px">
						<el-form-item label="APP页面">
							<p>{{setMessagetemplate.AppPage && setMessagetemplate.AppPage.Name}}</p>
						</el-form-item>
						<el-form-item label="跳转URL">
							<p>{{setMessagetemplate.ForwardURL}}</p>
						</el-form-item>
						<el-form-item label="JSON跳转样例">
							<p>{{setMessagetemplate.JSONForward}}</p>
						</el-form-item>
						<el-form-item label="代码">
							<p>{{setMessagetemplate.Code}}</p>
						</el-form-item>
						<el-form-item label="名称">
							<p>{{setMessagetemplate.Name}}</p>
						</el-form-item>
                        <el-form-item label="标题">
							<p>{{setMessagetemplate.Title}}</p>
						</el-form-item>
						<el-form-item label="类型">
							<p v-if="setMessagetemplate.type == 'SystemMsg'">通知</p>
                            <p v-else-if="setMessagetemplate.type == 'SubscribeMsg'">订阅</p>
                            <p v-else-if="setMessagetemplate.type == 'GoodsMsg'">货源</p>
                            <p v-else-if="setMessagetemplate.type == 'WalletMsg'">钱包</p>
						</el-form-item>
                        <el-form-item label="图标">
							<p>{{setMessagetemplate.IconURL}}</p>
						</el-form-item>
                        <el-form-item label="格式">
							<p>{{setMessagetemplate.Content}}</p>
						</el-form-item>
                        <el-form-item label="JSON样例">
							<p>{{setMessagetemplate.JSONSample}}</p>
						</el-form-item>
                        <el-form-item label="是否有效">
							<p>{{setMessagetemplate.IsEnable == 'y' ? '是' : '否'}}</p>
						</el-form-item>
                        <el-form-item label="极光类型">
							<p>{{setMessagetemplate.PushType}}</p>
						</el-form-item>
                        <el-form-item label="创建时间">
							<p>{{new Date(setMessagetemplate.CreateTime).getTime() | getdatefromtimestamp()}}</p>
						</el-form-item>
                        <el-form-item label="创建人">
							<p>{{setMessagetemplate.createBy && setMessagetemplate.createBy.Name}}</p>
						</el-form-item>
                        <el-form-item label="更新时间">
							<p>{{new Date(setMessagetemplate.UpdateTime).getTime() | getdatefromtimestamp()}}</p>
						</el-form-item>
                        <el-form-item label="修改人">
							<p>{{setMessagetemplate.updateBy && setMessagetemplate.updateBy.Name}}</p>
						</el-form-item>
                        <el-form-item label="是否删除">
							<p>{{setMessagetemplate.DeleteFlag == 'Y' ? '是' : '否'}}</p>
						</el-form-item>
                        <el-form-item label="删除时间">
							<p>{{setMessagetemplate.DeleteTime ? (new Date(setMessagetemplate.DeleteTime).getTime() | getdatefromtimestamp()) : ''}}</p>
						</el-form-item>
                        <el-form-item label="删除人">
							<p>{{setMessagetemplate.deleteBy && setMessagetemplate.deleteBy.Name}}</p>
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
				setMessagetemplate: {}
			}
		},
		created() {
			this.getMessagetemplate()
		},
		methods: {
			getMessagetemplate() {
				let params = {
					MessageTemplate_ID: this.$route.query.MessageTemplate_ID
				}
				request({
					url: '/set_messagetemplate/info',
					method: 'get',
					params
				}).then(res => {
					if (res.data.code == 0) {
						this.setMessagetemplate = res.data.data
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