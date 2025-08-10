import { useState } from "react";
import { useTranslation } from "react-i18next";

const LanguageSelector = () => {
  const [open, setOpen] = useState(false);
  const { i18n, t } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    setOpen(false);
  };

  return (
    <div className="relative inline-block text-left z-50">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center space-x-2 px-3 py-1 rounded"
        aria-haspopup="true"
        aria-expanded={open}
      >
        <img
          src={i18n.language === "pt" ? "/pt-flag.png" : "/en-flag.png"}
          alt={i18n.language}
          className="h-6 w-auto"
        />
      </button>

      {open && (
        <ul className="absolute mt-2 bg-white border rounded shadow-md w-40 z-10">
          <li
            className="cursor-pointer flex items-center px-4 py-2 hover:bg-gray-100"
            onClick={() => changeLanguage("en")}
          >
            <img src="/en-flag.png" alt="English" className="h-6 w-auto mr-3" />
            <span>English</span>
          </li>
          <li
            className="cursor-pointer flex items-center px-4 py-2 hover:bg-gray-100"
            onClick={() => changeLanguage("pt")}
          >
            <img src="/pt-flag.png" alt="Português" className="h-6 w-auto mr-3" />
            <span>Português</span>
          </li>
        </ul>
      )}
    </div>
  );
};

export default LanguageSelector;
