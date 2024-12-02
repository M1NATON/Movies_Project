import { Link } from 'react-router-dom';
import img from '../../../img/3F3F3F.webp'
import { Image } from "@nextui-org/react"
const NotFound = () => {
  return (
    <div className="flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold">404 - Page Not Found</h1>
        <p className="mt-4 text-start">- Его нет. <br/> - Что? <br/> - Страницы здесь нет. <br/> - Страница уехал. <br/> - Он исчез.</p>

        <Image className={'h-[40vh] w-fit mx-auto'} src={img}/>
        <Link to="/" className="mt-4 text-blue-500 underline">
          <span className={'cursor-pointer'}>Go to Home</span>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
