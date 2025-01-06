import { useSelector } from 'react-redux';
import { useEffect, useRef, useState } from 'react';
import { IoArrowBackCircle, IoArrowForwardCircle, IoRefreshCircle } from "react-icons/io5";
import './viewport.scss';

const Viewport = () => {
  const activeUrl = useSelector((state) => state.navigation.activeUrl);
  const webviewContainerRef = useRef(null);
  const [webviewKey, setWebviewKey] = useState(0);
  const [canGoBack, setCanGoBack] = useState(false);
  const [canGoForward, setCanGoForward] = useState(false);
  const [currentUrl, setCurrentUrl] = useState(activeUrl);

  const handleBack = () => {
    const webview = webviewContainerRef.current.querySelector('webview');
    if (webview && webview.canGoBack()) {
      webview.goBack();
    }
  };

  const handleForward = () => {
    const webview = webviewContainerRef.current.querySelector('webview');
    if (webview && webview.canGoForward()) {
      webview.goForward();
    }
  };

  const handleRefresh = () => {
    const webview = webviewContainerRef.current.querySelector('webview');
    if (webview) {
      webview.reload();
    }
  };

  useEffect(() => {
    setWebviewKey((prevKey) => prevKey + 1);
    setCanGoBack(false);
    setCanGoForward(false);
    setCurrentUrl(activeUrl);
  }, [activeUrl]);

  useEffect(() => {
    const webview = webviewContainerRef.current?.querySelector('webview');
    if (webview) {
      const updateNavigationState = () => {
        setCanGoBack(webview.canGoBack());
        setCanGoForward(webview.canGoForward());
        setCurrentUrl(webview.getURL());
      };

      webview.addEventListener('did-navigate', updateNavigationState);
      webview.addEventListener('did-navigate-in-page', updateNavigationState);

      return () => {
        webview.removeEventListener('did-navigate', updateNavigationState);
        webview.removeEventListener('did-navigate-in-page', updateNavigationState);
      };
    }
  }, [webviewKey]);

  return (
    <div className="viewport">
      <div className="view_controls">
        <div className="view_controls_buttons">
          <div
            className={`view_controls_button ${!canGoBack ? 'disabled' : ''}`}
            onClick={handleBack}
          >
            <IoArrowBackCircle />
          </div>
          <div
            className={`view_controls_button ${!canGoForward ? 'disabled' : ''}`}
            onClick={handleForward}
          >
            <IoArrowForwardCircle />
          </div>
        </div>
        <div className="view_controls_url">{currentUrl}</div>
        <div className="view_controls_buttons">
          <div className="view_controls_button" onClick={handleRefresh}>
            <IoRefreshCircle />
          </div>
        </div>
      </div>
      <div className="webview-container" ref={webviewContainerRef}>
        <webview
          key={webviewKey}
          src={activeUrl}
          style={{ width: '100%', height: '100%' }}
        ></webview>
      </div>
    </div>
  );
};

export default Viewport;