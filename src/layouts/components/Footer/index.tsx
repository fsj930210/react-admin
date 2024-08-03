import { Layout } from 'antd';
const { Footer } = Layout;
const AppFooter = () => {
  return (
    <Footer className="absolute bottom-[10px] text-center bg-transparent w-full c-[#999999]">
      React Admin ©{new Date().getFullYear()} Created by React Admin
    </Footer>
  );
};

export default AppFooter;
