import React, { useCallback, useEffect, useRef, useState } from 'react'
import { GoDotFill } from 'react-icons/go'

export const ImageSlider = ({ ads }) => {
  
  const [currentIndex, setCurrentIndex] = useState(0)
  
  const timerRef = useRef(null)

  const goToNext = useCallback(() => {
    const isLastSlide = currentIndex === ads.length - 1
    const newIndex = isLastSlide ? 0 : currentIndex + 1
    setCurrentIndex(newIndex)
  }, [currentIndex, ads])

  const gotoSlide = (adIndex) => {
    setCurrentIndex(adIndex)
  }

  const urlImageSlider = `/ads/${ads[currentIndex].id}.jpg`
  
  useEffect(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current)
    }
    timerRef.current = setTimeout(() => {
      goToNext()
    }, 5000);
  
    return () => {
      clearTimeout(timerRef.current)
    }
  }, [goToNext])
  

  return (
    <div className='relative h-full transition-transform duration-300 ease-out'>
      <div
        className='h-full w-full rounded-[10px] bg-cover bg-center'
        style={{ backgroundImage: `linear-gradient(180deg, rgba(0,0,0,0) 13%, rgba(0,0,0,1) 100%), url(${urlImageSlider})` }}
      >
        <div className='grid grid-cols-2 grid-rows-3 px-[100px] pt-[150px] text-left font-display text-white text-shadow-lg'>
          <h1 className='col-start-1 row-start-1 flex items-center text-[3.5rem] text-sky'>{ads[currentIndex].title}</h1>
          <h2 className='col-start-1 row-start-2 flex items-center text-xl'>{ads[currentIndex].subtitle}</h2>
          <h3 className='col-start-1 row-start-3 flex items-center text-xl'>{ads[currentIndex].description}</h3>
        </div>
      </div>
      <div className='flex justify-center pb-4 pt-2'>
        {
          ads.map((ad, adIndex) => (
            <div
              className='mx-[3px] cursor-pointer py-2 text-[1.8rem] text-primary transition-transform duration-500 hover:-translate-y-[5px] hover:drop-shadow-[3px_5px_2px_rgb(0_0_0/0.4)]'
              key={adIndex}
              onClick={() => gotoSlide(adIndex)}>
              <GoDotFill />
            </div>
          ))
        }
      </div>
    </div>
  )
}
