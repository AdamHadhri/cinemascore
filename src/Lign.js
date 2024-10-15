import React from 'react'

function Lign({name, content, line=true}) {
  return (
    <div className='mx-10 flex flex-col'>
        <div className=' w-full my-4 flex text-[25px]'>
            <p className='text-left text-[#BB006A] font-semibold w-[40%]'>{name}</p>
            <p className='text-right w-[60%]'>{content}</p>
        </div>
        { line ? 
         <hr className=" my-2 bg-gray-100 rounded border-[#aaaaaa] border-[1.5px]" />: <></>}
    </div>
  )
}

export default Lign