import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import { rules } from '/@/utils/helper/validator';
import { render } from '/@/utils/common/renderUtils';
//列表数据
export const columns: BasicColumn[] = [
  {
    title: '员工名',
    align: 'center',
    dataIndex: 'name',
  },
  {
    title: '性别',
    align: 'center',
    dataIndex: 'sex_dictText',
  },
  {
    title: '工号',
    align: 'center',
    dataIndex: 'code',
  },
  {
    title: '电话号码',
    align: 'center',
    dataIndex: 'phone',
  },
  {
    title: '所在末级部门',
    align: 'center',
    dataIndex: 'workerGroup_dictText',
  },
];

//查询数据
export const searchFormSchema: FormSchema[] = [
  {
    label: '员工名',
    field: 'name',
    component: 'Input',
  },
  {
    label: '工号',
    field: 'code',
    component: 'Input',
  },
  {
    label: '所在末级部门',
    field: 'workerGroup',
    component: 'JTreeSelect',
    componentProps: {
      treeDefaultExpandAll: true,
      dict: 'worker_group,name,id',
      pidValue: '0',
    },
  },
];

//表单数据
export const formSchema: FormSchema[] = [
  {
    label: '员工名',
    field: 'name',
    component: 'Input',
    dynamicRules: ({ model, schema }) => {
      return [{ required: true, message: '请输入员工名!' }];
    },
  },
  {
    label: '性别',
    field: 'sex',
    component: 'JDictSelectTag',
    componentProps: {
      dictCode: 'sex',
      getPopupContainer: (node) => document.body,
    },
    dynamicRules: ({ model, schema }) => {
      return [{ required: true, message: '请输入性别!' }];
    },
  },
  {
    label: '工号',
    field: 'code',
    component: 'Input',
    dynamicRules: ({ model, schema }) => {
      return [{ required: true, message: '请输入工号!' }];
    },
  },
  {
    label: '电话号码',
    field: 'phone',
    component: 'Input',
    dynamicRules: ({ model, schema }) => {
      return [
        { required: true, message: '请输入电话号码!' },
        { pattern: /^1[3456789]\d{9}$/, message: '请输入正确的手机号码!' },
      ];
    },
  },
  {
    label: '所在末级部门',
    field: 'workerGroup',
    component: 'JTreeSelect',
    componentProps: {
      dict: 'worker_group,name,id',
      pidValue: '0',
      getPopupContainer: (node) => document.body,
    },
    dynamicRules: ({ model, schema }) => {
      return [{ required: true, message: '请输入所在末级部门!' }];
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
