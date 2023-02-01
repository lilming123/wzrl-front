import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import { rules } from '/@/utils/helper/validator';
import { render } from '/@/utils/common/renderUtils';
//列表数据
export const columns: BasicColumn[] = [
  {
    title: '材料名',
    align: 'center',
    dataIndex: 'name',
  },
  {
    title: '规格',
    align: 'center',
    dataIndex: 'specs',
  },
  {
    title: '数量',
    align: 'center',
    dataIndex: 'num',
  },
  {
    title: '单价',
    align: 'center',
    dataIndex: 'price',
  },
  {
    title: '单位',
    align: 'center',
    dataIndex: 'unit',
  },
  {
    title: '总金额',
    align: 'center',
    dataIndex: 'totalMoney',
  },
  {
    title: '仓库',
    align: 'center',
    dataIndex: 'storage_dictText',
  },
  {
    title: '货架',
    align: 'center',
    dataIndex: 'shelves_dictText',
  },
];

//查询数据
export const searchFormSchema: FormSchema[] = [];

//表单数据
export const formSchema: FormSchema[] = [
  {
    label: '材料名',
    field: 'name',
    component: 'JPopup',
    componentProps: ({ formActionType }) => {
      const { setFieldsValue } = formActionType;
      return {
        setFieldsValue: setFieldsValue,
        code: 'procurement_order_item',
        fieldConfig: [
          { source: 'name', target: 'name' },
          { source: 'specs', target: 'specs' },
          { source: 'num', target: 'num' },
          { source: 'price', target: 'price' },
          { source: 'unit', target: 'unit' },
          { source: 'total_money', target: 'totalMoney' },
        ],
        multi: true,
      };
    },
  },
  {
    label: '规格',
    field: 'specs',
    component: 'Input',
  },
  {
    label: '数量',
    field: 'num',
    component: 'InputNumber',
  },
  {
    label: '单价',
    field: 'price',
    component: 'InputNumber',
  },
  {
    label: '单位',
    field: 'unit',
    component: 'Input',
  },
  {
    label: '总金额',
    field: 'totalMoney',
    component: 'InputNumber',
  },
  {
    label: '仓库',
    field: 'storage',
    component: 'JTreeSelect',
    componentProps: {
      treeDefaultExpandAll: true,
      getPopupContainer: (node) => document.body,
      dict: 'storage,name,id',
      pidValue: '0',
    },
  },
  {
    label: '货架',
    field: 'shelves',
    component: 'JDictSelectTag',
    componentProps: {
      getPopupContainer: (node) => document.body,
      dictCode: 'base_shelves,code,id',
    },
  },
  // TODO 主键隐藏字段，目前写死为ID
  {
    label: '',
    field: 'id',
    component: 'Input',
    show: false,
  },
];
