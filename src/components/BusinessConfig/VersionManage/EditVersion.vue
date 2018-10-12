<template>
	<div class="main-content">
		<el-card class="box-card">
			<div slot="header" class="clearfix">
				<span>编辑App版本</span>
			</div>
			<el-form label-width="120px" :model="version" :rules="rules" ref="ruleForm">
				<el-row>
					<el-col :span="8">
						<el-form-item label="用户设备" prop="deviceType">
							<el-select v-model="version.deviceType" placeholder="请选择" style="width:100%">
								<el-option label="安卓端" value="Android"></el-option>
								<el-option label="苹果端" value="iOS"></el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="APP名称" prop="appID">
							<el-select v-model="version.appID" placeholder="请选择" style="width:100%">
								<el-option v-for="item in appNameList" :key="item.appID" :label="item.name" :value="item.appID"></el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="是否最新版本">
							<el-switch v-model="version.isLatest"></el-switch>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>	
					<el-col :span="8">
						<el-form-item label="最低版本号" prop="versionMin">
							<el-input v-model="version.versionMin"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="主版本号" prop="version">
							<el-input v-model="version.version"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="版本大小" prop="versionSize">
							<el-input v-model="version.versionSize"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-form-item label="下载URL" prop="downloadURL">
						<el-input v-model="version.downloadURL"></el-input>
					</el-form-item>
					<el-form-item label="版本说明">
						<el-input type="textarea" resize="none" v-model="version.content"></el-input>
					</el-form-item>
					<el-form-item label="版本详情">
						<div id="editor"></div>
					</el-form-item>
					<el-form-item label="App下载页面">
						<div id="editor2"></div>
					</el-form-item>
					<el-form-item>
						<el-button type="primary" @click="saveVersion">立即保存</el-button>
						<el-button @click="back">取消</el-button>
					</el-form-item>
				</el-row>
			</el-form>
		</el-card>
	</div>
</template>
<script type="text/javascript">
import { Message } from 'element-ui'
import E from 'wangeditor'
import SetAppVersion from '../../../api/SetAppVersion'
import Sys from '../../../api/Sys'
import { checkURL } from '../../../common/validator'
export default {
	data() {
		return {
			appNameList:[],
			editor: null,
			editor2: null,
			version: {
				deviceType: '',
				type: '',
				versionSize: '',
				version: '',
				versionMin: '',
				isLatest: true,
				downloadURL: '',
				content: '',
				appID:''
			},
			rules: {
				deviceType: [
					{required: true, message: '请选择设备类型'}
				],
				version: [
					{required: true, message: '请输入主版本号'},
					{min: 2, max: 200, message: '长度在 2 到 200 个字符'}
				],
				versionSize: [
					{required: true, message: '请输入版本大小'},
					{min: 2, max: 200, message: '长度在 2 到 200 个字符'}
				],
				versionMin: [
					{required: true, message: '请输入最低版本号'},
					{min: 2, max: 200, message: '长度在 2 到 200 个字符'}
				],
				downloadURL: [
					{required: true, message: '请输入下载URL'},
					// {validator: checkURL}
				],
				appID:[
					{required: true, message: '请选择App名称'}
				]
			}
		}
	},
	created() {
		this.getAppNameList()
	},
	mounted() {
		this.editor = new E('#editor')
		this.editor2 = new E('#editor2')
		this.editor.customConfig.zIndex = 100
		this.editor2.customConfig.zIndex = 100
		this.editor.customConfig.uploadImgShowBase64 = true
		this.editor2.customConfig.uploadImgShowBase64 = true
		this.editor.customConfig.uploadImgHooks = {
			customInsert: (insertImg, result, editor) => {
				result.data.forEach(item => {
					insertImg(this.imgUrl + item)
				})
			}
		}
		this.editor2.customConfig.uploadImgHooks = {
			customInsert: (insertImg, result, editor) => {
				result.data.forEach(item => {
					insertImg(this.imgUrl + item)
				})
			}
		}
		this.editor.create()
		this.editor2.create()
	},
	beforeDestroy() {
		this.editor = null
		this.editor2 = null
	},
	methods: {
		getAppNameList(){
			Sys.apps().then(res => {
				this.appNameList = res
				this.getInfo()
			})
		},
		getInfo() {
			const appVersionID = this.$route.query.appVersionID
			SetAppVersion.findById({ appVersionID }).then(res => {
				this.version = res
				this.version.isLatest = res.isLatest == 'Y' ? true : false
				this.$nextTick(() => {
					this.editor.txt.html(this.version.richTextContent)
					this.editor2.txt.html(this.version.downloadRichText)
				})
			})
		},
		saveVersion() {
			const data = Object.assign({}, this.version)
			delete data.createTime
			data.isLatest = this.version.isLatest ? 'Y' : 'N'
			data.richTextContent = this.editor.txt.html()
			data.downloadRichText = this.editor2.txt.html()
			this.$refs['ruleForm'].validate(valid => {
				if (!valid) return
				SetAppVersion.save(data).then(res => {
					Message.success(res.data.message)
					this.$router.push({ name: 'versionmanage' })
				})
			})
		},
		back() {
			this.$router.go(-1)
		}
	}
}

</script>
<style lang="stylus" scoped>


</style>
