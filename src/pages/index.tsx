
import HomePage from '@/components/sophon/home/index';
import { useWeb3React } from '@web3-react/core';
import { useEffect, useState } from 'react';

import ReactMarkdown from 'react-markdown'
import useAxios from '../lib/useAxios';
import { useRecoilState } from 'recoil';
import { addressState, loadingVisibleState } from '@/store/globalState';


export default function Home() {
  const [data, setData] = useState('');
  const { library, account, activate, active } = useWeb3React();
  const [addressData,setAddressState]=useRecoilState(addressState)
  const {get}= useAxios();
  const [loadingVisible,setLoadingVisible] = useRecoilState(loadingVisibleState);


  useEffect(() => {
    if (account) {
      setLoadingVisible(true);
      
        const source = new EventSource(`https://api.resumes3.xyz/api/v1/stream/${account}`);
        source.onmessage = function (event) {
          setLoadingVisible(false);
  
          console.log(event.data);
          setData(data => data + event.data);
        };
  
        source.addEventListener('end', function(event) {
          console.log('Stream ended');
          source.close();
          
           get(`https://api.resumes3.xyz/api/v1/resumes/${account}`).then((res)=>{
            console.log(res.data.data);
            setAddressState(res.data.data)
          })
        });
        source.onerror = function(event) {
          console.log(event);
          alert("API 接口速率限制了，请人少的时候来。");
          source.close();
        }
        return () => {
          source.close(); // 关闭旧的 EventSource 实例
          setData(""); // 清空旧的数据
        };

     
      
    }

  }, [account]);



  return (
    <div className='flex flex-col h-90 items-center justify-center'>
      <div className='text-3xl text-gray-300 mb-10'>Resume <span className='text-6xl text-white'>3</span></div>
      <HomePage />
      <article
        className={'prose text-white mt-5 prose-p:text-weak prose-ul:text-weak'}
      >
        <ReactMarkdown>{data}</ReactMarkdown>
      </article>
    </div>


  )
}
