const products = [
      {
        name: 'iPhone 12 Pro 256GB',
        image: 'http://localhost:5000/products/iphone12.png',
        description: '5G speed. A14 Bionic, the fastest chip in a smartphone. An edge-to-edge OLED display. Ceramic Shield with four times better drop performance. And Night mode on every camera. iPhone 12 has it all.',
        brand: 'Apple',
        category: {name:'Smartphone', image: 'http://localhost:5000/categories/smartphoneCategory.jpg'},
        price: 599.99,
        countInStock: 8,
        rating: 0,
        numReviews: 0,
      },  {
        name: 'Xbox Series X',
        image: 'http://localhost:5000/products/seriesX.png',
        description: 'The ninth console generation of Microsoft.',
        brand: 'Microsoft',
        category: {name:'Videogame', image:'http://localhost:5000/categories/videogameCategory.jpg'},
        price: 499.99,
        countInStock: 9,
        rating: 0,
        numReviews: 0,
      },
      {
        name: 'MacBook Air Pro 13"',
        image: 'http://localhost:5000/products/macBook.png',
        description: 'The new M2 chip makes the 13-inch MacBook Pro more capable than ever. The same compact design supports up to 20 hours of battery life1 and an active cooling system to sustain enhanced performance.',
        brand: 'Apple',
        category: {name:'Notebook', image: 'http://localhost:5000/categories/notebookCategory.jpg'},
        price: 1299.00,
        countInStock: 10,
        rating: 0,
        numReviews: 0,
      },
      { 
        name: 'Playstation 5 (PS5)',
        image: 'http://localhost:5000/products/ps5.png',
        description: 'Enjoy the ninth generation console developed by Sony Interactive Entertainment',
        brand: 'Sony',
        category: {name:'Videogame', image: 'http://localhost:5000/categories/videogameCategory.jpg'},
        price: 499.00,
        countInStock: 6,
        rating: 0,
        numReviews: 0,
      }
     ,
      {
        name: 'JBL Tour One M2',
        image: "http://localhost:5000/products/jblPhone.png",
        description: "JBL Tour One M2's True Adaptive Noise Cancelling technology tunes out distractions so you can enjoy your favorite playlists all powered by legendary Hi-Res certified JBL Pro Sound.",
        brand: 'JBL',
        category: {name:'Headphone', image: 'http://localhost:5000/categories/headphoneCategory.jpg'},
        price: 260.00,
        countInStock: 4,
        rating: 0,
        numReviews: 0,
      },
      {
        name: 'Canon EOS R5',
        image: 'http://localhost:5000/products/canonCam.png',
        description: 'Canon is an excellent brand that many photographers trust. Image quality and contrast are consistently excellent. And their latest model also features outstanding video functions.',
        brand: 'Canon',
        category: {name:'Camera', image: 'http://localhost:5000/categories/cameraCategory.jpg'},
        price: 3899.00,
        countInStock: 6,
        rating: 0,
        numReviews: 0,
      },
      {
        name: 'iPhone 13 Pro Max 256GB',
        image: 'http://localhost:5000/products/iphone13.png',
        description: 'The biggest Pro camera system upgrade ever. Super Retina XDR display with ProMotion for a faster, more responsive feel. Lightning-fast A15 Bionic chip. Durable design and the best battery life ever in an iPhone.',
        brand: 'Apple',
        category: {name:'Smartphone', image: 'http://localhost:5000/categories/smartphoneCategory.jpg'},
        price: 699.00,
        countInStock: 9,
        rating: 0,
        numReviews: 0,
      }, 
      {
        name: 'ProArt Studiobook Pro 16 OLED',
        image: 'http://localhost:5000/products/assusLaptop.png',
        description: 'ProArt Studiobook is the best laptop for professional creators, with ultimate performance, professional-grade graphics and a color-accurate wide-gamut display.',
        brand: 'Asus',
        category: {name:'Notebook', image: 'http://localhost:5000/categories/notebookCategory.jpg'},
        price: 1599.00,
        countInStock: 8,
        rating: 0,
        numReviews: 0,
      }, 
      {
        name: 'Sony MDR-ZX110',
        image: 'http://localhost:5000/products/sonyPhone.png',
        description: "When you're on the move, listen to your tunes in clear, balanced sound with the MDR-ZX110 headphones featuring dynamic 30mm drivers. While cushioned earpads give you extra comfort on the go.",
        brand:  'Sony',
        category: {name:'Headphone', image: 'http://localhost:5000/categories/headphoneCategory.jpg'},
        price: 89.99,
        countInStock: 9,
        rating: 0,
        numReviews: 0,
      },
      {
        name: 'iPhone 14 Pro 128GB',
        image: 'http://localhost:5000/products/phone14.png',
        description: "Apple's 2022 'Pro' iPhones feature a notchless display with Dynamic Island, a faster A16 chip, 48-megapixel camera, Crash Detection, satellite connectivity, and more.",
        brand: 'Apple',
        category: {name:'Smartphone', image: 'http://localhost:5000/categories/smartphoneCategory.jpg'},
        price: 1099.99,
        countInStock: 10,
        rating: 0,
        numReviews: 0,
      },  
      {
        name:  'Beats Solo3 Wireless',
        image: 'http://localhost:5000/products/beatsPhone.png',
        description: 'Beats headphones cater to this desire as their bright colors and stylish designs are able to infuse a pop of personality that sets one apart from others.',
        brand: 'Beats',
        category: {name:'Headphone', image: 'http://localhost:5000/categories/headphoneCategory.jpg'},
        price: 199.00,
        countInStock: 3,
        rating: 0,
        numReviews: 0, 
      },
      
      {
        name: 'Nikon D3300',
        image: 'http://localhost:5000/products/nikonCam.png',
        description: 'The Nikon D3300 is a solid camera, in more ways than one: solid build quality and solid image quality.',
        brand: 'Nikon',
        category: {name:'Camera', image: 'http://localhost:5000/categories/cameraCategory.jpg'},
        price: 294.00,
        countInStock: 10,
        rating: 0,
        numReviews: 0,
      }
]

module.exports = products