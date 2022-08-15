import React from 'react';
import { useNavigate }from 'react-router-dom'
import TitleButton from '../../component/titleButton/TitleButton';

const MainPage = () => {
  const navigate = useNavigate()

  return (
    <div style={{ width: '1200px', display: 'flex', flexDirection: 'column', margin: '0 auto', border:'1px solid blue'}}>
      <TitleButton />
      <div>
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent:'space-between',padding:'10px 30px'}}>
          <div>
            <img src="https://cdn.pixabay.com/photo/2019/11/08/11/56/kitten-4611189_1280.jpg" alt='이미지를 찾을 수 없습니다.' style={{ width: '600px', height: '550px', objectFit: 'cover' }} />
          </div>
          <div style={{ width:'400px',border:'1px solid red' }}>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Autem, deleniti nobis. Expedita rerum accusantium incidunt? Molestiae, ratione doloremque ex saepe magnam veniam, rerum ipsa similique quaerat, voluptatibus optio. Recusandae, laudantium.
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aliquid doloribus nulla ad error tempora cumque quam aspernatur at nihil nesciunt perspiciatis maiores quod culpa, nisi sapiente quae provident laudantium. Dolores!
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Velit quis sed expedita, quas dolore, perspiciatis consectetur hic nisi quibusdam excepturi incidunt ad. Laborum, illo iure expedita doloremque soluta exercitationem aperiam?
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent:'space-around'}} >
            <button>로그인/회원가입</button>
            <button onClick={() => navigate('ListPage')}>메뉴1</button>
            <button onClick={() => navigate('ListPage')}>메뉴2</button>
            <button onClick={() => navigate('ListPage')}>메뉴3</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainPage;