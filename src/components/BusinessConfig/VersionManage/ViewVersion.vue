<template>
	<div class="main-content">
		<el-card class="box-card">
			<div slot="header" class="clearfix">
				<span>查看App版本</span>
			</div>
			<el-form label-width="120px">
				<el-row>
					<el-col :span="8">
						<el-form-item label="用户设备">
							<p v-if="Version.deviceType =='Android'">安卓端</p>
							<p v-else-if="Version.deviceType =='iOS'">苹果端</p>
						</el-form-item>
						<el-form-item label="最低版本号">
							<p>{{Version.versionMin}}</p>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="类型">
							<p v-if="Version.type =='Driver'">司机端</p>
							<p v-else-if="Version.type =='Shipper'">货主端</p>
						</el-form-item>
						<el-form-item label="版本大小">
							<p>{{Version.versionSize}}</p>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="主版本号">
							<p>{{Version.version}}</p>
						</el-form-item>
						<el-form-item label="是否最新版本">
							<p>{{Version.isLatest=='Y'?'是':'否'}}</p>
						</el-form-item>
					</el-col>
					<el-col :span="24">
						<el-form-item label="下载URL">
							<p>{{Version.downloadURL}}</p>
						</el-form-item>
						<el-form-item label="版本说明">
							<p>{{Version.content}}</p>
						</el-form-item>
					</el-col>
					<el-col :span="24">
						<el-form-item>
							<el-button @click="back">返回</el-button>
						</el-form-item>
					</el-col>
				</el-row>
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
			Version: {}
		}
	},
	created() {
		this.ViewVersion()
	},
	methods: {
		ViewVersion() {
			let params = {
				appVersionID: this.$route.query.appVersionID
			}
			requestJava({
				url: '/setAppVersion/info',
				method: 'get',
				params
			}).then(res => {
				if (res.data.code == 200) {
					this.Version = res.data.data
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