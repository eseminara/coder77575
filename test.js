import fetch from 'node-fetch';

async function test() {
  const response = await fetch('http://localhost:8080/api/products', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      title: 'Producto 1',
      description: 'Desc',
      price: 100,
      thumbnail: 'img.jpg',
      code: 'P1',
      stock: 10
    })
  });
  const data = await response.json();
  console.log(data);
}

test();
