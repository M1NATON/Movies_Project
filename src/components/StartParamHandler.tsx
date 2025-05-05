import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function StartParamHandler() {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const startParam = params.get('tgWebAppStartParam');

    if (startParam?.startsWith('movie_')) {
      const movieId = startParam.split('_')[1];
      navigate(`/movie/${movieId}`);
    }
  }, []);

  return null;
}

export default StartParamHandler;
