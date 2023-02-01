<template>
  <a-card :bordered="false">
    <BasicTable @register="registerTable" :expandedRowKeys="expandedRowKeys" :rowSelection="rowSelection" @expand="handleExpand">
      <template #tableTitle> </template>
      <template #expandedRowRender>
        <BasicTable
          bordered
          size="middle"
          rowKey="id"
          :canResize="false"
          :columns="innerColumns"
          :dataSource="innerData"
          :pagination="false"
          :action-column="actionColumn"
        >
          <template #action="{ record }">
            <TableAction :actions="getTableAction(record)" />
          </template>
        </BasicTable>
      </template>
    </BasicTable>
  </a-card>
  <a-modal v-model:visible="visible" title="填写入库信息" @ok="handleOk" @cancel="cancel">
    <a-form class="antd-modal-form" :labelCol="labelCol" :wrapperCol="wrapperCol">
      <a-row class="form-row" :gutter="16">
        <a-col :span="24">
          <a-form-item label="实际入库数量">
            <a-input :value="orderMainModel.num" placeholder="请输入实际入库数量" type="number" :disabled="disabled" />
            {{ num }}
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="仓库">
            <j-tree-select
              :disabled="disabled"
              treeDefaultExpandAll="true"
              dict="storage,name,id"
              pidValue="0"
              v-model:value="orderMainModel.storage"
              @change="(value) => handleFormChange('storage', value)"
            />
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="货架">
            <j-dict-select-tag
              :disabled="disabled"
              v-model:value="orderMainModel.shelves"
              :dictCode="'base_shelves,code,id' + (storageId === '' ? '' : ',storage_id=' + storageId)"
              placeholder="请选择货架"
            />
          </a-form-item>
        </a-col>
      </a-row>
    </a-form>
  </a-modal>
</template>

<script lang="ts" setup>
  import JTreeSelect from '/@/components/Form/src/jeecg/components/JTreeSelect.vue';
  import JDictSelectTag from '/@/components/Form/src/jeecg/components/JDictSelectTag.vue';
  import { nextTick, reactive, ref } from 'vue';
  import { defHttp } from '/@/utils/http/axios';
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { useModal } from '/@/components/Modal';
  import FromModal from './components/FromModal.vue';
  import { JVxeTypes } from '/@/components/jeecg/JVxeTable/src/types';
  //接口url
  const url = {
    notInStorage: '/procurement/procurementOrderItem/notInStorage',
    inStorage: '/procurement/procurementOrderItem/inStorage',
    list: '/procurement/procurementOrderSupplier/list',
    delete: '/test/order/delete',
    deleteBatch: '/test/order/deleteBatch',
    customerListByMainId: '/procurement/procurementOrderSupplier/queryProcurementOrderItemByMainId',
  };
  let disabled = ref<boolean>();
  const labelCol = ref<any>({ xs: { span: 24 }, sm: { span: 5 } });
  const wrapperCol = ref<any>({ xs: { span: 24 }, sm: { span: 16 } });
  const visible = ref<boolean>(false);
  const storageId = ref<string>('');
  // 展开key
  const expandedRowKeys = ref<any[]>([]);
  // 选择key
  const checkedKeys = ref<any[]>([]);
  // 子表数据
  const innerData = ref<any[]>([]);
  // 主表表头
  const columns = [
    {
      title: '供应商名',
      align: 'center',
      dataIndex: 'supplier',
    },
    {
      title: '供应商地址',
      align: 'center',
      dataIndex: 'location',
    },
    {
      title: '联系人',
      align: 'center',
      dataIndex: 'person',
    },
    {
      title: '电话',
      align: 'center',
      dataIndex: 'phone',
    },
    {
      title: '总金额',
      align: 'center',
      dataIndex: 'totalMoney',
    },
    {
      title: '状态',
      align: 'center',
      dataIndex: 'state_dictText',
    },
    {
      title: '发票类型',
      align: 'center',
      dataIndex: 'invoice_dictText',
    },
    {
      title: '付款方式',
      align: 'center',
      dataIndex: 'paymentWay_dictText',
    },
    {
      title: '运输方式',
      align: 'center',
      dataIndex: 'tranWay_dictText',
    },
    {
      title: '交货日期',
      align: 'center',
      dataIndex: 'deliveryTime',
      customRender: ({ text }) => {
        return !text ? '' : text.length > 10 ? text.substr(0, 10) : text;
      },
    },
    {
      title: '结算方式',
      align: 'center',
      dataIndex: 'settlementWay_dictText',
    },
    {
      title: '结算日期',
      align: 'center',
      dataIndex: 'settlement',
      customRender: ({ text }) => {
        return !text ? '' : text.length > 10 ? text.substr(0, 10) : text;
      },
    },
  ];
  // 子表表头
  const innerColumns = [
    {
      title: '材料名',
      key: 'name',
      dataIndex: 'name',
    },
    {
      title: '规格',
      key: 'specs',
      dataIndex: 'specs',
    },
    {
      title: '数量',
      key: 'num',
      dataIndex: 'num',
    },
    {
      title: '单位',
      key: 'unit',
      dataIndex: 'unit',
    },
    {
      title: '单价',
      key: 'price',
      dataIndex: 'price',
    },
    {
      title: '金额',
      key: 'totalMoney',
      dataIndex: 'totalMoney',
    },
    {
      title: '状态',
      key: 'state_dictCode',
      dataIndex: 'state_dictCode',
    },
  ];
  const orderMainModel = reactive({
    id: null,
    num: 0,
    storage: '',
    shelves: '',
    supplier: '',
  });
  const list = (params) => defHttp.get({ url: url.list, params });
  const [registerModal, { openModal }] = useModal();
  const [registerTable, { reload }] = useTable({
    columns,
    api: list,
    rowKey: 'id',
    striped: true,
    useSearchForm: false,
    showTableSetting: true,
    clickToRowSelect: false,
    bordered: true,
  });
  const actionColumn = {
    width: 110,
    title: '操作',
    dataIndex: 'action',
    slots: { customRender: 'action' },
    fixed: undefined,
  };

  /**
   * 选择列配置
   */
  const rowSelection = {
    type: 'checkbox',
    columnWidth: 30,
    selectedRowKeys: checkedKeys,
    onChange: onSelectChange,
  };
  function cancel() {
    visible.value = false;
    reload();
  }
  async function handleOk() {
    visible.value = false;
    console.log(orderMainModel);
    await reload();
    await defHttp.get({ url: url.inStorage, params: { id: orderMainModel.id } }, { joinParamsToUrl: true }).then(() => {
      reload();
    });
    await defHttp.get({ url: url.customerListByMainId, params: { id: orderMainModel.supplier } }, { isTransformResponse: false }).then((res) => {
      if (res.success) {
        for (let i = 0; i < res.result.length; i++) {
          if (res.result[i].state == '2') {
            Object.defineProperty(res.result[i], 'state_dictCode', {
              value: '已入库',
              writable: true,
              enumerable: true,
            });
          } else {
            Object.defineProperty(res.result[i], 'state_dictCode', {
              value: '未入库',
              writable: true,
              enumerable: true,
            });
          }
        }
        innerData.value = res.result;
        console.log(innerData.value);
      }
    });
  }
  /**
   * 选择事件
   */
  function onSelectChange(selectedRowKeys: (string | number)[]) {
    checkedKeys.value = selectedRowKeys;
  }
  function handleFormChange(key, value) {
    console.log(key, value);
    orderMainModel[key] = value;
    storageId.value = value;
  }
  /**
   * 展开事件
   * */
  function handleExpand(expanded, record) {
    console.log('展开事件');
    expandedRowKeys.value = [];
    innerData.value = [];
    if (expanded === true) {
      console.log(expanded);
      expandedRowKeys.value.push(record.id);
      console.log(record.id);
      defHttp.get({ url: url.customerListByMainId, params: { id: record.id } }, { isTransformResponse: false }).then((res) => {
        if (res.success) {
          for (let i = 0; i < res.result.length; i++) {
            if (res.result[i].state == '2') {
              Object.defineProperty(res.result[i], 'state_dictCode', {
                value: '已入库',
                writable: true,
                enumerable: true,
              });
            } else {
              Object.defineProperty(res.result[i], 'state_dictCode', {
                value: '未入库',
                writable: true,
                enumerable: true,
              });
            }
          }
          innerData.value = res.result;
          console.log(innerData.value);
        }
      });
    }
  }
  function reset() {
    orderMainModel.id = null;
    orderMainModel.storage = '';
    orderMainModel.shelves = '';
    orderMainModel.num = 0;
  }
  /**
   * 编辑事件
   */
  function handleInStorage(record) {
    disabled.value = record.state == '2';
    visible.value = true;
    reset();
    console.log(record);
    orderMainModel.num = record.num;
    orderMainModel.id = record.id;
    orderMainModel.supplier = record.supplier;
  }
  /**
   * 反入库事件
   */
  function handleNotInStorage(record) {
    defHttp.get({ url: url.notInStorage, data: { id: record.id } }, { joinParamsToUrl: true }).then(() => {
      reload();
    });
  }
  /**
   * 操作栏
   */
  function getTableAction(record) {
    return [
      {
        label: '入库',
        onClick: handleInStorage.bind(null, record),
        disabled: !(record.state == '1'),
      },
      {
        label: '反入库',
        disabled: !(record.state == '2'),
        popConfirm: {
          title: '是否反入库',
          confirm: handleNotInStorage.bind(null, record),
        },
      },
    ];
  }
</script>
<style scoped>
  .ant-card-body .table-operator {
    margin-bottom: 18px;
  }

  .ant-table-tbody .ant-table-row td {
    padding-top: 15px;
    padding-bottom: 15px;
  }

  .anty-row-operator button {
    margin: 0 5px;
  }

  .ant-btn-danger {
    background-color: #ffffff;
  }

  .ant-modal-cust-warp {
    height: 100%;
  }

  .ant-modal-cust-warp .ant-modal-body {
    height: calc(100% - 110px) !important;
    overflow-y: auto;
  }

  .ant-modal-cust-warp .ant-modal-content {
    height: 90% !important;
    overflow-y: hidden;
  }
</style>
