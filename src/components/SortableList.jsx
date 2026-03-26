import { useState } from "react"

const ITEMS = [
    { id: 1, name: 'Banana' },
    { id: 2, name: 'Apple' },
    { id: 3, name: 'Mango' },
    { id: 4, name: 'Cherry' },
    { id: 5, name: 'Grapes' },
    { id: 6, name: 'Orange' },
]

const SortableList = () => {
    const [filterText, setFilterText] = useState('');
    const [sortOrder, setSortOrder] = useState('asc'); // 'asc' | 'desc'

    // Step 1: filter
    const filtered = ITEMS.filter(item =>
        item.name.toLowerCase().includes(filterText.toLowerCase())
    );

    // Step 2: sort the filtered result
    const sorted = [...filtered].sort((a, b) => {
        if (sortOrder === 'asc') return a.name.localeCompare(b.name);
        return b.name.localeCompare(a.name);
    });

    const toggleSort = () => {
        setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc');
    }

    return (
        <div style={styles.wrapper}>
            <h3>Sortable & Filterable List</h3>

            <div style={styles.controls}>
                <input
                    type="text"
                    placeholder="Filter fruits..."
                    value={filterText}
                    onChange={(e) => setFilterText(e.target.value)}
                    style={styles.filterInput}
                />
                <button onClick={toggleSort} style={styles.sortBtn}>
                    Sort: {sortOrder === 'asc' ? 'A → Z' : 'Z → A'}
                </button>
            </div>

            <ul style={styles.list}>
                {sorted.map((item) => (
                    // ✅ key=item.id (stable unique ID, NOT index)
                    // This is what prevents input values from scrambling on reorder
                    <li key={item.id} style={styles.listItem}>
                        <span style={styles.name}>{item.name}</span>
                        <input
                            type="text"
                            placeholder="Type a note..."
                            style={styles.noteInput}
                        />
                    </li>
                ))}
            </ul>

            {sorted.length === 0 && (
                <p style={{ color: '#999' }}>No results found.</p>
            )}
        </div>
    )
}

const styles = {
    wrapper: { padding: '24px', maxWidth: '500px', marginTop: '24px' },
    controls: { display: 'flex', gap: '12px', marginBottom: '16px' },
    filterInput: { flex: 1, padding: '8px', fontSize: '14px', borderRadius: '4px', border: '1px solid #ccc' },
    sortBtn: { padding: '8px 16px', cursor: 'pointer', borderRadius: '4px', border: '1px solid #999' },
    list: { listStyle: 'none', padding: 0, margin: 0 },
    listItem: { display: 'flex', alignItems: 'center', gap: '12px', padding: '8px 0', borderBottom: '1px solid #eee' },
    name: { width: '80px', fontWeight: 'bold' },
    noteInput: { flex: 1, padding: '6px', borderRadius: '4px', border: '1px solid #ddd' },
}

export default SortableList
