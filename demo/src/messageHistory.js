export default [
  {
    type: "text",
    author: "them",
    data: {
      text:
        "Hi, I'm Virtual Jeff, I can help you find wine, beer, spirits or answer any questions about our stores and deliveries."
    }
  },
  {
    type: "text",
    author: "them",
    data: {
      text: "What are you looking for today?"
    }
  },
  {
    type: "button",
    author: "them",
    data: {
      text: "How fruity do you like your wine?",
      button: [
        { text: "Medium Fruit" },
        { text: "Full Fruit" }
      ]
    }
  },
  {
    type: "carousel",
    author: "them",
    data: {
      wine: [
        {
          name: "2015 Frescobaldi Remole IGT",
          price: 23.99,
          img:
            "https://www.finewinedelivery.co.nz/content/products/original/27061.jpg",
          url: "https://www.finewinedelivery.co.nz"
        },
        {
          name: "2016 Rocca delle Macie Chianti Classico DOCG",
          price: 26.99,
          img:
            "https://www.finewinedelivery.co.nz/content/products/original/29467~1544125555.jpg",
          url: "https://www.finewinedelivery.co.nz"
        },
        {
          name: "2017 Frescobaldi Castiglioni Chianti DOCG",
          price: 32.9,
          img:
            "https://www.finewinedelivery.co.nz/content/products/original/30622~1556078210.jpg",
          url: "https://www.finewinedelivery.co.nz"
        }
      ]
    }
  }
];
