type HeaderProps = {
  todo?: boolean;
};

const Header = ({ todo }: HeaderProps) => {
  return (
    <div>
      <div className="flex justify-between items-center">
        <h3>{todo ? '待办' : '消息中心'}</h3>
        {todo ? <a>全部标记为已读</a> : null}
      </div>
    </div>
  );
};

export default Header;
