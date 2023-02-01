<template>
  <a-spin :spinning="confirmLoading">
    <a-form class="antd-modal-form" :labelCol="labelCol" :wrapperCol="wrapperCol">
      <div v-for="(item, index) in formData" :key="index">
        <a-row>
          <a-col :span="11">
            <a-form-item label="产品名" v-bind="validateInfos.name">
              <j-dict-select-tag v-model:value="formData[index].name" dictCode="base_goods,name,id" placeholder="请选择产品名" />
            </a-form-item>
          </a-col>
          <a-col :span="11">
            <a-form-item label="计划数量" v-bind="validateInfos.num">
              <a-input-number v-model:value="formData[index].num" placeholder="请输入计划数量" style="width: 100%" />
            </a-form-item>
          </a-col>
          <a-col :span="2" style="padding-left: 0px">
            <a-form-item :labelCol="{ span: 0 }" :wrapperCol="{ span: 24 }">
              <template v-if="formData.length > 1">
                <a-button type="dashaed" @click="removeRow(index)" preIcon="ant-design:minus-outlined" class="minusRowBtn" />
              </template>
            </a-form-item>
          </a-col>
        </a-row>
      </div>
      <a-button type="dashed" @click="addRow"  class="addRowBtn"> 新增一行 </a-button>
    </a-form>
  </a-spin>
</template>

<script lang="ts" setup>
  import { defineExpose, nextTick, reactive, ref } from 'vue';
  import JDictSelectTag from '/@/components/Form/src/jeecg/components/JDictSelectTag.vue';
  import { saveOrUpdate } from '../ProcurementOrder.api';
  import { Form } from 'ant-design-vue';
  import form from '/@/views/demo/form/index.vue';
  // let keysList = [0];
  // const formRef = ref();
  const useForm = Form.useForm;
  interface FormDate {
    name: String;
    num: undefined;
  }
  const formData = reactive<FormDate[]>([]);
  const labelCol = ref<any>({ xs: { span: 24 }, sm: { span: 5 } });
  const wrapperCol = ref<any>({ xs: { span: 24 }, sm: { span: 16 } });
  const confirmLoading = ref<boolean>(false);
  //表单验证
  const validatorRules = {};
  const { resetFields, validate, validateInfos } = useForm(formData, validatorRules, { immediate: true });

  /**
   * 新增
   */
  function add() {
    edit({});
  }

  /**
   * 编辑
   */
  function edit(record) {
    nextTick(() => {
      resetFields();
      //赋值
      Object.assign(formData, record);
    });
  }

  /**
   * 提交数据
   */
  async function submitForm() {
    console.log(formData);
    // 触发表单验证
    confirmLoading.value = true;
    setTimeout(() => {
      confirmLoading.value = false;
    }, 1000);
    //时间格式化
    await saveOrUpdate(formData);
    formData.splice(0, formData.length);
  }

  /**
   * 增加一行
   */
  function addRow() {
    console.log('新增一行');
    formData.push({
      name: '',
      num: undefined,
    });
  }
  function removeRow(k) {
    console.log('减少一行');
    formData.splice(k, 1);
  }

  defineExpose({
    add,
    edit,
    submitForm,
  });
</script>

<style lang="less" scoped>
  .antd-modal-form {
    min-height: 500px !important;
    overflow-y: auto;
    padding: 24px 24px 24px 24px;
  }
  .minusRowBtn {
    color: #f5222d;
    background: #fff1f0;
    border-color: #ffa39e;
    padding-right: 7px;
    padding-left: 7px;
    height: 29px;
    margin-left: 10px;
  }
  .addRowBtn {
    width: 70%;
    color: #1890ff;
    border-color: #91d5ff;
    margin: 0px 0px 20px 70px;
  }
</style>
