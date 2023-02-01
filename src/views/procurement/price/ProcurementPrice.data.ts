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
    title: '供应商',
    align: 'center',
    dataIndex: 'supplier_dictText',
  },
  {
    title: '创建日期',
    align: 'center',
    dataIndex: 'createTime',
  },
  {
    title: '更新日期',
    align: 'center',
    dataIndex: 'updateTime',
  },
];
//查询数据
export const searchFormSchema: FormSchema[] = [
  {
    label: '材料名',
    field: 'name',
    component: 'Input',
  },
  {
    label: '供应商',
    field: 'supplier',
    component: 'JDictSelectTag',
    componentProps: {
      dictCode: 'supplier,name,id',
    },
  },
];
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
        code: 'base_material',
        fieldConfig: [
          { source: 'name', target: 'name' },
          { source: 'unit', target: 'unit' },
          { source: 'specs', target: 'spec' },
        ],
        multi: true,
      };
    },

    dynamicRules: ({ model, schema }) => {
      return [{ required: true, message: '请输入材料名!' }];
    },
  },
  {
    label: '规格',
    field: 'specs',
    component: 'Input',
  },
  {
    label: '单价',
    field: 'price',
    component: 'InputNumber',
    dynamicRules: ({ model, schema }) => {
      return [{ required: true, message: '请输入单价!' }];
    },
  },
  {
    label: '单位',
    field: 'unit',
    component: 'Input',
  },
  {
    label: '供应商',
    field: 'supplier',
    component: 'JDictSelectTag',
    componentProps: {
      dictCode: 'supplier,name,id',
      getPopupContainer: (node) => document.body,
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

/**
 * 流程表单调用这个方法获取formSchema
 * @param param
 */
export function getBpmFormSchema(_formData): FormSchema[] {
  // 默认和原始表单保持一致 如果流程中配置了权限数据，这里需要单独处理formSchema
  return formSchema;
}
