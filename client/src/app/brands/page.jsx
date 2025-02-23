"use client";
import { ethers } from "ethers";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "@heroicons/react/24/outline"; // Import a plus icon
import { useState } from "react";

// Icons for social media platforms
import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

// Import Chart.js
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function Page() {
  const [connectedPlatforms, setConnectedPlatforms] = useState([]);
  const [isCampaignModalOpen, setIsCampaignModalOpen] = useState(false);
  const [isGigFormOpen, setIsGigFormOpen] = useState(false); // State for gig form
  const [account, setAccount] = useState(null);
  const [contract, setContract] = useState(null);

  // State to manage gigs (campaigns)
  const [gigs, setGigs] = useState([]);

  // State to manage form inputs
  const [campaignName, setCampaignName] = useState("");
  const [platform, setPlatform] = useState("facebook");
  const [budget, setBudget] = useState("");
  const [duration, setDuration] = useState("");
  const [numberOfMembers, setNumberOfMembers] = useState("");

  // State for gig form
  const [gigData, setGigData] = useState({
    title: "",
    description: "",
    category: "",
    price: "",
    duration: "",
    deliverables: "",
    targetAudience: "",
    hashtags: "",
    brandGuidelines: "",
    contactEmail: "",
    deadline: "",
  });

  // Function to open the campaign modal
  const openCampaignModal = () => {
    setIsCampaignModalOpen(true);
  };

  // Function to close the campaign modal
  const closeCampaignModal = () => {
    setIsCampaignModalOpen(false);
    // Reset form fields
    setCampaignName("");
    setPlatform("facebook");
    setBudget("");
    setDuration("");
    setNumberOfMembers("");
  };

  // Function to open the gig form
  const openGigForm = () => {
    setIsGigFormOpen(true);
  };

  // Function to close the gig form
  const closeGigForm = () => {
    setIsGigFormOpen(false);
  };

  // Function to connect MetaMask
  const connectWallet = async () => {
    if (typeof window.ethereum !== "undefined") {
      try {
        const provider = new ethers.BrowserProvider(window.ethereum); // ✅ Ethers v6 Syntax
        const signer = await provider.getSigner();
        const address = await signer.getAddress();
        setAccount(address);
      } catch (error) {
        console.error("Error connecting to wallet:", error);
      }
    } else {
      alert("MetaMask not detected!");
    }
  };

  // Function to interact with contract
  const launchCampaignOnChain = async (campaignData) => {
    if (!contract) return alert("Connect wallet first!");

    try {
      const tx = await contract.createCampaign(
        campaignData.campaignName,
        campaignData.budget,
        campaignData.duration,
        campaignData.numberOfMembers
      );
      console.log("Campaign Launched:", tx);
    } catch (error) {
      console.error("Error launching campaign:", error);
    }
  };

  // Function to handle form submission
  const handleLaunchCampaign = () => {
    if (!campaignName || !budget || !duration || !numberOfMembers) {
      alert("Please fill in all fields.");
      return;
    }

    // Create a new gig object
    const newGig = {
      id: Date.now(), // Unique ID for the gig
      campaignName,
      platform,
      budget,
      duration,
      numberOfMembers,
      output: "Campaign output will appear here once the campaign is completed.", // Placeholder for campaign output
      isClosed: false, // Track if the campaign is closed early
    };

    // Add the new gig to the gigs array
    setGigs([...gigs, newGig]);

    // Close the modal and reset form fields
    closeCampaignModal();
  };

  // Function to close a campaign early
  const handleCloseCampaign = (id) => {
    setGigs((prevGigs) =>
      prevGigs.map((gig) =>
        gig.id === id ? { ...gig, isClosed: true } : gig
      )
    );
  };

  // Data for the Impressions vs. Engagement Rate graph
  const impressionsVsEngagementData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"], // Months
    datasets: [
      {
        label: "Impressions",
        data: [50000, 75000, 60000, 90000, 120000, 110000, 140000], // Example impressions
        borderColor: "rgba(99, 102, 241, 1)", // Purple color
        backgroundColor: "rgba(99, 102, 241, 0.2)",
        fill: true,
      },
      {
        label: "Engagement Rate (%)",
        data: [5.2, 6.1, 7.0, 8.5, 7.8, 8.2, 9.0], // Example engagement rates
        borderColor: "rgba(255, 99, 132, 1)", // Red color
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        fill: true,
      },
    ],
  };

  // Data for the Engagement Rate Over Time graph
  const engagementRateData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"], // Months
    datasets: [
      {
        label: "Engagement Rate (%)",
        data: [5.2, 6.1, 7.0, 8.5, 7.8, 8.2, 9.0], // Example engagement rates
        borderColor: "rgba(75, 192, 192, 1)", // Teal color
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        fill: true,
      },
    ],
  };

  const graphOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Engagement Rate Over Time",
      },
    },
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="min-h-screen bg-gray-100 p-8">
        {/* Connect Wallet Button */}
        <button
          onClick={connectWallet}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          {account
            ? `Connected: ${account.slice(0, 6)}...${account.slice(-4)}`
            : "Connect Wallet"}
        </button>

        {/* Button to Launch Campaign on Blockchain */}
        <button
          onClick={() =>
            launchCampaignOnChain({
              campaignName: "Test",
              budget: 100,
              duration: 10,
              numberOfMembers: 5,
            })
          }
          className="bg-green-500 text-white px-4 py-2 rounded ml-4"
        >
          Launch Campaign (Blockchain)
        </button>
      </div>
      <div className="p-8">
        {/* Header with "Brands Dashboard" and "Launch Campaign" button */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold font-poppins">Brands Dashboard</h1>
          <div className="flex items-center space-x-4">
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
            {/* Launch Campaign Button */}
            <Button
              onClick={openCampaignModal}
              className="flex items-center space-x-2 bg-amber-500 hover:bg-amber-600"
            >
              <PlusIcon className="h-5 w-5" />
              <span className="font-poppins text-gray-800">
                Launch Campaign
              </span>
            </Button>
            <Button
              onClick={openGigForm} // Use the openGigForm function
              className="flex items-center space-x-2 bg-green-500 hover:bg-green-600"
            >
              <PlusIcon className="h-5 w-5" />
              <span className="font-poppins text-gray-800">Create Gig</span>
            </Button>
          </div>
        </div>

        {/* Modal for Launching a Campaign */}
        {isCampaignModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center pb-15 z-30">
            <div className="bg-gray-100 rounded-2xl shadow-lg p-6 w-96">
              <h2 className="text-xl font-semibold mb-4">
                Launch <span className="text-amber-500">New Campaign</span>
              </h2>
              <hr className="border-gray-800 my-4" />
              <div className="space-y-4">
                {/* Campaign Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Campaign Name
                  </label>
                  <input
                    type="text"
                    placeholder="Enter campaign name"
                    value={campaignName}
                    onChange={(e) => setCampaignName(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                {/* Platform Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Select Platform
                  </label>
                  <select
                    value={platform}
                    onChange={(e) => setPlatform(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                  >
                    <option value="facebook">Facebook</option>
                    <option value="instagram">Instagram</option>
                    <option value="x">X (Twitter)</option>
                  </select>
                </div>

                {/* Budget */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Budget ($)
                  </label>
                  <input
                    type="number"
                    placeholder="Enter budget"
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                {/* Number of Members */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Number of Members
                  </label>
                  <input
                    type="number"
                    placeholder="Enter number of members"
                    value={numberOfMembers}
                    onChange={(e) => setNumberOfMembers(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                {/* Campaign Duration */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Campaign Duration
                  </label>
                  <input
                    type="date"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>
              </div>
              <div className="pb-3"></div>
              <hr className="border-gray-800 my-4" />
              <div className="flex justify-center">
                <Button
                  onClick={closeCampaignModal}
                  className="mt-4 w-50 items-center font-poppins bg-gray-900 hover:bg-gray-600"
                >
                  <span className="text-amber-500">Cancel</span>
                </Button>
                <Button
                  onClick={handleLaunchCampaign}
                  className="mt-4 w-50 items-center font-poppins bg-amber-500 hover:bg-amber-600 ml-4"
                >
                  <span className="text-gray-800">Launch</span>
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Gig Form Modal */}
        {isGigFormOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center pb-15 z-30">
            <div className="bg-gray-100 rounded-2xl shadow-lg p-6 w-96">
              <h2 className="text-xl font-semibold mb-4">
                Create <span className="text-amber-500">New Gig</span>
              </h2>
              <hr className="border-gray-800 my-4" />
              <div className="space-y-4">
                {/* Gig Title */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Gig Title
                  </label>
                  <input
                    type="text"
                    placeholder="Enter gig title"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                {/* Gig Description */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <textarea
                    placeholder="Enter gig description"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                {/* Gig Budget */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Budget ($)
                  </label>
                  <input
                    type="number"
                    placeholder="Enter budget"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>
              </div>
              <div className="pb-3"></div>
              <hr className="border-gray-800 my-4" />
              <div className="flex justify-center">
                <Button
                  onClick={closeGigForm}
                  className="mt-4 w-50 items-center font-poppins bg-gray-900 hover:bg-gray-600"
                >
                  <span className="text-amber-500">Cancel</span>
                </Button>
                <Button
                  onClick={() => alert("Gig created!")}
                  className="mt-4 w-50 items-center font-poppins bg-amber-500 hover:bg-amber-600 ml-4"
                >
                  <span className="text-gray-800">Create</span>
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Full-Width Content Reach Overview Section */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-4 font-poppins">
            Content Reach Overview
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {/* Total Impressions */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold">Total Impressions</h3>
              <p className="text-2xl font-bold mt-2">1.2M</p>
              <p className="text-sm text-gray-500">Lifetime impressions</p>
              <div className="flex items-center space-x-2 mt-2">
                <span className="text-sm text-green-500">+15%</span>
                <span className="text-sm text-gray-500">vs last month</span>
              </div>
            </div>

            {/* Engagement Rate */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold">Engagement Rate</h3>
              <p className="text-2xl font-bold mt-2">8.5%</p>
              <p className="text-sm text-gray-500">Average across platforms</p>
              <div className="flex items-center space-x-2 mt-2">
                <span className="text-sm text-green-500">+2.3%</span>
                <span className="text-sm text-gray-500">vs last month</span>
              </div>
            </div>

            {/* Audience Demographics */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold">Audience Demographics</h3>
              <p className="text-2xl font-bold mt-2">18-34</p>
              <p className="text-sm text-gray-500">Primary age group</p>
              <div className="mt-2">
                <p className="text-sm text-gray-500">Gender Split:</p>
                <div className="flex space-x-2">
                  <span className="text-sm text-blue-500">Male: 55%</span>
                  <span className="text-sm text-pink-500">Female: 45%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Two Graphs Side by Side */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Impressions vs. Engagement Rate Graph */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-xl font-semibold mb-4 font-poppins">
                Impressions vs. Engagement Rate
              </h3>
              <div className="h-100">
                <Line
                  data={impressionsVsEngagementData}
                  options={graphOptions}
                />
              </div>
            </div>

            {/* Engagement Rate Over Time Graph */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-xl font-semibold mb-4 font-poppins">
                Engagement Rate Over Time
              </h3>
              <div className="h-100">
                <Line data={engagementRateData} options={graphOptions} />
              </div>
            </div>
          </div>
        </div>

        {/* Campaign Section */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-4 font-poppins">
            Campaigns
          </h2>
          {gigs.length === 0 ? (
            <p className="text-gray-500 text-center">
              No campaigns launched yet.
            </p>
          ) : (
            <div className="space-y-6">
              {gigs.map((gig) => (
                <div
                  key={gig.id}
                  className="bg-gray-50 rounded-2xl shadow-lg p-6"
                >
                  <h3 className="text-xl font-semibold mb-4">
                    {gig.campaignName}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    {/* Platform */}
                    <div>
                      <p className="text-sm text-gray-500">Platform</p>
                      <p className="text-lg font-bold">{gig.platform}</p>
                    </div>

                    {/* Budget */}
                    <div>
                      <p className="text-sm text-gray-500">Budget</p>
                      <p className="text-lg font-bold">${gig.budget}</p>
                    </div>

                    {/* Duration */}
                    <div>
                      <p className="text-sm text-gray-500">Duration</p>
                      <p className="text-lg font-bold">{gig.duration}</p>
                    </div>

                    {/* Number of Members */}
                    <div>
                      <p className="text-sm text-gray-500">Number of Members</p>
                      <p className="text-lg font-bold">{gig.numberOfMembers}</p>
                    </div>
                  </div>

                  {/* Campaign Output */}
                  <div className="mt-6">
                    <p className="text-sm text-gray-500">Campaign Output</p>
                    <div className="bg-white p-4 rounded-lg border border-gray-200">
                      <p className="text-gray-700">{gig.output}</p>
                    </div>
                  </div>

                  {/* Close Early Button */}
                  {!gig.isClosed && (
                    <div className="mt-6">
                      <Button
                        onClick={() => handleCloseCampaign(gig.id)}
                        className="w-full bg-red-500 hover:bg-red-600"
                      >
                        Close Early
                      </Button>
                    </div>
                  )}

                  {/* Closed Message */}
                  {gig.isClosed && (
                    <div className="mt-6 text-center text-red-500">
                      <p>This campaign has been closed early.</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
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