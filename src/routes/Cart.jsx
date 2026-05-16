import {Table, Button} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { changeName, increase, removeItem } from './../store.js'

function Cart(){
    let state = useSelector((state)=>{return state})
    /* console.log(a.stock) */
    let rowCont = useSelector((state)=>{return state.cartitems})
    let dispatch = useDispatch()
    

    return(
        <div>
            {state.user}의 장바구니
           
            <Table bordered hover>
            <thead>
                <tr>
                <th></th>
                <th>상품명</th>
                <th>수량</th>
                <th>변경하기</th>
                <th>삭제</th>
                </tr>
            </thead>
            <tbody>
               {
                rowCont.map((cont,i)=>{
                    return(
                        <CartRow key={cont.id} i={i} cont={cont} />
                    )
                })
                }
            </tbody>
            </Table>
        </div>
    )
}

function CartRow(props){
    
     let dispatch = useDispatch()

    return(
        <>
        <tr>
            <td>{props.cont.id}</td>
            <td>{props.cont.name}</td>
            <td>{props.cont.count}</td>
            <td><Button variant="outline-dark" onClick={()=>{
                    dispatch(increase(props.cont.id))
                }}>+</Button></td>
            <td><Button variant="outline-danger" onClick={()=>{
                dispatch(removeItem(props.cont))
            }}>x</Button></td>
        </tr>
        </>
    )
}


export default Cart