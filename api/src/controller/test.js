R=require('ramda')
a=require('./index')


const {
    user,
    doc,
    reply,
    favor,
    like:like1,
    dislike,
    report,
    sequelize,
}=a



u=R.range(1,10).map(x=>({user_name:x}))

d=[
    R.repeat({UserId:3,content:"ddd"},5),
    R.repeat({UserId:2,content:"ccc"},5),
].flat()

r=[
    {UserId:3,DocId:3,content:"ddd"},
    {UserId:1,DocId:2,content:"eee"},
]

l=[
    R.repeat({UserId:2,DocId:2},3),
    R.repeat({UserId:3,DocId:3},3),
    R.repeat({UserId:3,DocId:4},3),
].flat()


f=[
    {name:"ccc",UserId:2,DocId:2},
    {name:"ddd",UserId:3,DocId:2},
]

re=[
    {UserId:2,DocId:2},
    {UserId:3,DocId:2},
]




test=async ()=>{

    r1=await a.user.creates(u)

    r2=await a.doc.creates(d)
    r3=await a.reply.creates(r)
    r4=await a.like.creates(l)
    r5=await a.dislike.creates(l)
    r6=await a.favor.creates(f)
    r7=await a.report.creates(re)

    like=a.like.client

    z1=await like.findAll({
         //attributes: ['id','UserId' ],
         group: ['Like.id','Like.DocId'],
    }).then(x=>x.map(x=>x.toJSON()))

    z2=await like.findAll({
         attributes: ['id','UserId', 'DocId',[sequelize.fn('count', sequelize.col('DocId')),"zzz"]],
         group: ['Like.id','Like.DocId'] ,
    }).then(x=>x.map(x=>x.toJSON()))

    z3=await like.findAll({
         attributes: [[sequelize.fn('count', sequelize.col('DocId')),"zzz"]],
    }).then(x=>x.map(x=>x.toJSON()))

  //  [ { zzz: '9' } ]

    like.findAll({
      attributes: {include: [[sequelize.fn('COUNT', sequelize.col('DocId')), 'zzz']]},
      group: ['Like.id','Like.DocId'],
    })

    like.findAll({
      attributes: { exclude: ['id'] }
    })



    like.findAll({
        offset: 5,
        limit: 5,
        order:[
           ['id', 'DESC'],
           ['updatedAt','DESC'],
        ],
    })


    like.findAll({include: [
        { model: user.client, },
        { model: doc.client, },
    ]}).then(x=>x.map(x=>x.toJSON()))

    like.findAll({
        where:{
            id:1,
        },
        include: [
            { model: user.client, },
            { model: doc.client, },
        ]
    }).then(x=>x.map(x=>x.toJSON()))

    like.findOne({
        where:{
            id:1,
        },
        include: [
            { model: user.client, },
            { model: doc.client, },
        ]
    }).then(x=>x.toJSON())

    f1=await a.followed.create({UserId:1,uid:2})
    f2=await a.followed.create({UserId:2,uid:1})
    f3=await a.followed.list()
    f4=await a.user.list2()

}





test2=async ()=>{
    process.env.NODE_ENV="production"
    process.env.PG_CONNECT_STRING=process.env.rice_pg
    a=require("./index")
    a.user.create({"user_name":"🌾学家"})
}


test1=async ()=>{
    //sequelize = conn()

    d={
      user_name: 'ccc',
      birthday: new Date(1980, 6, 20),
      job:"ccc",
    /*
      id:1,
      updatedAt: 2020-05-04T02:30:41.022Z,
      createdAt: 2020-05-04T02:30:41.022Z
    */
    }
    d1={ user_name: "Doe" }
    o={ where: { user_name: "ccc" } }

    r=await User.create(d)
    console.log(r.dataValues)

    d2=R.range(1,20).map(x=>({user_name:x}))
    rn=await User.bulkCreate(d2)

    r1=await User.findAll()
    r2=await User.destroy(o)

    r3=await User.findAll() //[]
    r30 = await User.findByPk(123) //id=123 ? null

    r4=await User.create(d)
    r4.user_name="ccc"
    r4.save()

    r5=await User.update({user_name:"111"},o) //[1]
    r6=await User.findOne({where:{...d1}}) //null or user

    r7=await User.findOrCreate({
        where: {user_name: 'sdepold'},
        defaults: {job: 'Technical Lead JavaScript'}}
    )

    //r7.map(x=>x.dataValues)
    //r7.map(x=>x.toJSON())

    r8=await User.findOrCreate({
        where: {user_name: 's'},
        defaults: {
            job: 'ddd',
            i:"123", //自动忽略
        }}
    )

    r9=await User.findOrCreate({
            where: {user_name: 'saa'},
            defaults: {
            }}
        )


    console.log(r)
    console.log(r1)
    console.log(r.toJSON())

}




