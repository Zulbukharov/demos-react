package main

// {
// 	"https://hasura.io/jwt/claims": {
// 	  "x-hasura-default-role": "user",
// 	  "x-hasura-allowed-roles": [
// 		"user"
// 	  ],
// 	  "x-hasura-user-id": "1"
// 	 }
//   }

import (
	"fmt"
	"time"

	"github.com/dgrijalva/jwt-go"
	// "strconv"
	// "crypto/md5"
	// "encoding/hex"
)

var jwtSecret = []byte("opa")

type HasuraClaims struct {
	xHasuraDefaultRole		string		`form:"x-hasura-default-role" db:"x-hasura-default-role" json:"x-hasura-default-role"`
	xHasuraAllowedRoles		[]string	`form:"x-hasura-allowed-roles" db:"x-hasura-allowed-roles" json:"x-hasura-allowed-roles"`
	xHasuraUserId			string		`form:"x-hasura-user-id" db:"x-hasura-user-id" json:"x-hasura-user-id"`
}

type Claims struct {
	HasuraClaims			map[string]interface{} `form:"https://hasura.io/jwt/claims" db:"https://hasura.io/jwt/claims" json:"https://hasura.io/jwt/claims"`
	jwt.StandardClaims
}

func GenerateToken(id string) (string, error) {
	nowTime := time.Now()
	// expireTime := nowTime.Add(3 * time.Hour)
	expireTime := nowTime.Add(1 * time.Hour)
	a := make([]string, 1)
	a[0] = "user"
	claims := &Claims{
		map[string]interface{}{
			"x-hasura-default-role": "user",
			"x-hasura-allowed-roles": a,
			"x-hasura-user-id": "1",
		},
		jwt.StandardClaims{
			ExpiresAt: expireTime.Unix(),
			Issuer:    "gin-blog",
		},
	}
	fmt.Println(claims.HasuraClaims)
	tokenClaims := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	token, err := tokenClaims.SignedString(jwtSecret)

	return token, err
}

func ParseToken(token string) (*Claims, error) {
	tokenClaims, err := jwt.ParseWithClaims(token, &Claims{}, func(token *jwt.Token) (interface{}, error) {
		return jwtSecret, nil
	})
	// fmt.Println("[jwt.Valid]", tokenClaims.Valid)
	if tokenClaims != nil {
		if claims, ok := tokenClaims.Claims.(*Claims); ok && tokenClaims.Valid {
			return claims, nil
		} else {
			fmt.Println("[parse error]", err)
		}
	}

	return nil, err
}

func main() {
	str, _ := GenerateToken("1")
	fmt.Println(str)
}