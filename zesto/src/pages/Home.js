import { useEffect, useState } from 'react';
import './Home.css';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { Link } from 'react-router-dom';
import axios from 'axios';

function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
        </div>
    );
}

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}


function Home() {
    const [scrollDirection, setScrollDirection] = useState("up");

    useEffect(() => {

        const metaTag = document.querySelector('meta[name="theme-color"]');
        if (metaTag) {
            metaTag.setAttribute('content', '#005EB8');
        }

        let lastScrollY = window.scrollY;

        const handleScroll = () => {
            if (window.scrollY > lastScrollY) {
                setScrollDirection("down"); // Scrolling down
            } else {
                setScrollDirection("up"); // Scrolling up
            }
            lastScrollY = window.scrollY;
        };

        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };


    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);

    const fetchCategories = async () => {
        const response = await axios.get(process.env.REACT_APP_URL+'api/categories');
        setCategories(response.data);
    };

    const fetchProducts = async () => {
        const response = await axios.get(`${process.env.REACT_APP_URL}api/products`);
        setProducts(response.data);
    };

    useEffect(() => {
        fetchCategories();
        fetchProducts();
    }, []);

    const fetchProductsById = async (id) => {
        const response = await axios.get(`${process.env.REACT_APP_URL}api/products/${id}`);
        setProducts(response.data);
    };

    return (
        <div className="Home">
            <div
                className={`Navbar ${scrollDirection === "down" ? "hidden" : ""}`}
                style={{ top: scrollDirection === "down" ? "-50px" : "0px" }}
            >

                <div className="logo">Zesto</div>
                <div className="inputbox">

                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                    </svg>


                    <input type="text" placeholder="Search here" />
                </div>
            </div>

            <Box sx={{ width: '100%', marginTop: '135px' }}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs value={value} onChange={handleChange} aria-label="basic tabs example"
                        variant="scrollable"
                        scrollButtons="auto">
                        <Tab onClick={() => fetchProducts()} label="All" {...a11yProps(0)} />
                        {categories.map((cat,index) => (
                            <Tab key={index} onClick={() => fetchProductsById(cat._id)} label={cat.name} {...a11yProps(cat._id)} />
                        ))}

                    </Tabs>
                </Box>


                {categories.map((cat, index) => (
                        <CustomTabPanel className="boxes" key={index} value={value} index={index}>
                            <div className="allproducts">
                                {products.map((pro,index) => (
                                    <Link key={index} to={"/view/"+pro._id} className="product">
                                        <img src="https://5.imimg.com/data5/SELLER/Default/2021/3/KM/HD/TW/41856382/tata-tmt-bars.jpg" alt="TMT Bars" />
                                        <div className="product-info">
                                            <div className="productname">{pro.name}</div>
                                            <div className="subtype">{pro.types.length === 0 ? categories.find((cat) => cat._id === pro.category).name : pro.types[0].typeName}</div>
                                            <div className="price">₹ {pro.basePrice.value}/ {pro.basePrice.unit}</div>
                                        </div>
                                    </Link>
                                ))}


                            </div>

                        </CustomTabPanel>


                ))}

            </Box>

        </div>
    );
}

export default Home;