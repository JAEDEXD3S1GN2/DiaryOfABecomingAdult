import React from 'react'

const WWE = () => {
  return (
    <section className="bg-white py-14 px-6 flex justify-center">
      <div className="w-full max-w-4xl flex flex-col gap-12">

        {/* Title */}
        <h2 className="text-2xl md:text-3xl font-semibold font-Inter text-gray-900">
          Why this diary exists
        </h2>

        {/* Content */}
        <div className="flex flex-col gap-8">

          {/* Left card */}
          <div className="bg-gray-50 border border-gray-200 rounded-2xl font-Merriwether px-6 py-4 w-fit max-w-md shadow-sm">
            <p className="text-gray-700 leading-relaxed">
              This diary is not a guide to adulthood —  
              <span className="font-medium text-gray-900">
                {" "}it’s a record of becoming.
              </span>
            </p>
          </div>

          {/* Right aligned reflection */}
          <div className="flex flex-col self-end gap-3 max-w-md font-Merriwether text-right">
            <p className="text-sm uppercase tracking-wide text-gray-500">
              This is not advice
            </p>

            <div className="bg-white border border-gray-200 rounded-2xl px-6 py-4 shadow-sm">
              <p className="text-gray-700 leading-relaxed">
                It holds lessons I learned too late, thoughts I didn’t know how
                to say out loud, and moments where growth felt uncomfortable —
                but necessary.
              </p>
            </div>
          </div>

          {/* Closing card */}
          <div className="bg-gray-50 border border-gray-200 font-Merriwether rounded-2xl px-6 py-4 w-fit max-w-md shadow-sm">
            <p className="text-gray-700 leading-relaxed">
              If you’re figuring life out too,  
              <span className="font-medium text-gray-900">
                {" "}you’re not alone here.
              </span>
            </p>
          </div>

        </div>
      </div>
    </section>
  )
}

export default WWE




















// import React from 'react'

// const WWE = () => {
//   return (
//     <div className='bg-white py-7 px-9 flex flex-col gap-9'>
//         <div>
//             Why this diary exists
//         </div>
//             <div className='flex flex-col gap-3.5'>
//                 <div className='border-md border w-max px-3.5 py-2 rounded-xl'><p>This diary is not a guide to Adulthood -- It's a record of becoming.</p></div>
//                 <div className='flex flex-col self-end gap-2.5'> <div><p>This is not advice.</p></div><div className='border-md border w-max px-3.5 py-2 rounded-xl'><p>It holds lessons I learned too late, thoughts I didn’t know how to say out loud, 
//                     </p> <p>and moments where growth felt uncomfortable but necessary.</p></div></div>
//                 <div>
//                     <div className='border-md border w-max px-3.5 py-2 rounded-xl'>
//                     If you’re figuring life out too, you’re not alone here.</div>
//                 </div>
                
//             </div>
//     </div>
//   )
// }

// export default WWE