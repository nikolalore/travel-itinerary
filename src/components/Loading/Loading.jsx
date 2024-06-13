import React from 'react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

export const Loading = () => {
  return (
    <div>
      <p>Načítám...</p>
      <DotLottieReact src={'/img/Loading.gif'} loop autoplay />
    </div>
  );
};
