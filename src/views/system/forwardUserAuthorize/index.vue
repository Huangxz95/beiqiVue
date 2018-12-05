<template>
  <div style="padding:0 5px">
    <el-row :gutter="6">
      <el-col :span="4">
        <div class="left_select">
          <div class="title_header">用户列表</div>
          <ul class="user_list">
            <li v-for="(item,index) in subordinateRoleList" :key="index" :class="item.isActive?'span_list':''" @click="toggleRole(index)">
              <span >{{ item.name }}</span>
            </li>
          </ul>
        </div>
      </el-col>
      <el-col :span="20">
        <div class="center_content">
          <div class="title_content">
            <span/>
            <el-button size="mini">+ 新增</el-button>
            <el-button type="danger" size="mini">删除选中</el-button>
          </div>
          <el-table
            ref="multipleTable"
            :data="tableData"
            border
            height="400"
            style="width:100%"
            @selection-change="handleSelectionChange"
          >
            <el-table-column
              label="序号"
              align="center"
              width="55">
              <template slot-scope="scope">{{ scope.$index }}</template>
            </el-table-column>
            <el-table-column
              type="selection"
              align="center"
              width="55"/>
            <el-table-column
              prop="name"
              align="center"
              label="用户名称"
            />
            <el-table-column :label="$t('table.actions')" align="center" width="100" class-name="small-padding fixed-width">
              <template slot-scope="scope">
                <el-button type="danger" size="mini" >{{ $t('table.delete') }}</el-button>
              </template>
            </el-table-column>
          </el-table>
          <div class="pagination-container">
            <el-pagination v-show="total>0" :current-page="listQuery.page" :page-sizes="[10,20,30,50]" :page-size="listQuery.limit" :total="total" background layout="total, sizes, prev, pager, next, jumper" @size-change="handleSizeChange" @current-change="handleCurrentChange"/>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'ForwardUserAuthorize',
  components: {},
  data() {
    return {
      total: 100,
      listQuery: {
        page: 1,
        limit: 10
      },
      subordinateRoleList: [
        { name: 'intest_1', value: '0', isActive: true },
        { name: 'intest_2', value: '1', isActive: false },
        { name: 'intest_3', value: '2', isActive: false },
        { name: 'intest_4', value: '3', isActive: false },
        { name: 'intest_5', value: '4', isActive: false },
        { name: 'intest_6', value: '5', isActive: false },
        { name: 'intest_7', value: '6', isActive: false },
        { name: 'intest_8', value: '7', isActive: false },
        { name: 'intest_2', value: '1', isActive: false },
        { name: 'intest_3', value: '2', isActive: false },
        { name: 'intest_4', value: '3', isActive: false },
        { name: 'intest_5', value: '4', isActive: false },
        { name: 'intest_6', value: '5', isActive: false },
        { name: 'intest_7', value: '6', isActive: false }
      ],
      tableData: [{
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-08',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-06',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-07',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }]
    }
  },
  computed: {},
  created() {

  },
  mounted() {

  },
  methods: {
    toggleRole(index) {
      for (let i = 0; i < this.subordinateRoleList.length; i++) {
        if (i === index) {
          this.subordinateRoleList[index].isActive = true
        } else {
          this.subordinateRoleList[i].isActive = false
        }
      }
      // document.querySelector('.center_content').scrollTop = 0
    },
    handleSizeChange(value) {
      console.log(value)
    },
    handleCurrentChange(value) {
      console.log(value)
    },
    handleSelectionChange(val) {
      console.log(val)
      this.multipleSelection = val
    }
  }
}
</script>

<style lang='scss' scoped>
$color:#409EFF;
$height:36px;
.left_select{
  // width:150px;

  .title_header{
    height: $height;
    background: $color;
    font-size: 14px;
    line-height: $height;
    text-indent: 5px;
    color: #fff;
    text-align: center;
    border-radius: 4px 4px 0 0;
  }
  ul{
    padding: 0;
    margin: 0;
    border-left: 2px solid rgba(0,0,0,.1);
    border-right: 2px solid rgba(0,0,0,.1);
    height:calc(100vh - 94px - 36px);
    overflow-y:auto;
    li{
      list-style-type:none;
      cursor: pointer;
      font-size: 14px;
      color: #303133;
      padding:10px;
    }
    .span_list{
        color:$color;
        background:#ECF5FF
      }
    li:hover{
      color:$color;
      background: #ECF5FF
    }
  }
}
.center_content{
  border-left: 2px solid rgba(0,0,0,.1);
  border-right: 2px solid rgba(0,0,0,.1);
  height:calc(100vh - 94px);
  overflow-y:auto;
  .title_content{
    height: $height;
    background: $color;
    padding: 0 15px;
    font-size: 14px;
    color: #fff;
    span{
      line-height: $height;
    }
  }
}
.user_list::-webkit-scrollbar,.center_content::-webkit-scrollbar {/*滚动条整体样式*/
  width: 4px;     /*高宽分别对应横竖滚动条的尺寸*/
  height: 4px;
}
.user_list::-webkit-scrollbar-thumb,.center_content::-webkit-scrollbar-thumb {/*滚动条里面小方块*/
  border-radius: 5px;
  -webkit-box-shadow: inset 0 0 5px #A8A8A8;
  background: #A8A8A8;
}
.user_list::-webkit-scrollbar-track,.center_content::-webkit-scrollbar-track {/*滚动条里面轨道*/
  -webkit-box-shadow: inset 0 0 5px #A8A8A8;
  border-radius: 0;
  background: #A8A8A8
}
</style>
