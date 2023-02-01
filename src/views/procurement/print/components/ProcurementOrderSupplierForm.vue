<template>
  <div style="text-align: right">
    <a-button type="primary" ghost @click="onPrint">打印</a-button>
  </div>
  <section ref="print" id="printContent">
    <a-spin :spinning="loading">
      <a-row>
        <a-col style="font-size: 25px; text-align: center" class="title" :span="24">采购订单</a-col>
      </a-row>
      <a-row style="margin-left: 5%">
        <a-col :span="12"> 供应商名：{{ formData.supplier }} </a-col>
        <a-col :span="12"> 供应商地址：{{ formData.location }} </a-col>
        <a-col :span="12"> 联系人：{{ formData.person }} </a-col>
        <a-col :span="12"> 电话：{{ formData.phone }} </a-col>
        <a-col :span="12"> 总金额：{{ formData.totalMoney }} </a-col>
        <a-col :span="12"> 发票类型：{{ formData.invoice }} </a-col>
        <a-col :span="12"> 付款方式：{{ formData.paymentWay }} </a-col>
        <a-col :span="12"> 运输方式：{{ formData.tranWay }} </a-col>
        <a-col :span="12"> 交货日期：{{ formData.deliveryTime }} </a-col>
        <a-col :span="12"> 结算方式：{{ formData.settlementWay }} </a-col>
        <a-col :span="12"> 结算日期：{{ formData.settlement }} </a-col>
      </a-row>

      <!-- 子表单区域 -->
      <j-vxe-table
        :keep-source="true"
        resizable
        ref="procurementOrderItemTableRef"
        :loading="procurementOrderItemTable.loading"
        :columns="procurementOrderItemTable.columns"
        :dataSource="procurementOrderItemTable.dataSource"
        :disabled="true"
      />
      <a-row style="margin-left: 5%">
        <a-col :span="12">业务部门：{{ user.dept }}</a-col>
        <a-col :span="12">制单人：{{ user.user }}</a-col>
      </a-row>
    </a-spin>
  </section>
</template>

<script lang="ts">
  import { defineComponent, ref, reactive, computed, toRaw } from 'vue';
  import { useValidateAntFormAndTable } from '/@/hooks/system/useJvxeMethods';
  import { queryProcurementOrderItemListByMainId, queryDataById, saveOrUpdate } from '../ProcurementOrderSupplier.api';
  import { JVxeTable } from '/@/components/jeecg/JVxeTable';
  import { procurementOrderItemColumns } from '../ProcurementOrderSupplier.data';
  import { Form } from 'ant-design-vue';
  import { printJS } from '/@/hooks/web/usePrintJS';
  import { getUser } from '../ProcurementOrderSupplier.api';
  const useForm = Form.useForm;

  export default defineComponent({
    name: 'ProcurementOrderSupplierForm',
    components: {
      JVxeTable,
    },
    props: {
      formDisabled: {
        type: Boolean,
        default: false,
      },
      formData: { type: Object, default: () => {} },
      formBpm: { type: Boolean, default: true },
    },
    emits: ['success'],
    setup(props, { emit }) {
      const loading = ref(false);
      const procurementOrderItemTableRef = ref();
      const procurementOrderItemTable = reactive<Record<string, any>>({
        loading: false,
        columns: procurementOrderItemColumns,
        dataSource: [],
      });
      const activeKey = ref('procurementOrderItem');
      const formData = reactive<Record<string, any>>({
        id: '',
        supplier: '',
        location: '',
        person: '',
        phone: '',
        totalMoney: '',
        state: '',
        invoice: '',
        paymentWay: '',
        tranWay: '',
        deliveryTime: '',
        settlementWay: '',
        settlement: '',
      });
      const user = reactive<Record<string, any>>({
        user: '',
        dept: '',
      });

      //表单验证
      const validatorRules = reactive({});
      const { resetFields, validate, validateInfos } = useForm(formData, validatorRules, { immediate: true });
      const dbData = {};
      const formItemLayout = {
        labelCol: { xs: { span: 24 }, sm: { span: 5 } },
        wrapperCol: { xs: { span: 24 }, sm: { span: 16 } },
      };

      // 表单禁用
      const disabled = computed(() => {
        if (props.formBpm === true) {
          return props.formData.disabled !== false;
        }
        return props.formDisabled;
      });

      function add() {
        resetFields();
        procurementOrderItemTable.dataSource = [];
      }
      function onPrint() {
        printJS({
          printable: '#printContent',
          type: 'html',
        });
      }

      async function edit(row) {
        await getUserInfo();
        //主表数据
        await queryMainData(row.id);
        //子表数据
        const procurementOrderItemDataList = await queryProcurementOrderItemListByMainId(row['id']);
        procurementOrderItemTable.dataSource = [...procurementOrderItemDataList];
      }

      async function queryMainData(id) {
        const row = await queryDataById(id);
        Object.keys(row).map((k) => {
          formData[k] = row[k];
        });
      }
      async function getUserInfo() {
        const Info = await getUser();
        for (let key in Info) {
          user['user'] = key;
          user['dept'] = Info[key];
        }
        console.log(user);
      }

      const { getSubFormAndTableData, transformData } = useValidateAntFormAndTable(activeKey, {
        procurementOrderItem: procurementOrderItemTableRef,
      });

      async function getFormData() {
        await validate();
        return transformData(toRaw(formData));
      }

      async function submitForm() {
        const mainData = await getFormData();
        const subData = await getSubFormAndTableData();
        const values = Object.assign({}, dbData, mainData, subData);
        console.log('表单提交数据', values);
        const isUpdate = !!values.id;
        await saveOrUpdate(values, isUpdate);
        //关闭弹窗
        emit('success');
      }

      function setFieldsValue(values) {
        if (values) {
          Object.keys(values).map((k) => {
            formData[k] = values[k];
          });
        }
      }

      /**
       * 值改变事件触发-树控件回调
       * @param key
       * @param value
       */
      function handleFormChange(key, value) {
        formData[key] = value;
      }

      return {
        user,
        onPrint,
        procurementOrderItemTableRef,
        procurementOrderItemTable,
        validatorRules,
        validateInfos,
        activeKey,
        loading,
        formData,
        setFieldsValue,
        handleFormChange,
        formItemLayout,
        disabled,
        getFormData,
        submitForm,
        add,
        edit,
      };
    },
  });
</script>
