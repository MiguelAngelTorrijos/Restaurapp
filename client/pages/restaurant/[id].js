import { useRouter } from 'next/router';
import { Layout } from '../../components/Layout/Layout';
import { Title } from '../../components/Title/Title';
import Link from 'next/link';
import Image from 'next/image';
import imgReview from '../../img/review-icon.svg';
import { useContext } from 'react';
import { UserContext } from '../../context/newCotext';

export default function Restaurant({ data }) {
  const router = useRouter();
  const { user } = useContext(UserContext);

  const {
    name,
    neighborhood,
    address,
    image,
    cuisine_type,
    operating_hours,
    reviews,
    id,
  } = data;

  const hours = Object.values(operating_hours);

  const days = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
  ];

  const handleDelete = async (id) => {
    const options = {
      headers: new Headers({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Methods': '*',
        mode: 'no-cors',
      }),
      method: 'DELETE',
    };
    const res = await fetch(`http://localhost:4000/restaurants/${id}`, options);
    router.push('/restaurant');
  };

  return (
    <Layout>
      <div className='restaurant'>
        <div
          className='restaurant__header'
          style={{
            backgroundImage: `url(${image})`,
          }}
        >
          <div className='restaurant__header__title'>
            <Title>{name}</Title>
          </div>

          {cuisine_type && (
            <p className='restaurant__header__cuisine'>{cuisine_type}</p>
          )}

          <div className='restaurant__header__address-restaurant'>
            {neighborhood && <p> {neighborhood}</p>}
            <p className='restaurant__header__address-restaurant__separator'>
              {''}| {''}
            </p>
            {address && <p>{address} </p>}
          </div>
        </div>
        <div className='restaurant__content'>
          <div className='restaurant__content__reviews'>
            {reviews ? (
              reviews.map((rev, index) => (
                <div key={index}>
                  <div className='restaurant__content__reviews__grid'>
                    <div>
                      <p className='restaurant__content__reviews__name'>
                        {rev.name}
                      </p>
                      <p className='restaurant__content__reviews__date'>
                        {rev.date}
                      </p>
                    </div>
                    <div className='restaurant__content__reviews__rating'>
                      <p>{rev.rating}/5 </p>
                      <Image
                        className=''
                        src={imgReview.src}
                        alt='Star image'
                        width='15'
                        height='15'
                      />
                    </div>
                  </div>
                  <p className='restaurant__content__reviews__comments'>
                    {rev.comments}
                  </p>
                  <hr className='restaurant__content__reviews__hr' />
                </div>
              ))
            ) : (
              <h2 className='restaurant__content__hours__subtitle'>
                Oh! 😔 This restaurant has no reviews
              </h2>
            )}
          </div>
          <div className='restaurant__content__hours'>
            <h2 className='restaurant__content__hours__subtitle'>
              Restaurant opening hours
            </h2>
            {hours && (
              <ul>
                {hours.map((hour, index) => (
                  <div className='restaurant__content__hours__grid' key={index}>
                    <li className='restaurant__content__hours__grid__name'>
                      {days[index]}
                    </li>
                    <li className='restaurant__content__hours__grid__hour'>
                      {hour}
                    </li>
                  </div>
                ))}
              </ul>
            )}
            {user && (
              <div className='restaurant__content__hours__btns'>
                <Link
                  href='/update-restaurant/[id]'
                  as={`/update-restaurant/${id}`}
                >
                  <a className='restaurant__content__hours__btns__link'>
                    Update
                  </a>
                </Link>
                <button onClick={() => handleDelete(id)}>Delete</button>
              </div>
            )}
          </div>
        </div>
      </div>
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
