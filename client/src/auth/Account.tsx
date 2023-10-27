import { Tabs, TabsProps } from "antd";
import Login from "./Login";
import Register from "./Register";

const Account = () => {
  const onChange = (key: string) => {
    console.log(key);
  };
  const items: TabsProps['items'] = [
    {
      key: '1',
      label: 'Login',
      children: <Login/>,
    },
    {
      key: '2',
      label: 'Register',
      children: <Register/>,
    },
  ];
  return (
    <div>
      <Tabs defaultActiveKey="1" items={items} onChange={onChange} className="md:w-96 mx-auto sm:p-2 md:p-0"/>
    </div>
  );
};

export default Account;
