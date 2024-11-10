import { Divider, List } from 'antd';

import RaIcon from '@/components/RaIcon';
import IconSelect from '@/components/RaIcon/components/IconSelect';
import IconView from '@/components/RaIcon/components/IconView';

const IconPage = () => {
  return (
    <div className="h-full p-[8px]">
      <List
        header={<h3>图标</h3>}
        className="bg-[var(--ant-color-bg-container)] "
        bordered
      >
        <List.Item style={{ border: 'none' }}>
          <p>
            项目采用
            <a
              href="https://icon-sets.iconify.design/"
              target="_blank"
              rel="noopener noreferrer"
            >
              iconify
            </a>
            作为图标管理，需要图标可以从
            <a
              href="https://icon-sets.iconify.design/"
              target="_blank"
              rel="noopener noreferrer"
            >
              iconify
            </a>
            查找。
          </p>
        </List.Item>
        <List.Item>
          <p>
            当然也可以使用本地svg,
            本地svg图标也可以像iconify组件使用一样，只需要将本地svg放在
            <span className="bg-rose text-white px-[4px] pb-[2px] rounded-[4px]">
              src/assets/icons
            </span>
            目录下。
            项目中的vite插件会去遍历这个目录并生成iconify格式的组件。使用时icon名称为
            <span className="bg-rose text-white px-[4px] pb-[2px] rounded-[4px]">
              ra-icon:<span className="text-black">svg文件名</span>
            </span>
            。完整使用
            <code>&lt;Icon icon=&quot;ra-icon:svg文件名&quot; /&gt;</code>
          </p>
        </List.Item>
      </List>
      <Divider orientation="left" style={{ border: 'none' }} />
      <List
        header={<h3>iconify图标</h3>}
        className="bg-[var(--ant-color-bg-container)] "
        bordered
      >
        <List.Item style={{ justifyContent: 'start', gap: 8 }}>
          <RaIcon icon="skill-icons:react-light" fontSize={32} />
          <RaIcon icon="skill-icons:vuejs-light" fontSize={32} />
          <RaIcon icon="skill-icons:nestjs-light" fontSize={32} />
          <RaIcon icon="skill-icons:mysql-light" fontSize={32} />
          <RaIcon icon="skill-icons:redis-light" fontSize={32} />
        </List.Item>
      </List>
      <Divider orientation="left" style={{ border: 'none' }} />
      <List
        header={<h3>本地图标</h3>}
        className="bg-[var(--ant-color-bg-container)] "
        bordered
      >
        <List.Item style={{ justifyContent: 'start', gap: 8 }}>
          <RaIcon icon="ra-icon:amap" fontSize={32} />
          <RaIcon icon="ra-icon:bmap" fontSize={32} />
          <RaIcon icon="ra-icon:gogle-map" fontSize={32} />
          <RaIcon icon="ra-icon:echarts-map" fontSize={32} />
          <RaIcon icon="ra-icon:echarts-basic" fontSize={32} />
          <RaIcon icon="ra-icon:chatroom" fontSize={32} />
        </List.Item>
      </List>
      <Divider orientation="left" style={{ border: 'none' }} />
      <List
        header={<h3>图标选择器</h3>}
        className="bg-[var(--ant-color-bg-container)] "
        bordered
      >
        <List.Item>
          <IconSelect />
        </List.Item>
      </List>
      <Divider orientation="left" style={{ border: 'none' }} />
      <List
        header={<h3>图标展示组件</h3>}
        className="bg-[var(--ant-color-bg-container)] "
        bordered
      >
        <List.Item style={{ height: 750 }}>
          <IconView value="ant-design:aim-outlined" />
        </List.Item>
      </List>
    </div>
  );
};

export default IconPage;
