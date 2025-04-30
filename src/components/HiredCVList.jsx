import React, { useEffect, useState } from 'react'
import { APP_URL } from '../../config'

const HiredCVList = () => {

    const [hiredCV, setHiredCV] = useState([])
    console.log(Array.isArray(hiredCV))
    // console.log('first', hiredCV.length)

    const fetchHiredCv = async () => {
        try {
            const response = await fetch(`${APP_URL}/api/cv/hired`, {
                method: 'GET'
            })
            const data = await response.json()
            if (Array.isArray(data)) {
                setHiredCV(data)
            }
            else {
                setHiredCV([])
            }

        } catch (error) {

        }
    }

    useEffect(() => {
        fetchHiredCv()
    }, [])


    return (
        <>
            {
                hiredCV.length === 0 && (
                    <h1 className='text-2xl font-bold flex justify-center items-center'>Not Available</h1>
                )
            }
        </>
    )
}

export default HiredCVList