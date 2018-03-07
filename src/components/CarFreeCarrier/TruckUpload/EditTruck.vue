<template>
	<div class="main-content">
		<el-card class="box-card">
			<div slot="header" class="clearfix">编辑车源</div>
			<el-row>
				<el-col :span="8">
					<el-form label-width="130px">
						<el-form-item label="报文参考号">
							<el-input  v-model="TruckInfo.messageReferenceNumber" :disabled="true"></el-input>
						</el-form-item>
						<el-form-item label="发送方代码">
							<el-input v-model="TruckInfo.senderCode" :disabled="true"></el-input>
						</el-form-item>
						<el-form-item label="报文功能代码">
							<el-input v-model="TruckInfo.messageFunctionCode" :disabled="true"></el-input>
						</el-form-item>
						<el-form-item label="车辆长度">
							<el-select v-model="TruckInfo.vehicleLength" placeholder="请选择车辆类型" style="width:100%">
								<el-option v-for="item in TruckLength" :key="item.ConstStd_ID" :label="item.Name " :value="item.Value">
								</el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="出发地区代码">
							<el-input v-model="TruckInfo.countrySubdivisionCode"></el-input>
						</el-form-item>
					</el-form>
				</el-col>
				<el-col :span="8">
					<el-form label-width="130px">
						<el-form-item label="单证名称">
							<el-input v-model="TruckInfo.documentName" :disabled="true"></el-input>
						</el-form-item>
						<el-form-item label="接收方代码">
							<el-input v-model="TruckInfo.recipientCode" :disabled="true"></el-input>
						</el-form-item>
						<el-form-item label="车辆牌照号">
							<el-input v-model="TruckInfo.vehicleNumber"></el-input>
						</el-form-item>
						<el-form-item label="核定载质量">
							<el-input v-model="TruckInfo.vehicleTonnage"></el-input>
						</el-form-item>
						<el-form-item label="目的地地区代码">
							<el-input v-model="TruckInfo.destinationCountrySubdivisionCode"></el-input>
						</el-form-item>
					</el-form>
				</el-col>
				<el-col :span="8">
					<el-form label-width="130px">
						<el-form-item label="报文版本号">
							<el-input v-model="TruckInfo.documentVersionNumber" :disabled="true"></el-input>
						</el-form-item>
						<el-form-item label="发送日期时间">
							<el-input v-model="TruckInfo.messageSendingDateTime" :disabled="true"></el-input>
						</el-form-item>
						<el-form-item label="车辆类型">
							<el-select v-model="TruckInfo.vehicleClassificationCode" placeholder="请选择车辆类型" style="width:100%">
								<el-option v-for="item in TruckType" :key="item.ConstStd_ID" :label="item.Name " :value="item.Value">
								</el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="出发地">
							<el-input v-model="TruckInfo.placeOfLoading"></el-input>
						</el-form-item>
						<el-form-item label="目的地">
							<el-input v-model="TruckInfo.goodsReceiptPlace"></el-input>
						</el-form-item>
					</el-form>
				</el-col>
				<el-col :span="24">
					<el-form label-width="130px">

						<el-form-item>
							<el-button type="primary">保存</el-button>
							<el-button @click.native="back">取消</el-button>
						</el-form-item>
					</el-form>
				</el-col>
			</el-row>
		</el-card>
	</div>
</template>
<script type="text/javascript">
import request from '../../../common/request'
import requestJava from '../../../common/requestJava'
import { Message } from 'element-ui'
export default {
	data() {
		return {
			TruckType: '',
			TruckLength:'',
			TruckInfo:{}
		}
	},
	created() {
		this.getConstant('TruckType')
		this.getConstant('TruckLength')
		this.getTruckInfo()
		
	},
	methods: {
		getConstant(Type) {
			let params = {
				Type
			}
			request({
				url: '/base_conststand/list/type',
				method: 'get',
				params
			}).then(res => {
				if (res.data.code == 0) {
					this[Type] = res.data.data
				} else {
					Message.error(res.data.msg)
				}
			})
		},
		getTruckInfo() {
			let params = {
				notrucksourceId: this.$route.query.notrucksourceId
			}
			requestJava({
				url: '/notruckTrucksource/info',
				method: 'get',
				params
			}).then(res => {
				if (res.data.code == 200) {
					this.TruckInfo = res.data.data
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
