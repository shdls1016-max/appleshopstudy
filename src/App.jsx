import { createContext, lazy, useEffect, useState } from 'react'
import './App.css'
import Detail from './routes/detail.jsx'
import data from './data.js'
import Cart from './routes/Cart.jsx'
import BasicExample from './ui/toast.jsx'

/* const Detail = lazy(()=> import('./routes/detail.jsx'));
const Cart = lazy(()=> import('./routes/Cart.jsx')); */

import {Button, Container, Nav, Navbar, Row, Col, Spinner} from 'react-bootstrap';
import {Routes, Route, Link, useNavigate, Outlet} from 'react-router-dom'
import axios from 'axios'
import { useQuery } from '@tanstack/react-query'

export let Context1 = createContext()



function App() {

  useEffect(()=>{
    let ck = localStorage.getItem('watched');
    if(ck === null){
      localStorage.setItem('watched', JSON.stringify([]));
    }
    
  },[]);


  let [shoes, setShoes] = useState(data)
  let [재고] = useState([10,11,12])

  let navigate = useNavigate();
  let [loading, setLoading] = useState(false)
  let [clicked, setClicked] = useState(0)
  let [showEnd, setShowEnd] = useState(false)
  let [latest, setLatest] = useState('')

  let result = useQuery({
    queryKey: ['getName'],
    queryFn: ()=>{
      return axios.get('https://codingapple1.github.io/userdata.json').then(a=>a.data)

    }
  })

  console.log(result.data)




  return (
    <div>

      <Navbar bg="light" data-bs-theme="light">
        <Container>
          <Navbar.Brand href="#home"  style={{borderRight:'1px solid #e1e1e1', paddingRight:'16px', borderImage:'linear-gradient(to bottom, rgba(255,255,255,0), rgba(210,210,210,1), rgba(255,255,255,0)) 1'}}>Shop</Navbar.Brand>
          <Nav className="me-auto" style={{display:'flex', gap:'16px'}}>
            <Link to="/">Home</Link>
           {/*  <Link to="/detail">Detail</Link> */}
            <Nav.Link onClick={()=>{navigate('/about')}} style={{padding:'0', color:"#333"}}>About</Nav.Link>
            <Nav.Link onClick={()=>{navigate('/event')}} style={{padding:'0', color:"#333"}}>Event</Nav.Link>
            <Nav.Link onClick={()=>{navigate('/cart')}} style={{padding:'0', color:"#333"}}>Cart</Nav.Link>
          </Nav>

          <Nav className='ms-auto'>
            {result.isPending && '로딩중'}
            {result.isError && '에러남'}
            {result.isSuccess && result.data.name}
          </Nav>
        </Container>
      </Navbar>



    

{/* 
    <Container>
      <Row>
        <Col>
          <img src="https://codingapple1.github.io/shop/shoes1.jpg" width="80%"/>
          <h4>{shoes[0].title}</h4>
          <p>{shoes[0].price}</p>
        </Col>
        <Col>
          <img src="https://codingapple1.github.io/shop/shoes2.jpg" width="80%"/>
          <h4>{shoes[1].title}</h4>
          <p>shoes[1].price</p>
        </Col>
        <Col>
          <img src="https://codingapple1.github.io/shop/shoes3.jpg" width="80%"/>
          <h4>상품명</h4>
          <p>상품설명</p>
        </Col>
      </Row>

    </Container> */}



<Routes>
    <Route path="/" element={
      <>
        
        <div className='main-bg'></div>

        <Container>
          <Row xs={1} md={3}>  
            {
              shoes.map((a, i)=>{
                return(
                  <Card key={a.id} shoes={shoes[i]} i={i}></Card>
                )
              })
            }


          </Row>
        </Container>

            {loading ===true ? <Ingimg />:null}
            {showEnd ? <Infowin><p>추가 상품이 존재하지 않습니다.</p></Infowin> : null}

        <Button variant="dark" onClick={()=>{
            let nextClicked = clicked + 1;
            setClicked(nextClicked);
            if(nextClicked == 1){
               setLoading(true);
               axios.get('https://codingapple1.github.io/shop/data2.json').then((result)=>{
               let copy = [...shoes, ...result.data]
               setShoes(copy);
               setLoading(false);
            })
            .catch(()=>{
              setLoading(false);
              console.log('실패함')
            })
            }
            else if(nextClicked ==2){
               setLoading(true);
               axios.get('https://codingapple1.github.io/shop/data3.json').then((result)=>{
             console.log(result.data)
             let copy = [...shoes, ...result.data]
             setShoes(copy);
              setLoading(false);
            })
            .catch(()=>{
              setLoading(false);
              console.log('실패함')
            })
            } else{
              setShowEnd(true);
              setTimeout(()=>{
                setShowEnd(false)
              },1000)
              
            }
           
            /* 
            axios.post('/url 주소',{name:'kim'})
            Promise.all([axios.get('/url1'), axios.get('/url2')  ])
            .then(()=>{
              
            })
            */
        }}
        style={{margin:'40px'}}>더보기</Button>
      </>
    } />

    <Route path="/detail/:id" element={
      <Context1.Provider value={{재고, shoes}}>
        <Detail shoes={shoes} />
      </Context1.Provider>
    } />

    <Route path='/about' element={<About/>}>
      <Route path='member' element={<div>멤버임</div>} />
      <Route path='location' element={<div>위치정보임</div>} />
    </Route>
    <Route path='/event' element={<Event/>}>
      <Route path='one' element={<div>첫 주문시 양배추즙 서비스</div>} />
      <Route path='two' element={<div>생일기념 쿠폰받기</div>} /> 
    </Route>

    <Route path='/cart' element={<Cart/>} />



    <Route path='*' element={<div>없는 페이지입니다. (404)</div>} />

  </Routes>


    <BasicExample shoes={shoes} />

    

    </div>
  )
}

function Card(props){
  let navigate = useNavigate();

  return(
     <Col onClick={()=>{navigate('/detail/' + props.i)}}>
          <img src={"https://codingapple1.github.io/shop/shoes" + (props.i+1) + ".jpg"} width="80%" />
          <h4>{props.shoes.title}</h4>
          <p>{props.shoes.price}</p>
    </Col>
  )
   
  }




  function About(){
    return(
      <div>
        <h4>회사정보임</h4>
        <Outlet></Outlet>
      </div>
    )
  }

  function Event(){
    return(
    <>
      <h4 style={{marginTop:'20px'}}>오늘의 이벤트</h4>
      <Outlet></Outlet>
    </>
    )
  }


  function Ingimg(){
    return(
    <>
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </>
    )
  }

  function Infowin(props){
   return(
     <div className="alert alert-secondary" style={{marginTop:'40px'}}>
      {props.children}
    </div>
    );
  }


export default App
