
/* var products = [
    { image:"images/laptop-png.jpg", name: "Brilliant Laptop", price: 400, rating: 4 },
    { image:"images/lens-1933639_960_720.png", name: "Fantastic Lens", price: 500, rating: 5 },
    { image:"images/television-png-tv-24.png", name: "Amazing TV", price: 600, rating: 3 },
    { image:"images/laptop-png.jpg", name: "Bad Laptop", price: 50, rating: 1 },
    { image:"images/television-png-tv-24.png", name: "Ordinary TV", price: 200, rating: 3 },
    { image:"images/galaxy-s8-bluebackground_af156096-96df-4adb-907b-c04681148472_grande.png", name: "Samsung Good Phone", price: 700, rating: 5 },
    { image:"images/Apple-iPhone-PNG-Transparent-Background.png", name: "iPhone 12", price: 700, rating: 5 },
    { image:"images/t551s_hd-1.png", name: "Curved TV", price: 1000, rating: 5 },
    { image:"images/t551s_hd-1.png", name: "Small TV", price: 400, rating: 2 },
    { image:"images/t551s_hd-1.png", name: "Smallest TV", price: 300, rating: 2 },
    { image:"images/Apple-iPhone-PNG-Transparent-Background.png", name: "iPhone 11", price: 600, rating: 4 },
    { image:"images/lens-1933639_960_720.png", name: "Camera Lens", price: 400, rating: 4 }
]; */


const express = require('express');
const route = express.Router();

route.get("/", function(req, res, next) {
    res.status(200).json(
        [
            { id:1, quantity: 1, image:"images/laptop-png.jpg", name: "Brilliant Laptop", price: 400, rating: 4 },
            { id:2, quantity: 1, image:"images/lens-1933639_960_720.png", name: "Fantastic Lens", price: 500, rating: 5 },
            { id:3, quantity: 1, image:"images/television-png-tv-24.png", name: "Amazing TV", price: 600, rating: 3 },
            { id:4, quantity: 1, image:"images/laptop-png.jpg", name: "Bad Laptop", price: 50, rating: 1 },
            { id:5, quantity: 1, image:"images/television-png-tv-24.png", name: "Ordinary TV", price: 200, rating: 3 },
            { id:6, quantity: 1, image:"images/galaxy-s8-bluebackground_af156096-96df-4adb-907b-c04681148472_grande.png", name: "Samsung Good Phone", price: 700, rating: 5 },
            { id:7, quantity: 1, image:"images/Apple-iPhone-PNG-Transparent-Background.png", name: "iPhone 12", price: 700, rating: 5 },
            { id:8, quantity: 1, image:"images/t551s_hd-1.png", name: "Curved TV", price: 1000, rating: 5 },
            { id:9, quantity: 1, image:"images/t551s_hd-1.png", name: "Small TV", price: 400, rating: 2 },
            { id:10, quantity: 1, image:"images/t551s_hd-1.png", name: "Smallest TV", price: 300, rating: 2 },
            { id:11, quantity: 1, image:"images/Apple-iPhone-PNG-Transparent-Background.png", name: "iPhone 11", price: 600, rating: 4 },
            { id:12, quantity: 1, image:"images/lens-1933639_960_720.png", name: "Camera Lens", price: 400, rating: 4 },
            { id:13, quantity: 1, image:"images/lens-1933639_960_720.png", name: "Fantastic Camera Lens", price: 800, rating: 5 },
            { id:14, quantity: 1, image:"images/laptop-png.jpg", name: "Brilliant Laptop 2", price: 450, rating: 2 },
            { id:15, quantity: 1, image:"images/lens-1933639_960_720.png", name: "Fantastic Lens 2", price: 550, rating: 4 },
            { id:16, quantity: 1, image:"images/television-png-tv-24.png", name: "Amazing TV 2", price: 650, rating: 2 },
            { id:17, quantity: 1, image:"images/laptop-png.jpg", name: "Bad Laptop 2", price: 40, rating: 2 },
            { id:18, quantity: 1, image:"images/television-png-tv-24.png", name: "Ordinary TV 2", price: 250, rating: 4 },
            { id:19, quantity: 1, image:"images/galaxy-s8-bluebackground_af156096-96df-4adb-907b-c04681148472_grande.png", name: "Samsung Good Phone 2", price: 750, rating: 4 },
            { id:20, quantity: 1, image:"images/Apple-iPhone-PNG-Transparent-Background.png", name: "iPhone 12 2", price: 750, rating: 4 },
            { id:21, quantity: 1, image:"images/t551s_hd-1.png", name: "Curved TV 2", price: 1050, rating: 3 },
            { id:22, quantity: 1, image:"images/t551s_hd-1.png", name: "Small TV 2", price: 450, rating: 3 },
            { id:23, quantity: 1, image:"images/t551s_hd-1.png", name: "Smallest TV 2", price: 350, rating: 1 },
            { id:24, quantity: 1, image:"images/Apple-iPhone-PNG-Transparent-Background.png", name: "iPhone 11 2", price: 650, rating: 5 },
            { id:25, quantity: 1, image:"images/lens-1933639_960_720.png", name: "Camera Lens 2", price: 450, rating: 3 },
            { id:26, quantity: 1, image:"images/lens-1933639_960_720.png", name: "Fantastic Camera Lens 2", price: 850, rating: 2 }   
        ]
    );
})

module.exports = route;
