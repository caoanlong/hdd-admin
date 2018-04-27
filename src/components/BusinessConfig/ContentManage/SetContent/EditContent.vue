<template>
	<div class="main-content">
		<el-card class="box-card">
			<div slot="header" class="clearfix">
				<span>编辑内容</span>
			</div>
			<el-row>
				<el-col :span="18" :offset="2">
					<el-form label-width="120px">
						<el-form-item label="所属栏目">
							<el-select style="width: 100%" placeholder="请选择" v-model="content.ContentTopic_ID">
								<el-option v-for="contentTopic in contentTopics" :key="contentTopic.ContentTopic_ID" :label="contentTopic.Name" :value="contentTopic.ContentTopic_ID"></el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="代码">
							<el-input v-model="content.Code"></el-input>
						</el-form-item>
						<el-form-item label="名称">
							<el-input v-model="content.Name"></el-input>
						</el-form-item>
						<el-form-item label="标题">
							<el-input v-model="content.Title"></el-input>
						</el-form-item>
                        <el-form-item label="内容">
							<quill-editor v-model="content.Content"
								class="customerEditor" 
								ref="myQuillEditor"
								:options="editorOption">
							</quill-editor>
						</el-form-item>
						<el-form-item label="图片上传">
							<ImageUpload 
								:files="[content.PictureURL]" 
								@imgUrlBack="handleAvatarSuccess"/>
						</el-form-item>
						<el-form-item label="图片URL">
							<el-input v-model="content.PictureURL"></el-input>
						</el-form-item>
                        <el-form-item label="URL">
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
							<el-button type="primary" @click.native="editContent">立即保存</el-button>
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
				editorOption: {}
			}
        },
        created() {
			this.getContentTopics()
        },
		methods: {
            editContent() {
				let data= {
					Content_ID: this.$route.query.Content_ID,
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
				request({
					url: '/set_content/update',
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
			},
            getContentTopics() {
                request({
					url: '/set_contenttopic/list2',
					method: 'get'
				}).then(res => {
					if (res.data.code == 0) {
						this.contentTopics = res.data.data
						this.getContent()
					} else {
						Message.error(res.data.msg)
					}
				})
            },
            getContent() {
                let params = {
					Content_ID: this.$route.query.Content_ID
				}
                request({
					url: '/set_content/info',
                    method: 'get',
                    params
				}).then(res => {
					if (res.data.code == 0) {
						this.content = res.data.data
					} else {
						Message.error(res.data.msg)
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
.el-form-item__content
	line-height 1
</style>