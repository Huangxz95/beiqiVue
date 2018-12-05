<template>
  <div>
    <el-row>
      <el-col :span="4">
        <div class="left_select">
          <ul>
            <li v-for="(item,index) in subordinateRoleList" :key="index" @click="toggleRole(index)">
              <span :class="item.isActive?'span_list':''" >{{ item.name }}</span>
            </li>
          </ul>
        </div>
      </el-col>
      <el-col :span="20">
        <div class="center_content">
          <div style="padding:15px 0 5px 5px">
            <el-button type="primary" size="mini" @click="saveChecked">保存</el-button>
          </div>
          <el-tree
            ref="tree"
            :data="treeData"
            :default-checked-keys="defaultCheckedKeys"
            :default-expand-all="true"
            node-key="id"
            show-checkbox
          />
        </div>
      </el-col>
    </el-row>

  </div>
</template>

<script>
export default {
  name: 'MenuAuthorize',
  components: {},
  data() {
    return {
      defaultCheckedKeys: [1],
      subordinateRoleList: [
        { name: '业务部门_转发', value: '0', isActive: true },
        { name: '普通用户', value: '1', isActive: false },
        { name: '部门_超管', value: '2', isActive: false },
        { name: '数据管理员', value: '3', isActive: false },
        { name: 'IT', value: '4', isActive: false },
        { name: '管理员', value: '5', isActive: false },
        { name: 'test', value: '6', isActive: false },
        { name: '超管', value: '7', isActive: false }
      ],
      treeData: [{
        id: 1,
        label: '系统管理',
        children: [{
          id: 11,
          label: '菜单管理1'
        }, {
          id: 12,
          label: '菜单管理2'
        }, {
          id: 13,
          label: '菜单管理3'
        }, {
          id: 14,
          label: '菜单管理4'
        }, {
          id: 15,
          label: '菜单管理5'
        }]
      }, {
        id: 2,
        label: '转发管理',
        children: [{
          id: 21,
          label: '转发管理1'
        }, {
          id: 22,
          label: '转发管理2'
        }, {
          id: 23,
          label: '转发管理3'
        }, {
          id: 24,
          label: '转发管理4'
        }, {
          id: 25,
          label: '转发管理5'
        }]
      }, {
        id: 3,
        label: '基础数据配置',
        children: [{
          id: 31,
          label: '基础数据配置1'
        }, {
          id: 32,
          label: '基础数据配置2'
        }, {
          id: 33,
          label: '基础数据配置3'
        }, {
          id: 34,
          label: '基础数据配置4'
        }, {
          id: 35,
          label: '基础数据配置5'
        }]
      }, {
        id: 4,
        label: '基础数据配置',
        children: [{
          id: 41,
          label: '基础数据配置1'
        }, {
          id: 42,
          label: '基础数据配置2'
        }, {
          id: 43,
          label: '基础数据配置3'
        }, {
          id: 44,
          label: '基础数据配置4'
        }, {
          id: 45,
          label: '基础数据配置5'
        }]
      }]
    }
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
      this.$refs.tree.setCheckedKeys(this.defaultCheckedKeys)
      document.querySelector('.center_content').scrollTop = 0
    },
    saveChecked() {
      console.log(this.$refs.tree.getCheckedNodes())
      console.log(this.$refs.tree.getCheckedKeys())
    }
  }
}
</script>

<style lang='scss' scoped>
.left_select{
  // width:150px;
  height:calc(100vh - 94px);
  border-right: 1px solid rgba(0,0,0,.3);
    overflow-y:auto;
  ul{
    padding:0 10px;
    li{
      list-style-type:none;
      cursor: pointer;
      font-size: 14px;
      color: #303133;
      padding: 5px 0;
      .span_list{
        color:#409EFF
      }
    }
    li:hover{
      color:#409EFF
    }
  }

}
.center_content{
  height:calc(100vh - 94px);
  overflow-y:auto;
}
.left_select::-webkit-scrollbar,.center_content::-webkit-scrollbar {/*滚动条整体样式*/
  width: 4px;     /*高宽分别对应横竖滚动条的尺寸*/
  height: 4px;
}
.left_select::-webkit-scrollbar-thumb,.center_content::-webkit-scrollbar-thumb {/*滚动条里面小方块*/
  border-radius: 5px;
  -webkit-box-shadow: inset 0 0 5px #A8A8A8;
  background: #A8A8A8;
}
.left_select::-webkit-scrollbar-track,.center_content::-webkit-scrollbar-track {/*滚动条里面轨道*/
  -webkit-box-shadow: inset 0 0 5px #A8A8A8;
  border-radius: 0;
  background: #A8A8A8
}
</style>
