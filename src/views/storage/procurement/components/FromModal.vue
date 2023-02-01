<template>
  <BasicModal v-bind="$attrs" @register="registerModal" :title="getTitle" @ok="handleSubmit" width="70%">
    <a-form ref="formRef" :model="orderMainModel" :label-col="labelCol" :wrapper-col="wrapperCol" :rules="validatorRules">

    </a-form>
  </BasicModal>
</template>
<script lang="ts">
  import { defineComponent, ref, reactive, computed, unref, nextTick, defineExpose } from 'vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { JVxeTable } from '/@/components/jeecg/JVxeTable';
  import { useJvxeMethod } from '/@/hooks/system/useJvxeMethods.js';
  export default defineComponent({
    name: 'FromModal',
    components: { BasicModal, JVxeTable },
    props: {
      num: Number,
    },
    emits: ['success', 'register'],
    setup(props, { emit }) {
      const storageId = ref<string>('');
      const isUpdate = ref(true);
      const tableRef1 = ref();
      const tableRef2 = ref();
      const refKeys = ref(['tableRef1', 'tableRef2']);
      const activeKey = ref('tableRef1');
      const tableRefs = { tableRef1, tableRef2 };
      const labelCol = reactive({
        xs: { span: 24 },
        sm: { span: 5 },
      });
      const wrapperCol = reactive({
        xs: { span: 24 },
        sm: { span: 16 },
      });
      const orderMainModel = reactive({
        id: null,
        num: 0,
        storage: '',
        shelves: '',
      });
      const [handleChangeTabs, handleSubmit, requestSubTableData, formRef] = useJvxeMethod(
        requestAddOrEdit,
        classifyIntoFormData,
        tableRefs,
        activeKey,
        refKeys
      );
      const [registerModal, { setModalProps, closeModal }] = useModalInner(async (data) => {
        setModalProps({ confirmLoading: false });
        reset();
        isUpdate.value = !!data?.isUpdate;
      });
      function classifyIntoFormData(allValues) {
        console.log(allValues);
        console.log(orderMainModel);
        let orderMain = Object.assign(orderMainModel, allValues.formValue);
        return {
          ...orderMain, // 展开
          jeecgOrderCustomerList: allValues.tablesValue[0].tableData,
          jeecgOrderTicketList: allValues.tablesValue[1].tableData,
        };
      }
      function handleFormChange(key, value) {
        console.log(key, value);
        orderMainModel[key] = value;
        storageId.value = value;
      }
      function reset() {
        orderMainModel.id = null;
        orderMainModel.storage = '';
        orderMainModel.shelves = '';
        orderMainModel.num = 0;
      }
      function inStorage(record) {
        console.log('获取数据');
        console.log(record);
        nextTick(() => {
          reset();
          //赋值
          Object.assign(orderMainModel, record);
        });
      }
      async function requestAddOrEdit(values) {
        setModalProps({ confirmLoading: true });
        //提交表单
        // await saveOrUpdate(values, unref(isUpdate));
        //关闭弹窗
        closeModal();
        //刷新列表
        emit('success');
      }
      defineExpose({
        inStorage,
      });
      return {
        storageId,
        formRef,
        activeKey,
        tableRef1,
        tableRef2,
        labelCol,
        wrapperCol,
        orderMainModel,
        registerModal,
        handleChangeTabs,
        handleSubmit,
        handleFormChange,
      };
    },
  });
</script>
<style scoped></style>
