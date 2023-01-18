<template>
  <div>
    <h4 align="left">Please register as an user: </h4>
    <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="UserName" prop="name">
        <el-input type="text" v-model="ruleForm.name" autocomplete="off"></el-input>
      </el-form-item>

      <el-form-item label="Age" prop="age">
        <el-input v-model.number="ruleForm.age"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">REGISTER</el-button>
        <el-button @click="resetForm('ruleForm')">RESET</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    var checkAge = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('Age should not be null or 0'));
      }
      setTimeout(() => {
        if (!Number.isInteger(value)) {
          callback(new Error('Please enter a numeric value'));
        } else {
          callback();
        }
      }, 1000);
    };

    var validateUsername = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('Please enter an username'));
      } else {
        if (this.ruleForm.checkUsername !== '') {
          this.$refs.ruleForm.validateField('checkUsername');
        }
        callback();
      }
    };

    return {
      ruleForm: {

        name: '',
        age: ''
      },
      rules: {
        name: [
          { validator: validateUsername, trigger: 'blur' }
        ],
        age: [
          { validator: checkAge, trigger: 'blur' }
        ]
      }
    };
  },

  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log(this.ruleForm);
          axios.post("http://localhost:8888/arduino_project/user/register", this.ruleForm).then(res => res.data).then(res =>{
            console.log(res);
            if (res.resultCode == 10031) {
              this.$message({
                message: res.msg,
                type: 'success'
              });
            } else {
              this.$message.error(res.msg);
            }
          });
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
}
</script>

<style scoped>

</style>