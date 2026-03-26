const Modal = ({ title, isOpen, onClose, children }) => {

    if (!isOpen) return null;

    return (
        <div style={styles.overlay}>
            <div style={styles.box}>

                {/* Header */}
                <div style={styles.header}>
                    <h2 style={{ margin: 0 }}>{title}</h2>
                    <button onClick={onClose} style={styles.closeBtn}>✕</button>
                </div>

                {/* Body — whatever the parent passes between <Modal> tags */}
                <div style={styles.body}>
                    {children}
                </div>

                {/* Footer */}
                <div style={styles.footer}>
                    <button onClick={onClose}>Close</button>
                </div>

            </div>
        </div>
    )
}

const styles = {
    overlay: {
        position: 'fixed', inset: 0,
        background: 'rgba(0,0,0,0.5)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        zIndex: 1000,
    },
    box: {
        background: '#fff', borderRadius: '8px',
        width: '400px', padding: '24px',
        boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
    },
    header: {
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        marginBottom: '16px',
    },
    closeBtn: {
        background: 'none', border: 'none',
        fontSize: '18px', cursor: 'pointer',
    },
    body: {
        marginBottom: '16px',
    },
    footer: {
        display: 'flex', justifyContent: 'flex-end',
    },
}

export default Modal
