import { useState } from "react"

const INITIAL_CONTACTS = [
    { id: 1, name: 'Alice Johnson', email: 'alice@example.com', phone: '111-111-1111' },
    { id: 2, name: 'Bob Smith',     email: 'bob@example.com',   phone: '222-222-2222' },
    { id: 3, name: 'Carol White',   email: 'carol@example.com', phone: '333-333-3333' },
]

const EMPTY_FORM = { name: '', email: '', phone: '' }

const ContactManager = () => {
    const [contacts, setContacts]     = useState(INITIAL_CONTACTS);
    const [filterText, setFilterText] = useState('');
    const [sortOrder, setSortOrder]   = useState('asc');
    const [form, setForm]             = useState(EMPTY_FORM);
    const [editingId, setEditingId]   = useState(null);  // null = adding, number = editing
    const [error, setError]           = useState('');

    // ---------- derived data ----------
    const filtered = contacts
        .filter(c =>
            c.name.toLowerCase().includes(filterText.toLowerCase()) ||
            c.email.toLowerCase().includes(filterText.toLowerCase())
        )
        .sort((a, b) =>
            sortOrder === 'asc'
                ? a.name.localeCompare(b.name)
                : b.name.localeCompare(a.name)
        );

    // ---------- form handlers ----------
    const handleFormChange = (e) => {
        setError('');
        setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        // validation
        if (!form.name.trim() || !form.email.trim()) {
            setError('Name and Email are required.');
            return;
        }

        if (editingId !== null) {
            // EDIT — replace the matching contact
            setContacts(prev =>
                prev.map(c => c.id === editingId ? { ...c, ...form } : c)
            );
        } else {
            // ADD — create new contact with a unique id
            setContacts(prev => [...prev, { id: Date.now(), ...form }]);
        }

        setForm(EMPTY_FORM);
        setEditingId(null);
    }

    const handleEdit = (contact) => {
        setEditingId(contact.id);
        setForm({ name: contact.name, email: contact.email, phone: contact.phone });
        setError('');
    }

    const handleDelete = (id) => {
        setContacts(prev => prev.filter(c => c.id !== id));
        // if we were editing the deleted contact, reset the form
        if (editingId === id) {
            setForm(EMPTY_FORM);
            setEditingId(null);
        }
    }

    const handleCancel = () => {
        setForm(EMPTY_FORM);
        setEditingId(null);
        setError('');
    }

    // ---------- render ----------
    return (
        <div style={styles.wrapper}>
            <h2>Contact Manager</h2>

            {/* ---- Form ---- */}
            <form onSubmit={handleSubmit} style={styles.form}>
                <h4 style={{ margin: '0 0 12px' }}>
                    {editingId !== null ? 'Edit Contact' : 'Add Contact'}
                </h4>

                <input
                    name="name"
                    placeholder="Name *"
                    value={form.name}
                    onChange={handleFormChange}
                    style={styles.input}
                />
                <input
                    name="email"
                    placeholder="Email *"
                    value={form.email}
                    onChange={handleFormChange}
                    style={styles.input}
                />
                <input
                    name="phone"
                    placeholder="Phone"
                    value={form.phone}
                    onChange={handleFormChange}
                    style={styles.input}
                />

                {/* error state */}
                {error && <p style={styles.error}>{error}</p>}

                <div style={{ display: 'flex', gap: '8px' }}>
                    <button type="submit" style={styles.btnPrimary}>
                        {editingId !== null ? 'Update' : 'Add Contact'}
                    </button>
                    {editingId !== null && (
                        <button type="button" onClick={handleCancel} style={styles.btnSecondary}>
                            Cancel
                        </button>
                    )}
                </div>
            </form>

            {/* ---- Search + Sort ---- */}
            <div style={styles.controls}>
                <input
                    type="text"
                    placeholder="Search by name or email..."
                    value={filterText}
                    onChange={(e) => setFilterText(e.target.value)}
                    style={{ ...styles.input, flex: 1 }}
                />
                <button onClick={() => setSortOrder(p => p === 'asc' ? 'desc' : 'asc')} style={styles.btnSecondary}>
                    Sort: {sortOrder === 'asc' ? 'A → Z' : 'Z → A'}
                </button>
            </div>

            {/* ---- List states ---- */}
            {contacts.length === 0 ? (
                // empty state
                <p style={styles.emptyMsg}>No contacts yet. Add one above!</p>
            ) : filtered.length === 0 ? (
                // no search results
                <p style={styles.emptyMsg}>No contacts match "{filterText}".</p>
            ) : (
                <table style={styles.table}>
                    <thead>
                        <tr style={{ background: '#f0f0f0' }}>
                            <th style={styles.th}>Name</th>
                            <th style={styles.th}>Email</th>
                            <th style={styles.th}>Phone</th>
                            <th style={styles.th}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filtered.map(contact => (
                            <tr
                                key={contact.id}
                                style={editingId === contact.id ? styles.editingRow : {}}
                            >
                                <td style={styles.td}>{contact.name}</td>
                                <td style={styles.td}>{contact.email}</td>
                                <td style={styles.td}>{contact.phone || '—'}</td>
                                <td style={styles.td}>
                                    <button onClick={() => handleEdit(contact)} style={styles.btnEdit}>Edit</button>
                                    <button onClick={() => handleDelete(contact.id)} style={styles.btnDelete}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}

            <p style={styles.count}>Total: {contacts.length} contact(s)</p>
        </div>
    )
}

const styles = {
    wrapper:     { padding: '24px', maxWidth: '700px' },
    form:        { background: '#f9f9f9', padding: '16px', borderRadius: '8px', marginBottom: '20px', display: 'flex', flexDirection: 'column', gap: '10px' },
    controls:    { display: 'flex', gap: '12px', marginBottom: '16px', alignItems: 'center' },
    input:       { padding: '8px', fontSize: '14px', borderRadius: '4px', border: '1px solid #ccc', width: '100%', boxSizing: 'border-box' },
    btnPrimary:  { padding: '8px 16px', background: '#0070f3', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' },
    btnSecondary:{ padding: '8px 16px', background: '#fff', border: '1px solid #999', borderRadius: '4px', cursor: 'pointer' },
    btnEdit:     { marginRight: '6px', padding: '4px 10px', cursor: 'pointer', borderRadius: '4px', border: '1px solid #0070f3', color: '#0070f3', background: 'none' },
    btnDelete:   { padding: '4px 10px', cursor: 'pointer', borderRadius: '4px', border: '1px solid #e00', color: '#e00', background: 'none' },
    table:       { width: '100%', borderCollapse: 'collapse' },
    th:          { padding: '10px', textAlign: 'left', borderBottom: '2px solid #ddd' },
    td:          { padding: '10px', borderBottom: '1px solid #eee' },
    editingRow:  { background: '#fff8e1' },
    error:       { color: 'red', margin: 0, fontSize: '13px' },
    emptyMsg:    { color: '#888', fontStyle: 'italic' },
    count:       { marginTop: '12px', color: '#888', fontSize: '13px' },
}

export default ContactManager
