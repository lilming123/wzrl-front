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
    title: '分类',
    align: 'center',
    dataIndex: 'type_dictText',
  },
  {
    title: '规格',
    align: 'center',
    dataIndex: 'specs',
  },
  {
    title: '单位',
    align: 'center',
    dataIndex: 'unit',
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
    label: '分类',
    field: 'type',
    component: 'JTreeSelect',
    componentProps: {
      dict: 'base_material_type,name,id',
      pidValue: '0',
      getPopupContainer: (node) => document.body,
    },
  },
];
//表单数据
export const formSchema: FormSchema[] = [
  {
    label: '材料名',
    field: 'name',
    component: 'Input',
  },
  {
    label: '分类',
    field: 'type',
    component: 'JTreeSelect',
    componentProps: {
      dict: 'base_material_type,name,id',
      pidValue: '0',
      getPopupContainer: (node) => document.body,
    },
  },
  {
    label: '规格',
    field: 'specs',
    component: 'Input',
  },
  {
    label: '单位',
    field: 'unit',
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
