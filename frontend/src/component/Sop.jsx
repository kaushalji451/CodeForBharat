import React from 'react'
import Popup from 'reactjs-popup'
import "reactjs-popup/dist/index.css";

const Sop = ({ sop }) => {
  return (
    <div>
      <Popup
        trigger={
          <button className="bg-slate-300 py-1 px-2 rounded-md">View</button>
        }
        contentStyle={{
          borderRadius: "1rem",
          padding: "2rem",     
          overflow: "auto"            
        }}
        modal
        nested
      >
        {(close) => (
          <div>
            <div className='flex justify-between'>
                <h1 className='text-2xl font-bold text-center mb-6'>Statement of Purpose</h1>
            <button
                onClick={close}
                className="h-8 px-3 py-1 rounded-md cursor-pointer "
              >
                x
              </button>
            </div>
            <p className='bg-slate-100 rounded-xl p-4 text-justify break-words whitespace-pre-wrap'>
              {sop}
            </p>
          </div>
        )}
      </Popup>
    </div>
  )
}

export default Sop
