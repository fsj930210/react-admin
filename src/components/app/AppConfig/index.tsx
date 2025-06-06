import { useState } from 'react';

import {
  Drawer,
  Radio,
  Switch,
  Select,
  Slider,
  Space,
  Card,
  FloatButton,
} from 'antd';

import RaIcon from '@/components/RaIcon';

interface SettingState {
  theme: 'light' | 'dark' | 'system';
  layoutMode: 'side' | 'top' | 'mix';
  primaryColor: string;
  contentWidth: 'fluid' | 'fixed';
  fixedHeader: boolean;
  fixSiderbar: boolean;
  autoHideHeader: boolean;
  colorWeak: boolean;
  showLogo: boolean;
  showBreadCrumb: boolean;
  showTagsView: boolean;
  transitionName: string;
  transitionMode: string;
  themeColor: string;
}

const transitionOptions = [
  { label: '淡入淡出', value: 'fade' },
  { label: '左右滑动', value: 'slide' },
  { label: '缩放', value: 'zoom' },
  { label: '无动画', value: 'none' },
];

const themeOptions = [
  { label: '亮色模式', value: 'light' },
  { label: '暗色模式', value: 'dark' },
  { label: '跟随系统', value: 'system' },
];

const layoutOptions = [
  { label: '侧边菜单', value: 'side' },
  { label: '顶部菜单', value: 'top' },
  { label: '混合菜单', value: 'mix' },
];

const SettingsDrawer: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const [settings, setSettings] = useState<SettingState>({
    theme: 'light',
    layoutMode: 'side',
    primaryColor: '#1677ff',
    contentWidth: 'fluid',
    fixedHeader: true,
    fixSiderbar: true,
    autoHideHeader: false,
    colorWeak: false,
    showLogo: true,
    showBreadCrumb: true,
    showTagsView: true,
    transitionName: 'fade',
    transitionMode: 'left',
    themeColor: '#1677ff',
  });

  const showSettings = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  const handleSettingChange = (key: keyof SettingState, value: any) => {
    setSettings((prev) => {
      localStorage.setItem(
        'app-settings',
        JSON.stringify({ ...prev, [key]: value }),
      );
      return { ...prev, [key]: value };
    });
  };

  return (
    <>
      <FloatButton
        icon={<RaIcon icon="ant-design:setting-outlined" />}
        type="primary"
        tooltip="设置"
        shape="circle"
        style={{
          right: 24,
          bottom: 24,
          zIndex: 100,
        }}
        onClick={showSettings}
      />
      <Drawer
        title="偏好设置"
        placement="right"
        width={360}
        onClose={onClose}
        visible={visible}
        bodyStyle={{ padding: '24px 0', overflow: 'auto' }}
        destroyOnClose
      >
        <div className="px-6">
          <Card title="主题设置" bordered={false} className="mb-4">
            <Space direction="vertical" size={16} className="w-full">
              <Radio.Group
                value={settings.theme}
                onChange={(e) => handleSettingChange('theme', e.target.value)}
              >
                {themeOptions.map((option) => (
                  <Radio key={option.value} value={option.value}>
                    {option.label}
                  </Radio>
                ))}
              </Radio.Group>
              <div>
                <label className="block mb-2 text-sm font-medium">主色调</label>
                <div className="grid grid-cols-5 gap-2">
                  {['#1677ff', '#722ed1', '#f5222d', '#fa8c16', '#52c41a'].map(
                    (color) => (
                      <div
                        key={color}
                        className={`h-8 w-8 rounded-full cursor-pointer ${settings.themeColor === color ? 'ring-2 ring-offset-2 ring-primary' : ''}`}
                        style={{ backgroundColor: color }}
                        onClick={() => handleSettingChange('themeColor', color)}
                      />
                    ),
                  )}
                </div>
              </div>
              <Switch
                checked={settings.colorWeak}
                onChange={(value) => handleSettingChange('colorWeak', value)}
                checkedChildren="开启"
                unCheckedChildren="关闭"
              />
            </Space>
          </Card>

          <Card title="布局设置" bordered={false} className="mb-4">
            <Space direction="vertical" size={16} className="w-full">
              <Radio.Group
                value={settings.layoutMode}
                onChange={(e) =>
                  handleSettingChange('layoutMode', e.target.value)
                }
              >
                {layoutOptions.map((option) => (
                  <Radio key={option.value} value={option.value}>
                    {option.label}
                  </Radio>
                ))}
              </Radio.Group>
              <Space wrap>
                <Switch
                  checked={settings.fixedHeader}
                  onChange={(value) =>
                    handleSettingChange('fixedHeader', value)
                  }
                  checkedChildren="开启"
                  unCheckedChildren="关闭"
                />
                <Switch
                  checked={settings.fixSiderbar}
                  onChange={(value) =>
                    handleSettingChange('fixSiderbar', value)
                  }
                  checkedChildren="开启"
                  unCheckedChildren="关闭"
                />
              </Space>
              <Switch
                checked={settings.autoHideHeader}
                onChange={(value) =>
                  handleSettingChange('autoHideHeader', value)
                }
                checkedChildren="开启"
                unCheckedChildren="关闭"
              />
              <Radio.Group
                value={settings.contentWidth}
                onChange={(e) =>
                  handleSettingChange('contentWidth', e.target.value)
                }
              >
                <Radio value="fluid">流式布局</Radio>
                <Radio value="fixed">固定宽度</Radio>
              </Radio.Group>
            </Space>
          </Card>

          <Card title="功能设置" bordered={false} className="mb-4">
            <Space direction="vertical" size={16} className="w-full">
              <div className="flex items-center justify-between">
                <span>显示Logo</span>
                <Switch
                  checked={settings.showLogo}
                  onChange={(value) => handleSettingChange('showLogo', value)}
                  checkedChildren="显示"
                  unCheckedChildren="隐藏"
                />
              </div>
              <div className="flex items-center justify-between">
                <span>显示面包屑</span>
                <Switch
                  checked={settings.showBreadCrumb}
                  onChange={(value) =>
                    handleSettingChange('showBreadCrumb', value)
                  }
                  checkedChildren="显示"
                  unCheckedChildren="隐藏"
                />
              </div>
              <div className="flex items-center justify-between">
                <span>显示标签页</span>
                <Switch
                  checked={settings.showTagsView}
                  onChange={(value) =>
                    handleSettingChange('showTagsView', value)
                  }
                  checkedChildren="显示"
                  unCheckedChildren="隐藏"
                />
              </div>
            </Space>
          </Card>

          <Card title="动画设置" bordered={false}>
            <Space direction="vertical" size={16} className="w-full">
              <Select
                value={settings.transitionName}
                onChange={(value) =>
                  handleSettingChange('transitionName', value)
                }
                placeholder="选择页面切换动画"
                style={{ width: '100%' }}
              >
                {transitionOptions.map((option) => (
                  <Select.Option key={option.value} value={option.value}>
                    {option.label}
                  </Select.Option>
                ))}
              </Select>
              <div>
                <label className="block mb-2 text-sm font-medium">
                  动画速度
                </label>
                <Slider
                  min={200}
                  max={1000}
                  step={100}
                  value={400} // 实际项目中需要绑定到state
                  marks={{
                    200: '快',
                    600: '中',
                    1000: '慢',
                  }}
                />
              </div>
            </Space>
          </Card>
        </div>
      </Drawer>
    </>
  );
};

export default SettingsDrawer;
