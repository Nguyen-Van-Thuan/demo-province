import React, { useEffect, useState } from 'react'

const Checkout = () => {
  const [listData, setListData] = useState([])

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem('listProvinces'));
    if (items) {
      setListData(items);
    }
  }, []);
  console.log(listData, 'listData');
  return (
    <>
      <h1>Trang checkout nhé Dũng!</h1>
      <div>{listData?.district?.label}</div>
      <div>{listData?.province?.label}</div>
    </>

  )
}

export default Checkout