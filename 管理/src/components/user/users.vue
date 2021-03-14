<template>
  <div id="users">
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '../index' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: './users' }"
        >用户管理</el-breadcrumb-item
      >
      <el-breadcrumb-item :to="{ path: './users' }"
        >用户列表</el-breadcrumb-item
      >
    </el-breadcrumb>
    <!-- 卡片视图区域 -->
    <el-card>
      <!-- 搜索与添加区域 -->
      <el-row :gutter="1">
        <el-col :span="9">
          <el-input
            placeholder="请输入内容"
            v-model="getlist.query"
            clearable
            @clear="getUserList"
          >
            <el-button
              slot="append"
              icon="el-icon-search"
              @click="getUserList"
            ></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button @click="dialogVisible = true">添加用户</el-button>
        </el-col>
      </el-row>
      <!-- 用户列表区域 -->
      <el-table :data="userlist" border stripe>
        <el-table-column label="#" type="index"></el-table-column>
        <el-table-column label="姓名" prop="username"></el-table-column>
        <el-table-column label="邮箱" prop="email"></el-table-column>
        <el-table-column label="电话" prop="create_time"></el-table-column>
        <el-table-column label="角色" prop="role_name"></el-table-column>
        <el-table-column label="状态">
          <!-- 作用于插槽 -->
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.mg_state"
              @change="userStateChanged(scope.row)"
            >
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <!-- 作用域插槽 -->
          <template slot-scope="scope">
            <!-- 修改按钮 -->
            <el-button
              type="primary"
              icon="el-icon-edit"
              @click="showedit(scope.row.id)"
            ></el-button>
            <!-- 删除按钮 -->
            <el-button
              type="danger"
              icon="el-icon-delete"
              @click="removeUserByid(scope.row.id)"
            ></el-button>
            <!-- 分配角色按钮 -->
            <el-tooltip
              effect="dark"
              content="分配角色"
              placement="top"
              :enterable="false"
            >
              <el-button
                type="warning"
                @click="setRole(scope.row)"
                icon="el-icon-setting"
              ></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页器 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="getlist.pagenum"
        :page-sizes="[2, 5, 10, 20]"
        :page-size="this.getlist.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </el-card>
    <!-- 添加用户的对话框 -->
    <el-dialog
      title="添加用户"
      :visible.sync="dialogVisible"
      width="40%"
      @close="addclose"
    >
      <!-- 内容主题区域 -->
      <el-form
        :model="addForm"
        :rules="addFormRules"
        ref="addFormRef"
        label-width="70px"
      >
        <el-form-item label="用户名" prop="username">
          <el-input v-model="addForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="addForm.password"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="addForm.email"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="mobile">
          <el-input v-model="addForm.mobile"></el-input>
        </el-form-item>
      </el-form>
      <!-- 底部区域 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addUser">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 修改用户的对话框 -->
    <el-dialog
      title="修改用户"
      :visible.sync="editDialogVisible"
      width="30%"
      @close="elDialogClosed"
    >
      <el-form
        :model="editForm"
        :rules="editFormRules"
        ref="editFormRef"
        label-width="70px"
      >
        <el-form-item label="用户名">
          <el-input v-model="editForm.username" disabled></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="editForm.email"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="mobile ">
          <el-input v-model="editForm.mobile"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editUserInfo">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 分配角色的对话框 -->
    <el-dialog
      title="分配角色"
      :visible.sync="setRoleDialogVisible"
      width="50%"
      @close="setRoleDialogClosed"
    >
      <div class="fenpei">
        <p>当前的用户：{{ userInfo.username }}</p>
        <p>当前的角色：{{ userInfo.role_name }}</p>
        <p>
          分配的角色:
          <el-select v-model="selectedRoleid" placeholder="请选择">
            <el-option
              v-for="item in roleslist"
              :key="item.id"
              :label="item.roleName"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </p>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="setRoleDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveRoleInfo"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: {},
  data() {
    // 验证邮箱的验证规则
    var checkemail = (rule, value, cd) => {
      // 验证邮箱的正则
      const regEmail = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/;
      //  判断邮箱的输入是否合法
      if (regEmail.test(value)) {
        return cd();
      }
      cd(new Error("请输入合法的邮箱"));
    };
    // 验证手机号的验证规则
    var checkmobile = (rule, value, cd) => {
      // 验证手机号的正则
      const regMobile = /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/;
      //  判断手机号的输入是否合法
      if (regMobile.test(value)) {
        return cd();
      }
      cd(new Error("请输入合法的手机号"));
    };
    return {
      getlist: {
        query: "",
        // 当前的页数
        pagenum: 1,
        // 每页显示的条数
        pagesize: 2,
      },
      // 需要被分配角色的用户信息
      userInfo: {},
      // 已选中的角色ID值
      selectedRoleid:'', 
      // 所有的用户列表
      userlist: [],
      // 总数据条数
      total: 0,
      // 分配角色的例表信息
      roleslist: [],
      // 控制添加用户的对话框显示与隐藏
      dialogVisible: false,
      // 控制修改用户的对话框显示与隐藏
      editDialogVisible: false,
      // 添加用户的表单数据
      addForm: {
        username: "",
        password: "",
        email: "",
        mobile: "",
      },
      // 添加表单的验证规则对象
      addFormRules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 3, max: 8, message: "长度在 3 到 8 个字符", trigger: "blur" },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 6,
            max: 15,
            message: "长度在 6 到 15 个字符",
            trigger: "blur",
          },
        ],
        email: [
          { required: true, message: "请输入邮箱", trigger: "blur" },
          { validator: checkemail, trigger: "blur" },
        ],
        mobile: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          { validator: checkmobile, trigger: "blur" },
        ],
      },
      // 查询到的用户信息对象
      editForm: {},
      // 修改表单的验证规则对象
      editFormRules: {
        email: [
          { required: true, message: "请输入邮箱", trigger: "blur" },
          { validator: checkemail, trigger: "blur" },
        ],
        mobile: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          { validator: checkmobile, trigger: "blur" },
        ],
      },
      // 控制修改用户的对话框显示与隐藏
      setRoleDialogVisible: false,
    };
  },
  created() {
    this.getUserList();
  },
  methods: {
    getUserList() {
      this.axios
        .get("/api/users", {
          params: this.getlist,
        })
        .then((res) => {
          if (res.meta.status !== 200) {
            return this.$message.error("用户列表获取失败");
          }
          this.userlist = res.data.users;
          this.total = res.data.total;
          console.log(res);
        });
    },
    // 监听分页器
    handleSizeChange(val) {
      this.getlist.pagesize = val;
      this.getUserList();
    },
    // 监听每页显示数量
    handleCurrentChange(val) {
      this.getlist.pagenum = val;
      this.getUserList();
    },
    // 监听开关变化
    userStateChanged(user) {
      console.log(user);
      this.axios
        .put(`/api/users/${user.id}/state/${user.mg_state}`)
        .then((res) => {
          console.log(res);
          if (res.meta.status !== 200) {
            user.mg_state = !user.mg_state;
            this.$message.error("更新用户状态失败！");
          }
          this.$message.success("更新用户状态成功！");
        });
    },
    // 监听添加用户对话框的关闭事件
    addclose() {
      this.$refs.addFormRef.resetFields();
    },
    // 监听用户点击确定按钮添加新用户
    addUser() {
      this.$refs.addFormRef.validate((val) => {
        if (!val) return;
        // 可以发起添加用户的网络请求
        this.axios.post("/api/users", this.addForm).then((res) => {
          console.log(res);
          if (res.meta.status != 201) {
            this.$message.error("添加用户失败！");
          }
          this.$message.success("添加用户成功！");
          // 添加成功时，隐藏对话框
          this.dialogVisible = false;
          // 从新获取用户列表
          this.getUserList();
        });
      });
    },
    // 展示编辑用户的对话框
    showedit(id) {
      this.axios.get("/api/users/" + id).then((res) => {
        if (res.meta.status != 200) {
          this.$message.error("用户信息获取失败");
        }
        this.editForm = res.data;
        this.editDialogVisible = true;
      });
    },
    // 监听修改用户对话框的关闭事件
    elDialogClosed() {
      this.$refs.editFormRef.resetFields();
    },
    // 修改用户信息并提交
    editUserInfo() {
      this.$refs.editFormRef.validate((val) => {
        // 如果不通过，return出去
        if (!val) return;
        //  发起修改用户信息的网络请求
        this.axios
          .put("/api/users/" + this.editForm.id, {
            email: this.editForm.email,
            mobile: this.editForm.mobile,
          })
          .then((res) => {
            if (res.meta.status !== 200) {
              return this.$message.error("用户更新失败");
            }
            // 关闭对话框
            this.editDialogVisible = false;
            // 刷新数据列表
            this.getUserList();
            // 提示修改成功
            this.$message.success("更新用户信息成功");
          });
      });
    },
    // 根据ID删除用户
    removeUserByid(id) {
      // 弹框询问是否删除
      this.$confirm("此操作将永久删除该用户, 是否继续?", "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then((res) => {
          console.log(res);
          this.axios.delete("/api/users/" + id).then((ree) => {
            if (ree.meta.status !== 200) {
              this.$message.error("删除用户失败！");
            }
            this.$message.success("删除用户成功！");
            this.getUserList();
          });
        })
        .catch((err) => {
          console.log(err);
          if (err != "confirm") {
            return this.$message.info("已取消删除");
          }
        });
    },
    // 展示分配角色的对话框
    setRole(userInfo) {
      this.userInfo = userInfo;
      // 在展示对话框之前获取所有角色列表
      this.axios("/api/roles").then((res) => {
        if (res.meta.status !== 200) {
          return this.$message.error("角色列表获取失败");
        }
        this.roleslist = res.data;
      });
      this.setRoleDialogVisible = true;
    },
    //  点击按钮分配角色
    saveRoleInfo(){
      if (!this.selectedRoleid) {
        return this.$message.error('请选择要分配的角色')
      }
      this.axios.put(`/api/users/${this.userInfo.id}/role`,{
        rid:this.selectedRoleid
      }).then(res=>{
        if(res.meta.status!==200){
          this.$message.error('更新角色失败！')
        }
        this.$message.success('角色更新成功！')
        this.getUserList();
        this.setRoleDialogVisible=false;
      })
    },
    // 监听分配角色对话框的关闭
    setRoleDialogClosed(){
      this.selectedRoleid='';
      this.userInfo={}
    }
  },

  components: {},
};
</script>

<style scoped lang="less">
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
#users {
  padding: 10px;
  width: 100%;
  height: 100%;
  .el-breadcrumb {
    margin-bottom: 20px;
  }
  .el-card {
    box-shadow: 0 1px 1px rgba(0, 0, 0, 0.15);
    .el-card__body {
      .el-row {
        .el-col-4 {
          .el-button--default {
            width: 100px;
            height: 40px;
            background-color: #3f9eff;
            color: white;
          }
        }
      }
    }
    .el-table {
      margin-top: 20px;
      font-size: 13px;
    }
    .el-pagination {
      margin-top: 20px;
    }
  }
}
.cell {
  button {
    width: 50px;
    height: 30px;
  }
}
.el-dialog {
  .el-dialog__body {
    .el-form {
      .el-form-item {
        margin-bottom: 20px;
      }
    }
  }
  .el-dialog__footer {
    .dialog-footer {
      button {
        width: 50px;
        height: 30px;
        line-height: 30px;
        text-align: center;
      }
    }
  }
}
// 分配角色
.fenpei {
  height: 100px;
  text-align: left;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}
</style>
