import React, { useState, useEffect } from "react";
import { Button, TextField, Table, TableHead, TableBody, TableRow, TableCell, AppBar, Toolbar, Typography, Container, IconButton } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import axios from "axios";
import '../assets/css/Dashboard.css';
import { useNavigate } from "react-router-dom";

const Dashboard = () => {

    

    const [tickets, setTickets] = useState([]);
    const [filters, setFilters] = useState({
        date: "",
        station: "",
        status: "",
        searchQuery: "",
    });

    useEffect(() => {
        fetchTickets();
    }, []);

    const fetchTickets = async () => {
        const res = await axios.get("/api/tickets");
        setTickets(res.data);
    };

    const handleDelete = async (id) => {
        await axios.delete(`/api/tickets/${id}`);
        fetchTickets();
    };

    const handleAddTicket = () => {
        console.log("Add new ticket");
    };

    const [username, setUsername] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const storedUsername = localStorage.getItem('username');
        if (storedUsername) {
            setUsername(storedUsername);
        } else {
            // ถ้าไม่มีชื่อผู้ใช้ใน Local Storage ให้กลับไปที่หน้าล็อกอิน
            navigate('/');
        }
    }, [navigate]);


    const handleLogout = () => {
        localStorage.removeItem('username');  // ลบข้อมูลผู้ใช้จาก Local Storage
        navigate('/');  // เปลี่ยนไปที่หน้าล็อกอิน
    };

    
    return (
        <>
            {/* Navbar */}
            <AppBar position="static" className="navbar" sx={{ backgroundColor: '#066fd7', fontFamily: '"Roboto", sans-serif', fontweight: "bold" }}>
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1, }}>
                        SMART TICKET
                    </Typography>
                    <Typography variant="body1" component="div" className="username">
                        {username ? `ชื่อผู้ใช้: ${username}` : ''}
                    </Typography>
                    <Button color="inherit" onClick={handleLogout}>ออกจากระบบ</Button>
                </Toolbar>
            </AppBar>


            {/* Main Content */}
            <Container className="container">
                <div className="form-filters">
                    <TextField
                        label="วันที่ออก"
                        type="date"
                        InputLabelProps={{ shrink: true }}
                        value={filters.date}
                        onChange={(e) => setFilters({ ...filters, date: e.target.value })}
                    />
                    <TextField
                        label="สถานะใบสั่ง"
                        value={filters.status}
                        onChange={(e) => setFilters({ ...filters, status: e.target.value })}
                    />
                    <TextField
                        label="ค้นหารายการ"
                        value={filters.searchQuery}
                        onChange={(e) => setFilters({ ...filters, searchQuery: e.target.value })}
                    />
                    <Button variant="contained" onClick={fetchTickets}>ค้นหา</Button>
                </div>

                {/* Add Button */}
                <div className="add-button">
                    <Button variant="contained" color="primary" onClick={handleAddTicket}>
                        <AddIcon /> เพิ่ม
                    </Button>
                </div>

                {/* Ticket Table */}
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>หมายเลขใบสั่ง</TableCell>
                            <TableCell>เลขบัตรประชาชน</TableCell>
                            <TableCell>ผู้ขับขี่</TableCell>
                            <TableCell>วันออก</TableCell>
                            <TableCell>สถานะ</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {tickets.map((ticket) => (
                            <TableRow key={ticket._id}>
                                <TableCell>{ticket.ticketNumber}</TableCell>
                                <TableCell>{ticket.idCardNumber}</TableCell>
                                <TableCell>{ticket.driverName}</TableCell>
                                <TableCell>{ticket.issueDate}</TableCell>
                                <TableCell>{ticket.status}</TableCell>
                                <TableCell>
                                    <Button variant="contained" color="primary" style={{ marginRight: "10px" }}>
                                        Edit
                                    </Button>
                                    {/* <Button variant="contained" color="secondary" onClick={() => handleDelete(ticket._id)}>
                                        Delete
                                    </Button> */}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Container>
        </>
    );
};

export default Dashboard;
