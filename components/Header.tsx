"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "./ui/button";
import {
  Sprout,
  Menu,
  Coins,
  Bell,
  User,
  ChevronDown,
  Search,
  Settings,
  LogIn,
  LogOut,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "./ui/dropdown-menu";
import { Badge } from "./ui/badge";
import { Web3Auth } from "@web3auth/modal";
import { CHAIN_NAMESPACES, IProvider, WEB3AUTH_NETWORK } from "@web3auth/base";
import { EthereumPrivateKeyProvider } from "@web3auth/ethereum-provider";
import { createUser, getUserByEmail, getUserBalance } from "../lib/api"; // Add missing imports
import { get } from "http";

// import web3auth client id from env variable
const clientId = process.env.WEB3_AUTH_CLIENT_ID;

const chainConfig = {
  chainNamespace: CHAIN_NAMESPACES.EIP155,
  chainId: "0xaa36a7", // Sepolia Testnet
  rpcTarget: "https://rpc.ankr.com/eth_sepolia", // Sepolia Testnet RPC URL
  displayName: "Sepolia Testnet",
  blockExplorer: "https://sepolia.etherscan.io",
  ticker: "ETH",
  tickerName: "Ethereum",
  logo: "https://assets.web3auth.io/evm-chains/sepolia.png",
};

const privateKeyProvider = new EthereumPrivateKeyProvider({
  config: chainConfig,
});

const web3auth = new Web3Auth({
  clientId,
  web3AuthNetwork: WEB3AUTH_NETWORK.TESTNET,
  privateKeyProvider,
});

interface HeaderProps {
  onMenuClick: () => void;
  totalEarnings: number;
}

export default function Header({ onMenuClick, totalEarnings }: HeaderProps) {
  const [provider, setProvider] = useState<IProvider | null>(null);
  const [looggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [userInfo, setUserInfo] = useState<any>(null);
  const pathname = usePathname();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    const init = async () => {
      try {
        await web3auth.initModal();
        setProvider(web3auth.provider);

        if (web3auth.connected) {
          setLoggedIn(true);
          const user = await web3auth.getUserInfo();
          setUserInfo(user);

          if (user.email) {
            localStorage.setItem("userEmail", user.email);
            try {
              await createUser(user.email, user.name || "Anonymous User");
            } catch (error) {
              console.error("Error creating user", error);
            }
          }
        }
      } catch (error) {
        console.error("Error initializing Web3Auth", error);
      } finally {
        setLoading(false);
      }
    };
    init();
  }, []);

  useEffect(() => {
    const fetchNotifications = async () => {
      if (userInfo && userInfo.email) {
        const user = await getUserByEmail(userInfo.email);
        // Add logic to fetch notifications for the user
      }
    };
    fetchNotifications();

    const notificationInterval = setInterval(fetchNotifications, 3000); 
    return () => clearInterval(notificationInterval);
  }, [userInfo]);

  useEffect(() => {
    const fetchBalance = async () => {
      if (userInfo && userInfo.email) {
        const user = await getUserByEmail(userInfo.email);
        if (user) {
          const userBalance = await getUserBalance(user.id); 
          setBalance(userBalance); 
      }
    };
    fetchBalance(); 

    const handleBalanceUpdate = (event: CustomEvent) => {
      setBalance(event.detail);
    };
    window.addEventListener("balanceUpdate", handleBalanceUpdate as EventListener);

    return () => {
      window.removeEventListener("balanceUpdate", handleBalanceUpdate as EventListener);
    };
  }, [userInfo]);
}

const login = async () => {
  if (!web3auth) {
    console.error("Web3Auth not initialized");
    return;
  }
  try {
    const web3authProvider = await web3auth.connect();
    setProvider(web3authProvider);
    setLoggedIn(true);
    const user = await web3auth.getUserInfo();
    setUserInfo(user);
    if(user.email){
      localStorage.setItem("userEmail", user.email);
      try {
        await createUser(user.email, user.name || "Anonymous User");
      } catch (error) {
        console.error("Error creating user", error);
      }
    }
  } 
  const logout = async () => {
    if(!web3auth) {
      console.error("Web3Auth not initialized");
      return;
    }
    try{
      await web3auth.logout();
      setProvider(null);
      setLoggedIn(false);
      setUserInfo(null);
      localStorage.removeItem("userEmail");

    }catch(error) {
      console.error("Error logging out", error);
};
const getUserBalance = async () => {
  if(web3auth.connected){
    const user = await web3auth.getUserInfo()
    setUserInfo(user);

    if(user.email){
      localStorage.setItem('userEmail', user.email)
      try{
        await createUser(user.email, user.name || "Anonymous User")
      }
    }
  }
  }
  const handleNotificationClick = async(notificationId: number) => {
    await markNoficationAsRead(notificationId);
};
  if (loading){
    return <div>Loading web3 auth....</div>;
  }
  return (<header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="flex items-center justify-between px-4 py-2">
        <div className="flex items-center">
          <Button 
            variant='ghost' 
            size='icon' className="mr-md:mr-4" 
            onClick={onMenuClick}
          >
          <Menu className="h-6 w-6 " />
          </Button>
            

        </div>

      </div>
  </header>

}

export default Header;