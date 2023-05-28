import { atom, useSetRecoilState } from 'recoil';

export const userState = atom<{ token: string; user: any } | null>({
  key: 'userState',
  default: {
    token: '', 
    user: {
      createdAt:"",
      deletedAt:null,
      email:"",
      firstName:"",
      id:3,
      lastName:'',
      photo:null,
      provider:"email"
    }
  },
});


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
