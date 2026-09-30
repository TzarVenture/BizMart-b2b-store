'use client';

import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function AOSInit() {
  useEffect(() => {
    AOS.init({
      once: true,
      easing: 'ease-out-cubic',
      duration: 600,
      offset: 30,
      delay: 0,
    });

    const refreshTimer = setTimeout(() => {
      AOS.refresh();
    }, 400);

    return () => clearTimeout(refreshTimer);
  }, []);

  return null;
}
