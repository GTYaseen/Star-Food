
import React from 'react';
import './modal.css';
import { CgCloseR } from "react-icons/cg";
import { Space } from '../space/Space';

export const Modal = ({ children, open, onOk, onCancel,title, ...props }) => {
  const modalStyle = {
    display: open ? 'block' : 'none',
  };
let topTitle = ""
  if(title){
    topTitle = title
  }
  return (
    <div className="modal" style={modalStyle}>
      <div className="modal-content">
        <div className="modal-header">
        <Space height={"3rem"} />
          <h3>{topTitle}</h3>
        </div>
        <p className='text-3xl text-center font-sans font-bold animate-pulse text-red-500'>{children}</p>
        <Space height={"3rem"} />
        <div className="flex justify-center items-center gap-3">
          <button className='bg-yellow-400 text-3xl font-sans rounded-2xl p-2 border-2 hover:bg-yellow-500 hover:scale-110 transition duration-300' onClick={onOk}>Sign In</button>
          <button className='bg-yellow-400 text-3xl font-sans rounded-2xl p-2 border-2 hover:bg-yellow-500 hover:scale-110 transition duration-300' onClick={onCancel}>Go Home</button>
        </div>
      </div>
    </div>
  );
};
