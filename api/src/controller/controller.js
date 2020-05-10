'use strict';

const { Pool } = require('pg');

function ApiError(code, msg) {
  const e = new Error(msg);
  e.code = code;
  return e;
}

// init mysql connection
function initPgPool() {
  const pool = new Pool({
    connectionString: process.env.PG_CONNECT_STRING,
  });

  // init table
  pool.query(`CREATE TABLE IF NOT EXISTS users (
    ID serial NOT NULL,
    NAME           TEXT         NOT NULL,
    EMAIL          CHAR(50)     NOT NULL,
    SITE          CHAR(50)     NOT NULL
  );`);

  pool.query(`CREATE TABLE IF NOT EXISTS doc (
    ID serial NOT NULL,
    TITLE           TEXT         NOT NULL,
    CONTENT         TEXT         NOT NULL,
    AUTHOR          TEXT         ,
    TIME            TEXT         ,
  );`);

  pool.query(`CREATE TABLE IF NOT EXISTS reply (
    ID serial NOT NULL,
    DOC           TEXT         NOT NULL,
    CONTENT         TEXT         NOT NULL,
  );`);

  pool.query(`CREATE TABLE IF NOT EXISTS like (
    DOC           TEXT         NOT NULL,
    N             TEXT         NOT NULL,
  );`);

  return pool;

}

const pool = initPgPool();

const insert_sql=(d={},table="doc",)=>{
     let kk=Object.keys(d)
        // 'INSERT INTO users(name, email, site) VALUES($1, $2, $3)'
     let text="INSERT INTO "+table+ "(" + kk.join(", ") + ") " +"VALUES(" + kk.map((x,i)=>"$"+(i+1)).join(", ") +")"
     let r={
          text,
          values: kk.map(x=>d[x]),
     }
    return r
}

const CRUD=(table="doc")=>{
    return {
        async list() {
            const client = await pool.connect();
            const { rows } = await client.query({
              text: 'select * from ' + table,
            });
            await client.end();
            return rows;
        },
        async get(id=[]){
            try {
              const client = await pool.connect();
              const { rows } = await client.query({
                text: 'SELECT * FROM "+table+ " WHERE id = $1',
                values: id,
              });
              await client.end();
              if (rows.length > 0) {
                return rows;
              }
              return false;
            } catch (e) {
              throw new ApiError(1001, e);
            }
        },
        async remove(id=[]){
            const client = await pool.connect();
            const { rows } = await client.query({
              text: 'DELETE FROM "+table+" WHERE id = $1',
              values: id,
            });
            await client.end();
            return rows;
        },
        async insert(d={}){
            //const existUser = await this.getUserByName(name);
            //if (existUser) {
            //  throw new ApiError(1000, `Name ${name} exist.`);
            //}
            const client = await pool.connect();
            let sql=insert_sql(d,table)
            const r= await client.query(sql);
            await client.end();
            console.log(r)
            return r.rowCount==1
        },
    }
}




const Doc=CRUD("doc")
const Reply=CRUD("reply")
const Like=CRUD("like")

const User={
  async getUserList() {
    const client = await pool.connect();
    const { rows } = await client.query({
      text: 'select * from users',
    });
    await client.end();
    return rows;
  },
  async createUser(user) {
    const { name, email, site } = user;
    const existUser = await this.getUserByName(name);
    if (existUser) {
      throw new ApiError(1000, `Name ${name} exist.`);
    }
    const client = await pool.connect();
    const { rowCount } = await client.query({
      text: 'INSERT INTO users(name, email, site) VALUES($1, $2, $3)',
      values: [name, email, site],
    });
    await client.end();
    return rowCount === 1;
  },
  async getUserByName(name) {
    try {
      const client = await pool.connect();
      const { rows } = await client.query({
        text: 'SELECT * FROM users WHERE name = $1',
        values: [name],
      });
      await client.end();
      if (rows.length > 0) {
        return rows;
      }
      return false;
    } catch (e) {
      throw new ApiError(1001, e);
    }
  },
  async deleteUserByName(name) {
    const client = await pool.connect();
    const { rows } = await client.query({
      text: 'DELETE FROM users WHERE name = $1',
      values: [name],
    });
    await client.end();
    return rows;
  },
};






module.exports = {
    UserController:User,
    DocController:Doc,
    ReplyController:Reply,
    LikeController:Like,
}
