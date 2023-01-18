<template>
  <div>
    <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm1">

      <el-form-item label="BarCode" prop="barcode">
        <el-input v-model.number="ruleForm.barcode"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">SUBMIT</el-button>
        <el-button @click="resetForm('ruleForm')">RESET</el-button>
      </el-form-item>
    </el-form>

    <el-descriptions title="垂直带边框列表" direction="vertical" :column="4" border>
      <el-descriptions-item label="Product Name">{{productName}}</el-descriptions-item>
      <el-descriptions-item label="BarCode" :span="2">18100000000</el-descriptions-item>
      <el-descriptions-item label="居住地">苏州市</el-descriptions-item>
      <el-descriptions-item label="联系地址">江苏省苏州市吴中区吴中大道 1188 号</el-descriptions-item>
    </el-descriptions>

    <el-descriptions class="margin-top" title="垂直无边框列表" :column="4" direction="vertical">
      <el-descriptions-item label="用户名">kooriookami</el-descriptions-item>
      <el-descriptions-item label="手机号">18100000000</el-descriptions-item>
      <el-descriptions-item label="居住地" :span="2">苏州市</el-descriptions-item>
      <el-descriptions-item label="备注">
        <el-tag size="small">学校</el-tag>
      </el-descriptions-item>
      <el-descriptions-item label="联系地址">江苏省苏州市吴中区吴中大道 1188 号</el-descriptions-item>
    </el-descriptions>
  </div>
</template>


<script>
import axios from "axios";

export default {
  data() {
    var checkBarCode = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('BarCode should not be null'));
      }
      setTimeout(() => {
        if (!Number.isInteger(value)) {
          callback(new Error('Please enter a numeric value'));
        } else {
          callback();
        }
      }, 1000);
    };

    return {
      productName:'',
      ruleForm: {
        barcode: ''
      },
      rules: {
        barcode: [
          { validator: checkBarCode, trigger: 'blur' }
        ]
      }
    };
  },

  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log(this.ruleForm);
          axios.get('http://localhost:8888/arduino_project/product/search', {
            params: {
              barcode: this.ruleForm.barcode
            }
          }).then(res => res.data).then(res => {
            if (res.resultCode == 20011) {
              this.productName = res.msg;
            } else {
              alert(res.msg)
            }
            console.log(res)
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