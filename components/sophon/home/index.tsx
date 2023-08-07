import { Button } from '@/components/ui/button';
import styles from './index.module.css';
import { ethers } from 'ethers';
import { addressState, keyWordState, loadingVisibleState } from '@/store/globalState';
import { useRecoilState } from 'recoil';
import domtoimage from 'dom-to-image';
import { STSClient, AssumeRoleCommand } from '@aws-sdk/client-sts'
import { S3 } from '@aws-sdk/client-s3';
import ResumesNFT from './Resume3NFT.json'
import { useWeb3React } from '@web3-react/core';
import { useState } from 'react';
const Home = () => {
    const [addressData,] = useRecoilState(addressState)
    const { library, account, activate, active } = useWeb3React();
    const [loadingVisible,setLoadingVisible] = useRecoilState(loadingVisibleState);

    const client = new S3({
        endpoint: 'https://endpoint.4everland.co',
        region: 'eu-west-2',
        credentials: {
            accessKeyId: process.env.NEXT_PUBLIC_EVER_API_KEY!,
            secretAccessKey: process.env.NEXT_PUBLIC_EVER_API_SECRET!,
        },
    });

    const queryEtag = async (key: string) => {
        const params = {
            Bucket: 'resumes3',
            Prefix: key,
        };
        const res = await client.listObjectsV2(params);
        if (!res.Contents?.[0]) {
            throw Error('不存在的key');
        }
        return res.Contents?.[0].ETag;
    }


    /**
     *         0-10笔交易：0分 (萌新)
        11-50笔交易：10分 (新手)
        51-100笔交易：20分 (老手)
        101-500笔交易：30分 (你是会亏Gas的)
        500笔以上交易：40分 (女巫，绝对是女巫)
     */
    const txKeyWord = (tx: any) => {
        let fraction = '*****'
        if (tx >= 0 && tx <= 10) {
            fraction = '萌新'
        } else if (tx >= 11 && tx <= 50) {
            fraction = '新手'
        } else if (tx >= 51 && tx <= 100) {
            fraction = '老手'
        } else if (tx >= 101 && tx <= 500) {
            fraction = '你是懂得亏Gas的'
        } else if (tx > 500) {
            fraction = '女巫，你绝对是女巫!'
        }
        return fraction;
    }

    /**
     * 
     *  ETH生涯 - 30分
        少于30天：0分 (老账号被盗了吧？)
        30-90天：10分 (看起来你很嫩)
        90-365天：15分 (这么久还没亏完？)
        365-1000天：20分 (你是会亏Gas的)
        1000天以上：30分 (安全交易30年，没人比你更懂安全)
     */

    const timeKeyWord = (time: any) => {
        let fraction = '*****'
        if (time >= 0 && time <= 30) {
            fraction = '老账号被盗了吧？'
        } else if (time >= 30 && time <= 90) {
            fraction = '看起来你很嫩';
        } else if (time >= 90 && time <= 365) {
            fraction = '这么久还没亏完？'
        } else if (time >= 365 && time <= 1000) {
            fraction = '你是会亏Gas的'
        } else if (time > 1000) {
            fraction = '安全交易30年，没人比你更懂安全'
        }
        return fraction;
    }

    /**
     *  3. Gas费用 (GasFee) - 30分
        少于0.05 ETH：0分 (你是不是没钱了？)
        0.05-0.1 ETH：10分 (你还可以再亏一点)
        0.1-0.2 ETH：15分 (你是会亏Gas的)
        0.2-0.5 ETH：20分 (你亏的Gas，可以买个新手机了)
        0.5-1 ETH：25分 (你亏的Gas，可以买个新电脑了)
        1 ETH 以上：30分 (丰密老师，是你吗？！)
     */

    const gasKeyWord = (gasFee: any) => {
        let fraction = '*****'
        if (gasFee >= 0 && gasFee <= 0.05) {
            fraction = '你是不是没钱了？'
        } else if (gasFee >= 0.05 && gasFee <= 0.1) {
            fraction = '你还可以再亏一点'
        } else if (gasFee >= 0.1 && gasFee <= 0.2) {
            fraction = '你是会亏Gas的'
        } else if (gasFee >= 0.2 && gasFee <= 0.5) {
            fraction = '你亏的Gas，可以买个新手机了'
        } else if (gasFee >= 0.5 && gasFee <= 1) {
            fraction = '你亏的Gas，可以买个新电脑了'
        } else if (gasFee > 1) {
            fraction = '丰密老师，是你吗？！'
        }
        return fraction;
    }


    const onMintNFT = async (cid: string) => {
        setLoadingVisible(true);
        const ethereum = (window as any).ethereum
        if (typeof ethereum !== 'undefined') {
            const provider = new ethers.providers.Web3Provider(ethereum);
            const signer = provider.getSigner();
            const contract = new ethers.Contract('0x4e23FB54e4d22953E63713D9176548EBA7aD3E09', ResumesNFT.abi, signer);
            try {
                const mint = await contract.mint(cid, { value: ethers.utils.parseEther("0.001") })
                await mint.wait();
                setLoadingVisible(false);
                alert("恭喜你，主网TX增加了一条。愿你亏Gas不亏钱，永远（3，3），永远10倍起！！")
            } catch (err) {
                window.console.log('Error: ', err)
            }
        }
    }

    const uploadComponentAsPNGAndMint = async () => {
        const node = document.getElementById('nft-card');

        if (node) {
            // 使用 dom-to-image 将组件转为 Blob 对象
            const blob = await domtoimage.toBlob(node);

            const card_key = `${account}.png`;
            // 上传文件到 S3
            const uploadParams = {
                Bucket: 'resumes3',
                Key: 'png/'+card_key,
                Body: blob,
            };
            await client.putObject({ ...uploadParams });
            const pngCid = await queryEtag(card_key);
            console.log(pngCid);
            // 这里应该去除 ""
            const new_pngCid = pngCid!.replace(/"/g, '');
            onMintNFT(new_pngCid!)

        }
    };


    return (
        <div id='nft-card' className={styles.card}>
            <svg className={styles.img} xmlns="http://www.w3.org/2000/svg" xmlSpace="preserve" width="293px" height="428px" version="1.1" shapeRendering="geometricPrecision" textRendering="geometricPrecision" imageRendering="optimizeQuality" fillRule="evenodd" clipRule="evenodd" viewBox="0 0 784.37 1277.39" xmlnsXlink="http://www.w3.org/1999/xlink">
                <g id="Layer_x0020_1">
                    <metadata id="CorelCorpID_0Corel-Layer"></metadata>
                    <g id="_1421394342400">
                        <g>
                            <polygon fill="#343434" fillRule="nonzero" points="392.07,0 383.5,29.11 383.5,873.74 392.07,882.29 784.13,650.54"></polygon>
                            <polygon fill="#8C8C8C" fillRule="nonzero" points="392.07,0 -0,650.54 392.07,882.29 392.07,472.33"></polygon>
                            <polygon fill="#3C3C3B" fillRule="nonzero" points="392.07,956.52 387.24,962.41 387.24,1263.28 392.07,1277.38 784.37,724.89"></polygon>
                            <polygon fill="#8C8C8C" fillRule="nonzero" points="392.07,1277.38 392.07,956.52 -0,724.89"></polygon>
                            <polygon fill="#141414" fillRule="nonzero" points="392.07,882.29 784.13,650.54 392.07,472.33"></polygon>
                            <polygon fill="#393939" fillRule="nonzero" points="0,650.54 392.07,882.29 392.07,472.33"></polygon>
                        </g>
                    </g>
                </g>
            </svg>

            <div className={styles.textBox}>
                <p className="text-3xl">Resumes3</p>
                <span >{addressData.txCount===''?'******': txKeyWord(addressData.txCount)}</span>
                <span>{addressData.intervalInDays===''?'********': timeKeyWord(addressData.intervalInDays)}</span>
                <span>{addressData.totalGasUsed===''?'*******': gasKeyWord(addressData.totalGasUsed)}</span>
                <p className="text-xl">总分：{addressData.fraction===0?'***':addressData.fraction} €</p>
                {addressData.txCount===''?
                <Button disabled variant="ghost">MINT </Button>
                : <Button onClick={() => uploadComponentAsPNGAndMint()} variant="ghost">MINT </Button>}
                
            </div>

        </div>

    )
}
export default Home