<template>
	<div class="main-content">
		<el-card class="box-card">
			<div slot="header" class="clearfix">
				<span v-if="type=='add'">添加菜单</span>
				<span v-else-if="type=='edit'">修改菜单</span>
				<span v-else-if="type=='addsub'">添加下级菜单</span>
				<span v-else>查看菜单</span>
			</div>
			<el-form label-width="120px">
				<el-form-item label="上级菜单：">
					<div @click="selectMenuDialog = true">111111111111</div>
				</el-form-item>
				<el-form-item label="名称：">
					<el-input auto-complete="off"  style="width:300px"></el-input>
				</el-form-item>
				<el-form-item label="链接：">
					<el-input auto-complete="off" style="width:400px"></el-input>
					<span class="tips">（点击菜单跳转的页面）</span>
				</el-form-item>
				<el-form-item label="目标：">
					<el-input auto-complete="off" style="width:200px"></el-input>
					<span class="tips">（链接打开的目标窗口，默认：mainFrame）</span>
				</el-form-item>
				<el-form-item label="图标：">
					<el-button type="primary" size="mini" @click="selectIconDialog = true">选择</el-button>
					<el-button type="default" size="mini">清除</el-button>
				</el-form-item>
				<el-form-item label="排序：">
					<el-input auto-complete="off"  style="width:100px"></el-input>
					<span class="tips">（排列顺序，升序）</span>
				</el-form-item>
				<el-form-item label="可见：">
					<el-radio-group>
						<el-radio label="显示"></el-radio>
						<el-radio label="隐藏"></el-radio>
					</el-radio-group>
					<span class="tips">（该菜单或操作是否显示到系统菜单中）</span>
				</el-form-item>
				<el-form-item label="权限标识：">
					<el-input auto-complete="off" style="width:300px"></el-input>
					<span class="tips">（控制器中定义的权限标识，如：@RequiresPermissions("权限标识")）</span>
				</el-form-item>
				<el-form-item label="备注：">
					<el-input type="textarea" resize="none"></el-input>
				</el-form-item>
				<el-form-item v-if="type=='add'||type=='addsub'">
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
			</el-form>
		</el-card>
		<el-dialog title="选择菜单" :visible.sync="selectMenuDialog" :show-close="false">
			<el-tree :data="data" :props="defaultProps" accordion>
			</el-tree>
			<div slot="footer" class="dialog-footer">
				<el-button @click="selectMenuDialog = false">取 消</el-button>
				<el-button type="primary" @click="selectMenuDialog = false">确 定</el-button>
			</div>
		</el-dialog>
		<el-dialog title="选择图标" :visible.sync="selectIconDialog" :show-close="false">
			<div slot="footer" class="dialog-footer">
				<el-button @click="selectIconDialog = false">取 消</el-button>
				<el-button type="primary" @click="selectIconDialog = false">确 定</el-button>
			</div>
		</el-dialog>
	</div>
</template>
<script type="text/javascript">
export default {
	data() {
		return {
			selectMenuDialog: false,
			selectIconDialog: false,
			data: [{
				label: '一级 1',
				children: [{
					label: '二级 1-1',
					children: [{
						label: '三级 1-1-1'
					}]
				}]
			}, {
				label: '一级 2',
				children: [{
					label: '二级 2-1',
					children: [{
						label: '三级 2-1-1'
					}]
				}, {
					label: '二级 2-2',
					children: [{
						label: '三级 2-2-1'
					}]
				}]
			}, {
				label: '一级 3',
				children: [{
					label: '二级 3-1',
					children: [{
						label: '三级 3-1-1'
					}]
				}, {
					label: '二级 3-2',
					children: [{
						label: '三级 3-2-1'
					}]
				}]
			}],
			defaultProps: {
				children: 'children',
				label: 'label'
			}
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
.main-content
	.tips
		color #ccc
		margin 0
</style>
