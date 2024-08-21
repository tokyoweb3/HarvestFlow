import React, { useState, useEffect } from "react";
import pagetopImage from "../../assets/images/pagetop.svg"; // 画像をインポート

const ScrollToTopButton: React.FC = () => {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  // スクロールイベントを監視してボタンの表示・非表示を制御
  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // ページトップにスムーズに戻る関数
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      style={{
        display: isVisible ? "block" : "none",
        position: "fixed",
        bottom: "20px",
        right: "20px",
        border: "none",
        background: "none",
        cursor: "pointer",
        zIndex: 1000, // ボタンを最前面に表示
      }}
      onClick={scrollToTop}
      aria-label="Scroll to top"
      type="button"
    >
      <img
        src={pagetopImage} // インポートした画像を使用
        alt="Scroll to top"
        style={{ width: "40px", height: "40px" }} // ボタンのサイズは適宜調整
      />
    </button>
  );
};

export default ScrollToTopButton;
