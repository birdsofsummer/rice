a=rsa_private_key.pem
b=rsa_private_key.pem

openssl genrsa -out $a  1024
openssl rsa -in $a -pubout -out $b
