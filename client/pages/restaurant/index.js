import Link from 'next/link';
import { Title } from '../../components/Title/Title';
import { Layout } from '../../components/Layout/Layout';
import { Image } from 'semantic-ui-react';
import imgHero from '../../img/img_hero.png';
import brokenImg from '../../img/broken-page.svg';
import noFav from '../../img/noFav-icon.svg';
import Fav from '../../img/fav-icon.svg';
import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../context/newCotext';
import { useRouter } from 'next/router';

export default function Restaurant({ restaurants }) {
  const { user, token } = useContext(UserContext);

  const router = useRouter();

  const [allRestaurants, setAllRestaurants] = useState(restaurants);
  allRestaurants == restaurants;

  useEffect(() => {
    setAllRestaurants(allRestaurants);
  }, [allRestaurants]);

  const handleFav = async (restaurantId) => {
    const index = user.favourites.indexOf(restaurantId);
    index === -1
      ? user.favourites.push(restaurantId)
      : user.favourites.splice(index, 1);

    let url = 'http://localhost:4000/favourites';

    const options = {
      method: index === -1 ? 'POST' : 'DELETE',
      headers: new Headers({
        Authorization: token,
        'Content-Type': 'application/json',
        'Access-Control-Allow-Methods': '*',
        mode: 'no-cors',
      }),
    };

    index === -1
      ? (options.body = JSON.stringify({ favourites: user.favourites }))
      : (url = `${url}/${restaurantId}`);
    try {
      await fetch(url, options);
      setAllRestaurants(restaurantId);
      setAllRestaurants();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <div className='restaurant'>
        <div className='restaurants__header'>
          {user ? (
            <div className='restaurants__header__left'>
              <Title className='restaurants__header__left__title'>
                Hi {user?.name}!
              </Title>
              <p>A new restaurant to add?</p>
              <Link href='/new-restaurant'>
                <a className='restaurants__header__left__link'>Create </a>
              </Link>
            </div>
          ) : (
            <div className='restaurants__header__left'>
              <Title className='restaurants__header__left__title'>
                Welcome!
              </Title>
              <p>Already registered in our app?</p>
              <Link href='/login'>
                <a className='restaurants__header__left__link'>Login </a>
              </Link>
            </div>
          )}

          <Image
            className='restaurants__header__img'
            src={imgHero.src}
            alt='Food image'
          />
        </div>
        <Image
          className='restaurants__header__broken'
          src={brokenImg.src}
          alt='broken image'
        />
        {restaurants.length > 0 ? (
          <h2 className='restaurants__subtitle'>All our restaurants</h2>
        ) : (
          <h2 className='restaurants__subtitle'>
            Sorry, there are no restaurants at the moment, try again later.
          </h2>
        )}
        <div className='restaurants__grid'>
          {restaurants.map((restaurant, index) => (
            <div className='restaurants__grid__card' key={index}>
              <div className='restaurants__grid__card__img'>
                <Image
                  src={restaurant.image}
                  alt='Restaurant image'
                  width='auto'
                  height='300'
                />
              </div>
              <div className='restaurants__grid__cusine'>
                <p>{restaurant.cuisine_type}</p>
              </div>
              <div className='restaurants__grid__name'>
                <div>
                  <p>{restaurant.name}</p>
                </div>
                {user && (
                  <>
                    {user && user.favourites.includes(restaurant.id) ? (
                      <Image
                        onClick={() => {
                          handleFav(restaurant.id);
                        }}
                        className='fav'
                        src={Fav.src}
                        alt='fav image'
                        width='16'
                        height='16'
                      />
                    ) : (
                      <Image
                        onClick={() => {
                          handleFav(restaurant.id);
                        }}
                        className='no-fav'
                        src={noFav.src}
                        alt='nofav image'
                        width='16'
                        height='16'
                      />
                    )}
                  </>
                )}
              </div>
              <div className='restaurants__grid__neighborhood'>
                <p>{restaurant.neighborhood}</p>
              </div>
              <div className='restaurants__grid__address'>
                <p>{restaurant.address}</p>
              </div>

              <Link href='/restaurant/[id]' as={`/restaurant/${restaurant.id}`}>
                <a className='restaurants__grid__more'>More info...</a>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}

export async function getStaticProps() {
  const res = await fetch('http://localhost:4000/restaurants');
  const restaurants = await res.json();
  return {
    props: {
      restaurants,
    },
  };
}
