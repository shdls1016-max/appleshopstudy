import js from '@eslint/js';
import { useState } from 'react';
import Toast from 'react-bootstrap/Toast';

function BasicExample(props) {
    const watchedIds = JSON.parse(localStorage.getItem('watched')) || [];
    const latestId = watchedIds[0];
    const latestProduct = props.shoes.find(item=>Number(item.id) === Number(latestId));

    const [show, setShow] = useState(true);



  return (
    <Toast position='bottom-end' className='position-fixed bottom-0 end-0 m-2 w-auto mw-100' show={show} onClose={()=>setShow(false)}>
      <Toast.Header>
        <strong className="me-auto">최근 본 상품</strong>
      </Toast.Header>
      <Toast.Body>
        {latestProduct ? (
          <div className="d-flex flex-column align-items-center w-auto p-2">
            <img 
              src={`https://codingapple1.github.io/shop/shoes${latestProduct.id + 1}.jpg`} 
              alt={latestProduct.title} 
              style={{ width: '120px', /* marginRight: '10px' */ }}
            />
            <div>
              <p className="m-0" style={{ fontWeight: 'bold' }}>{latestProduct.title}</p>
              <p className="m-0 text-muted" style={{ fontSize: '12px' }}>{latestProduct.price}원</p>
            </div>
          </div>
        ) : (
          <p className="m-0 text-muted">최근 본 상품이 없습니다.</p>
        )}
       
      </Toast.Body>
    </Toast>
  );
}

export default BasicExample;