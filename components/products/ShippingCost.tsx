import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { City, Region, Shipping } from '../../interfaces'
import { FreeShipping, NumberFormat } from '../../utils'

export const ShippingCost = () => {

  const [regions, setRegions] = useState<Region[]>()
  const [citys, setCitys] = useState<City[]>()
  const [shipping, setShipping] = useState<Shipping[]>()
  const [city, setCity] = useState('')

    const requestRegions = async () => {
        const request = await axios.get('https://testservices.wschilexpress.com/georeference/api/v1.0/regions', {
          headers: {
            'Cache-Control': 'no-cache',
            'Ocp-Apim-Subscription-Key': '4ebbe4e737b54bfe94307bca9e36ac4d'
          }
        })
        setRegions(request.data.regions)
      }
    
      useEffect(() => {
        requestRegions()
      }, [])
    
      const regionChange = async (e: any) => {
        const region = regions?.find(region => region.regionName === e.target.value)
        const request = await axios.get(`https://testservices.wschilexpress.com/georeference/api/v1.0/coverage-areas?RegionCode=${region?.regionId}&type=0`, {
          headers: {
            'Cache-Control': 'no-cache',
            'Ocp-Apim-Subscription-Key': '4ebbe4e737b54bfe94307bca9e36ac4d'
          }
        })
        setCitys(request.data.coverageAreas)
      }
    
      const cityChange = async (e: any) => {
        const city = citys?.find(city => city.countyName === e.target.value)
        const request = await axios.post('https://testservices.wschilexpress.com/rating/api/v1.0/rates/courier', {
          "originCountyCode": "QNOR",
          "destinationCountyCode": city?.countyCode,
          "package": {
              "weight": "1",
              "height": "10",
              "width": "10",
              "length": "2"
          },
          "productType": 3,
          "contentType": 1,
          "declaredWorth": "2333",
          "deliveryTime": 0
        }, {
          headers: {
            'Content-Type': 'application/json',
            'Cache-Control': 'no-cache',
            'Ocp-Apim-Subscription-Key': '512b6b0ff709426d82968a33be83b4a1'
          }
        })
        setShipping(request.data.data.courierServiceOptions)
        setCity(e.target.value)
      }

  return (
    <div className='mt-4 pb-4 border-b dark:border-neutral-800'>
      <h4 className='text-xl mb-2'>Calcula los costos de envío</h4>
      <select className='text-sm border p-1 rounded-md font-light dark:border-neutral-500 mobile2:text-base' onChange={regionChange}>
        <option className='font-light'>Seleccionar Región</option>
        {
        regions !== undefined
          ? regions.map(region => <option className='font-light' key={region.regionId}>{region.regionName}</option>)
          : ''
        }
      </select>
      {
        citys !== undefined
        ? <select className='text-sm block border p-1 rounded-md mt-2 font-light dark:border-neutral-500 mobile2:text-base' onChange={cityChange}>
          <option className='font-light'>Seleccionar Ciudad</option>
          {citys.map(city => <option className='font-light' key={city.countyCode}>{city.countyName}</option>)}
        </select>
        : ''
      }
      {
        shipping !== undefined
        ? <div className='flex flex-col gap-1 mt-2 '>
          <p className='text-lg mt-1'>Envíos express:</p>
          {FreeShipping.map(cityFree => {
            if (cityFree === city) {
              return <div className='flex justify-between p-2 border rounded-md dark:border-neutral-500' key={cityFree}>
                <p className='font-light'>Envío gratis en 24 a 48 horas</p>
                <p>$0</p>
              </div>
            }
            return null
          })}
          <p className='text-lg mt-1'>Chilexpress:</p>
          {shipping.map(service => (
            <div key={service.serviceDescription} className='flex justify-between p-2 border rounded-md dark:border-neutral-500'>
              <p className='font-light'>{service.serviceDescription}</p>
              <p>${NumberFormat(Number(service.serviceValue))}</p>
            </div>
          ))}
        </div>
        : ''
      }
    </div>
  )
}
