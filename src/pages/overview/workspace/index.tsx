import { useCountDown } from 'ahooks';
import { Button, DatePicker } from 'antd';

const Home = () => {
  const [, formattedRes] = useCountDown({
    targetDate: `${new Date().getFullYear()}-12-31 23:59:59`,
  });
  const { days, hours, minutes, seconds, milliseconds } = formattedRes;
  return (
    <div className="h-full overflow-auto">
      <div className="text-blue">Home Page</div>
      <Button type="primary">Primary</Button>
      <p>
        There are {days} days {hours} hours {minutes} minutes {seconds} seconds{' '}
        {milliseconds} milliseconds until {new Date().getFullYear()}-12-31
        23:59:59
      </p>
      <DatePicker />
      {Array.from({ length: 300 }).map((_, index) => {
        return <div key={index}>workspace {index}</div>;
      })}
    </div>
  );
};

export default Home;
