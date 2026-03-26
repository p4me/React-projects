import { useState, useEffect } from "react"

const LiveSearch = () => {
    const [query, setQuery]     = useState('');
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError]     = useState('');

    // useEffect runs after every render where `query` changed.
    // The dependency array [query] means: "re-run this effect only when query changes".
    useEffect(() => {

        // If the user clears the input, reset everything and stop — no fetch needed.
        if (!query.trim()) {
            setResults([]);
            setError('');
            return;
        }

        // ── AbortController ────────────────────────────────────────────────────
        // This is a browser API that lets us cancel an in-flight fetch request.
        // We create a new controller for every effect run (every keystroke after debounce).
        // Why: if the user types "ap" then quickly types "app", we don't want the
        // "ap" response to overwrite the "app" response if it arrives late.
        const controller = new AbortController();

        // ── Debounce timer ─────────────────────────────────────────────────────
        // We wait 500ms before actually fetching.
        // Why: if the user is still typing we don't want to fire a request for
        // every single character — only when they pause for 500ms.
        const timerId = setTimeout(async () => {
            setLoading(true);
            setError('');

            try {
                // Pass controller.signal to fetch — this links the request to our controller.
                // If controller.abort() is called, this fetch will throw an AbortError.
                const res = await fetch(
                    `https://dummyjson.com/products/search?q=${query}&limit=8`,
                    { signal: controller.signal }
                );

                const data = await res.json();
                setResults(data.products || []);
            } catch (err) {
                // When fetch is aborted it throws an error with name 'AbortError'.
                // We ignore that — it just means the user typed again and we cancelled on purpose.
                // Any other error (network failure etc.) we show to the user.
                if (err.name !== 'AbortError') {
                    setError('Something went wrong. Please try again.');
                }
            } finally {
                // Only mark loading=false if the request wasn't aborted.
                // If it was aborted, the next effect run will handle loading state.
                if (!controller.signal.aborted) {
                    setLoading(false);
                }
            }
        }, 500);

        // ── Cleanup function ────────────────────────────────────────────────────
        // React calls this cleanup function:
        //   (a) Before running the effect again (user typed a new character)
        //   (b) When the component unmounts from the page entirely
        //
        // What we clean up:
        //   1. clearTimeout → cancel the debounce timer so the old fetch never starts
        //   2. controller.abort() → cancel any in-flight fetch so it doesn't update
        //      state after the component is gone (which causes a React warning)
        return () => {
            clearTimeout(timerId);   // cancel pending debounce
            controller.abort();      // cancel in-flight fetch
        };

    }, [query]); // only re-run when query changes

    return (
        <div style={styles.wrapper}>
            <h2>Live Search</h2>
            <p style={styles.hint}>Search products — fetches from API with 500ms debounce</p>

            <input
                type="text"
                placeholder="Type to search products..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                style={styles.input}
            />

            {/* Loading state */}
            {loading && <p style={styles.status}>Searching...</p>}

            {/* Error state */}
            {error && <p style={styles.error}>{error}</p>}

            {/* Empty state — only show after user typed something and got no results */}
            {!loading && !error && query && results.length === 0 && (
                <p style={styles.status}>No results for "{query}"</p>
            )}

            {/* Results */}
            <ul style={styles.list}>
                {results.map(product => (
                    // key=product.id (stable ID, not index) so React tracks items correctly
                    <li key={product.id} style={styles.item}>
                        <strong>{product.title}</strong>
                        <span style={styles.meta}>
                            ${product.price} · ⭐ {product.rating}
                        </span>
                    </li>
                ))}
            </ul>
        </div>
    )
}

const styles = {
    wrapper: { padding: '24px', maxWidth: '500px' },
    hint:    { color: '#888', fontSize: '13px', marginTop: 0 },
    input:   { width: '100%', padding: '10px', fontSize: '15px', borderRadius: '4px', border: '1px solid #ccc', boxSizing: 'border-box' },
    status:  { color: '#888', fontStyle: 'italic', marginTop: '12px' },
    error:   { color: 'red', marginTop: '12px' },
    list:    { listStyle: 'none', padding: 0, marginTop: '16px' },
    item:    { display: 'flex', justifyContent: 'space-between', padding: '10px', borderBottom: '1px solid #eee' },
    meta:    { color: '#888', fontSize: '13px' },
}

export default LiveSearch
