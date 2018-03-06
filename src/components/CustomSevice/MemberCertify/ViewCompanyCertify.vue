<template>
	<div class="main-content">
		<el-card class="box-card">
			<div slot="header" class="clearfix">
				<span>企业认证</span>
			</div>
			<el-row>
				<el-col :span="16">
					<el-form label-width="160px">
						<el-form-item label="公司名称">
							<p>旅途</p>
						</el-form-item>
						<el-form-item label="详细地址">
							<p>天马山南路49号 衡阳体育宾馆</p>
						</el-form-item>
					</el-form>
				</el-col>
				<el-col :span="8">
					<el-form label-width="160px">
						<el-form-item label="所在区域">
							<p>湖南衡阳雁峰</p>
						</el-form-item>
						<el-form-item label="道路运输许可证编号">
							<p>44797789</p>
						</el-form-item>
					</el-form>
				</el-col>
				<el-col :span="8">
					<el-form label-width="160px">
						<el-form-item label="社会信用代码">
							<p>2575</p>
						</el-form-item>
						<el-form-item label="门面照片">
							<el-upload action="" class="avatar-uploader" :show-file-list="false" :disabled="true">
								<!-- <img v-if="memMember.headPicture" :src="'http://develop.we-service.cn/hdd/image/' + memMember.headPicture" class="avatar"> -->
								<i class="el-icon-plus avatar-uploader-icon"></i>
							</el-upload>
						</el-form-item>
					</el-form>
				</el-col>
				<el-col :span="8">
					<el-form label-width="160px">
						<el-form-item label="无车承运平台接入码">
							<p>55786</p>
						</el-form-item>
						<el-form-item label="营业执照图片">
							<el-upload action="" class="avatar-uploader" :show-file-list="false" :disabled="true">
								<!-- <img v-if="memMember.headPicture" :src="'http://develop.we-service.cn/hdd/image/' + memMember.headPicture" class="avatar"> -->
								<i class="el-icon-plus avatar-uploader-icon"></i>
							</el-upload>
						</el-form-item>
					</el-form>
				</el-col>
				<el-col :span="8">
					<el-form label-width="160px">
						<el-form-item label="无车承运平台AppKey">
							<p>44888</p>
						</el-form-item>
						<el-form-item label="道路运输许可证照片">
							<el-upload action="" class="avatar-uploader" :show-file-list="false" :disabled="true">
								<!-- <img v-if="memMember.headPicture" :src="'http://develop.we-service.cn/hdd/image/' + memMember.headPicture" class="avatar"> -->
								<i class="el-icon-plus avatar-uploader-icon"></i>
							</el-upload>
						</el-form-item>
					</el-form>
				</el-col>
				<el-col :span="24">
					<el-form label-width="160px">
						<el-form-item label="审核说明">
							<p>哈哈来看的价格里面的规划</p>
						</el-form-item>
						<el-form-item>
							<el-button type="primary">审核通过</el-button>
							<el-button @click.native="back">返回</el-button>
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
				payRealNameApply:[],
				memMember:[],
				findAuditStatus:'',
				flag:''
			}
		},
		created() {
			// this.getInfo()
		},
		methods: {
			getInfo() {
				let params = {
					realNameApplyID: this.$route.query.realNameApplyID,
					memID: this.$route.query.memID
				}
				requestJava({
					url: '/customerservice/payRealNameApply/info',
					method: 'get',
					params
				}).then(res => {
					if (res.data.code == 200) {
						this.payRealNameApply = res.data.data.payRealNameApply
						this.memMember = res.data.data.memMember
					} else {
						Message.error(res.data.msg)
					}
				})
			},
			back() {
				this.$router.go(-1)
			},
			approve(flag) {
				let data = {
					realNameApplyID: this.$route.query.realNameApplyID,
					flag
				}
				requestJava({
					url: '/customerservice/payRealNameApply/approve',
					method: 'post',
					data
				}).then(res => {
					if (res.data.code == 200) {
						Message.success(res.data.msg)
						this.$router.push({name: 'certification'})
					} else {
						Message.error(res.data.message)
					}
				})
			}
		}
	}
</script>
<style lang="stylus" scoped>
.avatar-uploader 
	.el-upload 
		border 1px dashed #d9d9d9
		border-radius 6px
		cursor pointer
		position relative
		overflow hidden
		vertical-align top
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