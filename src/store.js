import { configureStore, createSlice } from "@reduxjs/toolkit"


let user = createSlice({
    name : 'user',
    initialState : 'kim',
    reducers : {
        changeName(state){
            return 'john ' + state
        }
    }

})

export let { changeName } = user.actions



let stock = createSlice({
    name : 'stock',
    initialState : [10,11,12]
})

let cartitems = createSlice({
    name : 'cartitems',
    initialState : [
        {id:0, name:'white and Black', count:2},
        {id:2, name:'Grey Yordan', count:1}
    ],
    reducers : {
        increase(state,action){
           let 번호 = state.findIndex((a)=>{return a.id == action.payload }) 
            state[번호].count++
        },
        addItem(state, action){
            let found = state.find((x)=> x.id === action.payload.id)

            if(found){
                found.count++
            }else{
                state.push(action.payload)
            }
            
        },
        removeItem(state,action){
            let ididx = state.findIndex((r)=>{return r.id == action.payload.id})
            state.splice(ididx,1)
        },
        
        
    }

})

export let { increase, addItem, removeItem} = cartitems.actions




export default configureStore({
    reducer: {
        user : user.reducer,
        stock : stock.reducer,
        cartitems : cartitems.reducer 
    }
})