<template>
  <a-spin :spinning="confirmLoading">
    <a-form ref="formRef" class="antd-modal-form" :labelCol="labelCol" :wrapperCol="wrapperCol">
      <a-row>
        <a-col :span="24">
          <a-form-item label="材料名" v-bind="validateInfos.name">
            <j-popup
              placeholder="请选择材料名"
              v-model:value="formData.name"
              code="procurement_order_item"
              :fieldConfig="[
                { source: 'name', target: 'name' },
                { source: 'specs', target: 'specs' },
                { source: 'num', target: 'num' },
                { source: 'price', target: 'price' },
                { source: 'unit', target: 'unit' },
                { source: 'total_money', target: 'totalMoney' },
              ]"
              :multi="true"
              :setFieldsValue="setFieldsValue"
              :disabled="disabled"
            />
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="规格" v-bind="validateInfos.specs">
            <a-input v-model:value="formData.specs" placeholder="请输入规格" :disabled="disabled" />
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="数量" v-bind="validateInfos.num">
            <a-input-number v-model:value="formData.num" placeholder="请输入数量" style="width: 100%" :disabled="disabled" />
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="单价" v-bind="validateInfos.price">
            <a-input-number v-model:value="formData.price" placeholder="请输入单价" style="width: 100%" :disabled="disabled" />
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="单位" v-bind="validateInfos.unit">
            <a-input v-model:value="formData.unit" placeholder="请输入单位" :disabled="disabled" />
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="总金额" v-bind="validateInfos.totalMoney">
            <a-input-number v-model:value="formData.totalMoney" placeholder="请输入总金额" style="width: 100%" :disabled="disabled" />
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="仓库" v-bind="validateInfos.storage">
            <j-tree-select
              treeDefaultExpandAll="true"
              dict="storage,name,id"
              pidValue="0"
              :disabled="disabled"
              v-model:value="formData.storage"
              @change="(value) => handleFormChange('storage', value)"
            />
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="货架" v-bind="validateInfos.shelves">
            <j-dict-select-tag
              v-model:value="formData.shelves"
              :dictCode="'base_shelves,code,id' + (storageId === '' ? '' : ',storage_id=' + storageId)"
              placeholder="请选择货架"
              :disabled="disabled"
            />
          </a-form-item>
        </a-col>
      </a-row>
    </a-form>
  </a-spin>
</template>

<script lang="ts" setup>
  import { ref, reactive, defineExpose, nextTick, defineProps, computed, onMounted } from 'vue';
  import { defHttp } from '/@/utils/http/axios';
  import { useMessage } from '/@/hooks/web/useMessage';
  import JDictSelectTag from '/@/components/Form/src/jeecg/components/JDictSelectTag.vue';
  import JPopup from '/@/components/Form/src/jeecg/components/JPopup.vue';
  import JTreeSelect from '/@/components/Form/src/jeecg/components/JTreeSelect.vue';
  import { getValueType } from '/@/utils';
  import { saveOrUpdate } from '../StorageProcurement.api';
  import { Form } from 'ant-design-vue';

  const props = defineProps({
    formDisabled: { type: Boolean, default: false },
    formData: { type: Object, default: () => {} },
    formBpm: { type: Boolean, default: true },
  });
  const storageId = ref<string>('');
  const formRef = ref();
  const useForm = Form.useForm;
  const emit = defineEmits(['register', 'ok']);
  const formData = reactive<Record<string, any>>({
    id: '',
    name: '',
    specs: '',
    num: undefined,
    price: undefined,
    unit: '',
    totalMoney: undefined,
    storage: '',
    shelves: '',
  });
  const { createMessage } = useMessage();
  const labelCol = ref<any>({ xs: { span: 24 }, sm: { span: 5 } });
  const wrapperCol = ref<any>({ xs: { span: 24 }, sm: { span: 16 } });
  const confirmLoading = ref<boolean>(false);
  //表单验证
  const validatorRules = {};
  const { resetFields, validate, validateInfos } = useForm(formData, validatorRules, { immediate: true });

  // 表单禁用
  const disabled = computed(() => {
    if (props.formBpm === true) {
      if (props.formData.disabled === false) {
        return false;
      } else {
        return true;
      }
    }
    return props.formDisabled;
  });

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
    // 触发表单验证
    await validate();
    confirmLoading.value = true;
    const isUpdate = ref<boolean>(false);
    //时间格式化
    let model = formData;
    if (model.id) {
      isUpdate.value = true;
    }
    //循环数据
    for (let data in model) {
      //如果该数据是数组并且是字符串类型
      if (model[data] instanceof Array) {
        let valueType = getValueType(formRef.value.getProps, data);
        //如果是字符串类型的需要变成以逗号分割的字符串
        if (valueType === 'string') {
          model[data] = model[data].join(',');
        }
      }
    }
    await saveOrUpdate(model, isUpdate.value)
      .then((res) => {
        if (res.success) {
          createMessage.success(res.message);
          emit('ok');
        } else {
          createMessage.warning(res.message);
        }
      })
      .finally(() => {
        confirmLoading.value = false;
      });
  }

  /**
   *  popup组件值改变事件
   */
  function setFieldsValue(map) {
    Object.keys(map).map((key) => {
      formData[key] = map[key];
    });
  }

  /**
   * 值改变事件触发
   * @param key
   * @param value
   */
  function handleFormChange(key, value) {
    formData[key] = value;
    storageId.value = value;
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
</style>
