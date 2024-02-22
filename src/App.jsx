/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react'
import { BsCheckSquareFill } from 'react-icons/bs'
import { BsTrash3Fill } from 'react-icons/bs'
import numeral from 'numeral'

export default function App() {
  const [belanjaan, setBelanjaan] = useState([])
  const [formData, setFormData] = useState({
    nama: '',
    jumlah: '',
    harga: '',
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const newBelanjaan = { ...formData }
    setBelanjaan([...belanjaan, newBelanjaan])
    localStorage.setItem('belanjaan', JSON.stringify([...belanjaan, newBelanjaan]))

    // reset form
    setFormData({
      nama: '',
      jumlah: '',
      harga: '',
    })
  }

  const getDataBelanjaan = () => {
    const data = localStorage.getItem('belanjaan')
    return data ? JSON.parse(data) : []
  }

  useEffect(() => {
    const data = getDataBelanjaan()
    setBelanjaan(data)
  }, [])

  const ListBelanjaan = ({ nama, jumlah, harga }) => {
    return (
      <>
        <tr className=" bg-gray-800">
          <th scope="row" className="px-4 py-4 font-medium whitespace-nowrap text-white">
            {nama}
          </th>
          <td className="px-6 py-4">{jumlah}</td>
          <td className="px-6 py-4">{harga}</td>
          <td className="px-6 py-4">
            <button className="p-2 bg-green-600">
              <BsCheckSquareFill />
            </button>
            <button className="p-2 bg-red-500">
              <BsTrash3Fill />
            </button>
          </td>
        </tr>
      </>
    )
  }

  const data = getDataBelanjaan()

  const getTotalHarga = () => {
    let total = 0
    data.forEach((item) => {
      total += parseInt(item.harga)
    })

    return total
  }

  return (
    <>
      {/* START HEADER */}
      <div className="mt-20">
        <h1 className="text-2xl text-center text-slate-700 font-bold my-5">Shopping List</h1>
        <h4 className="text-xl text-center font-semibold">Belanja Apa Hari Ini ?</h4>
      </div>
      {/* END HEADER */}

      {/* START FORM INPUT */}
      <div className="mt-10 px-5 py-5 ">
        <form onSubmit={handleSubmit}>
          {/* Nama */}
          <div className="flex flex-col">
            <label htmlFor="nama" className="font-semibold text-lg">
              Nama :
            </label>
            <input type="text" name="nama" id="nama" className="h-10 border border-slate-600 rounded-lg my-2 px-5 text-lg" value={formData.nama} onChange={handleChange} required />
          </div>

          {/* Jumlah */}
          <div className="flex flex-col">
            <label htmlFor="jumlah" className="font-semibold text-lg">
              Jumlah :
            </label>
            <input type="text" name="jumlah" id="jumlah" className="h-10 border border-slate-600 rounded-lg my-2 px-5 text-lg" value={formData.jumlah} onChange={handleChange} required />
          </div>

          {/* Perkiraan Harga */}
          <div className="flex flex-col">
            <label htmlFor="harga" className="font-semibold text-lg">
              Perkiraan Harga :
            </label>
            <input type="number" name="harga" id="harga" className="h-10 border border-slate-600 rounded-lg my-2 px-5 text-lg" value={formData.harga} onChange={handleChange} required />
          </div>

          <div className="text-center">
            <button type="submit" className="bg-blue-500 text-white font-semibold p-3 rounded-xl my-4 hover:opacity-75">
              Catat Belanjaan
            </button>
          </div>
        </form>
      </div>
      {/* END FORM INPUT */}

      {/* START LIST */}
      <div className="px-2">
        <div className="relative overflow-x-auto">
          <table className="w-full my-10 text-sm text-left rtl:text-right text-gray-300 ">
            <thead className="text-xs uppercase bg-gray-700 text-gray-300">
              <tr>
                <th scope="col" className="px-6 py-3 rounded-s-lg">
                  Nama Belanjaan
                </th>
                <th scope="col" className="px-6 py-3">
                  Jumlah
                </th>
                <th scope="col" className="px-6 py-3">
                  Perkiraan Harga (Rp)
                </th>
                <th scope="col" className="px-6 py-3 rounded-e-lg">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody>
              {data.length > 0 ? (
                data.map((item, index) => {
                  return <ListBelanjaan key={index} nama={item.nama} jumlah={item.jumlah} harga={numeral(item.harga).format(0,0)} />
                })
              ) : (
                <tr>
                  <td colSpan={4} className="text-center text-gray-300 font-semibold bg-gray-800 py-4">
                    Belum Ada List Belanjaan
                  </td>
                </tr>
              )}
            </tbody>
            <tfoot>
              <tr className="font-semibold text-gray-300 bg-gray-700">
                <th scope="row" className="px-6 py-3 text-base rounded-s-lg">
                  TOTAL :
                </th>
                <td className="px-6 py-3 text-center">{data.length} Belanjaan</td>
                <td className="px-6 py-3 text-center rounded-e-lg" colSpan={2}>
                  Rp. {numeral(getTotalHarga()).format('0,0')}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
      {/* END LIST */}
    </>
  )
}
