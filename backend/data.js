import bcrypt from 'bcryptjs';

const data = {
    users:[
      {
        name: 'Luka',
        email: 'admin@gmail.com',
        password: bcrypt.hashSync('123456'),
        isAdmin: true
      },
      {
        name: 'Sara',
        email: 'user@gmail.com',
        password: bcrypt.hashSync('123456'),
        isAdmin: false
      },
    ],

    products: [
      {
        
        name: 'Assassins Creed Mirage',
        slug: 'assassins-creed-mirage',
        category: 'Action',
        image: '/images/1.jpg', // 679px × 829px
        price: 49.99,
        countInStock: 10,
        platform: 'Ubisoft Connect',
        rating: 4.5,
        numReviews: 10,
        description: 'high quality game',
      },
      {
        
        name: 'Dying Light 2',
        slug: 'dying-light-2',
        category: 'Action',
        image: '/images/2.jpg',
        price: 54.99,
        countInStock: 0,
        platform: 'Epic Games',
        rating: 4.0,
        numReviews: 10,
        description: 'high quality game',
      },
      {
        
        name: 'Horizon Zero Dawn',
        slug: 'horizon-zero-dawn',
        category: 'Adventure',
        image: '/images/3.jpg',
        price: 59.99,
        countInStock: 15,
        platform: 'Steam',
        rating: 4.5,
        numReviews: 14,
        description: 'high quality game',
      },
      {
        
        name: 'Far Cry 6',
        slug: 'far-cry-6',
        category: 'Shooter',
        image: '/images/4.jpg',
        price: 64.99,
        countInStock: 5,
        platform: 'Steam',
        rating: 4.5,
        numReviews: 10,
        description: 'high quality game',
      },
    ],
  };
  export default data;