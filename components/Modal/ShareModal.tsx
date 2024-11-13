import React from "react";
import {
  RedditIcon,
  RedditShareButton,
  TelegramIcon,
  TelegramShareButton,
  TwitterShareButton,
  WhatsappIcon,
  WhatsappShareButton,
  XIcon,
} from "react-share";

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  link: any;
}

const ShareModal: React.FC<ShareModalProps> = ({ isOpen, onClose, link }) => {
  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div
            className="absolute inset-0 bg-black opacity-50"
            onClick={onClose}
          ></div>
          <div className=" bg-black p-[20px] max-w-[90%] rounded-lg overflow-hidden shadow-lg transform transition-all duration-300 scale-100 opacity-100">
            <span className="text-[20px] font-roboto">Share</span>
            <div className="flex flex-wrap space-x-[20px] mt-4">
              <TwitterShareButton
                url={link}
                className="Demo__some-network__share-button"
              >
                <XIcon size={42} round />
              </TwitterShareButton>

              <TelegramShareButton
                url={link}
                className="Demo__some-network__share-button"
              >
                <TelegramIcon size={42} round />
              </TelegramShareButton>

              <WhatsappShareButton
                url={link}
                className="Demo__some-network__share-button"
              >
                <WhatsappIcon size={42} round />
              </WhatsappShareButton>

              <RedditShareButton url={link} className="">
                <RedditIcon size={42} round />
              </RedditShareButton>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ShareModal;
