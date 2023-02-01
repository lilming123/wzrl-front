import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import { rules } from '/@/utils/helper/validator';
import { render } from '/@/utils/common/renderUtils';
//列表数据
export const columns: BasicColumn[] = [
  {
    title: '客户名',
    align: 'center',
    dataIndex: 'name',
  },
  {
    title: '地址',
    align: 'center',
    dataIndex: 'location',
  },
  {
    title: '电话号码',
    align: 'center',
    dataIndex: 'phone',
  },
  {
    title: '联系人',
    align: 'center',
    dataIndex: 'person',
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
    label: '客户名',
    field: 'name',
    component: 'Input',
  },
];
//表单数据
export const formSchema: FormSchema[] = [
  {
    label: '客户名',
    field: 'name',
    component: 'Input',
  },
  {
    label: '地址',
    field: 'location',
    component: 'Input',
  },
  {
    label: '电话号码',
    field: 'phone',
    component: 'Input',
    dynamicRules: ({ model, schema }) => {
      return [{ required: false }, { pattern: /^1[3456789]\d{9}$/, message: '请输入正确的手机号码!' }];
    },
  },
  {
    label: '联系人',
    field: 'person',
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
