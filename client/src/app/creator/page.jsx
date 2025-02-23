'use client';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "@heroicons/react/24/outline";
import { useState, useEffect } from "react"; // Add useEffect here
import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

// Import Swiper components and styles
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation, Autoplay } from "swiper/modules";

// Import Chart.js
import { Bar, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

export default function Page() {
  const [connectedPlatforms, setConnectedPlatforms] = useState([]);
  const [availableGigs, setAvailableGigs] = useState([]); // State to store available gigs
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const [selectedGig, setSelectedGig] = useState(null); // Store the selected gig
  const [applicationMessage, setApplicationMessage] = useState("");
  const [portfolioLink, setPortfolioLink] = useState("");
  const [socialMediaHandles, setSocialMediaHandles] = useState("");
  const [estimatedCompletionTime, setEstimatedCompletionTime] = useState("");
  const [applications, setApplications] = useState([]); // State to store applications

  // Fetch available gigs from the backend
  useEffect(() => {
    const fetchGigs = async () => {
      try {
        const response = await fetch("http://localhost:3030/gigs");
        if (response.ok) {
          const data = await response.json();
          setAvailableGigs(data.gigs); // Set the fetched gigs to state
        } else {
          console.error("Failed to fetch gigs");
        }
      } catch (error) {
        console.error("Error fetching gigs:", error);
      }
    };

    fetchGigs();
  }, []); // Fetch gigs on component mount

  // Fetch applications for the creator
  useEffect(() => {
    const fetchApplications = async () => {
      const creatorId = localStorage.getItem("creatorId"); // Retrieve the creator ID from localStorage
      try {
        const response = await fetch(`http://localhost:3030/applicationsGigs/${creatorId}`);
        if (response.ok) {
          const data = await response.json();
          setApplications(data.applications); // Set the fetched applications to state
        } else {
          console.error("Failed to fetch applications");
        }
      } catch (error) {
        console.error("Error fetching applications:", error);
      }
    };

    fetchApplications();
  }, []); // Fetch applications on component mount

  const openApplyModal = (gig) => {
    setSelectedGig(gig); // Store the selected gig
    setIsApplyModalOpen(true);
  };

  // Function to handle gig application
  const handleApply = async () => {
    if (!selectedGig) {
      alert("No gig selected");
      return;
    }

    const creatorId = localStorage.getItem("creatorId");

    try {
      const response = await fetch("http://localhost:3030/apply-gig", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          gigId: selectedGig.id,
          creatorId,
          message: applicationMessage,
          portfolioLink,
          socialMediaHandles,
          estimatedCompletionTime,
        }),
      });

      if (response.ok) {
        alert("Application submitted successfully!");
        setIsApplyModalOpen(false);
        setApplicationMessage(""); // Clear the message
        setPortfolioLink(""); // Clear the portfolio link
        setSocialMediaHandles(""); // Clear the social media handles
        setEstimatedCompletionTime(""); // Clear the estimated completion time
      } else {
        alert("Failed to submit application");
      }
    } catch (error) {
      console.error("Error submitting application:", error);
      alert("An error occurred while submitting the application.");
    }
  };

  // Function to handle platform connection
  const handleConnectPlatform = (platform) => {
    if (!connectedPlatforms.includes(platform)) {
      setConnectedPlatforms([...connectedPlatforms, platform]);
    }
    setIsModalOpen(false); // Close the modal after connecting
  };

  // Function to open the modal
  const openModal = () => {
    setIsModalOpen(true);
  };

  // Sample collaborations data
  const collaborations = [
    {
      brand: "Nike",
      contractPrice: "$5,000",
      task: "Create a 60-second video showcasing the new Nike Air Max shoes.",
      hashtags: ["#Nike", "#AirMax", "#JustDoIt"],
    },
    {
      brand: "Coca-Cola",
      contractPrice: "$3,500",
      task: "Post a reel featuring Coca-Cola's new summer campaign.",
      hashtags: ["#CocaCola", "#SummerVibes", "#ShareACoke"],
    },
    {
      brand: "Apple",
      contractPrice: "$7,000",
      task: "Create an unboxing video for the new iPhone 15.",
      hashtags: ["#Apple", "#iPhone15", "#Unboxing"],
    },
    {
      brand: "Adidas",
      contractPrice: "$4,500",
      task: "Create a post showcasing the new Adidas Ultraboost shoes.",
      hashtags: ["#Adidas", "#Ultraboost", "#RunWithIt"],
    },
    {
      brand: "Samsung",
      contractPrice: "$6,000",
      task: "Create a video review of the new Samsung Galaxy Z Fold.",
      hashtags: ["#Samsung", "#GalaxyZFold", "#UnfoldYourWorld"],
    },
  ];

  // Data for the Expense Tracker Chart
  const expenseData = {
    labels: ["Equipment", "Location", "Editing", "Miscellaneous"],
    datasets: [
      {
        label: "Cost ($)",
        data: [1200, 800, 500, 300], // Example costs
        backgroundColor: "rgba(99, 102, 241, 0.6)", // Purple color
        borderColor: "rgba(99, 102, 241, 1)",
        borderWidth: 1,
      },
    ],
  };

  // Data for the Earnings vs. Expenses Line Graph
  const earningsVsExpensesData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"], // Months
    datasets: [
      {
        label: "Earnings",
        data: [5000, 7000, 4500, 8000, 6000, 9000, 12000], // Example earnings
        borderColor: "rgba(99, 102, 241, 1)", // Purple color
        backgroundColor: "rgba(99, 102, 241, 0.2)",
        fill: true,
      },
      {
        label: "Expenses",
        data: [2000, 2500, 3000, 2200, 2800, 3500, 4000], // Example expenses
        borderColor: "rgba(255, 99, 132, 1)", // Red color
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        fill: true,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Earnings vs. Expenses",
      },
    },
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Main Content */}
      <div className="p-8">
        {/* Header with "Creator Dashboard" and "Add Accounts" button */}
        <div className="flex items-center justify-between mb-6 relative z-20">
          <h1 className="text-3xl font-bold font-poppins">Creator Dashboard</h1>
          <div className="flex items-center space-x-4">
            {/* Display connected platform icons */}
            {connectedPlatforms.map((platform) => (
              <div key={platform} className="text-2xl">
                {platform === "facebook" && (
                  <FaFacebook className="text-blue-600" />
                )}
                {platform === "instagram" && (
                  <FaInstagram className="text-pink-600" />
                )}
                {platform === "x" && <FaXTwitter className="text-blue-400" />}
              </div>
            ))}
            {/* Add Accounts Button */}
            <Button
              onClick={openModal}
              className="flex items-center space-x-2 bg-amber-500 hover:bg-amber-600"
            >
              <PlusIcon className="h-5 w-5" />
              <span className="font-poppins text-gray-800">Add Accounts</span>
            </Button>
          </div>
        </div>

        {/* Modal for Connecting Platforms */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center pb-15 z-30">
            <div className="bg-gray-100 rounded-2xl shadow-lg p-6 w-96">
              <h2 className="text-xl font-semibold mb-4">
                Connect <span className="text-amber-500">Social Media</span>
              </h2>
              <hr className="border-gray-800 my-4" />
              <div className="space-y-4">
                <Button
                  onClick={() => handleConnectPlatform("facebook")}
                  className="w-full flex items-center space-x-2 bg-blue-500 hover:bg-blue-700"
                >
                  <FaFacebook className="h-5 w-5" />
                  <span className="font-poppins">Connect Facebook</span>
                </Button>
                <Button
                  onClick={() => handleConnectPlatform("instagram")}
                  className="w-full flex items-center space-x-2 bg-pink-500 hover:bg-pink-600"
                >
                  <FaInstagram className="h-5 w-5" />
                  <span className="font-poppins">Connect Instagram</span>
                </Button>
                <Button
                  onClick={() => handleConnectPlatform("x")}
                  className="w-full flex items-center space-x-2 bg-gray-900 hover:bg-gray-800"
                >
                  <FaXTwitter className="h-5 w-5" />
                  <span className="font-poppins">Connect X</span>
                </Button>
              </div>
              <div className="pb-3"></div>
              <hr className="border-gray-800 my-4" />
              <div className="flex justify-center">
                <Button
                  onClick={() => setIsModalOpen(false)}
                  className="mt-4 w-50 items-center font-poppins bg-gray-900 hover:bg-gray-600"
                >
                  <span className="text-amber-500">Cancel</span>
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Full-Width Earnings Section */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-4 font-poppins">
            Earnings Overview
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Total Earnings */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold">Total Earnings</h3>
              <p className="text-2xl font-bold mt-2">$12,345</p>
              <p className="text-sm text-gray-500">Lifetime earnings</p>
            </div>
            {/* This Month */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold">This Month</h3>
              <p className="text-2xl font-bold mt-2">$2,345</p>
              <p className="text-sm text-gray-500">Earnings in October</p>
            </div>

            {/* Pending Payouts */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold">Pending Payouts</h3>
              <p className="text-2xl font-bold mt-2">$1,230</p>
              <p className="text-sm text-gray-500">Awaiting clearance</p>
              <div className="mt-2 bg-gray-200 rounded-full h-2">
                <div
                  className="bg-purple-500 rounded-full h-2"
                  style={{ width: "60%" }}
                ></div>
              </div>
            </div>
          </div>

          {/* Earnings vs. Expenses Graph and Expense Tracker Card */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Earnings vs. Expenses Graph */}
            <div>
              <h3 className="text-xl font-semibold mb-4 font-poppins">
                Earnings vs. Expenses
              </h3>
              <div className="h-96 bg-gray-50 p-4 rounded-lg">
                {" "}
                {/* Fixed height for the chart */}
                <Line data={earningsVsExpensesData} options={options} />
              </div>
            </div>

            {/* Expense Tracker Card */}
            <div>
              <Card className="rounded-2xl shadow-lg h-full">
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold mb-1 font-poppins">
                    Expense Tracker
                  </h2>
                  <p className="text-gray-500 mb-1">
                    Track your production costs for content creation.
                  </p>
                  <div className="h-64">
                    {" "}
                    {/* Fixed height for the chart */}
                    <Bar data={expenseData} options={options} />
                  </div>
                  <Button className="mt-6 w-full">
                    View Detailed Expenses
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* Cards Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Analytics */}
          <Card className="rounded-2xl shadow-lg p-4">
            <CardContent>
              <h2 className="text-2xl font-semibold mb-4 mt-4 font-poppins">
                Analytics
              </h2>
              <div className="space-y-3 text-left">
                {/* Followers */}
                <div>
                  <p className="text-gray-500 font-poppins">Followers</p>
                  <p className="text-2xl font-bold">128K</p>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-green-500">+2.5%</span>
                    <span className="text-sm text-gray-500">vs last month</span>
                  </div>
                </div>

                {/* Unique People Reached */}
                <div>
                  <p className="text-gray-500 font-poppins">
                    Unique People Reached
                  </p>
                  <p className="text-2xl font-bold">1.2M</p>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-red-500">-1.8%</span>
                    <span className="text-sm text-gray-500">vs last month</span>
                  </div>
                </div>

                {/* Engagement Rate */}
                <div>
                  <p className="text-gray-500 font-poppins">Engagement Rate</p>
                  <p className="text-2xl font-bold">8.5%</p>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-green-500">+0.7%</span>
                    <span className="text-sm text-gray-500">vs last month</span>
                  </div>
                </div>
              </div>
              <Button className="mt-6 w-full">View Detailed Analytics</Button>
            </CardContent>
          </Card>

          {/* Ongoing Collaborations Card with Carousel */}
          <Card className="rounded-2xl shadow-lg p-4 col-span-1 md:col-span-2 relative z-10">
            <CardContent>
              <h2 className="text-xl font-semibold">Collaborations</h2>
              <p className="mt-2 text-gray-500">
                Manage your ongoing brand partnerships.
              </p>

              {/* Swiper Carousel */}
              <Swiper
                slidesPerView={1} // Show 1 slide at a time on mobile
                spaceBetween={16} // Space between slides
                pagination={{ clickable: true }} // Add pagination dots
                navigation={true} // Add navigation arrows
                autoplay={{ delay: 3000 }} // Autoplay every 3 seconds
                breakpoints={{
                  640: { slidesPerView: 2 }, // Show 2 slides on tablets
                  1024: { slidesPerView: 3 }, // Show 3 slides on desktops
                }}
                modules={[Pagination, Navigation, Autoplay]}
                className="mt-6 w-full"
              >
                {collaborations.map((collab, index) => (
                  <SwiperSlide key={index}>
                    <div className="p-4 bg-gray-50 rounded-lg h-full">
                      <h3 className="text-lg font-semibold">
                        Brand: {collab.brand}
                      </h3>
                      <p className="text-sm text-gray-500">
                        Contract Price: {collab.contractPrice}
                      </p>
                      <p className="text-sm text-gray-500 mt-2">
                        {collab.task}
                      </p>
                      <div className="mt-2">
                        <p className="text-sm text-gray-500">
                          Hashtags to Include:
                        </p>
                        <div className="flex flex-wrap gap-2 mt-1">
                          {collab.hashtags.map((hashtag, i) => (
                            <span
                              key={i}
                              className="bg-gray-200 px-2 py-1 rounded-full text-sm text-gray-700"
                            >
                              {hashtag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>

              {/* View All Collaborations Button */}
              <Button className="mt-6 w-full">View All Collaborations</Button>
            </CardContent>
          </Card>
        </div>

        {/* Applications Section */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-10">
          <h2 className="text-2xl font-semibold font-poppins">Applications</h2>
          <div className="space-y-6 mt-4">
            {applications.map((application) => (
              <div
                key={application.id}
                className="bg-gray-50 p-4 rounded-lg shadow-sm"
              >
                <h3 className="text-lg font-semibold">
                  Gig: {application.title}
                </h3>
                <p className="text-sm text-gray-500 mt-1">
                  Deadline: {application.deadline}
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  Target Audience: {application.targetAudience}
                </p>
              </div>
            ))}
          </div>
        </div>
        {/* Gigs For You Section */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-10 transition-all duration-300">
          <h2 className="text-3xl font-bold mb-6 font-poppins text-gray-800">
            🎯 Gigs For You
          </h2>
          <div className="space-y-6">
            {availableGigs.map((gig) => (
              <div
                key={gig.id}
                className="bg-gray-50 p-5 rounded-xl shadow-sm hover:shadow-md transition-transform duration-300 hover:-translate-y-1"
              >
                <h3 className="text-xl font-semibold text-gray-800">{gig.title}</h3>
                <p className="text-sm text-gray-500 mt-1">{gig.description}</p>
                <ul className="text-xs text-gray-600 mt-2 space-y-1">
                  <li>
                    <strong>Category:</strong> {gig.category}
                  </li>
                  <li>
                    <strong>Price:</strong> ${gig.price}
                  </li>
                  <li>
                    <strong>Duration:</strong> {gig.duration}
                  </li>
                  <li>
                    <strong>Deliverables:</strong> {gig.deliverables}
                  </li>
                  <li>
                    <strong>Target Audience:</strong> {gig.targetAudience}
                  </li>
                  <li>
                    <strong>Hashtags:</strong> {gig.hashtags}
                  </li>
                  <li>
                    <strong>Brand Guidelines:</strong> {gig.brandGuidelines}
                  </li>
                  <li>
                    <strong>Contact Email:</strong> {gig.contactEmail}
                  </li>
                  <li>
                    <strong>Deadline:</strong> {gig.deadline}
                  </li>
                </ul>
                <Button
                  onClick={() => openApplyModal(gig)} // Open the apply modal
                  className="mt-4 w-full bg-blue-600 hover:bg-blue-700 transition-colors duration-300 text-white py-2 rounded-lg flex items-center justify-center gap-2"
                >
                  <span>Apply Now</span>
                  <i className="lucide lucide-arrow-right"></i>
                </Button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer Section */}
      <footer className="bg-black text-white mt-20 font-poppins py-12">
        <div className="max-w-auto mx-auto px-6">
          {/* Footer Content */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* About Section */}
            <div>
              <h3 className="text-xl font-semibold mb-4">About CollabHub</h3>
              <p className="text-gray-400">
                CollabHub is the ultimate platform for brands and content
                creators to connect, collaborate, and grow together.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-amber-500 transition-colors"
                  >
                    Home
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-amber-500 transition-colors"
                  >
                    How It Works
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-amber-500 transition-colors"
                  >
                    Testimonials
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-amber-500 transition-colors"
                  >
                    FAQ
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-amber-500 transition-colors"
                  >
                    Contact Us
                  </a>
                </li>
              </ul>
            </div>

            {/* Newsletter Signup */}
            <div>
              <h3 className="text-xl font-semibold mb-4">Newsletter</h3>
              <p className="text-gray-400 mb-4">
                Subscribe to our newsletter to get the latest updates and
                offers.
              </p>
              <form className="flex flex-col space-y-4">
                <input
                  type="email"
                  placeholder="Your Email"
                  className="p-3 w-full border border-gray-600 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
                <Button
                  type="submit"
                  className="px-6 py-3 bg-amber-500 hover:bg-amber-600 text-black shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  Subscribe
                </Button>
              </form>
            </div>

            {/* Social Media Links */}
            <div>
              <h3 className="text-xl font-semibold mb-4">Follow Us</h3>
              <div className="flex space-x-4">
                <a
                  href="#"
                  className="text-gray-400 hover:text-amber-500 transition-colors"
                >
                  <FaFacebook className="text-2xl" />
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-amber-500 transition-colors"
                >
                  <FaXTwitter className="text-2xl" />
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-amber-500 transition-colors"
                >
                  <FaInstagram className="text-2xl" />
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-amber-500 transition-colors"
                >
                  <FaLinkedin className="text-2xl" />
                </a>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-gray-100 mt-8 pt-8">
            {/* Copyright Notice */}
            <p className="text-center text-gray-400">
              © {new Date().getFullYear()} CollabHub. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}