<template>
  <el-container class="app-container">
    <el-header height="45px" class="app-header">
      <div>博客管理器</div>
    </el-header>
    <el-main class="app-main" ref="appMain">
      <el-tabs tab-position="left" class="app-main-tabs" ref="appTabs" activate-name="edit">
        <el-tab-pane label="编辑器" name="edit" class="tabs-item">
          <file-editor></file-editor>
        </el-tab-pane>
        <el-tab-pane label="oss配置" name="oss-setting"></el-tab-pane>
      </el-tabs>
    </el-main>
  </el-container>
</template>
<script>
import FileEditor from "@/components/file/file-editor";
// import "@/Menu/index"
export default {
  name: "home",
  data() {
    return {
      code: "",
      appHeight: 0,
      active:'edit'
    };
  },
  components: {
    FileEditor,
  },
  mounted() {
    const tabs = this.$refs["appTabs"];
    this.appHeight = tabs.$el.clientHeight;
    let childNodes = tabs.$children;
    childNodes.forEach((node) => {
      node.clientHeight = this.appHeight;
    });
  },
  created() {},
};
</script>

<style lang="css" scoped
>
.zt-icon {
  float: right;
  color: yellow;
  cursor: pointer;
  margin-left: 25px;
}
.app-container {
  height: 100%;
}
.app-header {
  background-color: #ff5e78;
  padding: 0;
  line-height: 40px;
}
.app-main {
  background-color: #f2f2f2;
  padding: 0;
  margin: 0;
  height: 100%;
}
.app-main-tabs {
  height: 100%;
}
.tabs-item {
  height: inherit;
}
.el-tabs >>> .el-tabs__content {
  height:100%;
}
.el-tabs >>>.el-tabs__header{
 margin: 0 !important;
}
</style>