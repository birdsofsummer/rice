const { Sequelize, Model, DataTypes,Op } = require('sequelize');

const {
    ABSTRACT,
    STRING,
    CHAR,
    TEXT,
    NUMBER,
    TINYINT,
    SMALLINT,
    MEDIUMINT,
    INTEGER,
    BIGINT,
    FLOAT,
    TIME,
    DATE,
    DATEONLY,
    BOOLEAN,
    NOW,
    BLOB,
    DECIMAL,
    NUMERIC,
    UUID,
    UUIDV1,
    UUIDV4,
    HSTORE,
    //JSON,
    JSONB,
    VIRTUAL,
    ARRAY,
    ENUM,
    RANGE,
    REAL,
    //DOUBLE PRECISION,
    DOUBLE,
    GEOMETRY,
    GEOGRAPHY,
    CIDR,
    INET,
    MACADDR,
    CITEXT,
    postgres,
    mysql,
    mariadb,
    sqlite,
    mssql,
}=DataTypes


const user={
    user_name: {
        type:STRING,
        allowNull:false,
        defaultValue:"rice",
        unique:true,
        //unique:"compositeIndex",
    },
    avatar: {
        type:STRING,
        allowNull:false,
        defaultValue:"//tvax3.sinaimg.cn/crop.0.0.512.512.180/00842TLkly8gef53f2n6qj30e80e80t2.jpg",
        unique:true,
        //unique:"compositeIndex",
    },
    password:{
        type:STRING,
        defaultValue:"123456",
        allowNull:false,
        unique:false,
    },
    status:{
        type:INTEGER,
        defaultValue:0,
        allowNull:false,
        unique:false,
    },
    email:{
        type:STRING,
        defaultValue:"",
        allowNull:true,
        unique:false,
    },
    phone:{
        type:STRING,
        defaultValue:"",
        allowNull:true,
        unique:false,
    },
    job: {
        type:STRING,
        defaultValue:"",
        allowNull:true,
        unique:false,
    },
    birthday:{
        type:DATE,
        defaultValue:new Date(),
        allowNull:true,
        unique:false,
    } ,
    //id:1,
    //updatedAt: 2020-05-04T02:30:41.022Z,
    //createdAt: 2020-05-04T02:30:41.022Z
}



const doc={
    title:{
        type:TEXT,
        defaultValue:"",
        allowNull:true,
        unique:false,
    },
    content:{
        type:TEXT,
        defaultValue:"",
        allowNull:true,
        unique:false,
    },
    status:{
        type:INTEGER,
        defaultValue:0,
        allowNull:false,
        unique:false,
    },
    img:{
        type:ARRAY(STRING),
        defaultValue:[],
        allowNull:true,
        unique:false,
    },
    files:{
        type:ARRAY(STRING),
        defaultValue:[],
        allowNull:true,
        unique:false,
    },
    tag:{
        type:ARRAY(STRING),
        defaultValue:[],
        allowNull:true,
        unique:false,
    },
}

const reply={
    type:{
        type:INTEGER,
        allowNull:true,
        defaultValue:0,
        unique:false,
        //unique:"compositeIndex",
    },
    parent:{
        type:INTEGER,
        allowNull:true,
        defaultValue:0,
        unique:false,
        //unique:"compositeIndex",
    },
    content:{
        type:TEXT,
        defaultValue:"",
        allowNull:true,
        unique:false,
    },
    like:{
        type:ARRAY(INTEGER),
        defaultValue:[],
        allowNull:false,
        unique:false,
    },
}

const like={
    type:{
        type:INTEGER,
        allowNull:true,
        defaultValue:1,
        unique:false,
        //unique:"compositeIndex",
    },
}

const dislike={
    type:{
        type:INTEGER,
        allowNull:true,
        defaultValue:0,
        unique:false,
        //unique:"compositeIndex",
    },
}

const report={
    content:{
        type:TEXT,
        defaultValue:"",
        allowNull:true,
        unique:false,
    },
}

const favor={
    name:{
        type:STRING,
        defaultValue:"",
        allowNull:true,
        unique:false,
    },
}


const sign={
    date:{
        type:FLOAT,
        defaultValue:new Date().getTime(),
        allowNull:true,
        unique:false,
     // validate: {
     //     is: ["[a-z]",'i'],        // will only allow letters
     //     max: 23,                  // only allow values <= 23
     //     isIn: {
     //       args: [['en', 'zh']],
     //       msg: "Must be English or Chinese"
     //     }
     //   },
    },
}

const following={
    uid: {
        type:INTEGER,
        allowNull:false,
        defaultValue:0,
        unique:false,
    },
}

const followed={
    uid: {
        type:INTEGER,
        allowNull:false,
        defaultValue:0,
        unique:false,
    },
}


const message={
    title:{
        type:TEXT,
        defaultValue:"",
        allowNull:true,
        unique:false,
    },
    content:{
        type:TEXT,
        defaultValue:"",
        allowNull:true,
        unique:false,
    },
    status:{
        type:INTEGER,
        defaultValue:0,
        allowNull:false,
        unique:false,
    },
    img:{
        type:ARRAY(STRING),
        defaultValue:[],
        allowNull:true,
        unique:false,
    },
    files:{
        type:ARRAY(STRING),
        defaultValue:[],
        allowNull:true,
        unique:false,
    },
    to:{
        type:INTEGER,
        defaultValue:0,
        allowNull:false,
        unique:false,
    },
}


const img={
    url:{
        type:STRING,
        defaultValue:"",
        allowNull:false,
        unique:true,
    },
}

const tag={
    name:{
        type:STRING,
        defaultValue:"",
        allowNull:false,
        unique:true,
    },
}

const test={
  bar: {
    type: Sequelize.STRING,
    allowNull: true,
    validate: {
      is: ["^[a-z]+$",'i'],     // will only allow letters
      is: /^[a-z]+$/i,          // same as the previous example using real RegExp
      not: ["[a-z]",'i'],       // will not allow letters
      isEmail: true,            // checks for email format (foo@bar.com)
      isUrl: true,              // checks for url format (http://foo.com)
      isIP: true,               // checks for IPv4 (129.89.23.1) or IPv6 format
      isIPv4: true,             // checks for IPv4 (129.89.23.1)
      isIPv6: true,             // checks for IPv6 format
      isAlpha: true,            // will only allow letters
      isAlphanumeric: true,     // will only allow alphanumeric characters, so "_abc" will fail
      isNumeric: true,          // will only allow numbers
      isInt: true,              // checks for valid integers
      isFloat: true,            // checks for valid floating point numbers
      isDecimal: true,          // checks for any numbers
      isLowercase: true,        // checks for lowercase
      isUppercase: true,        // checks for uppercase
      notNull: true,            // won't allow null
      isNull: true,             // only allows null
      notEmpty: true,           // don't allow empty strings
      equals: 'specific value', // only allow a specific value
      contains: 'foo',          // force specific substrings
      notIn: [['foo', 'bar']],  // check the value is not one of these
      isIn: [['foo', 'bar']],   // check the value is one of these
      notContains: 'bar',       // don't allow specific substrings
      len: [2,10],              // only allow values with length between 2 and 10
      isUUID: 4,                // only allow uuids
      isDate: true,             // only allow date strings
      isAfter: "2011-11-05",    // only allow date strings after a specific date
      isBefore: "2011-11-05",   // only allow date strings before a specific date
      max: 23,                  // only allow values <= 23
      min: 23,                  // only allow values >= 23
      isCreditCard: true,       // check for valid credit card numbers

      // Examples of custom validators:
      isEven(value) {
        if (parseInt(value) % 2 !== 0) {
          throw new Error('Only even values are allowed!');
        }
      },
      isGreaterThanOtherField(value) {
        if (parseInt(value) <= parseInt(this.otherField)) {
          throw new Error('Bar must be greater than otherField.');
        }
      }
    }
  }
}

module.exports={
    user,
    doc,
    reply,
    like,
    dislike,
    report,
    favor,
    sign,
    following,
    followed,
    message,
    img,
    tag,
}

