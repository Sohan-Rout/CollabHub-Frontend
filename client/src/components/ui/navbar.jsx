"use client";
import React, { useState, useEffect } from "react";
import { Button } from "./button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "./tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "./input";
import { useRouter } from 'next/navigation';

const Navbar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [creatorData, setCreatorData] = useState({ name: "", email: "", age: "", password: "" });
  const [brandData, setBrandData] = useState({ brandName: "", email: "", password: "" });
  const [message, setMessage] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userType, setUserType] = useState(null); // 'creator' or 'brand'
  const router = useRouter();

  useEffect(() => {
    // Check if user is authenticated on component mount
    const creatorId = localStorage.getItem("creatorId");
    const brandId = localStorage.getItem("brandId");

    if (creatorId) {
      setIsAuthenticated(true);
      setUserType('creator');
    } else if (brandId) {
      setIsAuthenticated(true);
      setUserType('brand');
    }
  }, []);

  const handleSignInClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleCreatorSubmit = async () => {
    try {
      const response = await fetch("http://localhost:3030/creatorAuth/creator/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(creatorData),
      });
      const data = await response.json();
      setMessage(data.message);
      localStorage.setItem("creatorId", data.id);
      setIsAuthenticated(true);
      setUserType('creator');
      setIsModalOpen(false);
      router.push("/creator");
      
    } catch (error) {
      setMessage("Failed to register creator.");
    }
  };

  const handleBrandSubmit = async () => {
    try {
      const response = await fetch("http://localhost:3030/brandAuth/brand/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(brandData),
      });
      const data = await response.json();
      setMessage(data.message);
      localStorage.setItem("brandId", data.id);
      setIsAuthenticated(true);
      setUserType('brand');
    } catch (error) {
      setMessage("Failed to register brand.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("creatorId");
    localStorage.removeItem("brandId");
    setIsAuthenticated(false);
    setUserType(null);
    router.push("/");
  };

  return (
    <div>
      <nav className="bg-white shadow-md p-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex-shrink-0 flex items-center">
            <a href="#" className="text-3xl font-bold text-gray-800">
              Collab<span className="text-amber-500">Hub</span>
            </a>
          </div>

          <div className="hidden md:flex space-x-8 items-center">
            <a href="#Home" className="text-gray-800 text-l font-semibold hover:text-amber-500">
              Home
            </a>
            <a href="#HowItWorks" className="text-gray-800 text-l font-semibold hover:text-amber-500">
              How It Works
            </a>
            <a href="#AboutUs" className="text-gray-800 text-l font-semibold hover:text-amber-500">
              About Us
            </a>
            <a href="#Testonomials" className="text-gray-800 text-l font-semibold hover:text-amber-500">
              Testimonials
            </a>
            <a href="#Faqs" className="text-gray-800 text-l font-semibold hover:text-amber-500">
              FAQs
            </a>
          </div>

          <div className="space-x-4">
            {!isAuthenticated ? (
              <>
                <Button
                  variant="outline"
                  className="border-amber-500 border-[2px] hover:bg-amber-500 hover:text-black duration-300"
                >
                  Sign Up
                </Button>
                <Button
                  className="bg-amber-500 text-black px-4 py-2 rounded hover:bg-amber-600"
                  onClick={handleSignInClick}
                >
                  Sign In
                </Button>
              </>
            ) : (
              <Button
                className="bg-amber-500 text-black px-4 py-2 rounded hover:bg-amber-600"
                onClick={handleLogout}
              >
                Logout
              </Button>
            )}
          </div>
        </div>
      </nav>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-20" onClick={handleCloseModal}>
          <div className="bg-white p-6 rounded-lg font-poppins shadow-lg w-[450px]" onClick={(e) => e.stopPropagation()}>
            <h2 className="text-xl font-bold mb-4">Sign <span className="text-amber-500">In</span></h2>
            <Tabs defaultValue="account" className="w-full">
              <TabsList className="grid w-full grid-cols-2 bg-amber-500 text-gray-800 font-poppins">
                <TabsTrigger value="account">SignUp as Creator</TabsTrigger>
                <TabsTrigger value="brand">SignUp as Brand</TabsTrigger>
              </TabsList>
              <TabsContent value="account">
                <Card>
                  <CardHeader>
                    <CardTitle>Content-Creator Profile</CardTitle>
                    <CardDescription>Click save when you're done.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Input id="name" placeholder="Name" onChange={(e) => setCreatorData({ ...creatorData, name: e.target.value })} />
                    <Input id="email" placeholder="Email" onChange={(e) => setCreatorData({ ...creatorData, email: e.target.value })} />
                    <Input id="age" placeholder="Age" onChange={(e) => setCreatorData({ ...creatorData, age: e.target.value })} />
                    <Input id="password" placeholder="Password" onChange={(e) => setCreatorData({ ...creatorData, password: e.target.value })} />
                  </CardContent>
                  <CardFooter>
                    <Button className="font-poppins" onClick={handleCreatorSubmit}>Save <span className="text-amber-500">Changes</span></Button>
                  </CardFooter>
                </Card>
              </TabsContent>

              <TabsContent value="brand">
                <Card>
                  <CardHeader>
                    <CardTitle>Brand Profile</CardTitle>
                    <CardDescription>Fill your brand details.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Input id="brandName" placeholder="Brand Name" onChange={(e) => setBrandData({ ...brandData, brandName: e.target.value })} />
                    <Input id="email" placeholder="Email" onChange={(e) => setBrandData({ ...brandData, email: e.target.value })} />
                    <Input id="password" placeholder="Password" onChange={(e) => setBrandData({ ...brandData, password: e.target.value })} />
                  </CardContent>
                  <CardFooter>
                    <Button className="font-poppins" onClick={handleBrandSubmit}>Save <span className="text-amber-500">Changes</span></Button>
                  </CardFooter>
                </Card>
              </TabsContent>
            </Tabs>
            {message && <p className="mt-4 text-center text-green-500 font-poppins">{message}</p>}
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;