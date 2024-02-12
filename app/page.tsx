"use client"
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from "react"
import { fetchPosts } from '@/features/common/commonSlice'
import { AppDispatch, RootState } from '@/store/store'
import LandingPage from './landingpage/page'
interface postData {
  title: string
}

export default function Home() {

  const dispath = useDispatch<AppDispatch>()
  // const { post } = useSelector((state: RootState) => state.commonSlice)

  // console.log(post)
  // useEffect(() => {
  //   dispath(fetchPosts())
  // }, [])

  useEffect(() => {
    (window as any).tolstoyWidgetId = "8n325wid8kupn";
    var s = document.createElement("script");
    s.type = "text/javascript";
    s.async = true;
    s.src = "https://widget.gotolstoy.com/widget/widget.js";
    document.head.appendChild(s);
  }, [])

  return (
    <div className='w-full relative'>
      <LandingPage />
    </div>
  )
}
