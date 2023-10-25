import React from 'react';
import { Table,  } from 'antd';
import { Link} from 'react-router-dom'
import { CiPickerEmpty,CiTrash } from "react-icons/ci";

const columns = [


  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Image',
    dataIndex: 'image',
    key: 'image',
    render: () => <img  alt="Movie Image" style={{ width: '50px' }} />,
  },
  {
    title: 'Date Of Birth',
    dataIndex: 'date',
    key: 'date',

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

const Actor = () => {
  return (
    <div>

      <h1 className='text-xl uppercase font-bold mb-4' ><Link to={'/admin/actors/add'} className='dashed'>Thêm diễn viên mới </Link></h1>
      <Table columns={columns} />;
    </div>
  );
};

export default Actor;
