import { useState, useEffect } from 'react';
import { faker } from '@faker-js/faker';

export default function useRandomUser(location) {

  let loc = location === '' ? 'en' : location;
  faker.locale = loc;

  const [profile, setProfile] = useState(null);

  function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

  useEffect(() => {
    let age = getRandomInt(100);
    let birthdate = faker.date.birthdate({ min: age, max: age, mode: 'age' });
    let raw_birthday = new Date(birthdate);
    let birthday = new Date(raw_birthday.getFullYear(), raw_birthday.getMonth(), raw_birthday.getDate()).toDateString();
    setProfile(
      {
        localization: loc,
        name: faker.name.findName(),
        imageURL: `https://picsum.photos/seed/${getRandomInt(1000)}/200/200`,
        age: age,
        company: faker.company.companyName(),
        music: faker.music.genre(),
        phone: faker.phone.phoneNumber(),
        birthday: birthday,
        job: `${faker.name.jobTitle()} in ${faker.name.jobArea()}`,
        vehicle: faker.vehicle.vehicle()
      });
  }, [loc]);

  return JSON.stringify(profile);
}
