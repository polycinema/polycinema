import React from 'react';
import { Table, Button } from 'antd';
import { Link} from 'react-router-dom'
import { CiPickerEmpty,CiTrash } from "react-icons/ci";
const dataSource = [
  {
    id: 1,
    name: 'Movie 1',
    title: 'Title 1',
    image: 'image_url_1',
    trailer: 'trailer_url_1',
    description: 'Description 1',
    release_date: '2023-01-01',
    duration: '2 hours',
    director_id: 101,
  },
  {
    id: 2,
    name: 'Movie 2',
    title: 'Title 2',
    image: 'image_url_2',
    trailer: 'trailer_url_2',
    description: 'Description 2',
    release_date: '2023-02-15',
    duration: '1 hour 45 minutes',
    director_id: 102,
  },

];

const columns = [

  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Title',
    dataIndex: 'title',
    key: 'title',
  },
  {
    title: 'Genres',
    dataIndex: 'genres',
    key: 'genres',
  },
  {
    title: 'Image',
    dataIndex: 'image',
    key: 'image',
    render: () => <img  alt="Movie Image" style={{ width: '50px' }} />,
  },
  {
    title: 'Trailer',
    dataIndex: 'trailer',
    key: 'trailer',
   
  },
  {
    title: 'Description',
    dataIndex: 'description',
    key: 'description',
  },
  {
    title: 'Release Date',
    dataIndex: 'release_date',
    key: 'release_date',
  },
  {
    title: 'Duration',
    dataIndex: 'duration',
    key: 'duration',
  },
  {
    title: 'Director ID',
    dataIndex: 'director_id',
    key: 'director_id',
  },
  {
    title: 'Actors',
    dataIndex: 'actors',
    key: 'actors',
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

const MovieTable = () => {
  return (
    <div>

      <h1 className='text-xl uppercase font-bold mb-4' ><Link to={'/admin/poly-add'} className='dashed'>Thêm phim mới </Link></h1>
      <Table dataSource={dataSource} columns={columns} />;
    </div>
  );
};

export default MovieTable;
