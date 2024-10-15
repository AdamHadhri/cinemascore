import React from 'react'

function Title({text}) {
  return (
    <div>
    <p className='font-black mt-5 text-[25px] ml-20 text-[#781F3B]'>{text}</p>
    <hr className="mx-16 my-2 bg-gray-100 rounded mb-4 border-[#781F3B] border-[1.5px]" />
  </div>
  )
}

export default Title