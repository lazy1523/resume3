
import { Button } from "@/components/ui/button"
import { useRecoilState } from "recoil"
import { addressState, userState } from "@/store/globalState"
import { useWeb3React } from '@web3-react/core'
import { InjectedConnector } from '@web3-react/injected-connector'

import { ethers } from 'ethers';
import useAxios from "@/src/lib/useAxios"

export function UserNav() {
  const [wallet, setWallet] = useRecoilState(addressState);
  const { library, account, activate, active,chainId } = useWeb3React();
  // const {post} =useAxios;
  const setProvider = (type: string) => {
    window.localStorage.setItem('provider', type)
  }
  const injected = new InjectedConnector({
    supportedChainIds: [1, 3, 15557, 4, 5, 31337, 42, 42161, 80001, 42170, 56, 137, 10, 250, 43114],
  })
  const subAddress=(address:any)=>{
    return address.slice(0, 6) + '...' + address.slice(-4)
  }
  const connectWallet = async () => {
    if(chainId!==1){
        try {
            await (window as any).ethereum.request({
                method: 'wallet_switchEthereumChain',
                params: [{ chainId: '0x1' }],
              });
        } catch (switchError: any) {
            if (switchError.code === 4902) {
                try {
                    await library.provider.request({
                        method: 'wallet_addEthereumChain',
                        params: [{ chainId:0x1 }],
                    })
                } catch (error) {
                    window.console.error('switchNetwork error:\n',error)
                }
            }
    }
    }
    await activate(injected)
    await setProvider('injected')
  }



  return (
    <Button onClick={() => connectWallet()} variant="secondary" className="">{active?subAddress(account):'Connect Wallet'}</Button>
  )
}
