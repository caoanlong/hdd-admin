<template>
	<div class="main-content">
		<el-card class="box-card">
			<div slot="header" class="clearfix">
				<span>查看API请求日志</span>
			</div>
			<el-row>
				<el-col :span="14" :offset="5">
					<el-form label-width="120px">
						<el-form-item label="用户ID" ><p>{{apiLog.Mem_ID}}</p></el-form-item>
						<el-form-item label="设备类型" ><p>{{apiLog.DeviceType == 'iOS' ? '苹果端' : '安卓端'}}</p></el-form-item>
						<el-form-item label="日志类型" ><p>{{apiLog.LogType}}</p></el-form-item>
						<el-form-item label="请求Uri" ><p>{{apiLog.Uri}}</p></el-form-item>
						<el-form-item label="请求方式" ><p>{{apiLog.Method}}</p></el-form-item>
						<el-form-item label="请求参数" ><p>{{apiLog.ReqParams}}</p></el-form-item>
						<el-form-item label="响应参数" ><p>{{apiLog.RespParams}}</p></el-form-item>
						<el-form-item label="请求时间" ><p>{{new Date(apiLog.RequestDate).getTime() | getdatefromtimestamp()}}</p></el-form-item>
						<el-form-item label="响应时间" ><p>{{new Date(apiLog.ResponseDate).getTime() | getdatefromtimestamp()}}</p></el-form-item>
						<el-form-item label="客户端IP" ><p>{{apiLog.IP}}</p></el-form-item>
						<el-form-item label="客户端代理类型" ><p>{{apiLog.UserAgent}}</p></el-form-item>
						<el-form-item label="异常信息" ><p>{{apiLog.ExceptionInfo}}</p></el-form-item>
						<el-form-item label="创建时间" ><p>{{new Date(apiLog.CreateDate).getTime() | getdatefromtimestamp()}}</p></el-form-item>
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
	import request from '../../../common/request'
	import { Message } from 'element-ui'
	export default {
		data() {
			return {
				apiLog: {
					ConstStd_ID:'',
					Type:'',
					Code:'',
					Name:'',
					Value:'',
					Description:'',
					SortNumber:''
				}
			}
		},
		created() {
			this.getApiLog()
		},
		methods: {
			getApiLog() {
				let params = {
					Log_ID: this.$route.query.Log_ID
				}
				request({
					url: '/sys_logapi/info',
					method: 'get',
					params
				}).then(res => {
					if (res.data.code == 0) {
						this.apiLog = res.data.data
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
</style>