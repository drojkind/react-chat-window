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
        { text: "Full Fruit" },
        { text: "Extended Fruit" }
      ]
    }
  },
  { type: "carousel", author: "them", data: { emoji: "😋" } }
];