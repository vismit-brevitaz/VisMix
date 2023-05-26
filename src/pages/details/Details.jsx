import React from 'react'
import "./style.scss"
import useFetch from '../../hooks/useFetch'
import { useParams } from 'react-router-dom'
import DetailsBanner from './detailsBanner/DetailsBanner'
import Cast from './cast/Cast'
import VideosSection from './videoSection/VideoSection'
import Similar from '../details/carousel/Similar'
import Recommendation from './carousel/Recommendation'

function details() {
  const {mediaType,id}= useParams()
  const {data,loading}= useFetch(`/${mediaType}/${id}/videos`)
  const {data:credits,loading:creditsLoading}= useFetch(`/${mediaType}/${id}/credits`)
  return ( 
    <div>
      <DetailsBanner video={data?.results[data.results.length-1]} crew={credits?.crew}/>
      <Cast data={credits?.cast} loading = {creditsLoading}/>
      <VideosSection data={data} loading={loading}/>
      <Similar mediaType={mediaType}  id={id}/>
      <Recommendation mediaType={mediaType}  id={id}/>
    </div>
  )
}

export default details 