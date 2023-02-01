import type { ProjectConfig } from '/#/config';
import { MenuTypeEnum, MenuModeEnum, TriggerEnum, MixSidebarTriggerEnum } from '/@/enums/menuEnum';
import { CacheTypeEnum } from '/@/enums/cacheEnum';
import {
  ContentEnum,
  PermissionModeEnum,
  ThemeEnum,
  RouterTransitionEnum,
  SettingButtonPositionEnum,
  SessionTimeoutProcessingEnum,
  TabsThemeEnum,
} from '/@/enums/appEnum';
import { SIDE_BAR_BG_COLOR_LIST, HEADER_PRESET_BG_COLOR_LIST } from './designSetting';
import { primaryColor } from '../../build/config/themeConfig';

// ! 改动后需要清空浏览器缓存
const setting: ProjectConfig = {
  showSettingButton: true,
  showDarkModeToggle: true,
  settingButtonPosition: 'auto',
  permissionMode: 'BACK',
  permissionCacheType: 1,
  sessionTimeoutProcessing: 0,
  themeColor: '#1890ff',
  grayMode: false,
  colorWeak: false,
  fullContent: false,
  contentMode: 'full',
  showLogo: true,
  showFooter: false,
  headerSetting: {
    bgColor: '#ffffff',
    fixed: true,
    show: true,
    theme: 'light',
    useLockPage: true,
    showFullScreen: true,
    showDoc: true,
    showNotice: true,
    showSearch: true,
  },
  menuSetting: {
    bgColor: '#ffffff',
    fixed: true,
    collapsed: false,
    collapsedShowTitle: false,
    canDrag: false,
    show: true,
    hidden: false,
    menuWidth: 210,
    mode: 'inline',
    type: 'sidebar',
    theme: 'light',
    split: false,
    topMenuAlign: 'center',
    trigger: 'HEADER',
    accordion: true,
    closeMixSidebarOnChange: false,
    mixSideTrigger: 'click',
    mixSideFixed: false,
  },
  multiTabsSetting: {
    cache: false,
    show: true,
    canDrag: true,
    showQuick: true,
    showRedo: true,
    showFold: true,
    theme: 'card',
  },
  transitionSetting: {
    enable: true,
    basicTransition: 'fade-slide',
    openPageLoading: true,
    openNProgress: true,
  },
  openKeepAlive: true,
  lockTime: 0,
  showBreadCrumb: true,
  showBreadCrumbIcon: true,
  useErrorHandle: false,
  useOpenBackTop: true,
  canEmbedIFramePage: true,
  closeMessageOnSwitch: true,
  removeAllHttpPending: false,
};

export default setting;
