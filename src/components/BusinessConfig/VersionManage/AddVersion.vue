<template>
	<div class="main-content">
		<el-card class="box-card">
			<div slot="header" class="clearfix">
				<span>添加App版本</span>
			</div>
			<el-form label-width="120px" :model="Version" :rules="rules" ref="ruleForm">
				<el-row>
					<el-col :span="6">
						<el-form-item label="用户设备" prop="deviceType">
							<el-select v-model="Version.deviceType" placeholder="请选择" style="width:100%">
								<el-option label="安卓端" value="Android"></el-option>
								<el-option label="苹果端" value="IOS"></el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="类型" prop="type">
							<el-select v-model="Version.type" placeholder="请选择" style="width:100%">
								<el-option label="司机端" value="Driver"></el-option>
								<el-option label="货主端" value="Shipper"></el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="APP名称" prop="appID">
							<el-select v-model="Version.appID" placeholder="请选择" style="width:100%" @change="selectAppName">
								<el-option v-for="item in appNameList" :key="item.appID" :label="item.name" :value="item.appID">
								</el-option>
							</el-select>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>	
					<el-col :span="6">
						<el-form-item label="最低版本号" prop="versionMin">
							<el-input v-model="Version.versionMin"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="主版本号" prop="version">
							<el-input v-model="Version.version"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="版本大小" prop="versionSize">
							<el-input v-model="Version.versionSize"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="是否最新版本">
							<el-switch v-model="Version.isLatest"></el-switch>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="24">
						<el-form-item label="下载URL" prop="downloadURL">
							<el-input v-model="Version.downloadURL"></el-input>
						</el-form-item>
						<el-form-item label="版本说明">
							<el-input type="textarea" resize="none" v-model="Version.content"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="24">
						<el-form-item>
							<el-button type="primary" @click="saveVersion">立即保存</el-button>
							<el-button @click="back">取消</el-button>
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
import { checkURL } from '../../../common/validator'
export default {
	data() {
		return {
			appNameList:[],
			Version: {
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
				type: [
					{required: true, message: '请选择类型'}
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
					{validator: checkURL}
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
	methods: {
		getAppNameList(){
			requestJava({
				url: '/sys/apps',
				method: 'get'
			}).then(res => {
				if (res.data.code == 200) {
					this.appNameList = res.data.data
				} else {
					Message.error(res.data.msg)
				}
			})
		},
		saveVersion() {
			let data = {
				deviceType: this.Version.deviceType,
				type: this.Version.type,
				versionSize: this.Version.versionSize,
				version: this.Version.version,
				versionMin: this.Version.versionMin,
				isLatest: this.Version.isLatest ? 'Y' : 'N',
				downloadURL: this.Version.downloadURL,
				content: this.Version.content,
				appID:this.Version.appID
			}
			// console.log(data)
			this.$refs['ruleForm'].validate(valid => {
				if (valid) {
					requestJava({
						url: '/setAppVersion/save',
						method: 'post',
						data
					}).then(res => {
						if (res.data.code == 200) {
							Message.success(res.data.message)
							this.$router.push({ name: 'versionmanage' })
						} else {
							Message.error(res.data.message)
						}
					})
				}
			})
		},
		// selectAppName(val){
		// 	let obj = {};
		//       obj = this.appNameList.find((item)=>{
		//           return item.appID === val;
		//       });
		//       console.log(val,obj.name)
		// },
		back() {
			this.$router.go(-1)
		}
	}
}

</script>
<style lang="stylus" scoped>


</style>
