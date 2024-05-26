import React, { useEffect, useState } from 'react';
import "./Pagination.css"

const Pagination = () => {
    const [data, setData] = useState([]);
    const [currPage, setCurrPage] = useState(1);
    const [itemsPerPage] = useState(10);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json');
                if (!response.ok) {
                    alert("Failed to fetch data");
                }
                const result = await response.json();
                setData(result);
                setLoading(false);
            } catch (error) {
                setLoading(false);
                alert("Failed to fetch data");
            }
        };

        fetchData();
    }, []);

    const indexOfLastItem = currPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(data.length / itemsPerPage);

    const handleNext = () => {
        if (currPage < totalPages) {
            setCurrPage(currPage + 1);
        }
    };

    const handlePrevious = () => {
        if (currPage > 1) {
            setCurrPage(currPage - 1);
        }
    };


    return (
        <div className='container'>
            <h1>Employee Data Table</h1>
            {loading && <p>Loading...</p>}
            {!loading && (
                <div className='tableContainer'>
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Role</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentItems.map((item) => (
                                <tr key={item.id}>
                                    <td>{item.id}</td>
                                    <td>{item.name}</td>
                                    <td>{item.email}</td>
                                    <td>{item.role}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="pagination">
                        <button onClick={handlePrevious} disabled={currPage === 1}>
                            Previous
                        </button>
                        <span>{currPage}</span>
                        <button onClick={handleNext} disabled={currPage === totalPages}>
                            Next
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Pagination;
