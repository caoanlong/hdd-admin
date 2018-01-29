<template>
	<div class="main-content">
		<el-card class="box-card">
			<div slot="header" class="clearfix">
				<span v-if="type=='add'">添加接口</span>
				<span v-else-if="type=='edit'">修改接口</span>
				<span v-else>查看接口</span>
			</div>
			<el-form label-width="120px">
				<el-row :gutter="20">
					<el-col :span="12">
						<el-form-item label="企业名称：" v-if="type=='add' || type=='edit'">
							<el-select v-model="company" placeholder="请选择企业" style="width:100%">
								<el-option v-for="item in options1" :key="item.value" :label="item.name " :value="item.value">{{ item.name }}</el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="企业名称：" v-else>
							<el-input auto-complete="off" class="readonly" :readonly="true"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="企业接入码：">
							<el-input auto-complete="off" class="readonly" :readonly="true" :value="1123"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="AppKey">
							<el-input auto-complete="off" class="readonly" :readonly="true"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="报文功能代码："  v-if="type=='add' || type=='edit'">
							<el-input auto-complete="off"></el-input>
						</el-form-item>
						<el-form-item label="报文功能代码：" v-else>
							<el-input auto-complete="off" class="readonly" :readonly="true"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="报文版本号：" v-if="type=='add' || type=='edit'">
							<el-input auto-complete="off"></el-input>
						</el-form-item>
						<el-form-item label="报文版本号：" v-else>
							<el-input auto-complete="off" class="readonly" :readonly="true"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="接收方代码：" v-if="type=='add' || type=='edit'">
							<el-input auto-complete="off"></el-input>
						</el-form-item>
						<el-form-item label="接收方代码：" v-else>
							<el-input auto-complete="off" class="readonly" :readonly="true"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="用户：" v-if="type=='add' || type=='edit'">
							<el-select v-model="user" placeholder="请选择车辆类型" style="width:100%">
								<el-option v-for="item in options" :key="item.value" :label="item.label " :value="item.value">{{ item.label }}</el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="用户：" v-else>
							<el-input auto-complete="off" class="readonly" :readonly="true"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="24">
						<el-form-item v-if="type=='add'">
							<el-button>重置</el-button>
							<el-button type="primary">保存</el-button>
						</el-form-item>
						<el-form-item v-else-if="type=='edit'">
							<el-button>取消</el-button>
							<el-button type="primary">保存</el-button>
						</el-form-item>
						<el-form-item v-else>
							<el-button type="primary">返回</el-button>
						</el-form-item>
					</el-col>
				</el-row>
			</el-form>
		</el-card>
	</div>
</template>
<script type="text/javascript">
export default {
	data() {
		return {
			options: [{
					"label": "admin",
					"value": 1
				},
				{
					"label": "user",
					"value": 2
				}
			],
			options1: [{
					"accessCode": "13252345123",
					"name": "深圳前海微服大数据有限公司",
					"value": 1
				},
				{
					"accessCode": "5643345123",
					"name": "云南微服大数据有限公司",
					"value": 2
				}
			],
			company:'',
			user: '',
			companyID:''
		}
	},
	computed: {
		type() {
			return this.$route.query.type
		}
	},
	methods: {
		handleEdit(index, row) {
			console.log(index, row);
		},
		handleDelete(index, row) {
			console.log(index, row);
		}

	}
}

</script>
<style lang="stylus">
.readonly
	input
		background #f8f8f8
		cursor default
</style>