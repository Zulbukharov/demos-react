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
	"encoding/json"
	"fmt"
	"time"

	gql "github.com/btubbs/garphunql"

	"net/http"

	"github.com/dgrijalva/jwt-go"
	"github.com/gin-gonic/gin"

	// "bytes"
	"io/ioutil"
	// "strconv"
	// "crypto/md5"
	// "encoding/hex"
)

var jwtSecret = []byte("opa")

func Cors() gin.HandlerFunc {
	return func(c *gin.Context) {
		c.Writer.Header().Set("Content-Type", "text/html; charset=utf-8")
		c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
		c.Writer.Header().Set("Access-Control-Allow-Credentials", "true")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS, GET, PUT, DELETE")
		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(204)
			return
		}
		c.Next()
	}
}

type Claims struct {
	HasuraClaims map[string]interface{} `json:"https://hasura.io/jwt/claims"`
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
			"x-hasura-default-role":  "user",
			"x-hasura-allowed-roles": a,
			"x-hasura-user-id":       "1",
		},
		jwt.StandardClaims{
			ExpiresAt: expireTime.Unix(),
			Issuer:    "test",
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

type GithubAuthStruct struct {
	accessToken string `json: "access_token"`
	tokenType   string `json: "type"`
}

func GithubAuth(c *gin.Context) {
	url := "https://github.com/login/oauth/access_token"
	fmt.Println("URL:>", url)
	code := c.Query("code")
	client_id := ""
	client_secret := ""
	var u = fmt.Sprintf(`%s?client_id=%s&client_secret=%s&code=%s&state=sup`, url, client_id, client_secret, code)
	req, err := http.NewRequest("POST", u, nil)
	req.Header.Set("Accept", "application/json")

	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		panic(err)
	}
	defer resp.Body.Close()

	fmt.Println("response Status:", resp.Status)
	if resp.Status != "200 OK" {
		fmt.Println("hi")
		c.JSON(404, gin.H{"status": "Error"})
	}
	fmt.Println("response Headers:", resp.Header)
	body, _ := ioutil.ReadAll(resp.Body)
	var t GithubAuthStruct
	json.Unmarshal(body, &t)
	fmt.Println(t)
	fmt.Println("response Body:", string(body))
	c.JSON(200, string(body))
}

func main() {

	client := gql.NewClient(
		"https://testing-app-1997.herokuapp.com/v1alpha1/graphql",
		gql.Header("x-hasura-admin-secret", ""),
	)
	simpleQuery(client)
	getUser(client)

	router := gin.Default()
	router.GET("/auth", Cors(), GithubAuth)
	router.Run(":3001")
}
