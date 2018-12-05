<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input :placeholder="$t('table.rolename')" v-model="listQuery.rolename" clearable style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter"/>
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">{{ $t('table.search') }}</el-button>
      <el-button v-waves class="filter-item" type="primary" @click="dialogTableVisible = true" >＋新增</el-button>
    </div>

    <el-table
      v-loading="listLoading"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%;">
      <el-table-column :label="$t('table.id')" align="center" width="65">
        <template slot-scope="scope">
          <span>{{ (scope.$index+1)+(listQuery.page-1)*listQuery.limit }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.rolename')" align="center" prop="rolename" />
      <el-table-column :label="'备注'" align="center" prop="remakers">
        <!-- <template slot-scope="scope">
          <div class="pointer" @click="handleChangeStatus(scope)">
            <el-tag :type="scope.row.lock | statusFilter">{{ scope.row.lock | statusText }}</el-tag>
          </div>
        </template> -->
      </el-table-column>
      <el-table-column :label="'是否数据管理员'" align="center" prop="isDataAdmin">
        <template slot-scope="scope">
          <span>{{ scope.row.isDataAdmin==0?'否':'是' }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.actions')" align="center" width="230" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="handleUpdate(scope.row,scope.$index)">{{ $t('table.edit') }}</el-button>
          <el-button type="danger" size="mini" @click="handleDelete(scope)">{{ $t('table.delete') }}</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination-container">
      <el-pagination v-show="total>0" :current-page="listQuery.page" :page-sizes="[10,20,30,50]" :page-size="listQuery.limit" :total="total" background layout="total, sizes, prev, pager, next, jumper" @size-change="handleSizeChange" @current-change="handleCurrentChange"/>
    </div>

    <el-dialog v-el-drag-dialog :visible.sync="dialogTableVisible" :before-close="closeDia" width="40%" title="新增角色">
      <el-row>
        <el-col :span="22">
          <el-form ref="formCenter" :label-position="'right'" :model="formCenter" label-width="120px" >
            <el-form-item label="角色名称">
              <el-input v-model="formCenter.rolename"/>
            </el-form-item>

            <el-form-item label="是否数据管理员">
              <el-radio-group v-model="formCenter.isDataAdmin" @change="radioChange">
                <el-radio label="1">是</el-radio>
                <el-radio label="0">否</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="备注">
              <el-input :rows="6" v-model="formCenter.remakers" :autosize="{ minRows: 4, maxRows: 8}" type="textarea"/>
            </el-form-item>

          </el-form>
        </el-col>
      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button @click="headleCancel">取 消</el-button>
        <el-button type="primary" @click="submitForm">确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>
<script>
import { roleList } from '@/api/role'
import { pagingMixin } from '@/mixins/table'
import waves from '@/directive/waves' // 水波纹指令
import elDragDialog from '@/directive/el-dragDialog' // 可拖动弹窗
export default {
  name: 'Role',
  directives: {
    waves,
    elDragDialog
  },
  filters: {
    statusFilter(status) {
      return status ? 'success' : 'danger'
    },
    statusText(status) {
      return status ? '正常' : '锁定'
    }
  },
  mixins: [pagingMixin],
  data() {
    return {
      isEdit: false,
      selectListIndex: 0,
      dialogTableVisible: false,
      formCenter: {
        roleUser: '',
        isDataAdmin: '0',
        remakers: ''
      },
      total: null,
      listLoading: false,
      list: [],
      listQuery: {
        rolename: ''
      }
    }
  },
  methods: {
    restForm() { // 恢复表单初始值
      this.formCenter = {
        rolename: '',
        isDataAdmin: '0',
        remakers: ''
      }
    },
    headleCancel() {
      this.isEdit = false
      this.dialogTableVisible = false
      this.restForm()
    },
    submitForm() {
      if (!this.isEdit) { // 新增
        const o = {
          rolename: this.formCenter.rolename,
          isDataAdmin: this.formCenter.isDataAdmin * 1,
          remakers: this.formCenter.remakers
        }
        this.list.unshift(o)
      } else { // 编辑
        const o = this.list[this.selectListIndex]
        o.rolename = this.formCenter.rolename
        o.isDataAdmin = this.formCenter.isDataAdmin * 1
        o.remakers = this.formCenter.remakers
        this.isEdit = false
      }
      this.restForm()
      this.dialogTableVisible = false
    },
    closeDia(done) {
      this.isEdit = false
      this.restForm()
      done()
    },
    radioChange(e) {
      this.formCenter.isDataAdmin = e
    },
    listLoad() {
      this.listLoading = true
      roleList(this.listQuery).then(response => {
        this.list = response.data.list
        console.log(this.list)
        this.total = response.data.total
        this.listLoading = false
      })
    },
    handleChangeStatus(scope) {
      // row.lock = !row.lock
      scope.row.lock = !scope.row.lock
      this.$message({
        message: '操作成功',
        type: 'success'
      })
    },
    handleUpdate(row, index) {
      // this.$message({
      //   message: '操作成功',
      //   type: 'success'
      // })
      const { rolename, remakers, isDataAdmin } = row
      console.log(isDataAdmin)
      this.formCenter = {
        rolename,
        remakers,
        isDataAdmin: isDataAdmin + ''
      }
      this.dialogTableVisible = true
      this.isEdit = true
      this.selectListIndex = index
    },
    // 删除
    handleDelete(e) {
      this.list.splice(e.$index, 1)
    }
  }
}
</script>

