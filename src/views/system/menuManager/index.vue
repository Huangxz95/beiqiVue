<template>
  <div>
    菜单管理
  </div>

</template>
//Forwarding user authorization
<script>
import { mapGetters } from 'vuex'
export default {
  name: 'Menumanager',
  components: {},
  data() {
    return {
      leftArr: []
    }
  },
  computed: {
    ...mapGetters([
      'permissionRouters'
    ])
  },
  created() {
    this.leftArr = this.permissionRouters.filter((item, index, arr) => {
      return item.hidden !== true
    })
    console.log(this.leftArr)
  },
  mounted() {

  },
  methods: {

  }
}
</script>

<style scoped>

</style>
