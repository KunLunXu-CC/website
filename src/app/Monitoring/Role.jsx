import { useGetRolesQuery } from '@store/graphql';

export default () => {
  const { data } = useGetRolesQuery();
  console.log('%c [ data ]-5', 'font-size:13px; background:pink; color:#bf2c9f;', data);

  return (
    <div>
      1111111111
    </div>
  );
};
