import { Tabs, TabsProps } from "antd";
import Login from "./Login";
import Register from "./Register";
import { useAppSelector } from "../store/hook";
import { useEffect, useState } from "react";

const Account = () => {
  const { activeKeyAccout } = useAppSelector((state) => state?.Account);
  const [key,setKey] = useState<string>('1')
  useEffect(() => {
    if(activeKeyAccout){
      setKey(activeKeyAccout)
    }
  }, [activeKeyAccout]);
  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "Đăng nhập",
      children: <Login />,
    },
    {
      key: "2",
      label: "Đăng kí",
      children: <Register />,
    },
  ];
  const handleTabChange = (key:string) => {
    
    setKey(key);
    // console.log('key: ',key)
  };
  return (
    <div>
      <Tabs
        items={items}
        className="md:w-96 mx-auto sm:p-2 md:p-0"
        activeKey={key}
        onChange={handleTabChange}
      />
    </div>
  );
};

export default Account;
