
import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';

// Định nghĩa kiểu cho context
interface LanguageContextType {
  language: string;
  toggleLanguage: () => void;
}

// Tạo Context với giá trị mặc định là undefined
const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Tạo Provider component
interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    // Lấy ngôn ngữ từ localStorage khi component được tạo
    return localStorage.getItem('language') || 'en';
  });

  useEffect(() => {
    // Lưu ngôn ngữ vào localStorage mỗi khi nó thay đổi
    localStorage.setItem('language', language);
  }, [language]);

  const toggleLanguage = () => {
    setLanguage((prevLanguage) => (prevLanguage === 'en' ? 'vi' : 'en'));
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

// Tạo custom hook để sử dụng LanguageContext
export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
