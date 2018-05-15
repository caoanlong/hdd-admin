<template>
	<div class="main-content">
		<el-card class="box-card">
			<div slot="header" class="clearfix">
				<span>车辆认证</span>
			</div>
			<el-form label-width="120px">
				<el-row>
					<div class="tit">
						<div style="margin-left: 0">车辆照片(前)</div>
						<div>车辆照片(侧)</div>
						<div>车辆照片(后)</div>
						<div>行驶照片</div>
					</div>
					<div class="gridly">
						<div class="brick" data-attribute="FrontPic">
							<ImageUpload :files="[certifyTruck.FrontPic]" :isUseCropper="false" @imgUrlBack="handleFrontPicSuccess"/>
						</div>
						<div class="brick" data-attribute="SidePic">
							<ImageUpload :files="[certifyTruck.SidePic]" :isUseCropper="false" @imgUrlBack="handleSidePicSuccess"/>
						</div>
						<div class="brick" data-attribute="BackPic">
							<ImageUpload :files="[certifyTruck.BackPic]" :isUseCropper="false" @imgUrlBack="handleBackPicSuccess"/>
						</div>
						<div class="brick" data-attribute="DrivingLicensePic">
							<ImageUpload :files="[certifyTruck.DrivingLicensePic]" :isUseCropper="false" @imgUrlBack="handleDrivingLicensePicSuccess"/>
						</div>
					</div>
				</el-row>
				<el-row>
					<el-col :span="8">
						<el-form-item label="车牌号码">
							<p>{{certifyTruck.PlateNo}}</p>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="车长">
							<p>{{certifyTruck.Length}}</p>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="车牌类型">
							<p>{{certifyTruck.PlateNoType}}</p>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="8">
						<el-form-item label="载重">
							<p>{{certifyTruck.Loads}}</p>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="车型">
							<p>{{certifyTruck.Type}}</p>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="车主">
							<p>{{certifyTruck.Mem_OwnerIDName}}</p>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="24">
						<el-form-item label="审核说明" 
							v-if="certifyTruck.CertifyStatus != 'Success' && certifyTruck.CertifyStatus != 'Draft' && certifyTruck.CertifyStatus != 'Failed'">
							<el-input type="textarea" v-model="remark" resize="none"></el-input>
						</el-form-item>
						<el-form-item>
							<el-button type="success" 
								v-if="certifyTruck.CertifyStatus != 'Success' && certifyTruck.CertifyStatus != 'Draft' && certifyTruck.CertifyStatus != 'Failed'"
								@click="truckCertify('Success')">通过</el-button>
							<el-button type="danger" 
								v-if="certifyTruck.CertifyStatus != 'Success' && certifyTruck.CertifyStatus != 'Draft' && certifyTruck.CertifyStatus != 'Failed'" 
								@click="truckCertify('Failed')">拒绝</el-button>
							<el-button type="primary" v-if="certifyTruck.CertifyStatus == 'Commit'" @click="update()">保存</el-button>
							<el-button @click.native="back">返回</el-button>
						</el-form-item>
					</el-col>
				</el-row>
			</el-form>
		</el-card>
	</div>
</template>
<script type="text/javascript">
import requestJava from '../../../common/requestJava'
import request from '../../../common/request'
import { Message } from 'element-ui'
import ImageUpload from '../../CommonComponents/ImageUpload'
export default {
	data() {
		return {
			certifyTruck: {},
			truckTypes: [],
			remark: '',
			updateImgs: {},
			isFirst: true
		}
	},
	created() {
		this.getTruckType()
	},
	mounted() {
		this._initImage()
	},
	methods: {
		_initImage() {
			var _this = this
			$(function() {
				var before = []
				var after = []
				var reordering = function($elements) {
					if (_this.isFirst) {
						before = $elements
					}
					_this.isFirst = false
				}
				var reordered = function($elements) {
					after = $elements
					for (let i = 0; i < before.length; i++) {
						let $img1Div = $(before[i])[0]
						let $img2 = $(after[i]).find('img')
						_this.updateImgs[$img1Div.dataset.attribute] = $img2.attr('src') ? $img2.attr('src').split(_this.imgUrl)[1] : ''
					}
				}
				$('.gridly').gridly({
					callbacks: { reordering: reordering , reordered: reordered }
				})
			})
		},
		handleFrontPicSuccess(res) {
			this.updateImgs['FrontPic'] = res[0]
		},
		handleSidePicSuccess(res) {
			this.updateImgs['SidePic'] = res[0]
		},
		handleBackPicSuccess(res) {
			this.updateImgs['BackPic'] = res[0]
		},
		handleDrivingLicensePicSuccess(res) {
			this.updateImgs['DrivingLicensePic'] = res[0]
		},
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
					this.updateImgs['FrontPic'] = res.data.data.FrontPic
					this.updateImgs['SidePic'] = res.data.data.SidePic
					this.updateImgs['BackPic'] = res.data.data.BackPic
					this.updateImgs['DrivingLicensePic'] = res.data.data.DrivingLicensePic
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
			if (status == 'Failed' && !this.remark.trim()) {
				Message.error('审核说明不能为空！')
				return
			}
			let data = {
				memId: this.$route.query.memId,
				status: status,
				remark: this.remark,
				plateNo: this.certifyTruck.PlateNo
			}
			requestJava({
				url: '/mem/memMember/approveCertifyTruck',
				method: 'post',
				data
			}).then(res => {
				if (res.data.code == 200) {
					Message.success(res.data.message)
					this.$router.push({ name: 'membercertify' })
				} else {
					Message.error(res.data.message)
				}
			})
		},
		update() {
			let data = {
				truckCertifyID: this.$route.query.truckCertifyId,
				backPic: this.updateImgs['BackPic'],
				drivingLicensePic: this.updateImgs['DrivingLicensePic'],
				frontPic: this.updateImgs['FrontPic'],
				sidePic: this.updateImgs['SidePic'],
				// transportLicencePic: this.updateImgs['TransportLicencePic']
			}
			requestJava({
				url: '/mem/memMember/updateTruckCertify',
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
	},
	components: {
		ImageUpload
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
