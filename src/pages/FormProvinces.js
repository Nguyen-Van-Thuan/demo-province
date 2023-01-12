import axios from "axios"
import { useEffect, useState } from "react"
import { Controller, useForm } from "react-hook-form"
import Select from 'react-select'
import { Button, Col, Form, Label, Row } from 'reactstrap'

const FormProvinces = () => {
  const [listProvince, setListProvince] = useState('')
  const [listDistricts, setListDistricts] = useState('')

  const defaultValues = {
    province: "",
    district: ""
  }
  const { control, handleSubmit, formState: { errors }, watch } = useForm({ defaultValues })
  const watchProvince = watch("province")

  const onSubmit = (data) => {
    localStorage.setItem('listProvinces', JSON.stringify(data));
    setTimeout(function () {
      window.location.href = "http://localhost:3000/check-out";
    }, 1000)
  }

  // call api thành phố
  useEffect(() => {
    axios.get('http://localhost:3004/provinces')
      .then(function (response) {
        // Thành công
        let success = response?.data
        const convert = success?.map(item => (
          { value: item?.codename, label: item?.name }
        ))
        setListProvince(convert)
      })
  }, [])

  // call api quận huyện
  useEffect(() => {
    axios.get(`http://localhost:3004/all-provinces?codename=${watchProvince?.value}`)
      .then(function (res) {
        let success = res?.data?.[0]?.districts
        const convert = success?.map(item => (
          { value: item?.codename, label: item?.name }
        ))
        setListDistricts(convert)
      })
  }, [watchProvince])

  return (
    <Form className='mt-4' onSubmit={handleSubmit(onSubmit)}>
      <div className="container">
        <Row>
          <Col md='3' className='mb-2'>
            <Label className='form-label' for='province'>
              Province <span>*</span>
            </Label>
            <Controller
              name='province'
              control={control}
              rules={{ required: true }}
              render={({ field }) => <Select
                {...field}
                placeholder='Select provinces...'
                isClearable={false}
                options={listProvince}
                className='react-select'
                classNamePrefix='select'
              />}
            />
            {errors.province && <span className='errors'>This field is required!</span>}
          </Col>
          <Col md='3' className='mb-2'>
            <Label className='form-label' for='district'>
              District <span>*</span>
            </Label>
            <Controller
              name='district'
              control={control}
              rules={{ required: true }}
              render={({ field }) => <Select
                {...field}
                placeholder='Select provinces...'
                isClearable={false}
                options={listDistricts}
                className='react-select'
                classNamePrefix='select'
              />}
            />
            {errors.district && <span className='errors'>This field is required!</span>}
          </Col>

          <Col md='12' className='mt-4'>
            <Button color='primary' className='me-1' >
              Save Changes
            </Button>
          </Col>
        </Row>
      </div>

    </Form>
  )
}

export default FormProvinces