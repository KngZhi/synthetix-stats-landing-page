import Link from 'next/link'
import Datagrid from '../components/data/Datagrid'
import NetworkNavBar from '../components/network/NetworkNavBar'
import Subheader from '../components/subheader/Subheader'
import {
  createQueryContext,
  SynthetixQueryContextProvider,
} from '@synthetixio/queries'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import { useContext, useState } from 'react'
import { NetworkId } from '@synthetixio/contracts-interface'
import useNetwork from '../hooks/useNetwork'
import useGetTradeActivity from '../hooks/useGetTradeActivity'



const queryClient = new QueryClient()



const Home = (props:any) => {
//@ts-ignore
  const { netId } = useNetwork()

  const arr:any[] = [1,3, "yo"]
  let id:NetworkId = 10


  //@ts-ignore
  const test = useContext<NetworkId>(id)

  return (
    <div>
      <Subheader />
      
    
      <NetworkNavBar />
      <Datagrid />
 
          <div>
         
            {arr}
          </div>
      

    </div>
  )
}

export default Home