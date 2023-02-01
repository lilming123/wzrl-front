import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import { rules } from '/@/utils/helper/validator';
import { render } from '/@/utils/common/renderUtils';
//列表数据
export const columns: BasicColumn[] = [
  {
    title: '员工名',
    align: 'center',
    dataIndex: 'workerName_dictText',
  },
  {
    title: '员工工号',
    align: 'center',
    dataIndex: 'workerCode',
  },
  {
    title: '应发工资',
    align: 'center',
    dataIndex: 'yfSalary',
  },
  {
    title: '月绩效奖金',
    align: 'center',
    dataIndex: 'yjxSalary',
  },
  {
    title: '其他收入',
    align: 'center',
    dataIndex: 'ortherSalary',
  },
  {
    title: '发放工资时间',
    align: 'center',
    dataIndex: 'incomeTime',
    customRender: ({ text }) => {
      return !text ? '' : text.length > 10 ? text.substr(0, 10) : text;
    },
  },
  {
    title: '联系方式',
    align: 'center',
    dataIndex: 'phone',
  },
  {
    title: '导入时间（表示几月份工资）',
    align: 'center',
    dataIndex: 'month',
    customRender: ({ text }) => {
      return !text ? '' : text.length > 10 ? text.substr(0, 7) : text.substring(0, 7);
    },
  },
];
//查询数据
export const searchFormSchema: FormSchema[] = [
  {
    label: '员工名',
    field: 'workerName',
    component: 'Input',
  },
  {
    label: '员工工号',
    field: 'workerCode',
    component: 'Input',
  },
  {
    label: '导入时间',
    field: 'month',
    component: 'MonthPicker',
  },
];
//表单数据
export const formSchema: FormSchema[] = [
  {
    label: '员工名',
    field: 'workerName',
    component: 'JDictSelectTag',
    componentProps: {
      dictCode: 'worker_info,name,id,del_flag=0',
      getPopupContainer: (node) => document.body,
    },
    dynamicRules: ({ model, schema }) => {
      return [{ required: true, message: '请输入员工名!' }];
    },
  },
  {
    label: '员工工号',
    field: 'workerCode',
    component: 'Input',
    dynamicRules: ({ model, schema }) => {
      return [{ required: true, message: '请输入员工工号!' }];
    },
  },
  {
    label: '应发工资',
    field: 'yfSalary',
    component: 'InputNumber',
    dynamicRules: ({ model, schema }) => {
      return [{ required: true, message: '请输入应发工资!' }];
    },
  },
  {
    label: '月绩效奖金',
    field: 'yjxSalary',
    component: 'InputNumber',
    dynamicRules: ({ model, schema }) => {
      return [{ required: true, message: '请输入月绩效奖金!' }];
    },
  },
  {
    label: '其他收入',
    field: 'ortherSalary',
    component: 'InputNumber',
    dynamicRules: ({ model, schema }) => {
      return [{ required: true, message: '请输入其他收入!' }];
    },
  },
  {
    label: '发放工资时间',
    field: 'incomeTime',
    component: 'DatePicker',
  },
  {
    label: '联系方式',
    field: 'phone',
    component: 'Input',
  },
  {
    label: '导入时间',
    field: 'month',
    component: 'MonthPicker',
    dynamicRules: ({ model, schema }) => {
      return [{ required: true, message: '请输入导入时间（表示几月份工资）!' }];
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
