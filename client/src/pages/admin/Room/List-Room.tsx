import React from 'react'
import { Table,  } from 'antd';
import { Link} from 'react-router-dom'
import { CiPickerEmpty,CiTrash } from "react-icons/ci";

const columns = [


  {
    title: 'Room Name',
    dataIndex: 'roomname',
    key: 'roomname',
  },

  {
    title: 'Capacity',
    dataIndex: 'capacity',
    key: 'capacity',

  },

  {
    title: 'Actions',
    key: 'actions',
    render: () => (
      <span className='flex '>
       <Link to={"/admin/poly-edit"} className='text-xl fl'><CiPickerEmpty/></Link>
                                        <Link to={""} className='text-xl'><CiTrash/></Link>
      </span>
    ),
  },
];
const ListRooms = () => {
  return (
    <div>

    <h1 className='text-xl uppercase font-bold mb-4' ><Link to={'/admin/rooms/add'} className='dashed'>Thêm phòng mới </Link></h1>
    <Table columns={columns} />;
  </div>
  )
}

export default ListRooms;
