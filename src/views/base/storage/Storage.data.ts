import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import { rules } from '/@/utils/helper/validator';
import { render } from '/@/utils/common/renderUtils';
//列表数据
export const columns: BasicColumn[] = [
  {
    title: '仓库名',
    align: 'left',
    dataIndex: 'name',
  },
  {
    title: '仓库编码',
    align: 'center',
    dataIndex: 'code',
  },
  {
    title: '管理人',
    align: 'center',
    dataIndex: 'person',
  },
  {
    title: '管理人号码',
    align: 'center',
    dataIndex: 'phone',
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
    label: '仓库名',
    field: 'name',
    component: 'Input',
  },
  {
    label: '仓库编码',
    field: 'code',
    component: 'Input',
  },
  {
    label: '管理人',
    field: 'person',
    component: 'Input',
  },
];
//表单数据
export const formSchema: FormSchema[] = [
  {
    label: '仓库名',
    field: 'name',
    component: 'Input',
  },
  {
    label: '仓库编码',
    field: 'code',
    component: 'Input',
  },
  {
    label: '上级仓库',
    field: 'pid',
    component: 'JTreeSelect',
    componentProps: {
      dict: 'storage,name,id',
      pidField: 'pid',
      pidValue: '0',
      hasChildField: 'has_child',
    },
  },
  {
    label: '管理人',
    field: 'person',
    component: 'Input',
  },
  {
    label: '管理人号码',
    field: 'phone',
    component: 'Input',
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
