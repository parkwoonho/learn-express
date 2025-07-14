console.log("ok")


//crud
const express = require("express");
const app = express(); // express 구축
const dotenv = require("dotenv");
const { users } = require("./data");

//json 이 파싱되어 백엔드코드에서 사용가능 
app.use(express.json());
app.use(express.urlencoded({
    extended:true
}));

//환경변수 로드 
dotenv.config();
//CURD
app.get('/user', (req,res)=> {
    res.json({message : "테스트중입니다. user ",
              content : "Test"
         
    }).status(200).end();
});

//특정 ID값의 데이터 조회
// /user/id값


app.get("/user/:id", (req, res)=>{
    const id = req.params.id;
    console.log("🚀 ~ app.get ~ id:", id, "type", typeof id );
    console.log(users)
    
    const findItem = users.find((item) => {
        if(item.id === Number(id)){;
            return id;
        };
    })
    
    console.log("🚀 ~ findItem ~ findItem:", findItem)
    
    if(!findItem){
        //null 이면         
        res.status(404).json({message: "사용자를 찾을수 없습니다."});
    }else{
        //매칭된사용자가있는경우
        res.status(200).json(findItem);        
    }
    

})


//사용자입력값 받아서 id를 포함한 객체를 users에 추가한 후에
//users 데이터 반환 
app.post('/user/:id,:name,:mbti', (req, res)=>{

    const id = req.params.id;
    const name = req.params.name;
    const mbti = req.params.mbti;

    console.log("users 값 : ", users );
    console.log("받아온 값 id  : ", id );
    console.log("받아온 값 name : ", name );
    console.log("받아온 값 mbti : ", mbti );

    users.push(
        {   id: Number(id),
            name : name,
            mbti : mbti
        }

    );
    console.log("users 값 : ", users );

    const findItem = users.find((item) => {
        if(item.id === Number(id)){;
            return id;
        };
    })


    if(!findItem){
        //null 이면         
        res.status(500).json({message: "사용자를 추가하지 못했습니다."});
    }else{
        //매칭된사용자가있는경우
        res.status(201).json(findItem);        
    }
    
    // const userInfo = req.body
    // console.log("name : " , userInfo.name,
    //             "mbti : " , userInfo.mbti            
    //            )

    // res.status(201).json({
    //     id:Date.now(),
    //     name:userInfo.name +"t",
    //     mbti : `${userInfo.mbti} xx`
    // })
});






const PORT = process.env.PORT;


app.listen(PORT,() => {
    console.log("Server running at..", PORT);
})


