import { atom, useSetRecoilState } from 'recoil';

export const countState = atom({
  key: 'countState', 
  default: 0, 
});

export const loadingVisibleState = atom({
  key: 'loadingVisibleState', 
  default: false, 
});
export function useLoading() {
  const setLoadingVisible = useSetRecoilState(loadingVisibleState);
  return setLoadingVisible;
}
