import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import { rules } from '/@/utils/helper/validator';
import { render } from '/@/utils/common/renderUtils';
import { JVxeTypes, JVxeColumn } from '/@/components/jeecg/JVxeTable/types';
//列表数据
export const columns: BasicColumn[] = [
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
//查询数据
export const searchFormSchema: FormSchema[] = [];
//表单数据
export const formSchema: FormSchema[] = [
  {
    label: '供应商名',
    field: 'supplier',
    component: 'JPopup',
    componentProps: ({ formActionType }) => {
      const { setFieldsValue } = formActionType;
      return {
        setFieldsValue: setFieldsValue,
        code: 'supplier',
        fieldConfig: [
          { source: 'name', target: 'supplier' },
          { source: 'location', target: 'location' },
          { source: 'person', target: 'person' },
          { source: 'phone', target: 'phone' },
        ],
        multi: true,
      };
    },
  },
  {
    label: '供应商地址',
    field: 'location',
    component: 'Input',
  },
  {
    label: '联系人',
    field: 'person',
    component: 'Input',
  },
  {
    label: '电话',
    field: 'phone',
    component: 'Input',
  },
  {
    label: '总金额',
    field: 'totalMoney',
    component: 'InputNumber',
  },
  {
    label: '状态',
    field: 'state',
    component: 'JDictSelectTag',
    componentProps: {
      dictCode: 'state',
    },
  },
  {
    label: '发票类型',
    field: 'invoice',
    component: 'JDictSelectTag',
    componentProps: {
      dictCode: 'invoice',
    },
  },
  {
    label: '付款方式',
    field: 'paymentWay',
    component: 'JDictSelectTag',
    componentProps: {
      dictCode: 'payment_way',
    },
  },
  {
    label: '运输方式',
    field: 'tranWay',
    component: 'JDictSelectTag',
    componentProps: {
      dictCode: 'tran_way',
    },
  },
  {
    label: '交货日期',
    field: 'deliveryTime',
    component: 'DatePicker',
  },
  {
    label: '结算方式',
    field: 'settlementWay',
    component: 'JDictSelectTag',
    componentProps: {
      dictCode: 'settlement_way',
    },
  },
  {
    label: '结算日期',
    field: 'settlement',
    component: 'DatePicker',
  },
  // TODO 主键隐藏字段，目前写死为ID
  {
    label: '',
    field: 'id',
    component: 'Input',
    show: false,
  },
];
//子表单数据
//子表表格配置
export const procurementOrderItemColumns: JVxeColumn[] = [
  {
    title: '材料名',
    key: 'name',
    type: JVxeTypes.popup,
    popupCode: 'base_material',
    fieldConfig: [
      { source: 'name', target: 'name' },
      { source: 'specs', target: 'specs' },
      { source: 'unit', target: 'unit' },
    ],

    width: '150px',
    placeholder: '请输入${title}',
    defaultValue: '',
  },
  {
    title: '规格',
    key: 'specs',
    type: JVxeTypes.input,
    width: '150px',
    placeholder: '请输入${title}',
    defaultValue: '',
  },
  {
    title: '数量',
    key: 'num',
    type: JVxeTypes.inputNumber,
    width: '150px',
    placeholder: '请输入${title}',
    defaultValue: '',
  },
  {
    title: '单位',
    key: 'unit',
    type: JVxeTypes.input,
    width: '100px',
    placeholder: '请输入${title}',
    defaultValue: '',
  },
  {
    title: '单价',
    key: 'price',
    type: JVxeTypes.inputNumber,
    width: '100px',
    placeholder: '请输入${title}',
    defaultValue: '',
  },
  {
    title: '金额',
    key: 'totalMoney',
    type: JVxeTypes.inputNumber,
    width: '150px',
    placeholder: '请输入${title}',
    defaultValue: '',
  },
];
