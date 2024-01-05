import { Badge, Button, Modal } from "antd";
import React, { useState } from "react";

import { MdAutoDelete } from "react-icons/md";
const GarbageComponent = () => {
  
  const [isModalOpenGarbage, SetIsModalOpenGarbage] = useState(false);
  const handleCancelGarbage = () => {
    SetIsModalOpenGarbage(false);
  };
  const OpentModalGarbage = () => {
    SetIsModalOpenGarbage(true);
  };
  return (
    <>
    <Badge count={5} size="small">
      <Button icon={<MdAutoDelete />} onClick={OpentModalGarbage}>
        Thùng rác
      </Button>
    </Badge>
    <Modal
        title="Thùng rác"
        open={isModalOpenGarbage}
        onCancel={handleCancelGarbage}
        footer={null}
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
    </>
    
  );
};

export default GarbageComponent;
