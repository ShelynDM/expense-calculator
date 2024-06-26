import { useState, useEffect } from "react";


export default function RandomQuotes() {
    const [quote, setQuote] = useState("");
    const [author, setAuthor] = useState("");

    // Function to fetch a random quote
    const fetchQuote = async () => {
        const response = await fetch("https://api.quotable.io/random");
        const data = await response.json();

        setQuote(data.content);
        setAuthor(data.author);
    
    };

    // Fetch a random quote when the component mounts
    useEffect(() => {
        fetchQuote();
    }, []);

    return(
        <div className="m-4 text-center italic">
                <p className="text-sm">{quote}</p>
                <p className="text-xs"> - {author}</p>
        </div>
    );
}
