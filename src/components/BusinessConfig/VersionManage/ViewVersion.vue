<template>
	<div class="main-content">
		<el-card class="box-card">
			<div slot="header" class="clearfix">
				<span>查看App版本</span>
			</div>
			<el-form label-width="120px">
				<el-row>
					<el-col :span="6">
						<el-form-item label="用户设备">
							<p v-if="version.deviceType =='Android'">安卓端</p>
							<p v-else-if="version.deviceType =='iOS'">苹果端</p>
						</el-form-item>
						
					</el-col>
					<el-col :span="6">
						<el-form-item label="APP名称">
							<p>{{version.appName}}</p>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="6">
						<el-form-item label="最低版本号">
							<p>{{version.versionMin}}</p>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="主版本号">
							<p>{{version.version}}</p>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="版本大小">
							<p>{{version.versionSize}}</p>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="是否最新版本">
							<p>{{version.isLatest=='Y'?'是':'否'}}</p>
						</el-form-item>
					</el-col>
				</el-row>
				<el-form-item label="下载URL">
					<p>{{version.downloadURL}}</p>
				</el-form-item>
				<el-form-item label="版本说明">
					<p>{{version.content}}</p>
				</el-form-item>
				<el-form-item label="版本详情">
					<p v-html="version.richTextContent"></p>
				</el-form-item>
				<el-form-item label="App下载页面">
					<p v-html="version.downloadRichText"></p>
				</el-form-item>
				<el-form-item>
					<el-button @click="back">返回</el-button>
				</el-form-item>
			</el-form>
		</el-card>
	</div>
</template>
<script type="text/javascript">
import { Message } from 'element-ui'
import SetAppVersion from '../../../api/SetAppVersion'
export default {
	data() {
		return {
			version: {}
		}
	},
	created() {
		this.getInfo()
	},
	methods: {
		getInfo() {
			const appVersionID = this.$route.query.appVersionID
			SetAppVersion.findById({ appVersionID }).then(res => {
				this.version = res
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
		min-height 40px
		font-family 'sans-serif'
		line-height 40px
		color #999
	.el-input__inner
		vertical-align top
</style>