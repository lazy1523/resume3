import { loadingVisibleState } from '@/store/globalState'
import { useRecoilState } from 'recoil';
import styles from './loading.module.css';


export default function Loading() {
    const [loadingVisible] = useRecoilState(loadingVisibleState);

    if (!loadingVisible) {
        return null
    }

    return (
        <div className={styles.loading_sophon}>
            <div className={styles.honeycomb}>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
    )
}