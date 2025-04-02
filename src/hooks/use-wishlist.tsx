
import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from "@/components/ui/use-toast";
import { Shoe } from '@/data/shoes';

interface WishlistContextType {
  items: string[];
  addItem: (productId: string, productName: string) => void;
  removeItem: (productId: string, productName: string) => void;
  isInWishlist: (productId: string) => boolean;
  clearWishlist: () => void;
  itemCount: number;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const WishlistProvider = ({ children }: { children: React.ReactNode }) => {
  const [items, setItems] = useState<string[]>([]);
  
  // Load wishlist from localStorage on initial render
  useEffect(() => {
    const savedWishlist = localStorage.getItem('wishlist');
    if (savedWishlist) {
      try {
        setItems(JSON.parse(savedWishlist));
      } catch (error) {
        console.error('Failed to parse wishlist from localStorage', error);
      }
    }
  }, []);
  
  // Save wishlist to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(items));
  }, [items]);

  const addItem = (productId: string, productName: string) => {
    if (!items.includes(productId)) {
      setItems(prevItems => [...prevItems, productId]);
      toast({
        title: "Added to Wishlist",
        description: `${productName} has been added to your wishlist.`,
      });
    }
  };

  const removeItem = (productId: string, productName: string) => {
    if (items.includes(productId)) {
      setItems(prevItems => prevItems.filter(id => id !== productId));
      toast({
        title: "Removed from Wishlist",
        description: `${productName} has been removed from your wishlist.`,
      });
    }
  };

  const isInWishlist = (productId: string) => {
    return items.includes(productId);
  };

  const clearWishlist = () => {
    setItems([]);
    toast({
      title: "Wishlist Cleared",
      description: "All items have been removed from your wishlist.",
    });
  };

  const itemCount = items.length;

  return (
    <WishlistContext.Provider 
      value={{ 
        items, 
        addItem, 
        removeItem, 
        isInWishlist,
        clearWishlist,
        itemCount
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (context === undefined) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};
