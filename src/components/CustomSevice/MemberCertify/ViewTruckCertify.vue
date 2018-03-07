<template>
	<div class="main-content">
		<el-card class="box-card">
			<div slot="header" class="clearfix">
				<span>个人认证</span>
			</div>
			<el-row>
                <el-col :span="14" :offset="5">
                    <el-form label-width="120px">
                        <el-form-item label="车辆照片">
                            <el-upload 
                                action="" 
                                class="avatar-uploader" 
                                :show-file-list="false" 
                                :disabled="true">
                                <!-- <img v-if="memMember.headPicture" :src="'http://develop.we-service.cn/hdd/image/' + memMember.headPicture" class="avatar"> -->
                                <i class="el-icon-plus avatar-uploader-icon"></i>
                            </el-upload>
                            <el-upload 
                                action="" 
                                class="avatar-uploader" 
                                :show-file-list="false" 
                                :disabled="true">
                                <!-- <img v-if="memMember.headPicture" :src="'http://develop.we-service.cn/hdd/image/' + memMember.headPicture" class="avatar"> -->
                                <i class="el-icon-plus avatar-uploader-icon"></i>
                            </el-upload>
                            <el-upload 
                                action="" 
                                class="avatar-uploader" 
                                :show-file-list="false" 
                                :disabled="true">
                                <!-- <img v-if="memMember.headPicture" :src="'http://develop.we-service.cn/hdd/image/' + memMember.headPicture" class="avatar"> -->
                                <i class="el-icon-plus avatar-uploader-icon"></i>
                            </el-upload>
                        </el-form-item>
                        <el-form-item label="车牌号码">
                            <p>429002654156798</p>
                        </el-form-item>
                        <el-form-item label="车辆类型">
                            <p>429002654156798</p>
                        </el-form-item>
                        <el-form-item label="车型">
                            <p>429002654156798</p>
                        </el-form-item>
                        <el-form-item label="车长">
                            <p>429002654156798</p>
                        </el-form-item>
                        <el-form-item label="载重">
                            <p>429002654156798</p>
                        </el-form-item>
                        <el-form-item label="车主">
                            <p>429002654156798</p>
                        </el-form-item>
                        <el-form-item label="行驶照片">
                            <el-upload 
                                action="" 
                                class="avatar-uploader" 
                                :show-file-list="false" 
                                :disabled="true">
                                <!-- <img v-if="payRealNameApply.idcardFrontPic" :src="'http://develop.we-service.cn/hdd/image/' + payRealNameApply.idcardFrontPic" class="avatar"> -->
                                <i class="el-icon-plus avatar-uploader-icon"></i>
                            </el-upload>
                        </el-form-item>
                        <el-form-item label="审核说明">
                            <el-input type="textarea"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="success">通过</el-button>
                            <el-button type="danger">拒绝</el-button>
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