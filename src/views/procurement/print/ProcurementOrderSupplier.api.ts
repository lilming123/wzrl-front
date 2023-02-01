import { defHttp } from '/@/utils/http/axios';
import { useMessage } from '/@/hooks/web/useMessage';

const { createConfirm } = useMessage();

enum Api {
  user = '/procurement/procurementOrderSupplier/user',
  list = '/procurement/procurementOrderSupplier/list',
  save = '/procurement/procurementOrderSupplier/add',
  edit = '/procurement/procurementOrderSupplier/edit',
  deleteOne = '/procurement/procurementOrderSupplier/delete',
  deleteBatch = '/procurement/procurementOrderSupplier/deleteBatch',
  importExcel = '/procurement/procurementOrderSupplier/importExcel',
  exportXls = '/procurement/procurementOrderSupplier/exportXls',
  queryDataById = '/procurement/procurementOrderSupplier/queryById',
  procurementOrderItemList = '/procurement/procurementOrderSupplier/queryProcurementOrderItemByMainId',
}
/**
 * 导出api
 * @param params
 */
export const getExportUrl = Api.exportXls;

/**
 * 导入api
 */
export const getImportUrl = Api.importExcel;

/**
 * 查询子表数据
 * @param params
 */
export const queryProcurementOrderItemListByMainId = (id) => defHttp.get({ url: Api.procurementOrderItemList, params: { id } });

/**
 * 列表接口
 * @param params
 */
export const new_list = (params) => {
  Object.defineProperty(params, 'state', {
    value: '2',
    writable: true,
    enumerable: true,
  });
  return defHttp.get({ url: Api.list, params });
};
/**
 * 列表接口
 * @param params
 */
export const list = (params) => defHttp.get({ url: Api.list, params });
/**
 * 获取当前用户名和部门
 *
 */
export const getUser = () => defHttp.get({ url: Api.user });

/**
 * 删除单个
 */
export const deleteOne = (params, handleSuccess) => {
  return defHttp.delete({ url: Api.deleteOne, params }, { joinParamsToUrl: true }).then(() => {
    handleSuccess();
  });
};
/**
 * 批量删除
 * @param params
 */
export const batchDelete = (params, handleSuccess) => {
  createConfirm({
    iconType: 'warning',
    title: '确认删除',
    content: '是否删除选中数据',
    okText: '确认',
    cancelText: '取消',
    onOk: () => {
      return defHttp.delete({ url: Api.deleteBatch, data: params }, { joinParamsToUrl: true }).then(() => {
        handleSuccess();
      });
    },
  });
};
/**
 * 保存或者更新
 * @param params
 */
export const saveOrUpdate = (params, isUpdate) => {
  const url = isUpdate ? Api.edit : Api.save;
  return defHttp.post({ url: url, params });
};

/**
 * 根据id查询数据
 * @param params
 */
export const queryDataById = (id) => defHttp.get({ url: Api.queryDataById, params: { id } });
