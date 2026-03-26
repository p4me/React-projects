import React, { useEffect, useState } from 'react'

const fetchData = async () => {
    const data = await fetch('https://dummyjson.com/products', { method: 'GET' });
    const finalData = await data.json();
    return finalData;
}

const ReviewTable = () => {
    const [products, setProducts] = useState([]);
    const [expanded, setExpanded] = useState({});

    useEffect(() => {
        fetchData()
            .then((result) => setProducts(result.products))
            .catch((err) => console.error(err));
    }, [])

    const toggleExpand = (id) => {
        setExpanded(prev => ({ ...prev, [id]: !prev[id] }));
    }

    // Derive review column headers dynamically from the first available review
    const reviewKeys = products.length && products[0].reviews.length
        ? Object.keys(products[0].reviews[0])
        : [];
        // console.log(reviewKeys);

    return (
        <div style={{ padding: '16px' }}>
            <table border="1" style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                    <tr style={{ background: '#f0f0f0' }}>
                        <th>ID</th>
                        <th>Title</th>
                        <th>Brand</th>
                        <th>Price</th>
                        <th>Reviews</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product) => (
                        <React.Fragment key={product.id}>
                            {/* Outer row: one per product */}
                            <tr>
                                <td>{product.id}</td>
                                <td>{product.title}</td>
                                <td>{product.brand ?? '—'}</td>
                                <td>${product.price}</td>
                                <td>
                                    <button onClick={() => toggleExpand(product.id)}>
                                        {expanded[product.id] ? 'Hide' : 'Show'} ({product.reviews.length})
                                    </button>
                                </td>
                            </tr>

                            {/* Nested row: reviews table, shown when expanded */}
                            {expanded[product.id] && (
                                <tr>
                                    <td colSpan="5" style={{ background: '#fafafa', paddingLeft: '32px' }}>
                                        <table border="1" style={{ width: '100%', borderCollapse: 'collapse' }}>
                                            <thead>
                                                <tr style={{ background: '#e0e0e0' }}>
                                                    {reviewKeys.map(key => (
                                                        <th key={key}>{key}</th>
                                                    ))}
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {product.reviews.map((review, idx) => (
                                                    <tr key={idx}>
                                                        {reviewKeys.map(key => (
                                                            <td key={key}>{review[key]}</td>
                                                        ))}
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </td>
                                </tr>
                            )}
                        </React.Fragment>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default ReviewTable
