<template>
  <div class="mcontaner">
    <Header></Header>

    <div class="block">
      <el-timeline>

        <el-timeline-item :timestamp="blog.created" placement="top" v-for="blog in blogs">
          <el-card>
            <h4>
              <router-link :to="{name: 'BlogDetail', params: {blogId: blog.id}}">
                {{blog.title}}
              </router-link>
            </h4>

              <p>{{blog.description}}</p>
                <router-link :to="{name: 'BlogEdit', params: {blogId: blog.id}}" >
                  <el-button type="primary" icon="el-icon-edit" circle size="small" class="anniu" >
                  </el-button>


                </router-link>
              <el-button type="danger" icon="el-icon-delete" circle size="small" class="anniu" @click="shan(blog.id)"></el-button>


          </el-card>
        </el-timeline-item>

      </el-timeline>

      <el-pagination class="mpage"
                     background
                     layout="prev, pager, next"
                     :current-page="currentPage"
                     :page-size="pageSize"
                     :total="total"
                     @current-change=page>
      </el-pagination>

    </div>

  </div>
</template>

<script>
  import Header from "../components/Header";

  export default {
    name: "Blogs.vue",
    components: {Header},
    data() {
      return {
        blogs: {},
        currentPage: 1,
        total: 0,
        pageSize: 5
      }
    },
    methods: {
      page(currentPage) {
        const _this = this
        _this.$axios.get("/blogs?currentPage=" + currentPage).then(res => {
          console.log(res)
          _this.blogs = res.data.data.records
          _this.currentPage = res.data.data.current
          _this.total = res.data.data.total
          _this.pageSize = res.data.data.size

        })
      },
        shan(blogId){
          console.log(blogId)
          const _this = this

          const token = localStorage.getItem("token")
          if (token){
            this.$confirm('此操作将永久删除该博客, 是否继续?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {


              this.$axios.get('/blog/delete/' + blogId).then(res => {
                console.log(res)

                if (res.data.code == 200 ){
                  this.$message({
                    type: 'success',
                    message: '删除成功!'
                  });
                }else{
                  this.$message({
                    type: 'info',
                    message: '删除失败'
                  });
                }
                this.page(this.currentPage);

              })


            }).catch(() => {
              this.$message({
                type: 'info',
                message: '已取消删除'
              });
            });
          }else {
            this.$message({
              type: 'warning',
              message: '你没有权限删除，请先登陆'
            });
          }

        }
    },
    created() {
      this.page(1)
    }
  }
</script>

<style scoped>

  .mpage {
    margin: 0 auto;
    text-align: center;
  }
  .anniu{
        float: right;
        /*float: right;*/
      margin-right: 10px;
      margin-bottom: 10px;
  }

</style>