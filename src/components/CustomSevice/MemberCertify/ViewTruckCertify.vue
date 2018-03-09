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
                                <img v-if="certifyTruck.FrontPic" :src="'http://develop.we-service.cn/hdd/image/' + certifyTruck.FrontPic" class="avatar">
                                <i class="el-icon-plus avatar-uploader-icon"></i>
                            </el-upload>
                            <el-upload 
                                action="" 
                                class="avatar-uploader" 
                                :show-file-list="false" 
                                :disabled="true">
                                <img v-if="certifyTruck.SidePic" :src="'http://develop.we-service.cn/hdd/image/' + certifyTruck.SidePic" class="avatar">
                                <i class="el-icon-plus avatar-uploader-icon"></i>
                            </el-upload>
                            <el-upload 
                                action="" 
                                class="avatar-uploader" 
                                :show-file-list="false" 
                                :disabled="true">
                                <img v-if="certifyTruck.BackPic" :src="'http://develop.we-service.cn/hdd/image/' + certifyTruck.BackPic" class="avatar">
                                <i class="el-icon-plus avatar-uploader-icon"></i>
                            </el-upload>
                        </el-form-item>
                        <el-form-item label="车牌号码">
                            <p>{{certifyTruck.PlateNo}}</p>
                        </el-form-item>
                        <el-form-item label="车牌类型">
                            <p>{{certifyTruck.PlateNoType}}</p>
                        </el-form-item>
                        <el-form-item label="车型">
                            <p>{{certifyTruck.Type}}</p>
                        </el-form-item>
                        <el-form-item label="车长">
                            <p>{{certifyTruck.Length}}</p>
                        </el-form-item>
                        <el-form-item label="载重">
                            <p>{{certifyTruck.Loads}}</p>
                        </el-form-item>
                        <el-form-item label="车主">
                            <p></p>
                        </el-form-item>
                        <el-form-item label="行驶照片">
                            <el-upload 
                                action="" 
                                class="avatar-uploader" 
                                :show-file-list="false" 
                                :disabled="true">
                                <img v-if="certifyTruck.DrivingLicensePic" :src="'http://develop.we-service.cn/hdd/image/' + certifyTruck.DrivingLicensePic" class="avatar">
                                <i class="el-icon-plus avatar-uploader-icon"></i>
                            </el-upload>
                        </el-form-item>
                        <el-form-item label="审核说明">
                            <el-input type="textarea" v-model="remark"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="success" v-if="certifyTruck.CertifyStatus != 'Success'" @click="truckCertify('Success')">通过</el-button>
                            <el-button type="danger" v-if="certifyTruck.CertifyStatus != 'Success'" @click="truckCertify('Failed')">拒绝</el-button>
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
	import request from '../../../common/request'
	import { Message } from 'element-ui'
	export default {
		data() {
			return {
                certifyTruck: {},
				truckTypes: [],
				remark: ''
			}
		},
		created() {
			this.getTruckType()
		},
		methods: {
			getInfo() {
				let params = {
					truckCertifyId: this.$route.query.truckCertifyId
				}
				requestJava({
					url: '/mem/memMember/getCertifyTruckInfo',
					method: 'get',
					params
				}).then(res => {
					if (res.data.code == 200) {
						this.certifyTruck = res.data.data
					} else {
						Message.error(res.data.message)
					}
				})
            },
            getTruckType() {
				let params = {
					Type: 'TruckType',
				}
				request({
					url: '/base_conststand/list/type',
					method: 'get',
					params
				}).then(res => {
					if (res.data.code == 0) {
						this.truckTypes = res.data.data
						this.getInfo()
					} else {
						Message.error(res.data.msg)
					}
				})
			},
			// 车辆认证
			truckCertify(status) {
				let data = {
					memId: this.$route.query.memId,
					status: status,
					remark: this.remark,
					plateNo: this.certifyTruck.plateNo
				}
				requestJava({
					url: '/mem/memMember/approveCertifyTruck',
					method: 'post',
					data
				}).then(res => {
					if (res.data.code == 200) {
						Message.success(res.data.message)
						this.$router.push({name: 'membercertify'})
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