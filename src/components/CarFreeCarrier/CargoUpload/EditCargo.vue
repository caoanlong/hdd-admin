<template>
	<div class="main-content">
		<el-card class="box-card">
			<div slot="header" class="clearfix">编辑货源</div>
			<el-row>
				<el-col :span="8">
					<el-form label-width="120px">
						<el-form-item label="报文参考号：">
							<el-input ></el-input>
						</el-form-item>
						<el-form-item label="发送方代码：">
							<el-input ></el-input>
						</el-form-item>
						<el-form-item label="报文功能代码：">
							<el-input ></el-input>
						</el-form-item>
						<el-form-item label="出发地区代码：">
							<el-input ></el-input>
						</el-form-item>
						<el-form-item label="目的地区代码：">
							<el-input ></el-input>
						</el-form-item>
						<el-form-item label="货物名称：">
							<el-input ></el-input>
						</el-form-item>
					</el-form>
				</el-col>
				<el-col :span="8">
					<el-form label-width="120px">
						<el-form-item label="单证名称：">
							<el-input ></el-input>
						</el-form-item>
						<el-form-item label="接收方代码：">
							<el-input ></el-input>
						</el-form-item>
						<el-form-item label="发货人：">
							<el-input ></el-input>
						</el-form-item>
						<el-form-item label="收货人：">
							<el-input ></el-input>
						</el-form-item>
						<el-form-item label="费用总金额：">
							<el-input ></el-input>
						</el-form-item>
						<el-form-item label="货物类型分类：">
							<el-select v-model="CargoType" placeholder="请选择货物类型" style="width:100%">
								<el-option v-for="item in CargoType" :key="item.Value" :label="item.Value+' '+item.Name " :value="item.Value">
									<span style="float: left">{{ item.Value }}</span>
									<span style="float: right; color: #8492a6; font-size: 12px">{{ item.Name }}</span></el-option>
							</el-select>
						</el-form-item>
					</el-form>
				</el-col>
				<el-col :span="8">
					<el-form label-width="120px">
						<el-form-item label="报文版本号：">
							<el-input ></el-input>
						</el-form-item>
						<el-form-item label="发送日期时间：">
							<el-date-picker type="date" placeholder="选择日期" style="width:100%">
							</el-date-picker>
						</el-form-item>
						<el-form-item label="出发地：">
							<el-input ></el-input>
						</el-form-item>
						<el-form-item label="目的地：">
							<el-input ></el-input>
						</el-form-item>
						<el-form-item label="车辆类型：">
							<el-select v-model="TruckType" placeholder="请选择车辆类型" style="width:100%">
								<el-option v-for="item in TruckType" :key="item.Value" :label="item.Value+' '+item.Name " :value="item.Value">
									<span style="float: left">{{ item.Value }}</span>
									<span style="float: right; color: #8492a6; font-size: 12px">{{ item.Name }}</span></el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="货物项毛重：">
							<el-input ></el-input>
						</el-form-item>
					</el-form>
				</el-col>
				<el-col :span="24">
					<el-form label-width="120px">
						<el-form-item>
							<el-button type="primary">保存</el-button>
							<el-button @click="back">取消</el-button>
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
			CargoType: [],
			TruckType: [],
			CargoInfo:{
				messageReferenceNumber:'',
				senderCode:'',
				messageFunctionCode:'',
				countrySubdivisionCode:'',
				destinationCountrySubdivisionCode:'',
				descriptionOfGoods:'',
				documentName:'',
				recipientCode:'',
				consignor:'',
				consignee:'',
				totalMonetaryAmount:'',
				cargoTypeClassificationCode:'',
				documentVersionNumber:'',
				messageSendingDateTime:'',
				placeOfLoading:'',
				goodsReceiptPlace:'',
				vehicleClassificationCode:'',
				goodsItemGrossWeight:''
			}
		}
	},
	created() {
		this.getConstant('CargoType')
		this.getConstant('TruckType')
		this.getCargoInfo()
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
		getCargoInfo() {
			let params = {
				goodsId: this.$route.query.goodsId
			}
			requestJava({
				url: '/notruckCargosource/info',
				method: 'get',
				params
			}).then(res => {
				if (res.data.code == 200) {
					this.CargoInfo = res.data.data
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