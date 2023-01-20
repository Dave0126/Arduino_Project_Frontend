<template>
  <div>
    <h4 align="left">Please enter the user name and the barcode of the product:</h4>
    <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm1">
      <el-form-item label="UserName" prop="name">
        <el-input type="text" v-model="ruleForm.name" autocomplete="off"></el-input>
      </el-form-item>

      <el-form-item label="BarCode" prop="barcode">
        <el-input v-model.number="ruleForm.barcode"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">ADD</el-button>
        <el-button @click="resetForm('ruleForm')">RESET</el-button>
      </el-form-item>
    </el-form>

    <el-divider></el-divider>

    <h4 align="left">Daily Nutrition Info.</h4>
    <el-row :gutter="20">
      <el-col :span="8">
        <el-progress type="circle" :percentage="percentage_Energy" :color="customColorMethod"></el-progress>
        <h5 align="center"><b>Energy</b> : {{dailyNutrition.dailyEnergy}} KCal <sup>[1]</sup></h5>
        <small align="center"><sup>[1]</sup> The daily <b>Energy</b> intake recommended by WHO is <b>2500</b> KCal</small>
      </el-col>
      <el-col :span="8">
        <el-progress type="circle" :percentage="percentage_Calcium" :color="customColorMethod"></el-progress>
        <h5 align="center"><b>Calcium</b> : {{dailyNutrition.dailyCalcium}} g <sup>[2]</sup></h5>
        <small align="center"><sup>[2]</sup> The daily <b>Calcium</b> intake recommended by WHO is <b>10</b> g</small>
      </el-col>
      <el-col :span="8">
        <el-progress type="circle" :percentage="percentage_Carbohydrates" :color="customColorMethodForCarbohydrates"></el-progress>
        <h5 align="center"><b>Carbohydrates</b> : {{dailyNutrition.dailyCarbohydrates}} g <sup>[3]</sup></h5>
        <small align="center"><sup>[3]</sup> The WHO recommended daily intake of <b>Carbohydrates</b> is <b>10%</b> of <b>total energy intake</b></small>
      </el-col>
    </el-row>

    <el-divider></el-divider>

    <h4 align="left">Daily Intake of Products Info.</h4>
    <el-table
        :data="tableData"
        stripe
        style="width: 100%">
      <el-table-column
          prop="name"
          label="Product Name">
      </el-table-column>
      <el-table-column
          prop="barcode"
          label="BarCode">
      </el-table-column>
      <el-table-column
          prop="quantity"
          label="Quantity">
      </el-table-column>
      <el-table-column
          prop="nutriments.energy"
          label="Energy (Kcal/100g)">
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
              this.tableData = res.data.productList;

              this.dailyNutrition.dailyEnergy = res.data.dailyEnergy;
              this.dailyNutrition.dailyCalcium = res.data.dailyCalcium;
              this.dailyNutrition.dailyCarbohydrates = res.data.dailyCarbohydrates;

              this.percentage_Energy = Math.ceil(res.data.dailyEnergy/2500*100);
              if(this.percentage_Energy > 70 && this.percentage_Energy < 90) {
                this.$notify({
                  title: 'WARNING',
                  message: 'Today\'s energy intake is about to reach the recommended value',
                  type: 'warning'
                });
              } else if(this.percentage_Energy >= 90) {
                this.$notify({
                  title: 'ALARM',
                  message: 'Please manage your energy intake',
                  type: 'error'
                });
              }

              this.percentage_Calcium = Math.ceil(res.data.dailyCalcium/10*100);
              this.percentage_Carbohydrates = Math.ceil(res.data.dailyCarbohydrates / res.data.dailyEnergy*100);

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
    },
    customColorMethod(percentage) {
      if (percentage < 70) {
        return '#67c23a';
      } else if(percentage < 90) {
        return '#e6a23c';
      } else {
        return '#ff0000';
      }
    },
    customColorMethodForCarbohydrates(percentage) {
      if (percentage < 8) {
        return '#67c23a';
      } else if(percentage >= 8 && percentage <= 10) {
        return '#e6a23c';
      } else {
        return '#ff0000';
      }
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
      dailyNutrition: {
        dailyEnergy: '',
        dailyCalcium: '',
        dailyCarbohydrates: ''
      },
      percentage_Energy:'',
      percentage_Calcium:'',
      percentage_Carbohydrates:'',
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

<style>
.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
</style>