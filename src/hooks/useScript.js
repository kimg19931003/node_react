import { useEffect } from 'react';

const useScript = url => {
  useEffect(() => {
    
    console.log(url+"dasdassad");
    const script = document.createElement('script');

    script.src = url;
    script.async = true;

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    }
  }, [url]);
};

export default useScript;