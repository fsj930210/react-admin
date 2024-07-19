import { useCountDown } from 'ahooks';
import { Button } from 'antd';

import useCounterStore from '@/store/counter';

const Home = () => {
  // const counter = useCounterStore((state) => state.counter)
  // const increase = useCounterStore((state) => state.increase);
  const { counter, increase } = useCounterStore();
  const [, formattedRes] = useCountDown({
    targetDate: `${new Date().getFullYear()}-12-31 23:59:59`,
  });
  const { days, hours, minutes, seconds, milliseconds } = formattedRes;
  return (
    <div>
      <div className="text-blue">Home Page</div>
      <button onClick={() => increase(1)}>counter: {counter}</button>
      <Button type="primary">Primary</Button>
      <p>
        There are {days} days {hours} hours {minutes} minutes {seconds} seconds {milliseconds} milliseconds until{' '}
        {new Date().getFullYear()}-12-31 23:59:59
      </p>
    </div>
  );
};

export default Home;
