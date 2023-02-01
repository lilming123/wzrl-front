import { defHttp } from '/@/utils/http/axios';
import { useMessage } from '/@/hooks/web/useMessage';

const { createConfirm } = useMessage();

enum Api {
  pass = '/procurement/procurementOrderSupplier/pass',
  list = '/procurement/procurementOrderSupplier/list',
  save = '/procurement/procurementOrderSupplier/add',
  edit = '/procurement/procurementOrderSupplier/edit',
  deleteOne = '/procurement/procurementOrderSupplier/delete',
  deleteBatch = '/procurement/procurementOrderSupplier/deleteBatch',
  importExcel = '/procurement/procurementOrderSupplier/importExcel',
  exportXls = '/procurement/procurementOrderSupplier/exportXls',
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
export const procurementOrderItemList = Api.procurementOrderItemList;
/**
 * 列表接口
 * @param params
 */
export const list = (params) => defHttp.get({ url: Api.list, params });

/**
 * 删除单个
 */
export const deleteOne = (params, handleSuccess) => {
  return defHttp.delete({ url: Api.deleteOne, params }, { joinParamsToUrl: true }).then(() => {
    handleSuccess();
  });
};
/**
 * 通过单个
 */
export const pass = (params, handleSuccess) => {
  return defHttp.get({ url: Api.pass, params }).then(() => {
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
