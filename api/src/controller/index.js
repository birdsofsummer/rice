const { Sequelize, Model, DataTypes,Op } = require('sequelize');
const R=require("ramda")

//https://sequelize.org/v5/manual/getting-started.html

const {
    adjacent,
    all,
    and,
    any,
    between,
    col,
    contained,
    contains,
    endsWith,
    eq,
    gt,
    gte,
    iLike,
    iRegexp,
    //in,
    is,
    join,
    like,
    lt,
    lte,
    ne,
    noExtendLeft,
    noExtendRight,
    not,
    notBetween,
    notILike,
    notIRegexp,
    notIn,
    notLike,
    notRegexp,
    or,
    overlap,
    placeholder,
    regexp,
    startsWith,
    strictLeft,
    strictRight,
    substring,
    values
}=Op


const conn=()=>{
    let o={
      pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
      }
    }
    const config=require("../config/config")
    const env=process.env.NODE_ENV || "development"
    if (env == "production") {
       // const {
       //    connectionString,
       //    host,
       //    port,
       //    user,
       //    password,
       //    dbname
       // }=postgresql.private
        let s=process.env.PG_CONNECT_STRING
        return new Sequelize(s,o)
    }else {
        const {
          //  username='postgres',
          //  password='postgres',
          //  database='rice',
          //  host='localhost',
          //  dialect="postgres",
            connectionString="",
        }=config[env]
        return new Sequelize(connectionString,o)
        //return new Sequelize( database, username , password, { host , dialect, })
    }
}

class User extends Model {}
class Doc extends Model {}
class Message extends Model {}
class Img extends Model {}
class Tag extends Model {}
class Reply extends Model {}
class Like extends Model {}
class Dislike extends Model {}
class Report extends Model {}
class Favor extends Model {}
class Sign extends Model {}

class Followed extends Model {}
class Following extends Model {}








const models=require("./models")

const init_db=(force=false)=>{
    let sequelize = conn()
    //sequelize.drop()
    let tables=[
        User,
        Doc,
        Reply,
        Like,
        Dislike,
        Report,
        Favor,
        Sign,
        Followed,
        Following,
        Message,
        Img,
        Tag,
    ]
    for (let a of tables) {
        //User.init(user_m, { sequelize, modelName: "users" })
        //await User.sync({ force: true })
        //let c=sequelize.define(a.name,...b)
        let m=models[a.name.toLowerCase()]
        a.init(m,{
            sequelize,
            modelName:a.tableName,
            //underscored: true,   // user_id
        })
    }

    User.beforeCreate(x=>{
        //console.log('1111111111',x.dataValues)
        if (x.dataValues.user_name == "rice") {
            let n="u" + Math.random().toString().slice(2)
            x.user_name = n
        }
    })

    User.hasMany(Followed)
    Followed.belongsTo(User)

    User.hasMany(Message)
    Message.belongsTo(User)

    User.hasMany(Img)
    Img.belongsTo(User)

    User.hasMany(Following)
    Following.belongsTo(User)

    User.hasMany(Sign)
    Sign.belongsTo(User)

    User.hasMany(Doc)
    Doc.belongsTo(User)

    User.hasMany(Reply)
    Reply.belongsTo(User)

    User.hasMany(Like)
    Like.belongsTo(User)

    User.hasMany(Dislike)
    Dislike.belongsTo(User)

    User.hasMany(Report)
    Report.belongsTo(User)

    User.hasMany(Favor)
    Favor.belongsTo(User)

    Doc.hasMany(Reply)
    Reply.belongsTo(Doc)

    Doc.hasMany(Favor)
    Favor.belongsTo(Doc)

    Doc.hasMany(Like)
    Like.belongsTo(Doc)

    Doc.hasMany(Dislike)
    Dislike.belongsTo(Doc)

    Doc.hasMany(Report)
    Report.belongsTo(Doc)


    //console.log(sequelize.models)
    console.log(sequelize.modelManager.models)
    const hooks=[
            "beforeAssociate",
            "beforeBulkCreate",
            "beforeBulkDestroy",
            "beforeBulkRestore",
            "beforeBulkSync",
            "beforeBulkUpdate",
            "beforeConnect",
            "beforeCount",
            "beforeCreate",
            "beforeDefine",
            "beforeDestroy",
            "beforeDisconnect",
            "beforeFind",
            "beforeFindAfterExpandIncludeAll",
            "beforeFindAfterOptions",
            "beforeInit",
            "beforeQuery",
            "beforeRestore",
            "beforeSave",
            "beforeSync",
            "beforeUpdate",
            "beforeUpsert",
            "beforeValidate",
            "afterAssociate",
            "afterBulkCreate",
            "afterBulkDestroy",
            "afterBulkRestore",
            "afterBulkSync",
            "afterBulkUpdate",
            "afterConnect",
            "afterCreate",
            "afterDefine",
            "afterDestroy",
            "afterDisconnect",
            "afterFind",
            "afterInit",
            "afterQuery",
            "afterRestore",
            "afterSave",
            "afterSync",
            "afterUpdate",
            "afterUpsert",
            "afterValidate",
      ]

   //  sequelize.addHook("beforeCount",({hooks, raw,...d})=>console.log(d))
   //  sequelize.addHook(hookType, name, fn)
   //  sequelize.beforeAssociate(name,callback)
   //  sequelize.beforeBulkCreate(name,callback)
   //  sequelize.beforeBulkDestroy(name,callback)
   //  sequelize.beforeBulkRestore(name,callback)
   //  sequelize.beforeBulkSync(name,callback)
   //  sequelize.beforeBulkUpdate(name,callback)
   //  sequelize.beforeConnect(name,callback)
   //  sequelize.beforeCount(name,callback)
   //  sequelize.beforeCreate(name,callback)
   //  sequelize.beforeDefine(name,callback)
   //  sequelize.beforeDestroy(name,callback)
   //  sequelize.beforeDisconnect(name,callback)
   //  sequelize.beforeFind(name,callback)
   //  sequelize.beforeFindAfterExpandIncludeAll(name,callback)
   //  sequelize.beforeFindAfterOptions(name,callback)
   //  sequelize.beforeInit(name,callback)
   //  sequelize.beforeQuery(name,callback)
   //  sequelize.beforeRestore(name,callback)
   //  sequelize.beforeSave(name,callback)
   //  sequelize.beforeSync(name,callback)
   //  sequelize.beforeUpdate(name,callback)
   //  sequelize.beforeUpsert(name,callback)
   //  sequelize.beforeValidate(name,callback)
   //  sequelize.afterAssociate(name,callback)
   //  sequelize.afterBulkCreate(name,callback)
   //  sequelize.afterBulkDestroy(name,callback)
   //  sequelize.afterBulkRestore(name,callback)
   //  sequelize.afterBulkSync(name,callback)
   //  sequelize.afterBulkUpdate(name,callback)
   //  sequelize.afterConnect(name,callback)
   //  sequelize.afterCreate(name,callback)
   //  sequelize.afterDefine(name,callback)
   //  sequelize.afterDestroy(name,callback)
   //  sequelize.afterDisconnect(name,callback)
   //  sequelize.afterFind(name,callback)
   //  sequelize.afterInit(name,callback)
   //  sequelize.afterQuery(name,callback)
   //  sequelize.afterRestore(name,callback)
   //  sequelize.afterSave(name,callback)
   //  sequelize.afterSync(name,callback)
   //  sequelize.afterUpdate(name,callback)
   //  sequelize.afterUpsert(name,callback)
   //  sequelize.afterValidate(name,callback)
    sequelize.sync({
        force,
    })
    return sequelize
}


const tojson=y=> y && y.toJSON ? y.toJSON():y
const tojsons=(x=[])=>x ? x.map(tojson) : []

const force = process.env.NODE_ENV ? false : true
var sequelize=init_db(force)


const curd=(m=User)=>({
    create:(d={})=>m.create(d).then(tojson),
    creates:(d=[])=>m.bulkCreate(d).then(tojsons),
    del:(where={})=>m.destroy({where}),
    find:(where={})=>m.findOne({where}).then(tojson),
    findbyid:(id)=>m.findByPk(id).then(tojson),
    findbyids:(ids=[])=>m.findAll({where:{id:ids}}).then(tojsons),
    list:()=>m.findAll().then(tojsons),
    create1:(where={},defaults={})=>m.findOrCreate({where,defaults}).then(tojson),
    update:(d={},where={})=>m.update(d,{where}), //[1]
    count:(where={})=>m.count({where}),
    client:m,
    db:sequelize,
})


const {
    create,
    verify,
    refresh,
}=require("./token")

const user={
    login:async ({user_name="",password=""})=>{
        let u=await User.findOne({
            attributes: { exclude: ['password'] },
            where:{user_name,password},
        }).then(tojson)
        return {user:u,token:create(u)}
    },
    registry:async (d={})=>{
         let u=await User.create(d).then(tojson)
         return {user:u,token:create(u)}
    },
    create:(d={})=>User.create(d).then(tojson),
    creates:(d=[])=>User.bulkCreate(d).then(tojsons),
    create1:(where={},defaults={})=>User.findOrCreate({where,defaults}).then(tojson),
    del:(where={})=>User.destroy({where}),
    find:(where={})=>User.findOne({where}).then(tojson),
    findbyid:(id)=>User.findByPk(id).then(tojson),
    findbyids:(ids=[])=>User.findAll({where:{id:ids}}).then(tojsons),
    list:()=>User.findAll({attributes: { exclude: ['password'] }}).then(tojsons),
    list1:()=>User.findAll({
        attributes: { exclude: ['password'] },
        include: [
                { model: Sign, },
                { model: Doc, },
                { model: Reply, },
                { model: Like, },
                { model: Dislike, },
                { model: Favor, },
                { model: Report, },
        ],
    }).then(tojsons),
    list2:()=>User.findAll({
        attributes: { exclude: ['password'] },
        include: [
            { all: true },
        ],
    }).then(tojsons),
    update:(d={},where={})=>User.update(d,{where}), //[1]
    count:(where={})=>User.count({where}),
    client:User,
    db:sequelize,
}

const doc={
    create:(d={})=>Doc.create(d).then(tojson),
    create1:(where={},defaults={})=>Doc.findOrCreate({where,defaults}).then(tojson),
    creates:(d=[])=>Doc.bulkCreate(d).then(tojsons),
    del:(where={})=>Doc.destroy({where}),
    find:(where={})=>Doc.findOne({
        where,
        include:[
            {all:true},
        ],
    }).then(tojson),
    findbyid:(id)=>Doc.findByPk(id).then(tojson),
    findbyids:(ids=[])=>Doc.findAll({where:{id:ids}}).then(tojsons),
    list:(d=[],offset=0,limit=100,)=>Doc.findAll({
        where:{
            'tag':{[Op.contains]:d}
        },
        order: [
            ['id', 'DESC'],
            ['createdAt', 'DESC'],
            ['updatedAt', 'DESC'],
        ],
        include: [
                { model: User, },
                { model: Reply, },
                { model: Like, },
                { model: Dislike, },
                { model: Favor, },
                { model: Report, },
            ],
        }).then(tojsons),
    update:(d={},where={})=>Doc.update(d,{where}), //[1]
    count:(where={})=>Doc.count({where}),
    client:Doc,
    db:sequelize,
}

const reply={
    create:(d={})=>Reply.create(d).then(tojson),
    create1:(where={},defaults={})=>Reply.findOrCreate({where,defaults}).then(tojson),
    creates:(d=[])=>Reply.bulkCreate(d).then(tojsons),
    del:(where={})=>Reply.destroy({where}),
    find:(where={})=>Reply.findOne({where}).then(tojson),
    findbyid:(id)=>Reply.findByPk(id).then(tojson),
    findbyids:(ids=[])=>Reply.findAll({where:{id:ids}}).then(tojsons),
    list:()=>Reply.findAll().then(tojsons),
    update:(d={},where={})=>Reply.update(d,{where}), //[1]
    count:(where={})=>Reply.count({where}),
    client:Reply,
    db:sequelize,
}

const like1={
    create:(d={})=>Like.create(d).then(tojson),
    create1:(where={},defaults={})=>Like.findOrCreate({where,defaults}).then(tojson),
    creates:(d=[])=>Like.bulkCreate(d).then(tojsons),
    del:(where={})=>Like.destroy({where}),
    find:(where={})=>Like.findOne({where}).then(tojson),
    findbyid:(id)=>Like.findByPk(id).then(tojson),
    findbyids:(ids=[])=>Like.findAll({where:{id:ids}}).then(tojsons),
    list:()=>Like.findAll().then(tojsons),
    update:(d={},where={})=>Like.update(d,{where}), //[1]
    count:(where={})=>Like.count({where}),
    client:Like,
    db:sequelize,

}

const dislike={
    create:(d={})=>Dislike.create(d).then(tojson),
    create1:(where={},defaults={})=>Dislike.findOrCreate({where,defaults}).then(tojson),
    creates:(d=[])=>Dislike.bulkCreate(d).then(tojsons),
    del:(where={})=>Dislike.destroy({where}),
    find:(where={})=>Dislike.findOne({where}).then(tojson),
    findbyid:(id)=>Dislike.findByPk(id).then(tojson),
    findbyids:(ids=[])=>Dislike.findAll({where:{id:ids}}).then(tojsons),
    list:()=>Dislike.findAll().then(tojsons),
    update:(d={},where={})=>Dislike.update(d,{where}), //[1]
    count:(where={})=>Dislike.count({where}),
    client:Dislike,
    db:sequelize,
}

const favor={
    create:(d={})=>Favor.create(d).then(tojson),
    create1:(where={},defaults={})=>Favor.findOrCreate({where,defaults}).then(tojson),
    creates:(d=[])=>Favor.bulkCreate(d).then(tojsons),
    del:(where={})=>Favor.destroy({where}),
    find:(where={})=>Favor.findOne({where}).then(tojson),
    findbyid:(id)=>Favor.findByPk(id).then(tojson),
    findbyids:(ids=[])=>Favor.findAll({where:{id:ids}}).then(tojsons),
    list:()=>Favor.findAll().then(tojsons),
    update:(d={},where={})=>Favor.update(d,{where}), //[1]
    count:(where={})=>Favor.count({where}),
    client:Favor,
    db:sequelize,
}


const report={
    create:(d={})=>Report.create(d).then(tojson),
    create1:(where={},defaults={})=>Report.findOrCreate({where,defaults}).then(tojson),
    creates:(d=[])=>Report.bulkCreate(d).then(tojsons),
    del:(where={})=>Report.destroy({where}),
    find:(where={})=>Report.findOne({where}).then(tojson),
    findbyid:(id)=>Report.findByPk(id).then(tojson),
    findbyids:(ids=[])=>Report.findAll({where:{id:ids}}).then(tojsons),
    list:()=>Report.findAll().then(tojsons),
    update:(d={},where={})=>Report.update(d,{where}), //[1]
    count:(where={})=>Report.count({where}),
    client:Report,
    db:sequelize,
}



const sign={
    create:(d={})=>Sign.create(d).then(tojson),
    create1:(where={},defaults={})=>Sign.findOrCreate({where,defaults}).then(tojson),
    creates:(d=[])=>Sign.bulkCreate(d).then(tojsons),
    del:(where={})=>Sign.destroy({where}),
    find:(where={})=>Sign.findOne({where}).then(tojson),
    findbyid:(id)=>Sign.findByPk(id).then(tojson),
    findbyids:(ids=[])=>Sign.findAll({where:{id:ids}}).then(tojsons),
    list:()=>Sign.findAll().then(tojsons),
    update:(d={},where={})=>Sign.update(d,{where}), //[1]
    count:(where={})=>Sign.count({where}),
    client:Sign,
    db:sequelize,
}


const following={
    create:(d={})=>Following.create(d).then(tojson),
    create1:(where={},defaults={})=>Following.findOrCreate({where,defaults}).then(tojson),
    creates:(d=[])=>Following.bulkCreate(d).then(tojsons),
    del:(where={})=>Following.destroy({where}),
    find:(where={})=>Following.findOne({where}).then(tojson),
    findbyid:(id)=>Following.findByPk(id).then(tojson),
    findbyids:(ids=[])=>Following.findAll({where:{id:ids}}).then(tojsons),
    list:()=>Following.findAll({
         include: [{ all: true }]
    }).then(tojsons),
    update:(d={},where={})=>Following.update(d,{where}), //[1]
    count:(where={})=>Following.count({where}),
    client:Following,
    db:sequelize,
}

const followed={
    create:(d={})=>Followed.create(d).then(tojson),
    create1:(where={},defaults={})=>Followed.findOrCreate({where,defaults}).then(tojson),
    creates:(d=[])=>Followed.bulkCreate(d).then(tojsons),
    del:(where={})=>Followed.destroy({where}),
    find:(where={})=>Followed.findOne({where}).then(tojson),
    findbyid:(id)=>Followed.findByPk(id).then(tojson),
    findbyids:(ids=[])=>Followed.findAll({where:{id:ids}}).then(tojsons),
    list:()=>Followed.findAll({
         include: [{ all: true }]
    }).then(tojsons),
    update:(d={},where={})=>Followed.update(d,{where}), //[1]
    count:(where={})=>Followed.count({where}),
    client:Followed,
    db:sequelize,
}


const message={
    create:(d={})=>Message.create(d).then(tojson),
    create1:(where={},defaults={})=>Message.findOrCreate({where,defaults}).then(tojson),
    creates:(d=[])=>Message.bulkCreate(d).then(tojsons),
    del:(where={})=>Message.destroy({where}),
    find:(where={})=>Message.findOne({where}).then(tojson),
    findbyid:(id)=>Message.findByPk(id).then(tojson),
    findbyids:(ids=[])=>Message.findAll({where:{id:ids}}).then(tojsons),
    list:()=>Message.findAll({
         include: [{ all: true }]
    }).then(tojsons),
    update:(d={},where={})=>Message.update(d,{where}), //[1]
    count:(where={})=>Message.count({where}),
    client:Message,
    db:sequelize,
}

const img={
    create:(d={})=>Img.create(d).then(tojson),
    create1:(where={},defaults={})=>Img.findOrCreate({where,defaults}).then(tojson),
    creates:(d=[])=>Img.bulkCreate(d).then(tojsons),
    del:(where={})=>Img.destroy({where}),
    find:(where={})=>Img.findOne({where}).then(tojson),
    findbyid:(id)=>Img.findByPk(id).then(tojson),
    findbyids:(ids=[])=>Img.findAll({where:{id:ids}}).then(tojsons),
    list:()=>Img.findAll({
         include: [{ all: true }]
    }).then(tojsons),
    update:(d={},where={})=>Img.update(d,{where}), //[1]
    count:(where={})=>Img.count({where}),
    client:Img,
    db:sequelize,
}

const tag={
    create:(d={})=>Tag.create(d).then(tojson),
    create1:(where={},defaults={})=>Tag.findOrCreate({where,defaults}).then(tojson),
    creates:(d=[])=>Tag.bulkCreate(d).then(tojsons),
    del:(where={})=>Tag.destroy({where}),
    find:(where={})=>Tag.findOne({where}).then(tojson),
    findbyid:(id)=>Tag.findByPk(id).then(tojson),
    findbyids:(ids=[])=>Tag.findAll({where:{id:ids}}).then(tojsons),
    list:()=>Tag.findAll({
         include: [{ all: true }]
    }).then(tojsons),
    update:(d={},where={})=>Tag.update(d,{where}), //[1]
    count:(where={})=>Tag.count({where}),
    client:Tag,
    db:sequelize,
}

const db={
    init_db,
    drop_db:async ()=>{
        process.env.NODE_ENV="production"
        process.env.PG_CONNECT_STRING=process.env.rice_pg
        init_db(true)
    },
    init_doc:async ()=>{
        let u={"user_name":"🌾学家"}
        let d={
            "title": "西江月·夜行黄沙道中",
            "content": "<p>明月别枝惊鹊，</p><p>清风半夜鸣蝉。</p><p>稻花香里说丰年，</p><p>听取蛙声一片。&nbsp;<br>七八个星天外，</p><p>两三点雨山前。</p><p>旧时茅店社林边，</p><p>路转溪桥忽见</p>",
            "img": [],
            "tag": [],
            "files": [],
            "UserId": 1
        }
       await User.create(u)
       await Doc.create(d)
    },
}




module.exports={
    user,
    doc,
    reply,
    like:like1,
    dislike,
    report,
    favor,
    sequelize,
    sign,
    token:{create, verify, refresh,},
    following,
    followed,
    message,
    img,
    tag,
    db,
}





























