import React, { useState } from 'react'
import { roomsDummyData } from '../../assets/assets'
import Title from '../../components/Title'

const ListRoom = () => {
  const [rooms, setRooms] = useState(roomsDummyData)
  return (
    <div>
      <Title align='left' font='outfit' title='Room Lisitings' subTitle='View, edit or manage all listed rooms. keep
      the information up -to-date to provide the best experience for users.' />
      <p className='text-gray-500 mt-8'>All Rooms</p>
      <div className='w-full max-w-3xl text-left border border-gray-300 rounded-lg max-h-80 overflow-y-scroll mt-3'>
        <table className='w-full'>


          <thead className='bg-gray-50'>
            <tr>
              <th className='py-3 px-4 text-gray-800 font-medium'>Name</th>
              <th className='py-3 px-4 text-gray-800 font-medium max-sm:hidden'>Facility</th>
              <th className='py-3 px-4 text-gray-800 font-medium '>Price / night</th>
              <th className='py-3 px-4 text-gray-800 font-medium text-center'>Actions</th>
            </tr>
          </thead>

          <tbody className='text-sm'>
            {
              rooms.map((item, index) => (
                <tr key={index}>
                  <td className='py-3 px-4 text-gray-700 border-t border-gray-300'>
                    {item.roomType}
                  </td>

                  <td className='py-3 px-4 text-gray-700 border-t border-gray-300 max-sm:hidden'>
                    {item.amenities.join(', ')}
                  </td>
                  <td className='py-3 px-4 text-gray-700 border-t border-gray-300 '>
                    {item.pricePerNight}
                  </td>


                  {/* <td className='py-3 px-4 border-t border-gray-300 text-center'>
                    <label className='inline-flex items-center cursor-pointer'>
                      <input
                        type="checkbox"
                        className='sr-only peer'
                        checked={item.isAvailable}
                        onChange={() => {
                          const updatedRooms = [...rooms]
                          updatedRooms[index].isAvailable = !updatedRooms[index].isAvailable
                          setRooms(updatedRooms)
                        }}
                      />
                      <div className='relative w-11 h-6 bg-gray-300 rounded-full peer peer-checked:bg-blue-600 transition-colors duration-200'>
                        <span className="absolute left-0.5 top-0.5 w-5 h-5 bg-white rounded-full transition-transform duration-200 ease-in-out peer-checked:translate-x-5"></span>
                      </div>
                    </label>
                  </td> */}

                  <td className='py-3 px-4 border-t border-gray-300 text-center'>
                    <label className='inline-flex items-center cursor-pointer'>
                      <input
                        type="checkbox"
                        className='sr-only peer'
                        checked={item.isAvailable}
                        onChange={() => {
                          const updatedRooms = [...rooms]
                          updatedRooms[index].isAvailable = !updatedRooms[index].isAvailable
                          setRooms(updatedRooms)
                        }}
                      />
                      <div className='relative w-11 h-6 bg-gray-300 peer-checked:bg-blue-600 rounded-full transition-colors duration-200'>
                        <div
                          className={`absolute left-0.5 top-0.5 w-5 h-5 bg-white rounded-full transition-transform duration-200 ease-in-out ${item.isAvailable ? 'translate-x-5' : 'translate-x-0'
                            }`}
                        ></div>
                      </div>
                    </label>
                  </td>
                </tr>
              ))
            }

          </tbody>

        </table>

      </div>
    </div>
  )
}

export default ListRoom
