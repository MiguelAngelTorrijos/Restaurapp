import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { Loading } from '../Loading/Loading';

export const FormNewRestaurant = () => {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const [values, setValues] = useState({
    id: 0,
    name: '',
    neighborhood: '',
    address: '',
    image: '',
    cuisine_type: '',
    operating_hours: {
      Monday: '',
      Tuesday: '',
      Wednesday: '',
      Thursday: '',
      Friday: '',
      Saturday: '',
      Sunday: '',
    },
  });

  const {
    id,
    name,
    neighborhood,
    address,
    image,
    cuisine_type,
    operating_hours,
  } = values;

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
      const res = await fetch(`http://localhost:4000/restaurants`, options);
      if (res.status === 400) {
        alert('The id already exists');
      } else {
        alert('Created a new restaurant');
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
    <div className='form-restaurant'>
      <div className='form-restaurant__container'>
        <form
          className='form-restaurant__container__form'
          onSubmit={handleSubmit}
        >
          <h1 className='form-restaurant__container__form__title'>
            New restaurant
          </h1>
          <div className='form-restaurant__container__form__left'>
            <label>Id*</label>
            <input
              id='id'
              name='id'
              type='number'
              value={id}
              onChange={handleChange}
              required
            />
            <label>Name*</label>
            <input
              id='name'
              name='name'
              type='text'
              value={name}
              onChange={handleChange}
              required
              placeholder='Restaurant name'
            />
            <label>City*</label>
            <input
              id='neighborhood'
              name='neighborhood'
              type='text'
              value={neighborhood}
              onChange={handleChange}
              required
              placeholder='City name'
            />
            <label>Address</label>
            <input
              id='address'
              name='address'
              type='text'
              value={address}
              onChange={handleChange}
              placeholder='Restaurant address'
            />
            <label>Cuisine type</label>
            <input
              id='cuisine_type'
              name='cuisine_type'
              type='text'
              value={cuisine_type}
              onChange={handleChange}
              placeholder='Restaurant cuisine type'
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
                  value={operating_hours.Monday}
                  onChange={handleChange}
                  placeholder='Ex. 11:30 am - 2:00 am'
                />
                <label>Tuesday</label>
                <input
                  id='tuesday'
                  name='Tuesday'
                  type='text'
                  value={operating_hours.Tuesday}
                  onChange={handleChange}
                  placeholder='Ex. 11:30 am - 2:00 am'
                />
                <label>Wednesday</label>
                <input
                  id='wednesday'
                  name='Wednesday'
                  type='text'
                  value={operating_hours.Wednesday}
                  onChange={handleChange}
                  placeholder='Ex. 11:30 am - 2:00 am'
                />
                <label>Thursday</label>
                <input
                  id='thursday'
                  name='Thursday'
                  type='text'
                  value={operating_hours.Thursday}
                  onChange={handleChange}
                  placeholder='Ex. 11:30 am - 2:00 am'
                />
              </div>
              <div className='form-restaurant__container__form__days__day'>
                <label>Friday</label>
                <input
                  id='friday'
                  name='Friday'
                  type='text'
                  value={operating_hours.Friday}
                  onChange={handleChange}
                  placeholder='Ex. 11:30 am - 2:00 am'
                />
                <label>Saturday</label>
                <input
                  id='saturday'
                  name='Saturday'
                  type='text'
                  value={operating_hours.Saturday}
                  onChange={handleChange}
                  placeholder='Ex. 11:30 am - 2:00 am'
                />
                <label>Sunday</label>
                <input
                  id='sunday'
                  name='Sunday'
                  type='text'
                  value={operating_hours.Sunday}
                  onChange={handleChange}
                  placeholder='Ex. 11:30 am - 2:00 am'
                />
              </div>
            </div>

            <label>Image</label>
            <input
              id='image'
              name='image'
              type='text'
              value={image}
              onChange={handleChange}
              placeholder='Restaurant image url'
            />
          </div>

          <button type='submit'>Create</button>
        </form>
      </div>
    </div>
  );
};
