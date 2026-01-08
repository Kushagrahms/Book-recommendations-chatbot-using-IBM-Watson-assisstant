"use client";
import { useEffect, useState } from "react";
import BookCard from "./components/BookCard";
export default function Home() {
  const [books, setBooks] = useState([]);

   useEffect(() => {
    async function fetchBooks() {
      const response = await fetch(
        "https://www.googleapis.com/books/v1/volumes?q=fiction"
      );
      const data = await response.json();

      const formattedBooks = data.items.slice(0, 12).map((item, index) => {
  const title = item.volumeInfo.title || "Unknown Title";
  const author = item.volumeInfo.authors?.[0] || "Unknown Author";

  const genres = ["fiction", "science", "romance", "self"];
  const genre = genres[index % genres.length];

  const priceTiers = [299, 399, 499, 699, 999, 1499];
  const price = priceTiers[index % priceTiers.length];

  return {
    title,
    author,
    image: item.volumeInfo.imageLinks?.thumbnail || null,
    price,
    genre, // ⭐ THIS is the key addition
  };
});


      setBooks(formattedBooks);
    }

    fetchBooks();
  }, []);

const [selectedCategory, setSelectedCategory] = useState(null);
const [priceFilter, setPriceFilter] = useState(null);
const [chatQuery, setChatQuery] = useState("");
const PRICE_TIERS = {
  cheap: 500,
  mid: 1000,
  expensive: 1500,
};

const filteredBooks = books.filter((book) => {
  // 💰 PRICE FILTER
  if (priceFilter === "cheap" && book.price > 500) {
    return false;
  }
  if (priceFilter === "mid" && (book.price <= 500 || book.price > 1000)) {
    return false;
  }
  if (priceFilter === "expensive" && book.price < 1000) {
    return false;
  }
  if (selectedCategory && book.genre !== selectedCategory) {
    return false;
  }
  return true;
});


function handleChatSubmit() {

    console.log("CHAT SUBMIT:", chatQuery);

  const query = chatQuery.toLowerCase();
setSelectedCategory(null);
  // PRICE INTENT
  if (query.includes("cheap") || query.includes("budget")) {
    setPriceFilter("cheap");
  } else if (query.includes("expensive") || query.includes("premium")) {
    setPriceFilter("expensive");
  }

  // GENRE / TOPIC INTENT
  if (query.includes("fiction")) {
  setSelectedCategory("fiction");
} else if (query.includes("science")) {
  setSelectedCategory("science");
} else if (query.includes("romance")) {
  setSelectedCategory("romance");
} else if (query.includes("motivation") || query.includes("self")) {
  setSelectedCategory("self");
}


  // CLEAR chat box (UX improvement)
  setChatQuery("");
}


  return (
    <main className="h-screen flex flex-col bg-white text-gray-900">
      
{/* Top Navigation Bar */}
<header className="h-16 flex items-center px-6
  bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600
  shadow-lg shadow-purple-500/30
">
  <div className="flex items-center gap-3">
    <div className="flex items-center gap-2">
  <span className="text-2xl drop-shadow-sm">
      📚 </span>
     <h1 className="text-xl font-bold text-white tracking-wide">
    BookScout
  </h1>
  </div>

  </div>

  <div className="ml-10 flex-1 max-w-lg">
    <input
      type="text"
      placeholder="Search for books..."
      className="w-full px-4 py-2 rounded-lg
        bg-white/90 text-gray-800
        placeholder-gray-500
        focus:outline-none focus:ring-2 focus:ring-white/70"
    />
  </div>
</header>


{/* Main Body */}
      <div className="flex flex-1 overflow-hidden">

{/* Sidebar */}
<aside className="w-64 p-4 overflow-y-auto">

  {/* CREAM FILTERS SECTION (ONE BLOCK) */}
  <div className="bg-[#FFF7ED] rounded-2xl shadow-md p-5">

    {/* Filters heading (NO separate box) */}
    <h2 className="font-semibold text-gray-800 mb-5">
      Filters
    </h2>

    {/* Category Filter */}
    <div className="mb-6">
      <h3 className="text-sm font-semibold mb-2 text-gray-700">
        Category
      </h3>

      <ul className="space-y-2 text-sm text-gray-700">
        <li>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              onChange={() => setSelectedCategory("fantasy")}
            />
            Fantasy
          </label>
        </li>

        <li>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              onChange={() => setSelectedCategory("science fiction")}
            />
            Science Fiction
          </label>
        </li>

        <li>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              onChange={() => setSelectedCategory("romance")}
            />
            Romance
          </label>
        </li>

        <li>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              onChange={() => setSelectedCategory("mystery")}
            />
            Mystery
          </label>
        </li>
      </ul>
    </div>

    {/* Soft divider between Category & Price */}
    <div className="my-4 h-px bg-orange-200/60" />

    {/* Price Filter */}
    <div>
      <h3 className="text-sm font-semibold mb-2 text-gray-700">
        Price
      </h3>

      <div className="space-y-2 text-sm text-gray-700">
        <label className="flex items-center gap-2">
          <input
            type="radio"
            name="price"
            onChange={() => setPriceFilter("cheap")}
          />
          Under Rs. 500
        </label>

        <label className="flex items-center gap-2">
          <input
            type="radio"
            name="price"
            onChange={() => setPriceFilter("mid")}
          />
          Rs. 500 – Rs. 1000
        </label>

        <label className="flex items-center gap-2">
          <input
            type="radio"
            name="price"
            onChange={() => setPriceFilter("expensive")}
          />
          Rs. 1000 – Rs. 3000
        </label>
      </div>
    </div>

  </div>

  {/* Chatbot (OUTSIDE cream section) */}
  <div className="mt-6 bg-gray-900 text-gray-100 rounded-xl shadow-md p-4">
    <h3 className="text-sm font-semibold mb-3 text-gray-200">
      🤖 Book Assistant
    </h3>

    <div className="bg-white rounded-lg p-3 h-40 overflow-y-auto text-sm text-gray-700 mb-3">
      <p className="mb-2">
        <strong>Bot:</strong> Hi! Tell me what kind of book you’re looking for 😊
      </p>
    </div>


{/* Chat input */}
  <form
  onSubmit={(e) => {
    e.preventDefault();
    handleChatSubmit();
  }}
>
  <input
    type="text"
    placeholder="Type your message..."
    value={chatQuery}
    onChange={(e) => setChatQuery(e.target.value)}
    className="w-full px-3 py-2 border rounded-lg"
  />
</form>


  </div>
       </aside>

{/* Main Content */}
<section className="flex-1 p-8 overflow-y-auto bg-[#FAF7F2]">
          <h2 className="text-2xl font-semibold mb-6 text-gray-800"> Recommended Books</h2>
          {/* Book Grid */}
  <div className="grid grid-cols-3 gap-6">
   {filteredBooks.map((book, index) => (
  <BookCard
    key={index}
    title={book.title}
    author={book.author}
    price={book.price}
    image={book.image}
  />
))}



    {/* Book Card */}
    <div className="grid grid-cols-4 gap-6">
  <BookCard
    title="The Silent Patient"
    author="Alex Michaelides"
    price="399"
  />

  <BookCard
    title="Atomic Habits"
    author="James Clear"
    price="499"
  />

  <BookCard
    title="Ikigai"
    author="Hector Garcia"
    price="299"
  />

  <BookCard
    title="The Alchemist"
    author="Paulo Coelho"
    price="350"
  />
</div>
</div>
      
        </section>

      </div>
    </main>
  );
}
