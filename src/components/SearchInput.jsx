import { useState } from "react"

const SearchInput = () => {
    const [inputValue, setInputValue] = useState('');   // what user types (instant)
    const [searchTerm, setSearchTerm] = useState('');   // debounced value (delayed)
    const [timerId, setTimerId] = useState(null);

    // onChange fires on every keystroke
    const handleChange = (e) => {
        const value = e.target.value;
        setInputValue(value);  // update input instantly so user sees what they type

        // cancel the previous timer — debounce logic
        clearTimeout(timerId);

        // start a new timer — only fires if user stops typing for 500ms
        const id = setTimeout(() => {
            setSearchTerm(value);  // this is the "actual search"
        }, 500);

        setTimerId(id);
    }

    // onKeyDown fires on every key press — we check if it's Escape
    const handleKeyDown = (e) => {
        if (e.key === 'Escape') {
            clearSearch();
        }
    }

    const clearSearch = () => {
        clearTimeout(timerId);
        setInputValue('');
        setSearchTerm('');
    }

    return (
        <div style={styles.wrapper}>

            <div style={styles.inputRow}>
                <input
                    type="text"
                    placeholder="Search... (Esc to clear)"
                    value={inputValue}
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                    style={styles.input}
                />
                {/* Clear button — only shows when there is something typed */}
                {inputValue && (
                    <button onClick={clearSearch} style={styles.clearBtn}>✕</button>
                )}
            </div>

            {/* Shows what the debounced search term currently is */}
            <p style={styles.status}>
                {searchTerm
                    ? <>Searching for: <strong>{searchTerm}</strong></>
                    : 'Type something to search...'
                }
            </p>

        </div>
    )
}

const styles = {
    wrapper: { padding: '24px', maxWidth: '400px' },
    inputRow: { display: 'flex', alignItems: 'center', gap: '8px' },
    input: { padding: '8px 12px', fontSize: '16px', flex: 1, borderRadius: '4px', border: '1px solid #ccc' },
    clearBtn: { padding: '8px', cursor: 'pointer', background: 'none', border: 'none', fontSize: '16px' },
    status: { marginTop: '12px', color: '#555' },
}

export default SearchInput
