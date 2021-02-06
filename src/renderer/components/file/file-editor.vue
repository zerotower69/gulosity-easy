<template>
  <el-container>
    <el-header height="40px">
      <el-menu
        class=""
        mode="horizontal"
        background-color="#434343"
        text-color="#ffffff"
        active-text-color="#cccccc"
        @select="selectMenu"
      >
        <el-menu-item class="menu-item" index="input-file">
         导入文档
        </el-menu-item>
         <el-menu-item class="menu-item" index="output-file">
         导出文档
        </el-menu-item>
        <el-menu-item class="menu-item" index="oss-image">OSS传图</el-menu-item>
         <el-menu-item class="menu-item" index="publish" v-if="code!==''">
         发布文章
        </el-menu-item>
      </el-menu>
    </el-header>
    <el-main>
      <mavon-editor v-model="code" class="mark" :subfield="false"></mavon-editor
    ></el-main>
  </el-container>
</template>

<script>
const {ipcRenderer} =require("electron");
import fs from 'fs-extra';
export default {
  name: "editor",
  data() {
    return {
      code: "",
    };
  },
  created() {
    // 接受回调文件路径
    ipcRenderer.on("choose-file-reply",(event,arg)=>{
      // console.log(arg);
      if(arg!==''&&arg.length>0){
        fs.readFile(arg[0],{
          encoding:'utf-8'
        },(err,data)=>{
          if(err) this.$message.error(err);
          else{
            this.code=data;
          }
        })
      }
    })
    //接受保存文件的路径
    ipcRenderer.on("output-file-reply",(event,arg)=>{
      console.log(arg);
      let code=this.code;
      const regExp=/^[A-Za-z]{1,1}:/;
      if(regExp.test(arg)){
        fs.outputFile(arg,code,err=>{
          // console.log(err);
          if(err!==null){
            this.$message.error("文件保存失败")
          }
          else{
            this.$message.success("保存在"+arg)
          }
        })
      }
      else{
        this.$message.error("返回文件路径有误")
      }
    })
  },
  mounted() {},
  computed: {},
  methods:{
    selectMenu(index){
      if(index=="input-file"){
        this.inputFile();
      }
      else if(index==="output-file"){
        this.outputFile()
      }
    },
    inputFile(){
      let that=this;
      ipcRenderer.send("chooseFile")
  },
  outputFile(){
    ipcRenderer.send("outputFile")
  }
  }
};
</script>

<style lang="scss" scoped>
.el-container {
  height: 100%;
}
.el-header {
  padding: 0;
}
.el-main {
  height: 100%;
  padding: 0;
  margin: 0;
  width: 100%;
}
.mark {
  height: 100%;
  width: 100%;
  margin: 0 auto;
}
.el-menu--horizontal {
  height: inherit !important;
  justify-content: center !important;
  text-align: center !important;
}
.menu-item {
  height: 100% !important;
  display: table-cell!important;
  vertical-align: middle!important;
  line-height: 40px!important;
  font-size:20px;
}
.menu-item--text {
  height: 40px!important;
  line-height: 40px;
}
</style>