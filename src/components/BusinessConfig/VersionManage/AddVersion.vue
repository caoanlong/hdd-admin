<template>
	<div class="main-content">
		<el-card class="box-card">
			<div slot="header" class="clearfix">
				<span>添加App版本</span>
			</div>
			<el-row>
				<el-col :span="8">
					<el-form label-width="120px">
						<el-form-item label="用户设备">
							<el-select v-model="Version.deviceType" placeholder="请选择">
								<el-option label="安卓端" value="Android"></el-option>
								<el-option label="苹果端" value="IOS"></el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="最低版本号">
							<el-input v-model="Version.versionMin"></el-input>
						</el-form-item>
					</el-form>
				</el-col>
				<el-col :span="8">
					<el-form label-width="120px">
						<el-form-item label="类型">
							<el-select v-model="Version.type" placeholder="请选择">
								<el-option label="司机端" value="Driver"></el-option>
								<el-option label="货主端" value="Shipper"></el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="版本大小">
							<el-input v-model="Version.versionSize"></el-input>
						</el-form-item>
					</el-form>
				</el-col>
				<el-col :span="8">
					<el-form label-width="120px">
						<el-form-item label="主版本号">
							<el-input v-model="Version.version"></el-input>
						</el-form-item>
						<el-form-item label="是否最新版本">
							<el-switch v-model="Version.isLatest"></el-switch>
						</el-form-item>
					</el-form>
				</el-col>
				<el-col :span="24">
					<el-form label-width="120px">		
						<el-form-item label="下载URL">
							<el-input v-model="Version.downloadURL"></el-input>
						</el-form-item>
						<el-form-item label="版本说明">
							<el-input type="textarea" resize="none" v-model="Version.content"></el-input>
						</el-form-item>
					</el-form>
				</el-col>
				
				<el-col :span="24">
					<el-form label-width="120px">
						<el-form-item>
							<el-button type="primary" @click="saveVersion">立即保存</el-button>
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
	export default {
		data() {
			return {
				Version: {
					deviceType:'',
					type:'',
					versionSize:'',
					version:'',
					versionMin:'',
					isLatest: true,
					downloadURL:'',
					content:''
				}
			}
		},
		methods: {
			saveVersion() {
				let data= {
					deviceType: this.Version.deviceType,
					type: this.Version.type,
					versionSize: this.Version.versionSize,
					version: this.Version.version,
					versionMin: this.Version.versionMin,
					isLatest: this.Version.isLatest ? 'Y' : 'N',
					downloadURL: this.Version.downloadURL,
					content: this.Version.content
				}
				console.log(data)
				requestJava({
					url: '/setAppVersion/save',
					method: 'post',
					data
				}).then(res => {
					if (res.data.code == 200) {
						Message.success(res.data.message)
						this.$router.push({name: 'versionmanage'})
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
</style>