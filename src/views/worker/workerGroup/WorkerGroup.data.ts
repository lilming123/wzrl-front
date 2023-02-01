import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import { rules } from '/@/utils/helper/validator';
import { render } from '/@/utils/common/renderUtils';
//列表数据
export const columns: BasicColumn[] = [
  {
    title: '组织名',
    align: 'left',
    dataIndex: 'name',
  },
];
//查询数据
export const searchFormSchema: FormSchema[] = [
  {
    label: '组织名',
    field: 'name',
    component: 'Input',
  },
];
//表单数据
export const formSchema: FormSchema[] = [
  {
    label: '组织名',
    field: 'name',
    component: 'Input',
    dynamicRules: ({ model, schema }) => {
      return [{ required: true, message: '请输入组织名!' }];
    },
  },
  {
    label: '上级组织',
    field: 'pid',
    component: 'JTreeSelect',
    componentProps: {
      dict: 'worker_group,name,id',
      pidField: 'pid',
      pidValue: '0',
      hasChildField: 'has_child',
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
