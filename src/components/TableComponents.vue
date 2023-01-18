<template>
  <div>
    <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm1">
      <el-form-item label="UserName" prop="name">
        <el-input type="text" v-model="ruleForm.name" autocomplete="off"></el-input>
      </el-form-item>

      <el-form-item label="BarCode" prop="barcode">
        <el-input v-model.number="ruleForm.barcode"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">SUBMIT</el-button>
        <el-button @click="resetForm('ruleForm')">RESET</el-button>
      </el-form-item>
    </el-form>

    <el-table
        :data="tableData"
        stripe
        style="width: 100%">
      <el-table-column
          prop="name"
          label="Product Name">
      </el-table-column>
      <el-table-column
          prop="code"
          label="BarCode">
      </el-table-column>
      <el-table-column
          prop="quantity"
          label="Qte">
      </el-table-column>
      <el-table-column
          prop="nutriments.energy"
          label="Energy per 100ml/g">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import axios from "axios";
import TableComponents from "@/components/TableComponents.vue";

export default {
  name: "TableComponents",
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log(this.ruleForm);
          axios.get('http://localhost:8888/arduino_project/user/addProduct', {
            params: {
              username: this.ruleForm.name,
              barcode: this.ruleForm.barcode
            }
          }).then(res => res.data).then(res => {
            if (res.resultCode == 20011) {
              this.tableData = res.data.productList
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
  },

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
      tableData: [],
      ruleForm: {
        name: '',
        barcode: ''
      },
      rules: {
        name: [
          { validator: validateUsername, trigger: 'blur' }
        ],
        barcode: [
          { validator: checkBarCode, trigger: 'blur' }
        ]
      }
    }
  }
}
</script>