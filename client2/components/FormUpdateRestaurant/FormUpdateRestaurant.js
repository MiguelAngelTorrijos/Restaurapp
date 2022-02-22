import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { Loading } from '../Loading/Loading';
export const FormUpdateRestaurant = ({ data }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const {
    id,
    name,
    neighborhood,
    address,
    image,
    cuisine_type,
    operating_hours,
    reviews,
  } = data;

  const [values, setValues] = useState({
    id: data ? data.id : 0,
    name: data ? data?.name : '',
    neighborhood: data ? data?.neighborhood : '',
    address: data ? data?.address : '',
    image: data ? data?.image : '',
    cuisine_type: data ? data?.cuisine_type : '',
    operating_hours: {
      Monday: data ? data?.operating_hours.Monday : '',
      Tuesday: data ? data?.operating_hours.Tuesday : '',
      Wednesday: data ? data?.operating_hours.Wednesday : '',
      Thursday: data ? data?.operating_hours.Thursday : '',
      Friday: data ? data?.operating_hours.Friday : '',
      Saturday: data ? data?.operating_hours.Saturday : '',
      Sunday: data ? data?.operating_hours.Sunday : '',
    },
    reviews: data ? data?.reviews : [],
  });

  const days = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
  ];

  const handleChange = (e) => {
    e.preventDefault();
    const { target } = e;
    const { name, value } = target;
    if (days.indexOf(name) !== -1) {
      operating_hours[name] = value;
    } else if (name === 'id') {
      values[name] = value;
    } else {
      values[name] = value;
    }
    const newValues = {
      ...values,
    };
    setValues(newValues);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const body = {
      id: values.id,
      name: values.name,
      neighborhood: values.neighborhood,
      address: values.address,
      image: values.image,
      cuisine_type: values.cuisine_type,
      operating_hours: {
        Monday: values.operating_hours.Monday,
        Tuesday: values.operating_hours.Tuesday,
        Wednesday: values.operating_hours.Wednesday,
        Thursday: values.operating_hours.Wednesday,
        Friday: values.operating_hours.Friday,
        Saturday: values.operating_hours.Saturday,
        Sunday: values.operating_hours.Sunday,
      },
      reviews: values ? data?.reviews : [],
    };
    const options = {
      headers: new Headers({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Methods': '*',
        mode: 'no-cors',
      }),
      method: 'PUT',
      body: JSON.stringify(body),
    };

    try {
      setLoading(true);
      const res = await fetch(
        `http://localhost:4000/restaurants/${id}`,
        options
      );
      alert('Successfully updated restaurant');
      setLoading(false);
      if (res.status !== 400) router.push('/restaurant');
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) {
    <Loading />;
  }

  return (
    <div className='form-restaurant'>
      <div className='form-restaurant__container'>
        <form
          className='form-restaurant__container__form'
          onSubmit={handleSubmit}
        >
          <h1 className='form-restaurant__container__form__title'>
            Update restaurant
          </h1>
          <div className='form-restaurant__container__form__left'>
            <label>Id*</label>
            <input
              id='id'
              name='id'
              type='number'
              value={values.id}
              onChange={handleChange}
              required
            />
            <label>Name*</label>
            <input
              id='name'
              name='name'
              type='text'
              value={values.name}
              onChange={handleChange}
              required
            />
            <label>City*</label>
            <input
              id='neighborhood'
              name='neighborhood'
              type='text'
              value={values.neighborhood}
              onChange={handleChange}
              required
            />
            <label>Address</label>
            <input
              id='address'
              name='address'
              type='text'
              value={values.address}
              onChange={handleChange}
            />
            <label>Cuisine type</label>
            <input
              id='cuisine_type'
              name='cuisine_type'
              type='text'
              value={values.cuisine_type}
              onChange={handleChange}
            />
          </div>
          <div className='form-restaurant__container__form__left'>
            <p className='form-restaurant__container__form__left__text'>
              Timetables
            </p>
            <div className='form-restaurant__container__form__days'>
              <div className='form-restaurant__container__form__days__day'>
                <label>Monday</label>
                <input
                  id='monday'
                  name='Monday'
                  type='text'
                  value={values.operating_hours.Monday}
                  onChange={handleChange}
                />
                <label>Tuesday</label>
                <input
                  id='tuesday'
                  name='Tuesday'
                  type='text'
                  value={values.operating_hours.Tuesday}
                  onChange={handleChange}
                />
                <label>Wednesday</label>
                <input
                  id='wednesday'
                  name='Wednesday'
                  type='text'
                  value={values.operating_hours.Wednesday}
                  onChange={handleChange}
                />
                <label>Thursday</label>
                <input
                  id='thursday'
                  name='Thursday'
                  type='text'
                  value={values.operating_hours.Thursday}
                  onChange={handleChange}
                />
              </div>
              <div className='form-restaurant__container__form__days__day'>
                <label>Friday</label>
                <input
                  id='friday'
                  name='Friday'
                  type='text'
                  value={values.operating_hours.Friday}
                  onChange={handleChange}
                />
                <label>Saturday</label>
                <input
                  id='saturday'
                  name='Saturday'
                  type='text'
                  value={values.operating_hours.Saturday}
                  onChange={handleChange}
                />
                <label>Sunday</label>
                <input
                  id='sunday'
                  name='Sunday'
                  type='text'
                  value={values.operating_hours.Sunday}
                  onChange={handleChange}
                />
              </div>
            </div>

            <label>Image</label>
            <input
              id='image'
              name='image'
              type='text'
              value={values.image}
              onChange={handleChange}
            />
          </div>

          <button type='submit'>Update</button>
        </form>
      </div>
    </div>
  );
};
