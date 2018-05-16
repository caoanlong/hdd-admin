<template>
	<div class="main-content">
		<el-card class="box-card">
			<div slot="header" class="clearfix">
				<span>添加内容</span>
			</div>
			<el-row>
				<el-col :span="18" :offset="2">
					<el-form label-width="120px" :model="content" :rules="rules" ref="ruleForm">
						<el-form-item label="所属栏目" prop="ContentTopic_ID">
							<el-select style="width: 100%" placeholder="请选择" v-model="content.ContentTopic_ID">
								<el-option v-for="contentTopic in contentTopics" :key="contentTopic.ContentTopic_ID" :label="contentTopic.Name" :value="contentTopic.ContentTopic_ID"></el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="代码" prop="Code">
							<el-input v-model="content.Code"></el-input>
						</el-form-item>
						<el-form-item label="名称" prop="Name">
							<el-input v-model="content.Name"></el-input>
						</el-form-item>
						<el-form-item label="标题" prop="Title">
							<el-input v-model="content.Title"></el-input>
						</el-form-item>
                        <el-form-item label="内容" prop="Content">
							<quill-editor v-model="content.Content"
								class="customerEditor" 
								ref="myQuillEditor"
								:options="editorOption">
							</quill-editor>
						</el-form-item>
						<el-form-item label="图片上传">
							<ImageUpload :files="[content.PictureURL]" @imgUrlBack="handleAvatarSuccess"/>
						</el-form-item>
						<el-form-item label="图片URL">
							<el-input v-model="content.PictureURL"></el-input>
						</el-form-item>
                        <el-form-item label="URL" prop="URL">
							<el-input v-model="content.URL"></el-input>
						</el-form-item>
                        <el-form-item label="是否启用">
                            <el-switch v-model="content.isEnable"></el-switch>
                        </el-form-item>
						<el-form-item label="排序">
							<el-input-number v-model="content.Sort" :min="1"></el-input-number>
						</el-form-item>
						<el-form-item label="备注">
							<el-input type="textarea" v-model="content.Tips"></el-input>
						</el-form-item>
						<el-form-item>
							<el-button type="primary" @click="addContent">立即保存</el-button>
							<el-button @click="back">取消</el-button>
						</el-form-item>
					</el-form>
				</el-col>
			</el-row>
		</el-card>
	</div>
</template>
<script type="text/javascript">
	import request from '../../../../common/request'
	import { Message } from 'element-ui'
	import ImageUpload from '../../../CommonComponents/ImageUpload'
	import { checkURL } from '../../../../common/validator'
	import { quillEditor } from 'vue-quill-editor'
	export default {
		data() {
			return {
                contentTopics: [],
				content: {
                    ContentTopic_ID: '',
                    Code: '',
                    Name: '',
                    Title: '',
                    Content: '',
                    PictureURL: '',
					URL: '',
					Sort: 1,
					isEnable: true,
					Tips: ''
				},
				editorOption: {
					placeholder: '请输入...'
				},
				rules: {
					ContentTopic_ID: [
						{required: true, message: '请选择所属栏目'}
					],
					Code: [
						{required: true, message: '请输入代码'},
						{min: 2, max: 20, message: '长度在 2 到 20 个字符'}
					],
					Name: [
						{required: true, message: '请输入名称'},
						{min: 2, max: 20, message: '长度在 2 到 20 个字符'}
					],
					Title: [
						{required: true, message: '请输入标题'},
						{min: 2, max: 50, message: '长度在 2 到 50 个字符'}
					],
					Content: [
						{required: true, message: '请输入内容'}
					],
					URL: [
						{required: true, message: '请输入URL'},
						// {validator: checkURL}
					]
				}
			}
        },
        created() {
            this.getContentTopics()
        },
		methods: {
            getContentTopics() {
                request({
					url: '/set_contenttopic/list2',
					method: 'get'
				}).then(res => {
					if (res.data.code == 0) {
                        this.contentTopics = res.data.data
					} else {
						Message.error(res.data.msg)
					}
				})
            },
			addContent() {
				let data= {
					ContentTopic_ID: this.content.ContentTopic_ID,
					Code: this.content.Code,
					Name: this.content.Name,
					Title: this.content.Title,
					Content: this.content.Content,
					PictureURL: this.content.PictureURL,
					URL: this.content.URL,
					Sort: this.content.Sort,
					isEnable: this.content.isEnable ? 'Y' : 'N',
					Tips: this.content.Tips
				}
				this.$refs['ruleForm'].validate(valid => {
					if (valid) {
						request({
							url: '/set_content/add',
							method: 'post',
							data
						}).then(res => {
							if (res.data.code == 0) {
								Message.success(res.data.msg)
								this.$router.push({name: 'setcontent'})
							} else {
								Message.error(res.data.msg)
							}
						})
					}
				})
			},
			handleAvatarSuccess(res) {
				this.content.PictureURL = res[0]
			},
			back() {
				this.$router.go(-1)
			}
		},
		components: {
			ImageUpload,
			quillEditor
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
.el-form-item
	.el-form-item__content
		line-height 20px
		position relative
		font-size 14px
</style>