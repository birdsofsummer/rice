node index.js


host=localhost:10087


curl ${host}/user
curl ${host}/doc
curl ${host}/like
curl ${host}/dislike
curl ${host}/reply
curl ${host}/report
curl ${host}/favor



curl ${host}/user \
    -H "content-type: application/json" \
    -d '{"user_name":"1","email":"dd@dd","job":"sss","phone":"123"}'

curl ${host}/doc \
    -H "content-type: application/json" \
    -d '{"title":"123","content":"ddd","UserId":1}'

curl ${host}/reply \
    -H "content-type: application/json" \
    -d '{"parent":1,"content":"ssss","DocId":1,"UserId":1}'

curl ${host}/like \
    -H "content-type: application/json" \
    -d '{"type":1,"DocId":1,"UserId":1}'

curl ${host}/dislike \
    -H "content-type: application/json" \
    -d '{"type":0,"DocId":1,"UserId":1}'

curl ${host}/report \
    -H "content-type: application/json" \
    -d '{"content":"dddd","DocId":1,"UserId":1}'

curl ${host}/favor \
    -H "content-type: application/json" \
    -d '{"name":"dddd","DocId":1,"UserId":1}'




curl ${host}/doc -X DELETE  \
    -H "content-type: application/json" \
    -d '{"ids":[1,2,3,4,5,6]}'


curl ${host}/user -X DELETE  \
    -H "content-type: application/json" \
    -d '{"ids":[1,2,3]}'


