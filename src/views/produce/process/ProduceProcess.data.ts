import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import { rules } from '/@/utils/helper/validator';
import { render } from '/@/utils/common/renderUtils';
import { JVxeTypes, JVxeColumn } from '/@/components/jeecg/JVxeTable/types';
//列表数据
export const columns: BasicColumn[] = [
  {
    title: '流程名',
    align: 'center',
    dataIndex: 'name',
  },
  {
    title: '产品名称',
    align: 'center',
    dataIndex: 'goodsName_dictText',
  },
  {
    title: '标准工时(小时)',
    align: 'center',
    dataIndex: 'time',
  },
  {
    title: '末级工作小组',
    align: 'center',
    dataIndex: 'workerGroup_dictText',
  },
  {
    title: '生产顺序',
    align: 'center',
    dataIndex: 'precedence',
  },
];
//查询数据
export const searchFormSchema: FormSchema[] = [
  {
    label: '流程名',
    field: 'name',
    component: 'Input',
    colProps: { span: 6 },
  },
  {
    label: '产品名称',
    field: 'goodsName',
    component: 'JDictSelectTag',

    componentProps: {
      dictCode: 'base_goods,name,id',
    },
    colProps: { span: 6 },
  },
  {
    label: '末级工作小组',
    field: 'workerGroup',
    component: 'JTreeSelect',
    componentProps: {
      dict: 'worker_group,name,id',
      pidValue: '0',
    },
    colProps: { span: 6 },
  },
];
//表单数据
export const formSchema: FormSchema[] = [
  {
    label: '流程名',
    field: 'name',
    component: 'Input',
  },
  {
    label: '产品名称',
    field: 'goodsName',
    component: 'JDictSelectTag',
    componentProps: {
      dictCode: 'base_goods,name,id',
    },
  },
  {
    label: '标准工时(小时)',
    field: 'time',
    component: 'InputNumber',
  },
  {
    label: '末级工作小组',
    field: 'workerGroup',
    component: 'JTreeSelect',
    componentProps: {
      treeDefaultExpandAll: true,
      dict: 'worker_group,name,id',
      pidValue: '0',
    },
  },
  {
    label: '生产顺序',
    field: 'precedence',
    component: 'InputNumber',
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
export const produceProcessMaterialColumns: JVxeColumn[] = [
  {
    title: '材料名',
    key: 'material',
    type: JVxeTypes.popup,
    popupCode: 'base_material',
    fieldConfig: [
      { source: 'name', target: 'material' },
      { source: 'specs', target: 'specs' },
      { source: 'unit', target: 'unit' },
    ],

    width: '200px',
    placeholder: '请输入${title}',
    defaultValue: '',
  },
  {
    title: '规格',
    key: 'specs',
    type: JVxeTypes.input,
    width: '200px',
    placeholder: '请输入${title}',
    defaultValue: '',
  },
  {
    title: '单位',
    key: 'unit',
    type: JVxeTypes.input,
    width: '200px',
    placeholder: '请输入${title}',
    defaultValue: '',
  },
  {
    title: '用量',
    key: 'num',
    type: JVxeTypes.inputNumber,
    width: '200px',
    placeholder: '请输入${title}',
    defaultValue: '',
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
