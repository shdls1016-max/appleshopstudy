import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import styled from 'styled-components'
import {Nav, Button} from 'react-bootstrap'
import { Routes, Route } from 'react-router-dom'
import { useDispatch } from "react-redux";
import axios from 'axios';

import {Context1} from './../App.jsx'
import {addItem} from './../store.js'
import { useQueryClient } from "@tanstack/react-query";
import { useLike } from "../hooks/like.jsx";
import { useUsername } from '../hooks/surveData.jsx';




function Detail(props){
    let [like, addLike] = useLike()
    let username = useUsername()
    
    //tanstack query(ajax 요청관련 실시간 정보관리)
    let q = useQueryClient()
    let result = q.getQueryData(['getName'])
   



    let dispatch = useDispatch()
    let {재고} = useContext(Context1)

    useEffect(()=>{
        console.log('안녕')
    })

    let [num, setNum] = useState('')
    let [showalert, setShowalert] = useState(true)
    let [count, setCount] = useState(0)
    let [탭, 탭변경] = useState(0)

    let {id} = useParams();
    let matching = props.shoes.find(function(x){
        return x.id == id
    });
    let [fade, setFade] = useState('')
    let [fade2, setFade2] = useState('')
    

    useEffect(()=>{
        setTimeout(()=>{ setShowalert(false)},2000)
    },[])

    useEffect(()=>{  
        /* isNaN에서 숫자는 false니까 */
      if(num !== '' && isNaN(num)){
        alert('숫자를 입력하세요')
      } 
    },[num])

    useEffect(()=>{
            setFade2('end')
        return()=>{
            setFade('')
        }
    },[])
    
    useEffect(()=>{
        let 꺼낸거 = localStorage.getItem('watched')
        꺼낸거 = JSON.parse(꺼낸거) || [];
        꺼낸거 = 꺼낸거.filter((id)=>{ 
            return id !== matching.id
        }) 
        꺼낸거.unshift(matching.id);

        if(꺼낸거.length > 5){
            꺼낸거.pop();
        }

        localStorage.setItem('watched',JSON.stringify(꺼낸거))
    },[])


  /*   matching에 통과한 자료없을때 뜨는 건데 404만들어서 상관없을 것 같지만 if 위치 기록용
    if(!matching){
        return <div>상품을 찾을 수 없습니다. </div>
    } */

    


    return(
        <div className={"container start " + fade2} >
            {
                showalert == true
                ? <div className="alert alert-warning">2초 이내 구매시 할인</div> 
                : null
            }

            {/* 
            {username}
             */}

        
            
        
            
            <div className="row">
                <div className="col-md-6">
                    <img src={"https://codingapple1.github.io/shop/shoes"+ (Number(id) + 1)+".jpg"}width="100%" />
                </div>
                <div className="col-md-6">
                    <input onChange={(e)=>{setNum(e.target.value)}} />

                    <Button  variant="light" onClick={()=>{addLike()}}>♥</Button>{like}

                    <h4 className="pt-5">{matching.title}</h4>
                    <p>{matching.content}</p>
                    <p>{matching.price}</p>
                    <button className="btn btn-danger" onClick={()=>{
                        dispatch(addItem({id:matching.id, name:matching.title, count:1}))
                    }}>주문하기</button>
                    
                </div>
            </div>

            <Nav fill variant="tabs" defaultActiveKey="link0" style={{margin:'40px 0'}}>
                <Nav.Item>
                    <Nav.Link eventKey="link0" onClick={()=>{탭변경(0)}}>버튼0</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="link1"  onClick={()=>{탭변경(1)}}>버튼1</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="link2" onClick={()=>{탭변경(2)}}>버튼2</Nav.Link>
                </Nav.Item>
            </Nav>
            
           <TabContent 탭={탭}/>

        </div>
    )
};

function TabContent({탭}){

    let [fade, setFade] = useState('')
    let {재고} = useContext(Context1)

    useEffect(()=>{
        let a = setTimeout(()=>{setFade('end')},100)
        
        return ()=>{
            clearTimeout(a)
            setFade('')
        }
    },[탭])

 return (
    <div className={"start " + fade}>
    {[<div>내용0 </div>, <div>내용1</div>, <div>내용2</div>][탭]}
    </div>
 )


}

export default Detail