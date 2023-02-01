import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import { rules } from '/@/utils/helper/validator';
import { render } from '/@/utils/common/renderUtils';
//列表数据
export const columns: BasicColumn[] = [
  {
    title: '货架编号',
    align: 'center',
    dataIndex: 'code',
  },
  {
    title: '所属仓库',
    align: 'center',
    dataIndex: 'storageId_dictText',
  },
  {
    title: '货架层数',
    align: 'center',
    dataIndex: 'num',
  },
  {
    title: '长度(单位米)',
    align: 'center',
    dataIndex: 'length',
  },
  {
    title: '宽度(单位米)',
    align: 'center',
    dataIndex: 'width',
  },
  {
    title: '高度(单位米)',
    align: 'center',
    dataIndex: 'height',
  },
  {
    title: '备注',
    align: 'center',
    dataIndex: 'remark',
  },
];
//查询数据
export const searchFormSchema: FormSchema[] = [
  {
    label: '货架编号',
    field: 'code',
    component: 'Input',
  },
  {
    label: '所属仓库',
    field: 'storageId',
    component: 'JTreeSelect',
    componentProps: {
      dict: 'storage,name,id',
      getPopupContainer: (node) => document.body,
      treeDefaultExpandAll: true,
      pidValue: '0',
    },
  },
];
//表单数据
export const formSchema: FormSchema[] = [
  {
    label: '货架编号',
    field: 'code',
    component: 'Input',
    dynamicRules: ({ model, schema }) => {
      return [{ required: true, message: '请输入货架号!' }];
    },
  },
  {
    label: '所属仓库',
    field: 'storageId',
    component: 'JTreeSelect',
    componentProps: {
      dict: 'storage,name,id',
      getPopupContainer: (node) => document.body,
      treeDefaultExpandAll: true,
      pidValue: '0',
    },
    dynamicRules: ({ model, schema }) => {
      return [{ required: true, message: '请输入所属仓库!' }];
    },
  },
  {
    label: '货架层数',
    field: 'num',
    component: 'Input',
  },
  {
    label: '长度(单位米)',
    field: 'length',
    component: 'InputNumber',
  },
  {
    label: '宽度(单位米)',
    field: 'width',
    component: 'InputNumber',
  },
  {
    label: '高度(单位米)',
    field: 'height',
    component: 'InputNumber',
  },
  {
    label: '备注',
    field: 'remark',
    component: 'Input',
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
