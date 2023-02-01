import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import { rules } from '/@/utils/helper/validator';
import { render } from '/@/utils/common/renderUtils';
//列表数据
export const columns: BasicColumn[] = [
  {
    title: '产品名',
    align: 'center',
    dataIndex: 'name_dictText',
  },
  {
    title: '计划数量',
    align: 'center',
    dataIndex: 'num',
  },
  {
    title: '创建人',
    align: 'center',
    dataIndex: 'createBy',
  },
  {
    title: '创建日期',
    align: 'center',
    dataIndex: 'createTime',
  },
];

//查询数据
export const searchFormSchema: FormSchema[] = [
  {
    label: '产品名',
    field: 'name',
    component: 'JDictSelectTag',
    componentProps: {
      dictCode: 'base_goods,name,id',
    },
  },
];

//表单数据
export const formSchema: FormSchema[] = [
  {
    label: '产品名',
    field: 'name',
    component: 'JDictSelectTag',
    componentProps: {
      dictCode: 'base_goods,name,id',
    },
  },
  {
    label: '计划数量',
    field: 'num',
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
