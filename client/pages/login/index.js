import { useRouter } from 'next/router';
import { useContext, useState } from 'react';
import { Layout } from '../../components/Layout/Layout';
import { Title } from '../../components/Title/Title';
import { UserContext } from '../../context/newCotext';
import Image from 'next/image';
import logoImago from '../../img/imago.svg';
import bannerLogin from '../../img/banner-login.svg';
import { Loading } from '../../components/Loading/Loading';

export default function Login() {
  const router = useRouter();

  const [state, setState] = useState({
    username: '',
    password: '',
  });

  const [loading, setLoading] = useState(false);

  const { storeToken, storeUser } = useContext(UserContext);

  const handleInputChange = (e) => {
    e.preventDefault();

    setState((prevProps) => ({
      ...prevProps,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const body = {
      username: state.username,
      password: state.password,
    };

    const options = {
      headers: new Headers({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Methods': '*',
        mode: 'no-cors',
      }),
      method: 'POST',
      body: JSON.stringify(body),
    };

    try {
      setLoading(true);
      const res = await fetch(`http://localhost:4000/auth`, options);
      const json = await res.json();
      if (res.status === 400) {
        alert('User or password does not exist');
      } else {
        storeToken(json.data.token);
        storeUser(json.data.user);
        router.push('/restaurant');
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) {
    <Loading />;
  }

  return (
    <Layout>
      <div className='login'>
        <div className='login__container'>
          <div className='login__banner'>
            <Image
              className='login__container__banner__set'
              src={bannerLogin}
              alt='Banner'
            />
          </div>
          <div className='login__container__logo'>
            <Image
              className='login__container__logo__set'
              src={logoImago}
              alt='Logo'
            />
          </div>
          <div className='login__container__title'>
            <Title>Enter your email address</Title>
          </div>
          <form className='login__container__form' onSubmit={handleSubmit}>
            <label>Username</label>
            <input
              type='text'
              id='username'
              name='username'
              value={state.username}
              placeholder='username'
              onChange={handleInputChange}
            />
            <label>Password</label>
            <input
              type='password'
              name='password'
              id='password'
              value={state.password}
              placeholder='*******'
              onChange={handleInputChange}
            />
            <button type='submit'>Submit</button>
          </form>
        </div>
      </div>
    </Layout>
  );
}
