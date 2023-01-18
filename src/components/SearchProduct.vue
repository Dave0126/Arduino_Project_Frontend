<template>
  <div>
    <h4 align="left">Please enter the barcode of the product you want to query :</h4>
    <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm1">

      <el-form-item label="BarCode" prop="barcode">
        <el-input v-model.number="ruleForm.barcode"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">SEARCH</el-button>
        <el-button @click="resetForm('ruleForm')">RESET</el-button>
      </el-form-item>
    </el-form>

    <el-descriptions title="Basic Info." direction="vertical" :column="3" border>
      <el-descriptions-item label="Product Name">{{product.name}}</el-descriptions-item>
      <el-descriptions-item label="BarCode">{{product.barcode}}</el-descriptions-item>
      <el-descriptions-item label="Quantity">{{product.quantity}}</el-descriptions-item>

      <el-descriptions-item label="Nutriments.energy">{{product.nutriments.energy}}</el-descriptions-item>
      <el-descriptions-item label="Nutriments.carbohydrates">{{product.nutriments.carbohydrates}}</el-descriptions-item>
      <el-descriptions-item label="Nutriments.calcium">{{product.nutriments.calcium}}</el-descriptions-item>
    </el-descriptions>

    <h4 align="left">Ingredients Info.</h4>
    <el-table
        :data="product.ingredients"
        stripe
        border
        style="width: 100%">
      <el-table-column
          prop="rank"
          label="Order of predominance">
      </el-table-column>
      <el-table-column
          prop="id"
          label="Material">
      </el-table-column>
      <el-table-column
          prop="vegan"
          label="IsVegan?">
      </el-table-column>
      <el-table-column
          prop="vegetarian"
          label="IsVegetarian?">
      </el-table-column>
    </el-table>

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
      ruleForm: {
        barcode: ''
      },

      rules: {
        barcode: [
          { validator: checkBarCode, trigger: 'blur' }
        ]
      },

      product: {
        name:'',
        barcode:'',
        quantity:'',
        nutriments: {
          calcium:'',
          carbohydrates:'',
          energy:''
        },
        ingredients:[]
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
            if (res.resultCode == 20041) {
              this.product = res.data;
              this.$message({
                message: res.msg,
                type: 'success'
              });
            } else {
              this.$message.error(res.msg);
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