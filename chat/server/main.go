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

	"net/http"

	"github.com/dgrijalva/jwt-go"
	"github.com/gin-gonic/gin"

	// "bytes"
	"io/ioutil"
	// "strconv"
	// "crypto/md5"
	// "encoding/hex"
	"bytes"
	"encoding/json"
	"errors"
	"os"
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

type HasuraClaims struct {
	xHasuraDefaultRole  string   `form:"x-hasura-default-role" db:"x-hasura-default-role" json:"x-hasura-default-role"`
	xHasuraAllowedRoles []string `form:"x-hasura-allowed-roles" db:"x-hasura-allowed-roles" json:"x-hasura-allowed-roles"`
	xHasuraUserId       string   `form:"x-hasura-user-id" db:"x-hasura-user-id" json:"x-hasura-user-id"`
}

type Claims struct {
	HasuraClaims map[string]interface{} `form:"https://hasura.io/jwt/claims" db:"https://hasura.io/jwt/claims" json:"https://hasura.io/jwt/claims"`
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

func jsonPrettyPrint(in []byte) string {
	var out bytes.Buffer
	err := json.Indent(&out, in, "", "  ")
	if err != nil {
		return string(in)
	}
	return out.String()
}

var HASURA_GRAPHQL_ADDRESS = os.Getenv("HASURA_GRAPHQL_ADDRESS")
var HASURA_GRAPHQL_ADMIN_SECRET = os.Getenv("HASURA_GRAPHQL_ADMIN_SECRET")

type GraphqlQuery struct {
	Data interface{}
}

var client = &http.Client{Transport: http.DefaultTransport}

func hasura(query string, variables interface{}, data interface{}) (err error) {
	variablesBytes, err := json.Marshal(variables)
	if err != nil {
		return
	}

	v := string(variablesBytes)
	requestBody := []byte(`{"query":"` + query + `","variables":` + v + `}`)
	requestBytes := bytes.NewBuffer(requestBody)
	req, err := http.NewRequest("POST", HASURA_GRAPHQL_ADDRESS, requestBytes)
	if err != nil {
		return
	}

	req.Header.Add("X-Hasura-Admin-Secret", HASURA_GRAPHQL_ADMIN_SECRET)

	resp, err := client.Do(req)
	if err != nil {
		return
	}

	b, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		return
	}

	// loggin the answer for debugging purposes
	fmt.Println(jsonPrettyPrint(b))

	if resp.StatusCode < 200 || resp.StatusCode > 299 {
		return errors.New(http.StatusText(resp.StatusCode))
	}

	return json.Unmarshal(b, &GraphqlQuery{Data: data})
}

type User struct {
	GithubLogin string
}

const userQuery = `
query {
	user {
		githubLogin
	}
}`

func getUsers() (users []User, err error) {
	var data map[string][]User
	err = hasura(userQuery, nil, &data)
	return data["user"], err
}

// func main() {
// 	fmt.Println(getUsers())
// }

func GithubAuth(c *gin.Context) {
	url := "https://github.com/login/oauth/access_token"
	fmt.Println("URL:>", url)
	code := c.Query("code")
	client_id := "s"
	client_secret := "s"
	var json = fmt.Sprintf(`%s?client_id=%s&client_secret=%s&code=%s&state=sup`, url, client_id, client_secret, code)
	req, err := http.NewRequest("POST", json, nil)
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
	fmt.Println("response Body:", string(body))
	c.JSON(200, string(body))
}

func main() {
	router := gin.Default()
	router.GET("/auth", Cors(), GithubAuth)
	router.Run(":3001")
}
