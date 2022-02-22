import { FormUpdateRestaurant } from '../../components/FormUpdateRestaurant/FormUpdateRestaurant';
import { Layout } from '../../components/Layout/Layout';
import { useRouter } from 'next/router';

export default function UpdateRestaurant({ data }) {
  const router = useRouter();

  return (
    <Layout>
      <FormUpdateRestaurant data={data} />
    </Layout>
  );
}

export async function getServerSideProps(router) {
  const id = router.query.id;
  let data = '';

  try {
    const res = await fetch(`http://localhost:4000/restaurants/${id}`);
    data = await res.json();
  } catch (error) {
    console.log(error);
  }
  return { props: { data: data[0] } };
}
