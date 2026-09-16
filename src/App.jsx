import { Link, Route, Routes, useParams } from "react-router-dom";

const quotes = [
  { id: 1, text: "First, solve the problem. Then, write the code.", author: "John Johnson" },
  { id: 2, text: "Programs must be written for people to read.", author: "Harold Abelson" },
];

function Home() {
  return (
    <main>
      <h1>QuoteBoard</h1>
      <p>Choose a quote to open its own page.</p>
      <div className="grid">
        {quotes.map((quote) => (
          <Link className="card" key={quote.id} to={`/quote/${quote.id}`}>
            <blockquote>“{quote.text}”</blockquote>
            <span>{quote.author}</span>
          </Link>
        ))}
      </div>
    </main>
  );
}

function Quote() {
  const { id } = useParams();
  const quote = quotes.find((item) => item.id === Number(id));
  if (!quote) return <main><h1>Quote not found</h1><Link to="/">Back home</Link></main>;
  return <main><Link to="/">← All quotes</Link><h1>Quote {quote.id}</h1><blockquote className="detail">“{quote.text}”</blockquote><p>{quote.author}</p></main>;
}

export default function App() {
  return <Routes><Route path="/" element={<Home />} /><Route path="/quote/:id" element={<Quote />} /></Routes>;
}
