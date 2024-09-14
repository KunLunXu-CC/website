import dynamic from 'next/dynamic';
import Loading from '@/components/AppLoading';

export default dynamic(() => import('./Main'), {
  loading: () => <Loading />,
});
